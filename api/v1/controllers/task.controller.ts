import { Request, Response } from "express"
import Task from "../models/task.model"
export const index  = async (req: Request, res: Response) => {
  // Find
  const find ={
    deleted: false
  }
  if(req.query.status){
    find["status"] = req.query.status
  }
  // End Find

  // Sort
  const sort = {}
  if(req.query.sortKey && req.query.sortValue){
    const sortKey = req.query.sortKey.toLocaleString()
    sort[sortKey] = req.query.sortValue
  }
  // End Sort
  const tasks = await Task.find(find)
  console.log(tasks)
  res.json(tasks)
}
export const detail  = async (req: Request, res: Response) => {
  const id = req.params.id
  const task = await Task.findOne({
    _id: id,
    deleted: false
  })
  res.json(task)  
}