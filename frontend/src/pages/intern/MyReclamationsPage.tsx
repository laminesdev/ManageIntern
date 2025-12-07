// pages/intern/MyReclamationsPage.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { reclamationService } from "@/services/reclamationService";
import { toast } from "sonner";
import { format } from "date-fns";
import { AlertCircle, Plus, MessageSquare } from "lucide-react";

export default function MyReclamationsPage() {
   const navigate = useNavigate();
   const [reclamations, setReclamations] = useState<any[]>([]);
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      loadReclamations();
   }, []);

   const loadReclamations = async () => {
      try {
         setIsLoading(true);
         const response = await reclamationService.getMyReclamations();
         setReclamations(response.data || []);
      } catch (error) {
         toast.error("Failed to load reclamations");
      } finally {
         setIsLoading(false);
      }
   };

   const getStatusBadge = (status: string) => {
      const badges = {
         pending: <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>,
         in_review: <Badge className="bg-blue-100 text-blue-800">In Review</Badge>,
         resolved: <Badge className="bg-green-100 text-green-800">Resolved</Badge>,
         archived: <Badge variant="outline">Archived</Badge>,
      };
      return badges[status as keyof typeof badges] || <Badge>{status}</Badge>;
   };

   if (isLoading) {
      return <div className="flex items-center justify-center min-h-[400px]">Loading...</div>;
   }

   return (
      <div className="space-y-6">
         <div className="flex items-center justify-between">
            <div>
               <h1 className="text-3xl font-bold">My Reclamations</h1>
               <p className="text-muted-foreground">View and track your reclamations</p>
            </div>
            <Button onClick={() => navigate("/intern/reclamations/new")}>
               <Plus className="mr-2 h-4 w-4" />
               New Reclamation
            </Button>
         </div>

         {/* Stats */}
         <div className="grid gap-6 md:grid-cols-4">
            <Card>
               <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                     <div>
                        <p className="text-sm text-gray-500">Total</p>
                        <p className="text-2xl font-bold">{reclamations.length}</p>
                     </div>
                     <AlertCircle className="h-8 w-8 text-blue-500" />
                  </div>
               </CardContent>
            </Card>
            <Card>
               <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                     <div>
                        <p className="text-sm text-gray-500">Pending</p>
                        <p className="text-2xl font-bold">{reclamations.filter(r => r.status === 'pending').length}</p>
                     </div>
                     <AlertCircle className="h-8 w-8 text-yellow-500" />
                  </div>
               </CardContent>
            </Card>
            <Card>
               <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                     <div>
                        <p className="text-sm text-gray-500">In Review</p>
                        <p className="text-2xl font-bold">{reclamations.filter(r => r.status === 'in_review').length}</p>
                     </div>
                     <MessageSquare className="h-8 w-8 text-blue-500" />
                  </div>
               </CardContent>
            </Card>
            <Card>
               <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                     <div>
                        <p className="text-sm text-gray-500">Resolved</p>
                        <p className="text-2xl font-bold">{reclamations.filter(r => r.status === 'resolved').length}</p>
                     </div>
                     <AlertCircle className="h-8 w-8 text-green-500" />
                  </div>
               </CardContent>
            </Card>
         </div>

         {/* Reclamations List */}
         <div className="space-y-4">
            {reclamations.length === 0 ? (
               <Card>
                  <CardContent className="py-12 text-center">
                     <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                     <h3 className="text-lg font-semibold mb-2">No Reclamations</h3>
                     <p className="text-gray-500 mb-4">You haven't submitted any reclamations yet</p>
                     <Button onClick={() => navigate("/intern/reclamations/new")}>
                        <Plus className="mr-2 h-4 w-4" />
                        Submit First Reclamation
                     </Button>
                  </CardContent>
               </Card>
            ) : (
               reclamations.map((reclamation) => (
                  <Card key={reclamation.id}>
                     <CardHeader>
                        <div className="flex items-start justify-between">
                           <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                 <CardTitle>{reclamation.subject}</CardTitle>
                                 {getStatusBadge(reclamation.status)}
                              </div>
                              <p className="text-sm text-gray-600">{reclamation.description}</p>
                           </div>
                        </div>
                     </CardHeader>
                     <CardContent>
                        <div className="space-y-4">
                           {reclamation.response && (
                              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                                 <h4 className="font-semibold text-blue-900 mb-2">Manager Response</h4>
                                 <p className="text-sm text-blue-800">{reclamation.response}</p>
                                 {reclamation.responded_at && (
                                    <p className="text-xs text-blue-600 mt-2">
                                       Responded on {format(new Date(reclamation.responded_at), "MMM dd, yyyy")}
                                    </p>
                                 )}
                              </div>
                           )}

                           <div className="flex items-center justify-between text-sm text-gray-500">
                              <div>
                                 Submitted: {format(new Date(reclamation.created_at), "MMM dd, yyyy")}
                              </div>
                              {reclamation.resolved_at && (
                                 <div>
                                    Resolved: {format(new Date(reclamation.resolved_at), "MMM dd, yyyy")}
                                 </div>
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