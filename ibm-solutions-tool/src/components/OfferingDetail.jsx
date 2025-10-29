import { useState } from 'react';
import { ArrowLeft, DollarSign, Clock, Users, Package, FileText } from 'lucide-react';
// import { CarbonHeader } from './CarbonHeader';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog.jsx";
import { Checkbox } from './ui/checkbox';

export function OfferingDetail({ onNavigate, onLogout, userRole }) {
  // State for ELA Dealmaker selections
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [selectedOfferings, setSelectedOfferings] = useState([]);

  // Check if user should see simplified view
  const isBrandSalesRep = userRole === 'brand-sales-and-renewal-rep';
  const isELADealmaker = userRole === 'deal-maker';
  //const isSimplifiedView = isBrandSalesRep || isELADealmaker;

  // Simplified offerings data for Brand Sales-Renewal Rep and ELA Dealmaker
  const simplifiedOfferings = [
    {
      id: 1,
      productName: 'IBM Watson Discovery',
      offeringName: 'Document Conversion',
      outcome: '',
      description: '',
      price: 30000,
      parts: ''
    },
    {
      id: 2,
      productName: 'IBM Watson Discovery',
      offeringName: 'Document Key-Value Extraction',
      outcome: '',
      description: '',
      price: 70000,
      parts: ''
    },
    {
      id: 3,
      productName: 'IBM Watson Discovery',
      offeringName: 'Data Classification',
      outcome: '',
      description: '',
      price: 110000,
      parts: ''
    }
  ];

  const offering = {
    title: 'Cloud Migration Accelerator',
    saasType: 'Professional Services',
    brand: 'IBM Cloud',
    duration: '12 weeks',
    totalPrice: '$450,000',
    salePrice: '$405,000',
    margin: '18%',
    industry: 'Financial Services',
    stage: 'Migration',
  };

  // Handle checkbox toggle for ELA Dealmaker
  const handleOfferingToggle = (offeringId) => {
    setSelectedOfferings(prev => {
      if (prev.includes(offeringId)) {
        return prev.filter(id => id !== offeringId);
      } else {
        return [...prev, offeringId];
      }
    });
  };

  // Calculate total for selected offerings
  const calculateSelectedTotal = () => {
    return simplifiedOfferings
      .filter(offering => selectedOfferings.includes(offering.id))
      .reduce((sum, offering) => sum + offering.price, 0);
  };

  // ELA Dealmaker View with checkboxes
  if (isELADealmaker) {
    const totalSimplifiedPrice = simplifiedOfferings.reduce((sum, item) => sum + item.price, 0);
    const selectedTotal = calculateSelectedTotal();
    return (
      <div className="min-h-screen bg-[#f4f4f4]">
        {/* <CarbonHeader 
          onNavigate={onNavigate} 
          onLogout={onLogout} 
          userRole={userRole}
        /> */}

        <div className="p-6">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => onNavigate('catalog')}
            className="mb-4 text-[#0f62fe] hover:bg-[#e0e0e0] rounded-none"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Catalog
          </Button>

          {/* Header */}
          <div className="bg-white p-6 mb-6 border-l-4 border-l-[#0f62fe]">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div className="flex-1">
                <h1 className="text-2xl font-semibold mb-2" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                  {offering.title}
                </h1>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge className="bg-[#0f62fe] text-white rounded-none">{offering.saasType}</Badge>
                  <Badge className="bg-[#e0e0e0] text-[#161616] rounded-none">{offering.brand}</Badge>
                  <Badge className="bg-[#e0e0e0] text-[#161616] rounded-none">{offering.industry}</Badge>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Card className="bg-[#f4f4f4] p-4 rounded-none border-l-2 border-l-[#0f62fe]">
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-8 h-8 text-[#0f62fe]" />
                    <div>
                      <div className="text-[#525252] text-sm">Total Price</div>
                      <div className="text-[#161616] text-lg font-semibold">${totalSimplifiedPrice.toLocaleString()}</div>
                    </div>
                  </div>
                </Card>

                {selectedOfferings.length > 0 && (
                  <Card className="bg-[#f4f4f4] p-4 rounded-none border-l-2 border-l-[#24a148]">
                    <div className="flex items-center gap-3">
                      <DollarSign className="w-8 h-8 text-[#24a148]" />
                      <div>
                        <div className="text-[#525252] text-sm">Selected Total</div>
                        <div className="text-[#161616] text-lg font-semibold">${selectedTotal.toLocaleString()}</div>
                      </div>
                    </div>
                  </Card>
                )}
              </div>
            </div>
          </div>

          {/* Tabs for Summary and Dashboard */}
          <Tabs defaultValue="summary" className="bg-white">
            <div className="border-b border-[#e0e0e0] bg-white">
              <TabsList className="w-full justify-start bg-white rounded-none h-12">
                <TabsTrigger 
                  value="summary" 
                  className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-[#0f62fe] data-[state=active]:bg-transparent"
                  style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}
                >
                  Summary
                </TabsTrigger>
                <TabsTrigger 
                  value="dashboard" 
                  className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-[#0f62fe] data-[state=active]:bg-transparent"
                  style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}
                >
                  Dashboard
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Summary Tab */}
            <TabsContent value="summary" className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Package className="w-6 h-6 text-[#0f62fe]" />
                  <h2 className="text-xl font-semibold" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                    Offering Summary
                  </h2>
                </div>
                {selectedOfferings.length > 0 && (
                  <Badge className="bg-[#0f62fe] text-white rounded-none px-3 py-1">
                    {selectedOfferings.length} selected
                  </Badge>
                )}
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-[#e0e0e0] hover:bg-[#e0e0e0]">
                      <TableHead className="text-[#161616] font-semibold w-12">Select</TableHead>
                      <TableHead className="text-[#161616] font-semibold">Product Name</TableHead>
                      <TableHead className="text-[#161616] font-semibold">Offering Name</TableHead>
                      <TableHead className="text-[#161616] font-semibold">Outcome</TableHead>
                      <TableHead className="text-[#161616] font-semibold">Description</TableHead>
                      <TableHead className="text-[#161616] font-semibold">Price</TableHead>
                      <TableHead className="text-[#161616] font-semibold">Parts</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {simplifiedOfferings.map((item) => (
                      <TableRow 
                        key={item.id} 
                        className={`hover:bg-[#f4f4f4] ${selectedOfferings.includes(item.id) ? 'bg-[#e8f4fd]' : ''}`}
                      >
                        <TableCell>
                          <Checkbox
                            checked={selectedOfferings.includes(item.id)}
                            onCheckedChange={() => handleOfferingToggle(item.id)}
                            className="border-[#0f62fe] data-[state=checked]:bg-[#0f62fe]"
                          />
                        </TableCell>
                        <TableCell className="text-[#161616] font-medium">{item.productName}</TableCell>
                        <TableCell className="text-[#161616] font-medium">{item.offeringName}</TableCell>
                        <TableCell className="text-[#525252] italic">
                          {item.outcome || '-'}
                        </TableCell>
                        <TableCell className="text-[#525252] italic">
                          {item.description || '-'}
                        </TableCell>
                        <TableCell className="text-[#161616] font-semibold">
                          ${item.price.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-[#525252] italic">
                          {item.parts || '-'}
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="bg-[#e0e0e0] hover:bg-[#e0e0e0] font-semibold">
                      <TableCell></TableCell>
                      <TableCell className="text-[#161616]" colSpan={4}>Total (All Offerings)</TableCell>
                      <TableCell className="text-[#161616]">${totalSimplifiedPrice.toLocaleString()}</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                    {selectedOfferings.length > 0 && (
                      <TableRow className="bg-[#e8f4fd] hover:bg-[#e8f4fd] font-semibold border-t-2 border-t-[#0f62fe]">
                        <TableCell></TableCell>
                        <TableCell className="text-[#0f62fe]" colSpan={4}>
                          Selected Total ({selectedOfferings.length} {selectedOfferings.length === 1 ? 'item' : 'items'})
                        </TableCell>
                        <TableCell className="text-[#0f62fe]">${selectedTotal.toLocaleString()}</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {/* Dashboard Tab */}
            <TabsContent value="dashboard" className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <DollarSign className="w-6 h-6 text-[#24a148]" />
                <h2 className="text-xl font-semibold" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                  Pricing & Staffing Dashboard
                </h2>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card className="p-4 rounded-none border-l-4 border-l-[#0f62fe]">
                  <div className="text-[#525252] text-sm mb-1">Total Items</div>
                  <div className="text-[#161616] text-2xl font-semibold">
                    {simplifiedOfferings.length}
                  </div>
                </Card>
                <Card className="p-4 rounded-none border-l-4 border-l-[#24a148]">
                  <div className="text-[#525252] text-sm mb-1">Total Price</div>
                  <div className="text-[#161616] text-2xl font-semibold">
                    ${totalSimplifiedPrice.toLocaleString()}
                  </div>
                </Card>
                <Card className="p-4 rounded-none border-l-4 border-l-[#8a3ffc]">
                  <div className="text-[#525252] text-sm mb-1">Average Price</div>
                  <div className="text-[#161616] text-2xl font-semibold">
                    ${Math.round(totalSimplifiedPrice / simplifiedOfferings.length).toLocaleString()}
                  </div>
                </Card>
              </div>

              {/* Selected Offerings Summary */}
              {selectedOfferings.length > 0 && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <Card className="p-4 rounded-none border-l-4 border-l-[#0f62fe]">
                      <div className="text-[#525252] text-sm mb-1">Selected Items</div>
                      <div className="text-[#161616] text-2xl font-semibold">
                        {selectedOfferings.length}
                      </div>
                    </Card>
                    <Card className="p-4 rounded-none border-l-4 border-l-[#24a148]">
                      <div className="text-[#525252] text-sm mb-1">Selected Total</div>
                      <div className="text-[#161616] text-2xl font-semibold">
                        ${selectedTotal.toLocaleString()}
                      </div>
                    </Card>
                    <Card className="p-4 rounded-none border-l-4 border-l-[#8a3ffc]">
                      <div className="text-[#525252] text-sm mb-1">Average per Item</div>
                      <div className="text-[#161616] text-2xl font-semibold">
                        ${Math.round(selectedTotal / selectedOfferings.length).toLocaleString()}
                      </div>
                    </Card>
                  </div>

                  {/* Selected Offerings Detail */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-4" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                      Selected Offerings
                    </h3>
                    <div className="space-y-3">
                      {simplifiedOfferings
                        .filter(item => selectedOfferings.includes(item.id))
                        .map((item) => (
                          <Card key={item.id} className="p-4 rounded-none border-l-4 border-l-[#0f62fe]">
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <div className="text-[#161616] font-semibold mb-1">{item.offeringName}</div>
                                <div className="text-[#525252] text-sm">{item.productName}</div>
                              </div>
                              <div className="text-right">
                                <div className="text-[#161616] font-semibold text-lg">
                                  ${item.price.toLocaleString()}
                                </div>
                              </div>
                            </div>
                          </Card>
                        ))}
                    </div>
                  </div>
                </>
              )}

              {/* Pricing Breakdown */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                  Pricing Breakdown
                </h3>
                <div className="space-y-3">
                  {simplifiedOfferings.map((item) => (
                    <Card key={item.id} className="p-4 rounded-none hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="text-[#161616] font-semibold mb-1">{item.offeringName}</div>
                          <div className="text-[#525252] text-sm">{item.productName}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-[#161616] font-semibold text-lg">
                            ${item.price.toLocaleString()}
                          </div>
                          <div className="text-[#525252] text-sm">
                            {((item.price / totalSimplifiedPrice) * 100).toFixed(1)}% of total
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    );
  }

  // Brand Sales-Renewal Rep View (no checkboxes)
  if (isBrandSalesRep) {
    const totalSimplifiedPrice = simplifiedOfferings.reduce((sum, item) => sum + item.price, 0);
    return (
      <div className="min-h-screen bg-[#f4f4f4]">
        {/* <CarbonHeader 
          onNavigate={onNavigate} 
          onLogout={onLogout} 
          userRole={userRole}
        /> */}

        <div className="p-6">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => onNavigate('catalog')}
            className="mb-4 text-[#0f62fe] hover:bg-[#e0e0e0] rounded-none"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Catalog
          </Button>

          {/* Header */}
          <div className="bg-white p-6 mb-6 border-l-4 border-l-[#0f62fe]">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div className="flex-1">
                <h1 className="text-2xl font-semibold mb-2" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                  {offering.title}
                </h1>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge className="bg-[#0f62fe] text-white rounded-none">{offering.saasType}</Badge>
                  <Badge className="bg-[#e0e0e0] text-[#161616] rounded-none">{offering.brand}</Badge>
                  <Badge className="bg-[#e0e0e0] text-[#161616] rounded-none">{offering.industry}</Badge>
                </div>
              </div>

              <Card className="bg-[#f4f4f4] p-4 rounded-none border-l-2 border-l-[#24a148]">
                <div className="flex items-center gap-3">
                  <DollarSign className="w-8 h-8 text-[#24a148]" />
                  <div>
                    <div className="text-[#525252] text-sm">Total Price</div>
                    <div className="text-[#161616] text-lg font-semibold">${totalSimplifiedPrice.toLocaleString()}</div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Tabs for Summary and Dashboard */}
          <Tabs defaultValue="summary" className="bg-white">
            <div className="border-b border-[#e0e0e0] bg-white">
              <TabsList className="w-full justify-start bg-white rounded-none h-12">
                <TabsTrigger 
                  value="summary" 
                  className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-[#0f62fe] data-[state=active]:bg-transparent"
                  style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}
                >
                  Summary
                </TabsTrigger>
                <TabsTrigger 
                  value="dashboard" 
                  className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-[#0f62fe] data-[state=active]:bg-transparent"
                  style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}
                >
                  Dashboard
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Summary Tab */}
            <TabsContent value="summary" className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <Package className="w-6 h-6 text-[#0f62fe]" />
                <h2 className="text-xl font-semibold" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                  Offering Summary
                </h2>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-[#e0e0e0] hover:bg-[#e0e0e0]">
                      <TableHead className="text-[#161616] font-semibold">Product Name</TableHead>
                      <TableHead className="text-[#161616] font-semibold">Offering Name</TableHead>
                      <TableHead className="text-[#161616] font-semibold">Outcome</TableHead>
                      <TableHead className="text-[#161616] font-semibold">Description</TableHead>
                      <TableHead className="text-[#161616] font-semibold">Price</TableHead>
                      <TableHead className="text-[#161616] font-semibold">Parts</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {simplifiedOfferings.map((item, index) => (
                      <TableRow key={index} className="hover:bg-[#f4f4f4]">
                        <TableCell className="text-[#161616] font-medium">{item.productName}</TableCell>
                        <TableCell className="text-[#161616] font-medium">{item.offeringName}</TableCell>
                        <TableCell className="text-[#525252] italic">
                          {item.outcome || '-'}
                        </TableCell>
                        <TableCell className="text-[#525252] italic">
                          {item.description || '-'}
                        </TableCell>
                        <TableCell className="text-[#161616] font-semibold">
                          ${item.price.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-[#525252] italic">
                          {item.parts || '-'}
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="bg-[#e0e0e0] hover:bg-[#e0e0e0] font-semibold">
                      <TableCell className="text-[#161616]" colSpan={4}>Total</TableCell>
                      <TableCell className="text-[#161616]">${totalSimplifiedPrice.toLocaleString()}</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {/* Dashboard Tab */}
            <TabsContent value="dashboard" className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <DollarSign className="w-6 h-6 text-[#24a148]" />
                <h2 className="text-xl font-semibold" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                  Pricing Dashboard
                </h2>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card className="p-4 rounded-none border-l-4 border-l-[#0f62fe]">
                  <div className="text-[#525252] text-sm mb-1">Total Items</div>
                  <div className="text-[#161616] text-2xl font-semibold">
                    {simplifiedOfferings.length}
                  </div>
                </Card>
                <Card className="p-4 rounded-none border-l-4 border-l-[#24a148]">
                  <div className="text-[#525252] text-sm mb-1">Total Price</div>
                  <div className="text-[#161616] text-2xl font-semibold">
                    ${totalSimplifiedPrice.toLocaleString()}
                  </div>
                </Card>
                <Card className="p-4 rounded-none border-l-4 border-l-[#8a3ffc]">
                  <div className="text-[#525252] text-sm mb-1">Average Price</div>
                  <div className="text-[#161616] text-2xl font-semibold">
                    ${Math.round(totalSimplifiedPrice / simplifiedOfferings.length).toLocaleString()}
                  </div>
                </Card>
              </div>

              {/* Pricing Breakdown */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                  Pricing Breakdown
                </h3>
                <div className="space-y-3">
                  {simplifiedOfferings.map((item) => (
                    <Card key={item.id} className="p-4 rounded-none hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="text-[#161616] font-semibold mb-1">{item.offeringName}</div>
                          <div className="text-[#525252] text-sm">{item.productName}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-[#161616] font-semibold text-lg">
                            ${item.price.toLocaleString()}
                          </div>
                          <div className="text-[#525252] text-sm">
                            {((item.price / totalSimplifiedPrice) * 100).toFixed(1)}% of total
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    );
  }

  // Original detailed view for Seller and Architect
  const activities = [
  {
    activityNumber: 1,
    activityId: 'Orchestrate-1',
    activityBlock: 'PLAN',
    activityName: 'Project Kickoff & Design - 1 week',
    outcome: 'Project initiation and planning completed successfully.',
    effort: 40,
    staffing: 'Consultant-B9',
    parts: 'D06ZVZX x 1',
    price: 19000,
    scope: 'Conduct project kickoff meetings, align on objectives, and finalize high-level design.',
    responsibilities: 'Facilitate workshops, capture requirements, define deliverables, and finalize plan.',
    assumptions: 'All stakeholders will be available for kickoff and design sessions.',
    seismicLink: 'https://seismic.example.com/project-kickoff'
  },
  {
    activityNumber: 2,
    activityId: 'Orchestrate-2',
    activityBlock: 'IMPLEMENT',
    activityName: 'AI Agent - 15 fixed actions',
    outcome: 'Configured AI Agent with predefined 15 fixed actions.',
    effort: 40,
    staffing: 'Consultant-B8',
    parts: 'D06ZWZX x 1',
    price: 17200,
    scope: 'Develop AI agent actions for automation workflows.',
    responsibilities: 'Configure, test, and deploy 15 fixed actions as per scope.',
    assumptions: 'Access to necessary systems and APIs is available.',
    seismicLink: 'https://seismic.example.com/ai-agent-actions'
  },
  {
    activityNumber: 3,
    activityId: 'Orchestrate-3',
    activityBlock: 'IMPLEMENT',
    activityName: 'AI Agent - Service Desk',
    outcome: 'AI Agent integrated with Service Desk for ticket automation.',
    effort: 40,
    staffing: 'Consultant-B8',
    parts: 'D06ZWZX x 1',
    price: 17200,
    scope: 'Integrate AI Agent with the existing service desk system.',
    responsibilities: 'Design and implement service desk automation using AI agent.',
    assumptions: 'Service desk API documentation is available and stable.',
    seismicLink: 'https://seismic.example.com/ai-agent-servicedesk'
  },
  {
    activityNumber: 4,
    activityId: 'Orchestrate-4',
    activityBlock: 'IMPLEMENT',
    activityName: 'AI Agent - Small Vector DB',
    outcome: 'Deployed and tested vector database integration.',
    effort: 40,
    staffing: 'Consultant-B8',
    parts: 'D06ZWZX x 1',
    price: 17200,
    scope: 'Integrate vector database for semantic search capability.',
    responsibilities: 'Setup and configure vector DB, test connectivity and performance.',
    assumptions: 'Cloud resources and permissions are provisioned.',
    seismicLink: 'https://seismic.example.com/vector-db'
  },
  {
    activityNumber: 5,
    activityId: 'Orchestrate-5',
    activityBlock: 'IMPLEMENT',
    activityName: 'AI Agent - Ingest Documents to COS',
    outcome: 'Automated ingestion of documents into Cloud Object Storage.',
    effort: 40,
    staffing: 'Consultant-B8',
    parts: 'D06ZWZX x 1',
    price: 17200,
    scope: 'Develop ingestion pipeline for documents to COS.',
    responsibilities: 'Build, test, and monitor document ingestion workflows.',
    assumptions: 'COS bucket and IAM roles are already created.',
    seismicLink: 'https://seismic.example.com/document-ingestion'
  },
  {
    activityNumber: 6,
    activityId: 'Orchestrate-6',
    activityBlock: 'IMPLEMENT',
    activityName: 'AI Agent - AutoRAG',
    outcome: 'Implemented AutoRAG for dynamic context retrieval.',
    effort: 40,
    staffing: 'Consultant-B8',
    parts: 'D06ZWZX x 1',
    price: 17200,
    scope: 'Implement AutoRAG mechanism for context-aware responses.',
    responsibilities: 'Integrate AutoRAG API, validate performance, and deploy.',
    assumptions: 'Vector DB and embedding service are ready for integration.',
    seismicLink: 'https://seismic.example.com/autorag'
  },
  {
    activityNumber: 7,
    activityId: 'Orchestrate-7',
    activityBlock: 'DEPLOY',
    activityName: 'UAT Assistance - 1 week',
    outcome: 'Supported client during User Acceptance Testing phase.',
    effort: 40,
    staffing: 'Consultant-B8',
    parts: 'D06ZWZX x 1',
    price: 17200,
    scope: 'Assist with UAT execution, issue resolution, and validation.',
    responsibilities: 'Monitor test cases, capture feedback, and ensure defect closure.',
    assumptions: 'Client test data and environment are prepared in advance.',
    seismicLink: 'https://seismic.example.com/uat-assistance'
  }
];
  const totalEffort = activities.reduce((sum, activity) => sum + activity.effort, 0);
  const totalPrice = activities.reduce((sum, activity) => sum + activity.price, 0);

  const getBlockColor = (block) => {
    switch(block) {
      case 'PLAN':
        return 'bg-[#0f62fe] text-white';
      case 'IMPLEMENT':
        return 'bg-[#8a3ffc] text-white';
      case 'DEPLOY':
        return 'bg-[#24a148] text-white';
      default:
        return 'bg-[#e0e0e0] text-[#161616]';
    }
  };

  // Group activities by block
  const groupedByBlock = activities.reduce((acc, activity) => {
    if (!acc[activity.activityBlock]) {
      acc[activity.activityBlock] = [];
    }
    acc[activity.activityBlock].push(activity);
    return acc;
  }, {});

  // Group by staffing
  const groupedByStaffing = activities.reduce((acc, activity) => {
    if (!acc[activity.staffing]) {
      acc[activity.staffing] = [];
    }
    acc[activity.staffing].push(activity);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-[#f4f4f4]">
      {/* <CarbonHeader 
        onNavigate={onNavigate} 
        onLogout={onLogout} 
        userRole={userRole}
      /> */}

      <div className="p-6">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => onNavigate('catalog')}
          className="mb-4 text-[#0f62fe] hover:bg-[#e0e0e0] rounded-none"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Catalog
        </Button>

        {/* Header */}
        <div className="bg-white p-6 mb-6 border-l-4 border-l-[#0f62fe]">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-2xl font-semibold mb-2" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                {offering.title}
              </h1>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge className="bg-[#0f62fe] text-white rounded-none">{offering.saasType}</Badge>
                <Badge className="bg-[#e0e0e0] text-[#161616] rounded-none">{offering.brand}</Badge>
                <Badge className="bg-[#e0e0e0] text-[#161616] rounded-none">{offering.industry}</Badge>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Card className="bg-[#f4f4f4] p-4 rounded-none border-l-2 border-l-[#0f62fe]">
                <div className="flex items-center gap-3">
                  <Clock className="w-8 h-8 text-[#0f62fe]" />
                  <div>
                    <div className="text-[#525252] text-sm">Total Effort</div>
                    <div className="text-[#161616] text-lg font-semibold">{totalEffort} hours</div>
                  </div>
                </div>
              </Card>

              <Card className="bg-[#f4f4f4] p-4 rounded-none border-l-2 border-l-[#24a148]">
                <div className="flex items-center gap-3">
                  <DollarSign className="w-8 h-8 text-[#24a148]" />
                  <div>
                    <div className="text-[#525252] text-sm">Total Price</div>
                    <div className="text-[#161616] text-lg font-semibold">${totalPrice.toLocaleString()}</div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Tabs - Only Summary and Dashboard */}
        <Tabs defaultValue="summary" className="bg-white">
          <div className="border-b border-[#e0e0e0] bg-white">
            <TabsList className="w-full justify-start bg-white rounded-none h-12">
              <TabsTrigger 
                value="summary" 
                className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-[#0f62fe] data-[state=active]:bg-transparent"
                style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}
              >
                Summary
              </TabsTrigger>
              <TabsTrigger 
                value="dashboard" 
                className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-[#0f62fe] data-[state=active]:bg-transparent"
                style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}
              >
                Dashboard
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Summary Tab - Complete Table */}
            <TabsContent value="summary" className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="w-6 h-6 text-[#0f62fe]" />
              <h2 className="text-xl font-semibold" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                Complete Activity Summary
              </h2>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-[#e0e0e0] hover:bg-[#e0e0e0]">
                    <TableHead className="text-[#161616] font-semibold">#</TableHead>
                    <TableHead className="text-[#161616] font-semibold">Activity ID</TableHead>
                    <TableHead className="text-[#161616] font-semibold">Block</TableHead>
                    <TableHead className="text-[#161616] font-semibold">Activity Name</TableHead>
                    <TableHead className="text-[#161616] font-semibold">Effort (hrs)</TableHead>
                    <TableHead className="text-[#161616] font-semibold">Staffing</TableHead>
                    <TableHead className="text-[#161616] font-semibold">Parts</TableHead>
                    <TableHead className="text-[#161616] font-semibold">Price</TableHead>
                    <TableHead className="text-[#161616] font-semibold">Action</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {activities.map((activity) => (
                    <TableRow key={activity.activityNumber} className="hover:bg-[#f4f4f4]">
                      <TableCell className="text-[#161616] font-medium">{activity.activityNumber}</TableCell>
                      <TableCell className="text-[#161616]">{activity.activityId}</TableCell>
                      <TableCell>
                        <Badge className={`${getBlockColor(activity.activityBlock)} rounded-none`}>
                          {activity.activityBlock}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-[#161616]">{activity.activityName}</TableCell>
                      <TableCell className="text-[#161616]">{activity.effort}</TableCell>
                      <TableCell className="text-[#161616] font-medium">{activity.staffing}</TableCell>
                      <TableCell className="text-[#161616]">{activity.parts}</TableCell>
                      <TableCell className="text-[#161616] font-semibold">
                        ${activity.price.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <button
                          className="text-blue-600 hover:underline font-medium focus:outline-none"
                          onClick={() => setSelectedActivity(activity)}>
                          View More
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}

                  <TableRow className="bg-[#e0e0e0] hover:bg-[#e0e0e0] font-semibold">
                    <TableCell className="text-[#161616]" colSpan={4}>
                      Total
                    </TableCell>
                    <TableCell className="text-[#161616]">{totalEffort}</TableCell>
                    <TableCell colSpan={3}></TableCell>
                    <TableCell className="text-[#161616]">${totalPrice.toLocaleString()}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            {/* --- Popup Modal --- */}
            <Dialog open={!!selectedActivity} onOpenChange={() => setSelectedActivity(null)}>
              <DialogContent className="max-w-lg bg-white rounded-2xl shadow-lg p-6 overflow-y-auto max-h-[80vh]">
                <DialogHeader>
                  <DialogTitle className="text-xl font-semibold text-[#0f62fe]">
                    {selectedActivity?.activityName}
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-4 mt-4">
                  {[
                    { label: 'Scope', value: selectedActivity?.scope },
                    { label: 'Outcome', value: selectedActivity?.outcome },
                    { label: 'Responsibilities', value: selectedActivity?.responsibilities },
                    { label: 'Assumptions', value: selectedActivity?.assumptions },
                    {
                      label: 'Link to Seismic',
                      value: (
                        <a
                          href={selectedActivity?.seismicLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#0f62fe] underline"
                        >
                          Open
                        </a>
                      ),
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-xl p-3 bg-[#f9f9f9] hover:bg-[#f4f4f4] transition"
                    >
                      <h4 className="font-semibold text-[#161616]">{item.label}</h4>
                      <p className="text-[#525252] text-sm mt-1">{item.value}</p>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end mt-4">
                  <Button variant="outline" onClick={() => setSelectedActivity(null)}>
                    Close
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </TabsContent>


          {/* Dashboard Tab - Combined Staffing and Pricing */}
          <TabsContent value="dashboard" className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <DollarSign className="w-6 h-6 text-[#24a148]" />
              <h2 className="text-xl font-semibold" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                Staffing & Pricing Dashboard
              </h2>
            </div>

            {/* Overall Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card className="p-4 rounded-none border-l-4 border-l-[#0f62fe]">
                <div className="text-[#525252] text-sm mb-1">Total Activities</div>
                <div className="text-[#161616] text-2xl font-semibold">
                  {activities.length}
                </div>
              </Card>
              <Card className="p-4 rounded-none border-l-4 border-l-[#8a3ffc]">
                <div className="text-[#525252] text-sm mb-1">Total Effort</div>
                <div className="text-[#161616] text-2xl font-semibold">
                  {totalEffort}h
                </div>
              </Card>
              <Card className="p-4 rounded-none border-l-4 border-l-[#24a148]">
                <div className="text-[#525252] text-sm mb-1">Total Price</div>
                <div className="text-[#161616] text-2xl font-semibold">
                  ${totalPrice.toLocaleString()}
                </div>
              </Card>
              <Card className="p-4 rounded-none border-l-4 border-l-[#da1e28]">
                <div className="text-[#525252] text-sm mb-1">Avg Rate/Hour</div>
                <div className="text-[#161616] text-2xl font-semibold">
                  ${Math.round(totalPrice / totalEffort).toLocaleString()}
                </div>
              </Card>
            </div>

            {/* Staffing Section */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-6 h-6 text-[#0f62fe]" />
                <h3 className="text-lg font-semibold" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                  Staffing Allocation
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {Object.entries(groupedByStaffing).map(([staffing, staffActivities]) => {
                  const staffEffort = staffActivities.reduce((sum, act) => sum + act.effort, 0);
                  const staffCost = staffActivities.reduce((sum, act) => sum + act.price, 0);
                  return (
                    <Card key={staffing} className="p-6 rounded-none border-l-4 border-l-[#0f62fe]">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="text-lg font-semibold text-[#161616] mb-1">{staffing}</div>
                          <div className="text-[#525252] text-sm">{staffActivities.length} activities</div>
                        </div>
                        <Users className="w-8 h-8 text-[#0f62fe]" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-[#525252] text-sm">Total Hours</div>
                          <div className="text-xl font-semibold text-[#161616]">{staffEffort}h</div>
                        </div>
                        <div>
                          <div className="text-[#525252] text-sm">Total Cost</div>
                          <div className="text-xl font-semibold text-[#161616]">${staffCost.toLocaleString()}</div>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Pricing Section */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <DollarSign className="w-6 h-6 text-[#24a148]" />
                <h3 className="text-lg font-semibold" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                  Pricing Breakdown by Phase
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {Object.entries(groupedByBlock).map(([block, blockActivities]) => {
                  const blockEffort = blockActivities.reduce((sum, act) => sum + act.effort, 0);
                  const blockPrice = blockActivities.reduce((sum, act) => sum + act.price, 0);
                  return (
                    <Card key={block} className={`p-6 rounded-none border-l-4 ${
                      block === 'PLAN' ? 'border-l-[#0f62fe]' :
                      block === 'IMPLEMENT' ? 'border-l-[#8a3ffc]' :
                      'border-l-[#24a148]'
                    }`}>
                      <Badge className={`${getBlockColor(block)} rounded-none mb-3`}>
                        {block}
                      </Badge>
                      <div className="text-3xl font-semibold text-[#161616] mb-1">
                        ${blockPrice.toLocaleString()}
                      </div>
                      <div className="text-[#525252] text-sm mb-2">
                        {((blockPrice / totalPrice) * 100).toFixed(1)}% of total
                      </div>
                      <div className="grid grid-cols-2 gap-2 pt-3 border-t border-[#e0e0e0]">
                        <div>
                          <div className="text-[#525252] text-xs">Activities</div>
                          <div className="text-[#161616] font-semibold">{blockActivities.length}</div>
                        </div>
                        <div>
                          <div className="text-[#525252] text-xs">Hours</div>
                          <div className="text-[#161616] font-semibold">{blockEffort}h</div>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}