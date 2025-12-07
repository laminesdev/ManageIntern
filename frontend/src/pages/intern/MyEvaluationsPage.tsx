// pages/intern/MyEvaluationsPage.tsx
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { evaluationService } from "@/services/evaluationService";
import { toast } from "sonner";
import { format } from "date-fns";
import { Star, Award, TrendingUp } from "lucide-react";

export default function MyEvaluationsPage() {
   const [evaluations, setEvaluations] = useState<any[]>([]);
   const [statistics, setStatistics] = useState<any>(null);
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      loadData();
   }, []);

   const loadData = async () => {
      try {
         setIsLoading(true);
         const [evals, stats] = await Promise.all([
            evaluationService.getMyEvaluations(),
            evaluationService.getMyEvaluationStatistics(),
         ]);
         setEvaluations(evals.data || []);
         setStatistics(stats.statistics);
      } catch (error) {
         toast.error("Failed to load evaluations");
      } finally {
         setIsLoading(false);
      }
   };

   const getScoreBadge = (score: number) => {
      if (score >= 90) return <Badge className="bg-green-100 text-green-800">Excellent</Badge>;
      if (score >= 80) return <Badge className="bg-blue-100 text-blue-800">Good</Badge>;
      if (score >= 70) return <Badge className="bg-yellow-100 text-yellow-800">Average</Badge>;
      return <Badge className="bg-red-100 text-red-800">Needs Improvement</Badge>;
   };

   if (isLoading) {
      return <div className="flex items-center justify-center min-h-[400px]">Loading...</div>;
   }

   return (
      <div className="space-y-6">
         <div>
            <h1 className="text-3xl font-bold">My Evaluations</h1>
            <p className="text-muted-foreground">View your performance evaluations</p>
         </div>

         {/* Stats */}
         <div className="grid gap-6 md:grid-cols-3">
            <Card>
               <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                     <div>
                        <p className="text-sm text-gray-500">Total Evaluations</p>
                        <p className="text-2xl font-bold">{statistics?.total || 0}</p>
                     </div>
                     <Star className="h-8 w-8 text-blue-500" />
                  </div>
               </CardContent>
            </Card>
            <Card>
               <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                     <div>
                        <p className="text-sm text-gray-500">Average Score</p>
                        <p className="text-2xl font-bold">{statistics?.average_score || 0}%</p>
                     </div>
                     <Award className="h-8 w-8 text-green-500" />
                  </div>
               </CardContent>
            </Card>
            <Card>
               <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                     <div>
                        <p className="text-sm text-gray-500">Progress</p>
                        <p className="text-2xl font-bold">
                           {statistics?.average_score >= 80 ? "On Track" : "Improving"}
                        </p>
                     </div>
                     <TrendingUp className="h-8 w-8 text-purple-500" />
                  </div>
               </CardContent>
            </Card>
         </div>

         {/* Evaluations List */}
         <div className="space-y-4">
            {evaluations.length === 0 ? (
               <Card>
                  <CardContent className="py-12 text-center">
                     <Star className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                     <h3 className="text-lg font-semibold mb-2">No Evaluations Yet</h3>
                     <p className="text-gray-500">You haven't been evaluated yet</p>
                  </CardContent>
               </Card>
            ) : (
               evaluations.map((evaluation) => (
                  <Card key={evaluation.id}>
                     <CardHeader>
                        <div className="flex items-start justify-between">
                           <div>
                              <CardTitle className="flex items-center gap-2">
                                 {evaluation.evaluation_type.replace('_', ' ').toUpperCase()} Evaluation
                                 {getScoreBadge(evaluation.score)}
                              </CardTitle>
                              <p className="text-sm text-gray-500 mt-2">
                                 Evaluated by: {evaluation.manager?.name}
                              </p>
                           </div>
                           <div className="text-right">
                              <p className="text-3xl font-bold text-blue-600">{evaluation.score}%</p>
                              <p className="text-xs text-gray-500">
                                 {format(new Date(evaluation.evaluated_at), "MMM dd, yyyy")}
                              </p>
                           </div>
                        </div>
                     </CardHeader>
                     <CardContent className="space-y-4">
                        <div>
                           <Progress value={evaluation.score} className="h-2" />
                        </div>

                        {evaluation.feedback && (
                           <div>
                              <h4 className="font-semibold mb-2">Feedback</h4>
                              <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">
                                 {evaluation.feedback}
                              </p>
                           </div>
                        )}

                        {evaluation.strengths && (
                           <div>
                              <h4 className="font-semibold mb-2 text-green-700">Strengths</h4>
                              <p className="text-sm text-gray-700 bg-green-50 p-3 rounded">
                                 {evaluation.strengths}
                              </p>
                           </div>
                        )}

                        {evaluation.areas_for_improvement && (
                           <div>
                              <h4 className="font-semibold mb-2 text-amber-700">Areas for Improvement</h4>
                              <p className="text-sm text-gray-700 bg-amber-50 p-3 rounded">
                                 {evaluation.areas_for_improvement}
                              </p>
                           </div>
                        )}
                     </CardContent>
                  </Card>
               ))
            )}
         </div>
      </div>
   );
}