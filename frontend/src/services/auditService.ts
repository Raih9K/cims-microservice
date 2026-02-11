import { ApiResponse, AuditEntry } from "@/types";
import { api } from "./authService";

const BASE_URL = "/audit-logs";

export const auditService = {
  /**
   * Get all audit logs with optional filters
   */
  getLogs: async (params?: {
    companyId: number;
    entityType?: string;
    entityId?: string;
  }): Promise<ApiResponse<AuditEntry[]>> => {
    const cleanParams: any = {};
    if (params) {
      Object.keys(params).forEach(key => {
        const val = (params as any)[key];
        if (val !== undefined && val !== null && val !== "") {
          cleanParams[key] = val;
        }
      });
    }
    const queryString = new URLSearchParams(cleanParams).toString();
    const res = await api.get(`${BASE_URL}${queryString ? `?${queryString}` : ""}`);
    return { ...res.data, ok: res.ok, status: res.status };
  },

  /**
   * Create a new audit log entry
   */
  createLog: async (data: Partial<AuditEntry>): Promise<ApiResponse<AuditEntry>> => {
    const res = await api.post(BASE_URL, data);
    return { ...res.data, ok: res.ok, status: res.status };
  }
};
