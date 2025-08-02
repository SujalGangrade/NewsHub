// import mongoose from 'mongoose';

// const newsSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: [true, 'Title is required'],
//     trim: true,
//     maxlength: [200, 'Title cannot exceed 200 characters']
//   },
//   content: {
//     type: String,
//     required: [true, 'Content is required'],
//     trim: true,
//     minlength: [50, 'Content must be at least 50 characters long']
//   },
//   author: {
//     type: String,
//     required: [true, 'Author is required'],
//     trim: true,
//     maxlength: [100, 'Author name cannot exceed 100 characters']
//   },
//   publishDate: {
//     type: Date,
//     default: Date.now
//   },
//   category: {
//     type: String,
//     required: [true, 'Category is required'],
//     enum: {
//       values: ['Technology', 'Politics', 'Sports', 'Entertainment'],
//       message: 'Category must be one of: Technology, Politics, Sports, Entertainment'
//     }
//   },
//   image: {
//     type: String,
//     validate: {
//       validator: function(v) {
//         return !v || /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(v);
//       },
//       message: 'Image must be a valid URL ending with jpg, jpeg, png, gif, or webp'
//     }
//   },
//   isPublished: {
//     type: Boolean,
//     default: true
//   },
//   views: {
//     type: Number,
//     default: 0
//   },
//   tags: [{
//     type: String,
//     trim: true,
//     lowercase: true
//   }],
//   summary: {
//     type: String,
//     trim: true,
//     maxlength: [500, 'Summary cannot exceed 500 characters']
//   }
// }, {
//   timestamps: true,
//   toJSON: { virtuals: true },
//   toObject: { virtuals: true }
// });

// // Indexes for better query performance
// newsSchema.index({ category: 1, publishDate: -1 });
// newsSchema.index({ title: 'text', content: 'text' });
// newsSchema.index({ publishDate: -1 });
// newsSchema.index({ isPublished: 1 });

// // Virtual for formatted publish date
// newsSchema.virtual('formattedDate').get(function() {
//   return this.publishDate.toLocaleDateString('en-US', {
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric'
//   });
// });

// // Pre-save middleware to generate summary if not provided
// newsSchema.pre('save', function(next) {
//   if (!this.summary && this.content) {
//     this.summary = this.content.substring(0, 200) + '...';
//   }
//   next();
// });

// // Static method to get published articles
// newsSchema.statics.getPublished = function() {
//   return this.find({ isPublished: true }).sort({ publishDate: -1 });
// };

// // Instance method to increment views
// newsSchema.methods.incrementViews = function() {
//   this.views += 1;
//   return this.save();
// };

// const News = mongoose.model('News', newsSchema);

// export default News;


//News.js

import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    trim: true,
    minlength: [50, 'Content must be at least 50 characters long']
  },
  author: {
    type: String,
    required: [true, 'Author is required'],
    trim: true,
    maxlength: [100, 'Author name cannot exceed 100 characters']
  },
  publishDate: {
    type: Date,
    default: Date.now
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: {
      values: ['Technology', 'Politics', 'Sports', 'Entertainment'],
      message: 'Category must be one of: Technology, Politics, Sports, Entertainment'
    }
  },
  image: {
    type: String,
    validate: {
      validator: function (v) {
        return !v || /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i.test(v);
      },
      message: 'Image must be a valid URL ending with jpg, jpeg, png, gif, or webp'
    }
  },
  isPublished: {
    type: Boolean,
    default: true
  },
  views: {
    type: Number,
    default: 0
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  summary: {
    type: String,
    trim: true,
    maxlength: [500, 'Summary cannot exceed 500 characters']
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
newsSchema.index({ category: 1, publishDate: -1 });
newsSchema.index({ title: 'text', content: 'text' });
newsSchema.index({ publishDate: -1 });
newsSchema.index({ isPublished: 1 });

// Virtual for formatted publish date
newsSchema.virtual('formattedDate').get(function () {
  return this.publishDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});

// Pre-save middleware to generate summary if not provided
newsSchema.pre('save', function (next) {
  if (!this.summary && this.content) {
    this.summary = this.content.substring(0, 200) + '...';
  }
  next();
});

// Static method to get published articles
newsSchema.statics.getPublished = function () {
  return this.find({ isPublished: true }).sort({ publishDate: -1 });
};

// Instance method to increment views
newsSchema.methods.incrementViews = function () {
  this.views += 1;
  return this.save();
};

const News = mongoose.model('News', newsSchema);
export default News;
