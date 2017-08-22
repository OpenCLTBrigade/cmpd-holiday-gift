// @flow
import * as React from 'react';
import { BootstrapTable } from 'react-bootstrap-table';

type PropType<Row> = {|
    // TODO: is sizePerPage actually returned by the server?
    fetch: (number, ?string) => Promise<{ items: Row[], totalSize: number, sizePerPage: number }>,
    children: React.Node,
    search: boolean,
    pagination: boolean,
    searchPlaceholder: string
|};

export default class DataTable<Row> extends React.Component<PropType<Row>, *> {
  state: {|
    items: Row[],
    totalSize: number,
    page: number,
    sizePerPage: number
  |};
  static defaultProps = { pagination: true };
  constructor() {
    super();
    this.state = {
      items: [],
      totalSize: 1,
      sizePerPage: 25,
      page: 1
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData(page: number = this.state.page, searchText: string = '') {
    // console.log('fetchData', page, searchText);
    this.props.fetch(page, searchText).then(data => {
      // console.log('results', data.items);
      this.setState({ items: data.items, totalSize: data.totalSize, page, sizePerPage: data.sizePerPage });
    });
  }

  handlePageChange = (page: number) => {
    this.fetchData(page);
  };

  handleSearchChange = (searchText?: string) => {
    console.log('searching for', searchText);
    this.fetchData(this.state.page, searchText);
  };

  render(): React.Node {
    const options = {
      sizePerPage: this.state.sizePerPage, // which size per page you want to locate as default
      pageStartIndex: 1, // where to start counting the pages
      paginationSize: 5, // the pagination bar size.
      prePage: 'Prev', // Previous page button text
      nextPage: 'Next', // Next page button text
      firstPage: 'First', // First page button text
      lastPage: 'Last', // Last page button text
      paginationShowsTotal: true, // Accept bool or function
      hideSizePerPage: true,
      onPageChange: this.handlePageChange,
      searchDelayTime: 500,
      onSearchChange: this.props.search ? this.handleSearchChange.bind(this) : undefined
    };

    return (
      <BootstrapTable
        data={(this.state.items: Array<any>)}
        fetchInfo={{ dataTotalSize: this.state.totalSize }}
        options={options}
        striped
        hover
        remote
        pagination={this.props.pagination !== undefined ? this.props.pagination : true}
        search={this.props.search ? true : false}
        searchPlaceholder={this.props.searchPlaceholder != null ? this.props.searchPlaceholder : 'Search'}
      >
        {this.props.children}
      </BootstrapTable>
    );
  }
}
