import { useState } from 'react';
import { Search, Plus, Save, Download, Trash2, DollarSign, Clock, Users, ChevronRight, Edit, X } from 'lucide-react';
import { CarbonHeader } from './CarbonHeader';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Label } from './ui/label';

// Mock data for brands
const brands = [
  { id: 'ibm-cloud', name: 'IBM Cloud' },
  { id: 'ibm-watson', name: 'IBM Watson' },
  { id: 'ibm-security', name: 'IBM Security' },
  { id: 'ibm-consulting', name: 'IBM Consulting' },
  { id: 'ibm-cloud-pak', name: 'IBM Cloud Pak' },
];

// Mock data for products (with brand association)
const products = [
  { id: 'p1', name: 'Cloud Migration Services', brandId: 'ibm-cloud' },
  { id: 'p2', name: 'Cloud Infrastructure', brandId: 'ibm-cloud' },
  { id: 'p3', name: 'Watson AI Platform', brandId: 'ibm-watson' },
  { id: 'p4', name: 'Watson Assistant', brandId: 'ibm-watson' },
  { id: 'p5', name: 'Security QRadar', brandId: 'ibm-security' },
  { id: 'p6', name: 'Identity & Access', brandId: 'ibm-security' },
  { id: 'p7', name: 'Digital Transformation', brandId: 'ibm-consulting' },
  { id: 'p8', name: 'SAP Solutions', brandId: 'ibm-consulting' },
  { id: 'p9', name: 'Data & AI', brandId: 'ibm-cloud-pak' },
];

// Mock data for offerings (with product association)
const offerings = [
  { id: 'o1', name: 'Cloud Migration Accelerator', productId: 'p1', duration: 12, price: 450000 },
  { id: 'o2', name: 'Hybrid Cloud Setup', productId: 'p2', duration: 8, price: 320000 },
  { id: 'o3', name: 'AI Strategy Workshop', productId: 'p3', duration: 4, price: 125000 },
  { id: 'o4', name: 'Chatbot Implementation', productId: 'p4', duration: 6, price: 180000 },
  { id: 'o5', name: 'Security Assessment', productId: 'p5', duration: 6, price: 220000 },
  { id: 'o6', name: 'IAM Implementation', productId: 'p6', duration: 10, price: 380000 },
  { id: 'o7', name: 'Digital Strategy Consulting', productId: 'p7', duration: 8, price: 285000 },
  { id: 'o8', name: 'SAP S/4HANA Migration', productId: 'p8', duration: 24, price: 1200000 },
  { id: 'o9', name: 'Data Platform Modernization', productId: 'p9', duration: 16, price: 680000 },
];

// Activity categories
const activityCategories = [
  'Consulting',
  'Design',
  'Security',
  'Implementation',
  'Quality',
  'Training',
  'Planning',
  'Analysis',
  'Testing',
  'Deployment',
];

// Mock data for activities (with offering association)
const activitiesData = [
  { id: 'a1', name: 'Discovery Workshop', offeringId: 'o1', category: 'Consulting', duration: 1, hours: 40, cost: 8000 },
  { id: 'a2', name: 'Architecture Design', offeringId: 'o1', category: 'Design', duration: 2, hours: 80, cost: 16000 },
  { id: 'a3', name: 'Security Assessment', offeringId: 'o1', category: 'Security', duration: 1, hours: 40, cost: 9000 },
  { id: 'a4', name: 'Cloud Migration', offeringId: 'o1', category: 'Implementation', duration: 4, hours: 160, cost: 28000 },
  { id: 'a5', name: 'Testing & QA', offeringId: 'o1', category: 'Quality', duration: 2, hours: 80, cost: 12000 },
  { id: 'a6', name: 'Training Session', offeringId: 'o1', category: 'Training', duration: 1, hours: 24, cost: 4800 },
  
  { id: 'a7', name: 'Infrastructure Planning', offeringId: 'o2', category: 'Planning', duration: 1, hours: 40, cost: 8000 },
  { id: 'a8', name: 'Network Setup', offeringId: 'o2', category: 'Implementation', duration: 3, hours: 120, cost: 21000 },
  { id: 'a9', name: 'Load Balancing Config', offeringId: 'o2', category: 'Implementation', duration: 1, hours: 40, cost: 7000 },
  
  { id: 'a10', name: 'AI Readiness Assessment', offeringId: 'o3', category: 'Consulting', duration: 1, hours: 32, cost: 6400 },
  { id: 'a11', name: 'Use Case Identification', offeringId: 'o3', category: 'Consulting', duration: 2, hours: 64, cost: 12800 },
  { id: 'a12', name: 'AI Strategy Roadmap', offeringId: 'o3', category: 'Consulting', duration: 1, hours: 40, cost: 8000 },
];

