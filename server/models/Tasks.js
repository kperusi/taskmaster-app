const mongoose = require('mongoose');

// Subtask Schema
const subtaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  // dueDate: {
  //   type: Date,
  //   default: null
  // }
});

// Main Task Schema
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true,
    default: ''
  },
 createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['to-do', 'in-progress', 'completed'],
    default: 'to-do'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  dueDate: {
    type: Date,
    validate: {
      validator: function(v) {
        return v >= Date.now();
      },
      message: 'Due date must be in the future'
    }
  },
  // tags: [{
  //   type: String,
  //   trim: true
  // }],
  subtasks: [subtaskSchema],
  completionProgress: {
    type: Number,
    default: 0
  },

  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Calculate completion progress before saving
taskSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  
  if (this.subtasks && this.subtasks.length > 0) {
    const completedSubtasks = this.subtasks.filter(subtask => subtask.completed).length;
    this.completionProgress = (completedSubtasks / this.subtasks.length) * 100;
    
    // Auto-update status based on subtasks completion
    if (this.completionProgress === 100) {
      this.status = 'completed';
    } else if (this.completionProgress > 0) {
      this.status = 'in-progress';
    }
  }
  
  next();
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;