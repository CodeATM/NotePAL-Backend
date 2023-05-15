const express = require('express')
const router = express.Router()

const { getNotes, addNotes, updateNotes, deleteNotes } = require('../Controllers/noteController')

const {protect} = require('../middleware/authMiddleware')


router.route('/').get(protect, getNotes).post(protect, addNotes)
router.route('/:id').delete(protect, deleteNotes).put(protect, updateNotes)


module.exports = router