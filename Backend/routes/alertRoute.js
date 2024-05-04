const express = require("express");
const route = express.Router();
const Alert = require("../Schema/alert");



// add alert
route.post("/add", (req, res) => {
    try {
        const alert = req.body;
        new Alert(alert).save().then((data) => {
            return res.status(201).json({ message: "Data has been saved" });
        }).catch((err) => {
            console.error(`Error adding data to database: ${err}`);
            return res.status(500).json({ error: err })
        })
    } catch (error) {
        console.error(`Unexpected Error: ${error}`)
        return res.status(400).send('Bad request')
    }
})




// to get alert based on the requirement
route.get('/', async (req, res) => {
    try {
        const data = await Alert.find({})
        res.status(200).send({ success : true , data : data })
    } catch (error) {
    res.status(500).send({ success : false , msg : "Server problem we will be back sonn !!"})
    }
})

module.exports = route