const express = require("express");
const mongoose = require("mongoose");

// Create app instance
const app = express();

// Connect to MongoDB database
mongoose.connect("mongodb://localhost:27017/med-students", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define schema and model for students collection
const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  course: String,
});

const Student = mongoose.model("Student", studentSchema);

// Use JSON middleware to parse request body
app.use(express.json());

// Define routes for API endpoints

// Get all students
app.get("/api/students", (req, res) => {
  Student.find({}, (err, students) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(students);
    }
  });
});

// Get one student by id
app.get("/api/students/:id", (req, res) => {
  Student.findById(req.params.id, (err, student) => {
    if (err) {
      res.status(500).send(err);
    } else {
      if (student) {
        res.status(200).json(student);
      } else {
        res.status(404).send("Student not found");
      }
    }
  });
});

// Create a new student
app.post("/api/students", (req, res) => {
  const newStudent = new Student(req.body);
  newStudent.save((err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).json(newStudent);
    }
  });
});

// Update an existing student by id
app.put("/api/students/:id", (req, res) => {
  Student.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, newStudent) => {
      if (err) {
        res.status(500).send(err);
      } else {
        if (newStudent) {
          res.status(200).json(newStudent);
        } else {
          res.status(404).send("Student not found");
        }
      }
    }
  );
});

// Delete an existing student by id
app.delete("/api/students/:id", (req, res) => {
  Student.findByIdAndDelete(req.params.id, (err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(204).send("Student deleted");
    }
  });
});

// Start listening on port 3000
app.listen(3000, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Server running on port 3000");
  }
});
