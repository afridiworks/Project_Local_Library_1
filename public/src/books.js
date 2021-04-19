function findAuthorById(authors, id) {
  // loop through the array of objects
  return (found = authors.find((author) => author.id === id));
}

function findBookById(books, id) {
  //loop through the array of books
  return (found = books.find((book) => book.id === id));
  //return the book object that has the matching id
}

function partitionBooksByBorrowedStatus(books){
  const result = [];
  let notReturned = books.filter((book) => book.borrows[0].returned === false);
  
  //console.log("NOT RETURNED", notReturned)

  let returned = books.filter((book) => book.borrows[0].returned === true);

  //console.log("RETURNED", returned)
  result.push(notReturned, returned);
  return result;
}

function getBorrowersForBook(book, accounts) {
  let returnArr = [];
  for(let key in book.borrows) {
    const accountObj = accounts.find(account => account.id === book.borrows[key].id);
    accountObj
    accountObj.returned = book.borrows[key].returned;
    returnArr.push(accountObj);
  }
  return returnArr.slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
