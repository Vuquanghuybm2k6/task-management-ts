import { Request, Response } from "express"
import md5 from "md5"
import User from "../models/user.model"

// [POST]: /api/v1/users/register
export const register = async (req: Request, res: Response) => {
  try {
    const existEmail = await User.findOne({
      email: req.body.email,
      deleted: false
    })
    if (existEmail) {
      return res.json({
        code: 400,
        message: "Email này đã tồn tại"
      })
    } else {
      req.body.password = md5(req.body.password)
      const user = new User(req.body)
      await user.save()
      const token = user.token
      res.cookie("token", token)
      return res.json({
        code: 200,
        message: "Đăng kí thành công",
        token: token
      })
    }
  } catch (error) {
    return res.json({
      code: 400
    })
  }
}

// [POST]: /api/v1/users/login
export const login = async (req: Request, res: Response) => {
  try {
    const email = req.body.email
    const password = req.body.password
    const user = await User.findOne({
      email: email,
      deleted: false
    })
    if (!user) {
      return res.json({
        code: 400,
        message: "Không tồn tại email này"
      })
    } 
    if(md5(password) !== user.password ){
      return res.json({
        code: 400,
        message: "Sai mật khẩu"
      })
    }
    res.cookie("token", user.token)
    return res.json({
      code: 200,
      message: "Đăng nhập thành công",
      token: user.token
    })
  } catch (error) {
    return res.json({
      code: 500,
      message: "Server error",
    })
  }
}

// [GET]: /api/v1/users/detail/:id
export const detail = async (req: Request, res: Response) => {
  res.json({
    code: 200,
    message: "Truy cập thành công",
    info: req["user"]
  })
}