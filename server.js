const express = require("express");
const mongoose = require("mongoose");

// Create app instance
const app = express();

// Connect to MongoDB database
mongoose.connect("mongodb://127.0.0.1:27017/med-students", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define schema and model for students collection
const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
});

const Student = mongoose.model("Student", studentSchema);

// Use JSON middleware to parse request body
app.use(express.json());

// Define routes for API endpoints

app.post("/add-student", async (req, res) => {
  const studentData = req.body;
  const student = new Student(studentData);
  try {
    const result = await student.save(); // Use await to save data and store the result
    console.log(result); // Log the result
    res.status(201).send(result); // Send the result as a response
  } catch (err) {
    console.error(err); // Log any error
    res.status(500).send(err); // Send the error as a response
  }
});

app.get("/get-students", async (req, res) => {
  try {
    const students = await Student.find(); // Use await to find data and store the result
    console.log(students); // Log the result
    res.status(200).send(students); // Send the result as a response
  } catch (err) {
    console.error(err); // Log any error
    res.status(500).send(err); // Send the error as a response
  }
});

app.put("/update-student/:id", async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;
  try {
    const updatedStudent = await Student.findByIdAndUpdate(id, updateData, {
      new: true,
    }); // Use await to update data and store the result
    console.log(updatedStudent); // Log the result
    res.status(200).send(updatedStudent); // Send the result as a response
  } catch (err) {
    console.error(err); // Log any error
    res.status(500).send(err); // Send the error as a response
  }
});

app.delete("/delete-student/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deletedStudent = await Student.findByIdAndDelete(id); // Use await to delete data and store the result
    console.log(deletedStudent); // Log the result
    res.status(200).send(deletedStudent); // Send the result as a response
  } catch (err) {
    console.error(err); // Log any error
    res.status(500).send(err); // Send the error as a response
  }
});

// Start listening on port 3000
app.listen(3000, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Server running on port 3000");
  }
});
