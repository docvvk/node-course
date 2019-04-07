const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground1", { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB...", err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model("Author", authorSchema);

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: String,
    authors: [authorSchema]
  })
);

async function createCourse(name, authors) {
  const course = new Course({
    name,
    authors
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(courseId) {
  const course = await Course.updateOne(
    { _id: courseId },
    {
      $unset: {
        author: ""
      }
    }
  );
  // // course.author.name = 'Vivek Malhan';
  // course.save();
  console.log("document updated", course);
}

// updateAuthor('5ca915b1d55a191c6d611d76');

async function addAuthor(courseId, author) {
  const course = await Course.findById(courseId);
  course.authors.push(author);
  course.save();
}

async function removeAuthor( courseId, authorId ) {
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId);
  author.remove();
  course.save();
}

removeAuthor('5ca91a69cc72fd2007512ec6', '5ca91c53e495e0214d1008ab');
// createCourse("Node Course", [
//   new Author({ name: "Vivek" }),
//   new Author({ name: "Sahil" })
// ]);
