import { useState } from "react";
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
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { Loader2, ArrowLeft, AlertCircle } from "lucide-react";
import { reclamationService } from "@/services/reclamationService";

const reclamationSchema = z.object({
   subject: z.string().min(1, "Subject is required"),
   description: z.string().min(1, "Description is required"),
});

type ReclamationFormData = z.infer<typeof reclamationSchema>;

export default function NewReclamationPage() {
   const navigate = useNavigate();
   const [isLoading, setIsLoading] = useState(false);

   const form = useForm<ReclamationFormData>({
      resolver: zodResolver(reclamationSchema),
      defaultValues: {
         subject: "",
         description: "",
      },
   });

   const onSubmit = async (data: ReclamationFormData) => {
      try {
         setIsLoading(true);

         await reclamationService.createReclamation(data);

         toast.success("Reclamation submitted successfully!");
         navigate("/intern/reclamations");
      } catch (error: any) {
         if (error.response?.status === 422) {
            const errors = error.response.data?.errors;
            if (errors) {
               Object.entries(errors).forEach(([field, messages]) => {
                  toast.error(`${field}: ${(messages as string[])[0]}`);
               });
            }
         } else {
            toast.error(
               error.response?.data?.message || "Failed to submit reclamation"
            );
         }
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
                  onClick={() => navigate("/intern/reclamations")}
               >
                  <ArrowLeft className="h-4 w-4" />
               </Button>
               <div>
                  <h1 className="text-3xl font-bold tracking-tight">
                     Submit Reclamation
                  </h1>
                  <p className="text-muted-foreground">
                     Submit a reclamation to your manager
                  </p>
               </div>
            </div>
         </div>

         <Card>
            <CardHeader>
               <CardTitle>Reclamation Details</CardTitle>
               <CardDescription>
                  Describe your issue or concern. Your manager will review it.
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
                        name="subject"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Subject *</FormLabel>
                              <FormControl>
                                 <Input
                                    placeholder="Brief subject of your reclamation"
                                    {...field}
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Description *</FormLabel>
                              <FormControl>
                                 <Textarea
                                    placeholder="Describe your issue in detail..."
                                    className="min-h-[200px]"
                                    {...field}
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     <div className="flex items-center p-4 bg-red-50 border border-red-200 rounded-lg">
                        <AlertCircle className="h-5 w-5 text-red-600 mr-3" />
                        <p className="text-sm text-red-800">
                           Your reclamation will be sent to your manager for
                           review. Please provide clear details.
                        </p>
                     </div>

                     <div className="flex justify-end space-x-3 pt-4">
                        <Button
                           type="button"
                           variant="outline"
                           onClick={() => navigate("/intern/reclamations")}
                           disabled={isLoading}
                        >
                           Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                           {isLoading ? (
                              <>
                                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                 Submitting...
                              </>
                           ) : (
                              "Submit Reclamation"
                           )}
                        </Button>
                     </div>
                  </form>
               </Form>
            </CardContent>
         </Card>
      </div>
   );
}
