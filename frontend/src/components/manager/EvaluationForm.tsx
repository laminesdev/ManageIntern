import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2 } from "lucide-react";

const evaluationSchema = z.object({
   intern_id: z.number().min(1, "Please select an intern"),
   score: z.number().min(0, "Score must be at least 0").max(100, "Score cannot exceed 100"),
   feedback: z.string().min(1, "Feedback is required"),
   evaluation_type: z.enum(["weekly", "monthly", "quarterly", "final"]),
   strengths: z.string().optional(),
   areas_for_improvement: z.string().optional(),
});

type EvaluationFormData = z.infer<typeof evaluationSchema>;

interface EvaluationFormProps {
   interns: Array<{ id: number; name: string; email: string }>;
   onSubmit: (data: EvaluationFormData) => Promise<void>;
   isLoading: boolean;
   defaultValues?: Partial<EvaluationFormData>;
}

export default function EvaluationForm({ interns, onSubmit, isLoading, defaultValues }: EvaluationFormProps) {
   const form = useForm<EvaluationFormData>({
      resolver: zodResolver(evaluationSchema),
      defaultValues: {
         intern_id: defaultValues?.intern_id || 0,
         score: defaultValues?.score || 0,
         feedback: defaultValues?.feedback || "",
         evaluation_type: defaultValues?.evaluation_type || "weekly",
         strengths: defaultValues?.strengths || "",
         areas_for_improvement: defaultValues?.areas_for_improvement || "",
      },
   });

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
               control={form.control}
               name="intern_id"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Intern *</FormLabel>
                     <Select
                        onValueChange={(value) => field.onChange(Number(value))}
                        value={field.value > 0 ? String(field.value) : ""}
                        disabled={interns.length === 0}
                     >
                        <FormControl>
                           <SelectTrigger>
                              <SelectValue placeholder={interns.length === 0 ? "No interns available" : "Select an intern"} />
                           </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                           {interns.map((intern) => (
                              <SelectItem key={intern.id} value={String(intern.id)}>
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
                     <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                           <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                           </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                           <SelectItem value="weekly">Weekly</SelectItem>
                           <SelectItem value="monthly">Monthly</SelectItem>
                           <SelectItem value="quarterly">Quarterly</SelectItem>
                           <SelectItem value="final">Final</SelectItem>
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
                           onChange={(e) => field.onChange(Number(e.target.value) || 0)}
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

            <div className="flex justify-end space-x-3 pt-4">
               <Button type="submit" disabled={isLoading || interns.length === 0}>
                  {isLoading ? (
                     <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating...
                     </>
                  ) : (
                     "Create Evaluation"
                  )}
               </Button>
            </div>
         </form>
      </Form>
   );
}