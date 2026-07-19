import TicketModel from "../models/Ticket.js";
import AppError from "../utils/AppError.js";

interface AdminUpdateTicketInput {
  status?: "Open" | "In Progress" | "Resolved" | "Closed";

  priority?: "Low" | "Medium" | "High";
}

// -------------------------------- View All Tickets --------------------------------

export const getAllTickets = async () => {
  const tickets = await TicketModel.find()
    .populate("createdBy", "name email")
    .sort({
      createdAt: -1,
    });

  return tickets;
};

// -------------------------------- Update Ticket --------------------------------

export const updateTicketByAdmin = async (
  ticketId: string,

  data: AdminUpdateTicketInput,
) => {
  const ticket = await TicketModel.findById(ticketId);

  if (!ticket) {
    throw new AppError("Ticket not found", 404);
  }

  if (data.status) {
    ticket.status = data.status;
  }

  if (data.priority) {
    ticket.priority = data.priority;
  }

  await ticket.save();

  const updatedTicket = await TicketModel.findById(ticket._id).populate(
    "createdBy",
    "name email",
  );

  return updatedTicket;
};

// -------------------------------- Dashboard Statistics --------------------------------

export const getDashboardStats = async () => {
  const stats = await TicketModel.aggregate([
    {
      $group: {
        _id: "$status",

        count: {
          $sum: 1,
        },
      },
    },
  ]);

  const dashboard = {
    Open: 0,

    "In Progress": 0,

    Resolved: 0,

    Closed: 0,
  };

  stats.forEach((item) => {
    dashboard[item._id as keyof typeof dashboard] = item.count;
  });

  return dashboard;
};
