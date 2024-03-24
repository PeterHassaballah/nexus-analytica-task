import { Router } from "express";
import authRoute from './auth';
import userRoute from './users';
const router = Router();
const defaultRoutes=[{
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/users",
    route: userRoute,
  }];
defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
// export default router;
export { router as indexRoute };