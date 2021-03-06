import { Router } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/signup", async (req, res) => {
  passport.authenticate(
    "signup",
    { session: false },
    async (err, user, info) => {
      if (err || !user)
        return res
          .status(400)
          .json({
            txt: "User or password already exists",
            details: info.message,
          });
      if (user)
        res.json({
          message: "Signup successful",
          user: { _id: req.user._id, email: req.user.email },
        });
    }
  )(req, res);
});

router.post("/login", async (req, res, next) => {
  console.log(req.body);

  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err || !user) {
        console.log(err, info);

        const error = new Error("An error occurred. " + info.message);

        // return next(error);

        return res.status(400).json(error);
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        const body = { _id: user._id, email: user.email };
        const token = jwt.sign({ user: body }, "TOP_SECRET");

        return res.json({ token });
      });
    } catch (error) {
      return res.status(400).json(error);
    }
  })(req, res, next);
});

export default router;
