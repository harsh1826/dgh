import express, { Request, Response, Router } from 'express';
import HealthRecord from '../models/HealthRecord';
import AIInsight from '../models/AIInsight';
import auth from '../middleware/auth';
import { Types } from 'mongoose';

// Custom interface to add the `user` property to the Express Request object
interface AuthenticatedRequest extends Request {
  user?: {
    id: string | Types.ObjectId;
  };
}

const router: Router = express.Router();

router.get('/overview', auth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication error' });
    }
    const userId = req.user.id;
    
    // These are placeholders and will work once you define your Mongoose models
    const latestRecord = await HealthRecord.findOne({ userId }).sort({ createdAt: -1 });
    const recentInsights = await AIInsight.find({ userId }).sort({ createdAt: -1 }).limit(5);

    res.json({
      latestRecord: latestRecord || 'No records found',
      recentInsights: recentInsights || [],
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;