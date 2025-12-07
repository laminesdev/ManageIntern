import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Loader2, Users, CheckCircle, XCircle } from 'lucide-react';
import { userService } from '@/services/userService';

const assignSchema = z.object({
  intern_id: z.coerce.number().min(1, 'Please select an intern'),
  department_id: z.coerce.number().min(1, 'Please select a department'),
  manager_id: z.coerce.number().min(1, 'Please select a manager'),
});

type AssignFormData = z.infer<typeof assignSchema>;

export default function AssignInterns() {
  const [isLoading, setIsLoading] = useState(false);
  const [interns, setInterns] = useState<any[]>([]);
  const [departments, setDepartments] = useState<any[]>([]);
  const [managers, setManagers] = useState<any[]>([]);
  const [assignedInterns, setAssignedInterns] = useState<any[]>([]);

  const form = useForm<AssignFormData>({
    resolver: zodResolver(assignSchema),
    defaultValues: {
      intern_id: undefined,
      department_id: undefined,
      manager_id: undefined,
    },
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [internsData, managersData] = await Promise.all([
        userService.getUnassignedInterns(),
        userService.getManagers(),
      ]);
      
      setInterns(internsData);
      setManagers(managersData);
      
      // Mock departments (should come from API)
      setDepartments([
        { id: 1, name: 'Engineering' },
        { id: 2, name: 'Marketing' },
        { id: 3, name: 'Sales' },
        { id: 4, name: 'Human Resources' },
        { id: 5, name: 'Finance' },
      ]);
      
      // Load assigned interns
      const assignedResponse = await userService.getInterns({ unassigned: false });
      setAssignedInterns(assignedResponse);
    } catch (error) {
      toast.error('Failed to load data');
    }
  };

  const onSubmit = async (data: AssignFormData) => {
    try {
      setIsLoading(true);
      
      // Check if intern is already assigned
      const isAlreadyAssigned = assignedInterns.some(intern => intern.id === data.intern_id);
      if (isAlreadyAssigned) {
        toast.error('This intern is already assigned to a department');
        return;
      }

      await userService.assignIntern(data.intern_id, {
        department_id: data.department_id,
        manager_id: data.manager_id,
      });
      
      toast.success('Intern assigned successfully!');
      form.reset();
      loadData(); // Refresh data
    } catch (error: any) {
      if (error.response?.status === 422) {
        toast.error('Validation error. Please check your inputs.');
      } else {
        toast.error(error.response?.data?.message || 'Failed to assign intern');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const departmentId = form.watch('department_id');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Assign Interns</h1>
          <p className="text-muted-foreground">
            Assign interns to departments and managers
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Assignment Form */}
        <Card>
          <CardHeader>
            <CardTitle>Assign New Intern</CardTitle>
            <CardDescription>
              Select an unassigned intern and assign them to a department and manager
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="intern_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Intern *</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value?.toString()}
                        disabled={interns.length === 0}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={
                              interns.length === 0 
                                ? "No unassigned interns available" 
                                : "Select an intern"
                            } />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {interns.map((intern) => (
                            <SelectItem key={intern.id} value={intern.id.toString()}>
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
                  name="department_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Department *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a department" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {departments.map((dept) => (
                            <SelectItem key={dept.id} value={dept.id.toString()}>
                              {dept.name}
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
                  name="manager_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Manager *</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value?.toString()}
                        disabled={!departmentId}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={
                              departmentId 
                                ? "Select a manager" 
                                : "Select department first"
                            } />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {managers
                            .filter(manager => manager.department_id === departmentId)
                            .map((manager) => (
                              <SelectItem key={manager.id} value={manager.id.toString()}>
                                {manager.name} - {manager.email}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Assigning...
                    </>
                  ) : (
                    'Assign Intern'
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Assigned Interns List */}
        <Card>
          <CardHeader>
            <CardTitle>Assigned Interns</CardTitle>
            <CardDescription>
              Interns currently assigned to departments
            </CardDescription>
          </CardHeader>
          <CardContent>
            {assignedInterns.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No interns assigned yet
              </div>
            ) : (
              <div className="space-y-3">
                {assignedInterns.slice(0, 5).map((intern) => (
                  <div key={intern.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{intern.name}</p>
                      <div className="text-sm text-gray-500">
                        {intern.department?.name || 'No department'} • {intern.manager?.name || 'No manager'}
                      </div>
                    </div>
                    <CheckCircle className="h-5 w-5 text-red-500" />
                  </div>
                ))}
                {assignedInterns.length > 5 && (
                  <p className="text-center text-sm text-gray-500">
                    +{assignedInterns.length - 5} more interns
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Unassigned Interns Table */}
      <Card>
        <CardHeader>
          <CardTitle>Unassigned Interns</CardTitle>
          <CardDescription>
            Interns waiting to be assigned to departments
          </CardDescription>
        </CardHeader>
        <CardContent>
          {interns.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              All interns have been assigned
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {interns.map((intern) => (
                  <TableRow key={intern.id}>
                    <TableCell className="font-medium">{intern.name}</TableCell>
                    <TableCell>{intern.email}</TuableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <XCircle className="h-4 w-4 text-red-500 mr-2" />
                        <span className="text-red-600">Unassigned</span>
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