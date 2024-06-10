import express from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import cors from 'cors'
import authRoutes from './routes/auth';
import articleRoutes from './routes/article';
import exchangeRateRoutes from './routes/exchangeRate';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/exchangeRates', exchangeRateRoutes); 

const startServer = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/currencyeg', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);
    console.log('Connected to MongoDB');

    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    process.exit(1);
  }
};

startServer();
