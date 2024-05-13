/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from 'express';

/**
 * Rep an error in this API.
 */
export class APIError extends Error {
  constructor(code, message) {
    super();
    this.code = code || 500;
    this.message = message;
  }
}

/**
 * Applies Basic auth to a route.
 * @param {Error} err The error obj
 * @param {Request} req The Express req obj
 * @param {Response} res The Express res obj
 * @param {NextFunction} next The Express next func
 */
export const errorResponse = (err, req, res, next) => {
  const defaultMsg = `Failed to process ${req.url}`;

  if (err instanceof APIError) {
    res.status(err.code).json({ error: err.message || defaultMsg });
    return;
  }
  res.status(500).json({
    error: err ? err.message || err.toString() : defaultMsg,
  });
};
