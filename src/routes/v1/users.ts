import { Router } from "express";
import validate from "../../middlewares/validate";
import multer from 'multer';
import { createUser, getUsers, getUser, updateUser, } from "../../validations/user";
import {
  createUser as _createUser,
  getUsers as _getUsers,
  getUser as _getUser,
  updateUser as _updateUser,
  createFromJson,
  getAggregations,
  getAvgAge
} from "../../controllers/user";
const upload = multer({   storage: multer.memoryStorage(),}); 
const router = Router();
//routes
//todo add auth mw to validate roles
router
  .route("/")
  .post(validate(createUser), _createUser)
  .get(validate(getUsers), _getUsers);
// getting average users age
router.get('/average', getAvgAge);
// getting active and non-active count
router.get('/activeCount', getAggregations);
// uploading json to create users
router.post('/uploadUsers',upload.single('users'), createFromJson);
router
  .route("/:userId")
  .get(validate(getUser), _getUser)
  .patch(validate(updateUser), _updateUser);

//export authRoute
export default router;