import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
   Card,
   CardContent,
   CardHeader,
   CardTitle,
   CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import {
   AlertCircle,
   Filter,
   Eye,
   Search,
   Loader2,
   MessageSquare,
} from "lucide-react";
import { format } from "date-fns";
import { reclamationService } from "@/services/reclamationService";

export default function ReclamationsPage() {
   const navigate = useNavigate();
   const [reclamations, setReclamations] = useState<any[]>([]);
   const [filteredReclamations, setFilteredReclamations] = useState<any[]>([]);
   const [isLoading, setIsLoading] = useState(true);
   const [statusFilter, setStatusFilter] = useState("all");
   const [searchTerm, setSearchTerm] = useState("");

   useEffect(() => {
      loadReclamations();
   }, []);

   useEffect(() => {
      filterReclamations();
   }, [reclamations, statusFilter, searchTerm]);

   const loadReclamations = async () => {
      try {
         setIsLoading(true);
         const response = await reclamationService.getDepartmentReclamations();
         setReclamations(response?.data || []);
         setFilteredReclamations(response?.data || []);
      } catch (error) {
         console.error("Failed to load reclamations:", error);
         toast.error("Failed to load reclamations");
      } finally {
         setIsLoading(false);
      }
   };

   const filterReclamations = () => {
      let filtered = [...reclamations];

      if (statusFilter !== "all") {
         filtered = filtered.filter((r: any) => r.status === statusFilter);
      }

      if (searchTerm) {
         const term = searchTerm.toLowerCase();
         filtered = filtered.filter(
            (r: any) =>
               r.subject?.toLowerCase().includes(term) ||
               r.description?.toLowerCase().includes(term) ||
               r.intern?.name?.toLowerCase().includes(term)
         );
      }

      setFilteredReclamations(filtered);
   };

   const getStatusBadge = (status: string) => {
      switch (status) {
         case "pending":
            return (
               <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
            );
         case "in_review":
            return <Badge className="bg-red-100 text-red-800">In Review</Badge>;
         case "resolved": // FIXED
            return <Badge className="bg-red-100 text-red-800">Resolved</Badge>;
         case "archived":
            return (
               <Badge className="bg-gray-100 text-gray-800">Archived</Badge>
            );
         default:
            return <Badge variant="outline">{status}</Badge>;
      }
   };

   const getStatusStats = () => {
      return {
         total: reclamations.length,
         pending: reclamations.filter((r) => r.status === "pending").length,
         in_review: reclamations.filter((r) => r.status === "in_review").length,
         resolved: reclamations.filter((r) => r.status === "resolved").length, // FIXED
         archived: reclamations.filter((r) => r.status === "archived").length,
      };
   };

   const stats = getStatusStats();

   if (isLoading) {
      return (
         <div className="space-y-6">
            <div className="flex items-center justify-between">
               <div>
                  <h1 className="text-3xl font-bold tracking-tight">
                     Reclamations
                  </h1>
                  <p className="text-muted-foreground">
                     Review and manage intern reclamations
                  </p>
               </div>
               <Skeleton className="h-10 w-32" />
            </div>
            <Skeleton className="h-64 w-full" />
         </div>
      );
   }

   return (
      <div className="space-y-6">
         {/* Header */}
         <div className="flex items-center justify-between">
            <div>
               <h1 className="text-3xl font-bold tracking-tight">
                  Reclamations
               </h1>
               <p className="text-muted-foreground">
                  Review and manage intern reclamations from your department
               </p>
            </div>
         </div>

         {/* Stats */}
         <div className="grid gap-6 md:grid-cols-5">
            <Card>
               <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                     <div>
                        <p className="text-sm text-gray-500">Total</p>
                        <p className="text-2xl font-bold">{stats.total}</p>
                     </div>
                     <AlertCircle className="h-8 w-8 text-red-500" />
                  </div>
               </CardContent>
            </Card>
            <Card>
               <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                     <div>
                        <p className="text-sm text-gray-500">Pending</p>
                        <p className="text-2xl font-bold text-yellow-600">
                           {stats.pending}
                        </p>
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
                        <p className="text-2xl font-bold text-red-600">
                           {stats.in_review}
                        </p>
                     </div>
                     <Eye className="h-8 w-8 text-red-500" />
                  </div>
               </CardContent>
            </Card>
            <Card>
               <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                     <div>
                        <p className="text-sm text-gray-500">Resolved</p>
                        <p className="text-2xl font-bold text-red-600">
                           {stats.resolved}
                        </p>
                     </div>
                     <MessageSquare className="h-8 w-8 text-red-500" />
                  </div>
               </CardContent>
            </Card>
            <Card>
               <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                     <div>
                        <p className="text-sm text-gray-500">Archived</p>
                        <p className="text-2xl font-bold text-gray-600">
                           {stats.archived}
                        </p>
                     </div>
                     <Filter className="h-8 w-8 text-gray-500" />
                  </div>
               </CardContent>
            </Card>
         </div>

         {/* Filters */}
         <Card>
            <CardContent className="pt-6">
               <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                     <div className="relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                           placeholder="Search by subject, description, or intern name..."
                           value={searchTerm}
                           onChange={(e) => setSearchTerm(e.target.value)}
                           className="pl-10"
                        />
                     </div>
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                     <SelectTrigger className="w-40">
                        <SelectValue placeholder="Filter by status" />
                     </SelectTrigger>
                     <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="in_review">In Review</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                     </SelectContent>
                  </Select>
               </div>
            </CardContent>
         </Card>

         {/* Reclamations Table */}
         <Card>
            <CardHeader>
               <CardTitle>All Reclamations</CardTitle>
               <CardDescription>
                  {filteredReclamations.length} reclamation(s) found
               </CardDescription>
            </CardHeader>
            <CardContent>
               {filteredReclamations.length === 0 ? (
                  <div className="text-center py-12">
                     <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                     <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        No Reclamations
                     </h3>
                     <p className="text-gray-500">
                        {searchTerm || statusFilter !== "all"
                           ? "No reclamations match your search criteria"
                           : "No reclamations found for your department"}
                     </p>
                  </div>
               ) : (
                  <Table>
                     <TableHeader>
                        <TableRow>
                           <TableHead>Intern</TableHead>
                           <TableHead>Subject</TableHead>
                           <TableHead>Status</TableHead>
                           <TableHead>Submitted</TableHead>
                           <TableHead>Actions</TableHead>
                        </TableRow>
                     </TableHeader>
                     <TableBody>
                        {filteredReclamations.map((reclamation) => (
                           <TableRow key={reclamation.id}>
                              <TableCell className="font-medium">
                                 {reclamation.intern?.name || "Unknown"}
                              </TableCell>
                              <TableCell>
                                 <div>
                                    <p className="font-medium">
                                       {reclamation.subject}
                                    </p>
                                    <p className="text-sm text-gray-500 truncate max-w-xs">
                                       {reclamation.description}
                                    </p>
                                 </div>
                              </TableCell>
                              <TableCell>
                                 {getStatusBadge(reclamation.status)}
                              </TableCell>
                              <TableCell>
                                 {format(
                                    new Date(reclamation.created_at),
                                    "MMM dd, yyyy"
                                 )}
                              </TableCell>
                              <TableCell>
                                 <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() =>
                                       navigate(
                                          `/manager/reclamations/${reclamation.id}`
                                       )
                                    }
                                 >
                                    <Eye className="h-4 w-4 mr-2" />
                                    View Details
                                 </Button>
                              </TableCell>
                           </TableRow>
                        ))}
                     </TableBody>
                  </Table>
               )}
            </CardContent>
         </Card>
      </div>
   );
}
