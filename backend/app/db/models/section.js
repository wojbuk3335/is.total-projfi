const mongoose = require('mongoose');
const dbPath = `/uploads/`;

const QuestionSchema = new mongoose.Schema({
  question: { type: String, default: '' },
  correct: { type: String, default: '' },
  active: { type: String, default: '' },
  checked: { type: Boolean, default: false },
});

const IntroductionSchema = new mongoose.Schema({
  description: { type: String, default: '' },
  path_file: {
    type: String,
    default: '',
    set: function(path) {
      return dbPath + `${path}`;
    }
  },
  questions: { type: [QuestionSchema], default: [] },
  title_of_introduction: { type: String, default: '' },
  title_of_description: { type: String, default: '' },
  summary: { type: String, default: '' }, // New field
});

// Pre-save hook to set the summary field based on title_of_introduction and title_of_description
IntroductionSchema.pre('save', function(next) {
  if (this.title_of_introduction && this.title_of_description) {
    this.summary = `${this.title_of_introduction} - ${this.title_of_description}`;
  } else if (this.title_of_introduction) {
    this.summary = this.title_of_introduction;
  } else if (this.title_of_description) {
    this.summary = this.title_of_description;
  } else {
    this.summary = 'No title available';
  }
  next();
});

const TaskSchema = new mongoose.Schema({
  title_of_task: { type: String, default: '' },
  letter_of_current_task: { type: String, default: '' },
  introductions: { type: [IntroductionSchema], default: [] },
});

const LessonSchema = new mongoose.Schema({
  title_of_lesson: { type: String, default: '' },
  status_of_lesson: { type: Boolean, default: true }, // New field
  completed: { type: Boolean, default: false },
  tasks: { type: [TaskSchema], default: [] },
});

const SectionSchema = new mongoose.Schema({
  title_of_section: { type: String, default: '' },
  status_of_section: { type: Boolean, default: true }, // New field
  author_of_section: { type: String, default: '' },
  lessons: { type: [LessonSchema], default: [] },
  description: { type: [String], default: [] },
});

const Section = mongoose.model('Section', SectionSchema);

module.exports = Section;