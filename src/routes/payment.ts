import { Router } from "express";
import { PaymentOrder, PaymentVerify } from "../controllers/payment";
import { UserAuth } from "../middlewares/userAuth";

const router = Router();

router.post("/order", PaymentOrder);
router.post("/verify", UserAuth, PaymentVerify);

export default router;
