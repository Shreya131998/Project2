const express = require('express');
const router = express.Router();
const collegeController=require("../controller/collegeController")
const internController = require("../controller/internController")
//All Router
router.post("/functionup/colleges",collegeController.createCollege)
router.post('/functionup/interns',internController.createIntern)
router.get('/functionup/collegeDetails',collegeController.collegeDetails)









module.exports = router;