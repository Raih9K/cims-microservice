
const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000") + "/api";
const USE_MOCK_DATA = process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true';

const getHeaders = () => {
  const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
  return {
    "Content-Type": "application/json",
    "Accept": "application/json",
    ...(token ? { "Authorization": `Bearer ${token}` } : {}),
  } as HeadersInit;
};

const simulateApiDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const MOCK_USER: User = {
    id: 1,
    name: "Raihan Khan",
    email: "admin@demo.com",
    company_id: 1,
    status: 'active',
    roles: ['admin'],
    permissions: [],
    company: {
        id: 1,
        name: "Demo Tech Solutions",
        business_type: "Technology",
        management_type: "team",
        subscription_status: "trial",
        package_id: 1
    }
};

const MOCK_AUTH_RESPONSE: AuthResponse = {
    user: MOCK_USER,
    access_token: "mock_token_12345",
    token_type: "Bearer"
};

export const api = {
  get: async (url: string) => {
    const res = await fetch(`${API_URL}${url}`, { headers: getHeaders() });
    const isJson = res.headers.get("content-type")?.includes("application/json");
    const data = isJson ? await res.json() : { message: await res.text() };
    return { data, status: res.status, ok: res.ok };
  },
  post: async (url: string, data: any) => {
    const res = await fetch(`${API_URL}${url}`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    const isJson = res.headers.get("content-type")?.includes("application/json");
    const dataRes = isJson ? await res.json() : { message: await res.text() };
    return { data: dataRes, status: res.status, ok: res.ok };
  },
  put: async (url: string, data: any) => {
    const res = await fetch(`${API_URL}${url}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    const isJson = res.headers.get("content-type")?.includes("application/json");
    const dataRes = isJson ? await res.json() : { message: await res.text() };
    return { data: dataRes, status: res.status, ok: res.ok };
  },
  delete: async (url: string) => {
    const res = await fetch(`${API_URL}${url}`, {
      method: "DELETE",
      headers: getHeaders(),
    });
    const isJson = res.headers.get("content-type")?.includes("application/json");
    const dataRes = isJson ? await res.json() : { message: await res.text() };
    return { data: dataRes, status: res.status, ok: res.ok };
  },
};

export interface Company {
  id: number;
  name: string;
  business_type: string;
  management_type: string;
  subscription_status: 'pending' | 'active' | 'expired' | 'trial';
  package_id: number | null;
  package?: {
    id: number;
    name: string;
    price: string;
  };
  max_seats?: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  company_id: number;
  status: 'active' | 'inactive';
  roles: any[];
  permissions: any[];
  company?: Company;
  companies?: Company[];
}

export interface AuthResponse {
  user: User;
  access_token: string;
  token_type: string;
}

export const authService = {
  async signup(data: any): Promise<{ message: string; email: string }> {
    const res = await fetch(`${API_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Signup failed");
    }
    return res.json();
  },

  async verifyOtp(data: { email: string; otp: string }): Promise<AuthResponse> {
        const res = await fetch(`${API_URL}/verify-otp`, {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify(data),
        });
        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message || "Verification failed");
        }
        return res.json();
  },

  async resendOtp(email: string): Promise<{ message: string }> {
      const res = await fetch(`${API_URL}/resend-otp`, {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify({ email }),
      });
      if (!res.ok) {
          const error = await res.json();
          throw new Error(error.message || "Resend failed");
      }
      return res.json();
  },

  async login(data: any): Promise<AuthResponse> {
    if (USE_MOCK_DATA) {
      await simulateApiDelay(800);
      // Auto-login with mock user for any email/password
      return MOCK_AUTH_RESPONSE;
    }

    console.log("Attempting login to:", `${API_URL}/auth/login`);
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Login failed");
    }
    return res.json();
  },

  async me(token: string): Promise<User> {
    if (USE_MOCK_DATA) {
      await simulateApiDelay(300);
      return MOCK_USER;
    }

    try {
        const res = await fetch(`${API_URL}/me`, {
          headers: {
              "Authorization": `Bearer ${token}`,
              "Accept": "application/json"
          },
        });
        if (!res.ok) throw new Error("Failed to fetch user");
        return res.json();
    } catch (err) {
        console.error("Fetch 'me' failed:", err);
        throw err;
    }
  },

  async logout(token: string) {
    await fetch(`${API_URL}/logout`, {
      method: "POST",
      headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json"
      },
    });
  },

  async updateProfile(data: { name: string; email: string }) {
    const res = await api.put('/me/profile', data);
    return res.data;
  },

  async updatePassword(data: any) {
    const res = await api.put('/me/password', data);
    return res.data;
  },

  async getCompany() {
    const res = await api.get('/company');
    return res.data;
  },

  async updateCompany(data: any) {
    const res = await api.put('/company', data);
    return res.data;
  },

  // Team API
  async getTeam(token: string) {
      const res = await fetch(`${API_URL}/team`, {
          headers: { "Authorization": `Bearer ${token}`, "Accept": "application/json" }
      });
      if (!res.ok) throw new Error("Failed to fetch team");
      return res.json();
  },

  async inviteMember(token: string, data: any) {
      const res = await fetch(`${API_URL}/team/invite`, {
          method: "POST",
          headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json",
              "Accept": "application/json"
          },
          body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error("Failed to invite member");
      return res.json();
  },

  // Subscription API
  async getPackages(token: string) {
      const res = await fetch(`${API_URL}/packages`, {
          headers: { "Authorization": `Bearer ${token}`, "Accept": "application/json" }
      });
      if (!res.ok) throw new Error("Failed to fetch packages");
      return res.json();
  },

  async applyCoupon(token: string, code: string) {
      const res = await fetch(`${API_URL}/apply-coupon`, {
          method: "POST",
          headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json",
              "Accept": "application/json"
          },
          body: JSON.stringify({ code })
      });
      if (!res.ok) {
          const error = await res.json();
          throw new Error(error.message || "Failed to apply coupon");
      }
      return res.json();
  },

  async subscribe(token: string, data: { package_id: number, coupon_code?: string }) {
      const res = await fetch(`${API_URL}/subscribe`, {
          method: "POST",
          headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json",
              "Accept": "application/json"
          },
          body: JSON.stringify(data)
      });
      if (!res.ok) {
          const error = await res.json();
          throw new Error(error.message || "Subscription failed");
      }
      return res.json();
  },

  async acceptInvite(data: { token: string; password: string; name?: string }) {
      const res = await fetch(`${API_URL}/auth/accept-invite`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
          },
          body: JSON.stringify(data)
      });
      if (!res.ok) {
          const error = await res.json();
          throw new Error(error.message || "Failed to accept invitation");
      }
      return res.json();
  }
};
