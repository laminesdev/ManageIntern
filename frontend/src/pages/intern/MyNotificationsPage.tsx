// pages/intern/MyNotificationsPage.tsx
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { notificationService } from "@/services/notificationService";
import { toast } from "sonner";
import { format } from "date-fns";
import { Bell, CheckCircle, Archive } from "lucide-react";

export default function MyNotificationsPage() {
   const [notifications, setNotifications] = useState<any[]>([]);
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      loadNotifications();
   }, []);

   const loadNotifications = async () => {
      try {
         setIsLoading(true);
         const response = await notificationService.getMyNotifications();
         setNotifications(response.data || []);
      } catch (error) {
         toast.error("Failed to load notifications");
      } finally {
         setIsLoading(false);
      }
   };

   const handleMarkAsRead = async (id: number) => {
      try {
         await notificationService.markNotificationAsRead(id, true);
         toast.success("Marked as read");
         loadNotifications();
      } catch (error) {
         toast.error("Failed to mark as read");
      }
   };

   const handleArchive = async (id: number) => {
      try {
         await notificationService.updateMyNotification(id, {
            is_archived: true,
         });
         toast.success("Notification archived");
         loadNotifications();
      } catch (error) {
         toast.error("Failed to archive");
      }
   };

   const handleMarkAllAsRead = async () => {
      try {
         await notificationService.markAllAsRead();
         toast.success("All marked as read");
         loadNotifications();
      } catch (error) {
         toast.error("Failed to mark all as read");
      }
   };

   if (isLoading) {
      return (
         <div className="flex items-center justify-center min-h-[400px]">
            Loading...
         </div>
      );
   }

   console.log(notifications);

   return (
      <div className="space-y-6">
         <div className="flex items-center justify-between">
            <div>
               <h1 className="text-3xl font-bold">My Notifications</h1>
               <p className="text-muted-foreground">
                  View your notifications from managers
               </p>
            </div>
            {notifications.filter((n) => !n.is_read).length > 0 && (
               <Button variant="outline" onClick={handleMarkAllAsRead}>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Mark All as Read
               </Button>
            )}
         </div>

         {/* Stats */}
         <div className="grid gap-6 md:grid-cols-3">
            <Card>
               <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                     <div>
                        <p className="text-sm text-gray-500">Total</p>
                        <p className="text-2xl font-bold">
                           {notifications.length}
                        </p>
                     </div>
                     <Bell className="h-8 w-8 text-red-500" />
                  </div>
               </CardContent>
            </Card>
            <Card>
               <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                     <div>
                        <p className="text-sm text-gray-500">Unread</p>
                        <p className="text-2xl font-bold">
                           {notifications.filter((n) => !n.is_read).length}
                        </p>
                     </div>
                     <Bell className="h-8 w-8 text-red-500" />
                  </div>
               </CardContent>
            </Card>
            <Card>
               <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                     <div>
                        <p className="text-sm text-gray-500">Archived</p>
                        <p className="text-2xl font-bold">
                           {notifications.filter((n) => n.is_archived).length}
                        </p>
                     </div>
                     <Archive className="h-8 w-8 text-gray-500" />
                  </div>
               </CardContent>
            </Card>
         </div>

         {/* Notifications List */}
         <div className="space-y-4">
            {notifications.length === 0 ? (
               <Card>
                  <CardContent className="py-12 text-center">
                     <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                     <h3 className="text-lg font-semibold mb-2">
                        No Notifications
                     </h3>
                     <p className="text-gray-500">
                        You don't have any notifications yet
                     </p>
                  </CardContent>
               </Card>
            ) : (
               notifications.map((notification) => (
                  <Card
                     key={notification.id}
                     className={notification.is_read ? "opacity-60" : ""}
                  >
                     <CardHeader>
                        <div className="flex items-start justify-between">
                           <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                 <CardTitle>{notification.title}</CardTitle>
                                 {!notification.is_read && (
                                    <Badge className="bg-red-100 text-red-800">
                                       New
                                    </Badge>
                                 )}
                                 {notification.is_archived && (
                                    <Badge variant="outline">Archived</Badge>
                                 )}
                              </div>
                              <p className="text-sm text-gray-600">
                                 {notification.message}
                              </p>
                           </div>
                        </div>
                     </CardHeader>
                     <CardContent>
                        <div className="flex items-center justify-between">
                           <div className="text-sm text-gray-500">
                              From: {notification.sender?.name} •{" "}
                              {format(
                                 new Date(notification.created_at),
                                 "MMM dd, yyyy 'at' hh:mm a"
                              )}
                           </div>
                           <div className="flex gap-2">
                              {!notification.is_read && (
                                 <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                       handleMarkAsRead(notification.id)
                                    }
                                 >
                                    <CheckCircle className="h-4 w-4 mr-1" />
                                    Mark as Read
                                 </Button>
                              )}
                              {!notification.is_archived && (
                                 <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                       handleArchive(notification.id)
                                    }
                                 >
                                    <Archive className="h-4 w-4 mr-1" />
                                    Archive
                                 </Button>
                              )}
                           </div>
                        </div>
                     </CardContent>
                  </Card>
               ))
            )}
         </div>
      </div>
   );
}
