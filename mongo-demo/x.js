const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground", { useNewUrlParser: true })
  .then(() => console.log("connected to mongodb..."))
  .catch(err => console.error("Couldn't connect to mongodb...", err));

const Author = mongoose.model(
  "Author",
  new mongoose.Schema({
    name: String,
    bio: String,
    website: String
  })
);

const Book = mongoose.model(
  "Book",
  new mongoose.Schema({
    name: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author"
    }
  })
);

async function createAuthor(name, bio, website) {
  const author = new Author({
    name,
    bio,
    website
  });
  const result = await author.save();
  console.log(result);
}

async function createBook(name, author) {
  const book = new Book({
    name,
    author
  });
  const result = await book.save();
  console.log("book");
}

async function listBooks() {
  const books = await Book.find()
    .populate("author", "name -_id")
    .populate('category', 'name')
    .select("name author");
  console.log(books);
}

// createAuthor( 'Vivek', 'My Bio', 'My Website' );
// createBook( 'Node', '5ca9093ee607cb19f05f8815');

listBooks();

// 

// Authorization -- user is authorized to do some operation -- permissions
// Authentication -- user is authentic 

// Register: POST /api/users { name, email, password }
// Login: POST /api/logins


