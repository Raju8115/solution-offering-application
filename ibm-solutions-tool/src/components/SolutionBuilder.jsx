import { useState, useEffect } from 'react';
import { Search, Save, Trash2, DollarSign, Trees, Clock, Users, ChevronRight, GripVertical, FileText, FileSpreadsheet, Plus, Info, Target, CheckCircle, AlertCircle, UserCheck, ChevronLeft, ChevronRight as ChevronRightIcon, X } from 'lucide-react';
// import { CarbonHeader } from './CarbonHeader';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

// Mock data for brands
const brands = [
  { id: 'ibm-cloud', name: 'IBM Cloud' },
  { id: 'ibm-watson', name: 'IBM Watson' },
  { id: 'ibm-security', name: 'IBM Security' },
  { id: 'ibm-consulting', name: 'IBM Consulting' },
  { id: 'ibm-cloud-pak', name: 'IBM Cloud Pak' },
];

// Mock data for products
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

// Mock data for offerings
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
  'Consulting', 'Design', 'Security', 'Implementation', 
  'Quality', 'Training', 'Planning', 'Analysis', 'Testing', 'Deployment',
];

// Available countries
const countries = [
  'USA', 'UK', 'Germany', 'France', 'Italy', 'Spain', 
  'Canada', 'Australia', 'Japan', 'Singapore', 'GDC India'
];

// Available roles
const staffingRoles = [
  'Project Manager',
  'Consultant',
  'Solution Architect',
  'Technical Lead',
  'Business Analyst',
  'Developer',
  'QA Engineer',
  'DevOps Engineer'
];

// Available bands
const bands = [6, 7, 8, 9, 10, 11, 12];

