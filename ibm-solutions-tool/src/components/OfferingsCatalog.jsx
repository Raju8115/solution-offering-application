// OfferingsCatalog.jsx

import { useState } from 'react';
import { Search, Filter, ArrowRight, ChevronLeft, ChevronRightIcon, ShoppingCart, ChevronRight, ChevronDown, Package, Info, ExternalLink, FileText, Target, CheckCircle, AlertCircle, Link as LinkIcon } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './ui/popover';

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

// Enhanced offerings with detailed information for drill-down
const mockOfferings = [
  {
    id: '1',
    title: 'Cloud Migration Accelerator',
    saasType: 'Professional Services',
    duration: '12 weeks',
    price: 450000,
    brand: 'IBM Cloud',
    stage: 'Migration',
    description: 'Comprehensive cloud migration solution with assessment and execution',
    scope: 'Full assessment of current infrastructure, migration planning, execution of workload migration to IBM Cloud, and post-migration optimization. Includes up to 50 applications and 200 VMs.',
    outcome: 'Successfully migrated infrastructure to IBM Cloud with improved performance, reduced operational costs by 30-40%, and enhanced scalability and reliability.',
    responsibilities: 'Client: Provide access to current infrastructure, assign technical liaison, approve migration windows. IBM: Conduct assessment, develop migration plan, execute migration, provide 30-day hypercare support.',
    assumptions: 'Client has necessary licenses, migration windows available during off-peak hours, no major application refactoring required, network connectivity established.',
    seismicLink: 'https://seismic.ibm.com/content/cloud-migration-accelerator',
    transactionMethod: 'Fixed Price - Milestone Based'
  },
  {
    id: '2',
    title: 'AI Strategy Workshop',
    saasType: 'Consulting',
    duration: '4 weeks',
    price: 125000,
    brand: 'IBM Watson',
    stage: 'Discovery',
    description: 'Strategic AI roadmap development and use case identification',
    scope: 'Collaborative workshops with stakeholders to identify AI opportunities, assess data readiness, prioritize use cases, and develop a comprehensive AI implementation roadmap.',
    outcome: 'Documented AI strategy with 5-10 prioritized use cases, ROI analysis, implementation timeline, and resource requirements. Clear path to AI adoption aligned with business objectives.',
    responsibilities: 'Client: Provide stakeholder participation (10-15 hours/week), share business challenges and data landscape. IBM: Facilitate workshops, conduct assessments, deliver strategic roadmap.',
    assumptions: 'Access to key stakeholders, basic understanding of AI concepts, willingness to share business metrics, data governance framework exists.',
    seismicLink: 'https://seismic.ibm.com/content/ai-strategy-workshop',
    transactionMethod: 'Time & Materials'
  },
  {
    id: '3',
    title: 'Data Platform Modernization',
    saasType: 'Implementation',
    duration: '16 weeks',
    price: 680000,
    brand: 'IBM Cloud Pak',
    stage: 'Transformation',
    description: 'Modern data platform built on Red Hat OpenShift',
    scope: 'Design and implement Cloud Pak for Data on Red Hat OpenShift, migrate existing data pipelines, establish data governance, integrate with existing systems, and train administration team.',
    outcome: 'Fully operational modern data platform with integrated AI/ML capabilities, self-service analytics, robust data governance, and 50% reduction in time-to-insight.',
    responsibilities: 'Client: Provide infrastructure, assign platform owners, participate in design sessions. IBM: Platform architecture, implementation, data migration, knowledge transfer, 60-day support.',
    assumptions: 'OpenShift cluster available or provisioned, data sources documented, network connectivity established, client team available for training.',
    seismicLink: 'https://seismic.ibm.com/content/data-platform-modernization',
    transactionMethod: 'Fixed Price - Phased Delivery'
  },
  {
    id: '4',
    title: 'Security Assessment',
    saasType: 'Professional Services',
    duration: '6 weeks',
    price: 220000,
    brand: 'IBM Security',
    stage: 'Assessment',
    description: 'Comprehensive security posture evaluation and recommendations',
    scope: 'Complete security assessment including vulnerability scanning, penetration testing, policy review, compliance gap analysis, and detailed remediation roadmap covering network, application, and data security.',
    outcome: 'Comprehensive security report with risk scoring, prioritized vulnerabilities, compliance gaps, and actionable remediation plan. Executive summary with board-ready recommendations.',
    responsibilities: 'Client: Provide system access, security documentation, compliance requirements. IBM: Conduct assessment, perform testing, analyze findings, deliver recommendations and remediation roadmap.',
    assumptions: 'Testing windows approved, systems accessible, no critical ongoing incidents, security team available for interviews and validation.',
    seismicLink: 'https://seismic.ibm.com/content/security-assessment',
    transactionMethod: 'Fixed Price'
  },
  {
    id: '5',
    title: 'SAP S/4HANA Migration',
    saasType: 'Implementation',
    duration: '24 weeks',
    price: 1200000,
    brand: 'IBM Consulting',
    stage: 'Migration',
    description: 'End-to-end SAP migration with best practices',
    scope: 'Complete SAP S/4HANA migration including current state assessment, solution design, data migration, custom code remediation, integration, testing, cutover, and hypercare support.',
    outcome: 'Successfully migrated SAP environment to S/4HANA with improved performance, real-time analytics, simplified architecture, and position for future innovation.',
    responsibilities: 'Client: Business process owners, functional leads, approve design decisions, user acceptance testing. IBM: Project management, technical implementation, data migration, testing, training, go-live support.',
    assumptions: 'SAP licenses procured, adequate infrastructure, dedicated client team, migration window approved, key users available for UAT.',
    seismicLink: 'https://seismic.ibm.com/content/sap-s4hana-migration',
    transactionMethod: 'Fixed Price - Milestone Based'
  },
  {
    id: '6',
    title: 'DevOps Transformation',
    saasType: 'Consulting',
    duration: '8 weeks',
    price: 285000,
    brand: 'IBM Cloud',
    stage: 'Transformation',
    description: 'DevOps culture and toolchain implementation',
    scope: 'Assessment of current development practices, design DevOps toolchain, implement CI/CD pipelines, establish GitOps workflows, container strategy, and coaching on DevOps practices.',
    outcome: 'Operational DevOps toolchain with automated CI/CD, 70% reduction in deployment time, improved quality through automated testing, and team trained on DevOps methodologies.',
    responsibilities: 'Client: Development and operations teams participation, approve toolchain design, provide application access. IBM: Assess current state, design solution, implement toolchain, coach teams.',
    assumptions: 'Team availability for training, management support for cultural change, applications suitable for automation, basic version control in place.',
    seismicLink: 'https://seismic.ibm.com/content/devops-transformation',
    transactionMethod: 'Time & Materials'
  },
  {
    id: '7',
    title: 'Hybrid Cloud Strategy',
    saasType: 'Consulting',
    duration: '6 weeks',
    price: 175000,
    brand: 'IBM Cloud',
    stage: 'Discovery',
    description: 'Strategic hybrid cloud architecture and roadmap',
    scope: 'Multi-cloud assessment, workload placement strategy, cloud economics analysis, governance framework, and comprehensive hybrid cloud roadmap.',
    outcome: 'Hybrid cloud strategy document with workload placement decisions, cost optimization opportunities, governance model, and 3-year implementation roadmap.',
    responsibilities: 'Client: IT leadership engagement, current architecture documentation, business requirements. IBM: Architecture workshops, technical assessment, strategy development.',
    assumptions: 'Access to architectural documentation, stakeholder availability, business drivers documented, budget constraints defined.',
    seismicLink: 'https://seismic.ibm.com/content/hybrid-cloud-strategy',
    transactionMethod: 'Fixed Price'
  },
  {
    id: '8',
    title: 'API Management Platform',
    saasType: 'Implementation',
    duration: '10 weeks',
    price: 380000,
    brand: 'IBM Cloud Pak',
    stage: 'Implementation',
    description: 'Enterprise API management and monetization',
    scope: 'Design and deploy API management platform, migrate existing APIs, implement security policies, developer portal, analytics, and API monetization framework.',
    outcome: 'Enterprise-grade API platform with centralized management, security, analytics, and developer portal. Foundation for API economy and partner ecosystem.',
    responsibilities: 'Client: API inventory, security requirements, developer portal content. IBM: Platform deployment, API migration, policy configuration, portal setup, training.',
    assumptions: 'Existing APIs documented, infrastructure ready, security policies defined, developer portal requirements gathered.',
    seismicLink: 'https://seismic.ibm.com/content/api-management',
    transactionMethod: 'Fixed Price - Phased Delivery'
  },
  {
    id: '9',
    title: 'Zero Trust Security',
    saasType: 'Implementation',
    duration: '14 weeks',
    price: 520000,
    brand: 'IBM Security',
    stage: 'Transformation',
    description: 'Zero trust architecture implementation',
    scope: 'Zero trust assessment, architecture design, identity and access management, micro-segmentation, continuous verification, and security monitoring implementation.',
    outcome: 'Zero trust security framework with identity-centric access, micro-segmentation, continuous monitoring, and 60% reduction in attack surface.',
    responsibilities: 'Client: Network access, identity systems, approve architecture changes. IBM: Design zero trust architecture, implement controls, configure monitoring, knowledge transfer.',
    assumptions: 'Network visibility available, identity provider accessible, ability to implement network changes, security team for ongoing management.',
    seismicLink: 'https://seismic.ibm.com/content/zero-trust-security',
    transactionMethod: 'Fixed Price - Milestone Based'
  },
  {
    id: '10',
    title: 'Quantum-Safe Cryptography',
    saasType: 'Professional Services',
    duration: '8 weeks',
    price: 295000,
    brand: 'IBM Security',
    stage: 'Assessment',
    description: 'Quantum computing readiness and cryptography migration',
    scope: 'Cryptographic inventory, quantum risk assessment, quantum-safe algorithm selection, migration roadmap, and proof of concept implementation.',
    outcome: 'Quantum readiness report with cryptographic inventory, risk assessment, recommended quantum-safe algorithms, and phased migration plan.',
    responsibilities: 'Client: Cryptographic asset inventory, security team engagement, POC environment. IBM: Assessment, algorithm recommendations, POC implementation, roadmap delivery.',
    assumptions: 'Cryptographic systems documented, access to encryption implementations, test environment available, long-term data protection requirements defined.',
    seismicLink: 'https://seismic.ibm.com/content/quantum-safe-crypto',
    transactionMethod: 'Time & Materials'
  },
  {
    id: '11',
    title: 'Sustainability Analytics Platform',
    saasType: 'Implementation',
    duration: '12 weeks',
    price: 425000,
    brand: 'IBM Consulting',
    stage: 'Implementation',
    description: 'ESG data collection and reporting platform',
    scope: 'Deploy sustainability data platform, integrate with operational systems, establish ESG metrics, implement reporting dashboards, and carbon footprint analytics.',
    outcome: 'Operational sustainability platform with automated ESG data collection, carbon tracking, regulatory reporting, and stakeholder dashboards.',
    responsibilities: 'Client: ESG data sources, sustainability goals, regulatory requirements. IBM: Platform implementation, data integration, dashboard development, user training.',
    assumptions: 'Data sources identified, sustainability metrics defined, stakeholder reporting requirements documented, data quality acceptable.',
    seismicLink: 'https://seismic.ibm.com/content/sustainability-analytics',
    transactionMethod: 'Fixed Price'
  },
  {
    id: '12',
    title: 'Blockchain Supply Chain',
    saasType: 'Implementation',
    duration: '18 weeks',
    price: 750000,
    brand: 'IBM Consulting',
    stage: 'Transformation',
    description: 'Blockchain-based supply chain transparency',
    scope: 'Design blockchain network, onboard supply chain partners, implement smart contracts, integrate with existing systems, and deploy tracking interfaces.',
    outcome: 'Operational blockchain network with partner ecosystem, end-to-end supply chain visibility, automated compliance, and provenance tracking.',
    responsibilities: 'Client: Partner coordination, business rules, system integrations. IBM: Blockchain architecture, smart contract development, partner onboarding, system integration.',
    assumptions: 'Partner willingness to participate, supply chain processes documented, integration points identified, governance model agreed.',
    seismicLink: 'https://seismic.ibm.com/content/blockchain-supply-chain',
    transactionMethod: 'Fixed Price - Milestone Based'
  },
];

