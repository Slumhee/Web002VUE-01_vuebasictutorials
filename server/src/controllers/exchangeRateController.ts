// server/src/controllers/exchangeRateController.ts
import { Request, Response } from 'express';
import { ExchangeRate } from '../models/ExchangeRate';

export const getExchangeRates = async (req: Request, res: Response) => {
  const rates = await ExchangeRate.find();
  res.json(rates);
};

export const createExchangeRate = async (req: Request, res: Response) => {
  const { fromCurrency, toCurrency, rate } = req.body;
  const exchangeRate = new ExchangeRate({ fromCurrency, toCurrency, rate });
  await exchangeRate.save();
  res.json(exchangeRate);
};
