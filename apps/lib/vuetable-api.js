const perPage = 2;

function calculateNextPage(req, resultSet, currentPage, lastPage) {
  if (currentPage >= lastPage) {
    return null;
  } else if (currentPage < 1) {
    return 1;
  } else {
    return currentPage + 1;
  }
}

function calculatePreviousPage(req, resultSet, currentPage, lastPage) {
  if (currentPage <= 1) {
    return null;
  } else if (currentPage > lastPage) {
    return lastPage;
  } else {
    return currentPage - 1;
  }
}

module.exports = {
  getPageAndOffset: req => {
    let currentPage = !req.query.page || isNaN(req.query.page) ? 1 : parseInt(req.query.page);
    let offset = (currentPage - 1) * perPage;
    return { currentPage, offset, perPage };
  },

  parseResultSet: (req, currentPage, resultSet) => {
    let lastPage = Math.ceil(resultSet.count / perPage);
    let baseUrl = `${req.protocol}://${req.get('host')}${req.path}`;

    let nextPageNumber = calculateNextPage(req, resultSet, currentPage, lastPage);
    let previousPageNumber = calculatePreviousPage(req, resultSet, currentPage, lastPage);

    return {
      total: resultSet.count,
      per_page: perPage,
      current_page: currentPage,
      last_page: lastPage,
      next_page_url: nextPageNumber !== null ? `${baseUrl}?page=${nextPageNumber}` : null,
      prev_page_url: previousPageNumber !== null ? `${baseUrl}?page=${previousPageNumber}` : null,
      from: currentPage,
      to: currentPage - 1 + resultSet.rows.length,
      data: resultSet.rows
    };
  }
};
