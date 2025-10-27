import { useState } from 'react';
import { Search, Filter, ArrowRight } from 'lucide-react';
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

const mockOfferings = [
  {
    id: '1',
    title: 'Cloud Migration Accelerator',
    saasType: 'Professional Services',
    duration: '12 weeks',
    price: '$450,000',
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
    price: '$125,000',
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
    price: '$680,000',
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
    price: '$220,000',
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
    price: '$1,200,000',
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
    price: '$285,000',
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

  const brands = ['IBM Cloud', 'IBM Watson', 'IBM Security', 'IBM Cloud Pak', 'IBM Consulting'];
  const industries = ['Cloud Migration Services', 'Cloud Infrastructure', 'Watson AI Platform', 'Watson Assistant', 'Identity & Access'];

  const filteredOfferings = mockOfferings.filter(offering => {
    const matchesSearch = offering.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         offering.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(offering.brand);
    const matchesIndustry = selectedIndustries.length === 0 || selectedIndustries.includes(offering.industry);
    return matchesSearch && matchesBrand && matchesIndustry;
  });

  return (
    <div className="min-h-screen bg-[#f4f4f4]">
      {/* <CarbonHeader 
        onNavigate={onNavigate} 
        onLogout={onLogout} 
        userRole={userRole}
        currentPage="catalog"
        onToggleSidebar={() => setShowFilters(!showFilters)}
      /> */}

      <div className="flex">
        {/* Left Sidebar - Filters */}
        <aside className={`${showFilters ? 'w-64' : 'w-0'} bg-white border-r border-[#e0e0e0] transition-all duration-300 overflow-hidden`}>
          <div className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="w-4 h-4" />
              <h2 style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>Filters</h2>
            </div>

            {/* Brand Filter */}
            <div className="mb-6">
              <h3 className="mb-3 text-[#161616]" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
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
              <h3 className="mb-3 text-[#161616]" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
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
                    <h3 className="text-[#161616] flex-1" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                      {offering.title}
                    </h3>
                  </div>

                  <div className="space-y-2 mb-4">
                    <Badge className="bg-[#e0e0e0] text-[#161616] rounded-none">
                      {offering.saasType}
                    </Badge>
                    <p className="text-[#525252]">{offering.description}</p>
                  </div>

                  <div className="space-y-1 mb-4 text-[#525252]">
                    <div className="flex justify-between">
                      <span>Duration:</span>
                      <span className="text-[#161616]">{offering.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Price:</span>
                      <span className="text-[#161616]">{offering.price}</span>
                    </div>
                  </div>

                  <Button
                    onClick={() => onNavigate('offering-detail', offering.id)}
                    className="w-full bg-[#0f62fe] hover:bg-[#0353e9] text-white rounded-none"
                  >
                    View Details
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
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
