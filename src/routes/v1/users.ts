import { Router } from "express";
import validate from "../../middlewares/validate";

import { createUser, getUsers, getUser, updateUser,  } from "../../validations/user";
import {
    createUser as _createUser,
    getUsers as _getUsers,
    getUser as _getUser,
    updateUser as _updateUser,
    createFromJson,
    getAggregations
  } from "../../controllers/user";
const router= Router();
//routes
//todo add auth mw to validate roles
router
  .route("/")
  .post( validate(createUser), _createUser)
  .get( validate(getUsers), _getUsers);

router
  .route("/:userId")
  .get( validate(getUser), _getUser)
  .patch( validate(updateUser), _updateUser);
//export authRoute
export default router;