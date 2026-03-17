import { Request, Response } from "express"
import Task from "../models/task.model"
import paginationHelper from "../../../helpers/pagination"
import searchHelper from "../../../helpers/search"

// [GET]: /api/v1/tasks
export const index  = async (req: Request, res: Response) => {
  // Find
  interface Find {
    deleted: boolean,
    status?: string,
    title?: RegExp,

  }
  const find:Find ={
    deleted: false
  }
  if(req.query.status){
    find["status"] = req.query.status.toString()
  }
  // End Find

  // Sort
  const sort = {}
  if(req.query.sortKey && req.query.sortValue){
    const sortKey = req.query.sortKey.toLocaleString()
    sort[sortKey] = req.query.sortValue
  }
  // End Sort

  // Pagination
  let initPagination = {
    currentPage: 1,
    limitItems: 2
  }
  const countTasks = await Task.countDocuments(find)
  const objectPagination = paginationHelper(
    initPagination,
    req.query,
    countTasks
  )
  // End Pagination

  // Search
    let objectSearch = searchHelper(req.query)
    if(req.query.keyword){
      find.title = objectSearch.regex
    }
  // End Search
  const tasks = await Task.find(find) 
  .limit(objectPagination.limitItems)
  .skip(objectPagination.skip)
  console.log(tasks)
  res.json(tasks)
}

// [GET]: /api/v1/tasks/detail
export const detail  = async (req: Request, res: Response) => {
  const id = req.params.id
  const task = await Task.findOne({
    _id: id,
    deleted: false
  })
  res.json(task)  
}

// [PATCH]: /api/v1/tasks/change-status/:id
export const changeStatus = async(req:Request, res: Response)=>{
  try{
      const id:string =req.params.id as string
      const status: string = req.body.status
      await Task.updateOne({
        _id: id,
      },{
        status: status
      })
      res.json({
        code: 200,
        message: "Cập nhật trạng thái thành công"
      })
    }
    catch(error){
      res.json({
        code: 400,
        message: "Không tồn tại"
      })
    }
}