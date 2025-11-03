# API Requirements Documentation

## Frontend Application - IBM Solution Builder

## 1. Authentication & User Management

### POST /api/v1/auth/login

**Purpose:** Authenticate user and receive JWT token

**Request Body:**
```json
{
  "username": "user@ibm.com",
  "password": "password123",
  "role": "seller"
}
```

**Response:**
```json
{
  "access_token": "jwt_token_here",
  "token_type": "bearer",
  "user": {
    "id": "user_id",
    "username": "user@ibm.com",
    "email": "user@ibm.com",
    "full_name": "User Name",
    "role": "seller",
    "department": "Sales",
    "status": "active"
  }
}
```

**Status Codes:**
- `200`: Success
- `401`: Invalid credentials
- `422`: Validation error

---

### POST /api/v1/auth/register

**Purpose:** Register a new user account

**Request Body:**
```json
{
  "username": "newuser@ibm.com",
  "email": "newuser@ibm.com",
  "password": "SecurePassword123",
  "full_name": "New User",
  "role": "seller",
  "department": "Sales"
}
```

**Response:**
```json
{
  "id": "user_id",
  "username": "newuser@ibm.com",
  "email": "newuser@ibm.com",
  "full_name": "New User",
  "role": "seller",
  "department": "Sales",
  "status": "active",
  "created_at": "2025-11-01T10:00:00Z"
}
```

**Status Codes:**
- `201`: User created successfully
- `400`: User already exists
- `422`: Validation error

---

### GET /api/v1/users/me

**Purpose:** Get current authenticated user profile

**Request Headers:**
```
Authorization: Bearer {jwt_token}
```

**Response:**
```json
{
  "id": "user_id",
  "username": "user@ibm.com",
  "email": "user@ibm.com",
  "full_name": "User Name",
  "role": "seller",
  "department": "Sales",
  "phone": "+1 (555) 123-4567",
  "location": "New York, NY",
  "status": "active",
  "created_at": "2022-01-15T10:00:00Z",
  "last_login": "2025-10-22T14:30:00Z"
}
```

**Status Codes:**
- `200`: Success
- `401`: Unauthorized

---

### PUT /api/v1/users/me

**Purpose:** Update current user profile

**Request Headers:**
```
Authorization: Bearer {jwt_token}
```

**Request Body:**
```json
{
  "full_name": "Updated Name",
  "email": "newemail@ibm.com",
  "phone": "+1 (555) 987-6543",
  "location": "Boston, MA",
  "department": "Sales Engineering"
}
```

**Response:**
```json
{
  "id": "user_id",
  "username": "user@ibm.com",
  "email": "newemail@ibm.com",
  "full_name": "Updated Name",
  "role": "seller",
  "department": "Sales Engineering",
  "phone": "+1 (555) 987-6543",
  "location": "Boston, MA",
  "status": "active",
  "updated_at": "2025-11-01T10:00:00Z"
}
```

**Status Codes:**
- `200`: Success
- `401`: Unauthorized
- `422`: Validation error

---

## 2. Countries API

### GET /api/v1/countries

**Purpose:** Get all available countries

**Request Headers:**
```
Authorization: Bearer {jwt_token}
```

**Response:**
```json
{
  "countries": [
    {
      "id": "1",
      "name": "United States",
      "code": "US",
      "region": "North America",
      "status": "active"
    },
    {
      "id": "2",
      "name": "United Kingdom",
      "code": "UK",
      "region": "Europe",
      "status": "active"
    },
    {
      "id": "3",
      "name": "Germany",
      "code": "DE",
      "region": "Europe",
      "status": "active"
    }
  ],
  "total": 3
}
```

**Status Codes:**
- `200`: Success
- `401`: Unauthorized

---

### GET /api/v1/countries/{id}

**Purpose:** Get specific country by ID

**Path Parameter:**
- `id` (required): Country identifier

**Request Headers:**
```
Authorization: Bearer {jwt_token}
```

**Response:**
```json
{
  "id": "1",
  "name": "United States",
  "code": "US",
  "region": "North America",
  "currency": "USD",
  "timezone": "America/New_York",
  "status": "active",
  "created_at": "2025-01-01T00:00:00Z"
}
```

**Status Codes:**
- `200`: Success
- `404`: Country not found
- `401`: Unauthorized

---

## 3. Brands API

### GET /api/v1/brands?country_id={id}

**Purpose:** Get all brands for a specific country

**Query Parameters:**
- `country_id` (required): Country identifier

**Request Headers:**
```
Authorization: Bearer {jwt_token}
```

**Example Request:**
```
GET /api/v1/brands?country_id=1
```

