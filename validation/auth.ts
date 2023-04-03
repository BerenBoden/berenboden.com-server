import { body } from "express-validator";

const postRegister = [
  body("username")
    .trim()
    .isLength({ min: 1, max: 32 })
    .withMessage("Please enter a valid username.")
    .bail()
    .matches(/^[a-zA-Z0-9._-]*$/)
    .withMessage(
      "Username can only contain letters, numbers, periods, underscores, and hyphens."
    )
    .bail()
    .equals("wNOGr4nOevpneAMrVmUS")
    .withMessage(
      "You are not permitted to sign up to this application. Your I.P address has been logged."
    ),
  body("password")
    .isLength({ min: 1, max: 32 })
    .withMessage("Please enter a valid password")
    .bail()
    .custom(async (value, { req }) => {
      if (value != req.body.passwordConfirmation) {
        return Promise.reject("Your passwords do not match.");
      }
    }),
];

const postLogin = [
  body("username")
    .trim()
    .isLength({ min: 1, max: 32 })
    .withMessage("Please enter a valid username.")
    .bail()
    .matches(/^[a-zA-Z0-9._-]*$/)
    .withMessage(
      "Username can only contain letters, numbers, periods, underscores, and hyphens."
    ),
  body("password")
    .isLength({ min: 1, max: 32 })
    .withMessage("Please enter a valid password."),
];
export default { postLogin, postRegister };
