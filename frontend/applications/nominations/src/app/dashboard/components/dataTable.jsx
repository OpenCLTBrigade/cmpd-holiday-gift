import * as React from 'react';
import * as querystring from '../../../lib/queryString';
import { BootstrapTable } from 'react-bootstrap-table';

// type PropType<Row> = {|
//   // TODO: is sizePerPage actually returned by the server?
//   fetch: (number, ?string) => Promise<{ items: Row[], totalSize: number, sizePerPage: number }>,
//   children,
//   search: boolean,
//   pagination: boolean,
//   searchPlaceholder: string
// |};

const defaultOptions = {
  pageStartIndex: 1, // where to start counting the pages
  paginationSize: 5, // the pagination bar size.
  prePage: 'Prev', // Previous page button text
  nextPage: 'Next', // Next page button text
  firstPage: 'First', // First page button text
  lastPage: 'Last', // Last page button text
  paginationShowsTotal: true, // Accept bool or function
  hideSizePerPage: true,
  searchDelayTime: 500
};

export default class DataTable extends React.Component {
  static defaultProps = {
    pagination: true,
    search: false,
    searchPlaceholder: 'Search'
  };

  constructor(props) {
    super(props);

    // Looking for ?page and ?search
    const qs = querystring.parse();
    const page = qs.page ? parseInt(qs.page, 10) : 1;

    this.state = {
      items: [],
      totalSize: 1,
      page
    };
  }

  async componentDidMount() {
    await this.fetchData();
  }

  async fetchData(page = this.state.page, searchText = '') {
    querystring.update({ page, search: searchText });
    const { fetch, onFetch } = this.props;

    try {
      onFetch && onFetch(page, searchText);
      const { items, totalSize } = await fetch(page, searchText, this.props.sizePerPage);

      this.setState(() => ({
        items: items,
        totalSize,
        page,
        searchText
      }));
    } catch (error) {
      console.error(error);
    }
  }

  handlePageChange = async page => {
    const qs = querystring.parse();
    const search = qs.search;

    await this.fetchData(page, search);
  };

  handleSearchChange = async searchText => await this.fetchData(1, searchText);

  render() {
    const { items, totalSize, page } = this.state;
    const { sizePerPage = 10, pagination, search, searchPlaceholder } = this.props;

    const options = {
      sizePerPage, // which size per page you want to locate as default
      onPageChange: this.handlePageChange,
      onSearchChange: this.props && this.props.search ? this.handleSearchChange.bind(this) : undefined,
      page,
      ...defaultOptions
    };

    return (
      <BootstrapTable
        data={items}
        fetchInfo={{ dataTotalSize: totalSize }}
        options={options}
        page={page}
        striped
        hover
        remote
        pagination={pagination}
        search={search}
        searchPlaceholder={searchPlaceholder}
        containerClass="table-responsive"
        tableContainerClass="table-responsive">
        {this.props.children}
      </BootstrapTable>
    );
  }
}
