import { Schema, model } from 'mongoose';

const noteSchema = new Schema(
  {
    Title: {
        type: String,
        required: true,
        trim: true
    },
    Description: {
        type: String,
        required: true,
        trim: true
    },
    Color: {
        type: String,
        trim: true
    },
    isArchived: {
        type: Boolean,
        trim: true
    },
    isDeleted: {
        type: Boolean,
        trim: true
    },
    UserID: {
        type : String,
    }
},
  {
    timestamps: true
  }
);

export default model('Note', noteSchema);
