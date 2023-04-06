import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/index.js";

export const postLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username } = req.body;
    const user = await User.findOne({ username });
    // Create and sign access token
    const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1m",
    });
    const refreshToken = jwt.sign(
      { id: user.id },
      process.env.JWT_REFRESH_SECRET_KEY,
      {
        expiresIn: "5m",
      }
    );
    user.refreshToken = refreshToken;
    res.setHeader(
      "Set-Cookie",
      `token=${accessToken}; Path=/; HttpOnly; Secure; SameSite=Strict`
    );
    res.send({ message: "Successfully logged in." });
  } catch (err) {
    next(err);
  }
};

// export const refreshToken = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { refreshToken } = req.body;
//     if (!refreshToken) {
//       return res.sendStatus(401);
//     }
//     const user = await User.findOne({ refreshToken })
//       .select("refreshToken")
//       .exec();
//     jwt.verify(
//       user.refreshToken,
//       process.env.REFRESH_TOKEN_SECRET,
//       (err, user) => {
//         if (err) {
//           return res.sendStatus(403);
//         }

//         const accessToken = jwt.sign(
//           { id: user.id },
//           process.env.ACCESS_TOKEN_SECRET,
//           {
//             expiresIn: "15m",
//           }
//         );

//         res.send({ accessToken });
//       }
//     );
//   } catch (err) {
//     next(err);
//   }
// };

export const postRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password, email, ipAddress } = req.body;
    const user = new User({
      username,
      email,
      ipAddress,
    });
    user.password = await new Promise<string>((resolve, reject) => {
      bcrypt.hash(password, 10, function (err, hash) {
        if (err) {
          reject(err);
        } else {
          resolve(hash);
        }
      });
    });
    await user.save();
    res.status(201).send({ message: "User successfully created." });
  } catch (err) {
    next(err);
  }
};
