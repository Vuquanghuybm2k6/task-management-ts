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

