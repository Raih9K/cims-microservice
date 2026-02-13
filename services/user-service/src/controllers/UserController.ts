import { Request, Response } from 'express';
import { UserService } from '../services/UserService';

export class UserController {
  constructor(private userService: UserService) {}

  signup = async (req: Request, res: Response) => {
    try {
      const result = await this.userService.signup(req.body);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  verifyOtp = async (req: Request, res: Response) => {
    try {
      const result = await this.userService.verifyOtp(req.body);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  resendOtp = async (req: Request, res: Response) => {
    try {
      const result = await this.userService.resendOtp(req.body.email);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const result = await this.userService.login(req.body);
      res.json(result);
    } catch (error: any) {
      res.status(401).json({ message: error.message });
    }
  };

  me = async (req: Request, res: Response) => {
    try {
      // In mock mode, try to get the first user if '1' doesn't exist
      let user;
      try {
        user = await this.userService.getCurrentUser('1');
      } catch (e) {
        const allUsers = await this.userService.getTeam(1);
        user = allUsers[0];
      }

      if (!user) throw new Error('No users found');
      res.json(user);
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  };

  updateProfile = async (req: Request, res: Response) => {
    try {
      const user = await this.userService.updateProfile('1', req.body);
      res.json(user);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  getCompany = async (req: Request, res: Response) => {
    try {
      const company = await this.userService.getCompany(1);
      res.json(company);
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  };

  updateCompany = async (req: Request, res: Response) => {
    try {
      const company = await this.userService.updateCompany(1, req.body);
      res.json(company);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  getTeam = async (req: Request, res: Response) => {
    try {
      const team = await this.userService.getTeam(1);
      res.json(team);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  inviteMember = async (req: Request, res: Response) => {
    try {
      const result = await this.userService.inviteMember(1, req.body);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  updateMember = async (req: Request, res: Response) => {
    try {
      const user = await this.userService.updateMember(req.params.id, req.body);
      res.json(user);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  disableMember = async (req: Request, res: Response) => {
    try {
      const result = await this.userService.disableMember(req.params.id);
      res.json({ success: result });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  forcePassword = async (req: Request, res: Response) => {
    try {
      const result = await this.userService.forcePassword(req.params.id);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  // Legacy CRUD for compatibility
  createUser = async (req: Request, res: Response) => {
    try {
      const user = await this.userService.signup(req.body);
      res.status(201).json(user);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };
}