**Response:**
```json
{
  "brands": [
    {
      "id": "1",
      "name": "IBM Cloud",
      "description": "Cloud computing services and infrastructure",
      "country_id": "1",
      "logo_url": "https://cdn.ibm.com/logos/cloud.png",
      "status": "active"
    },
    {
      "id": "2",
      "name": "IBM Watson",
      "description": "AI and machine learning platform",
      "country_id": "1",
      "logo_url": "https://cdn.ibm.com/logos/watson.png",
      "status": "active"
    },
    {
      "id": "3",
      "name": "IBM Security",
      "description": "Enterprise security solutions",
      "country_id": "1",
      "logo_url": "https://cdn.ibm.com/logos/security.png",
      "status": "active"
    }
  ],
  "total": 3,
  "country": {
    "id": "1",
    "name": "United States",
    "code": "US"
  }
}
```

**Status Codes:**
- `200`: Success
- `404`: Country not found
- `401`: Unauthorized
- `422`: Validation error

---

### GET /api/v1/brands/{id}

**Purpose:** Get specific brand by ID

**Path Parameter:**
- `id` (required): Brand identifier

**Request Headers:**
```
Authorization: Bearer {jwt_token}
```

**Response:**
```json
{
  "id": "1",
  "name": "IBM Cloud",
  "description": "Cloud computing services and infrastructure",
  "country_id": "1",
  "country_name": "United States",
  "logo_url": "https://cdn.ibm.com/logos/cloud.png",
  "website": "https://www.ibm.com/cloud",
  "contact_email": "cloud@ibm.com",
  "status": "active",
  "products_count": 12,
  "created_at": "2025-01-01T00:00:00Z"
}
```

**Status Codes:**
- `200`: Success
- `404`: Brand not found
- `401`: Unauthorized

---

## 4. Products API

### GET /api/v1/products?brand_id={id}

**Purpose:** Get all products for a specific brand

**Query Parameters:**
- `brand_id` (required): Brand identifier

**Request Headers:**
```
Authorization: Bearer {jwt_token}
```

**Example Request:**
```
GET /api/v1/products?brand_id=1
```

**Response:**
```json
{
  "products": [
    {
      "id": "1",
      "name": "Cloud Migration Services",
      "description": "Migrate workloads to IBM Cloud",
      "brand_id": "1",
      "brand_name": "IBM Cloud",
      "category": "Professional Services",
      "status": "active"
    },
    {
      "id": "2",
      "name": "Cloud Infrastructure",
      "description": "Scalable cloud infrastructure solutions",
      "brand_id": "1",
      "brand_name": "IBM Cloud",
      "category": "Infrastructure",
      "status": "active"
    },
    {
      "id": "3",
      "name": "Cloud Security",
      "description": "Comprehensive cloud security services",
      "brand_id": "1",
      "brand_name": "IBM Cloud",
      "category": "Security",
      "status": "active"
    }
  ],
  "total": 3,
  "brand": {
    "id": "1",
    "name": "IBM Cloud"
  }
}
```

**Status Codes:**
- `200`: Success
- `404`: Brand not found
- `401`: Unauthorized
- `422`: Validation error

---

### GET /api/v1/products/{id}

**Purpose:** Get specific product by ID

**Path Parameter:**
- `id` (required): Product identifier

**Request Headers:**
```
Authorization: Bearer {jwt_token}
```

**Response:**
```json
{
  "id": "1",
  "name": "Cloud Migration Services",
  "description": "Migrate workloads to IBM Cloud",
  "brand_id": "1",
  "brand_name": "IBM Cloud",
  "category": "Professional Services",
  "detailed_description": "Comprehensive cloud migration services...",
  "features": [
    "Assessment and planning",
    "Migration execution",
    "Post-migration support"
  ],
  "target_industries": ["Financial Services", "Healthcare", "Retail"],
  "offerings_count": 8,
  "status": "active",
  "created_at": "2025-01-01T00:00:00Z"
}
```

**Status Codes:**
- `200`: Success
- `404`: Product not found
- `401`: Unauthorized

---

## 5. Offerings API

### GET /api/v1/offerings?product_id={id}

**Purpose:** Get all offerings for a specific product

**Query Parameters:**
- `product_id` (required): Product identifier
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20)
- `saas_type` (optional): Filter by SaaS type
- `stage` (optional): Filter by stage (Discovery, Assessment, Migration, Transformation)
- `min_price` (optional): Minimum price filter
- `max_price` (optional): Maximum price filter

**Request Headers:**
```
Authorization: Bearer {jwt_token}
```

**Example Request:**
```
GET /api/v1/offerings?product_id=1&page=1&limit=10
```

