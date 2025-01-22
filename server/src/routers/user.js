const express = require('express');
const router = express.Router();

const {
    getUser,
    postUser,
    deleteUser,
    editUser
} = require('../controllers/user');

router.get('/', getUser);
router.post('/', postUser);
router.delete('/:id', deleteUser);
router.put('/:id', editUser);

module.exports = router;
