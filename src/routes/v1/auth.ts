import { Router } from "express";
import validate from "../../middlewares/validate";
import {
  register,
} from "../../validations/auth";

import {
  register as _register,
} from "../../controllers/auth";

const router= Router();
//routes

router.post("/register", validate(register), _register);
// todo add login and log out with validations
//export authRoute
export default router;