**Response:**
```json
{
  "offerings": [
    {
      "id": "1",
      "part_number": "TEL-CMS-001",
      "title": "Cloud Migration Accelerator",
      "saas_type": "Professional Services",
      "product_id": "1",
      "product_name": "Cloud Migration Services",
      "brand_name": "IBM Cloud",
      "duration": "12 weeks",
      "price": 450000,
      "sale_price": 405000,
      "margin": 18,
      "margin_percentage": "18%",
      "industry": "Financial Services",
      "stage": "Migration",
      "description": "Comprehensive cloud migration solution",
      "scope": "Full assessment, migration planning, execution, and post-migration support",
      "outcome": "Successfully migrated infrastructure to IBM Cloud",
      "responsibilities": "Client: Provide access to systems; IBM: Execute migration",
      "assumptions": "Client has necessary licenses and infrastructure access",
      "seismic_link": "https://seismic.ibm.com/cloud-migration-accelerator",
      "transaction_method": "Fixed Price - Milestone Based",
      "status": "active"
    },
    {
      "id": "2",
      "part_number": "TEL-CMS-002",
      "title": "Cloud Assessment & Strategy",
      "saas_type": "Consulting",
      "product_id": "1",
      "product_name": "Cloud Migration Services",
      "brand_name": "IBM Cloud",
      "duration": "4 weeks",
      "price": 85000,
      "sale_price": 76500,
      "margin": 15,
      "margin_percentage": "15%",
      "industry": "Cross-Industry",
      "stage": "Assessment",
      "description": "Comprehensive cloud readiness assessment",
      "scope": "Infrastructure analysis, application assessment, cost modeling",
      "outcome": "Detailed cloud migration roadmap and strategy",
      "responsibilities": "Client: Provide system access; IBM: Conduct assessment",
      "assumptions": "All applications and systems are accessible",
      "seismic_link": "https://seismic.ibm.com/cloud-assessment",
      "transaction_method": "Fixed Price",
      "status": "active"
    }
  ],
  "total": 2,
  "page": 1,
  "limit": 10,
  "total_pages": 1,
  "product": {
    "id": "1",
    "name": "Cloud Migration Services",
    "brand_name": "IBM Cloud"
  }
}
```

**Status Codes:**
- `200`: Success
- `404`: Product not found
- `401`: Unauthorized
- `422`: Validation error

---

### GET /api/v1/offerings/{id}

**Purpose:** Get specific offering by ID with detailed information

**Path Parameter:**
- `id` (required): Offering identifier

**Request Headers:**
```
Authorization: Bearer {jwt_token}
```

**Response:**
```json
{
  "id": "1",
  "part_number": "TEL-CMS-001",
  "title": "Cloud Migration Accelerator",
  "saas_type": "Professional Services",
  "product_id": "1",
  "product_name": "Cloud Migration Services",
  "brand_id": "1",
  "brand_name": "IBM Cloud",
  "country_id": "1",
  "country_name": "United States",
  "duration": "12 weeks",
  "price": 450000,
  "sale_price": 405000,
  "margin": 18,
  "margin_percentage": "18%",
  "currency": "USD",
  "industry": "Financial Services",
  "stage": "Migration",
  "description": "Comprehensive cloud migration solution designed for enterprise clients",
  "detailed_description": "This offering provides end-to-end cloud migration services...",
  "scope": "Full assessment, migration planning, execution, and post-migration support",
  "outcome": "Successfully migrated infrastructure to IBM Cloud with minimal downtime",
  "deliverables": [
    "Migration assessment report",
    "Migration execution plan",
    "Post-migration support documentation"
  ],
  "responsibilities": "Client: Provide access to systems and resources; IBM: Execute migration and provide expertise",
  "assumptions": "Client has necessary licenses and infrastructure access; Systems are accessible",
  "prerequisites": [
    "Active IBM Cloud account",
    "System access credentials",
    "Stakeholder availability"
  ],
  "seismic_link": "https://seismic.ibm.com/cloud-migration-accelerator",
  "transaction_method": "Fixed Price - Milestone Based",
  "payment_terms": "30% upfront, 40% at midpoint, 30% upon completion",
  "activities_count": 12,
  "status": "active",
  "created_at": "2025-01-01T00:00:00Z",
  "updated_at": "2025-10-15T14:30:00Z"
}
```

**Status Codes:**
- `200`: Success
- `404`: Offering not found
- `401`: Unauthorized

---

### GET /api/v1/offerings/search/?q={query}

**Purpose:** Search offerings by keyword

**Query Parameters:**
- `q` (required): Search query string
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20)
- `brand_id` (optional): Filter by brand
- `saas_type` (optional): Filter by SaaS type
- `stage` (optional): Filter by stage
- `min_price` (optional): Minimum price
- `max_price` (optional): Maximum price

**Request Headers:**
```
Authorization: Bearer {jwt_token}
```

**Example Request:**
```
GET /api/v1/offerings/search/?q=cloud migration&limit=5
```

**Response:**
```json
{
  "results": [
    {
      "id": "1",
      "part_number": "TEL-CMS-001",
      "title": "Cloud Migration Accelerator",
      "saas_type": "Professional Services",
      "product_name": "Cloud Migration Services",
      "brand_name": "IBM Cloud",
      "duration": "12 weeks",
      "price": 450000,
      "sale_price": 405000,
      "margin_percentage": "18%",
      "industry": "Financial Services",
      "stage": "Migration",
      "description": "Comprehensive cloud migration solution",
      "match_score": 0.95
    },
    {
      "id": "3",
      "part_number": "TEL-CMS-003",
      "title": "Hybrid Cloud Migration",
      "saas_type": "Professional Services",
      "product_name": "Cloud Migration Services",
      "brand_name": "IBM Cloud",
      "duration": "16 weeks",
      "price": 580000,
      "sale_price": 522000,
      "margin_percentage": "20%",
      "industry": "Healthcare",
      "stage": "Migration",
      "description": "Hybrid cloud migration for complex environments",
      "match_score": 0.87
    }
  ],
  "total": 2,
  "page": 1,
  "limit": 5,
  "total_pages": 1,
  "query": "cloud migration"
}
```

