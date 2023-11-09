const express = require('express');
const mongoose = require('mongoose');
let port = 6001;
let app = express();
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/samcomntask1').then(() =>
  console.log('database connected')
);

let user = require('./models/user.model')
let vehicle = require('./models/vehicle.model')
let ownership = require('./models/ownership.model')

app.post('/api/v1/addUser', async (req, res) => {
  try {
    let result = await user(req.body).save()
    if (result) {
      res.status(200).json({
        status: "SUCCESS",
        message: 'User added successfullly',
        data: result
      })
    } else {
      res.status(400).json({
        status: "FALIUER",
        message: 'Unable to add user',
        error: "API error"
      })
    }
  } catch (error) {
    res.status(500).json({
      status: "FALIUER",
      message: 'Something Went Wrong',
      error: error.message
    })
  }
})

app.post('/api/v1/addVehicle', async (req, res) => {
  try {
    let result = await vehicle(req.body).save()
    if (result) {
      res.status(200).json({
        status: "SUCCESS",
        message: 'Vehicle added successfullly',
        data: result
      })
    } else {
      res.status(400).json({
        status: "FALIUER",
        message: 'Unable to add Vehicle',
        error: "API error"
      })
    }
  } catch (error) {
    res.status(500).json({
      status: "FALIUER",
      message: 'Something Went Wrong',
      error: error.message
    })
  }
})

app.post('/api/v1/createOwnership', async (req, res) => {
  try {
    let result = await ownership(req.body).save()
    if (result) {
      res.status(200).json({
        status: "SUCCESS",
        message: 'Ownership created successfullly',
        data: result
      })
    } else {
      res.status(400).json({
        status: "FALIUER",
        message: 'Unable to create ownership',
        error: "API error"
      })
    }
  } catch (error) {
    res.status(500).json({
      status: "FALIUER",
      message: 'Something Went Wrong',
      error: error.message
    })
  }
})

// /user_owned_vechicles/{userId} = Get all the vehicles owned by particular user (userId)

app.get('/api/v1/user_owned_vechicles/:userId', async (req, res) => {
  try {
    let userId = req.params.userId
    let vehicles = []
    let result = await ownership.find({ userId: userId })
      .populate('vehicleId')
      .populate('userId')

    result.forEach((ele) => {
      vehicles.push({
        vehicleName: ele.vehicleId.vehicleName,
        vehicleBrand: ele.vehicleId.vehicleBrand,
        vehicleNumber: ele.vehicleId.vehicleNumbe,

      })
    })

    let finalResult = {
      name: result[0].userId.name,
      surname: result[0].userId.surname,
      vehicleOwned: vehicles
    }

    res.status(200).json({
      status: "SUCCESS",
      message: 'Data fetched sccessfullly',
      data: finalResult
    })
  } catch (error) {
    res.status(500).json({
      status: "FALIUER",
      message: 'Unable to fetchdata',
      data: error
    })
  }
})


//filter = filter vehicle with regex for each field except id

app.get('/api/v1/filter', async (req, res) => {
  try {
    let { key } = req.query;
    let userCondition = { $or: [{ name: { $regex: key, $options: 'i' } }, { surname: { $regex: key, $options: 'i' } }] }
    let vehicleCondition = { $or: [{ vehicleName: { $regex: key, $options: 'i' } }, { vehicleBrand: { $regex: key, $options: 'i' } }] }
    let userResult = await user.find(userCondition)
    let vehicleResult = await vehicle.find(vehicleCondition)

    let finalResult = {
      userData: userResult,
      vehicleData: vehicleResult
    }
    res.status(200).json({
      status: "SUCCESS",
      message: 'Data fetched sccessfullly',
      data: finalResult
    })
  } catch (error) {
    res.status(500).json({
      status: "FALIUER",
      message: 'Unable to fetchdata',
      error: error
    })

  }
})


app.listen(port, () => {
  console.log("server connected to port: ", port);
});