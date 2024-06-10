// server/src/routes/exchangeRate.ts
import { Router } from 'express';
import { getExchangeRates, createExchangeRate } from '../controllers/exchangeRateController';

const router = Router();

router.get('/', getExchangeRates);
router.post('/', createExchangeRate);

export default router;
