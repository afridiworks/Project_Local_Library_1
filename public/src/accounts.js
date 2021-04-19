function findAccountById(accounts, id) {
  let found = accounts.find((account) => account.id === id);
  return found;
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((accountA, accountB) =>
    accountA.name.last > accountB.name.last ? 1 : -1
  );
}

function getTotalNumberOfBorrows(account, books) {
  let result = books.reduce((acc, book) => {
    return (
      acc + book.borrows.filter((borrow) => borrow.id === account.id).length
    );
  }, 0);
  return result;
}

function getBooksPossessedByAccount(account, books, authors) {
  //we need to get the books checked out by this account, match account id to the book.borrows.id
  //console.log(account, books);
  let booksBorrwedByAccount = books.filter((book) => {
    return book.borrows.find((borrow) => {
      return borrow.id === account.id && !borrow.returned;
    });
    //now that you have the books borrowed by account, we need to add authors to the list
    //
  });
  return booksBorrwedByAccount.map((book) => {
    const author = authors.find((author) => author.id === book.authorId);
    book.author = author;
    return book;
  });

  //console.log(booksBorrwedByAccount, books.borrows.id);
}

//   let booksBorrwedByAccount = books.filter((book) => {s
//     let (matchingBooksByAccoundId = book.borrows.some(
//       (borrow) => borrow.id === account.id && !borrow.returned
//     ));
//     console.log(bookBorrowedByAccount);
//   });
// }

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
