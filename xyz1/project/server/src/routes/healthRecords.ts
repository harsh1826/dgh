import express, { Request, Response, Router } from 'express';
import HealthRecord from '../models/HealthRecord';
import auth from '../middleware/auth';
import { Types } from 'mongoose';

// Custom interface for authenticated requests
interface AuthenticatedRequest extends Request {
  user?: {
    id: string | Types.ObjectId;
  };
}

const router: Router = express.Router();

router.get('/', auth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication error' });
    }
    const records = await HealthRecord.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;