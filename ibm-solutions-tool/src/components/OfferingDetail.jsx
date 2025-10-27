import { useState } from 'react';
import { ArrowLeft, DollarSign, Clock, Users, Package, FileText, Hash, Tag, Target } from 'lucide-react';
// import { CarbonHeader } from './CarbonHeader';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Checkbox } from './ui/checkbox';

export function OfferingDetail({ onNavigate, onLogout, userRole }) {
  // State for ELA Dealmaker selections
  const [selectedOfferings, setSelectedOfferings] = useState([]);

  // Check if user should see simplified view
  const isBrandSalesRep = userRole === 'brand-sales-and-renewal-rep';
  const isELADealmaker = userRole === 'deal-maker';
  const isSimplifiedView = isBrandSalesRep || isELADealmaker;

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

          {/* ELA Dealmaker Table with Checkboxes */}
          <div className="bg-white p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Package className="w-6 h-6 text-[#0f62fe]" />
                <h2 className="text-xl font-semibold" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                  Offering Details
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

            {/* Selection Summary Cards */}
            {selectedOfferings.length > 0 && (
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
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
            )}

            {/* Selected Offerings Detail */}
            {selectedOfferings.length > 0 && (
              <div className="mt-6">
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
            )}
          </div>
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

          {/* Simplified Table */}
          <div className="bg-white p-6">
            <div className="flex items-center gap-3 mb-6">
              <Package className="w-6 h-6 text-[#0f62fe]" />
              <h2 className="text-xl font-semibold" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                Offering Details
              </h2>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-[#e0e0e0] hover:bg-[#e0e0e0]">
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
                    <TableCell className="text-[#161616]" colSpan={3}>Total</TableCell>
                    <TableCell className="text-[#161616]">${totalSimplifiedPrice.toLocaleString()}</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
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
      outcome: '',
      effort: 40,
      staffing: 'Consultant-B9',
      parts: 'D06ZVZX x 1',
      price: 19000
    },
    {
      activityNumber: 2,
      activityId: 'Orchestrate-2',
      activityBlock: 'IMPLEMENT',
      activityName: 'AI Agent - 15 fixed actions',
      outcome: '',
      effort: 40,
      staffing: 'Consultant-B8',
      parts: 'D06ZWZX x 1',
      price: 17200
    },
    {
      activityNumber: 3,
      activityId: 'Orchestrate-3',
      activityBlock: 'IMPLEMENT',
      activityName: 'AI Agent - Service Desk',
      outcome: '',
      effort: 40,
      staffing: 'Consultant-B8',
      parts: 'D06ZWZX x 1',
      price: 17200
    },
    {
      activityNumber: 4,
      activityId: 'Orchestrate-4',
      activityBlock: 'IMPLEMENT',
      activityName: 'AI Agent - Small Vector DB',
      outcome: '',
      effort: 40,
      staffing: 'Consultant-B8',
      parts: 'D06ZWZX x 1',
      price: 17200
    },
    {
      activityNumber: 5,
      activityId: 'Orchestrate-5',
      activityBlock: 'IMPLEMENT',
      activityName: 'AI Agent - Ingest Documents to COS',
      outcome: '',
      effort: 40,
      staffing: 'Consultant-B8',
      parts: 'D06ZWZX x 1',
      price: 17200
    },
    {
      activityNumber: 6,
      activityId: 'Orchestrate-6',
      activityBlock: 'IMPLEMENT',
      activityName: 'AI Agent - AutoRAG',
      outcome: '',
      effort: 40,
      staffing: 'Consultant-B8',
      parts: 'D06ZWZX x 1',
      price: 17200
    },
    {
      activityNumber: 7,
      activityId: 'Orchestrate-7',
      activityBlock: 'DEPLOY',
      activityName: 'UAT Assistance - 1 week',
      outcome: '',
      effort: 40,
      staffing: 'Consultant-B8',
      parts: 'D06ZWZX x 1',
      price: 17200
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

  // Group by parts
  const groupedByParts = activities.reduce((acc, activity) => {
    if (!acc[activity.parts]) {
      acc[activity.parts] = [];
    }
    acc[activity.parts].push(activity);
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

        {/* Tabs */}
        <Tabs defaultValue="activity-number" className="bg-white">
          <div className="border-b border-[#e0e0e0] bg-white overflow-x-auto">
            <TabsList className="w-full justify-start bg-white rounded-none h-12 flex-nowrap">
              <TabsTrigger 
                value="activity-number" 
                className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-[#0f62fe] data-[state=active]:bg-transparent whitespace-nowrap"
                style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}
              >
                Activity Number
              </TabsTrigger>
              <TabsTrigger 
                value="activity-id" 
                className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-[#0f62fe] data-[state=active]:bg-transparent whitespace-nowrap"
                style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}
              >
                Activity ID
              </TabsTrigger>
              <TabsTrigger 
                value="activity-block" 
                className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-[#0f62fe] data-[state=active]:bg-transparent whitespace-nowrap"
                style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}
              >
                Activity Block
              </TabsTrigger>
              <TabsTrigger 
                value="activity-name" 
                className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-[#0f62fe] data-[state=active]:bg-transparent whitespace-nowrap"
                style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}
              >
                Activity Name
              </TabsTrigger>
              <TabsTrigger 
                value="outcome" 
                className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-[#0f62fe] data-[state=active]:bg-transparent whitespace-nowrap"
                style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}
              >
                Outcome
              </TabsTrigger>
              <TabsTrigger 
                value="effort" 
                className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-[#0f62fe] data-[state=active]:bg-transparent whitespace-nowrap"
                style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}
              >
                Effort
              </TabsTrigger>
              <TabsTrigger 
                value="staffing" 
                className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-[#0f62fe] data-[state=active]:bg-transparent whitespace-nowrap"
                style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}
              >
                Staffing
              </TabsTrigger>
              <TabsTrigger 
                value="parts" 
                className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-[#0f62fe] data-[state=active]:bg-transparent whitespace-nowrap"
                style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}
              >
                Parts
              </TabsTrigger>
              <TabsTrigger 
                value="price" 
                className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-[#0f62fe] data-[state=active]:bg-transparent whitespace-nowrap"
                style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}
              >
                Price
              </TabsTrigger>
            </TabsList>
          </div>

          {/* All the tab contents remain the same as before... */}
          {/* For brevity, I'll include just the Activity Number tab as an example */}
          
          <TabsContent value="activity-number" className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Hash className="w-6 h-6 text-[#0f62fe]" />
              <h2 className="text-xl font-semibold" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                Activity Sequence
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activities.map((activity) => (
                <Card key={activity.activityNumber} className="p-4 rounded-none border-l-4 border-l-[#0f62fe] hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3">
                    <div className="bg-[#0f62fe] text-white w-10 h-10 rounded-full flex items-center justify-center font-semibold flex-shrink-0">
                      {activity.activityNumber}
                    </div>
                    <div className="flex-1">
                      <div className="text-[#525252] text-sm mb-1">{activity.activityId}</div>
                      <div className="text-[#161616] font-medium">{activity.activityName}</div>
                      <Badge className={`${getBlockColor(activity.activityBlock)} rounded-none mt-2`}>
                        {activity.activityBlock}
                      </Badge>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Activity ID Tab */}
          <TabsContent value="activity-id" className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Tag className="w-6 h-6 text-[#0f62fe]" />
              <h2 className="text-xl font-semibold" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                Activity Identifiers
              </h2>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-[#e0e0e0] hover:bg-[#e0e0e0]">
                    <TableHead className="text-[#161616] font-semibold">Activity ID</TableHead>
                    <TableHead className="text-[#161616] font-semibold">Activity Name</TableHead>
                    <TableHead className="text-[#161616] font-semibold">Block</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activities.map((activity) => (
                    <TableRow key={activity.activityId} className="hover:bg-[#f4f4f4]">
                      <TableCell className="text-[#161616] font-medium">{activity.activityId}</TableCell>
                      <TableCell className="text-[#161616]">{activity.activityName}</TableCell>
                      <TableCell>
                        <Badge className={`${getBlockColor(activity.activityBlock)} rounded-none`}>
                          {activity.activityBlock}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* Activity Block Tab */}
          <TabsContent value="activity-block" className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="w-6 h-6 text-[#0f62fe]" />
              <h2 className="text-xl font-semibold" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                Activities by Phase
              </h2>
            </div>
            <div className="space-y-6">
              {Object.entries(groupedByBlock).map(([block, blockActivities]) => (
                <Card key={block} className={`p-6 rounded-none border-l-4 ${
                  block === 'PLAN' ? 'border-l-[#0f62fe]' :
                  block === 'IMPLEMENT' ? 'border-l-[#8a3ffc]' :
                  'border-l-[#24a148]'
                }`}>
                  <div className="flex items-center gap-3 mb-4">
                    <Badge className={`${getBlockColor(block)} rounded-none text-base px-4 py-1`}>
                      {block}
                    </Badge>
                    <span className="text-[#525252]">{blockActivities.length} activities</span>
                  </div>
                  <div className="space-y-3">
                    {blockActivities.map((activity) => (
                      <div key={activity.activityNumber} className="bg-[#f4f4f4] p-4 flex items-start gap-3">
                        <div className="bg-white border-2 border-[#e0e0e0] w-8 h-8 rounded flex items-center justify-center font-semibold text-sm flex-shrink-0">
                          {activity.activityNumber}
                        </div>
                        <div className="flex-1">
                          <div className="text-[#161616] font-medium mb-1">{activity.activityName}</div>
                          <div className="text-[#525252] text-sm">{activity.activityId}</div>
                        </div>
                        <div className="text-right text-sm">
                          <div className="text-[#525252]">Effort</div>
                          <div className="text-[#161616] font-semibold">{activity.effort}h</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Activity Name Tab */}
          <TabsContent value="activity-name" className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="w-6 h-6 text-[#0f62fe]" />
              <h2 className="text-xl font-semibold" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                All Activities
              </h2>
            </div>
            <div className="space-y-3">
              {activities.map((activity) => (
                <Card key={activity.activityNumber} className="p-4 rounded-none hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="bg-[#0f62fe] text-white w-8 h-8 rounded flex items-center justify-center font-semibold text-sm flex-shrink-0">
                        {activity.activityNumber}
                      </div>
                      <div className="flex-1">
                        <div className="text-[#161616] font-medium mb-1">{activity.activityName}</div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[#525252] text-sm">{activity.activityId}</span>
                          <Badge className={`${getBlockColor(activity.activityBlock)} rounded-none text-xs`}>
                            {activity.activityBlock}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Outcome Tab */}
          <TabsContent value="outcome" className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Target className="w-6 h-6 text-[#0f62fe]" />
              <h2 className="text-xl font-semibold" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                Activity Outcomes
              </h2>
            </div>
            <div className="bg-[#f4f4f4] p-6 rounded-none border-l-4 border-l-[#0f62fe] mb-6">
              <p className="text-[#525252]">
                Outcomes will be defined based on specific deliverables for each activity phase.
              </p>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-[#e0e0e0] hover:bg-[#e0e0e0]">
                    <TableHead className="text-[#161616] font-semibold">Activity</TableHead>
                    <TableHead className="text-[#161616] font-semibold">Block</TableHead>
                    <TableHead className="text-[#161616] font-semibold">Outcome</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activities.map((activity) => (
                    <TableRow key={activity.activityNumber} className="hover:bg-[#f4f4f4]">
                      <TableCell className="text-[#161616]">{activity.activityName}</TableCell>
                      <TableCell>
                        <Badge className={`${getBlockColor(activity.activityBlock)} rounded-none`}>
                          {activity.activityBlock}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-[#525252] italic">
                        {activity.outcome || 'To be defined'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* Effort Tab */}
          <TabsContent value="effort" className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Clock className="w-6 h-6 text-[#0f62fe]" />
              <h2 className="text-xl font-semibold" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                Effort Distribution
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {Object.entries(groupedByBlock).map(([block, blockActivities]) => {
                const blockEffort = blockActivities.reduce((sum, act) => sum + act.effort, 0);
                return (
                  <Card key={block} className={`p-6 rounded-none border-l-4 ${
                    block === 'PLAN' ? 'border-l-[#0f62fe]' :
                    block === 'IMPLEMENT' ? 'border-l-[#8a3ffc]' :
                    'border-l-[#24a148]'
                  }`}>
                    <Badge className={`${getBlockColor(block)} rounded-none mb-3`}>
                      {block}
                    </Badge>
                    <div className="text-3xl font-semibold text-[#161616] mb-1">{blockEffort}h</div>
                    <div className="text-[#525252] text-sm">
                      {((blockEffort / totalEffort) * 100).toFixed(1)}% of total effort
                    </div>
                  </Card>
                );
              })}
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-[#e0e0e0] hover:bg-[#e0e0e0]">
                    <TableHead className="text-[#161616] font-semibold">Activity</TableHead>
                    <TableHead className="text-[#161616] font-semibold">Block</TableHead>
                    <TableHead className="text-[#161616] font-semibold">Effort (hours)</TableHead>
                    <TableHead className="text-[#161616] font-semibold">% of Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activities.map((activity) => (
                    <TableRow key={activity.activityNumber} className="hover:bg-[#f4f4f4]">
                      <TableCell className="text-[#161616]">{activity.activityName}</TableCell>
                      <TableCell>
                        <Badge className={`${getBlockColor(activity.activityBlock)} rounded-none`}>
                          {activity.activityBlock}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-[#161616] font-semibold">{activity.effort}</TableCell>
                      <TableCell className="text-[#161616]">
                        {((activity.effort / totalEffort) * 100).toFixed(1)}%
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="bg-[#e0e0e0] hover:bg-[#e0e0e0] font-semibold">
                    <TableCell className="text-[#161616]" colSpan={2}>Total</TableCell>
                    <TableCell className="text-[#161616]">{totalEffort}</TableCell>
                    <TableCell className="text-[#161616]">100%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* Staffing Tab */}
          <TabsContent value="staffing" className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-6 h-6 text-[#0f62fe]" />
              <h2 className="text-xl font-semibold" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                Staffing Allocation
              </h2>
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

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-[#e0e0e0] hover:bg-[#e0e0e0]">
                    <TableHead className="text-[#161616] font-semibold">Activity</TableHead>
                    <TableHead className="text-[#161616] font-semibold">Staffing</TableHead>
                    <TableHead className="text-[#161616] font-semibold">Effort</TableHead>
                    <TableHead className="text-[#161616] font-semibold">Block</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activities.map((activity) => (
                    <TableRow key={activity.activityNumber} className="hover:bg-[#f4f4f4]">
                      <TableCell className="text-[#161616]">{activity.activityName}</TableCell>
                      <TableCell className="text-[#161616] font-medium">{activity.staffing}</TableCell>
                      <TableCell className="text-[#161616]">{activity.effort}h</TableCell>
                      <TableCell>
                        <Badge className={`${getBlockColor(activity.activityBlock)} rounded-none`}>
                          {activity.activityBlock}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* Parts Tab */}
          <TabsContent value="parts" className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Package className="w-6 h-6 text-[#0f62fe]" />
              <h2 className="text-xl font-semibold" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                Parts & Resources
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {Object.entries(groupedByParts).map(([parts, partActivities]) => {
                return (
                  <Card key={parts} className="p-6 rounded-none border-l-4 border-l-[#0f62fe]">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="text-lg font-semibold text-[#161616] mb-1">{parts}</div>
                        <div className="text-[#525252] text-sm">{partActivities.length} activities</div>
                      </div>
                      <Package className="w-8 h-8 text-[#0f62fe]" />
                    </div>
                    <div className="space-y-2">
                      {partActivities.map((activity) => (
                        <div key={activity.activityNumber} className="bg-[#f4f4f4] p-3">
                          <div className="text-[#161616] text-sm font-medium">{activity.activityName}</div>
                          <div className="text-[#525252] text-xs mt-1">{activity.activityId}</div>
                        </div>
                      ))}
                    </div>
                  </Card>
                );
              })}
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-[#e0e0e0] hover:bg-[#e0e0e0]">
                    <TableHead className="text-[#161616] font-semibold">Activity</TableHead>
                    <TableHead className="text-[#161616] font-semibold">Parts</TableHead>
                    <TableHead className="text-[#161616] font-semibold">Block</TableHead>
                    <TableHead className="text-[#161616] font-semibold">Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activities.map((activity) => (
                    <TableRow key={activity.activityNumber} className="hover:bg-[#f4f4f4]">
                      <TableCell className="text-[#161616]">{activity.activityName}</TableCell>
                      <TableCell className="text-[#161616] font-medium">{activity.parts}</TableCell>
                      <TableCell>
                        <Badge className={`${getBlockColor(activity.activityBlock)} rounded-none`}>
                          {activity.activityBlock}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-[#161616] font-semibold">${activity.price.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* Price Tab */}
          <TabsContent value="price" className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <DollarSign className="w-6 h-6 text-[#24a148]" />
              <h2 className="text-xl font-semibold" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                Pricing Breakdown
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {Object.entries(groupedByBlock).map(([block, blockActivities]) => {
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
                    <div className="text-[#525252] text-sm">
                      {((blockPrice / totalPrice) * 100).toFixed(1)}% of total
                    </div>
                    <div className="text-[#525252] text-sm mt-1">
                      {blockActivities.length} activities
                    </div>
                  </Card>
                );
              })}
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-[#e0e0e0] hover:bg-[#e0e0e0]">
                    <TableHead className="text-[#161616] font-semibold">Activity</TableHead>
                    <TableHead className="text-[#161616] font-semibold">Block</TableHead>
                    <TableHead className="text-[#161616] font-semibold">Effort</TableHead>
                    <TableHead className="text-[#161616] font-semibold">Price</TableHead>
                    <TableHead className="text-[#161616] font-semibold">% of Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activities.map((activity) => (
                    <TableRow key={activity.activityNumber} className="hover:bg-[#f4f4f4]">
                      <TableCell className="text-[#161616]">{activity.activityName}</TableCell>
                      <TableCell>
                        <Badge className={`${getBlockColor(activity.activityBlock)} rounded-none`}>
                          {activity.activityBlock}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-[#161616]">{activity.effort}h</TableCell>
                      <TableCell className="text-[#161616] font-semibold">
                        ${activity.price.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-[#161616]">
                        {((activity.price / totalPrice) * 100).toFixed(1)}%
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="bg-[#e0e0e0] hover:bg-[#e0e0e0] font-semibold">
                    <TableCell className="text-[#161616]" colSpan={3}>Total</TableCell>
                    <TableCell className="text-[#161616]">${totalPrice.toLocaleString()}</TableCell>
                    <TableCell className="text-[#161616]">100%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}