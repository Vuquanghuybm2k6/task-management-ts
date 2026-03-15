import {Router, Request, Response} from 'express'
const router: Router = Router()
//const controller = require("../controllers/task.controller")
import Task from "../../../models/task.model";
router.get("/", async (req: Request, res: Response) => {
  const tasks = await Task.find({
    deleted: false
  })
  console.log(tasks)
  res.json(tasks)
});

router.get("/detail/:id", async (req: Request, res: Response) => {
  const id = req.params.id
  const task = await Task.findOne({
    _id: id,
    deleted: false
  })
  res.json(task)  
});

export const taskRoutes: Router = router 