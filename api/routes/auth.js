const router = require("express").Router();
const User = require("./../models/User");
const bcrypt = require("bcrypt");

// Register
router.post("/register", async (req, res) => {
    const {username, email, password} = req.body;

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);
        const newUser = new User({
            username,
            email,
            password: hashedPass,
        });

        const user = await newUser.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Login
router.post("/login", async (req, res) => {
    const {username, password} = req.body;

    try {
        const user = await User.findOne({username});
        if(!user) {
            res.status(400).json("Wrong credentials!");
        }else {
            const validate = await bcrypt.compare(password, user.password);
            if(validate) {
                const {password, ...others} = user._doc;
                res.status(200).json(others);
            }else {
                res.status(400).json("Wrong credentials!")
            }
        }
    } catch (error) {
        res.status(500).json(error);
    }
})



module.exports = router;