export function SolutionBuilder({ onNavigate, onLogout, userRole }) {
  // Selection state
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedOffering, setSelectedOffering] = useState('');
  
  // Activities state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [allActivities, setAllActivities] = useState(activitiesData);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create' or 'edit'
  const [editingActivity, setEditingActivity] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    duration: '',
    hours: '',
    cost: '',
  });

  // Filtered data based on selections
  const filteredProducts = selectedBrand 
    ? products.filter(p => p.brandId === selectedBrand)
    : [];
  
  const filteredOfferings = selectedProduct
    ? offerings.filter(o => o.productId === selectedProduct)
    : [];
  
  const availableActivities = selectedOffering
    ? allActivities.filter(a => a.offeringId === selectedOffering)
    : [];

  const filteredActivities = availableActivities.filter(activity =>
    activity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    activity.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Reset cascading selections
  const handleBrandChange = (brandId) => {
    setSelectedBrand(brandId);
    setSelectedProduct('');
    setSelectedOffering('');
    setSelectedActivities([]);
  };

  const handleProductChange = (productId) => {
    setSelectedProduct(productId);
    setSelectedOffering('');
    setSelectedActivities([]);
  };

  const handleOfferingChange = (offeringId) => {
    setSelectedOffering(offeringId);
    setSelectedActivities([]);
  };

  const addActivity = (activity) => {
    setSelectedActivities([...selectedActivities, { ...activity, id: `${activity.id}-${Date.now()}` }]);
  };

  const removeActivity = (id) => {
    setSelectedActivities(selectedActivities.filter(a => a.id !== id));
  };

  // Open modal for creating new activity
  const openCreateModal = () => {
    setModalMode('create');
    setFormData({
      name: '',
      category: '',
      duration: '',
      hours: '',
      cost: '',
    });
    setIsModalOpen(true);
  };

  // Open modal for editing activity
  const openEditModal = (activity) => {
    setModalMode('edit');
    setEditingActivity(activity);
    setFormData({
      name: activity.name,
      category: activity.category,
      duration: activity.duration.toString(),
      hours: activity.hours.toString(),
      cost: activity.cost.toString(),
    });
    setIsModalOpen(true);
  };

  // Handle form input changes
  const handleFormChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Save activity (create or update)
  const saveActivity = () => {
    if (!formData.name || !formData.category || !formData.duration || !formData.hours || !formData.cost) {
      alert('Please fill in all fields');
      return;
    }

    const activityData = {
      name: formData.name,
      category: formData.category,
      duration: parseFloat(formData.duration),
      hours: parseFloat(formData.hours),
      cost: parseFloat(formData.cost),
    };

    if (modalMode === 'create') {
      // Create new activity
      const newActivity = {
        ...activityData,
        id: `custom-${Date.now()}`,
        offeringId: selectedOffering,
      };
      
      // Add to all activities
      setAllActivities([...allActivities, newActivity]);
      
      // Add to selected activities
      setSelectedActivities([...selectedActivities, { ...newActivity, id: `${newActivity.id}-${Date.now()}` }]);
    } else {
      // Update existing activity in selected activities
      setSelectedActivities(selectedActivities.map(a => 
        a.id === editingActivity.id 
          ? { ...a, ...activityData }
          : a
      ));
    }

    // Close modal and reset
    setIsModalOpen(false);
    setEditingActivity(null);
  };

  const totals = selectedActivities.reduce(
    (acc, activity) => ({
      weeks: acc.weeks + activity.duration,
      hours: acc.hours + activity.hours,
      cost: acc.cost + activity.cost,
    }),
    { weeks: 0, hours: 0, cost: 0 }
  );

  const salePrice = totals.cost * 1.2;
  const margin = totals.cost > 0 ? ((salePrice - totals.cost) / salePrice) * 100 : 0;

  // Get current selection names for display
  const selectedBrandName = brands.find(b => b.id === selectedBrand)?.name || '';
  const selectedProductName = products.find(p => p.id === selectedProduct)?.name || '';
  const selectedOfferingName = offerings.find(o => o.id === selectedOffering)?.name || '';

  return (
    <div className="min-h-screen bg-[#f4f4f4]">
      {/* <CarbonHeader 
        onNavigate={onNavigate} 
        onLogout={onLogout} 
        userRole={userRole}
        currentPage="solution-builder"
      /> */}

      <div className="flex h-[calc(100vh-3rem)]">
        {/* Left Panel - Selection Wizard */}
        <aside className="w-80 bg-white border-r border-[#e0e0e0] overflow-y-auto">
          <div className="p-4 border-b border-[#e0e0e0] bg-[#f4f4f4]">
            <h2 className="mb-3" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
              Build Solution
            </h2>
            <p className="text-[#525252]">
              Select brand, product, and offering to view activities
            </p>
          </div>

          <div className="p-4 space-y-6">
            {/* Step 1: Brand Selection */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-full bg-[#0f62fe] text-white flex items-center justify-center">
                  1
                </div>
                <h3 className="text-[#161616]" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                  Select Brand
                </h3>
              </div>
              <Select value={selectedBrand} onValueChange={handleBrandChange}>
                <SelectTrigger className="w-full bg-[#f4f4f4] border-b-2 border-[#161616] rounded-none">
                  <SelectValue placeholder="Choose a brand..." />
                </SelectTrigger>
                <SelectContent>
                  {brands.map(brand => (
                    <SelectItem key={brand.id} value={brand.id}>
                      {brand.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Step 2: Product Selection */}
            {selectedBrand && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-full bg-[#0f62fe] text-white flex items-center justify-center">
                    2
                  </div>
                  <h3 className="text-[#161616]" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                    Select Product
                  </h3>
                </div>
                <Select value={selectedProduct} onValueChange={handleProductChange}>
                  <SelectTrigger className="w-full bg-[#f4f4f4] border-b-2 border-[#161616] rounded-none">
                    <SelectValue placeholder="Choose a product..." />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredProducts.map(product => (
                      <SelectItem key={product.id} value={product.id}>
                        {product.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Step 3: Offering Selection */}
            {selectedProduct && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-full bg-[#0f62fe] text-white flex items-center justify-center">
                    3
                  </div>
                  <h3 className="text-[#161616]" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                    Select Offering
                  </h3>
                </div>
                <Select value={selectedOffering} onValueChange={handleOfferingChange}>
                  <SelectTrigger className="w-full bg-[#f4f4f4] border-b-2 border-[#161616] rounded-none">
                    <SelectValue placeholder="Choose an offering..." />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredOfferings.map(offering => (
                      <SelectItem key={offering.id} value={offering.id}>
                        <div className="flex flex-col">
                          <span>{offering.name}</span>
                          <span className="text-[#525252]">
                            {offering.duration}w · ${offering.price.toLocaleString()}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Step 4: Activities */}
            {selectedOffering && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#0f62fe] text-white flex items-center justify-center">
                      4
                    </div>
                    <h3 className="text-[#161616]" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                      Add Activities
                    </h3>
                  </div>
                  <Button
                    size="sm"
                    onClick={openCreateModal}
                    className="bg-[#0f62fe] hover:bg-[#0353e9] text-white rounded-none h-6 px-2"
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    New
                  </Button>
                </div>
                
                <div className="relative mb-3">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#525252]" />
                  <Input
                    type="text"
                    placeholder="Search activities..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-white border-b-2 border-[#161616] rounded-none"
                  />
                </div>

                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {filteredActivities.length > 0 ? (
                    filteredActivities.map(activity => (
                      <Card 
                        key={activity.id} 
                        className="p-3 rounded-none border-l-2 border-l-[#0f62fe] hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => addActivity(activity)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="text-[#161616] mb-1" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                              {activity.name}
                            </h4>
                            <Badge className="bg-[#e0e0e0] text-[#161616] rounded-none mb-2">
                              {activity.category}
                            </Badge>
                            <div className="space-y-1 text-[#525252]">
                              <div className="flex justify-between">
                                <span>Duration:</span>
                                <span>{activity.duration}w</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Hours:</span>
                                <span>{activity.hours}h</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Cost:</span>
                                <span>${activity.cost.toLocaleString()}</span>
                              </div>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            className="ml-2 bg-[#0f62fe] hover:bg-[#0353e9] text-white rounded-none p-2 h-8"
                            onClick={(e) => {
                              e.stopPropagation();
                              addActivity(activity);
                            }}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      </Card>
                    ))
                  ) : (
                    <p className="text-[#525252] text-center py-4">
                      No activities found
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Selection Summary */}
            {/* {selectedBrand && (
              <div className="pt-4 border-t border-[#e0e0e0]">
                <h3 className="mb-3 text-[#161616]" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                  Current Selection
                </h3>
                <div className="space-y-2 text-[#525252]">
                  <div className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-[#0f62fe]" />
                    <span>{selectedBrandName}</span>
                  </div>
                  {selectedProduct && (
                    <div className="flex items-center gap-2 ml-4">
                      <ChevronRight className="w-4 h-4 text-[#0f62fe]" />
                      <span>{selectedProductName}</span>
                    </div>
                  )}
                  {selectedOffering && (
                    <div className="flex items-center gap-2 ml-8">
                      <ChevronRight className="w-4 h-4 text-[#0f62fe]" />
                      <span>{selectedOfferingName}</span>
                    </div>
                  )}
                </div>
              </div>
            )} */}
          </div>
        </aside>

        {/* Center Panel - Solution Canvas */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>Solution Canvas</h1>
              <div className="flex gap-2">
                <Button className="bg-white text-[#161616] border border-[#161616] hover:bg-[#e0e0e0] rounded-none">
                  <Save className="w-4 h-4 mr-2" />
                  Save Solution
                </Button>
                <Button className="bg-[#0f62fe] hover:bg-[#0353e9] text-white rounded-none">
                  <Download className="w-4 h-4 mr-2" />
                  Export to CSV
                </Button>
              </div>
            </div>

            {!selectedBrand ? (
              <Card className="p-12 rounded-none text-center bg-white">
                <div className="text-[#525252] mb-4">
                  <div className="w-24 h-24 bg-[#e0e0e0] rounded-full mx-auto mb-3 flex items-center justify-center">
                    <span className="text-[#0f62fe]">1</span>
                  </div>
                  <p className="mb-2">Get started by selecting a brand</p>
                  <p>Choose from IBM Cloud, Watson, Security, and more</p>
                </div>
              </Card>
            ) : selectedActivities.length === 0 ? (
              <Card className="p-12 rounded-none text-center bg-white">
                <div className="text-[#525252] mb-4">
                  <Plus className="w-12 h-12 mx-auto mb-3 text-[#0f62fe]" />
                  <p className="mb-2">No activities added yet</p>
                  <p>Complete the selection steps and add activities to build your solution</p>
                  {!selectedOffering && (
                    <p className="mt-4 text-[#0f62fe]">
                      {!selectedProduct ? '→ Select a product to continue' : '→ Select an offering to view activities'}
                    </p>
                  )}
                </div>
              </Card>
            ) : (
              <div className="bg-white">
                <div className="p-4 border-b border-[#e0e0e0]">
                  <h2 style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                    Solution Timeline ({totals.weeks} weeks)
                  </h2>
                  <div className="flex items-center gap-2 mt-2 text-[#525252]">
                    <span>{selectedBrandName}</span>
                    <ChevronRight className="w-4 h-4" />
                    <span>{selectedProductName}</span>
                    <ChevronRight className="w-4 h-4" />
                    <span>{selectedOfferingName}</span>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-[#e0e0e0] hover:bg-[#e0e0e0]">
                        <TableHead className="text-[#161616]">Activity</TableHead>
                        <TableHead className="text-[#161616]">Category</TableHead>
                        <TableHead className="text-[#161616]">Duration</TableHead>
                        <TableHead className="text-[#161616]">Hours</TableHead>
                        <TableHead className="text-[#161616]">Cost</TableHead>
                        <TableHead className="text-[#161616]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedActivities.map((activity) => (
                        <TableRow key={activity.id} className="hover:bg-[#f4f4f4]">
                          <TableCell className="text-[#161616]">{activity.name}</TableCell>
                          <TableCell>
                            <Badge className="bg-[#e0e0e0] text-[#161616] rounded-none">
                              {activity.category}
                            </Badge>
                          </TableCell>
                          <TableCell>{activity.duration} weeks</TableCell>
                          <TableCell>{activity.hours}h</TableCell>
                          <TableCell>${activity.cost.toLocaleString()}</TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => openEditModal(activity)}
                                className="text-[#0f62fe] hover:bg-[#e0f0ff] rounded-none"
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeActivity(activity.id)}
                                className="text-[#da1e28] hover:bg-[#fff1f1] rounded-none"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Timeline Visualization */}
                <div className="p-4 border-t border-[#e0e0e0]">
                  <h3 className="mb-3" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                    Week-by-Week Timeline
                  </h3>
                  <div className="flex gap-1 overflow-x-auto">
                    {selectedActivities.map((activity) => (
                      <div
                        key={activity.id}
                        className="min-w-[120px] bg-[#0f62fe] text-white p-2 text-center"
                        style={{ width: `${activity.duration * 60}px` }}
                      >
                        <div className="truncate">{activity.name}</div>
                        <div>{activity.duration}w</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>

        {/* Right Panel - Summary */}
        <aside className="w-80 bg-white border-l border-[#e0e0e0] overflow-y-auto">
          <div className="p-4 border-b border-[#e0e0e0] bg-[#f4f4f4]">
            <h2 style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>Summary</h2>
          </div>

          <div className="p-4 space-y-4">
            {/* Totals Cards */}
            <Card className="p-4 rounded-none border-l-4 border-l-[#0f62fe]">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="w-6 h-6 text-[#0f62fe]" />
                <div>
                  <div className="text-[#525252]">Total Duration</div>
                  <div className="text-[#161616]">{totals.weeks} weeks</div>
                </div>
              </div>
            </Card>

            <Card className="p-4 rounded-none border-l-4 border-l-[#8a3ffc]">
              <div className="flex items-center gap-3 mb-2">
                <Users className="w-6 h-6 text-[#8a3ffc]" />
                <div>
                  <div className="text-[#525252]">Total Hours</div>
                  <div className="text-[#161616]">{totals.hours.toLocaleString()}h</div>
                </div>
              </div>
            </Card>

            <Card className="p-4 rounded-none border-l-4 border-l-[#24a148]">
              <div className="flex items-center gap-3 mb-2">
                <DollarSign className="w-6 h-6 text-[#24a148]" />
                <div>
                  <div className="text-[#525252]">Total Cost</div>
                  <div className="text-[#161616]">${totals.cost.toLocaleString()}</div>
                </div>
              </div>
            </Card>

            {/* Pricing Summary
            {totals.cost > 0 && (
              <div className="pt-4 border-t border-[#e0e0e0]">
                <h3 className="mb-3" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                  Pricing
                </h3>
                <div className="space-y-2 text-[#525252]">
                  <div className="flex justify-between">
                    <span>Base Cost:</span>
                    <span className="text-[#161616]">${totals.cost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sale Price (20%):</span>
                    <span className="text-[#161616]">${Math.round(salePrice).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-[#e0e0e0]">
                    <span>Margin:</span>
                    <span className="text-[#24a148]">{margin.toFixed(1)}%</span>
                  </div>
                </div>
              </div>
            )} */}

            {/* Activities Count */}
            <div className="pt-4 border-t border-[#e0e0e0]">
              <h3 className="mb-3" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                Activities
              </h3>
              <div className="text-[#525252]">
                {selectedActivities.length} activities selected
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Create/Edit Activity Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[500px] rounded-none border-t-4 border-t-[#0f62fe]">
          <DialogHeader>
            <DialogTitle style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
              {modalMode === 'create' ? 'Create New Activity' : 'Edit Activity'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-[#161616]">
                Activity Name *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleFormChange('name', e.target.value)}
                placeholder="Enter activity name"
                className="rounded-none border-b-2 border-[#161616]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className="text-[#161616]">
                Category *
              </Label>
              <Select value={formData.category} onValueChange={(value) => handleFormChange('category', value)}>
                <SelectTrigger className="rounded-none border-b-2 border-[#161616]">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {activityCategories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration" className="text-[#161616]">
                  Duration (weeks) *
                </Label>
                <Input
                  id="duration"
                  type="number"
                  min="0"
                  step="0.5"
                  value={formData.duration}
                  onChange={(e) => handleFormChange('duration', e.target.value)}
                  placeholder="0"
                  className="rounded-none border-b-2 border-[#161616]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hours" className="text-[#161616]">
                  Hours *
                </Label>
                <Input
                  id="hours"
                  type="number"
                  min="0"
                  value={formData.hours}
                  onChange={(e) => handleFormChange('hours', e.target.value)}
                  placeholder="0"
                  className="rounded-none border-b-2 border-[#161616]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cost" className="text-[#161616]">
                Cost ($) *
              </Label>
              <Input
                id="cost"
                type="number"
                min="0"
                value={formData.cost}
                onChange={(e) => handleFormChange('cost', e.target.value)}
                placeholder="0"
                className="rounded-none border-b-2 border-[#161616]"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsModalOpen(false)}
              className="rounded-none border-[#161616]"
            >
              Cancel
            </Button>
            <Button
              onClick={saveActivity}
              className="bg-[#0f62fe] hover:bg-[#0353e9] text-white rounded-none"
            >
              {modalMode === 'create' ? 'Create Activity' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}