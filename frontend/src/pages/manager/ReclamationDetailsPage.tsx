import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
   ArrowLeft,
   Loader2,
   Save,
   User,
   Calendar,
   MessageSquare,
   CheckCircle,
} from "lucide-react";
import { format } from "date-fns";
import { reclamationService } from "@/services/reclamationService";

const responseSchema = z.object({
   response: z.string().min(10, "Response must be at least 10 characters"),
   status: z.enum(["pending", "in_review", "solved", "archived"]), // FIXED
});

type ResponseFormData = z.infer<typeof responseSchema>;

export default function ReclamationDetailsPage() {
   const navigate = useNavigate();
   const { id } = useParams<{ id: string }>();
   const [reclamation, setReclamation] = useState<any>(null);
   const [isLoading, setIsLoading] = useState(true);
   const [isSubmitting, setIsSubmitting] = useState(false);

   const form = useForm<ResponseFormData>({
      resolver: zodResolver(responseSchema),
      defaultValues: {
         response: "",
         status: "in_review",
      },
   });

   useEffect(() => {
      if (id) {
         loadReclamation();
      }
   }, [id]);

   const loadReclamation = async () => {
      if (!id) return;

      try {
         setIsLoading(true);
         const response = await reclamationService.getReclamationById(
            Number(id)
         );
         setReclamation(response.reclamation);

         if (response.reclamation.response) {
            const formStatus =
               response.reclamation.status === "resolved"
                  ? "solved"
                  : response.reclamation.status;

            form.reset({
               response: response.reclamation.response,
               status: formStatus,
            });
         }
      } catch (error) {
         toast.error("Failed to load reclamation");
         navigate("/manager/reclamations");
      } finally {
         setIsLoading(false);
      }
   };

   const onSubmit = async (data: ResponseFormData) => {
      if (!id) return;

      try {
         setIsSubmitting(true);
         await reclamationService.respondToReclamation(Number(id), data);
         toast.success("Response submitted successfully!");
         navigate("/manager/reclamations");
      } catch (error) {
         toast.error("Failed to submit response");
      } finally {
         setIsSubmitting(false);
      }
   };

   const getStatusBadge = (status: string) => {
      switch (status) {
         case "pending":
            return (
               <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
            );
         case "in_review":
            return <Badge className="bg-red-100 text-red-800">In Review</Badge>;
         case "solved": // FIXED
            return <Badge className="bg-red-100 text-red-800">Solved</Badge>;
         case "archived":
            return (
               <Badge className="bg-gray-100 text-gray-800">Archived</Badge>
            );
         default:
            return <Badge variant="outline">{status}</Badge>;
      }
   };

   if (isLoading) {
      return (
         <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
               <Loader2 className="h-12 w-12 animate-spin text-red-500 mx-auto mb-4" />
               <p className="text-gray-500">Loading reclamation...</p>
            </div>
         </div>
      );
   }

   if (!reclamation) {
      return (
         <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
               <h3 className="text-lg font-semibold mb-2">
                  Reclamation Not Found
               </h3>
               <Button onClick={() => navigate("/manager/reclamations")}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Reclamations
               </Button>
            </div>
         </div>
      );
   }

   return (
      <div className="space-y-6">
         <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
               <Button
                  variant="outline"
                  size="icon"
                  onClick={() => navigate("/manager/reclamations")}
               >
                  <ArrowLeft className="h-4 w-4" />
               </Button>
               <div>
                  <h1 className="text-3xl font-bold tracking-tight">
                     Reclamation Details
                  </h1>
                  <p className="text-muted-foreground">
                     Review and respond to reclamation
                  </p>
               </div>
            </div>
            {getStatusBadge(reclamation.status)}
         </div>

         <div className="grid gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-2">
               <CardHeader>
                  <CardTitle>{reclamation.subject}</CardTitle>
               </CardHeader>
               <CardContent className="space-y-6">
                  {/* Intern Info */}
                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                     <User className="h-5 w-5 text-gray-500" />
                     <div>
                        <p className="font-medium">
                           {reclamation.intern?.name}
                        </p>
                        <p className="text-sm text-gray-500">
                           {reclamation.intern?.email}
                        </p>
                     </div>
                  </div>

                  {/* Description */}
                  <div>
                     <h3 className="font-semibold mb-2 flex items-center">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Description
                     </h3>
                     <p className="text-gray-700 bg-gray-50 p-4 rounded-lg whitespace-pre-wrap">
                        {reclamation.description}
                     </p>
                  </div>

                  {/* Existing Response */}
                  {reclamation.response && (
                     <div>
                        <h3 className="font-semibold mb-2">Your Response</h3>
                        <p className="text-gray-700 bg-red-50 p-4 rounded-lg whitespace-pre-wrap border border-red-200">
                           {reclamation.response}
                        </p>
                        {reclamation.responded_at && (
                           <p className="text-xs text-gray-500 mt-2">
                              Responded on{" "}
                              {format(
                                 new Date(reclamation.responded_at),
                                 "PPP"
                              )}
                           </p>
                        )}
                     </div>
                  )}

                  {/* Response Form */}
                  <div className="border-t pt-6">
                     <h3 className="font-semibold mb-4">
                        {reclamation.response
                           ? "Update Response"
                           : "Respond to Reclamation"}
                     </h3>
                     <Form {...form}>
                        <form
                           onSubmit={form.handleSubmit(onSubmit)}
                           className="space-y-4"
                        >
                           <FormField
                              control={form.control}
                              name="status"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormLabel>Status *</FormLabel>
                                    <Select
                                       onValueChange={field.onChange}
                                       value={field.value}
                                    >
                                       <FormControl>
                                          <SelectTrigger>
                                             <SelectValue placeholder="Select status" />
                                          </SelectTrigger>
                                       </FormControl>
                                       <SelectContent>
                                          <SelectItem value="pending">
                                             Pending
                                          </SelectItem>
                                          <SelectItem value="in_review">
                                             In Review
                                          </SelectItem>
                                          <SelectItem value="solved">
                                             Solved
                                          </SelectItem>
                                          <SelectItem value="archived">
                                             Archived
                                          </SelectItem>
                                       </SelectContent>
                                    </Select>
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />

                           <FormField
                              control={form.control}
                              name="response"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormLabel>Response *</FormLabel>
                                    <FormControl>
                                       <Textarea
                                          placeholder="Write your response..."
                                          className="min-h-[150px]"
                                          {...field}
                                       />
                                    </FormControl>
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />

                           <div className="flex justify-end space-x-3">
                              <Button
                                 type="button"
                                 variant="outline"
                                 onClick={() =>
                                    navigate("/manager/reclamations")
                                 }
                                 disabled={isSubmitting}
                              >
                                 Cancel
                              </Button>
                              <Button type="submit" disabled={isSubmitting}>
                                 {isSubmitting ? (
                                    <>
                                       <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                       Submitting...
                                    </>
                                 ) : (
                                    <>
                                       <Save className="mr-2 h-4 w-4" />
                                       Submit Response
                                    </>
                                 )}
                              </Button>
                           </div>
                        </form>
                     </Form>
                  </div>
               </CardContent>
            </Card>

            <Card>
               <CardHeader>
                  <CardTitle>Details</CardTitle>
               </CardHeader>
               <CardContent className="space-y-4">
                  <div>
                     <p className="text-sm text-gray-500">Status</p>
                     <div className="mt-1">
                        {getStatusBadge(reclamation.status)}
                     </div>
                  </div>

                  <div>
                     <p className="text-sm text-gray-500">Submitted</p>
                     <p className="mt-1 font-medium flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        {format(new Date(reclamation.created_at), "PPP")}
                     </p>
                  </div>

                  {reclamation.resolved_at && (
                     <div>
                        <p className="text-sm text-gray-500">Resolved</p>
                        <p className="mt-1 font-medium flex items-center">
                           <Calendar className="h-4 w-4 mr-2" />
                           {format(new Date(reclamation.resolved_at), "PPP")}
                        </p>
                     </div>
                  )}

                  <div className="pt-4 border-t">
                     <p className="text-sm text-gray-500 mb-2">Quick Actions</p>
                     <div className="space-y-2">
                        <Button
                           variant="outline"
                           size="sm"
                           className="w-full"
                           onClick={() => {
                              form.setValue("status", "solved");
                           }}
                        >
                           Mark as Resolved
                        </Button>
                        <Button
                           variant="outline"
                           size="sm"
                           className="w-full"
                           onClick={() => {
                              form.setValue("status", "archived");
                           }}
                        >
                           Archive
                        </Button>
                     </div>
                  </div>
               </CardContent>
            </Card>
         </div>
      </div>
   );
}
