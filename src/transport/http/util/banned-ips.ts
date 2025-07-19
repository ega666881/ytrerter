import express from "express";

export const bannedIps = new Map<string, number>()

export async function checkBan(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void> {
  const ip: string = req.ip!;
  const banUntil: number | undefined = bannedIps.get(ip);

  if (banUntil && banUntil > Date.now()) {
    res.status(429).json({
      message: 'Too many requests'
    });
    return
  }

  if (banUntil && banUntil <= Date.now()) {
    bannedIps.delete(ip);
  }

  next();
}
