const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground", { useNewUrlParser: true })
  .then(() => console.log("connected to mongodb"))
  .catch(err => console.log("Error: ", err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  isPublished: Boolean,
  date: { type: Date, default: Date.now },
  price: Number,
  tags: [String]
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "Cricket Course",
    author: "Sachin Tendulkar",
    isPublished: true,
    price: 25,
    tags: ["cricket", "god"]
  });
  const result = await course.save();
  console.log(result);
}

// createCourse();

// console.log(Course.countDocuments({}));

// async function updateOne() {
//     const courses = await Course.updateOne({ price: 15 });
//     console.log(courses)
// }
// updateOne()

async function getCourses() {
//   const pageNumber = 3;
//   const pageSize = 8;
  return await Course
    // .find({ author: /.*alh*./, isPublished: true, price: 50 })
    .find({  })
    .and([ {name: /.*ab*./i}, {price: { $gt: 35 }} ]) // Mongodb properties

    // .and([ { tags: 'frontend' }, { tags: 'backend'}])
    .sort( '-price' )
    .select(' name author tags price ');
  // .exec(() => console.log('executed'))

  // .skip((pageNumber - 1) * pageSize)
  // .limit(pageSize)

  // .limit()
}
async function run() {
    const courses = await getCourses()
    console.log(courses);
}
// run();


async function updateCourse(id) {
    //  Query First

    // MONGO-DB QUERY OPERATORS
    const result = await Course.findByIdAndUpdate(id, {
        $set: {
            author: 'VvkLaLaOoooh',
            isPublished: true
        }
    }, { new: true });
    // if (!course) return;

    // if (course.isPublished) return;
    
    // course.isPublished = true;
    // course.author = ['Another Author', 'Balle Balle', 'Saare Thalle']; 
 
    // const result = await course.save();
    console.log(result);
    
   //  course.set({
   //    isPublished: true,
   //    author: 'Another Author'
   //  })
 } 
 
//  updateCourse('5c9d3f2d7acc4b10e4795da7');


 // 
 
 async function removeCourse(id) {
    const result = await Course.deleteOne({ _id: id });
    console.log(result)
 }

 removeCourse('5c9d3f2d7acc4b10e4795da7')
