import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

// Import your route handlers
import authRoutes from './routes/auth';
import healthRecordsRoutes from './routes/healthRecords';
import aiInsightsRoutes from './routes/aiInsights';
import dashboardRoutes from './routes/dashboard';
import chatbotRoutes from './routes/chatbot';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/health-records', healthRecordsRoutes);
app.use('/api/ai-insights', aiInsightsRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/chatbot', chatbotRoutes);

app.listen(port, () => {
  console.log(`🤖 Server is running at http://localhost:${port}`);
});