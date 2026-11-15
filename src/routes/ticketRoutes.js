import express from 'express';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { createTicket, getMyTickets, searchTickets, getTicketById } from '../controllers/ticketController.js';

const router = express.Router();

router.use(verifyToken);

router.get('/', getMyTickets);
router.get('/search', searchTickets);
router.get('/:id', getTicketById);
router.post('/', createTicket);

export default router;