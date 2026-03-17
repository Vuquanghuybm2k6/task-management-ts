import {Router, Request, Response} from 'express'
const router: Router = Router()
import * as controller from "../controllers/task.controller"
import Task from "../models/task.model";
router.get("/", controller.index);

router.get("/detail/:id", controller.detail)

router.patch("/change-status/:id", controller.changeStatus)

router.patch("/change-multi", controller.changeMulti)

router.post("/create", controller.create)

router.patch("/edit/:id", controller.edit)

router.delete("/delete/:id", controller.deleteTask) // đặt là delete thì sẽ bị trùng tên với một hàm

export const taskRoutes: Router = router 