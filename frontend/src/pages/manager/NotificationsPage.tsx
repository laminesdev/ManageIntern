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
import { Bell, CheckCircle, Loader2, Plus } from "lucide-react";
import { format } from "date-fns";
import { notificationService } from "@/services/notificationService";
import { useNavigate } from "react-router-dom";

export default function NotificationsPage() {
   const navigate = useNavigate();
   const [notifications, setNotifications] = useState<any[]>([]);
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      loadNotifications();
   }, []);

   const loadNotifications = async () => {
      try {
         setIsLoading(true);
         const response = await notificationService.getNotifications();
         console.log("Manager notifications:", response);
         setNotifications(response?.data || []);
      } catch (error) {
         console.error("Failed to load notifications:", error);
         toast.error("Failed to load notifications");
      } finally {
         setIsLoading(false);
      }
   };

   const handleDelete = async (id: number) => {
      if (!confirm("Are you sure you want to delete this notification?")) {
         return;
      }

      try {
         await notificationService.deleteNotification(id);
         toast.success("Notification deleted");
         loadNotifications();
      } catch (error) {
         toast.error("Failed to delete notification");
      }
   };

   if (isLoading) {
      return (
         <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="h-8 w-8 animate-spin text-red-500" />
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
                  Manage notifications sent to your interns
               </p>
            </div>
            <Button onClick={() => navigate("/manager/notifications/send")}>
               <Plus className="mr-2 h-4 w-4" />
               Send Notification
            </Button>
         </div>

         <Card>
            <CardHeader>
               <CardTitle>Sent Notifications</CardTitle>
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
                     <p className="text-gray-500 mb-4">
                        You haven't sent any notifications yet
                     </p>
                     <Button
                        onClick={() => navigate("/manager/notifications/send")}
                     >
                        <Plus className="mr-2 h-4 w-4" />
                        Send Your First Notification
                     </Button>
                  </div>
               ) : (
                  <div className="space-y-4">
                     {notifications.map((notification) => (
                        <div
                           key={notification.id}
                           className="p-4 rounded-lg border bg-white"
                        >
                           <div className="flex items-start justify-between">
                              <div className="flex-1">
                                 <div className="flex items-center gap-2 mb-2">
                                    <h4 className="font-semibold">
                                       {notification.title}
                                    </h4>
                                    <Badge variant="outline">
                                       {notification.recipients?.length || 0}{" "}
                                       recipient(s)
                                    </Badge>
                                 </div>
                                 <p className="text-gray-600 mb-3">
                                    {notification.message}
                                 </p>
                                 <div className="flex items-center gap-4 text-sm text-gray-500">
                                    <span>
                                       {format(
                                          new Date(notification.created_at),
                                          "MMM dd, yyyy hh:mm a"
                                       )}
                                    </span>
                                 </div>
                              </div>
                              <Button
                                 size="sm"
                                 variant="ghost"
                                 className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                 onClick={() => handleDelete(notification.id)}
                              >
                                 Delete
                              </Button>
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