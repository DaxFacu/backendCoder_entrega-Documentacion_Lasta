import express from "express";
import { ProductManager } from "../ProductManager.js";
import { ProductModel } from "../DAO/mongo/models/products.model.js";
import { checkAdmin, checkUser, checkLogin } from "../middlewares/auth.js";

const productManager = new ProductManager("Products.json");

export const viewsRouter = express.Router();

viewsRouter.use(express.json());
viewsRouter.use(express.urlencoded({ extended: true }));

// viewsRouter.get("/", (req, res) => {
//   let products = productManager.getProducts();
//   res.render("home", { products });
// });

viewsRouter.get("/", (req, res) => {
  let products = productManager.getProducts();
  res.render("login-form");
});

viewsRouter.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts", {});
});

viewsRouter.get("/login", async (req, res) => {
  res.render("login-form");
});

viewsRouter.get("/register", async (req, res) => {
  res.render("register-form");
});

viewsRouter.get("/profile", (req, res) => {
  const userName = req.user.firstName;
  const userLastName = req.user.lastName;
  const userMail = req.user.email;
  const userRol = req.user.rol;

  res.render("profile", { userName, userLastName, userMail, userRol });
});

viewsRouter.get("/products", async (req, res) => {
  try {
    const { page, limit, category, status, sort } = req.query;
    const user = [
      req.user._id,
      req.user.email,
      req.user.firstName,
      req.user.lastName,
      req.user.rol,
    ];

    const userName = req.user.firstName;
    const userLastName = req.user.lastName;
    const userMail = req.user.email;
    const userRol = req.user.rol;

    console.log(user);
    var querySelect = undefined;
    if (category) {
      querySelect = { category: category };
    } else if (status) {
      querySelect = { status: status };
    } else {
      querySelect = undefined;
    }
    const products = await ProductModel.paginate(
      { ...querySelect },
      {
        limit: limit || 10,
        page: page || 1,
        sort: { price: sort },
      }
    );
    let product = products.docs.map((product) => {
      return {
        title: product.title,
        description: product.description,
        stock: product.stock,
        price: product.price,
      };
    });

    console.log(product);

    res.render("products", {
      status: "success",
      userName: userName,
      userLastName: userLastName,
      userMail: userMail,
      userRol: userRol,
      product: product,
      pagingCounter: products.pagingCounter,
      totalPages: products.totalPages,
      prevPage: products.prevPage,
      nextPage: products.nextPage,
      page: products.page,
      hasPrevPage: products.hasPrevPage,
      hasNextPage: products.hasNextPage,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: "error",
      msg: "something went wrong :(",
      data: {},
    });
  }
});

viewsRouter.get("/faillogin", async (req, res) => {
  return res.render("error-page", {
    msg: "No se pudo iniciar sesion",
    link: "/login",
    textLink: "Volver al login",
  });
});

viewsRouter.get("/failregister", async (req, res) => {
  return res.render("error-page", {
    msg: "No se pudo registrar",
    link: "/register",
    textLink: "Volver al registro",
  });
});

viewsRouter.get("/paneladmin", checkAdmin, (req, res) => {
  res.send("Panel ADMIN");
});
