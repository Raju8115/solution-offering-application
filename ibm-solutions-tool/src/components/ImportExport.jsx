import { useState } from 'react';
import { Upload, Download, CheckCircle2, AlertCircle, FileSpreadsheet } from 'lucide-react';
// import { CarbonHeader } from './CarbonHeader';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

export function ImportExport({ onNavigate, onLogout, userRole }) {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);

  const mockPreviewData = [
    { id: 1, name: 'Cloud Migration Package', type: 'Professional Services', brand: 'IBM Cloud', price: '$450,000', status: 'Valid' },
    { id: 2, name: 'AI Strategy Workshop', type: 'Consulting', brand: 'IBM Watson', price: '$125,000', status: 'Valid' },
    { id: 3, name: 'Data Platform Setup', type: 'Implementation', brand: '', price: '$680,000', status: 'Missing Brand' },
  ];

  const handleFileUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setUploadComplete(true);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

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
        currentPage="import-export"
      /> */}

      <div className="p-6">
        <h1 className="mb-6" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
          Import & Export Data
        </h1>

        <Tabs defaultValue="import" className="bg-white">
          <TabsList className="w-full justify-start border-b border-[#e0e0e0] bg-white rounded-none h-12">
            <TabsTrigger 
              value="import" 
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-[#0f62fe] data-[state=active]:bg-transparent"
              style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}
            >
              Import
            </TabsTrigger>
            <TabsTrigger 
              value="export" 
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-[#0f62fe] data-[state=active]:bg-transparent"
              style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}
            >
              Export
            </TabsTrigger>
          </TabsList>

          {/* Import Tab */}
          <TabsContent value="import" className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Upload Section */}
              <Card className="p-6 rounded-none border-l-4 border-l-[#0f62fe]">
                <h2 className="mb-4" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                  Upload Spreadsheet
                </h2>
                <p className="text-[#525252] mb-4">
                  Upload an Excel file (.xlsx or .xls) containing offerings, activities, or resource data.
                </p>

                <div className="border-2 border-dashed border-[#e0e0e0] rounded-none p-8 text-center mb-4">
                  <FileSpreadsheet className="w-12 h-12 mx-auto mb-3 text-[#0f62fe]" />
                  <p className="text-[#161616] mb-2">Drop your file here or click to browse</p>
                  <p className="text-[#525252] mb-4">Supported formats: .xlsx, .xls</p>
                  <input
                    type="file"
                    accept=".xlsx,.xls"
                    className="hidden"
                    id="file-upload"
                    onChange={handleFileUpload}
                  />
                  <label htmlFor="file-upload">
                    <Button
                      className="bg-[#0f62fe] hover:bg-[#0353e9] text-white rounded-none"
                      onClick={() => document.getElementById('file-upload')?.click()}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Select File
                    </Button>
                  </label>
                </div>

                {isUploading && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[#161616]">Uploading...</span>
                      <span className="text-[#525252]">{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} className="h-2" />
                  </div>
                )}

                {uploadComplete && (
                  <div className="flex items-center gap-2 text-[#24a148] mb-4">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>File uploaded successfully</span>
                  </div>
                )}
              </Card>

              {/* Instructions */}
              <Card className="p-6 rounded-none bg-[#f4f4f4]">
                <h2 className="mb-4" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                  Import Instructions
                </h2>
                <div className="space-y-3 text-[#161616]">
                  <div>
                    <h3 className="mb-1" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                      Required Columns
                    </h3>
                    <ul className="text-[#525252] space-y-1 ml-4">
                      <li>• Name/Title (required)</li>
                      <li>• Type/Category (required)</li>
                      <li>• Brand (required for offerings)</li>
                      <li>• Price/Rate (required)</li>
                      <li>• Duration/Hours (optional)</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="mb-1" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                      Data Format
                    </h3>
                    <ul className="text-[#525252] space-y-1 ml-4">
                      <li>• Use first row for column headers</li>
                      <li>• Price format: $XXX,XXX or numeric</li>
                      <li>• Dates: MM/DD/YYYY format</li>
                      <li>• Max file size: 10MB</li>
                    </ul>
                  </div>

                  <div className="pt-3 border-t border-[#e0e0e0]">
                    <Button variant="ghost" className="text-[#0f62fe] rounded-none p-0">
                      Download template file
                    </Button>
                  </div>
                </div>
              </Card>
            </div>

            {/* Preview Section */}
            {uploadComplete && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                    Preview & Validation
                  </h2>
                  <div className="flex gap-2">
                    <Button variant="ghost" className="rounded-none">
                      Cancel
                    </Button>
                    <Button className="bg-[#0f62fe] hover:bg-[#0353e9] text-white rounded-none">
                      Confirm Import
                    </Button>
                  </div>
                </div>

                <Card className="p-4 rounded-none mb-4 bg-[#e5f6ff] border-l-4 border-l-[#0f62fe]">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-[#0f62fe] mt-0.5" />
                    <div>
                      <p className="text-[#161616] mb-1">3 rows parsed, 2 valid, 1 with warnings</p>
                      <p className="text-[#525252]">Review warnings before confirming import</p>
                    </div>
                  </div>
                </Card>

                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-[#e0e0e0] hover:bg-[#e0e0e0]">
                        <TableHead className="text-[#161616]">Row</TableHead>
                        <TableHead className="text-[#161616]">Name</TableHead>
                        <TableHead className="text-[#161616]">Type</TableHead>
                        <TableHead className="text-[#161616]">Brand</TableHead>
                        <TableHead className="text-[#161616]">Price</TableHead>
                        <TableHead className="text-[#161616]">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockPreviewData.map((row) => (
                        <TableRow key={row.id} className="hover:bg-[#f4f4f4]">
                          <TableCell>{row.id}</TableCell>
                          <TableCell className="text-[#161616]">{row.name}</TableCell>
                          <TableCell>{row.type}</TableCell>
                          <TableCell>{row.brand || <span className="text-[#da1e28]">Missing</span>}</TableCell>
                          <TableCell>{row.price}</TableCell>
                          <TableCell>
                            <Badge className={`rounded-none ${
                              row.status === 'Valid' 
                                ? 'bg-[#24a148] text-white' 
                                : 'bg-[#f1c21b] text-[#161616]'
                            }`}>
                              {row.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}
          </TabsContent>

          {/* Export Tab */}
          <TabsContent value="export" className="p-6">
            <h2 className="mb-6" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
              Export Data to Excel
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card className="p-6 rounded-none border-l-4 border-l-[#0f62fe] hover:shadow-lg transition-shadow">
                <h3 className="mb-2" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                  Offerings
                </h3>
                <p className="text-[#525252] mb-4">
                  Export all offerings with complete details, pricing, and metadata.
                </p>
                <Button className="w-full bg-[#0f62fe] hover:bg-[#0353e9] text-white rounded-none">
                  <Download className="w-4 h-4 mr-2" />
                  Export Offerings
                </Button>
              </Card>

              <Card className="p-6 rounded-none border-l-4 border-l-[#8a3ffc] hover:shadow-lg transition-shadow">
                <h3 className="mb-2" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                  Activities
                </h3>
                <p className="text-[#525252] mb-4">
                  Export activity library with categories, hours, and rates.
                </p>
                <Button className="w-full bg-[#8a3ffc] hover:bg-[#6929c4] text-white rounded-none">
                  <Download className="w-4 h-4 mr-2" />
                  Export Activities
                </Button>
              </Card>

              <Card className="p-6 rounded-none border-l-4 border-l-[#24a148] hover:shadow-lg transition-shadow">
                <h3 className="mb-2" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                  Resources
                </h3>
                <p className="text-[#525252] mb-4">
                  Export resource pool with roles, rates, and availability.
                </p>
                <Button className="w-full bg-[#24a148] hover:bg-[#198038] text-white rounded-none">
                  <Download className="w-4 h-4 mr-2" />
                  Export Resources
                </Button>
              </Card>

              <Card className="p-6 rounded-none border-l-4 border-l-[#fa4d56] hover:shadow-lg transition-shadow">
                <h3 className="mb-2" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                  Users
                </h3>
                <p className="text-[#525252] mb-4">
                  Export user list with roles and access levels.
                </p>
                <Button className="w-full bg-white text-[#161616] border border-[#161616] hover:bg-[#e0e0e0] rounded-none">
                  <Download className="w-4 h-4 mr-2" />
                  Export Users
                </Button>
              </Card>

              <Card className="p-6 rounded-none border-l-4 border-l-[#002d9c] hover:shadow-lg transition-shadow">
                <h3 className="mb-2" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                  Pricing
                </h3>
                <p className="text-[#525252] mb-4">
                  Export pricing configurations and rate cards.
                </p>
                <Button className="w-full bg-white text-[#161616] border border-[#161616] hover:bg-[#e0e0e0] rounded-none">
                  <Download className="w-4 h-4 mr-2" />
                  Export Pricing
                </Button>
              </Card>

              <Card className="p-6 rounded-none border-l-4 border-l-[#161616] hover:shadow-lg transition-shadow">
                <h3 className="mb-2" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                  Complete Backup
                </h3>
                <p className="text-[#525252] mb-4">
                  Export all data as a complete system backup.
                </p>
                <Button className="w-full bg-[#161616] hover:bg-[#393939] text-white rounded-none">
                  <Download className="w-4 h-4 mr-2" />
                  Full Export
                </Button>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