// Mock data for activities with new staffing structure
const activitiesData = [
  { 
    id: 'a1', 
    name: 'Project Kickoff', 
    offeringId: 'o1', 
    category: 'Planning', 
    duration: 1, 
    hours: 45, 
    cost: 9000,
    scope: 'Conduct project kickoff meeting with all stakeholders to align on objectives, timeline, deliverables, and communication protocols. Review project charter, establish governance structure, and set expectations.',
    outcome: 'Approved project charter, stakeholder alignment, established governance framework, and kickoff meeting minutes with action items.',
    responsibilities: 'Project Manager facilitates kickoff meeting and manages stakeholder engagement. Solution Architect presents technical approach. Consultants support documentation and planning activities.',
    assumptions: 'All stakeholders are available for kickoff meeting. Project charter is prepared. Governance framework template exists. Meeting facilities are available.',
    staffing: [
      { role: 'Project Manager', country: 'USA', band: 9, hours: 5 },
      { role: 'Consultant', country: 'USA', band: 8, hours: 20 },
      { role: 'Consultant', country: 'USA', band: 7, hours: 20 }
    ]
  },
  { 
    id: 'a2', 
    name: 'Discovery Workshop', 
    offeringId: 'o1', 
    category: 'Consulting', 
    duration: 2, 
    hours: 80, 
    cost: 16000,
    scope: 'Conduct comprehensive discovery sessions with stakeholders to understand current state, business objectives, and technical requirements for cloud migration. This includes assessment of existing infrastructure, applications, data, and processes.',
    outcome: 'Detailed discovery documentation including current state assessment, business requirements, technical constraints, migration readiness evaluation, and preliminary migration strategy with risk assessment.',
    responsibilities: 'Solution Architect leads discovery sessions and creates technical assessment. Business Analyst documents business requirements and stakeholder needs. Technical Lead assesses current infrastructure and applications. Project Manager coordinates scheduling and stakeholder engagement.',
    assumptions: 'All key stakeholders are available for discovery sessions. Existing documentation of systems and processes is accessible. Current infrastructure is properly documented. Teams have necessary access permissions to systems and data. Discovery sessions can be completed within allocated timeframe.',
    staffing: [
      { role: 'Project Manager', country: 'USA', band: 9, hours: 10 },
      { role: 'Solution Architect', country: 'USA', band: 10, hours: 30 },
      { role: 'Consultant', country: 'USA', band: 8, hours: 25 },
      { role: 'Consultant', country: 'USA', band: 7, hours: 15 }
    ]
  },
  { 
    id: 'a3', 
    name: 'Architecture Design', 
    offeringId: 'o1', 
    category: 'Design', 
    duration: 3, 
    hours: 120, 
    cost: 24000,
    scope: 'Design the target cloud architecture including compute, storage, networking, security components, and integration patterns. Create detailed architecture diagrams, select appropriate cloud services, and define infrastructure as code templates.',
    outcome: 'Complete architecture documentation including detailed diagrams, design documents, technology stack recommendations, infrastructure as code templates, security architecture, and integration specifications with cost estimates.',
    responsibilities: 'Lead Architect designs overall solution architecture and creates design documents. Cloud Engineer validates technical feasibility and cloud service selection. Security Architect reviews security controls and compliance. Network Engineer designs network topology and connectivity patterns.',
    assumptions: 'Cloud platform is selected and accessible. Architecture design patterns and standards are established. Security requirements and compliance needs are clearly defined. Network topology and connectivity requirements are understood. Budget constraints for cloud resources are known.',
    staffing: [
      { role: 'Solution Architect', country: 'USA', band: 11, hours: 40 },
      { role: 'Solution Architect', country: 'USA', band: 10, hours: 40 },
      { role: 'Consultant', country: 'GDC India', band: 8, hours: 25 },
      { role: 'Consultant', country: 'GDC India', band: 7, hours: 15 }
    ]
  },
  { 
    id: 'a4', 
    name: 'Security Assessment', 
    offeringId: 'o1', 
    category: 'Security', 
    duration: 2, 
    hours: 60, 
    cost: 13000,
    scope: 'Perform comprehensive security assessment of proposed architecture and identify security gaps, compliance requirements, and risk mitigation strategies. Review security controls, data protection measures, identity and access management, and network security.',
    outcome: 'Security assessment report with detailed findings, risk ratings, gap analysis, remediation recommendations, compliance mapping documentation, and security implementation roadmap with prioritized action items.',
    responsibilities: 'Security Architect leads security assessment and creates security recommendations. Compliance Specialist reviews regulatory requirements and creates compliance matrix. Risk Manager validates findings, assigns risk ratings, and develops mitigation strategies.',
    assumptions: 'Security standards and compliance requirements are clearly documented. Access to existing security controls and policies is provided. Current threat models and risk assessments are available. Security testing tools and environments are accessible. Compliance frameworks are identified.',
    staffing: [
      { role: 'Solution Architect', country: 'USA', band: 10, hours: 20 },
      { role: 'Consultant', country: 'USA', band: 9, hours: 15 },
      { role: 'Consultant', country: 'GDC India', band: 8, hours: 15 },
      { role: 'Consultant', country: 'GDC India', band: 7, hours: 10 }
    ]
  },
  { 
    id: 'a5', 
    name: 'Cloud Migration', 
    offeringId: 'o1', 
    category: 'Implementation', 
    duration: 6, 
    hours: 200, 
    cost: 38000,
    scope: 'Migrate applications and data to cloud infrastructure following migration plan, runbooks, and best practices with minimal downtime. Execute migration waves, validate functionality, and ensure business continuity throughout the process.',
    outcome: 'Successfully migrated workloads running in cloud environment with validated functionality, performance benchmarks, operational documentation, runbooks, and post-migration validation reports.',
    responsibilities: 'Migration Lead coordinates migration activities and manages migration execution. Cloud Engineers execute infrastructure migration and application deployment. DBAs handle database migration and data validation. DevOps Engineers manage automation, CI/CD pipelines, and monitoring setup.',
    assumptions: 'Migration tools are configured and tested. Network connectivity between source and target is established. Backup and rollback plans are documented and tested. Change windows are approved by business stakeholders. Resources are available for 24/7 support during migration.',
    staffing: [
      { role: 'Project Manager', country: 'USA', band: 9, hours: 20 },
      { role: 'Technical Lead', country: 'USA', band: 10, hours: 40 },
      { role: 'Consultant', country: 'GDC India', band: 8, hours: 60 },
      { role: 'Consultant', country: 'GDC India', band: 7, hours: 50 },
      { role: 'Developer', country: 'GDC India', band: 7, hours: 30 }
    ]
  },
  { 
    id: 'a6', 
    name: 'Testing & QA', 
    offeringId: 'o1', 
    category: 'Quality', 
    duration: 3, 
    hours: 100, 
    cost: 18000,
    scope: 'Execute comprehensive testing including functional, performance, security, and integration testing of migrated workloads. Validate business processes, performance requirements, and security controls to ensure production readiness.',
    outcome: 'Test results documentation, defect reports, performance benchmarks, security test results, sign-off on quality gates, test evidence packages, and production readiness certification.',
    responsibilities: 'QA Lead manages overall testing strategy and coordinates testing activities. Test Engineers execute functional and integration test cases. Performance Engineer conducts load and stress testing. Security Tester runs vulnerability scans and penetration tests.',
    assumptions: 'Test cases and test data are prepared. Testing environments are configured and accessible. Test tools are licensed and operational. Defect tracking system is available. Test schedules are aligned with migration timeline.',
    staffing: [
      { role: 'Project Manager', country: 'USA', band: 9, hours: 10 },
      { role: 'Technical Lead', country: 'USA', band: 9, hours: 20 },
      { role: 'QA Engineer', country: 'GDC India', band: 8, hours: 35 },
      { role: 'QA Engineer', country: 'GDC India', band: 7, hours: 35 }
    ]
  },
  { 
    id: 'a7', 
    name: 'Training Session', 
    offeringId: 'o1', 
    category: 'Training', 
    duration: 1, 
    hours: 40, 
    cost: 7500,
    scope: 'Deliver comprehensive training sessions to operations team and end users on new cloud platform, processes, and support procedures. Cover platform basics, operational procedures, troubleshooting, and best practices.',
    outcome: 'Trained team members with comprehensive training materials, recorded training sessions, knowledge base articles, quick reference guides, and certificates of completion for all participants.',
    responsibilities: 'Training Lead develops training content and coordinates delivery. Subject Matter Experts deliver technical training sessions. Training Coordinator manages logistics and participant coordination. Technical Writers create training documentation and guides.',
    assumptions: 'Training facilities and equipment are available. Training participants are identified and scheduled. Demo and lab environments are ready. Training materials template exists. Virtual training platform is accessible if needed.',
    staffing: [
      { role: 'Consultant', country: 'USA', band: 9, hours: 16 },
      { role: 'Consultant', country: 'GDC India', band: 8, hours: 12 },
      { role: 'Consultant', country: 'GDC India', band: 7, hours: 12 }
    ]
  },
  { 
    id: 'a8', 
    name: 'Infrastructure Planning', 
    offeringId: 'o2', 
    category: 'Planning', 
    duration: 2, 
    hours: 60, 
    cost: 12000,
    scope: 'Plan hybrid cloud infrastructure including compute, storage, networking components and integration points between on-premises and cloud environments.',
    outcome: 'Infrastructure plan with resource requirements, cost estimates, network topology, and implementation timeline.',
    responsibilities: 'Infrastructure Architect designs infrastructure plan. Cloud Engineer validates cloud resources. Network Engineer plans connectivity.',
    assumptions: 'Infrastructure requirements are defined. Budget is allocated. Network requirements are understood.',
    staffing: [
      { role: 'Solution Architect', country: 'USA', band: 10, hours: 24 },
      { role: 'Consultant', country: 'USA', band: 8, hours: 18 },
      { role: 'Consultant', country: 'GDC India', band: 7, hours: 18 }
    ]
  },
  { 
    id: 'a9', 
    name: 'AI Readiness Assessment', 
    offeringId: 'o3', 
    category: 'Consulting', 
    duration: 1, 
    hours: 50, 
    cost: 11000,
    scope: 'Assess organization readiness for AI adoption including data maturity, infrastructure, skills, and governance.',
    outcome: 'Readiness assessment report with maturity scores, gap analysis, and recommendations.',
    responsibilities: 'AI Architect assesses technical readiness. Data Scientist evaluates data quality. Business Analyst reviews processes.',
    assumptions: 'Stakeholders are available for interviews. Data samples are accessible. Current state documentation exists.',
    staffing: [
      { role: 'Solution Architect', country: 'USA', band: 10, hours: 20 },
      { role: 'Consultant', country: 'USA', band: 9, hours: 15 },
      { role: 'Consultant', country: 'GDC India', band: 8, hours: 15 }
    ]
  },
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
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Modal state
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isStaffingModalOpen, setIsStaffingModalOpen] = useState(false);
  const [reviewingActivity, setReviewingActivity] = useState(null);
  const [editingActivity, setEditingActivity] = useState(null);
  const [staffingData, setStaffingData] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [fixedTotalHours, setFixedTotalHours] = useState(0);

  // Drag and drop state
  const [draggedIndex, setDraggedIndex] = useState(null);

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

  // Pagination calculations
  const totalPages = Math.ceil(filteredActivities.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedActivities = filteredActivities.slice(startIndex, endIndex);

  // Reset to page 1 when search or offering changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedOffering]);

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

  // Open review modal when activity is clicked
  const openReviewModal = (activity) => {
    setReviewingActivity(activity);
    setActiveTab('overview');
    setIsReviewModalOpen(true);
  };

  // Add activity after review
  const addActivityAfterReview = () => {
    if (reviewingActivity) {
      setSelectedActivities([...selectedActivities, { 
        ...reviewingActivity, 
        id: `${reviewingActivity.id}-${Date.now()}`,
        order: selectedActivities.length
      }]);
      setIsReviewModalOpen(false);
      setReviewingActivity(null);
    }
  };

  // Open staffing modal for editing
  const openStaffingModal = (activity) => {
    setEditingActivity(activity);
    setStaffingData(activity.staffing ? [...activity.staffing] : []);
    setFixedTotalHours(activity.hours);
    setIsStaffingModalOpen(true);
  };

  // Calculate total hours from staffing data
  const calculateTotalHours = (staffing) => {
    return staffing.reduce((sum, item) => sum + (item.hours || 0), 0);
  };

  // Add new staffing line
  const addStaffingLine = () => {
    setStaffingData([
      ...staffingData,
      { role: 'Consultant', country: 'USA', band: 8, hours: 0 }
    ]);
  };

  // Remove staffing line
  const removeStaffingLine = (index) => {
    const newStaffingData = staffingData.filter((_, i) => i !== index);
    setStaffingData(newStaffingData);
  };

  // Update staffing line
  const updateStaffingLine = (index, field, value) => {
    const newStaffingData = [...staffingData];
    newStaffingData[index] = {
      ...newStaffingData[index],
      [field]: field === 'hours' || field === 'band' ? parseInt(value) || 0 : value
    };
    setStaffingData(newStaffingData);
  };

  // Save staffing changes
  const saveStaffingChanges = () => {
    const totalHours = calculateTotalHours(staffingData);
    if (totalHours !== fixedTotalHours) {
      alert(`Total hours (${totalHours}) must equal the fixed total hours (${fixedTotalHours}) for this activity.`);
      return;
    }

    setSelectedActivities(selectedActivities.map(a => 
      a.id === editingActivity.id 
        ? { ...a, staffing: staffingData }
        : a
    ));
    setIsStaffingModalOpen(false);
    setEditingActivity(null);
    setStaffingData([]);
  };

  const removeActivity = (id) => {
    setSelectedActivities(selectedActivities.filter(a => a.id !== id));
  };

  // Drag and drop handlers
  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newActivities = [...selectedActivities];
    const draggedItem = newActivities[draggedIndex];
    
    newActivities.splice(draggedIndex, 1);
    newActivities.splice(index, 0, draggedItem);
    
    setSelectedActivities(newActivities);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  // Export functions
  const exportBPE = () => {
    console.log('Exporting Budget Planning & Estimate...');
    alert('BP&E export will generate a Word document with detailed budget and planning information for all selected activities.');
  };

  const exportWBS = () => {
    console.log('Exporting Work Breakdown Structure...');
    alert('WBS export will generate a work breakdown structure document with all activities, phases, and dependencies.');
  };

  const totals = selectedActivities.reduce(
    (acc, activity) => ({
      weeks: acc.weeks + activity.duration,
      hours: acc.hours + activity.hours,
      cost: acc.cost + activity.cost,
    }),
    { weeks: 0, hours: 0, cost: 0 }
  );

  // Get current selection names for display
  const selectedBrandName = brands.find(b => b.id === selectedBrand)?.name || '';
  const selectedProductName = products.find(p => p.id === selectedProduct)?.name || '';
  const selectedOfferingName = offerings.find(o => o.id === selectedOffering)?.name || '';

  return (
    <div className="min-h-screen bg-[#f4f4f4]">
      <div className="flex h-screen">
        {/* Left Panel - Selection Wizard + Summary */}
        <aside className="w-80 bg-white border-r border-[#e0e0e0] flex flex-col">
          <div className="p-5 border-b border-[#e0e0e0] bg-[#f4f4f4] flex-shrink-0">
            <h2 className="text-lg font-semibold mb-2" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
              Build Solution
            </h2>
            <p className="text-sm text-[#525252]">
              Select brand, product, and offering
            </p>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            {/* Step 1: Brand Selection */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-full bg-[#0f62fe] text-white flex items-center justify-center text-sm font-semibold">
                  1
                </div>
                <h3 className="text-sm font-semibold text-[#161616]" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                  Select Brand
                </h3>
              </div>
              <Select value={selectedBrand} onValueChange={handleBrandChange}>
                <SelectTrigger className="w-full bg-[#f4f4f4] border-b-2 border-[#161616] rounded-none h-10">
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
                  <div className="w-6 h-6 rounded-full bg-[#0f62fe] text-white flex items-center justify-center text-sm font-semibold">
                    2
                  </div>
                  <h3 className="text-sm font-semibold text-[#161616]" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                    Select Product
                  </h3>
                </div>
                <Select value={selectedProduct} onValueChange={handleProductChange}>
                  <SelectTrigger className="w-full bg-[#f4f4f4] border-b-2 border-[#161616] rounded-none h-10">
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
                  <div className="w-6 h-6 rounded-full bg-[#0f62fe] text-white flex items-center justify-center text-sm font-semibold">
                    3
                  </div>
                  <h3 className="text-sm font-semibold text-[#161616]" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                    Select Offering/Template
                  </h3>
                </div>
                <Select value={selectedOffering} onValueChange={handleOfferingChange}>
                  <SelectTrigger className="w-full bg-[#f4f4f4] border-b-2 border-[#161616] rounded-none h-10">
                    <SelectValue placeholder="Choose an offering..." />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredOfferings.map(offering => (
                      <SelectItem key={offering.id} value={offering.id}>
                        <div className="flex flex-col py-1">
                          <span>{offering.name}</span>
                          {/* <span className="text-sm text-[#525252]">
                            {offering.duration}w · ${offering.price.toLocaleString()}
                          </span> */}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          {/* Summary Section - Bottom of Sidebar (Export buttons removed) */}
          {selectedActivities.length > 0 && (
            <div className="border-t border-[#e0e0e0] bg-[#f4f4f4] p-5 flex-shrink-0">
              <div>
                <h3 className="text-xs font-semibold text-[#525252] mb-3 uppercase tracking-wide" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                  Solution Summary
                </h3>
                <div className="space-y-2">
                  <Card className="p-3 rounded-sm border-l-4 border-l-[#0f62fe] bg-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-[#0f62fe]" />
                        <span className="text-xs text-[#525252]">Duration</span>
                      </div>
                      <span className="text-sm font-semibold text-[#161616]">{totals.weeks}w</span>
                    </div>
                  </Card>
                  <Card className="p-3 rounded-sm border-l-4 border-l-[#8a3ffc] bg-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-[#8a3ffc]" />
                        <span className="text-xs text-[#525252]">Hours</span>
                      </div>
                      <span className="text-sm font-semibold text-[#161616]">{totals.hours}h</span>
                    </div>
                  </Card>
                  <Card className="p-3 rounded-sm border-l-4 border-l-[#24a148] bg-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-[#24a148]" />
                        <span className="text-xs text-[#525252]">Cost</span>
                      </div>
                      <span className="text-sm font-semibold text-[#161616]">${totals.cost.toLocaleString()}</span>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          )}
        </aside>

        {/* Main Content Area - Activities Browser and Solution Canvas */}
        <main className="flex-1 overflow-y-auto bg-[#f4f4f4]">
          {selectedOffering ? (
            <div className="p-6">
              {/* Activities Section with Export Buttons in Top Right */}
              <div className="mb-6">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h1 className="text-2xl font-semibold mb-2" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                      Available Activities
                    </h1>
                    <div className="flex items-center gap-2 text-sm text-[#525252]">
                      <span>{selectedBrandName}</span>
                      <ChevronRight className="w-4 h-4" />
                      <span>{selectedProductName}</span>
                      <ChevronRight className="w-4 h-4" />
                      <span>{selectedOfferingName}</span>
                    </div>
                  </div>
                  
                  {/* Export Buttons - Top Right */}
                  {selectedActivities.length > 0 && (
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <Button 
                        className="bg-[#0f62fe] hover:bg-[#0353e9] text-white rounded-sm h-10 px-4"
                        onClick={exportBPE}
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        Export BP&E
                      </Button>
                      <Button 
                        className="bg-[#0f62fe] hover:bg-[#0353e9] text-white rounded-sm h-10 px-4"
                        onClick={exportWBS}
                      >
                        <FileSpreadsheet className="w-4 h-4 mr-2" />
                        Export WBS
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {/* Search */}
              <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#525252]" />
                <Input
                  type="text"
                  placeholder="Search activities by name or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 bg-white border-2 border-[#e0e0e0] rounded-none h-12 text-base focus:border-[#0f62fe]"
                />
              </div>

              {/* Activities Grid */}
              {filteredActivities.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    {paginatedActivities.map(activity => (
                      <Card 
                        key={activity.id} 
                        className="p-5 rounded-none border-l-4 border-l-[#0f62fe] hover:shadow-lg hover:border-l-[#0353e9] transition-all cursor-pointer bg-white"
                        onClick={() => openReviewModal(activity)}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="text-base font-semibold text-[#161616] flex-1 pr-2" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                            {activity.name}
                          </h3>
                          <Badge className="bg-[#e0e0e0] text-[#161616] rounded-sm text-xs px-2 py-1 flex-shrink-0">
                            {activity.category}
                          </Badge>
                        </div>

                        <div className="space-y-2 mb-4">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-[#525252] flex items-center gap-1.5">
                              <Clock className="w-4 h-4" />
                              Duration
                            </span>
                            <span className="font-medium text-[#161616]">{activity.duration} weeks</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-[#525252] flex items-center gap-1.5">
                              <Users className="w-4 h-4" />
                              Hours
                            </span>
                            <span className="font-medium text-[#161616]">{activity.hours}h</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-[#525252] flex items-center gap-1.5">
                              <DollarSign className="w-4 h-4" />
                              Cost
                            </span>
                            <span className="font-medium text-[#161616]">${activity.cost.toLocaleString()}</span>
                          </div>
                        </div>

                        <Button
                          className="w-full bg-[#0f62fe] hover:bg-[#0353e9] text-white rounded-none h-9"
                          onClick={(e) => {
                            e.stopPropagation();
                            openReviewModal(activity);
                          }}
                        >
                          View Details
                        </Button>
                      </Card>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 0 && (
                    <div className="flex items-center justify-center gap-2 mb-8">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        className="rounded-sm border-2 border-[#e0e0e0] h-9 px-3"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      
                      <div className="flex items-center gap-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                          <Button
                            key={page}
                            variant={currentPage === page ? "default" : "outline"}
                            size="sm"
                            onClick={() => setCurrentPage(page)}
                            className={`rounded-sm h-9 w-9 ${
                              currentPage === page 
                                ? 'bg-[#0f62fe] text-white hover:bg-[#0353e9]' 
                                : 'border-2 border-[#e0e0e0] hover:bg-[#f4f4f4]'
                            }`}
                          >
                            {page}
                          </Button>
                        ))}
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                        className="rounded-sm border-2 border-[#e0e0e0] h-9 px-3"
                      >
                        <ChevronRightIcon className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <Card className="p-12 rounded-none text-center bg-white mb-8">
                  <div className="text-[#525252]">
                    <Search className="w-12 h-12 mx-auto mb-4 text-[#0f62fe]" />
                    <p className="text-base mb-1 font-medium text-[#161616]">No activities found</p>
                    <p className="text-sm">Try adjusting your search criteria</p>
                  </div>
                </Card>
              )}

              {/* Solution Canvas Section - Row-based Layout */}
              <div className="border-t-4 border-t-[#0f62fe] bg-white rounded-sm">
                <div className="p-6 border-b border-[#e0e0e0] bg-[#f4f4f4]">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-semibold mb-1" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                        Solution Canvas
                      </h2>
                      <p className="text-sm text-[#525252]">
                        {selectedActivities.length === 0 
                          ? 'No activities added yet - review and add activities from above'
                          : `${selectedActivities.length} ${selectedActivities.length === 1 ? 'activity' : 'activities'} selected - drag to reorder`}
                      </p>
                    </div>
                    {selectedActivities.length > 0 && (
                      <Badge className="bg-[#0f62fe] text-white rounded-full px-4 py-2 text-base">
                        {selectedActivities.length}
                      </Badge>
                    )}
                  </div>
                </div>

                {selectedActivities.length > 0 ? (
                  <div className="p-6">
                    {/* Table Header */}
                    <div className="bg-[#f4f4f4] border-b-2 border-[#161616] mb-2">
                      <div className="grid grid-cols-12 gap-4 p-4 text-xs font-semibold text-[#161616] uppercase tracking-wide" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                        <div className="col-span-1 flex items-center justify-center">SL.No</div>
                        <div className="col-span-4">Activity Name</div>
                        <div className="col-span-2">Category</div>
                        <div className="col-span-1 text-center">Duration</div>
                        <div className="col-span-1 text-center">Hours</div>
                        <div className="col-span-2 text-center">Cost</div>
                        <div className="col-span-1 text-center">Actions</div>
                      </div>
                    </div>

                    {/* Activities Rows */}
                    <div className="space-y-2">
                      {selectedActivities.map((activity, index) => (
                        <div
                          key={activity.id}
                          className="bg-white border-2 border-[#e0e0e0] hover:border-[#0f62fe] hover:shadow-md transition-all cursor-move rounded-sm"
                          draggable
                          onDragStart={() => handleDragStart(index)}
                          onDragOver={(e) => handleDragOver(e, index)}
                          onDragEnd={handleDragEnd}
                          style={{
                            opacity: draggedIndex === index ? 0.5 : 1,
                          }}
                        >
                          <div className="grid grid-cols-12 gap-4 p-4 items-center">
                            {/* Order Number + Drag Handle */}
                            <div className="col-span-1 flex items-center justify-center gap-2">
                              <GripVertical className="w-5 h-5 text-[#525252]" />
                              <span className="w-7 h-7 rounded-full bg-[#0f62fe] text-white flex items-center justify-center text-sm font-semibold">
                                {index + 1}
                              </span>
                            </div>

                            {/* Activity Name */}
                            <div className="col-span-4">
                              <h4 className="text-sm font-semibold text-[#161616]" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                                {activity.name}
                              </h4>
                            </div>

                            {/* Category */}
                            <div className="col-span-2">
                              <Badge className="bg-[#e0e0e0] text-[#161616] rounded-sm text-xs px-2 py-1">
                                {activity.category}
                              </Badge>
                            </div>

                            {/* Duration */}
                            <div className="col-span-1 text-center">
                              <div className="flex flex-col items-center">
                                <Clock className="w-4 h-4 text-[#525252] mb-1" />
                                <span className="text-sm font-medium text-[#161616]">{activity.duration}w</span>
                              </div>
                            </div>

                            {/* Hours */}
                            <div className="col-span-1 text-center">
                              <div className="flex flex-col items-center">
                                <Users className="w-4 h-4 text-[#525252] mb-1" />
                                <span className="text-sm font-medium text-[#161616]">{activity.hours}h</span>
                              </div>
                            </div>

                            {/* Cost */}
                            <div className="col-span-2 text-center">
                              <div className="flex flex-col items-center">
                                <DollarSign className="w-4 h-4 text-[#525252] mb-1" />
                                <span className="text-sm font-medium text-[#161616]">${activity.cost.toLocaleString()}</span>
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="col-span-1 flex items-center justify-center gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => openStaffingModal(activity)}
                                className="text-[#0f62fe] hover:bg-[#e0f0ff] rounded-sm h-8 w-8 p-0"
                                title="Edit Staffing"
                              >
                                <Users className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeActivity(activity.id)}
                                className="text-[#da1e28] hover:bg-[#fff1f1] rounded-sm h-8 w-8 p-0"
                                title="Remove Activity"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Total Row */}
                    <div className="mt-4 bg-[#f4f4f4] border-2 border-[#0f62fe] rounded-sm">
                      <div className="grid grid-cols-12 gap-4 p-4 items-center">
                        <div className="col-span-7 text-right">
                          <span className="text-sm font-semibold text-[#161616] uppercase tracking-wide" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                            Total:
                          </span>
                        </div>
                        <div className="col-span-1 text-center">
                          <span className="text-base font-bold text-[#0f62fe]">{totals.weeks}w</span>
                        </div>
                        <div className="col-span-1 text-center">
                          <span className="text-base font-bold text-[#0f62fe]">{totals.hours}h</span>
                        </div>
                        <div className="col-span-2 text-center">
                          <span className="text-base font-bold text-[#0f62fe]">${totals.cost.toLocaleString()}</span>
                        </div>
                        <div className="col-span-1"></div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-12 text-center text-[#525252]">
                    <Plus className="w-16 h-16 mx-auto mb-4 text-[#e0e0e0]" />
                    <p className="text-base font-medium text-[#161616] mb-2">Canvas is empty</p>
                    <p className="text-sm">Review and add activities from above to build your solution</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center p-12">
              <div className="text-[#525252]">
                <div className="w-24 h-24 bg-[#e0e0e0] rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-3xl text-[#0f62fe] font-bold"><Trees className='w-16 h-16 '/></span>
                </div>
                <p className="text-lg mb-2 font-medium text-[#161616]">Select an offering to continue</p>
                <p className="text-sm">
                  {!selectedBrand 
                    ? 'Start by selecting a brand from the left panel'
                    : !selectedProduct 
                    ? 'Select a product to view available offerings'
                    : 'Select an offering to view its activities'}
                </p>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Review Activity Modal with Tabs */}
      <Dialog open={isReviewModalOpen} onOpenChange={setIsReviewModalOpen}>
        <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-hidden rounded-sm border-t-4 border-t-[#0f62fe]">
          <DialogHeader className="pb-4 border-b border-[#e0e0e0]">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <DialogTitle className="text-2xl mb-2" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                  {reviewingActivity?.name}
                </DialogTitle>
                <div className="flex items-center gap-4 text-sm">
                  <Badge className="bg-[#e0e0e0] text-[#161616] rounded-sm px-3 py-1">
                    {reviewingActivity?.category}
                  </Badge>
                  <span className="text-[#525252] flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {reviewingActivity?.duration} weeks
                  </span>
                  <span className="text-[#525252] flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {reviewingActivity?.hours}h
                  </span>
                  <span className="text-[#525252] flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    ${reviewingActivity?.cost.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </DialogHeader>
          
          {reviewingActivity && (
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col overflow-hidden">
              <TabsList className="w-full justify-start bg-[#f4f4f4] p-1 rounded-none h-auto flex-wrap">
                <TabsTrigger value="overview" className="rounded-sm data-[state=active]:bg-white px-4 py-2">
                  <Info className="w-4 h-4 mr-2" />
                  Overview
                </TabsTrigger>
                <TabsTrigger value="scope" className="rounded-sm data-[state=active]:bg-white px-4 py-2">
                  <Target className="w-4 h-4 mr-2" />
                  Scope
                </TabsTrigger>
                <TabsTrigger value="outcome" className="rounded-sm data-[state=active]:bg-white px-4 py-2">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Outcome
                </TabsTrigger>
                <TabsTrigger value="responsibilities" className="rounded-sm data-[state=active]:bg-white px-4 py-2">
                  <UserCheck className="w-4 h-4 mr-2" />
                  Responsibilities
                </TabsTrigger>
                <TabsTrigger value="assumptions" className="rounded-sm data-[state=active]:bg-white px-4 py-2">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  Assumptions
                </TabsTrigger>
                <TabsTrigger value="staffing" className="rounded-sm data-[state=active]:bg-white px-4 py-2">
                  <Users className="w-4 h-4 mr-2" />
                  Staffing
                </TabsTrigger>
              </TabsList>

              <div className="flex-1 overflow-y-auto py-6" style={{ maxHeight: 'calc(90vh - 280px)' }}>
                <TabsContent value="overview" className="m-0 space-y-6">
                  <div>
                    <h3 className="text-sm font-semibold text-[#161616] mb-3 uppercase tracking-wide" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                      Activity Summary
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <Card className="p-4 rounded-sm bg-[#f4f4f4]">
                        <div className="text-xs text-[#525252] mb-1">Category</div>
                        <div className="text-base font-semibold text-[#161616]">{reviewingActivity.category}</div>
                      </Card>
                      <Card className="p-4 rounded-sm bg-[#f4f4f4]">
                        <div className="text-xs text-[#525252] mb-1">Duration</div>
                        <div className="text-base font-semibold text-[#161616]">{reviewingActivity.duration} weeks</div>
                      </Card>
                      <Card className="p-4 rounded-sm bg-[#f4f4f4]">
                        <div className="text-xs text-[#525252] mb-1">Total Hours</div>
                        <div className="text-base font-semibold text-[#161616]">{reviewingActivity.hours}h</div>
                      </Card>
                      <Card className="p-4 rounded-sm bg-[#f4f4f4]">
                        <div className="text-xs text-[#525252] mb-1">Estimated Cost</div>
                        <div className="text-base font-semibold text-[#161616]">${reviewingActivity.cost.toLocaleString()}</div>
                      </Card>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-[#161616] mb-3 uppercase tracking-wide" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                      Quick Overview
                    </h3>
                    <div className="space-y-4">
                      <div className="bg-[#f4f4f4] p-4 rounded-sm">
                        <div className="flex items-start gap-3">
                          <Target className="w-5 h-5 text-[#0f62fe] mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="text-sm font-semibold text-[#161616] mb-1">Scope</h4>
                            <p className="text-sm text-[#525252] line-clamp-3">{reviewingActivity.scope}</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-[#f4f4f4] p-4 rounded-sm">
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-[#24a148] mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="text-sm font-semibold text-[#161616] mb-1">Expected Outcome</h4>
                            <p className="text-sm text-[#525252] line-clamp-3">{reviewingActivity.outcome}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="scope" className="m-0">
                  <div className="bg-[#f4f4f4] p-6 rounded-sm">
                    <h3 className="text-sm font-semibold text-[#161616] mb-4 uppercase tracking-wide flex items-center gap-2" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                      <Target className="w-5 h-5 text-[#0f62fe]" />
                      Scope of Work
                    </h3>
                    <p className="text-base text-[#161616] leading-relaxed whitespace-pre-line">
                      {reviewingActivity.scope}
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="outcome" className="m-0">
                  <div className="bg-[#f4f4f4] p-6 rounded-sm">
                    <h3 className="text-sm font-semibold text-[#161616] mb-4 uppercase tracking-wide flex items-center gap-2" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                      <CheckCircle className="w-5 h-5 text-[#24a148]" />
                      Expected Outcomes
                    </h3>
                    <p className="text-base text-[#161616] leading-relaxed whitespace-pre-line">
                      {reviewingActivity.outcome}
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="responsibilities" className="m-0">
                  <div className="bg-[#f4f4f4] p-6 rounded-sm">
                    <h3 className="text-sm font-semibold text-[#161616] mb-4 uppercase tracking-wide flex items-center gap-2" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                      <UserCheck className="w-5 h-5 text-[#8a3ffc]" />
                      Role Responsibilities
                    </h3>
                    <p className="text-base text-[#161616] leading-relaxed whitespace-pre-line">
                      {reviewingActivity.responsibilities}
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="assumptions" className="m-0">
                  <div className="bg-[#fff3cd] border-l-4 border-l-[#f1c21b] p-6 rounded-sm">
                    <h3 className="text-sm font-semibold text-[#161616] mb-4 uppercase tracking-wide flex items-center gap-2" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                      <AlertCircle className="w-5 h-5 text-[#f1c21b]" />
                      Key Assumptions
                    </h3>
                    <p className="text-base text-[#161616] leading-relaxed whitespace-pre-line">
                      {reviewingActivity.assumptions}
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="staffing" className="m-0">
                  <div className="bg-[#f4f4f4] p-6 rounded-sm">
                    <h3 className="text-sm font-semibold text-[#161616] mb-4 uppercase tracking-wide flex items-center gap-2" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                      <Users className="w-5 h-5 text-[#0f62fe]" />
                      Resource Requirements (Total: {reviewingActivity.hours}h)
                    </h3>
                    <div className="space-y-3">
                      {reviewingActivity.staffing && reviewingActivity.staffing.map((staff, index) => (
                        <div key={index} className="bg-white p-4 rounded-sm border border-[#e0e0e0]">
                          <div className="grid grid-cols-4 gap-4">
                            <div>
                              <div className="text-xs text-[#525252] mb-1">Role</div>
                              <div className="text-sm font-semibold text-[#161616]">{staff.role}</div>
                            </div>
                            <div>
                              <div className="text-xs text-[#525252] mb-1">Country</div>
                              <div className="text-sm font-semibold text-[#161616]">{staff.country}</div>
                            </div>
                            <div>
                              <div className="text-xs text-[#525252] mb-1">Band</div>
                              <div className="text-sm font-semibold text-[#0f62fe]">Band {staff.band}</div>
                            </div>
                            <div>
                              <div className="text-xs text-[#525252] mb-1">Hours</div>
                              <div className="text-sm font-semibold text-[#0f62fe]">{staff.hours}h</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          )}

          <DialogFooter className="gap-3 border-t border-[#e0e0e0] pt-4">
            <Button
              variant="outline"
              onClick={() => setIsReviewModalOpen(false)}
              className="rounded-sm border-2 border-[#161616] h-10 px-6"
            >
              Cancel
            </Button>
            <Button
              onClick={addActivityAfterReview}
              className="bg-[#0f62fe] hover:bg-[#0353e9] text-white rounded-sm h-10 px-6"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add to Canvas
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Staffing Modal */}
      <Dialog open={isStaffingModalOpen} onOpenChange={setIsStaffingModalOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-hidden rounded-sm border-t-4 border-t-[#0f62fe]">
          <DialogHeader className="pb-4 border-b border-[#e0e0e0]">
            <DialogTitle className="text-xl" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
              Edit Staffing Requirements
            </DialogTitle>
            {editingActivity && (
              <div className="flex items-center justify-between mt-2">
                <p className="text-sm text-[#525252]">
                  {editingActivity.name}
                </p>
                <div className="flex items-center gap-4">
                  <div className="text-sm">
                    <span className="text-[#525252]">Fixed Total: </span>
                    <span className="font-semibold text-[#0f62fe]">{fixedTotalHours}h</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-[#525252]">Current Total: </span>
                    <span className={`font-semibold ${calculateTotalHours(staffingData) === fixedTotalHours ? 'text-[#24a148]' : 'text-[#da1e28]'}`}>
                      {calculateTotalHours(staffingData)}h
                    </span>
                  </div>
                </div>
              </div>
            )}
          </DialogHeader>
          
          <div className="py-4 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 250px)' }}>
            <div className="mb-4 bg-[#e0f0ff] p-4 rounded-sm border-l-4 border-l-[#0f62fe]">
              <p className="text-sm text-[#161616] mb-2 font-semibold">
                Staffing Configuration Guidelines:
              </p>
              <ul className="text-sm text-[#525252] space-y-1 list-disc list-inside">
                <li>Total hours must equal {fixedTotalHours}h (fixed for this activity)</li>
                <li>You can change the country allocation between in-market and GDC India</li>
                <li>Band levels should remain consistent with skill requirements</li>
                <li>Add or remove staffing lines as needed while maintaining total hours</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              {staffingData.map((staff, index) => (
                <div key={index} className="bg-[#f4f4f4] p-4 rounded-sm border border-[#e0e0e0]">
                  <div className="grid grid-cols-12 gap-3 items-end">
                    <div className="col-span-3">
                      <Label htmlFor={`role-${index}`} className="text-xs text-[#525252] mb-1 block">
                        Role
                      </Label>
                      <Select 
                        value={staff.role} 
                        onValueChange={(value) => updateStaffingLine(index, 'role', value)}
                      >
                        <SelectTrigger className="w-full bg-white border-2 border-[#e0e0e0] rounded-sm h-9">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {staffingRoles.map(role => (
                            <SelectItem key={role} value={role}>{role}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="col-span-3">
                      <Label htmlFor={`country-${index}`} className="text-xs text-[#525252] mb-1 block">
                        Country
                      </Label>
                      <Select 
                        value={staff.country} 
                        onValueChange={(value) => updateStaffingLine(index, 'country', value)}
                      >
                        <SelectTrigger className="w-full bg-white border-2 border-[#e0e0e0] rounded-sm h-9">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {countries.map(country => (
                            <SelectItem key={country} value={country}>
                              {country}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="col-span-2">
                      <Label htmlFor={`band-${index}`} className="text-xs text-[#525252] mb-1 block">
                        Band
                      </Label>
                      <Select 
                        value={staff.band?.toString()} 
                        onValueChange={(value) => updateStaffingLine(index, 'band', value)}
                      >
                        <SelectTrigger className="w-full bg-white border-2 border-[#e0e0e0] rounded-sm h-9">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {bands.map(band => (
                            <SelectItem key={band} value={band.toString()}>
                              Band {band}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="col-span-3">
                      <Label htmlFor={`hours-${index}`} className="text-xs text-[#525252] mb-1 block">
                        Hours
                      </Label>
                      <Input
                        id={`hours-${index}`}
                        type="number"
                        min="0"
                        value={staff.hours}
                        onChange={(e) => updateStaffingLine(index, 'hours', e.target.value)}
                        className="w-full rounded-sm border-2 border-[#e0e0e0] h-9 focus:border-[#0f62fe]"
                      />
                    </div>

                    <div className="col-span-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeStaffingLine(index)}
                        className="text-[#da1e28] hover:bg-[#fff1f1] rounded-sm h-9 w-9 p-0"
                        title="Remove Line"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Button
              variant="outline"
              onClick={addStaffingLine}
              className="w-full mt-4 border-2 border-dashed border-[#0f62fe] text-[#0f62fe] hover:bg-[#e0f0ff] rounded-sm h-10"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Staffing Line
            </Button>

            {calculateTotalHours(staffingData) !== fixedTotalHours && (
              <div className="mt-4 bg-[#fff1f1] border-l-4 border-l-[#da1e28] p-4 rounded-sm">
                <p className="text-sm text-[#da1e28] font-semibold">
                  ⚠ Warning: Total hours ({calculateTotalHours(staffingData)}h) does not match the required {fixedTotalHours}h
                </p>
              </div>
            )}
          </div>

          <DialogFooter className="gap-3 border-t border-[#e0e0e0] pt-4">
            <Button
              variant="outline"
              onClick={() => setIsStaffingModalOpen(false)}
              className="rounded-sm border-2 border-[#161616] h-10 px-6"
            >
              Cancel
            </Button>
            <Button
              onClick={saveStaffingChanges}
              disabled={calculateTotalHours(staffingData) !== fixedTotalHours}
              className="bg-[#0f62fe] hover:bg-[#0353e9] text-white rounded-sm h-10 px-6 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
