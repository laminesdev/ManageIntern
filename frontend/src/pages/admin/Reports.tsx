import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { Download, Filter, Calendar, BarChart3, TrendingUp, Eye } from 'lucide-react';
import { format } from 'date-fns';
import { reportService } from '@/services/reportService';
import { useNavigate } from 'react-router-dom';

export default function AdminReports() {
  const navigate = useNavigate();
  const [reports, setReports] = useState<any[]>([]);
  const [filteredReports, setFilteredReports] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    loadReports();
  }, []);

  useEffect(() => {
    filterReports();
  }, [reports, typeFilter, statusFilter]);

  const loadReports = async () => {
    try {
      setIsLoading(true);
      const response = await reportService.getReports();
      setReports(response.data || []);
      setFilteredReports(response.data || []);
    } catch (error) {
      toast.error('Failed to load reports');
    } finally {
      setIsLoading(false);
    }
  };

  const filterReports = () => {
    let filtered = [...reports];

    if (typeFilter !== 'all') {
      filtered = filtered.filter(report => report.type === typeFilter);
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(report => {
        if (statusFilter === 'sent') return report.sent_to_admin === true;
        if (statusFilter === 'pending') return report.sent_to_admin === false;
        return true;
      });
    }

    setFilteredReports(filtered);
  };

  const getReportTypeBadge = (type: string) => {
    switch (type) {
      case 'attendance':
        return <Badge className="bg-blue-100 text-blue-800">Attendance</Badge>;
      case 'performance':
        return <Badge className="bg-green-100 text-green-800">Performance</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  const getStatusBadge = (sent: boolean) => {
    return sent ? (
      <Badge className="bg-green-100 text-green-800">Sent to Admin</Badge>
    ) : (
      <Badge variant="outline">Pending</Badge>
    );
  };

  const handleViewReport = (report: any) => {
    if (report.type === 'attendance') {
      navigate('/admin/reports/attendance');
    } else if (report.type === 'performance') {
      navigate('/admin/reports/performance');
    }
  };

  const handleExportReport = async (report: any) => {
    try {
      const response = await reportService.exportReport(report.id);
      
      // Create download link
      const blob = new Blob([response.data], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `report-${report.type}-${report.id}-${format(new Date(), 'yyyy-MM-dd')}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      toast.success('Report exported successfully');
    } catch (error) {
      toast.error('Failed to export report');
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Reports Dashboard</h1>
            <p className="text-muted-foreground">View system reports</p>
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
          <h1 className="text-3xl font-bold tracking-tight">Reports Dashboard</h1>
          <p className="text-muted-foreground">
            View and manage system reports
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Reports</p>
                <p className="text-2xl font-bold">{reports.length}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Attendance</p>
                <p className="text-2xl font-bold">
                  {reports.filter(r => r.type === 'attendance').length}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Performance</p>
                <p className="text-2xl font-bold">
                  {reports.filter(r => r.type === 'performance').length}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Sent to Admin</p>
                <p className="text-2xl font-bold">
                  {reports.filter(r => r.sent_to_admin).length}
                </p>
              </div>
              <Filter className="h-8 w-8 text-amber-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Reports</SelectItem>
                  <SelectItem value="attendance">Attendance</SelectItem>
                  <SelectItem value="performance">Performance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="sent">Sent to Admin</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reports Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Reports</CardTitle>
          <CardDescription>
            Reports generated by managers
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredReports.length === 0 ? (
            <div className="text-center py-12">
              <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Reports Found</h3>
              <p className="text-gray-500">
                {typeFilter !== 'all' || statusFilter !== 'all'
                  ? 'No reports match your filter criteria'
                  : 'No reports have been generated yet'}
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Generated By</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell>{getReportTypeBadge(report.type)}</TableCell>
                    <TableCell>
                      {format(new Date(report.period_start), 'MMM dd')} - {format(new Date(report.period_end), 'MMM dd, yyyy')}
                    </TableCell>
                    <TableCell>
                      {report.department?.name || 'All Departments'}
                    </TableCell>
                    <TableCell className="font-medium">
                      {report.generated_by_user?.name || 'Unknown'}
                    </TableCell>
                    <TableCell>
                      {format(new Date(report.created_at), 'MMM dd, yyyy')}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(report.sent_to_admin)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewReport(report)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleExportReport(report)}
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Export
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