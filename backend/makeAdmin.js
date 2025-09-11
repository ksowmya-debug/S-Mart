import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import User from './models/userModel.js';

connectDB();

const makeAdmin = async () => {
    try {
        const email = 'sowmya0410.k@gmail.com';
        const user = await User.findOne({ email });

        if (user) {
            user.isAdmin = true;
            await user.save();
            console.log(`${email} is now an admin!`);
        } else {
            console.log(`User with email ${email} not found.`);
        }
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

makeAdmin();
