import { useState } from 'react';
import { Search, Filter, ArrowRight, ShoppingCart, ChevronRight, ChevronDown, Package } from 'lucide-react';
import { CarbonHeader } from './CarbonHeader';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './ui/pagination';

// Data structure: Brands → Products → TEL Offerings
const brandsData = {
  'IBM Cloud': {
    products: [
      { id: 'p1', name: 'Cloud Migration Services', description: 'Migrate workloads to cloud' },
      { id: 'p2', name: 'Cloud Infrastructure', description: 'Infrastructure as a Service' },
      { id: 'p3', name: 'Cloud Management', description: 'Manage cloud resources' },
    ]
  },
  'IBM Watson': {
    products: [
      { id: 'p4', name: 'Watson AI Platform', description: 'AI and ML platform' },
      { id: 'p5', name: 'Watson Assistant', description: 'Conversational AI' },
      { id: 'p6', name: 'Watson Discovery', description: 'Enterprise search and analytics' },
    ]
  },
  'IBM Security': {
    products: [
      { id: 'p7', name: 'Identity & Access Management', description: 'IAM solutions' },
      { id: 'p8', name: 'Threat Protection', description: 'Security threat management' },
      { id: 'p9', name: 'Data Security', description: 'Protect sensitive data' },
    ]
  },
  'IBM Cloud Pak': {
    products: [
      { id: 'p10', name: 'Cloud Pak for Data', description: 'Data and AI platform' },
      { id: 'p11', name: 'Cloud Pak for Integration', description: 'Integration platform' },
      { id: 'p12', name: 'Cloud Pak for Security', description: 'Security orchestration' },
    ]
  },
  'IBM Consulting': {
    products: [
      { id: 'p13', name: 'Digital Transformation', description: 'End-to-end transformation' },
      { id: 'p14', name: 'Business Process Services', description: 'Process optimization' },
      { id: 'p15', name: 'Application Services', description: 'Application development' },
    ]
  },
};

