import { useState, useEffect } from "react";
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
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
   DialogFooter,
} from "@/components/ui/dialog";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import {
   Plus,
   Search,
   Filter,
   Star,
   Edit,
   Trash2,
   CheckCircle,
   XCircle,
   TrendingUp,
   Award,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { evaluationService } from "@/services/evaluationService";

// FIXED: Using correct Zod syntax - remove invalid options from z.number()
const evaluationSchema = z.object({
   intern_id: z.number().min(1, "Please select an intern"),
   score: z
      .number()
      .min(0, "Score must be at least 0")
      .max(100, "Score cannot exceed 100"),
   feedback: z.string().min(1, "Feedback is required"),
   evaluation_type: z.enum(["weekly", "monthly", "quarterly", "final"]),
   strengths: z.string().optional(),
   areas_for_improvement: z.string().optional(),
});

type EvaluationFormData = z.infer<typeof evaluationSchema>;

export default function EvaluationsPage() {
   const [evaluations, setEvaluations] = useState<any[]>([]);
   const [filteredEvaluations, setFilteredEvaluations] = useState<any[]>([]);
   const [isLoading, setIsLoading] = useState(true);
   const [isDialogOpen, setIsDialogOpen] = useState(false);
   const [interns, setInterns] = useState<any[]>([]);
   const [typeFilter, setTypeFilter] = useState("all");
   const [searchTerm, setSearchTerm] = useState("");

   const form = useForm<EvaluationFormData>({
      resolver: zodResolver(evaluationSchema),
      defaultValues: {
         intern_id: 0,
         score: 0,
         feedback: "",
         evaluation_type: "weekly",
         strengths: "",
         areas_for_improvement: "",
      },
   });

   useEffect(() => {
      loadData();
   }, []);

   useEffect(() => {
      filterEvaluations();
   }, [evaluations, typeFilter, searchTerm]);

   const loadData = async () => {
      try {
         setIsLoading(true);

         // FIXED: Changed from userService.getInterns() (admin-only endpoint)
         // to evaluationService.getInternsForEvaluation() (manager-specific endpoint)
         const internsResponse =
            await evaluationService.getInternsForEvaluation();
         setInterns(internsResponse.data || []);

         // Load evaluations
         const evaluationsResponse = await evaluationService.getEvaluations();
         setEvaluations(evaluationsResponse.data || []);
      } catch (error: any) {
         console.error("Load data error:", error);

         // Better error handling
         if (error.response?.status === 403) {
            toast.error("Access denied. Please check your permissions.");
         } else {
            toast.error("Failed to load data");
         }
      } finally {
         setIsLoading(false);
      }
   };

   const filterEvaluations = () => {
      let filtered = [...evaluations];

      if (typeFilter !== "all") {
         filtered = filtered.filter(
            (evaluation) => evaluation.evaluation_type === typeFilter
         );
      }

      if (searchTerm) {
         const term = searchTerm.toLowerCase();
         filtered = filtered.filter(
            (evaluation) =>
               evaluation.intern?.name?.toLowerCase().includes(term) ||
               evaluation.feedback?.toLowerCase().includes(term)
         );
      }

      setFilteredEvaluations(filtered);
   };

   const onSubmit = async (data: EvaluationFormData) => {
      try {
         await evaluationService.createEvaluation(data);
         toast.success("Evaluation created successfully!");
         setIsDialogOpen(false);
         form.reset({
            intern_id: 0,
            score: 0,
            feedback: "",
            evaluation_type: "weekly",
            strengths: "",
            areas_for_improvement: "",
         });
         loadData();
      } catch (error: any) {
         if (error.response?.status === 422) {
            const errors = error.response.data?.errors;
            if (errors) {
               Object.entries(errors).forEach(([field, messages]) => {
                  toast.error(`${field}: ${(messages as string[])[0]}`);
               });
            }
         } else if (error.response?.status === 403) {
            toast.error("You don't have permission to evaluate this intern");
         } else {
            toast.error(
               error.response?.data?.message || "Failed to create evaluation"
            );
         }
      }
   };

   const getScoreColor = (score: number) => {
      if (score >= 90) return "text-red-600";
      if (score >= 80) return "text-red-600";
      if (score >= 70) return "text-red-600";
      return "text-red-600";
   };

   const getScoreBadge = (score: number) => {
      if (score >= 90)
         return <Badge className="bg-red-100 text-red-800">Excellent</Badge>;
      if (score >= 80)
         return <Badge className="bg-red-100 text-red-800">Good</Badge>;
      if (score >= 70)
         return <Badge className="bg-red-100 text-red-800">Average</Badge>;
      return (
         <Badge className="bg-red-100 text-red-800">Needs Improvement</Badge>
      );
   };

   const handleDeleteEvaluation = async (id: number) => {
      if (!confirm("Are you sure you want to delete this evaluation?")) return;

      try {
         await evaluationService.deleteEvaluation(id);
         toast.success("Evaluation deleted successfully!");
         loadData();
      } catch (error: any) {
         if (error.response?.status === 403) {
            toast.error("You don't have permission to delete this evaluation");
         } else {
            toast.error("Failed to delete evaluation");
         }
      }
   };

   if (isLoading) {
      return (
         <div className="space-y-6">
            <div className="flex items-center justify-between">
               <div>
                  <h1 className="text-3xl font-bold tracking-tight">
                     Evaluations
                  </h1>
                  <p className="text-muted-foreground">
                     Evaluate intern performance
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
         <div className="flex items-center justify-between">
            <div>
               <h1 className="text-3xl font-bold tracking-tight">
                  Evaluations
               </h1>
               <p className="text-muted-foreground">
                  Evaluate and track intern performance in your department
               </p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
               <DialogTrigger asChild>
                  <Button>
                     <Plus className="mr-2 h-4 w-4" />
                     New Evaluation
                  </Button>
               </DialogTrigger>
               <DialogContent className="max-w-2xl">
                  <DialogHeader>
                     <DialogTitle>Create New Evaluation</DialogTitle>
                  </DialogHeader>
                  <Form {...form}>
                     <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                     >
                        <FormField
                           control={form.control}
                           name="intern_id"
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel>Intern *</FormLabel>
                                 <Select
                                    onValueChange={(value) =>
                                       field.onChange(parseInt(value))
                                    }
                                    value={field.value?.toString() || ""}
                                    disabled={interns.length === 0}
                                 >
                                    <FormControl>
                                       <SelectTrigger>
                                          <SelectValue
                                             placeholder={
                                                interns.length === 0
                                                   ? "No interns available"
                                                   : "Select an intern"
                                             }
                                          />
                                       </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                       {interns.map((intern) => (
                                          <SelectItem
                                             key={intern.id}
                                             value={intern.id.toString()}
                                          >
                                             {intern.name} - {intern.email}
                                          </SelectItem>
                                       ))}
                                    </SelectContent>
                                 </Select>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />

                        <FormField
                           control={form.control}
                           name="evaluation_type"
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel>Evaluation Type *</FormLabel>
                                 <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                 >
                                    <FormControl>
                                       <SelectTrigger>
                                          <SelectValue placeholder="Select type" />
                                       </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                       <SelectItem value="weekly">
                                          Weekly
                                       </SelectItem>
                                       <SelectItem value="monthly">
                                          Monthly
                                       </SelectItem>
                                       <SelectItem value="quarterly">
                                          Quarterly
                                       </SelectItem>
                                       <SelectItem value="final">
                                          Final
                                       </SelectItem>
                                    </SelectContent>
                                 </Select>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />

                        <FormField
                           control={form.control}
                           name="score"
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel>Score (0-100) *</FormLabel>
                                 <FormControl>
                                    <Input
                                       type="number"
                                       min="0"
                                       max="100"
                                       {...field}
                                       onChange={(e) =>
                                          field.onChange(
                                             parseInt(e.target.value) || 0
                                          )
                                       }
                                       value={field.value}
                                    />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                           <FormField
                              control={form.control}
                              name="strengths"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormLabel>Strengths</FormLabel>
                                    <FormControl>
                                       <Textarea
                                          placeholder="Key strengths demonstrated..."
                                          className="min-h-[100px]"
                                          {...field}
                                          value={field.value || ""}
                                       />
                                    </FormControl>
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />

                           <FormField
                              control={form.control}
                              name="areas_for_improvement"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormLabel>Areas for Improvement</FormLabel>
                                    <FormControl>
                                       <Textarea
                                          placeholder="Areas that need development..."
                                          className="min-h-[100px]"
                                          {...field}
                                          value={field.value || ""}
                                       />
                                    </FormControl>
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />
                        </div>

                        <FormField
                           control={form.control}
                           name="feedback"
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel>Overall Feedback *</FormLabel>
                                 <FormControl>
                                    <Textarea
                                       placeholder="Provide detailed feedback..."
                                       className="min-h-[120px]"
                                       {...field}
                                    />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />

                        <DialogFooter>
                           <Button type="submit">Create Evaluation</Button>
                        </DialogFooter>
                     </form>
                  </Form>
               </DialogContent>
            </Dialog>
         </div>

         {/* Stats */}
         <div className="grid gap-6 md:grid-cols-4">
            <Card>
               <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                     <div>
                        <p className="text-sm text-gray-500">
                           Total Evaluations
                        </p>
                        <p className="text-2xl font-bold">
                           {evaluations.length}
                        </p>
                     </div>
                     <TrendingUp className="h-8 w-8 text-red-500" />
                  </div>
               </CardContent>
            </Card>
            <Card>
               <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                     <div>
                        <p className="text-sm text-gray-500">Average Score</p>
                        <p className="text-2xl font-bold">
                           {evaluations.length > 0
                              ? `${(
                                   evaluations.reduce(
                                      (sum, evalItem) => sum + evalItem.score,
                                      0
                                   ) / evaluations.length
                                ).toFixed(1)}%`
                              : "0%"}
                        </p>
                     </div>
                     <Award className="h-8 w-8 text-red-500" />
                  </div>
               </CardContent>
            </Card>
            <Card>
               <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                     <div>
                        <p className="text-sm text-gray-500">
                           Interns Evaluated
                        </p>
                        <p className="text-2xl font-bold">
                           {new Set(evaluations.map((e) => e.intern_id)).size}
                        </p>
                     </div>
                     <Star className="h-8 w-8 text-red-500" />
                  </div>
               </CardContent>
            </Card>
            <Card>
               <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                     <div>
                        <p className="text-sm text-gray-500">This Month</p>
                        <p className="text-2xl font-bold">
                           {
                              evaluations.filter(
                                 (e) =>
                                    new Date(e.created_at).getMonth() ===
                                    new Date().getMonth()
                              ).length
                           }
                        </p>
                     </div>
                     <Filter className="h-8 w-8 text-red-500" />
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
                           placeholder="Search evaluations by intern name or feedback..."
                           value={searchTerm}
                           onChange={(e) => setSearchTerm(e.target.value)}
                           className="pl-10"
                        />
                     </div>
                  </div>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                     <SelectTrigger className="w-40">
                        <SelectValue placeholder="Filter by type" />
                     </SelectTrigger>
                     <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="quarterly">Quarterly</SelectItem>
                        <SelectItem value="final">Final</SelectItem>
                     </SelectContent>
                  </Select>
               </div>
            </CardContent>
         </Card>

         {/* Evaluations Table */}
         <Card>
            <CardHeader>
               <CardTitle>Recent Evaluations</CardTitle>
               <CardDescription>
                  {filteredEvaluations.length} evaluations found
               </CardDescription>
            </CardHeader>
            <CardContent>
               {filteredEvaluations.length === 0 ? (
                  <div className="text-center py-12">
                     <Star className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                     <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        No Evaluations Found
                     </h3>
                     <p className="text-gray-500">
                        {searchTerm || typeFilter !== "all"
                           ? "No evaluations match your search criteria"
                           : "No evaluations have been created yet"}
                     </p>
                  </div>
               ) : (
                  <Table>
                     <TableHeader>
                        <TableRow>
                           <TableHead>Intern</TableHead>
                           <TableHead>Type</TableHead>
                           <TableHead>Score</TableHead>
                           <TableHead>Status</TableHead>
                           <TableHead>Date</TableHead>
                           <TableHead>Actions</TableHead>
                        </TableRow>
                     </TableHeader>
                     <TableBody>
                        {filteredEvaluations.map((evaluation) => (
                           <TableRow key={evaluation.id}>
                              <TableCell className="font-medium">
                                 {evaluation.intern?.name || "Unknown"}
                              </TableCell>
                              <TableCell>
                                 <Badge
                                    variant="outline"
                                    className="capitalize"
                                 >
                                    {evaluation.evaluation_type}
                                 </Badge>
                              </TableCell>
                              <TableCell>
                                 <div
                                    className={`font-bold ${getScoreColor(
                                       evaluation.score
                                    )}`}
                                 >
                                    {evaluation.score}%
                                 </div>
                                 <Progress
                                    value={evaluation.score}
                                    className="mt-1 w-24"
                                 />
                              </TableCell>
                              <TableCell>
                                 {getScoreBadge(evaluation.score)}
                              </TableCell>
                              <TableCell>
                                 {format(
                                    new Date(evaluation.created_at),
                                    "MMM dd, yyyy"
                                 )}
                              </TableCell>
                              <TableCell>
                                 <div className="flex items-center space-x-2">
                                    <Button variant="ghost" size="sm">
                                       <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                       variant="ghost"
                                       size="sm"
                                       onClick={() =>
                                          handleDeleteEvaluation(evaluation.id)
                                       }
                                    >
                                       <Trash2 className="h-4 w-4 text-red-500" />
                                    </Button>
                                 </div>
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
