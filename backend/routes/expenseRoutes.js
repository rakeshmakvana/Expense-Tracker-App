import express from 'express';
import {
    createExpense,
    getAllExpenses,
    getRecentExpenses,
    updateExpense,
    deleteExpense,
} from '../controllers/expenseControllers.js';

const router = express.Router();

router.post('/', createExpense);
router.get('/', getAllExpenses);
router.get('/recent', getRecentExpenses);
router.put('/:id', updateExpense);
router.delete('/:id', deleteExpense);

export default router;