// TEL Offerings for each product
const telOfferingsData = {
  'p1': [ // Cloud Migration Services
    { id: 'tel1', partNumber: 'TEL-CMS-001', name: 'Cloud Assessment & Strategy', price: 85000, duration: '4 weeks' },
    { id: 'tel2', partNumber: 'TEL-CMS-002', name: 'Migration Execution', price: 250000, duration: '12 weeks' },
    { id: 'tel3', partNumber: 'TEL-CMS-003', name: 'Post-Migration Support', price: 120000, duration: '8 weeks' },
  ],
  'p2': [ // Cloud Infrastructure
    { id: 'tel4', partNumber: 'TEL-CI-001', name: 'Infrastructure Design', price: 95000, duration: '6 weeks' },
    { id: 'tel5', partNumber: 'TEL-CI-002', name: 'Infrastructure Deployment', price: 180000, duration: '10 weeks' },
  ],
  'p3': [ // Cloud Management
    { id: 'tel6', partNumber: 'TEL-CM-001', name: 'Cloud Optimization', price: 75000, duration: '4 weeks' },
    { id: 'tel7', partNumber: 'TEL-CM-002', name: 'Managed Services Setup', price: 110000, duration: '6 weeks' },
  ],
  'p4': [ // Watson AI Platform
    { id: 'tel8', partNumber: 'TEL-WAI-001', name: 'AI Strategy Workshop', price: 125000, duration: '4 weeks' },
    { id: 'tel9', partNumber: 'TEL-WAI-002', name: 'AI Model Development', price: 320000, duration: '16 weeks' },
    { id: 'tel10', partNumber: 'TEL-WAI-003', name: 'AI Platform Implementation', price: 280000, duration: '14 weeks' },
  ],
  'p5': [ // Watson Assistant
    { id: 'tel11', partNumber: 'TEL-WA-001', name: 'Chatbot Design', price: 65000, duration: '3 weeks' },
    { id: 'tel12', partNumber: 'TEL-WA-002', name: 'Assistant Implementation', price: 145000, duration: '8 weeks' },
  ],
  'p6': [ // Watson Discovery
    { id: 'tel13', partNumber: 'TEL-WD-001', name: 'Discovery Setup', price: 95000, duration: '5 weeks' },
    { id: 'tel14', partNumber: 'TEL-WD-002', name: 'Content Enrichment', price: 175000, duration: '10 weeks' },
  ],
  'p7': [ // Identity & Access Management
    { id: 'tel15', partNumber: 'TEL-IAM-001', name: 'IAM Assessment', price: 85000, duration: '4 weeks' },
    { id: 'tel16', partNumber: 'TEL-IAM-002', name: 'IAM Implementation', price: 220000, duration: '12 weeks' },
  ],
  'p8': [ // Threat Protection
    { id: 'tel17', partNumber: 'TEL-TP-001', name: 'Security Assessment', price: 95000, duration: '5 weeks' },
    { id: 'tel18', partNumber: 'TEL-TP-002', name: 'Threat Detection Setup', price: 185000, duration: '10 weeks' },
  ],
  'p9': [ // Data Security
    { id: 'tel19', partNumber: 'TEL-DS-001', name: 'Data Protection Strategy', price: 75000, duration: '4 weeks' },
    { id: 'tel20', partNumber: 'TEL-DS-002', name: 'Encryption Implementation', price: 165000, duration: '9 weeks' },
  ],
  'p10': [ // Cloud Pak for Data
    { id: 'tel21', partNumber: 'TEL-CPD-001', name: 'Data Platform Assessment', price: 110000, duration: '6 weeks' },
    { id: 'tel22', partNumber: 'TEL-CPD-002', name: 'Platform Implementation', price: 450000, duration: '20 weeks' },
  ],
  'p11': [ // Cloud Pak for Integration
    { id: 'tel23', partNumber: 'TEL-CPI-001', name: 'Integration Strategy', price: 95000, duration: '5 weeks' },
    { id: 'tel24', partNumber: 'TEL-CPI-002', name: 'Integration Platform Setup', price: 320000, duration: '16 weeks' },
  ],
  'p12': [ // Cloud Pak for Security
    { id: 'tel25', partNumber: 'TEL-CPS-001', name: 'Security Orchestration', price: 125000, duration: '7 weeks' },
    { id: 'tel26', partNumber: 'TEL-CPS-002', name: 'SOAR Implementation', price: 280000, duration: '14 weeks' },
  ],
  'p13': [ // Digital Transformation
    { id: 'tel27', partNumber: 'TEL-DT-001', name: 'Transformation Roadmap', price: 150000, duration: '8 weeks' },
    { id: 'tel28', partNumber: 'TEL-DT-002', name: 'Transformation Execution', price: 680000, duration: '24 weeks' },
  ],
  'p14': [ // Business Process Services
    { id: 'tel29', partNumber: 'TEL-BPS-001', name: 'Process Assessment', price: 85000, duration: '5 weeks' },
    { id: 'tel30', partNumber: 'TEL-BPS-002', name: 'Process Optimization', price: 240000, duration: '14 weeks' },
  ],
  'p15': [ // Application Services
    { id: 'tel31', partNumber: 'TEL-AS-001', name: 'Application Modernization', price: 195000, duration: '12 weeks' },
    { id: 'tel32', partNumber: 'TEL-AS-002', name: 'Custom Development', price: 420000, duration: '20 weeks' },
  ],
};

// Standard offerings for non-dealmaker roles
const mockOfferings = [
  {
    id: '1',
    title: 'Cloud Migration Accelerator',
    saasType: 'Professional Services',
    duration: '12 weeks',
    price: 450000,
    brand: 'IBM Cloud',
    industry: 'Financial Services',
    stage: 'Migration',
    description: 'Comprehensive cloud migration solution with assessment and execution'
  },
  {
    id: '2',
    title: 'AI Strategy Workshop',
    saasType: 'Consulting',
    duration: '4 weeks',
    price: 125000,
    brand: 'IBM Watson',
    industry: 'Retail',
    stage: 'Discovery',
    description: 'Strategic AI roadmap development and use case identification'
  },
  {
    id: '3',
    title: 'Data Platform Modernization',
    saasType: 'Implementation',
    duration: '16 weeks',
    price: 680000,
    brand: 'IBM Cloud Pak',
    industry: 'Healthcare',
    stage: 'Transformation',
    description: 'Modern data platform built on Red Hat OpenShift'
  },
  {
    id: '4',
    title: 'Security Assessment',
    saasType: 'Professional Services',
    duration: '6 weeks',
    price: 220000,
    brand: 'IBM Security',
    industry: 'Manufacturing',
    stage: 'Assessment',
    description: 'Comprehensive security posture evaluation and recommendations'
  },
  {
    id: '5',
    title: 'SAP S/4HANA Migration',
    saasType: 'Implementation',
    duration: '24 weeks',
    price: 1200000,
    brand: 'IBM Consulting',
    industry: 'Financial Services',
    stage: 'Migration',
    description: 'End-to-end SAP migration with best practices'
  },
  {
    id: '6',
    title: 'DevOps Transformation',
    saasType: 'Consulting',
    duration: '8 weeks',
    price: 285000,
    brand: 'IBM Cloud',
    industry: 'Technology',
    stage: 'Transformation',
    description: 'DevOps culture and toolchain implementation'
  },
];

