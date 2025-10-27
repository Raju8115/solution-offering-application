import { useState } from 'react';
import { Plus, Edit, Trash2, Upload, Download } from 'lucide-react';
// import { CarbonHeader } from './CarbonHeader';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const mockOfferings = [
  { id: 1, name: 'Cloud Migration Accelerator', type: 'Professional Services', brand: 'IBM Cloud', status: 'Active' },
  { id: 2, name: 'AI Strategy Workshop', type: 'Consulting', brand: 'IBM Watson', status: 'Active' },
  { id: 3, name: 'Data Platform Modernization', type: 'Implementation', brand: 'IBM Cloud Pak', status: 'Active' },
  { id: 4, name: 'Legacy Application Assessment', type: 'Consulting', brand: 'IBM Consulting', status: 'Draft' },
];

const mockActivities = [
  { id: 1, name: 'Discovery Workshop', category: 'Consulting', hours: 40, rate: 200 },
  { id: 2, name: 'Architecture Design', category: 'Design', hours: 80, rate: 250 },
  { id: 3, name: 'Security Assessment', category: 'Security', hours: 40, rate: 225 },
  { id: 4, name: 'Cloud Migration', category: 'Implementation', hours: 160, rate: 175 },
];

const mockResources = [
  { id: 1, name: 'John Smith', role: 'Lead Architect', rate: 250, availability: 'Available' },
  { id: 2, name: 'Sarah Johnson', role: 'Solution Architect', rate: 200, availability: 'Busy' },
  { id: 3, name: 'Mike Chen', role: 'Cloud Engineer', rate: 175, availability: 'Available' },
  { id: 4, name: 'Emily Davis', role: 'Security Specialist', rate: 225, availability: 'Available' },
];

const mockUsers = [
  { id: 1, name: 'Alice Williams', email: 'alice@ibm.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Bob Martin', email: 'bob@ibm.com', role: 'Architect', status: 'Active' },
  { id: 3, name: 'Carol White', email: 'carol@ibm.com', role: 'Seller', status: 'Active' },
  { id: 4, name: 'David Brown', email: 'david@ibm.com', role: 'Seller', status: 'Inactive' },
];