**Status Codes:**
- `200`: Success
- `401`: Unauthorized
- `422`: Validation error (missing query)

---

## 6. Activities API

### GET /api/v1/activities?offering_id={id}

**Purpose:** Get all activities for a specific offering

**Query Parameters:**
- `offering_id` (required): Offering identifier
- `type` (optional): Filter by activity type (Design, Implementation, Training, etc.)
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 50)

**Request Headers:**
```
Authorization: Bearer {jwt_token}
```

**Example Request:**
```
GET /api/v1/activities?offering_id=1&type=Design
```

**Response:**
```json
{
  "activities": [
    {
      "id": "1",
      "name": "Infrastructure Assessment",
      "type": "Design",
      "offering_id": "1",
      "offering_title": "Cloud Migration Accelerator",
      "duration": "2 weeks",
      "duration_hours": 80,
      "price": 25000,
      "currency": "USD",
      "description": "Comprehensive infrastructure assessment to identify migration requirements",
      "detailed_description": "Conduct thorough analysis of existing infrastructure...",
      "scope": "Review current infrastructure, applications, and dependencies",
      "outcome": "Detailed assessment report with recommendations",
      "deliverables": [
        "Infrastructure assessment report",
        "Application inventory",
        "Dependency mapping"
      ],
      "responsibilities": "Client: Provide system access; IBM: Conduct assessment and analysis",
      "assumptions": "All systems are accessible and documented",
      "prerequisites": [
        "System access credentials",
        "Architecture documentation"
      ],
      "resources_required": [
        "2x Cloud Architects",
        "1x Infrastructure Specialist"
      ],
      "sequence_order": 1,
      "is_mandatory": true,
      "status": "active"
    },
    {
      "id": "2",
      "name": "Migration Planning Workshop",
      "type": "Design",
      "offering_id": "1",
      "offering_title": "Cloud Migration Accelerator",
      "duration": "1 week",
      "duration_hours": 40,
      "price": 15000,
      "currency": "USD",
      "description": "Collaborative workshop to develop migration strategy",
      "detailed_description": "Work with stakeholders to create detailed migration plan...",
      "scope": "Define migration approach, timeline, and success criteria",
      "outcome": "Comprehensive migration execution plan",
      "deliverables": [
        "Migration roadmap",
        "Risk assessment",
        "Communication plan"
      ],
      "responsibilities": "Client: Participate in workshops; IBM: Facilitate and document",
      "assumptions": "Key stakeholders are available for workshops",
      "prerequisites": [
        "Completed infrastructure assessment",
        "Stakeholder availability"
      ],
      "resources_required": [
        "1x Migration Lead",
        "1x Project Manager"
      ],
      "sequence_order": 2,
      "is_mandatory": true,
      "status": "active"
    },
    {
      "id": "3",
      "name": "Application Migration Execution",
      "type": "Implementation",
      "offering_id": "1",
      "offering_title": "Cloud Migration Accelerator",
      "duration": "6 weeks",
      "duration_hours": 240,
      "price": 180000,
      "currency": "USD",
      "description": "Execute application migration to IBM Cloud",
      "detailed_description": "Migrate applications based on approved migration plan...",
      "scope": "Migrate applications, configure cloud resources, validate functionality",
      "outcome": "Applications successfully running in IBM Cloud",
      "deliverables": [
        "Migrated applications",
        "Configuration documentation",
        "Testing reports"
      ],
      "responsibilities": "Client: Provide support and validation; IBM: Execute migration",
      "assumptions": "Migration plan is approved; Cloud environment is provisioned",
      "prerequisites": [
        "Approved migration plan",
        "Cloud environment ready",
        "Backup procedures in place"
      ],
      "resources_required": [
        "3x Cloud Engineers",
        "2x Application Specialists",
        "1x Migration Lead"
      ],
      "sequence_order": 3,
      "is_mandatory": true,
      "status": "active"
    },
    {
      "id": "4",
      "name": "User Training",
      "type": "Training",
      "offering_id": "1",
      "offering_title": "Cloud Migration Accelerator",
      "duration": "1 week",
      "duration_hours": 40,
      "price": 12000,
      "currency": "USD",
      "description": "Train users on new cloud environment",
      "detailed_description": "Provide comprehensive training to end users...",
      "scope": "Conduct training sessions, provide documentation, Q&A support",
      "outcome": "Users proficient in cloud environment operations",
      "deliverables": [
        "Training materials",
        "User guides",
        "Recorded sessions"
      ],
      "responsibilities": "Client: Ensure user attendance; IBM: Deliver training",
      "assumptions": "Users are available for training sessions",
      "prerequisites": [
        "Applications migrated",
        "Training environment available"
      ],
      "resources_required": [
        "2x Training Specialists"
      ],
      "sequence_order": 4,
      "is_mandatory": false,
      "status": "active"
    }
  ],
  "total": 4,
  "page": 1,
  "limit": 50,
  "total_pages": 1,
  "offering": {
    "id": "1",
    "title": "Cloud Migration Accelerator",
    "total_price": 232000
  },
  "summary": {
    "total_activities": 4,
    "mandatory_activities": 3,
    "optional_activities": 1,
    "total_duration_weeks": 10,
    "total_price": 232000,
    "by_type": {
      "Design": 2,
      "Implementation": 1,
      "Training": 1
    }
  }
}
```

