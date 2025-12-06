const data = require("../data");
const User = require("../models/userModel");

const seedUser = async(req,res,next) => {
    try {
        await User.deleteMany({});
        const users = await User.insertMany(data.users);
        return res.status(201).json(users);
    } catch (error) {
        next(error);
    }

};

const getSeedUser = async(req,res,next) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        return res.status(201).json(user);

    } catch (error) {
        next(error);
    }
}

module.exports = {seedUser,getSeedUser};