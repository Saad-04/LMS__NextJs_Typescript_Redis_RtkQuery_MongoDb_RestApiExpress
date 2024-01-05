
import express from "express";

import { authorizedRole, isAuthenticated } from "../middleware/auth";
import { createOrder, getAdminAllOrders, newPayment, sendStripePublishableKey } from "../controllers/order.controller";

const orderRouter = express.Router();

orderRouter.route("/createOrder").post(isAuthenticated, createOrder);
orderRouter.get(
  "/get-admin-orders",
  isAuthenticated,
  authorizedRole("admin"),
  getAdminAllOrders
);
// payment integration 
orderRouter.get("/payment/stripepublishablekey", sendStripePublishableKey);
// 
orderRouter.post("/payment", isAuthenticated, newPayment);

// authorizedRole()

export default orderRouter;