export function AdminDashboard({ onNavigate, onLogout, userRole }) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState('offerings');

  if (userRole !== 'admin') {
    return (
      <div className="min-h-screen bg-[#f4f4f4]">
        <div className="p-6 text-center">
          <p className="text-[#da1e28]">Access Denied: Admin privileges required</p>
          <Button onClick={() => onNavigate('catalog')} className="mt-4 bg-[#0f62fe] hover:bg-[#0353e9] rounded-none">
            Return to Catalog
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f4f4]">
      {/* <CarbonHeader 
        onNavigate={onNavigate} 
        onLogout={onLogout} 
        userRole={userRole}
        currentPage="admin"
      /> */}

      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>Admin Dashboard</h1>
          <div className="flex gap-2">
            <Button className="bg-white text-[#161616] border border-[#161616] hover:bg-[#e0e0e0] rounded-none">
              <Upload className="w-4 h-4 mr-2" />
              Bulk Import
            </Button>
            <Button className="bg-white text-[#161616] border border-[#161616] hover:bg-[#e0e0e0] rounded-none">
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
          </div>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="bg-white">
          <TabsList className="w-full justify-start border-b border-[#e0e0e0] bg-white rounded-none h-12">
            <TabsTrigger 
              value="offerings" 
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-[#0f62fe] data-[state=active]:bg-transparent"
              style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}
            >
              Offerings
            </TabsTrigger>
            <TabsTrigger 
              value="activities" 
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-[#0f62fe] data-[state=active]:bg-transparent"
              style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}
            >
              Activities
            </TabsTrigger>
            <TabsTrigger 
              value="resources" 
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-[#0f62fe] data-[state=active]:bg-transparent"
              style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}
            >
              Resources
            </TabsTrigger>
            <TabsTrigger 
              value="pricing" 
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-[#0f62fe] data-[state=active]:bg-transparent"
              style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}
            >
              Pricing
            </TabsTrigger>
            <TabsTrigger 
              value="users" 
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-[#0f62fe] data-[state=active]:bg-transparent"
              style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}
            >
              Users
            </TabsTrigger>
          </TabsList>

          {/* Offerings Tab */}
          <TabsContent value="offerings" className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>Manage Offerings</h2>
              <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-[#0f62fe] hover:bg-[#0353e9] text-white rounded-none">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Offering
                  </Button>
                </DialogTrigger>
                <DialogContent className="rounded-none max-w-2xl">
                  <DialogHeader>
                    <DialogTitle style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>Add New Offering</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Offering Name</Label>
                      <Input id="name" className="rounded-none" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="type">Service Type</Label>
                      <Select>
                        <SelectTrigger className="rounded-none">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="consulting">Consulting</SelectItem>
                          <SelectItem value="implementation">Implementation</SelectItem>
                          <SelectItem value="professional-services">Professional Services</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="brand">Brand</Label>
                      <Input id="brand" className="rounded-none" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="ghost" onClick={() => setIsEditDialogOpen(false)} className="rounded-none">
                      Cancel
                    </Button>
                    <Button className="bg-[#0f62fe] hover:bg-[#0353e9] rounded-none">
                      Save
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-[#e0e0e0] hover:bg-[#e0e0e0]">
                    <TableHead className="text-[#161616]">ID</TableHead>
                    <TableHead className="text-[#161616]">Name</TableHead>
                    <TableHead className="text-[#161616]">Type</TableHead>
                    <TableHead className="text-[#161616]">Brand</TableHead>
                    <TableHead className="text-[#161616]">Status</TableHead>
                    <TableHead className="text-[#161616]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockOfferings.map(offering => (
                    <TableRow key={offering.id} className="hover:bg-[#f4f4f4]">
                      <TableCell>{offering.id}</TableCell>
                      <TableCell className="text-[#161616]">{offering.name}</TableCell>
                      <TableCell>{offering.type}</TableCell>
                      <TableCell>{offering.brand}</TableCell>
                      <TableCell>
                        <Badge className={`rounded-none ${
                          offering.status === 'Active' 
                            ? 'bg-[#24a148] text-white' 
                            : 'bg-[#e0e0e0] text-[#161616]'
                        }`}>
                          {offering.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" className="rounded-none">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="rounded-none text-[#da1e28]">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* Activities Tab */}
          <TabsContent value="activities" className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>Manage Activities</h2>
              <Button className="bg-[#0f62fe] hover:bg-[#0353e9] text-white rounded-none">
                <Plus className="w-4 h-4 mr-2" />
                Add Activity
              </Button>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-[#e0e0e0] hover:bg-[#e0e0e0]">
                    <TableHead className="text-[#161616]">ID</TableHead>
                    <TableHead className="text-[#161616]">Name</TableHead>
                    <TableHead className="text-[#161616]">Category</TableHead>
                    <TableHead className="text-[#161616]">Hours</TableHead>
                    <TableHead className="text-[#161616]">Rate ($/hr)</TableHead>
                    <TableHead className="text-[#161616]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockActivities.map(activity => (
                    <TableRow key={activity.id} className="hover:bg-[#f4f4f4]">
                      <TableCell>{activity.id}</TableCell>
                      <TableCell className="text-[#161616]">{activity.name}</TableCell>
                      <TableCell>
                        <Badge className="bg-[#e0e0e0] text-[#161616] rounded-none">
                          {activity.category}
                        </Badge>
                      </TableCell>
                      <TableCell>{activity.hours}</TableCell>
                      <TableCell>${activity.rate}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" className="rounded-none">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="rounded-none text-[#da1e28]">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources" className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>Manage Resources</h2>
              <Button className="bg-[#0f62fe] hover:bg-[#0353e9] text-white rounded-none">
                <Plus className="w-4 h-4 mr-2" />
                Add Resource
              </Button>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-[#e0e0e0] hover:bg-[#e0e0e0]">
                    <TableHead className="text-[#161616]">ID</TableHead>
                    <TableHead className="text-[#161616]">Name</TableHead>
                    <TableHead className="text-[#161616]">Role</TableHead>
                    <TableHead className="text-[#161616]">Rate ($/hr)</TableHead>
                    <TableHead className="text-[#161616]">Availability</TableHead>
                    <TableHead className="text-[#161616]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockResources.map(resource => (
                    <TableRow key={resource.id} className="hover:bg-[#f4f4f4]">
                      <TableCell>{resource.id}</TableCell>
                      <TableCell className="text-[#161616]">{resource.name}</TableCell>
                      <TableCell>{resource.role}</TableCell>
                      <TableCell>${resource.rate}</TableCell>
                      <TableCell>
                        <Badge className={`rounded-none ${
                          resource.availability === 'Available' 
                            ? 'bg-[#24a148] text-white' 
                            : 'bg-[#f1c21b] text-[#161616]'
                        }`}>
                          {resource.availability}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" className="rounded-none">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="rounded-none text-[#da1e28]">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* Pricing Tab */}
          <TabsContent value="pricing" className="p-6">
            <h2 className="mb-4" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
              Pricing Configuration
            </h2>
            <p className="text-[#525252]">Configure default pricing rules and rate cards.</p>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>Manage Users</h2>
              <Button className="bg-[#0f62fe] hover:bg-[#0353e9] text-white rounded-none">
                <Plus className="w-4 h-4 mr-2" />
                Add User
              </Button>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-[#e0e0e0] hover:bg-[#e0e0e0]">
                    <TableHead className="text-[#161616]">ID</TableHead>
                    <TableHead className="text-[#161616]">Name</TableHead>
                    <TableHead className="text-[#161616]">Email</TableHead>
                    <TableHead className="text-[#161616]">Role</TableHead>
                    <TableHead className="text-[#161616]">Status</TableHead>
                    <TableHead className="text-[#161616]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockUsers.map(user => (
                    <TableRow key={user.id} className="hover:bg-[#f4f4f4]">
                      <TableCell>{user.id}</TableCell>
                      <TableCell className="text-[#161616]">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge className="bg-[#0f62fe] text-white rounded-none">
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={`rounded-none ${
                          user.status === 'Active' 
                            ? 'bg-[#24a148] text-white' 
                            : 'bg-[#e0e0e0] text-[#161616]'
                        }`}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" className="rounded-none">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="rounded-none text-[#da1e28]">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
