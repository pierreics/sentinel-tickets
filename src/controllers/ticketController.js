import db from "../config/db.js";

const createTicket = (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const is_confidential = req.body.is_confidential || 0;
  const user_id = req.user.id;
  if (!title || !description) {
    return res.status(400).json({
      success: false,
      error: "Title and description are required",
    });
  }

  const query =
    "INSERT INTO tickets (title, description, is_confidential, user_id) VALUES (?, ?, ?, ?)";
  db.run(query, [title, description, is_confidential, user_id], function (err) {
    if (err) {
      return res.status(500).json({
        success: false,
        error: "Internal Error",
      });
    }
    return res.status(201).json({
      success: true,
      message: "Ticket successfully created",
      data: this.lastID,
    });
  });
};

const getMyTickets = (req, res) => {
  const id = req.user.id;
  const query = "SELECT * FROM tickets WHERE user_id = ?";
  db.all(query, [id], (err, rows) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: "Internal error",
      });
    }
    let data = rows.map((ticket) => ({
      id: ticket.id,
      title: ticket.title,
      description: ticket.description,
      is_confidential: ticket.is_confidential,
    }));
    return res.status(200).json({
      success: true,
      data: data,
    });
  });
};

const getTicketById = (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({
      success: false,
      error: "Ticket's id is required",
    });
  }
  const query = "SELECT * FROM tickets WHERE id = ?";
  db.get(query, [id], (err, row) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: "Internal Error",
      });
    }
    if (!row) {
      return res.status(404).json({
        success: false,
        error: "ticket not found",
      });
    }
    return res.status(200).json({
      success: true,
      data: {
        id: row.id,
        title: row.title,
        description: row.description,
        is_confidential: row.is_confidential,
      },
    });
  });
};

const searchTickets = (req, res) => {
  const q = req.query.q;
  const query = `SELECT * FROM tickets WHERE is_confidential = 0 AND user_id = ? AND title LIKE '%${q}%'`;
  db.all(query, [req.user.id], (err, rows) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: "Internal Error",
      });
    }
    let tickets = rows.map((t) => ({
      id: t.id,
      title: t.title,
      description: t.description,
    }));
    return res.status(200).json({
      success: true,
      data: tickets,
    });
  });
};

export { createTicket, getMyTickets, getTicketById, searchTickets };
