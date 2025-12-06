import { useState, useEffect } from "react";
import {
   Card,
   CardContent,
   CardHeader,
   CardTitle,
   CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Bell, CheckCircle, Clock, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { notificationService } from "@/services/notificationService";

export default function NotificationsPage() {
   const [notifications, setNotifications] = useState<any[]>([]);
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      loadNotifications();
   }, []);

   const loadNotifications = async () => {
      try {
         setIsLoading(true);
         const response = await notificationService.getNotifications();
         setNotifications(response?.data || []);
      } catch (error) {
         console.error("Failed to load notifications:", error);
         toast.error("Failed to load notifications");
      } finally {
         setIsLoading(false);
      }
   };

   const handleMarkAsRead = async (id: number) => {
      try {
         await notificationService.markAsRead(id);
         toast.success("Notification marked as read");
         loadNotifications();
      } catch (error) {
         toast.error("Failed to mark as read");
      }
   };

   const handleMarkAllAsRead = async () => {
      try {
         await notificationService.markAllAsRead();
         toast.success("All notifications marked as read");
         loadNotifications();
      } catch (error) {
         toast.error("Failed to mark all as read");
      }
   };

   if (isLoading) {
      return (
         <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
         </div>
      );
   }

   return (
      <div className="space-y-6">
         <div className="flex items-center justify-between">
            <div>
               <h1 className="text-3xl font-bold tracking-tight">
                  Notifications
               </h1>
               <p className="text-muted-foreground">
                  View and manage your notifications
               </p>
            </div>
            {notifications.length > 0 && (
               <Button variant="outline" onClick={handleMarkAllAsRead}>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Mark All as Read
               </Button>
            )}
         </div>

         <Card>
            <CardHeader>
               <CardTitle>All Notifications</CardTitle>
               <CardDescription>
                  {notifications.length} notification(s)
               </CardDescription>
            </CardHeader>
            <CardContent>
               {notifications.length === 0 ? (
                  <div className="text-center py-12">
                     <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                     <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        No Notifications
                     </h3>
                     <p className="text-gray-500">
                        You don't have any notifications yet
                     </p>
                  </div>
               ) : (
                  <div className="space-y-4">
                     {notifications.map((notification) => (
                        <div
                           key={notification.id}
                           className={`p-4 rounded-lg border ${
                              notification.read_by?.length > 0
                                 ? "bg-gray-50 border-gray-200"
                                 : "bg-blue-50 border-blue-200"
                           }`}
                        >
                           <div className="flex items-start justify-between">
                              <div className="flex-1">
                                 <div className="flex items-center gap-2 mb-2">
                                    <h4 className="font-semibold">
                                       {notification.title}
                                    </h4>
                                    {notification.read_by?.length === 0 && (
                                       <Badge className="bg-blue-100 text-blue-800">
                                          New
                                       </Badge>
                                    )}
                                 </div>
                                 <p className="text-gray-600">
                                    {notification.message}
                                 </p>
                                 <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                                    <span>
                                       From:{" "}
                                       {notification.sender?.name || "System"}
                                    </span>
                                    <span>
                                       {format(
                                          new Date(notification.created_at),
                                          "MMM dd, yyyy hh:mm a"
                                       )}
                                    </span>
                                 </div>
                              </div>
                              {notification.read_by?.length === 0 && (
                                 <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() =>
                                       handleMarkAsRead(notification.id)
                                    }
                                 >
                                    <CheckCircle className="h-4 w-4" />
                                 </Button>
                              )}
                           </div>
                        </div>
                     ))}
                  </div>
               )}
            </CardContent>
         </Card>
      </div>
   );
}
