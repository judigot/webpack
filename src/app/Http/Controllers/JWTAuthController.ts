import { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";

class JWTAuthController {
  static login(user: object, res: Response) {
    const accessToken = jwt.sign(
      user,
      <string>process.env.ACCESS_TOKEN_SECRET
      // { expiresIn: "5s" }
    );

    const refreshToken = jwt.sign(
      user,
      <string>process.env.REFRESH_TOKEN_SECRET
      // { expiresIn: "1d" }
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      // maxAge: 30 * 60 * 1000,
    });

    return accessToken;
  }

  static logoutClient(res: Response) {
    res.clearCookie("accessToken");
    // res.redirect("/login");
    return {
      redirect: "login",
    };
  }

  static logout(res: Response) {
    res.clearCookie("accessToken");
    res.redirect("/login");
  }

  // Check if token is verified or expired
  static auth(req: Request, res: Response) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    // const token = req.cookies.accessToken;
    if (token) {
      try {
        const user: any = jwt.verify(
          token,
          <string>process.env.ACCESS_TOKEN_SECRET
        );
        req.user = user;
        return {
          redirect: "user",
          user,
        };
      } catch (error) {
        res.sendStatus(403);
      }
    } else {
      return {
        redirect: "login",
      };
    }
  }

  // Check if token is verified or expired
  static checkAuthenticated(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.accessToken;
    if (token) {
      jwt.verify(
        token,
        <string>process.env.ACCESS_TOKEN_SECRET,
        (error: any, user: any) => {
          // Forbidden
          // if (error) return res.sendStatus(403);
          //=====CUSTOM=====//
          if (error) {
            this.logout(res);
          } else {
            req.user = user;
            res.redirect("/user");
          }
          //=====CUSTOM=====//
          // req.user = user;
          // res.redirect("/user");
        }
      );
    } else {
      next();
    }
  }

  // Check if token is verified or expired
  static checkNotAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const user = req.user;
    const token = req.cookies.accessToken;

    if (token) {
      jwt.verify(
        token,
        <string>process.env.ACCESS_TOKEN_SECRET,
        (error: any, user: any) => {
          // Forbidden
          // if (error) return res.sendStatus(403);
          //=====CUSTOM=====//
          if (error) {
            this.logout(res);
          } else {
            req.user = user;
            next();
          }
          //=====CUSTOM=====//
          // req.user = user;
          // next();
        }
      );
    } else {
      // Redirect if token is expired.
      // Prevents redirecting too many times
      // Forbidden
      // if (token == null) return res.sendStatus(403);
      //=====CUSTOM=====//
      res.redirect("/login");
      //=====CUSTOM=====//
    }
  }
}

export default JWTAuthController;
