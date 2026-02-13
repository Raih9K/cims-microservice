import { MOCK_TEAM_MEMBERS, simulateApiDelay } from '@/mocks';

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000") + "/api";
const USE_MOCK_DATA = process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true';

export const teamService = {
  getToken() {
    return localStorage.getItem("token");
  },

  async getTeam(companyId?: number) {
    if (USE_MOCK_DATA) {
      await simulateApiDelay(500);
      return MOCK_TEAM_MEMBERS;
    }

    const url = companyId
      ? `${API_URL}/team?companyId=${companyId}`
      : `${API_URL}/team`;

    const res = await fetch(url, {
      headers: {
        "Authorization": `Bearer ${this.getToken()}`,
        "Accept": "application/json"
      }
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Failed to fetch team");
    return result;
  },

  async inviteMember(data: { email: string; role: string }) {
    const res = await fetch(`${API_URL}/team/invite`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${this.getToken()}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Failed to invite member");
    return result;
  },

  async acceptInvitation(data: { token: string; name?: string; password?: string }) {
    const res = await fetch(`${API_URL}/auth/accept-invite`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Failed to accept invitation");
    return result;
  },

  async verifyInvitation(token: string) {
    const res = await fetch(`${API_URL}/team/verify-invitation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ token })
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Failed to verify invitation");
    return result;
  },

  async updateMember(id: number, data: any) {
    const res = await fetch(`${API_URL}/team/${id}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${this.getToken()}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Failed to update member");
    return result;
  },

  async disableMember(id: number) {
    const res = await fetch(`${API_URL}/team/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${this.getToken()}`,
        "Accept": "application/json"
      }
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Failed to disable member");
    return result;
  },

  async switchCompany(companyId: number) {
    const res = await fetch(`${API_URL}/team/switch-company`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${this.getToken()}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ company_id: companyId })
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Failed to switch business");
    return result;
  },

  async forceEmail(id: number, email: string) {
    const res = await fetch(`${API_URL}/team/${id}/force-email`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${this.getToken()}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ email })
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Failed to change email");
    return result;
  },

  async forcePassword(id: number) {
    const res = await fetch(`${API_URL}/team/${id}/force-password`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${this.getToken()}`,
        "Accept": "application/json"
      }
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Failed to reset password");
    return result;
  }
};
