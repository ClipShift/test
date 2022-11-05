const express = require('express');
const router = express.Router();
const HospitalController = require('../controllers/hospitalController'); 

router.route('/')
    .get(HospitalController.getAllHospitals)
    .post(HospitalController.createNewHospital)
    .patch(HospitalController.updateHospital)
    .delete(HospitalController.deleteHospital)

module.exports = router;