import { Request, Response, NextFunction } from 'express';

// This is a placeholder for your actual authentication middleware.
const auth = (req: any, res: Response, next: NextFunction) => {
  // We add a dummy user object to the request for testing purposes.
  req.user = { id: 'test-user-123' }; 
  next();
};

export default auth;