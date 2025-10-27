import { useState } from 'react';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import IBMLOGO from '../images/ibm-logo-black.png'

export function LoginPage({ onLogin }) {
  const [selectedRole, setSelectedRole] = useState('seller');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f4f4f4] via-[#e0e0e0] to-[#c6c6c6]">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-none shadow-lg p-12">
          {/* IBM Logo */}
          <div className="flex justify-center mb-8">
            <img src={IBMLOGO} className='w-18 h-14'/>
          </div>

          {/* Title */}
          <h1 className="text-center mb-2" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
            Solution & Offerings Tool
          </h1>
          
          <p className="text-center text-[#525252] mb-8">
            Sign in to continue
          </p>

          {/* Role Selection (for demo purposes) */}
          <div className="mb-6">
            <label className="block mb-2 text-[#161616]" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
              Select Role (Demo)
            </label>
            <Select value={selectedRole} onValueChange={(value) => setSelectedRole(value)}>
              <SelectTrigger className="w-full bg-[#f4f4f4] border-b-2 border-[#161616] rounded-none">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="seller">Seller</SelectItem>
                <SelectItem value="architect">Solution Architect</SelectItem>
                <SelectItem value="brand-sales-and-renewal-rep">Brand sales and Renewal rep</SelectItem>
                <SelectItem value="deal-maker">Deal Maker</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Sign In Button */}
          <Button 
            onClick={() => onLogin(selectedRole)}
            className="w-full bg-[#0f62fe] hover:bg-[#0353e9] text-white rounded-none h-12"
            style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}
          >
            Sign in with W3ID
          </Button>

          {/* Footer Text */}
          <p className="text-center text-[#525252] mt-6">
            IBM Confidential
          </p>
        </div>
      </div>
    </div>
  );
}
