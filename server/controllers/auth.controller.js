import User from "../models/user.model";
import jwt, { decode } from "jsonwebtoken";
import expressJwt from "express-jwt";
import config from "../config/config";

const signin = (req, res) => {
  User.findOne(
    {
      email: req.body.email,
    },
    (err, user) => {
      if (err || !user)
        return res.status("401").json({
          error: "User not found",
        });

      if (!user.authenticate(req.body.password)) {
        return res.status("401").send({
          error: "Email and password don't match.",
        });
      }
      const token = jwt.sign(
        {
          _id: user._id,
        },
        config.jwtSecret
      );

      res.cookie("t", token, {
        expire: new Date() + 9999,
      });
      return res.json({
        token,user:user.name,id:user._id
      });
    }
  );
};

const signout = (req, res) => {
  res.clearCookie("t");
  return res.status("200").json({
    message: "signed out",
  });
};

const requireSignin = expressJwt({
  secret: config.jwtSecret,
  userProperty: "auth",
  algorithms: ["HS256"],
});

const hasAuthorization = (req, res, next) => {
  const authorized = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!authorized) {
    return res.status("403").json({
      error: "User is not authorized",
    });
  }
  next();
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  const user_id = jwt.verify(token, config.jwtSecret)._id;
  User.findById(user_id).exec((err,result) =>{
    if(err) {
      return res.status("403").json({
        error: "User is not authorized",
      });
    }
    req.body.authId = result._id;
    next();
  })
  
 
};


export default {
  signin,
  signout,
  requireSignin,
  hasAuthorization,
  authenticateToken,
};
