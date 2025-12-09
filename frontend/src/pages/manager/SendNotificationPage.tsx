import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
   Card,
   CardContent,
   CardHeader,
   CardTitle,
   CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { ArrowLeft, Send, Loader2 } from "lucide-react";
import { notificationService } from "@/services/notificationService";

const notificationSchema = z.object({
   title: z.string().min(1, "Title is required"),
   message: z.string().min(1, "Message is required"),
   recipients: z.array(z.number()).min(1, "Select at least one recipient"),
});

type NotificationFormData = z.infer<typeof notificationSchema>;

export default function SendNotificationPage() {
   const navigate = useNavigate();
   const [isLoading, setIsLoading] = useState(false);
   const [interns, setInterns] = useState<Array<{ id: number; name: string; email: string }>>([]);

   const form = useForm<NotificationFormData>({
      resolver: zodResolver(notificationSchema),
      defaultValues: {
         title: "",
         message: "",
         recipients: [],
      },
   });

   useEffect(() => {
      loadInterns();
   }, []);

   const loadInterns = async () => {
      try {
         const response = await notificationService.getDepartmentInterns();
         console.log("Interns loaded:", response);
         setInterns(response?.data || []);
      } catch (error) {
         console.error("Failed to load interns:", error);
         toast.error("Failed to load interns");
      }
   };

   const onSubmit = async (data: NotificationFormData) => {
      try {
         setIsLoading(true);
         await notificationService.sendNotification({
            title: data.title,
            message: data.message,
            recipient_ids: data.recipients,
         });
         toast.success("Notification sent successfully!");
         navigate("/manager/notifications");
      } catch (error: any) {
         console.error("Send error:", error);
         toast.error(
            error.response?.data?.message || "Failed to send notification"
         );
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <div className="space-y-6">
         <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
               <Button
                  variant="outline"
                  size="icon"
                  onClick={() => navigate("/manager/notifications")}
               >
                  <ArrowLeft className="h-4 w-4" />
               </Button>
               <div>
                  <h1 className="text-3xl font-bold tracking-tight">
                     Send Notification
                  </h1>
                  <p className="text-muted-foreground">
                     Send notifications to interns in your department
                  </p>
               </div>
            </div>
         </div>

         <div className="grid gap-6 lg:grid-cols-2">
            <Card className="lg:col-span-2">
               <CardHeader>
                  <CardTitle>Notification Details</CardTitle>
                  <CardDescription>
                     Write your message and select recipients
                  </CardDescription>
               </CardHeader>
               <CardContent>
                  <Form {...form}>
                     <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                     >
                        <FormField
                           control={form.control}
                           name="title"
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel>Title *</FormLabel>
                                 <FormControl>
                                    <Input
                                       placeholder="Enter notification title"
                                       {...field}
                                    />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />

                        <FormField
                           control={form.control}
                           name="message"
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel>Message *</FormLabel>
                                 <FormControl>
                                    <Textarea
                                       placeholder="Write your notification message..."
                                       className="min-h-[150px]"
                                       {...field}
                                    />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />

                        <FormField
                           control={form.control}
                           name="recipients"
                           render={() => (
                              <FormItem>
                                 <FormLabel>Recipients *</FormLabel>
                                 {interns.length === 0 ? (
                                    <p className="text-sm text-muted-foreground">
                                       No interns available in your department
                                    </p>
                                 ) : (
                                    <div className="space-y-2">
                                       {interns.map((intern) => (
                                          <FormField
                                             key={intern.id}
                                             control={form.control}
                                             name="recipients"
                                             render={({ field }) => {
                                                return (
                                                   <FormItem
                                                      key={intern.id}
                                                      className="flex flex-row items-start space-x-3 space-y-0"
                                                   >
                                                      <FormControl>
                                                         <Checkbox
                                                            checked={field.value?.includes(
                                                               intern.id
                                                            )}
                                                            onCheckedChange={(
                                                               checked
                                                            ) => {
                                                               return checked
                                                                  ? field.onChange(
                                                                       [
                                                                          ...field.value,
                                                                          intern.id,
                                                                       ]
                                                                    )
                                                                  : field.onChange(
                                                                       field.value?.filter(
                                                                          (
                                                                             value
                                                                          ) =>
                                                                             value !==
                                                                             intern.id
                                                                       )
                                                                    );
                                                            }}
                                                         />
                                                      </FormControl>
                                                      <FormLabel className="font-normal cursor-pointer">
                                                         <div>
                                                            <p className="font-medium">
                                                               {intern.name}
                                                            </p>
                                                            <p className="text-sm text-gray-500">
                                                               {intern.email}
                                                            </p>
                                                         </div>
                                                      </FormLabel>
                                                   </FormItem>
                                                );
                                             }}
                                          />
                                       ))}
                                    </div>
                                 )}
                                 <FormMessage />
                              </FormItem>
                           )}
                        />

                        <div className="flex justify-end space-x-3 pt-4">
                           <Button
                              type="button"
                              variant="outline"
                              onClick={() => navigate("/manager/notifications")}
                              disabled={isLoading}
                           >
                              Cancel
                           </Button>
                           <Button
                              type="submit"
                              disabled={isLoading || interns.length === 0}
                           >
                              {isLoading ? (
                                 <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Sending...
                                 </>
                              ) : (
                                 <>
                                    <Send className="mr-2 h-4 w-4" />
                                    Send Notification
                                 </>
                              )}
                           </Button>
                        </div>
                     </form>
                  </Form>
               </CardContent>
            </Card>
         </div>
      </div>
   );
}