import { Request, Response } from "express"
import md5 from "md5"
import User from "../models/user.model"

// [POST]: /api/v1/users/register
export const index = async (req: Request, res: Response) => {
  return res.json({
    code: 400,
    message: "Task Management API is running...",
    version: "1.0.0",
    author: "Vu Quang Huy",
    status: "success",
    endpoints: {
      tasks: "/api/v1/tasks",
      users: "/api/v1/users"
    }
  })
}