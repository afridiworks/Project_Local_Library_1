function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let result = 0;
  for (let item in books) {
    //console.log("LOOP TEST")
    if (books[item].borrows[0].returned === false) {
      result += 1;
    }
  }
  return result;
}
function _sortHelper(obj) {
  const keys = Object.keys(obj);
  return keys.sort((keyA, keyB) => {
    if (obj[keyA] > obj[keyB]) {
      return -1;
    } else if (obj[keyB] > obj[keyA]) {
      return 1;
    } else {
      return 0;
    }
  });
}
function getMostCommonGenres(books) {
  const count = books.reduce((acc, { genre }) => {
    if (acc[genre]) {
      acc[genre] += 1;
    } else {
      acc[genre] = 1;
    }
    return acc;
  }, {});
  const sorted = _sortHelper(count);
  return sorted.map((name) => ({ name, count: count[name] })).slice(0, 5);
}

function getMostPopularBooks(books) {
  const groupById = books.reduce((acc, { id, borrows }) => {
    acc[id] = borrows.length;
    return acc;
  }, {});
  const sorted = _sortHelper(groupById);
  return sorted
    .map((id) => {
      const { title: name } = books.find(({ id: bookId }) => bookId === id);
      return { name, count: groupById[id] };
    })
    .slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  let returnArr = [];
  authors.forEach((author) => {
    returnArr.push({
      name: `${author.name.first} ${author.name.last}`,
      count: 0,
      id: author.id,
    });
  });
  books.forEach((book) => {
    let foundAuthor = returnArr.find((author) => {
      return author.id === book.authorId;
    });
    foundAuthor.count += book.borrows.length;
  });
  return returnArr
    .sort((authorA, authorB) => authorB.count - authorA.count)
    .slice(0, 5)
    .map(({ id, ...rest }) => rest);
}
module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
