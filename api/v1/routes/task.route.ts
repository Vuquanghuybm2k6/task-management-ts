import {Router, Request, Response} from 'express'
const router: Router = Router()
import * as controller from "../controllers/task.controller"
import Task from "../models/task.model";
router.get("/", controller.index);

router.get("/detail/:id", controller.detail);

export const taskRoutes: Router = router 