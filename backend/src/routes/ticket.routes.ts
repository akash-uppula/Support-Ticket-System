import { Router } from "express";

import authenticate from "../middleware/auth.middleware.js";

import {
  createTicketController,
  getMyTicketsController,
  getTicketController,
  updateTicketController,
  deleteTicketController,
} from "../controllers/ticket.controller.js";

const router = Router();

router.get("/", authenticate, getMyTicketsController);

router.get("/:id", authenticate, getTicketController);

router.post("/", authenticate, createTicketController);

router.put("/:id", authenticate, updateTicketController);

router.delete("/:id", authenticate, deleteTicketController);

export default router;
