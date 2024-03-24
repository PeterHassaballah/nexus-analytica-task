import { RequestHandler } from "express";
import pick from "../utils/pick.js";
import * as userService from "../services/user.js";
import ApiError from "../utils/ApiError.js";

export const createUser: RequestHandler = async (req, res) => {
    try {
        const user = await userService.createUser(req.body);
        return res.status(201).send(user);
    } catch (err) {
        console.log("error creating user", err);
        return res.status(400).json({
            message: "4U001",
        });
    }
};

export const getUsers:RequestHandler = async (req, res) => {
    try {
        const filter = pick(req.query, ["name", "role"]);
        const options = pick(req.query, ["sortBy", "limit", "page"]);
        const result = await userService.queryUsers(filter, options);
        return res.send(result);
    } catch (err) {
        console.log("error getting user", err);
        return res.status(400).json({
            message: "4U002",
        });
    }
};
export const getUser:RequestHandler = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.userId);
        if (!user) {
            console.log("user not found");
            return res.status(404).json({
                message: "4U0031",
            });
        }
        return res.status(200).send(user);
    } catch (err) {
        console.log("error getting user", err);
        return res.status(400).json({
            message: "4U0032",
        });
    }
};

export const updateUser:RequestHandler = async (req, res) => {
    try {
        const user = await userService.updateUserById(req.params.userId, req.body);
        return res.send(user);
    } catch (err) {
        console.log("error updatting user", err);
        return res.status(400).json({
            message: "4U004",
        });
    }
};
export const getAggregations :RequestHandler = async(req,res)=>{

}
export const createFromJson :RequestHandler = async(req,res)=>{

}