**Status Codes:**
- `200`: Success
- `404`: Offering not found
- `401`: Unauthorized
- `422`: Validation error

---

### GET /api/v1/activities/{id}

**Purpose:** Get specific activity by ID

**Path Parameter:**
- `id` (required): Activity identifier

**Request Headers:**
```
Authorization: Bearer {jwt_token}
```

**Response:**
```json
{
  "id": "1",
  "name": "Infrastructure Assessment",
  "type": "Design",
  "offering_id": "1",
  "offering_title": "Cloud Migration Accelerator",
  "product_name": "Cloud Migration Services",
  "brand_name": "IBM Cloud",
  "duration": "2 weeks",
  "duration_hours": 80,
  "price": 25000,
  "currency": "USD",
  "description": "Comprehensive infrastructure assessment to identify migration requirements",
  "detailed_description": "Conduct thorough analysis of existing infrastructure, applications, and dependencies to create a comprehensive migration plan",
  "scope": "Review current infrastructure, applications, and dependencies; Identify migration candidates; Assess risks and dependencies",
  "outcome": "Detailed assessment report with recommendations and migration roadmap",
  "deliverables": [
    "Infrastructure assessment report",
    "Application inventory and classification",
    "Dependency mapping and analysis",
    "Migration recommendations"
  ],
  "responsibilities": "Client: Provide system access and documentation; IBM: Conduct comprehensive assessment and analysis",
  "assumptions": "All systems are accessible and documented; Stakeholders available for interviews",
  "prerequisites": [
    "System access credentials provided",
    "Current architecture documentation available",
    "Stakeholder availability confirmed"
  ],
  "resources_required": [
    "2x Senior Cloud Architects",
    "1x Infrastructure Specialist",
    "1x Business Analyst"
  ],
  "estimated_effort_hours": 80,
  "sequence_order": 1,
  "is_mandatory": true,
  "dependencies": [],
  "risk_factors": [
    "Incomplete documentation",
    "Limited system access",
    "Stakeholder unavailability"
  ],
  "success_criteria": [
    "Complete application inventory",
    "Identified migration approach for all applications",
    "Approved migration roadmap"
  ],
  "part_numbers": ["PART-ASSESS-001"],
  "status": "active",
  "created_at": "2025-01-01T00:00:00Z",
  "updated_at": "2025-10-15T14:30:00Z"
}
```

**Status Codes:**
- `200`: Success
- `404`: Activity not found
- `401`: Unauthorized

---

## 7. Solutions API (Solution Builder)

### POST /api/v1/solutions

**Purpose:** Create a new custom solution

**Request Headers:**
```
Authorization: Bearer {jwt_token}
```

**Request Body:**
```json
{
  "name": "Custom Enterprise Cloud Solution",
  "description": "Tailored cloud migration solution for enterprise client",
  "country_id": "1",
  "brand_id": "1",
  "product_id": "1",
  "offering_id": "1",
  "selected_activities": [
    {
      "activity_id": "1",
      "is_included": true,
      "custom_price": null,
      "custom_duration": null,
      "notes": ""
    },
    {
      "activity_id": "2",
      "is_included": true,
      "custom_price": null,
      "custom_duration": null,
      "notes": ""
    },
    {
      "activity_id": "3",
      "is_included": true,
      "custom_price": 170000,
      "custom_duration": "5 weeks",
      "notes": "Reduced scope for initial phase"
    },
    {
      "activity_id": "4",
      "is_included": false,
      "custom_price": null,
      "custom_duration": null,
      "notes": "Client will handle training internally"
    }
  ],
  "client_name": "Acme Corporation",
  "client_industry": "Financial Services",
  "deal_value": 210000,
  "notes": "Initial phase of multi-year cloud transformation",
  "custom_terms": {
    "payment_schedule": "40% upfront, 30% at milestone 1, 30% upon completion",
    "support_period": "90 days post-migration",
    "additional_services": []
  }
}
```

