import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/index.js";
import { validationResult } from "express-validator";

export const postLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (!user) {
      return res.status(400).send("Username or password is incorrect");
    }
    // Validate password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).send("Username or password is incorrect");
    }
    // Create and sign access token
    const accessToken = jwt.sign(
      { id: user.id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1m",
      }
    );
    res.send({ accessToken });
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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const user = new User({
      username,
      email,
      ipAddress,
    });
    bcrypt.hash(password, 10, function (err, hash) {
      user.password = hash;
    });
    await user.save();
    res.status(201).send({ message: "User successfully created." });
  } catch (err) {
    next(err);
  }
};
