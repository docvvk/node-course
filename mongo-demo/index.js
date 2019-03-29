// TERMINAL CMDS
// $ sudo mkdir -p /data/db
// $ sudo chown -R `id -un` /data/db
// # mongoimport --db mongo-exercises --collection courses --file exercise-data.json -- jsonArray

const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground", { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDb..."))
  .catch(err =>
    console.error("Could not connect to MongoDb. \nError Name:", err.name)
  );

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean
});

// Schema Types -- String/Number/Date/Buffer/Boolean/ObjectID/Array

// Model

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "Javascript Course",
    author: "Shaurya Malhan",
    tags: ["frontend", "backend"],
    isPublished: true
  });

  const result = await course.save();
  console.log(result);
}


// createCourse();
// Querying Documents

// Logical Query Operators // or // and

// Regular Expressions

// Counting

// Pagination 

async function getCourses() {

  const pageNumber = 2;
  const pageSize = 10;

  const courses = await Course
    .find({ author: 'Vivek', isPublished: true })
    // .find()
    // .or([ {author: 'Vivek'}, {isPublished: false} ])
    // .and([])

    // // starts with Vivek
    // .find({ author: /^Vivek/ })
    // // ends with Malhan
    // .find({ author: /Malhan$/i })  // i for case-insensitive
    // // contains Vivek
    // .find({ author: /.*Vivek.*/ })

    // pagination - to get the documents in the given page
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)

    .sort({ name: 1 })
    .select({ name: 1, tags: 1, author: 1, isPublished: 1 })
    // .estimatedDocumentCount();
  console.log(courses);
}

// getCourses();

// async function updateCourse() {
//    //  Query First
//    const course = await Course.findById(id);
//    if (!course) return;
   
//    course.isPublished = true;
//    course.author = 'Another Author'; 

//    const result = await course.save();
//    console.log(result);
   
//   //  course.set({
//   //    isPublished: true,
//   //    author: 'Another Author'
//   //  })
// } 

// updateCourse('5c9d3f2d7acc4b10e4795da7');
