import Note from '../models/note.model';
// import bcrypt from 'bcrypt';

//import JSON web token
// const jwt = require('jsonwebtoken');


//create a new note
export const newNote = async (body) => {
  const data = await Note.create(body);
  return data;
};
  
//Get all notes 
export const getAllNotes = async (body) => {
  const data = await Note.find({ UserID: body.UserID });
  return data;
};

//Get a single note
export const getNote = async (id, body) => {
  const data = await Note.find({_id: id, UserID: body.UserID });
  return data;
};

//update single user
export const updateNote = async (_id, body) => {
  const data = await Note.findByIdAndUpdate(
    { _id }, body, {new: true}
  );
  return data;
};


//delete single note by id
export const deleteNote = async (id, body) => {
  await Note.findByIdAndDelete({_id: id, UserID: body.UserID });
  return '';
};



//Archived single note
export const archiveNote = async (id, body) => {
  const data = await Note.findByIdAndUpdate(
    {_id: id, UserID: body.UserID}, {isArchived : true, new: true} 
  );
  return "";
}; 


//Trashed single note
export const trashNote = async (id, body) => {
  const data = await Note.findByIdAndUpdate(
    {_id: id, UserID: body.UserID }, {isDeleted : true , new: true}
  );
  return "";
};