import { Company, IUserRepository, User } from '../interfaces/IUserRepository';

export class UserService {
  constructor(private userRepository: IUserRepository) {}

  private mapUser(user: User): any {
    return {
      ...user,
      companies: user.company
        ? [
            {
              ...user.company,
              pivot: {
                status: user.status,
                role: user.roles?.[0] || 'Team Member',
                is_locked: user.status === 'inactive', // assuming inactive is locked for mock
              },
            },
          ]
        : [],
    };
  }

  async signup(data: any): Promise<{ message: string; email: string }> {
    await this.userRepository.create({
      name: data.full_name || data.name,
      email: data.email,
      password: data.password,
      company_id: 1, // Default to demo company for mock
    });
    return { message: 'Signup successful', email: data.email };
  }

  async verifyOtp(data: { email: string; otp: string }): Promise<any> {
    const user = await this.userRepository.findByEmail(data.email);
    if (!user) throw new Error('User not found');
    return {
      user,
      access_token: 'mock_token_' + Date.now(),
      token_type: 'Bearer',
    };
  }

  async resendOtp(email: string): Promise<{ message: string }> {
    return { message: 'OTP resent successfully' };
  }

  async login(
    data: any,
  ): Promise<{ user: User; access_token: string; token_type: string }> {
    const user = await this.userRepository.findByEmail(data.email);
    if (!user) throw new Error('Invalid credentials');

    // In mock mode, we don't strictly check password
    return {
      user: this.mapUser(user),
      access_token: 'mock_token_' + Date.now(),
      token_type: 'Bearer',
    };
  }

  async getCurrentUser(id: string): Promise<any> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new Error('User not found');
    return this.mapUser(user);
  }

  async updateProfile(id: string, data: any): Promise<any> {
    const user = await this.userRepository.update(id, data);
    if (!user) throw new Error('User not found');
    return this.mapUser(user);
  }

  async getCompany(companyId: number): Promise<Company> {
    const company = await this.userRepository.getCompany(companyId);
    if (!company) throw new Error('Company not found');
    return company;
  }

  async updateCompany(companyId: number, data: any): Promise<Company> {
    const company = await this.userRepository.updateCompany(companyId, data);
    if (!company) throw new Error('Company not found');
    return company;
  }

  async getTeam(companyId: number): Promise<any[]> {
    const users = await this.userRepository.getTeam(companyId);
    return users.map((u) => this.mapUser(u));
  }

  async inviteMember(
    companyId: number,
    data: any,
  ): Promise<{ message: string }> {
    // In mock mode, just simulate adding a user
    await this.userRepository.create({
      name: data.name || 'Invited Member',
      email: data.email,
      company_id: companyId,
    });
    return { message: 'Invitation sent successfully' };
  }

  async updateMember(id: string, data: any): Promise<User> {
    const user = await this.userRepository.update(id, data);
    if (!user) throw new Error('Member not found');
    return user;
  }

  async disableMember(id: string): Promise<boolean> {
    return await this.userRepository.delete(id);
  }

  async forcePassword(id: string): Promise<{ temp_password: string }> {
    const temp_password = Math.random().toString(36).slice(-8);
    await this.userRepository.update(id, { password: temp_password });
    return { temp_password };
  }
}
