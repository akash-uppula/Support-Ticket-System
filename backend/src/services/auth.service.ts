import bcrypt from "bcrypt";

import UserModel from "../models/User.js";
import AppError from "../utils/AppError.js";
import { generateToken } from "../utils/jwt.js";
import { sanitizeUser } from "../utils/sanitizeUser.js";
import { SALT_ROUNDS } from "../constants/security.js";


// ---------------------------------------Register User----------------------------------------

interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export const registerUser = async (data: RegisterInput) => {
  const existingUser = await UserModel.findOne({
    email: data.email,
  });

  if (existingUser) {
    throw new AppError("Email already registered", 400);
  }

  const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);

  const user = await UserModel.create({
    name: data.name,
    email: data.email.toLowerCase(),
    password: hashedPassword,
  });

  const token = generateToken({
    userId: user._id.toString(),
    role: user.role,
  });

  return {
    user: sanitizeUser(user),
    token,
  };
};

// ---------------------------------------Login User----------------------------------------

interface LoginInput {
  email: string;
  password: string;
}

export const loginUser = async (data: LoginInput) => {
  const user = await UserModel.findOne({
    email: data.email.toLowerCase(),
  });

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const isPasswordCorrect = await bcrypt.compare(data.password, user.password);

  if (!isPasswordCorrect) {
    throw new AppError("Invalid email or password", 401);
  }

  const token = generateToken({
    userId: user._id.toString(),

    role: user.role,
  });

  return {
    user: sanitizeUser(user),

    token,
  };
};

// ---------------------------------------Get Current User----------------------------------------

export const getCurrentUser = async (userId: string) => {
  const user = await UserModel.findById(userId);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return sanitizeUser(user);
};