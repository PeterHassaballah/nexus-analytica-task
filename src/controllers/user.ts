import { RequestHandler,Response } from "express";
import pick from "../utils/pick";
import * as userService from "../services/user";
import { validateJSON } from "../middlewares/user";

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
        const filter = pick(req.query, ["name", "age","active"]);
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
    try {
        const response = await userService.calculateUserStatistics();
        if(!response){
            return  res.status(400).json({
                message: "error getting statstics",
            });
        }
        return res.status(200).json({"data":response});
    } catch (err) {
        console.log("error getting statstics", err);
        return res.status(400).json({
            message: "4U005",
        });
    }
}
export const getAvgAge :RequestHandler = async(req,res)=>{
    try {
        const response = await userService.calculateAverageAge();
        return res.status(200).json({"data":response});
    } catch (err) {
        console.log("error getting statstics", err);
        return res.status(400).json({
            message: "4U006",
        });
    }
}
export const createFromJson = async(req:any,res:Response)=>{
    try {
        // console.log("the body",req);    
        const fileContent =req.file.buffer;
        const users =JSON.parse(fileContent.toString());
        console.log("the users",users);
        
        const validate = validateJSON(users);
        if(!validate){
            return res.status(400).json({"message":"Invalid json"});
        }
        const response = await userService.createMany(users);
        if(!response){
            return res.status(400).json({"message":"Error inserting to DB"});
        }
        return res.status(200).json(response);
    } catch (err) {
        console.log("error uploading users", err);
        return res.status(400).json({
            message: err,
        });
    }

}
