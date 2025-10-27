import { Search, Edit, Shield, Mail, Building, Calendar } from 'lucide-react';
// import { CarbonHeader } from './CarbonHeader';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

const mockUsers = [
  { id: 1, name: 'Alice Williams', email: 'alice@ibm.com', role: 'Admin', department: 'IT Services', status: 'Active', lastLogin: '2025-10-22' },
  { id: 2, name: 'Bob Martin', email: 'bob@ibm.com', role: 'Architect', department: 'Cloud Solutions', status: 'Active', lastLogin: '2025-10-21' },
  { id: 3, name: 'Carol White', email: 'carol@ibm.com', role: 'Seller', department: 'Sales', status: 'Active', lastLogin: '2025-10-20' },
  { id: 4, name: 'David Brown', email: 'david@ibm.com', role: 'Seller', department: 'Sales', status: 'Inactive', lastLogin: '2025-10-15' },
];

export function UserProfile({ onNavigate, onLogout, userRole }) {
  const currentUser = {
    name: userRole === 'admin' ? 'Alice Williams' : userRole === 'architect' ? 'Bob Martin' : 'Carol White',
    email: `${userRole}@ibm.com`,
    role: userRole,
    department: userRole === 'admin' ? 'IT Services' : userRole === 'architect' ? 'Cloud Solutions' : 'Sales',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    joinDate: 'January 15, 2022',
  };

  return (
    <div className="min-h-screen bg-[#f4f4f4]">
      {/* <CarbonHeader 
        onNavigate={onNavigate} 
        onLogout={onLogout} 
        userRole={userRole}
      /> */}

      <div className="p-6">
        <Tabs defaultValue="profile" className="bg-white">
          <TabsList className="w-full justify-start border-b border-[#e0e0e0] bg-white rounded-none h-12">
            <TabsTrigger 
              value="profile" 
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-[#0f62fe] data-[state=active]:bg-transparent"
              style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}
            >
              My Profile
            </TabsTrigger>
            {userRole === 'admin' && (
              <TabsTrigger 
                value="management" 
                className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-[#0f62fe] data-[state=active]:bg-transparent"
                style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}
              >
                User Management
              </TabsTrigger>
            )}
          </TabsList>

          {/* My Profile Tab */}
          <TabsContent value="profile" className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Profile Card */}
              <Card className="lg:col-span-1 p-6 rounded-none border-l-4 border-l-[#0f62fe]">
                <div className="text-center mb-6">
                  <div className="w-24 h-24 bg-[#0f62fe] rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                      {currentUser.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h2 className="mb-1" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                    {currentUser.name}
                  </h2>
                  <p className="text-[#525252] mb-3">{currentUser.email}</p>
                  <Badge className="bg-[#0f62fe] text-white rounded-none">
                    {currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)}
                  </Badge>
                </div>

                <div className="space-y-3 text-[#525252]">
                  <div className="flex items-center gap-3">
                    <Building className="w-4 h-4 text-[#0f62fe]" />
                    <span>{currentUser.department}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-[#0f62fe]" />
                    <span>{currentUser.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-[#0f62fe]" />
                    <span>Joined {currentUser.joinDate}</span>
                  </div>
                </div>

                <Button className="w-full mt-6 bg-white text-[#161616] border border-[#161616] hover:bg-[#e0e0e0] rounded-none">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </Card>

              {/* Profile Details */}
              <Card className="lg:col-span-2 p-6 rounded-none">
                <h2 className="mb-6" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                  Profile Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="fullname" className="text-[#161616]">Full Name</Label>
                    <Input 
                      id="fullname" 
                      value={currentUser.name} 
                      className="mt-2 rounded-none bg-[#f4f4f4]"
                      readOnly
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-[#161616]">Email Address</Label>
                    <Input 
                      id="email" 
                      value={currentUser.email} 
                      className="mt-2 rounded-none bg-[#f4f4f4]"
                      readOnly
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-[#161616]">Phone Number</Label>
                    <Input 
                      id="phone" 
                      value={currentUser.phone} 
                      className="mt-2 rounded-none bg-[#f4f4f4]"
                      readOnly
                    />
                  </div>

                  <div>
                    <Label htmlFor="department" className="text-[#161616]">Department</Label>
                    <Input 
                      id="department" 
                      value={currentUser.department} 
                      className="mt-2 rounded-none bg-[#f4f4f4]"
                      readOnly
                    />
                  </div>

                  <div>
                    <Label htmlFor="location" className="text-[#161616]">Location</Label>
                    <Input 
                      id="location" 
                      value={currentUser.location} 
                      className="mt-2 rounded-none bg-[#f4f4f4]"
                      readOnly
                    />
                  </div>

                  <div>
                    <Label htmlFor="role" className="text-[#161616]">Role</Label>
                    <Input 
                      id="role" 
                      value={currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)} 
                      className="mt-2 rounded-none bg-[#f4f4f4]"
                      readOnly
                    />
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-[#e0e0e0]">
                  <h3 className="mb-4" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                    Permissions & Access
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[#525252]">
                      <Shield className="w-4 h-4 text-[#24a148]" />
                      <span>Access to Offerings Catalog</span>
                    </div>
                    {(userRole === 'architect' || userRole === 'admin') && (
                      <div className="flex items-center gap-2 text-[#525252]">
                        <Shield className="w-4 h-4 text-[#24a148]" />
                        <span>Access to Solution Builder</span>
                      </div>
                    )}
                    {userRole === 'admin' && (
                      <>
                        <div className="flex items-center gap-2 text-[#525252]">
                          <Shield className="w-4 h-4 text-[#24a148]" />
                          <span>Admin Dashboard Access</span>
                        </div>
                        <div className="flex items-center gap-2 text-[#525252]">
                          <Shield className="w-4 h-4 text-[#24a148]" />
                          <span>User Management</span>
                        </div>
                        <div className="flex items-center gap-2 text-[#525252]">
                          <Shield className="w-4 h-4 text-[#24a148]" />
                          <span>Data Import/Export</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* User Management Tab (Admin Only) */}
          {userRole === 'admin' && (
            <TabsContent value="management" className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                  User Management
                </h2>
                <div className="flex gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#525252]" />
                    <Input
                      type="text"
                      placeholder="Search users..."
                      className="pl-10 w-64 bg-[#f4f4f4] border-b-2 border-[#161616] rounded-none"
                    />
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-40 bg-[#f4f4f4] border-b-2 border-[#161616] rounded-none">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="architect">Architect</SelectItem>
                      <SelectItem value="seller">Seller</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-[#e0e0e0] hover:bg-[#e0e0e0]">
                      <TableHead className="text-[#161616]">Name</TableHead>
                      <TableHead className="text-[#161616]">Email</TableHead>
                      <TableHead className="text-[#161616]">Role</TableHead>
                      <TableHead className="text-[#161616]">Department</TableHead>
                      <TableHead className="text-[#161616]">Status</TableHead>
                      <TableHead className="text-[#161616]">Last Login</TableHead>
                      <TableHead className="text-[#161616]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockUsers.map((user) => (
                      <TableRow key={user.id} className="hover:bg-[#f4f4f4]">
                        <TableCell className="text-[#161616]">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge className="bg-[#0f62fe] text-white rounded-none">
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>{user.department}</TableCell>
                        <TableCell>
                          <Badge className={`rounded-none ${
                            user.status === 'Active' 
                              ? 'bg-[#24a148] text-white' 
                              : 'bg-[#e0e0e0] text-[#161616]'
                          }`}>
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{user.lastLogin}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm" className="rounded-none">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
}