**Response:**
```json
{
  "id": "sol-123",
  "name": "Custom Enterprise Cloud Solution",
  "description": "Tailored cloud migration solution for enterprise client",
  "status": "draft",
  "country_id": "1",
  "country_name": "United States",
  "brand_id": "1",
  "brand_name": "IBM Cloud",
  "product_id": "1",
  "product_name": "Cloud Migration Services",
  "offering_id": "1",
  "offering_title": "Cloud Migration Accelerator",
  "client_name": "Acme Corporation",
  "client_industry": "Financial Services",
  "selected_activities": [
    {
      "activity_id": "1",
      "activity_name": "Infrastructure Assessment",
      "type": "Design",
      "original_price": 25000,
      "custom_price": null,
      "final_price": 25000,
      "original_duration": "2 weeks",
      "custom_duration": null,
      "final_duration": "2 weeks",
      "is_included": true,
      "notes": ""
    },
    {
      "activity_id": "2",
      "activity_name": "Migration Planning Workshop",
      "type": "Design",
      "original_price": 15000,
      "custom_price": null,
      "final_price": 15000,
      "original_duration": "1 week",
      "custom_duration": null,
      "final_duration": "1 week",
      "is_included": true,
      "notes": ""
    },
    {
      "activity_id": "3",
      "activity_name": "Application Migration Execution",
      "type": "Implementation",
      "original_price": 180000,
      "custom_price": 170000,
      "final_price": 170000,
      "original_duration": "6 weeks",
      "custom_duration": "5 weeks",
      "final_duration": "5 weeks",
      "is_included": true,
      "notes": "Reduced scope for initial phase"
    }
  ],
  "total_activities": 3,
  "total_price": 210000,
  "original_price": 220000,
  "savings": 10000,
  "total_duration": "8 weeks",
  "deal_value": 210000,
  "notes": "Initial phase of multi-year cloud transformation",
  "custom_terms": {
    "payment_schedule": "40% upfront, 30% at milestone 1, 30% upon completion",
    "support_period": "90 days post-migration",
    "additional_services": []
  },
  "created_by": "user_id",
  "created_by_name": "User Name",
  "created_at": "2025-11-01T10:00:00Z",
  "updated_at": "2025-11-01T10:00:00Z",
  "version": 1
}
```

**Status Codes:**
- `201`: Solution created successfully
- `400`: Invalid request
- `401`: Unauthorized
- `422`: Validation error

---

### GET /api/v1/solutions

**Purpose:** Get all solutions for current user

**Query Parameters:**
- `status` (optional): Filter by status (draft, submitted, approved, rejected)
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20)
- `sort_by` (optional): Sort field (created_at, updated_at, name, total_price)
- `sort_order` (optional): Sort order (asc, desc)
- `search` (optional): Search by solution name or client name

**Request Headers:**
```
Authorization: Bearer {jwt_token}
```

**Example Request:**
```
GET /api/v1/solutions?status=draft&page=1&limit=10&sort_by=updated_at&sort_order=desc
```

**Response:**
```json
{
  "solutions": [
    {
      "id": "sol-123",
      "name": "Custom Enterprise Cloud Solution",
      "description": "Tailored cloud migration solution for enterprise client",
      "status": "draft",
      "brand_name": "IBM Cloud",
      "product_name": "Cloud Migration Services",
      "offering_title": "Cloud Migration Accelerator",
      "client_name": "Acme Corporation",
      "client_industry": "Financial Services",
      "total_activities": 3,
      "total_price": 210000,
      "deal_value": 210000,
      "created_at": "2025-11-01T10:00:00Z",
      "updated_at": "2025-11-01T15:30:00Z",
      "created_by_name": "User Name"
    },
    {
      "id": "sol-124",
      "name": "Healthcare Cloud Transformation",
      "description": "Cloud migration for healthcare provider",
      "status": "draft",
      "brand_name": "IBM Cloud",
      "product_name": "Cloud Migration Services",
      "offering_title": "Hybrid Cloud Migration",
      "client_name": "HealthCare Plus",
      "client_industry": "Healthcare",
      "total_activities": 5,
      "total_price": 380000,
      "deal_value": 380000,
      "created_at": "2025-10-28T14:20:00Z",
      "updated_at": "2025-10-30T09:15:00Z",
      "created_by_name": "User Name"
    }
  ],
  "total": 2,
  "page": 1,
  "limit": 10,
  "total_pages": 1,
  "summary": {
    "total_solutions": 2,
    "by_status": {
      "draft": 2,
      "submitted": 0,
      "approved": 0,
      "rejected": 0
    },
    "total_deal_value": 590000
  }
}
```

**Status Codes:**
- `200`: Success
- `401`: Unauthorized

---

### GET /api/v1/solutions/{id}

**Purpose:** Get detailed solution by ID

**Path Parameter:**
- `id` (required): Solution identifier

**Request Headers:**
```
Authorization: Bearer {jwt_token}
```

