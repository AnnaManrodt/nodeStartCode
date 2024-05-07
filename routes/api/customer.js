const router = require("express").Router();
const bcrypt = require("bcrypt");
const Customer = require("../../models/Customer");


// async function encrptPassword(pw){
//     const result = await bcrypt.hash(pw, 10)
//     return result
// } this was incryting htat password see the modal for the better way 


// Get all customers
router.get("/api/customer", async (req, res) => {
    try {
        const result = await Customer.findAll()
        res.json({ status: "success", payload: result })
    } catch (err) {
        res.status(400).json({ status: "error" })
    }
})

// Get customer by id
router.get("/customer/:id", async (req, res) => {
    try {
        const result = await Customer.findByPk(req.params.id)
        res.json({ status: "success", payload: result })
    } catch (err) {
        res.status(400).json({ status: "error" })
    }
})

//All Login request are handled here
router.post("/login", async (req, res) => {
    let emailCheck
        try {
            emailCheck = await Customer.findOne(req.body)
            where: {
                email: req.body.email
            }
        } catch (err) {
            res.status(400).json({ status: "error" })
        }

        if(!emailCheck){
            return res.status(401).json({status: "error"})
        }
        //if we are this far then the email matched 
        const hashedPassword = emailCheck.password;

        //time to verify the hashed password
        const verified = await bcrypt.compare(req.body.password, hashedPassword)

        if(verified){
            res.status(200).json({status: "sucess"})
        }
        else{
            res.status(400).json({ status: "error" })
        }
    })



// Create customer
router.post("/", async (req, res) => {
// const newPassword = await encrptPassword(req.body.password)
// req.body.password = newPassword; is part of the incytpions on line 6

    try {
        const result = await Customer.create(req.body)
        res.json({ status: "success", payload: result })
    } catch (err) {
        res.status(400).json({ status: "error" })
    }
})


// Update customer
router.put("/:id", async (req, res) => {
    try {
        const result = await Customer.update(req.body, { where: { id: req.params.id } })
        res.json({ status: "success", payload: result })
    } catch (err) {
        res.status(400).json({ status: "error" })
    }
})


module.exports = router;