// Detailed Information Popover Component
function OfferingDetailPopover({ offering }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="rounded-none hover:bg-[#e0e0e0] p-2"
        >
          <Info className="w-4 h-4 text-[#0f62fe]" />
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-[500px] rounded-none border-2 border-[#0f62fe] p-0 bg-white"
        align="start"
        side="right"
      >
        <div className="bg-[#0f62fe] text-white p-4">
          <h3 className="font-semibold text-lg" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
            {offering.title}
          </h3>
          <p className="text-sm opacity-90 mt-1">{offering.saasType}</p>
        </div>

        <div className="p-4 space-y-4 max-h-[500px] overflow-y-auto">
          {/* Scope */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-[#0f62fe]" />
              <h4 className="font-semibold text-[#161616]" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                Scope
              </h4>
            </div>
            <p className="text-sm text-[#525252] leading-relaxed pl-6">
              {offering.scope}
            </p>
          </div>

          {/* Outcome */}
          <div className="border-t border-[#e0e0e0] pt-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-4 h-4 text-[#24a148]" />
              <h4 className="font-semibold text-[#161616]" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                Expected Outcome
              </h4>
            </div>
            <p className="text-sm text-[#525252] leading-relaxed pl-6">
              {offering.outcome}
            </p>
          </div>

          {/* Responsibilities */}
          <div className="border-t border-[#e0e0e0] pt-4">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-4 h-4 text-[#0f62fe]" />
              <h4 className="font-semibold text-[#161616]" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                Responsibilities
              </h4>
            </div>
            <p className="text-sm text-[#525252] leading-relaxed pl-6">
              {offering.responsibilities}
            </p>
          </div>

          {/* Assumptions */}
          <div className="border-t border-[#e0e0e0] pt-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-4 h-4 text-[#f1c21b]" />
              <h4 className="font-semibold text-[#161616]" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                Assumptions
              </h4>
            </div>
            <p className="text-sm text-[#525252] leading-relaxed pl-6">
              {offering.assumptions}
            </p>
          </div>

          {/* Transaction Method */}
          <div className="border-t border-[#e0e0e0] pt-4">
            <div className="flex items-center gap-2 mb-2">
              <Package className="w-4 h-4 text-[#0f62fe]" />
              <h4 className="font-semibold text-[#161616]" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                Transaction Method
              </h4>
            </div>
            <Badge className="ml-6 bg-[#e0e0e0] text-[#161616] rounded-none">
              {offering.transactionMethod}
            </Badge>
          </div>

          {/* Seismic Link */}
          <div className="border-t border-[#e0e0e0] pt-4">
            <div className="flex items-center gap-2 mb-2">
              <LinkIcon className="w-4 h-4 text-[#0f62fe]" />
              <h4 className="font-semibold text-[#161616]" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                Content Resources
              </h4>
            </div>
            <a
              href={offering.seismicLink}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-6 text-sm text-[#0f62fe] hover:underline flex items-center gap-1"
            >
              View in Seismic <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        <div className="bg-[#f4f4f4] p-3 border-t border-[#e0e0e0]">
          <div className="flex justify-between text-sm">
            <span className="text-[#525252]">Duration:</span>
            <span className="text-[#161616] font-semibold">{offering.duration}</span>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <span className="text-[#525252]">Price:</span>
            <span className="text-[#161616] font-semibold">
              ${typeof offering.price === 'number' ? offering.price.toLocaleString() : offering.price}
            </span>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export function OfferingsCatalog({ onNavigate, onLogout, userRole }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('title');
  const [showFilters, setShowFilters] = useState(true);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // 3x3 grid

  // For Deal Maker role
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedDealMakerProducts, setSelectedDealMakerProducts] = useState([]);
  const [expandedProducts, setExpandedProducts] = useState([]);
  const [selectedTELOfferings, setSelectedTELOfferings] = useState([]);

  const brands = Object.keys(brandsData);
  // Extract unique product types from offerings
  const products = [...new Set(mockOfferings.map(offering => offering.saasType))];

  const isDealMaker = userRole === 'deal-maker';
  const isBrandSalesOrRenewal = userRole === 'brand-sales-and-renewal-rep';
  const showViewDetailsButton = userRole === 'seller' || userRole === 'architect';

  // Get products for selected brand
  const availableProducts = selectedBrand ? brandsData[selectedBrand].products : [];

  const handleProductSelection = (productId, checked) => {
    if (checked) {
      setSelectedDealMakerProducts([...selectedDealMakerProducts, productId]);
      setExpandedProducts([...expandedProducts, productId]);
    } else {
      setSelectedDealMakerProducts(selectedDealMakerProducts.filter(p => p !== productId));
      setExpandedProducts(expandedProducts.filter(p => p !== productId));
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

  const getAllTELOfferings = () => {
    return selectedDealMakerProducts.flatMap(productId => telOfferingsData[productId] || []);
  };

  const selectedTELDetails = getAllTELOfferings().filter(tel => 
    selectedTELOfferings.includes(tel.id)
  );
  const totalPrice = selectedTELDetails.reduce((sum, tel) => sum + tel.price, 0);

  const handleAddToELA = () => {
    console.log('Adding to ELA:', selectedTELDetails);
    alert(`Adding ${selectedTELDetails.length} TEL offerings to ELA. Total: $${totalPrice.toLocaleString()}`);
  };

  // Filter and sort offerings
  const filteredOfferings = mockOfferings.filter(offering => {
    const matchesSearch = offering.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      offering.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(offering.brand);
    const matchesProduct = selectedProducts.length === 0 || selectedProducts.includes(offering.saasType);
    return matchesSearch && matchesBrand && matchesProduct;
  });

  // Sort offerings
  const sortedOfferings = [...filteredOfferings].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return a.price - b.price;
      case 'duration':
        return parseInt(a.duration) - parseInt(b.duration);
      case 'title':
      default:
        return a.title.localeCompare(b.title);
    }
  });

  // Pagination logic
  const totalPages = Math.ceil(sortedOfferings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOfferings = sortedOfferings.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  const handleFilterChange = () => {
    setCurrentPage(1);
  };

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('ellipsis');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('ellipsis');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('ellipsis');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('ellipsis');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  // DEAL MAKER VIEW
  if (isDealMaker) {
    return (
      <div className="min-h-screen bg-[#f4f4f4]">
        <div className="flex min-h-screen">
          <aside className={`${showFilters ? 'w-64' : 'w-0'} bg-white border-r border-[#e0e0e0] transition-all duration-300 overflow-hidden min-h-screen`}>
            <div className="p-4 h-full">
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
                      setSelectedDealMakerProducts([]);
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
                      <span className="font-semibold text-[#161616]">{selectedDealMakerProducts.length}</span> product{selectedDealMakerProducts.length !== 1 ? 's' : ''} selected
                    </div>
                    <div className="text-[#525252]">
                      <span className="font-semibold text-[#161616]">{selectedTELOfferings.length}</span> TEL offering{selectedTELOfferings.length !== 1 ? 's' : ''} selected
                    </div>
                  </div>
                </div>

                <div className={`space-y-4 ${selectedTELOfferings.length > 0 ? 'mb-[400px]' : 'mb-6'}`}>
                  {availableProducts.map(product => {
                    const isExpanded = expandedProducts.includes(product.id);
                    const isSelected = selectedDealMakerProducts.includes(product.id);
                    const productTEL = telOfferingsData[product.id] || [];
                    
                    return (
                      <Card key={product.id} className="bg-white rounded-none border-l-4 border-l-[#0f62fe]">
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
  return (
    <div className="min-h-screen bg-[#f4f4f4]">
      <div className="flex">
        {/* Left Sidebar - Filters */}
        <aside className={`${showFilters ? 'w-64' : 'w-0'} bg-white border-r border-[#e0e0e0] transition-all duration-300 overflow-hidden min-h-screen`}>
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
                        handleFilterChange();
                      }}
                    />
                    <Label htmlFor={`brand-${brand}`} className="text-[#161616] cursor-pointer">
                      {brand}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Product Filter */}
            <div className="mb-6">
              <h3 className="mb-3 text-[#161616] font-semibold" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                Product Type
              </h3>
              <div className="space-y-2">
                {products.map(product => (
                  <div key={product} className="flex items-center gap-2">
                    <Checkbox
                      id={`product-${product}`}
                      checked={selectedProducts.includes(product)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedProducts([...selectedProducts, product]);
                        } else {
                          setSelectedProducts(selectedProducts.filter(p => p !== product));
                        }
                        handleFilterChange();
                      }}
                    />
                    <Label htmlFor={`product-${product}`} className="text-[#161616] cursor-pointer">
                      {product}
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
                setSelectedProducts([]);
                handleFilterChange();
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
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    handleFilterChange();
                  }}
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

            <div className="mt-3 flex items-center justify-between">
              <div className="text-[#525252]">
                Showing {startIndex + 1}-{Math.min(endIndex, sortedOfferings.length)} of {sortedOfferings.length} offerings
              </div>
              {totalPages > 1 && (
                <div className="text-[#525252] text-sm">
                  Page {currentPage} of {totalPages}
                </div>
              )}
            </div>
          </div>

          {/* Offerings Grid */}
          {currentOfferings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {currentOfferings.map(offering => (
                <Card key={offering.id} className="bg-white rounded-none border-l-4 border-l-[#0f62fe] hover:shadow-lg transition-shadow">
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-[#161616] flex-1 font-semibold" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                        {offering.title}
                      </h3>
                      {isBrandSalesOrRenewal && <OfferingDetailPopover offering={offering} />}
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex gap-2 flex-wrap">
                        <Badge className="bg-[#e0e0e0] text-[#161616] rounded-none">
                          {offering.saasType}
                        </Badge>
                        <Badge className="bg-[#d0e2ff] text-[#0f62fe] rounded-none">
                          {offering.brand}
                        </Badge>
                      </div>
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
                      {isBrandSalesOrRenewal && offering.transactionMethod && (
                        <div className="flex justify-between pt-2 border-t border-[#e0e0e0]">
                          <span>Transaction:</span>
                          <span className="text-[#161616] text-xs">{offering.transactionMethod}</span>
                        </div>
                      )}
                    </div>

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
          ) : (
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <Search className="w-16 h-16 mx-auto mb-4 text-[#525252]" />
                <h3 className="text-xl text-[#161616] mb-2 font-semibold" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                  No offerings found
                </h3>
                <p className="text-[#525252]">Try adjusting your filters or search query</p>
              </div>
            </div>
          )}

          {/* Enhanced Pagination */}
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
        </main>
      </div>
    </div>
  );
}