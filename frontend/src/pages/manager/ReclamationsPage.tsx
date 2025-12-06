import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { AlertCircle, Filter, Eye, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { reclamationService } from '@/services/reclamationService';

const statusSchema = z.object({
  status: z.enum(['pending', 'in_review', 'resolved', 'archived']),
  resolution_notes: z.string().optional(),
});

type StatusFormData = z.infer<typeof statusSchema>;

export default function ReclamationsPage() {
  const [reclamations, setReclamations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedReclamation, setSelectedReclamation] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<StatusFormData>({
    resolver: zodResolver(statusSchema),
    defaultValues: {
      status: 'pending',
      resolution_notes: '',
    },
  });

  useEffect(() => {
    loadReclamations();
  }, [statusFilter]);

  const loadReclamations = async () => {
    try {
      setIsLoading(true);
      const response = await reclamationService.getDepartmentReclamations();
      let data = response?.data || [];
      
      if (statusFilter !== 'all') {
        data = data.filter((r: any) => r.status === statusFilter);
      }
      
      setReclamations(data);
    } catch (error) {
      console.error('Failed to load reclamations:', error);
      toast.error('Failed to load reclamations');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'in_review':
        return <Badge className="bg-blue-100 text-blue-800">In Review</Badge>;
      case 'resolved':
        return <Badge className="bg-green-100 text-green-800">Resolved</Badge>;
      case 'archived':
        return <Badge className="bg-gray-100 text-gray-800">Archived</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleUpdateStatus = async (data: StatusFormData) => {
    try {
      if (!selectedReclamation) return;
      
      await reclamationService.updateReclamation(selectedReclamation.id, data);
      toast.success('Reclamation status updated');
      setIsDialogOpen(false);
      form.reset();
      loadReclamations();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const openStatusDialog = (reclamation: any) => {
    setSelectedReclamation(reclamation);
    form.reset({
      status: reclamation.status,
      resolution_notes: '',
    });
    setIsDialogOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reclamations</h1>
          <p className="text-muted-foreground">
            Review and manage intern reclamations
          </p>
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-32">
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

      <Card>
        <CardHeader>
          <CardTitle>All Reclamations</CardTitle>
          <CardDescription>
            {reclamations.length} reclamation(s) found
          </CardDescription>
        </CardHeader>
        <CardContent>
          {reclamations.length === 0 ? (
            <div className="text-center py-12">
              <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Reclamations</h3>
              <p className="text-gray-500">No reclamations found for your department</p>
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
                {reclamations.map((reclamation) => (
                  <TableRow key={reclamation.id}>
                    <TableCell className="font-medium">
                      {reclamation.intern?.name || 'Unknown'}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{reclamation.subject}</p>
                        <p className="text-sm text-gray-500 truncate max-w-xs">
                          {reclamation.description}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(reclamation.status)}</TableCell>
                    <TableCell>
                      {format(new Date(reclamation.created_at), 'MMM dd, yyyy')}
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openStatusDialog(reclamation)}
                      >
                        Update Status
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Update Reclamation Status</DialogTitle>
          </DialogHeader>
          {selectedReclamation && (
            <div className="mb-4">
              <p className="font-medium">{selectedReclamation.subject}</p>
              <p className="text-sm text-gray-500 mt-1">
                From: {selectedReclamation.intern?.name}
              </p>
              <p className="text-sm text-gray-500">
                Submitted: {format(new Date(selectedReclamation.created_at), 'PPpp')}
              </p>
            </div>
          )}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleUpdateStatus)} className="space-y-4">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Status *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="pending">
                          <div className="flex items-center">
                            <AlertCircle className="h-4 w-4 text-yellow-500 mr-2" />
                            Pending
                          </div>
                        </SelectItem>
                        <SelectItem value="in_review">
                          <div className="flex items-center">
                            <Eye className="h-4 w-4 text-blue-500 mr-2" />
                            In Review
                          </div>
                        </SelectItem>
                        <SelectItem value="resolved">
                          <div className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                            Resolved
                          </div>
                        </SelectItem>
                        <SelectItem value="archived">
                          <div className="flex items-center">
                            <XCircle className="h-4 w-4 text-gray-500 mr-2" />
                            Archived
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="resolution_notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Resolution Notes (Optional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Add notes about the resolution..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button type="submit">Update Status</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}