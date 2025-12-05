export interface Notification {
   id: number;
   sender_id: number;
   title: string;
   message: string;
   created_at: string;
   updated_at: string;
   sender?: any;
   recipients?: any[];
   is_read?: boolean;
   is_archived?: boolean;
   read_at?: string | null;
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
