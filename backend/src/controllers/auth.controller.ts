import { Request, Response } from "express";

import { registerUser, loginUser } from "../services/auth.service.js";
import { getCurrentUser } from "../services/auth.service.js";
import asyncHandler from "../utils/asyncHandler.js";
import apiResponse from "../utils/apiResponse.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";
import { registerSchema, loginSchema } from "../validations/auth.validation.js";

// ------------------------Register User-------------------------------------

export const register = asyncHandler(async (req: Request, res: Response) => {
  const validatedData = registerSchema.parse(req.body);

  const result = await registerUser(validatedData);

  res
    .status(HTTP_STATUS.CREATED)
    .json(apiResponse(true, "User registered successfully", result));
});

// --------------------------------Login User---------------------------------
export const login = asyncHandler(async (req: Request, res: Response) => {
  const validatedData = loginSchema.parse(req.body);

  const result = await loginUser(validatedData);

  res
    .status(HTTP_STATUS.OK)
    .json(apiResponse(true, "Login successful", result));
});

// ---------------------------------------Get Current User----------------------------------------

export const getCurrentUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const user = await getCurrentUser(req.user!.id);

    res
      .status(HTTP_STATUS.OK)
      .json(apiResponse(true, "Current user fetched successfully", user));
  },
);
