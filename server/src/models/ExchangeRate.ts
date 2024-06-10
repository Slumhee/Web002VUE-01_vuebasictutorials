// server/src/models/ExchangeRate.ts
import { Schema, model } from 'mongoose';

interface IExchangeRate {
  fromCurrency: string;
  toCurrency: string;
  rate: number;
  date: Date;
}

const exchangeRateSchema = new Schema<IExchangeRate>({
  fromCurrency: { type: String, required: true },
  toCurrency: { type: String, required: true },
  rate: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

export const ExchangeRate = model<IExchangeRate>('ExchangeRate', exchangeRateSchema);