**Response:**
```json
{
  "id": "sol-123",
  "name": "Custom Enterprise Cloud Solution",
  "description": "Tailored cloud migration solution for enterprise client",
  "status": "draft",
  "country_id": "1",
  "country_name": "United States",
  "brand_id": "1",
  "brand_name": "IBM Cloud",
  "product_id": "1",
  "product_name": "Cloud Migration Services",
  "offering_id": "1",
  "offering_title": "Cloud Migration Accelerator",
  "offering_description": "Comprehensive cloud migration solution",
  "client_name": "Acme Corporation",
  "client_industry": "Financial Services",
  "client_contact": {
    "name": "John Doe",
    "email": "john.doe@acme.com",
    "phone": "+1 (555) 234-5678"
  },
  "selected_activities": [
    {
      "activity_id": "1",
      "activity_name": "Infrastructure Assessment",
      "type": "Design",
      "description": "Comprehensive infrastructure assessment",
      "scope": "Review current infrastructure, applications, and dependencies",
      "outcome": "Detailed assessment report with recommendations",
      "deliverables": [
        "Infrastructure assessment report",
        "Application inventory",
        "Dependency mapping"
      ],
      "original_price": 25000,
      "custom_price": null,
      "final_price": 25000,
      "original_duration": "2 weeks",
      "custom_duration": null,
      "final_duration": "2 weeks",
      "is_included": true,
      "is_mandatory": true,
      "sequence_order": 1,
      "notes": ""
    },
    {
      "activity_id": "2",
      "activity_name": "Migration Planning Workshop",
      "type": "Design",
      "description": "Collaborative workshop to develop migration strategy",
      "scope": "Define migration approach, timeline, and success criteria",
      "outcome": "Comprehensive migration execution plan",
      "deliverables": [
        "Migration roadmap",
        "Risk assessment",
        "Communication plan"
      ],
      "original_price": 15000,
      "custom_price": null,
      "final_price": 15000,
      "original_duration": "1 week",
      "custom_duration": null,
      "final_duration": "1 week",
      "is_included": true,
      "is_mandatory": true,
      "sequence_order": 2,
      "notes": ""
    },
    {
      "activity_id": "3",
      "activity_name": "Application Migration Execution",
      "type": "Implementation",
      "description": "Execute application migration to IBM Cloud",
      "scope": "Migrate applications, configure cloud resources, validate functionality",
      "outcome": "Applications successfully running in IBM Cloud",
      "deliverables": [
        "Migrated applications",
        "Configuration documentation",
        "Testing reports"
      ],
      "original_price": 180000,
      "custom_price": 170000,
      "final_price": 170000,
      "original_duration": "6 weeks",
      "custom_duration": "5 weeks",
      "final_duration": "5 weeks",
      "is_included": true,
      "is_mandatory": true,
      "sequence_order": 3,
      "notes": "Reduced scope for initial phase"
    }
  ],
  "excluded_activities": [
    {
      "activity_id": "4",
      "activity_name": "User Training",
      "type": "Training",
      "original_price": 12000,
      "notes": "Client will handle training internally"
    }
  ],
  "total_activities": 3,
  "excluded_activities_count": 1,
  "total_price": 210000,
  "original_price": 220000,
  "savings": 10000,
  "total_duration": "8 weeks",
  "deal_value": 210000,
  "pricing_breakdown": {
    "by_type": {
      "Design": 40000,
      "Implementation": 170000
    },
    "by_activity": [
      {
        "name": "Infrastructure Assessment",
        "price": 25000,
        "percentage": 11.9
      },
      {
        "name": "Migration Planning Workshop",
        "price": 15000,
        "percentage": 7.1
      },
      {
        "name": "Application Migration Execution",
        "price": 170000,
        "percentage": 81.0
      }
    ]
  },
  "notes": "Initial phase of multi-year cloud transformation",
  "custom_terms": {
    "payment_schedule": "40% upfront, 30% at milestone 1, 30% upon completion",
    "support_period": "90 days post-migration",
    "warranty": "Standard warranty applies",
    "additional_services": []
  },
  "milestones": [
    {
      "name": "Assessment Complete",
      "due_date": "Week 2",
      "payment_percentage": 40
    },
    {
      "name": "Migration 50% Complete",
      "due_date": "Week 5",
      "payment_percentage": 30
    },
    {
      "name": "Project Complete",
      "due_date": "Week 8",
      "payment_percentage": 30
    }
  ],
  "created_by": "user_id",
  "created_by_name": "User Name",
  "created_by_email": "user@ibm.com",
  "created_at": "2025-11-01T10:00:00Z",
  "updated_at": "2025-11-01T15:30:00Z",
  "version": 1,
  "revision_history": []
}
```

**Status Codes:**
- `200`: Success
- `404`: Solution not found
- `401`: Unauthorized
- `403`: Forbidden (not solution owner)

---

### PUT /api/v1/solutions/{id}

**Purpose:** Update existing solution

**Path Parameter:**
- `id` (required): Solution identifier

**Request Headers:**
```
Authorization: Bearer {jwt_token}
```

**Request Body:**
```json
{
  "name": "Updated Solution Name",
  "description": "Updated description",
  "selected_activities": [
    {
      "activity_id": "1",
      "is_included": true,
      "custom_price": null,
      "custom_duration": null,
      "notes": ""
    },
    {
      "activity_id": "2",
      "is_included": true,
      "custom_price": null,
      "custom_duration": null,
      "notes": ""
    },
    {
      "activity_id": "3",
      "is_included": true,
      "custom_price": 165000,
      "custom_duration": "4 weeks",
      "notes": "Further scope reduction"
    }
  ],
  "client_name": "Acme Corporation",
  "deal_value": 205000,
  "notes": "Updated solution notes",
  "custom_terms": {
    "payment_schedule": "50% upfront, 50% upon completion",
    "support_period": "60 days post-migration"
  },
  "status": "draft"
}
```

