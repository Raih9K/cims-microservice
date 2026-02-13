export interface Company {
  id: number;
  name: string;
  business_type: string;
  management_type: string;
  subscription_status: 'pending' | 'active' | 'expired' | 'trial';
  package_id: number | null;
  max_seats?: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  company_id: number;
  status: 'active' | 'inactive';
  roles: string[];
  permissions: string[];
  company?: Company;
}

export interface CreateUserDTO {
  name: string;
  email: string;
  password?: string;
  company_id?: number;
}

export interface UpdateUserDTO {
  name?: string;
  email?: string;
  password?: string;
  status?: 'active' | 'inactive';
  company_id?: number;
}

export interface IUserRepository {
  create(data: CreateUserDTO): Promise<User>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  update(id: string, data: UpdateUserDTO): Promise<User | null>;
  delete(id: string): Promise<boolean>;

  // Auth & Team specific
  getCompany(companyId: number): Promise<Company | null>;
  updateCompany(companyId: number, data: any): Promise<Company | null>;
  getTeam(companyId: number): Promise<User[]>;
}
