import jwt from 'jsonwebtoken';
import User from "../models/User.mjs";
import logger from '../utils/logger.mjs';
import bcrypt from 'bcrypt';

export const Login = async (req, res) => {
    const { username, password } = req.body;

    if (username === "") {
        logger.info("Username cannot be null");
        return res.status(400).json({ status: "Username cannot be null" });
    } else if (password === "") {
        logger.info("Password cannot be null");
        return res.status(400).json({ status: "Password cannot be null" });
    }

    try {
        const user = await User.findOne({ username });

        if (!user) {
            logger.info("User not found");
            return res.status(404).json({ status: "User not found" });
        }

        if (username === user.username) {
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    logger.error(`Error in Login ${err}`);
                    return res.status(500).json({ status: "Error", err });
                }
    
                if (result) {
                    const accessToken = jwt.sign({
                        username: user.username,
                        email: user.email,
                        role: user.role
                    }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' });
    
                    const refreshToken = jwt.sign({
                        username: user.username,
                    }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
    
                    res.cookie('jwt', refreshToken, {
                        httpOnly: true,
                        sameSite: 'None',
                        secure: true,
                        maxAge: 24 * 60 * 60 * 1000
                    });
                    logger.info("Access token created successfully");
                    return res.status(200).json({ accessToken });
                } else {
                    logger.info("Wrong password");
                    return res.status(401).json({ status: "Wrong password" });
                }
            });
        } else {
            logger.info("Invalid username");
            return res.status(401).json({ status: "Invalid username" });
        }
    } catch (err) {
        logger.error(`Error in Login ${err}`);
        return res.status(500).json({ status: "Error", err });
    }
}

export const Refresh = (req, res) => {
    if (req.cookies?.jwt) {

        const refreshToken = req.cookies.jwt;

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET,
            (err, decoded) => {
                if (err) {
                    logger.info("Unauthorized");
                    return res.status(401).json({ status: "Unauthorized" });
                }
                else {
                    const accessToken = jwt.sign({
                        username: user.username,
                        email: user.email,
                        role: user.role
                    }, process.env.ACCESS_TOKEN_SECRET, {
                        expiresIn: '10m'
                    });
                    return res.status(200).json({ accessToken });
                }
            });
    } else {
        logger.info("Unauthorized");
        return res.status(401).json({ status: "Unauthorized" });
    }
}