export function OfferingsCatalog({ onNavigate, onLogout, userRole }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('title');
  const [showFilters, setShowFilters] = useState(true);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedIndustries, setSelectedIndustries] = useState([]);

  // For Deal Maker role
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [expandedProducts, setExpandedProducts] = useState([]);
  const [selectedTELOfferings, setSelectedTELOfferings] = useState([]);

  const brands = Object.keys(brandsData);
  const industries = ['Cloud Migration Services', 'Cloud Infrastructure', 'Watson AI Platform', 'Watson Assistant', 'Identity & Access'];

  const isDealMaker = userRole === 'deal-maker';
  const showViewDetailsButton = userRole === 'seller' || userRole === 'architect';

  // Get products for selected brand
  const availableProducts = selectedBrand ? brandsData[selectedBrand].products : [];

  const handleProductSelection = (productId, checked) => {
    if (checked) {
      setSelectedProducts([...selectedProducts, productId]);
      setExpandedProducts([...expandedProducts, productId]); // Auto-expand when selected
    } else {
      setSelectedProducts(selectedProducts.filter(p => p !== productId));
      setExpandedProducts(expandedProducts.filter(p => p !== productId));
      // Remove TEL offerings for this product
      const productTELIds = (telOfferingsData[productId] || []).map(tel => tel.id);
      setSelectedTELOfferings(selectedTELOfferings.filter(id => !productTELIds.includes(id)));
    }
  };

  const toggleProductExpand = (productId) => {
    if (expandedProducts.includes(productId)) {
      setExpandedProducts(expandedProducts.filter(p => p !== productId));
    } else {
      setExpandedProducts([...expandedProducts, productId]);
    }
  };

  const handleTELSelection = (telId, checked) => {
    if (checked) {
      setSelectedTELOfferings([...selectedTELOfferings, telId]);
    } else {
      setSelectedTELOfferings(selectedTELOfferings.filter(id => id !== telId));
    }
  };

  // Calculate total and get selected TEL offering details
  const getAllTELOfferings = () => {
    return selectedProducts.flatMap(productId => telOfferingsData[productId] || []);
  };

  const selectedTELDetails = getAllTELOfferings().filter(tel => 
    selectedTELOfferings.includes(tel.id)
  );
  const totalPrice = selectedTELDetails.reduce((sum, tel) => sum + tel.price, 0);

  const handleAddToELA = () => {
    console.log('Adding to ELA:', selectedTELDetails);
    alert(`Adding ${selectedTELDetails.length} TEL offerings to ELA. Total: $${totalPrice.toLocaleString()}`);
    // Add your ELA logic here
  };

  // DEAL MAKER VIEW
  if (isDealMaker) {
    return (
      <div className="min-h-screen bg-[#f4f4f4]">
        <div className="flex min-h-screen">
          {/* Left Sidebar - Brand Selection - Full height white background */}
          <aside className={`${showFilters ? 'w-64' : 'w-0'} bg-white border-r border-[#e0e0e0] transition-all duration-300 overflow-hidden min-h-screen`}>
            <div className="p-4 h-full bg-white">
              <div className="flex items-center gap-2 mb-4">
                <Package className="w-5 h-5" />
                <h2 className="font-semibold text-lg" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                  Brands
                </h2>
              </div>

              <div className="space-y-2">
                {brands.map(brand => (
                  <div
                    key={brand}
                    onClick={() => {
                      setSelectedBrand(brand);
                      setSelectedProducts([]);
                      setExpandedProducts([]);
                      setSelectedTELOfferings([]);
                    }}
                    className={`p-3 cursor-pointer border-l-4 transition-all ${
                      selectedBrand === brand
                        ? 'border-l-[#0f62fe] bg-[#e8f0ff]'
                        : 'border-l-transparent hover:bg-[#f4f4f4]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[#161616] font-medium" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                        {brand}
                      </span>
                      {selectedBrand === brand && <ChevronRight className="w-4 h-4 text-[#0f62fe]" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-6 overflow-y-auto">
            {!selectedBrand ? (
              <div className="flex items-center justify-center h-96">
                <div className="text-center">
                  <Package className="w-16 h-16 mx-auto mb-4 text-[#0f62fe]" />
                  <h2 className="text-2xl text-[#161616] mb-2 font-semibold" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                    Select a Brand
                  </h2>
                  <p className="text-[#525252]">Choose a brand from the sidebar to view available products and TEL offerings</p>
                </div>
              </div>
            ) : (
              <>
                <div className="bg-white p-4 mb-6 border-b-2 border-[#e0e0e0]">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl text-[#161616] font-semibold" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                        {selectedBrand}
                      </h2>
                      <p className="text-[#525252] mt-1">
                        Select products to view and choose TEL offerings
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex gap-6 text-sm">
                    <div className="text-[#525252]">
                      <span className="font-semibold text-[#161616]">{selectedProducts.length}</span> product{selectedProducts.length !== 1 ? 's' : ''} selected
                    </div>
                    <div className="text-[#525252]">
                      <span className="font-semibold text-[#161616]">{selectedTELOfferings.length}</span> TEL offering{selectedTELOfferings.length !== 1 ? 's' : ''} selected
                    </div>
                  </div>
                </div>

                {/* Products with expandable TEL offerings - Add padding bottom for summary panel */}
                <div className={`space-y-4 ${selectedTELOfferings.length > 0 ? 'mb-[400px]' : 'mb-6'}`}>
                  {availableProducts.map(product => {
                    const isExpanded = expandedProducts.includes(product.id);
                    const isSelected = selectedProducts.includes(product.id);
                    const productTEL = telOfferingsData[product.id] || [];
                    
                    return (
                      <Card key={product.id} className="bg-white rounded-none border-l-4 border-l-[#0f62fe]">
                        {/* Product Header */}
                        <div className="p-4 border-b border-[#e0e0e0]">
                          <div className="flex items-start gap-3">
                            <Checkbox
                              id={`product-${product.id}`}
                              checked={isSelected}
                              onCheckedChange={(checked) => handleProductSelection(product.id, checked)}
                              className="mt-1"
                            />
                            <div className="flex-1">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <Label
                                    htmlFor={`product-${product.id}`}
                                    className="text-[#161616] cursor-pointer font-semibold text-lg"
                                    style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}
                                  >
                                    {product.name}
                                  </Label>
                                  <p className="text-[#525252] mt-1 text-sm">{product.description}</p>
                                  <div className="mt-2 text-sm text-[#525252]">
                                    {productTEL.length} TEL offering{productTEL.length !== 1 ? 's' : ''} available
                                  </div>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => toggleProductExpand(product.id)}
                                  className="rounded-none hover:bg-[#e0e0e0]"
                                  disabled={!isSelected}
                                >
                                  {isExpanded ? (
                                    <ChevronDown className="w-5 h-5 text-[#0f62fe]" />
                                  ) : (
                                    <ChevronRight className="w-5 h-5" />
                                  )}
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* TEL Offerings - Expandable */}
                        {isSelected && isExpanded && (
                          <div className="p-4 bg-[#f4f4f4]">
                            <h4 className="text-[#161616] font-semibold mb-3" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                              TEL Offerings for {product.name}
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                              {productTEL.map(tel => (
                                <Card key={tel.id} className="bg-white rounded-none border border-[#e0e0e0] hover:shadow-md transition-shadow">
                                  <div className="p-3">
                                    <div className="flex items-start gap-2 mb-2">
                                      <Checkbox
                                        id={`tel-${tel.id}`}
                                        checked={selectedTELOfferings.includes(tel.id)}
                                        onCheckedChange={(checked) => handleTELSelection(tel.id, checked)}
                                        className="mt-0.5"
                                      />
                                      <Label
                                        htmlFor={`tel-${tel.id}`}
                                        className="text-[#161616] cursor-pointer font-semibold text-sm flex-1"
                                        style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}
                                      >
                                        {tel.name}
                                      </Label>
                                    </div>

                                    <div className="space-y-1 text-xs pl-6">
                                      <div className="flex justify-between">
                                        <span className="text-[#525252]">Part #:</span>
                                        <span className="text-[#161616] font-mono">{tel.partNumber}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-[#525252]">Duration:</span>
                                        <span className="text-[#161616]">{tel.duration}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-[#525252]">Price:</span>
                                        <span className="text-[#161616] font-semibold">${tel.price.toLocaleString()}</span>
                                      </div>
                                    </div>
                                  </div>
                                </Card>
                              ))}
                            </div>
                          </div>
                        )}
                      </Card>
                    );
                  })}
                </div>

                {/* Selected TEL Offerings Summary - Fixed at Bottom */}
                {selectedTELOfferings.length > 0 && (
                  <div className="fixed bottom-0 left-0 right-0 z-50" style={{ marginLeft: showFilters ? '16rem' : '0' }}>
                    <Card className="bg-white rounded-none border-t-4 border-t-[#0f62fe] shadow-2xl">
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-xl text-[#161616] font-semibold" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                            Selected TEL Offerings ({selectedTELOfferings.length})
                          </h3>
                          <div className="text-2xl font-bold text-[#0f62fe]">
                            Total: ${totalPrice.toLocaleString()}
                          </div>
                        </div>

                        <div className="mb-4 max-h-48 overflow-y-auto border border-[#e0e0e0]">
                          <table className="w-full">
                            <thead className="bg-[#e0e0e0] sticky top-0">
                              <tr>
                                <th className="text-left p-3 text-[#161616] font-semibold text-sm" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                                  Part Number
                                </th>
                                <th className="text-left p-3 text-[#161616] font-semibold text-sm" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                                  TEL Offering
                                </th>
                                <th className="text-left p-3 text-[#161616] font-semibold text-sm" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                                  Duration
                                </th>
                                <th className="text-right p-3 text-[#161616] font-semibold text-sm" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                                  Price
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {selectedTELDetails.map(tel => (
                                <tr key={tel.id} className="border-b border-[#e0e0e0] hover:bg-[#f4f4f4]">
                                  <td className="p-3 text-[#525252] font-mono text-sm">{tel.partNumber}</td>
                                  <td className="p-3 text-[#161616] text-sm">{tel.name}</td>
                                  <td className="p-3 text-[#161616] text-sm">{tel.duration}</td>
                                  <td className="p-3 text-right text-[#161616] font-semibold text-sm">${tel.price.toLocaleString()}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        <div className="flex gap-3">
                          <Button
                            onClick={handleAddToELA}
                            className="flex-1 bg-[#0f62fe] hover:bg-[#0353e9] text-white rounded-none h-12 text-base font-semibold"
                          >
                            <ShoppingCart className="w-5 h-5 mr-2" />
                            Add {selectedTELOfferings.length} Part{selectedTELOfferings.length !== 1 ? 's' : ''} to ELA
                          </Button>
                          <Button
                            onClick={() => setSelectedTELOfferings([])}
                            variant="outline"
                            className="rounded-none border-2 border-[#161616] h-12 px-6 hover:bg-[#e0e0e0]"
                          >
                            Clear Selection
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    );
  }

  // STANDARD VIEW (Seller, Architect, Brand Sales, Renewal Rep)
  const filteredOfferings = mockOfferings.filter(offering => {
    const matchesSearch = offering.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      offering.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(offering.brand);
    const matchesIndustry = selectedIndustries.length === 0 || selectedIndustries.includes(offering.industry);
    return matchesSearch && matchesBrand && matchesIndustry;
  });

  return (
    <div className="min-h-screen bg-[#f4f4f4]">
      <div className="flex">
        {/* Left Sidebar - Filters */}
        <aside className={`${showFilters ? 'w-64' : 'w-0'} bg-white border-r border-[#e0e0e0] transition-all duration-300 overflow-hidden`}>
          <div className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="w-4 h-4" />
              <h2 className="font-semibold" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>Filters</h2>
            </div>

            {/* Brand Filter */}
            <div className="mb-6">
              <h3 className="mb-3 text-[#161616] font-semibold" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                Brand
              </h3>
              <div className="space-y-2">
                {brands.map(brand => (
                  <div key={brand} className="flex items-center gap-2">
                    <Checkbox
                      id={`brand-${brand}`}
                      checked={selectedBrands.includes(brand)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedBrands([...selectedBrands, brand]);
                        } else {
                          setSelectedBrands(selectedBrands.filter(b => b !== brand));
                        }
                      }}
                    />
                    <Label htmlFor={`brand-${brand}`} className="text-[#161616] cursor-pointer">
                      {brand}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Industry Filter */}
            <div className="mb-6">
              <h3 className="mb-3 text-[#161616] font-semibold" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                Product
              </h3>
              <div className="space-y-2">
                {industries.map(industry => (
                  <div key={industry} className="flex items-center gap-2">
                    <Checkbox
                      id={`industry-${industry}`}
                      checked={selectedIndustries.includes(industry)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedIndustries([...selectedIndustries, industry]);
                        } else {
                          setSelectedIndustries(selectedIndustries.filter(i => i !== industry));
                        }
                      }}
                    />
                    <Label htmlFor={`industry-${industry}`} className="text-[#161616] cursor-pointer">
                      {industry}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Clear Filters */}
            <Button
              variant="ghost"
              onClick={() => {
                setSelectedBrands([]);
                setSelectedIndustries([]);
              }}
              className="w-full rounded-none text-[#0f62fe] hover:bg-[#e0e0e0]"
            >
              Clear all filters
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Search and Sort Bar */}
          <div className="bg-white p-4 mb-6 border-b-2 border-[#e0e0e0]">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div className="flex-1 w-full md:max-w-md relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#525252]" />
                <Input
                  type="text"
                  placeholder="Search offerings..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-[#f4f4f4] border-b-2 border-[#161616] rounded-none"
                  style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[#525252]">Sort by:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40 bg-[#f4f4f4] border-b-2 border-[#161616] rounded-none">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="title">Title</SelectItem>
                    <SelectItem value="price">Price</SelectItem>
                    <SelectItem value="duration">Duration</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mt-3 text-[#525252]">
              Showing {filteredOfferings.length} of {mockOfferings.length} offerings
            </div>
          </div>

          {/* Offerings Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {filteredOfferings.map(offering => (
              <Card key={offering.id} className="bg-white rounded-none border-l-4 border-l-[#0f62fe] hover:shadow-lg transition-shadow">
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-[#161616] flex-1 font-semibold" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                      {offering.title}
                    </h3>
                  </div>

                  <div className="space-y-2 mb-4">
                    <Badge className="bg-[#e0e0e0] text-[#161616] rounded-none">
                      {offering.saasType}
                    </Badge>
                    <p className="text-[#525252] text-sm">{offering.description}</p>
                  </div>

                  <div className="space-y-1 mb-4 text-[#525252] text-sm">
                    <div className="flex justify-between">
                      <span>Duration:</span>
                      <span className="text-[#161616]">{offering.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Price:</span>
                      <span className="text-[#161616] font-semibold">
                        ${typeof offering.price === 'number' ? offering.price.toLocaleString() : offering.price}
                      </span>
                    </div>
                  </div>

                  {/* Only show View Details button for Seller and Architect */}
                  {showViewDetailsButton && (
                    <Button
                      onClick={() => onNavigate('offering-detail', offering.id)}
                      className="w-full bg-[#0f62fe] hover:bg-[#0353e9] text-white rounded-none"
                    >
                      View Details
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" className="rounded-none" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" className="rounded-none bg-[#0f62fe] text-white">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" className="rounded-none">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" className="rounded-none">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" className="rounded-none" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </main>
      </div>
    </div>
  );
}