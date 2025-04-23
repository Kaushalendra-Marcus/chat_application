import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import createTokenAndSaveCookie from '../jwt/generateToken.js'
export const signUp = async (req, res) => {
    try {
        const { username, fullName, password, confirmPassword, email } = req.body

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Confirm Password do not match" })
        }   
        // check is user exist
        const exisitingUser = await User.findOne({ $or: [{ email }, { username }] })
        if (exisitingUser) {
            return res.status(400).json({ message: exisitingUser.email === email ? "Email already exists" : "Username already taken" })
        }

        const newUser = new User({
            username,
            fullName,
            password,
            email
        })

        await newUser.save();
        createTokenAndSaveCookie(newUser._id, res);
        res.status(201).json({
            message: "User registered successfully",
            user: {
                _id: newUser.id,
                username: newUser.username,
                email: newUser.email
            }
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Error" })
    }
}

export const signIn = async (req, res) => {
    try {
        const { identifier, password } = req.body;

        if (!identifier || !password) {
            return res.status(400).json({ message: "Email or username and password are required" });
        }

        // Find user by either email or username
        const user = await User.findOne({
            $or: [
                { email: identifier },
                { username: identifier }
            ]
        }).select('+password');

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        createTokenAndSaveCookie(user._id, res);

        return res.status(200).json({
            message: "User logged in successfully",
            user: {
                _id: user.id,
                name: user.fullName,
            }
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error" });
    }
};



export const logOut = async (req, res) => {
    try {
        res.clearCookie('jwt')
        return res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error" })
    }
}


export const getUserProfile = async (req, res) => {
    try {
        const loggedInUser = req.user._id
        const allUsers = await User.find(
            { _id: { $ne: loggedInUser } }
        ).select("-password -email")
        res.status(201).json({ allUsers })
    } catch (error) {
        console.error("Error in allUser controllers: " + error);
        res.status(500).json({ message: "Server Error" })

    }
}

export const deleteAccount = async (req, res) => {
    try {
        const userId = req.user._id
        if (!userId) {
            console.error("Error found in finding User Id :", message);
        }
        await User.findByIdAndDelete(userId)
        res.clearCookie('jwt')
        res.status(200).json({ message: "Account deleted successfully" })
    } catch (error) {
        res.status(500).json({ message: "Failed to delete account", error: error.message });
    }
}

      