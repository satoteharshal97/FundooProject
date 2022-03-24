import express from 'express';
import * as noteController from '../controllers/note.controller';
import { newNoteValidator } from '../validators/note.validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to create a new note
router.post('', userAuth, noteController.newNote);

//route to get all notes by user's object id
router.get('', userAuth, noteController.getAllNotes); //not working

//route to get a single note by their note id and UserID
router.get('/:_id', userAuth, noteController.getNote);  

//route to update a single note by their note id and UserId
router.put('/:_id', userAuth, noteController.updateNote);

//route to delete a single note by their note id and UserID
router.delete('/:_id', userAuth, noteController.deleteNote);

//route to archive a single note by their id and UserID
router.put('/isArchived/:_id', userAuth, noteController.archiveNote);

//routr to trash a single note by their id and UserID
router.put('/isDeleted/:_id', userAuth, noteController.trashNote);


export default router;