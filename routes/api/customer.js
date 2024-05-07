const router = require("express").Router();
const bcrypt = require("bcrypt");
const Customer = require("../../models/Customer");


async function encrptPassword(pw){
    const result = await bcrypt.hash(pw, 10)
    return result
}


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

// Create customer
router.post("/", async (req, res) => {
const newPassword = await encrptPassword(req.body.password)
req.body.password = newPassword;

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