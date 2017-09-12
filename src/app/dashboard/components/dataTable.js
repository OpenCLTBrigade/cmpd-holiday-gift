// @flow
import * as React from 'react';
import * as querystring from 'querystring';
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
    sizePerPage: number,
    defaultPage: number
  |};
  static defaultProps = {
    pagination: true,
    search: false,
    searchPlaceholder: 'Search'
  };
  constructor() {
    let qs: Object = querystring.parse(window.location.search.substr(1));
    let defaultPage: number = qs.page ? parseInt(qs.page, 10) : 1;

    super();
    this.state = {
      items: [],
      totalSize: 1,
      sizePerPage: 25,
      page: 1,
      defaultPage: 1
    };

    this.options = {
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
      onSearchChange: this.props && this.props.search ? this.handleSearchChange.bind(this) : undefined,
      page: defaultPage
    };
  }

  componentDidMount() {
    this.fetchData().then();
  }

  fetchData(page: number = this.state.page, searchText: string = '') {
    return new Promise((resolve, _reject) => {
      // console.log('fetchData', page, searchText);
      this.props.fetch(page, searchText).then(data => {
        // console.log('results', data.items);
        this.setState({ items: data.items, totalSize: data.totalSize, page, sizePerPage: data.sizePerPage }, () => {
          resolve();
        });
      });
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
    return (
      <BootstrapTable
        data={(this.state.items: Array<any>)}
        fetchInfo={{ dataTotalSize: this.state.totalSize }}
        options={this.options}
        striped
        hover
        remote
        pagination={this.props.pagination}
        search={this.props.search}
        searchPlaceholder={this.props.searchPlaceholder}
      >
        {this.props.children}
      </BootstrapTable>
    );
  }
}
