import api from "./api";

export interface Notification {
   id: number;
   sender_id: number;
   title: string;
   message: string;
   created_at: string;
   updated_at: string;
   sender?: {
      id: number;
      name: string;
      email: string;
   };
   recipients?: any[];
   is_read?: boolean;
   is_archived?: boolean;
   read_at?: string | null;
   read_by?: any[];
}

export interface SendNotificationData {
   title: string;
   message: string;
   recipient_ids: number[];
}

export const notificationService = {
   // Manager: Send notification
   sendNotification: async (
      data: SendNotificationData
   ): Promise<{ notification: Notification }> => {
      const response = await api.post("/notifications/send", data);
      return response.data;
   },

   // Manager: Get sent notifications
   getNotifications: async (
      params: {
         search?: string;
         is_archived?: boolean;
      } = {}
   ): Promise<{ data: Notification[] }> => {
      const response = await api.get("/notifications", { params });
      return response.data;
   },

   // Manager: Get notification details
   getNotificationById: async (
      id: number
   ): Promise<{ notification: Notification }> => {
      const response = await api.get(`/notifications/${id}`);
      return response.data;
   },

   // Manager: Delete notification
   deleteNotification: async (id: number): Promise<{ message: string }> => {
      const response = await api.delete(`/notifications/${id}`);
      return response.data;
   },

   // Manager: Get interns for notifications (department interns)
   getDepartmentInterns: async (): Promise<{
      data: Array<{ id: number; name: string; email: string }>;
   }> => {
      const response = await api.get("/notifications/interns");
      // API returns array directly, wrap it for consistency
      const interns = Array.isArray(response.data) ? response.data : (response.data?.data || []);
      return { data: interns };
   },

   // Manager: Get interns for notifications (alias)
   getInternsForNotifications: async (): Promise<{
      data: Array<{ id: number; name: string; email: string }>;
   }> => {
      const response = await api.get("/notifications/interns");
      // API returns array directly, wrap it for consistency
      const interns = Array.isArray(response.data) ? response.data : (response.data?.data || []);
      return { data: interns };
   },

   // Intern: Get my notifications
   getMyNotifications: async (
      params: {
         is_read?: boolean;
         is_archived?: boolean;
         search?: string;
      } = {}
   ): Promise<{ data: Notification[] }> => {
      const response = await api.get("/my-notifications", { params });
      return response.data;
   },

   // Intern: Get my notification details
   getMyNotificationById: async (
      id: number
   ): Promise<{ notification: Notification }> => {
      const response = await api.get(`/my-notifications/${id}`);
      return response.data;
   },

   // Intern: Update notification (mark as read/archived)
   updateMyNotification: async (
      id: number,
      data: {
         is_read?: boolean;
         is_archived?: boolean;
      }
   ): Promise<{ notification: Notification }> => {
      const response = await api.put(`/my-notifications/${id}`, data);
      return response.data;
   },

   // Intern: Mark notification as read
   markNotificationAsRead: async (
      id: number,
      isRead: boolean = true
   ): Promise<{ notification: Notification }> => {
      const response = await api.put(`/my-notifications/${id}`, {
         is_read: isRead,
      });
      return response.data;
   },

   // Intern: Mark as read (alias)
   markAsRead: async (id: number): Promise<{ notification: Notification }> => {
      const response = await api.put(`/my-notifications/${id}`, {
         is_read: true,
      });
      return response.data;
   },

   // Intern: Mark all as read
   markAllAsRead: async (): Promise<{ message: string }> => {
      const response = await api.post("/my-notifications/mark-all-read");
      return response.data;
   },

   // Intern: Delete my notification
   deleteMyNotification: async (id: number): Promise<{ message: string }> => {
      const response = await api.delete(`/my-notifications/${id}`);
      return response.data;
   },
};
