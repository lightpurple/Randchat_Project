import jwt from "jsonwebtoken";
import * as EmailValidator from "email-validator";
const { verify } = jwt;
const { validate } = EmailValidator;

export default {
  register: (req, res, next) => {
    if (
      !(
        req.body.email &&
        validate(req.body.email) &&
        req.body.gender &&
        (req.body.gender === "F" || req.body.gender === "M") &&
        req.body.nickname &&
        req.body.password &&
        req.body.password.length >= 8
      )
    ) {
      return res.status(400).send({
        msg: "Something wrong!",
      });
    }
    next();
  },
  isLoggedin: (req, res, next) => {
    var token = req.headers["x-access-token"];

    if (!token) {
      return res.status(403).send({
        msg: "No token provided!",
      });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          msg: "Unauthorized!",
        });
      }
      req.decoded = decoded;
      next();
    });
  },
};
