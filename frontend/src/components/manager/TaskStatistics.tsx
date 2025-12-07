import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Clock, AlertCircle, XCircle } from "lucide-react";

interface TaskStatisticsProps {
   statistics: {
      total: number;
      pending: number;
      in_progress: number;
      completed: number;
      overdue: number;
   };
}

export default function TaskStatistics({ statistics }: TaskStatisticsProps) {
   const completionRate = statistics.total > 0 
      ? (statistics.completed / statistics.total) * 100 
      : 0;

   const stats = [
      { label: "Pending", value: statistics.pending, icon: Clock, color: "text-yellow-600" },
      { label: "In Progress", value: statistics.in_progress, icon: Clock, color: "text-blue-600" },
      { label: "Completed", value: statistics.completed, icon: CheckCircle, color: "text-green-600" },
      { label: "Overdue", value: statistics.overdue, icon: AlertCircle, color: "text-red-600" },
   ];

   return (
      <Card>
         <CardHeader>
            <CardTitle>Task Overview</CardTitle>
         </CardHeader>
         <CardContent className="space-y-6">
            {/* Completion Rate */}
            <div>
               <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Completion Rate</span>
                  <span className="text-sm font-bold">{completionRate.toFixed(1)}%</span>
               </div>
               <Progress value={completionRate} className="h-2" />
            </div>

            {/* Breakdown */}
            <div className="space-y-3">
               {stats.map((stat) => {
                  const Icon = stat.icon;
                  return (
                     <div key={stat.label} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                           <Icon className={`h-5 w-5 ${stat.color}`} />
                           <span className="text-sm">{stat.label}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                           <span className={`text-sm font-semibold ${stat.color}`}>
                              {stat.value}
                           </span>
                           <span className="text-xs text-gray-500">
                              {statistics.total > 0 ? `${((stat.value / statistics.total) * 100).toFixed(0)}%` : "0%"}
                           </span>
                        </div>
                     </div>
                  );
               })}
            </div>

            {/* Total */}
            <div className="pt-3 border-t">
               <div className="flex justify-between">
                  <span className="text-sm font-medium">Total Tasks</span>
                  <span className="text-sm font-bold">{statistics.total}</span>
               </div>
            </div>
         </CardContent>
      </Card>
   );
}