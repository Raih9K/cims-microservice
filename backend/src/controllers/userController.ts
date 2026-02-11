import { Response } from 'express';
import { UserService } from '@/services/userService';
import { generateTokens } from '@/middleware/auth';
import { AuthenticatedRequest, ApiResponse } from '@/types';

export class UserController {
  private userService = new UserService();

  register = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const { username, email, password, first_name, last_name, company_name } = req.body;

      const existingUser = await this.userService.findByEmail(email);
      if (existingUser) {
        const response: ApiResponse = {
          success: false,
          error: 'User with this email already exists',
        };
        res.status(409).json(response);
        return;
      }

      const user = await this.userService.createUser({
        username,
        email,
        password,
        first_name,
        last_name,
        company_name,
      });

      const tokens = generateTokens({
        userId: user.user_id,
        username: user.username,
        email: user.email,
      });

      const response: ApiResponse = {
        success: true,
        data: {
          user: {
            user_id: user.user_id,
            username: user.username,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            company_name: user.company_name,
            created_at: user.created_at,
            is_active: user.is_active,
          },
          tokens,
        },
        message: 'User registered successfully',
      };

      res.status(201).json(response);
    } catch (error) {
      console.error('Registration error:', error);
      const response: ApiResponse = {
        success: false,
        error: 'Failed to register user',
      };
      res.status(500).json(response);
    }
  };

  login = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;

      const user = await this.userService.findByEmail(email);
      if (!user) {
        const response: ApiResponse = {
          success: false,
          error: 'Invalid credentials',
        };
        res.status(401).json(response);
        return;
      }

      const isValidPassword = await this.userService.validatePassword(password, user.password_hash);
      if (!isValidPassword) {
        const response: ApiResponse = {
          success: false,
          error: 'Invalid credentials',
        };
        res.status(401).json(response);
        return;
      }

      const tokens = generateTokens({
        userId: user.user_id,
        username: user.username,
        email: user.email,
      });

      const response: ApiResponse = {
        success: true,
        data: {
          user: {
            user_id: user.user_id,
            username: user.username,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            company_name: user.company_name,
            created_at: user.created_at,
            is_active: user.is_active,
          },
          tokens,
        },
        message: 'Login successful',
      };

      res.status(200).json(response);
    } catch (error) {
      console.error('Login error:', error);
      const response: ApiResponse = {
        success: false,
        error: 'Failed to login',
      };
      res.status(500).json(response);
    }
  };

  getProfile = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      if (!req.user) {
        const response: ApiResponse = {
          success: false,
          error: 'User not authenticated',
        };
        res.status(401).json(response);
        return;
      }

      const user = await this.userService.findById(req.user.userId);
      if (!user) {
        const response: ApiResponse = {
          success: false,
          error: 'User not found',
        };
        res.status(404).json(response);
        return;
      }

      const response: ApiResponse = {
        success: true,
        data: { user },
      };

      res.status(200).json(response);
    } catch (error) {
      console.error('Get profile error:', error);
      const response: ApiResponse = {
        success: false,
        error: 'Failed to get user profile',
      };
      res.status(500).json(response);
    }
  };

  updateProfile = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      if (!req.user) {
        const response: ApiResponse = {
          success: false,
          error: 'User not authenticated',
        };
        res.status(401).json(response);
        return;
      }

      const updates = req.body;
      const user = await this.userService.updateUser(req.user.userId, updates);

      if (!user) {
        const response: ApiResponse = {
          success: false,
          error: 'User not found',
        };
        res.status(404).json(response);
        return;
      }

      const response: ApiResponse = {
        success: true,
        data: { user },
        message: 'Profile updated successfully',
      };

      res.status(200).json(response);
    } catch (error) {
      console.error('Update profile error:', error);
      const response: ApiResponse = {
        success: false,
        error: 'Failed to update profile',
      };
      res.status(500).json(response);
    }
  };
}