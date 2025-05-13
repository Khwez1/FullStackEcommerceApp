import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.header("Authorization");

  if (!token) {
    res.status(401).json({ error: "Access Denied" });
    return;
  }

  try {
    //decide jwt take data
    const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`);
    if (typeof decoded !== 'object' || !decoded?.userId){
        res.status(401).json({ error: "Access Denied" });
        return;
    }
    req.userId = decoded.userId;
    req.role = decoded.role;
    next();
  } catch (e) {
    res.status(401).json({ error: "Access Denied" });
  }
};

export function verifyAdmin(req: Request, res: Response, next: NextFunction) {
  const role = req.role;
  if (role !== 'admin') {
    res.status(401).json({ error: "Access Denied" });
    return;
  }
  next();
};

export function verifyVendor(req: Request, res: Response, next: NextFunction) {
  const role = req.role;
  if (role !== 'seller') {
    res.status(401).json({ error: "Access Denied" });
    return;
  }
  next();
};

export function verifyRole(req: Request, res: Response, next: NextFunction) {
  const role = req.role;
  
  switch (role) {
    case 'admin':
    case 'seller':
      // Both admin and seller roles are allowed
      next();
      break;
    default:
      // Any other role is denied access
      res.status(401).json({ error: "Access Denied" });
      break;
  }
};
