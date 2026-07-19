import TicketModel from "../models/Ticket.js";
import { ITicket } from "../models/Ticket.js";
import AppError from "../utils/AppError.js";

interface CreateTicketInput {
  title: string;

  description: string;

  category: "Technical" | "Billing" | "Account" | "Bug" | "Feature Request";

  priority?: "Low" | "Medium" | "High";
}

interface UpdateTicketInput {
  title?: string;

  description?: string;

  category?: "Technical" | "Billing" | "Account" | "Bug" | "Feature Request";
}

// ----------------------------Create Ticket----------------------------

export const createTicket = async (data: CreateTicketInput, userId: string) => {
  const ticket = await TicketModel.create({
    ...data,

    createdBy: userId,
  });

  return ticket;
};

// ----------------------------Get My Tickets----------------------------

export const getMyTickets = async (userId: string) => {
  const tickets = await TicketModel.find({
    createdBy: userId,
  }).sort({
    createdAt: -1,
  });

  return tickets;
};

// ----------------------------Get Ticket By Id----------------------------

export const getTicketById = async (ticketId: string, userId: string) => {
  const ticket = await TicketModel.findOne({
    _id: ticketId,
    createdBy: userId,
  });

  if (!ticket) {
    throw new AppError("Ticket not found", 404);
  }

  return ticket;
};

// ----------------------------Update Ticket----------------------------

export const updateTicket = async (
  ticketId: string,
  userId: string,
  data: UpdateTicketInput,
) => {
  const ticket = await TicketModel.findOne({
    _id: ticketId,

    createdBy: userId,
  });

  if (!ticket) {
    throw new AppError("Ticket not found", 404);
  }

  Object.assign(ticket, data);

  await ticket.save();

  return ticket;
};

// ----------------------------Delete Ticket----------------------------

export const deleteTicket = async (ticketId: string, userId: string) => {
  const ticket = await TicketModel.findOneAndDelete({
    _id: ticketId,

    createdBy: userId,
  });

  if (!ticket) {
    throw new AppError("Ticket not found", 404);
  }

  return ticket;
};
