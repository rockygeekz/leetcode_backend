// server/routes/roastRouter.js
const express = require('express');
const { addRoast, updateRoast, deleteRoast,getAllRoasts } = require('../controllers/roastController');

const router = express.Router();

router.post('/add', addRoast);
router.put('/update/:id', updateRoast);
router.delete('/delete/:id', deleteRoast);
router.get('/roasts', getAllRoasts);

module.exports = router;