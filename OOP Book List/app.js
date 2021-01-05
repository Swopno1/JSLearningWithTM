// Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor
function UI() {}

// Store Constructor for LS.......
function Store() {}

// Get Book to UI from LS.......
Store.prototype.getBooks = function() {
  let books;
    if(localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'))
    }

    return books;
}

// Display Books from LS.......
Store.prototype.displayBooks = function() {
  const store = new Store();
  const books = store.getBooks();

    books.forEach(function(book){
      const ui =new UI();

      // Add book to UI
      ui.addBookToList(book);
    });
}

// Add Book to LS.......
Store.prototype.addBook = function(book) {
  const store = new Store();
  const books = store.getBooks();

    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));
}

// Remove Book from LS.......
Store.prototype.removeBook = function(isbn) {
  const store = new Store();
  const books = store.getBooks();

    books.forEach(function(book, index){
      if(book.isbn === isbn) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
}

// Add Book to List
UI.prototype.addBookToList = function (book){
  const list = document.querySelector('#book-list');
  // Create tr element
  const row =document.createElement('tr');
  // Insert cols
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
    `;

  list.appendChild(row);
}

// Show Alert
UI.prototype.showAlert = function (message, className) {
  // Create Div
  const div = document.createElement('div');
  // Add classes
  div.className = `alert ${className}`;
  // Add text
  div.appendChild(document.createTextNode(message));
  // Get parent
  const container = document.querySelector('.container');
  const form = document.querySelector('#book-form');
  // Insert alert
  container.insertBefore(div, form);

  // Timeout after 3 second
  setTimeout(function(){
    document.querySelector('.alert').remove();
  }, 3000);
}

// Delete Book
UI.prototype.deleteBook = function(target) {
  if(target.className === 'delete') {
    target.parentElement.parentElement.remove();
  }
}

// Clear Fields
UI.prototype.clearFields = function(){
  document.querySelector('#title').value = '';
  document.querySelector('#author').value = '';
  document.querySelector('#isbn').value = '';
}

// DOM load event
document.addEventListener('DOMContentLoaded', function(){
  const store = new Store();
  store.displayBooks()
});

// Event Listners for Add Boook
document.querySelector('#book-form').addEventListener('submit', function(e){
  // Get from the Form
  const title = document.querySelector('#title').value,
        author = document.querySelector('#author').value,
        isbn = document.querySelector('#isbn').value;

  // Instantiate book
  const book = new Book(title, author, isbn);

  // Instantiate UI
  const ui =new UI();

  // Instantiate Store
  const store =new Store();

  // Validate
  if(title === '' || author === '' || isbn === '') {
    // Error alert
    ui.showAlert('Please fill in all field', 'error');
  } else {
    // Add book to list
    ui.addBookToList(book);

    // Add book to LS......
    store.addBook(book);

    // Show success
    ui.showAlert('Book Added', 'success');

    // Clear Field
    ui.clearFields();
  }

  e.preventDefault();
});

// Event Listners for Delet item
document.querySelector('#book-list').addEventListener('click', function(e){

  // Instantiate UI
  const ui =new UI();

  // Instantiate Store
  const store =new Store();

  //Delete Book
  ui.deleteBook(e.target);

  //Delete Book from LS.........
  store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  // Show success
  ui.showAlert('Book Removed', 'success');

  e.preventDefault();
});