**Response:**
```json
{
  "id": "sol-123",
  "name": "Updated Solution Name",
  "description": "Updated description",
  "status": "draft",
  "total_price": 205000,
  "updated_at": "2025-11-01T16:00:00Z",
  "version": 2
}
```

**Status Codes:**
- `200`: Solution updated successfully
- `404`: Solution not found
- `401`: Unauthorized
- `403`: Forbidden (not solution owner)
- `422`: Validation error

---

### DELETE /api/v1/solutions/{id}

**Purpose:** Delete solution

**Path Parameter:**
- `id` (required): Solution identifier

**Request Headers:**
```
Authorization: Bearer {jwt_token}
```

**Response:**
```json
{
  "message": "Solution deleted successfully",
  "id": "sol-123"
}
```

**Status Codes:**
- `200`: Solution deleted successfully
- `404`: Solution not found
- `401`: Unauthorized
- `403`: Forbidden (not solution owner or solution not in draft status)

---

## 8. Search API

### GET /api/v1/offerings/search/?q={query}

**Purpose:** Global search for offerings

**Query Parameters:**
- `q` (required): Search query
- `page` (optional): Page number
- `limit` (optional): Items per page
- `brand_id` (optional): Filter by brand
- `product_id` (optional): Filter by product
- `saas_type` (optional): Filter by SaaS type
- `stage` (optional): Filter by stage
- `min_price` (optional): Minimum price
- `max_price` (optional): Maximum price
- `industry` (optional): Filter by industry

**Request Headers:**
```
Authorization: Bearer {jwt_token}
```

**Example Request:**
```
GET /api/v1/offerings/search/?q=assessment&brand_id=1&min_price=50000
```

**Response:**
```json
{
  "results": [
    {
      "id": "2",
      "part_number": "TEL-CMS-002",
      "title": "Cloud Assessment & Strategy",
      "saas_type": "Consulting",
      "product_name": "Cloud Migration Services",
      "brand_name": "IBM Cloud",
      "price": 85000,
      "sale_price": 76500,
      "duration": "4 weeks",
      "industry": "Cross-Industry",
      "stage": "Assessment",
      "description": "Comprehensive cloud readiness assessment",
      "match_score": 0.95,
      "match_fields": ["title", "description", "stage"]
    }
  ],
  "total": 1,
  "page": 1,
  "limit": 20,
  "total_pages": 1,
  "query": "assessment",
  "filters_applied": {
    "brand_id": "1",
    "min_price": 50000
  }
}
```

**Status Codes:**
- `200`: Success
- `401`: Unauthorized
- `422`: Validation error

---

## 9. API Summary Table

| Endpoint | Method | Purpose | Auth Required |
|----------|--------|---------|---------------|
| `/api/v1/auth/login` | POST | User login | No |
| `/api/v1/auth/register` | POST | User registration | No |
| `/api/v1/users/me` | GET | Get user profile | Yes |
| `/api/v1/users/me` | PUT | Update user profile | Yes |
| `/api/v1/countries` | GET | Get all countries | Yes |
| `/api/v1/countries/{id}` | GET | Get country by ID | Yes |
| `/api/v1/brands` | GET | Get brands by country | Yes |
| `/api/v1/brands/{id}` | GET | Get brand by ID | Yes |
| `/api/v1/products` | GET | Get products by brand | Yes |
| `/api/v1/products/{id}` | GET | Get product by ID | Yes |
| `/api/v1/offerings` | GET | Get offerings by product | Yes |
| `/api/v1/offerings/{id}` | GET | Get offering by ID | Yes |
| `/api/v1/offerings/search/` | GET | Search offerings | Yes |
| `/api/v1/activities` | GET | Get activities by offering | Yes |
| `/api/v1/activities/{id}` | GET | Get activity by ID | Yes |
| `/api/v1/solutions` | POST | Create solution | Yes |
| `/api/v1/solutions` | GET | Get user solutions | Yes |
| `/api/v1/solutions/{id}` | GET | Get solution by ID | Yes |
| `/api/v1/solutions/{id}` | PUT | Update solution | Yes |
| `/api/v1/solutions/{id}` | DELETE | Delete solution | Yes |

---

### Solution Builder Workflow

**Typical flow for creating a solution:**

1. `GET /api/v1/countries` - Select country
2. `GET /api/v1/brands?country_id={id}` - Select brand
3. `GET /api/v1/products?brand_id={id}` - Select product
4. `GET /api/v1/offerings?product_id={id}` - Select offering
5. `GET /api/v1/activities?offering_id={id}` - View activities
6. `POST /api/v1/solutions` - Create custom solution
7. `GET /api/v1/solutions/{id}` - Review solution
8. `PUT /api/v1/solutions/{id}` - Update if needed
