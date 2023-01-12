const router = require("express").Router();
const User = require("./../models/User");
const Posts = require("./../models/Post");
const bcrypt = require("bcrypt");

router.put("/:id", async(req, res) => {
    if (req.params.id === req.body.userId) {
        if (req.body.password) {
            const salt = bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, parseInt(salt));
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, {new: true});
            res
                .status(200)
                .json(updatedUser);
        } catch (error) {
            res
                .status(500)
                .json(error);
        }
    } else {
        res
            .status(401)
            .json("You can only update your account");
    }
});

// small error here
router.delete("/:id", async(req, res) => {
    if (req.params.id === req.body.userId) {
        try {
            let user = await User.findById(req.params.id)
            try {
                await Posts.deleteMany({username: user.username})
                await User.findByIdAndDelete(req.params.id);
                res.status(200).json("User has been deleted...");
                // let validation = bcrypt.compare(user.password, req.body.password);
                // if(validation) {     user.delete();     res.status(200).json("User has been
                // deleted"); }
            } catch (error) {
                res
                    .status(500)
                    .json(error);
            }
        } catch (error) {
            res.status(404).json("User not found!");
        }

    } else {
        res
            .status(401)
            .json("You can only delete your account")
    }
});

router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        let {password, ...others} = user._doc;
        res.status(200).json(others);
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;