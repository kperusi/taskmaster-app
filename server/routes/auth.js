const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/Users");
const authMiddleware = require("../middleware/auth");
const Task = require("../models/Tasks");
// User Registration Route
router.get("/", async (req, res) => {
  res.json({ message: "Welcome to the User Registration API" });
});
router.post("/addTask", async (req, res) => {
  try {
    const {
      title,
      description,
      status,
      dueDate,
      createdBy,
      priority,
      subtasks,
    } = req.body;

    const newTask = new Task({
      title,
      description,
      status,
      dueDate,
      priority,
      createdBy,
      subtasks,
    });
    console.log("this is new task", newTask);

    await newTask.save();
    res.json({ message: "Your task is added successfully" });
  } catch (error) {
    // Handle different types of errors
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "this is a Validation Error",
        errors: Object.values(error.errors).map((err) => err.message),
      });
    }

    // Handle other types of errors
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
});
router.post("/register", async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  try {
    // Check if user already exists
    let existingUser = await User.findOne({
      $or: [{ email }, { firstname }],
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists with this email or username",
      });
    }

    // Create new user
    const newUser = new User({
      firstname,
      lastname,
      email,
      password,
    });

    await newUser.save();

    // Generate JWT token
    const payload = {
      user: {
        id: newUser._id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET || "your_jwt_secret",
      { expiresIn: "3h" },
      (err, token) => {
        if (err) throw err;
        res.status(201).json({
          message: "User registered successfully",
          token,
          id:newUser._id
        });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error during registration" });
  }
});

// User Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid Email or Password." });
    }

    // Compare passwords
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Password." });
    }

    // Generate JWT token
    const payload = {
      user: {
        id: user._id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET || "your_jwt_secret",
      { expiresIn: "3h" },
      (err, token) => {
        if (err) throw err;
        res.json({
          message: "Login successful",
          user,
          token,
        });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error during login" });
  }
});

// Protected Route Example
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching profile" });
  }
});

// Logout route
router.post("/logout", authMiddleware, async (req, res) => {
  try {
    // Clear the refresh token from database if you're using one
    // await User.findByIdAndUpdate(req.user._id, { $set: { refreshToken: null }});

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error during logout",
      error: error.message,
    });
  }
});

// Get all tasks for logged-in user
router.get("/tasks", authMiddleware, async (req, res) => {
  try {
    // Get user ID from auth middleware
    const userId = req.user.id;

    console.log(userId);
    // Find all tasks where createdBy matches user ID
    const tasks = await Task.find({ createdBy: userId })
      .sort({ createdAt: -1 }) // Sort by newest first
      .populate("createdBy", "name email"); // Optional: populate user details

    res.status(200).json({
      success: true,
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(400).json({
      success: false,
      message: "Error fetching tasks",
      error: error.message,
    });
  }
});

// Get a specific task by ID (with auth check)
router.get("/tasks/:id", authMiddleware, async (req, res) => {
  console.log('>>',req.params.id);
  console.log('>>',req.user.id);

// console.log('>>>',req.body.id);
  try {

    const task = await Task.findOne({
      _id: req.params.id,
      createdBy: req.user.id,
    }).populate("createdBy", "name email");

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    console.error("Error fetching task:", error);
    res.status(400).json({
      success: false,
      message: "Error fetching task",
      error: error.message,
    });
  }
});

router.put("/tasks/:id", async (req, res) => {
  console.log(req.params);

  try {
    const { id } = req.params;
    let { _title, _description, _dueDate, _priority, _subtasks } = req.body;
    const task = await Task.findByIdAndUpdate(
      id,
      { _title, _description },
      { new: true }
    );
    console.log(req.body);
    if (!task) {
      return res.status(404).send("Task not found");
    }
    if (task) {
      console.log(task);
    }
    task.title = _title || task.title;
    task.description = _description || task.description;
    task.dueDate = _dueDate || task.dueDate;
    task.priority = _priority || task.priority;
    if (_subtasks && _subtasks.length) {

      task.subtasks =_subtasks
      
      
    }
    await task.save();
    res.send(task);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.delete("/tasks/:taskId/subtasks/:subtaskId", async (req, res) => {
  console.log(req.params);
  try {
    const { taskId, subtaskId } = req.params;
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).send("Task not found");
    }
    // Find the subtask index
    const subtaskIndex = task.subtasks.findIndex(
      (subtask) => subtask._id.toString() === subtaskId
    );

    if (subtaskIndex === -1) {
      return res.status(404).json({ error: "Subtask not found" });
    }

    task.subtasks.splice(subtaskIndex, 1);
    await task.save();

    res.json({ message: "Subtask deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});



router.delete('/tasks/:taskId', async (req, res) => {

  console.log(req.params)
  try {
      const { taskId } = req.params;

     
      // Find and delete the task
      const deletedTask = await Task.findByIdAndDelete(taskId);

      // Check if task exists
      if (!deletedTask) {
          return res.status(404).json({ 
              message: 'Task not found' 
          });
      }

      // Successful deletion response
      res.status(200).json({ 
          message: 'Task deleted successfully',
          deletedTask: deletedTask 
      });

  } catch (error) {
      console.error('Error deleting task:', error);
      res.status(500).json({ 
          message: 'Internal server error', 
          error: error.message 
      });
  }
});

// Refresh token endpoint
router.post("/refresh-token", (req, res) => {
  const oldToken = req.body.token;

  try {
    // Verify the old token
    const decoded = jwt.verify(oldToken, process.env.JWT_SECRET || "your_jwt_secret");

    // Create a new token
    const payload = {
      user: {
        id: decoded.user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET || "your_jwt_secret",
      { expiresIn: "3h" },
      (err, newToken) => {
        if (err) throw err;
        res.status(200).json({
          message: "Token refreshed successfully",
          token: newToken,
        });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
});




module.exports = router;
