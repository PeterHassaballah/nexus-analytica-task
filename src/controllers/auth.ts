import { RequestHandler } from "express";
import * as userService from "../services/user";
export const register:RequestHandler = async (req, res) => {
    try {
      const user = await userService.createUser(req.body);
      return res.status(201).send({
        user,
      });
    } catch (error) {
      // TODO add winston logger
      console.log("error in registration", error);
      return res.status(400).json({
        message: "4A001",
      });
    }
  };
  