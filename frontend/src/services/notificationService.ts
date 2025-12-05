import api, { ApiResponse, PaginatedResponse } from "./api";

export interface Notification {
   id: number;
   sender_id: number;
   title: string;
   message: string;
   created_at: string;
   updated_at: string;
   sender?: any;
   recipients?: any[];
}

export interface NotificationRecipient {
   id: number;
   notification_id: number;
   recipient_id: number;
   is_read: boolean;
   read_at: string | null;
   is_archived: boolean;
   created_at: string;
   updated_at: string;
   notification?: Notification;
   recipient?: any;
}

export interface SendNotificationRequest {
   title: string;
   message: string;
   recipient_ids: number[];
}

export interface UpdateNotificationRequest {
   is_read?: boolean;
   is_archived?: boolean;
}

export interface NotificationStatistics {
   total: number;
   unread: number;
   archived: number;
}

class NotificationService {
   // Manager endpoints
   async getNotifications(params?: {
      search?: string;
      is_archived?: boolean;
      page?: number;
      per_page?: number;
   }): Promise<PaginatedResponse<Notification>> {
      const response = await api.get<PaginatedResponse<Notification>>(
         "/notifications",
         { params }
      );
      return response.data;
   }

   async getInternsForNotifications(): Promise<any[]> {
      const response = await api.get("/notifications/interns");
      return response.data;
   }

   async sendNotification(
      data: SendNotificationRequest
   ): Promise<{ notification: Notification }> {
      const response = await api.post<{ notification: Notification }>(
         "/notifications/send",
         data
      );
      return response.data;
   }

   async getNotification(id: number): Promise<Notification> {
      const response = await api.get<Notification>(`/notifications/${id}`);
      return response.data;
   }

   async deleteNotification(id: number): Promise<ApiResponse> {
      const response = await api.delete<ApiResponse>(`/notifications/${id}`);
      return response.data;
   }

   // Intern endpoints
   async getMyNotifications(params?: {
      is_read?: boolean;
      is_archived?: boolean;
      search?: string;
      page?: number;
      per_page?: number;
   }): Promise<PaginatedResponse<Notification>> {
      const response = await api.get<PaginatedResponse<Notification>>(
         "/my-notifications",
         { params }
      );
      return response.data;
   }

   async getMyNotification(id: number): Promise<Notification> {
      const response = await api.get<Notification>(`/my-notifications/${id}`);
      return response.data;
   }

   async updateMyNotification(
      id: number,
      data: UpdateNotificationRequest
   ): Promise<{ notification: Notification }> {
      const response = await api.put<{ notification: Notification }>(
         `/my-notifications/${id}`,
         data
      );
      return response.data;
   }

   async deleteMyNotification(id: number): Promise<ApiResponse> {
      const response = await api.delete<ApiResponse>(`/my-notifications/${id}`);
      return response.data;
   }

   async markAllAsRead(): Promise<ApiResponse> {
      const response = await api.post<ApiResponse>(
         "/my-notifications/mark-all-read"
      );
      return response.data;
   }
}

export const notificationService = new NotificationService();
