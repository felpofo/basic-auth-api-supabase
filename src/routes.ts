import { Router } from "express";
import * as Middlewares from "./middlewares";
import * as Controllers from "./controllers";

interface Route {
  path: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "OPTIONS" | "HEAD";
  controller: Controllers.Controller;
  middlewares?: Middlewares.Middleware[];
}

class Routes {
  private router = Router();

  constructor() {
    this.routes.forEach(async (route) => {
      const { path, method, controller: { handle: end }, middlewares } = route;

      const interceptors = middlewares?.map((middleware) => middleware.intercept) ?? [];

      switch (method) {
      case "GET":     this.router.get(path, interceptors, end); break;
      case "POST":    this.router.post(path, interceptors, end); break;
      case "PUT":     this.router.put(path, interceptors, end); break;
      case "PATCH":   this.router.patch(path, interceptors, end); break;
      case "DELETE":  this.router.delete(path, interceptors, end); break;
      case "OPTIONS": this.router.options(path, interceptors, end); break;
      case "HEAD":    this.router.head(path, interceptors, end); break;
      }
    });
    
    return this;
  }

  public getRoutes(): Router { return this.router; }

  private routes: Route[] = [
    {
      method: "GET",
      path: "/",
      controller: { async handle(_, res) { res.status(200).json({ message: "OK" }); }},
    },
    {
      method: "POST",
      path: "/login",
      controller: new Controllers.LoginController,
    },
    {
      method: "POST",
      path: "/signup",
      controller: new Controllers.SignUpController,
    },
    {
      method: "GET",
      path: "/user-content",
      middlewares: [new Middlewares.EnsureAuth],
      controller: new Controllers.UserContentController,
    },
    {
      method: "GET",
      path: "/admin-content",
      middlewares: [
        new Middlewares.EnsureAuth,
        new Middlewares.EnsureAdmin
      ],
      controller: new Controllers.AdminContentController,
    }
  ];
}

export default new Routes().getRoutes();
