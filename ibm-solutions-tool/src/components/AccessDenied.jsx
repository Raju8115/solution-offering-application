import { ShieldAlert, Home } from 'lucide-react';
import { Button } from './ui/button';

export function AccessDenied({ onNavigate }) {
  return (
    <div className="min-h-screen bg-[#f4f4f4] flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        <div className="bg-white p-12 rounded-none border-l-4 border-l-[#da1e28]">
          {/* Error Icon */}
          <div className="w-24 h-24 bg-[#fff1f1] rounded-full mx-auto mb-6 flex items-center justify-center">
            <ShieldAlert className="w-12 h-12 text-[#da1e28]" />
          </div>

          {/* IBM Logo */}
          <div className="flex justify-center mb-6">
            <svg width="60" height="24" viewBox="0 0 60 24" fill="none">
              <rect x="0" width="12" height="4" fill="#161616"/>
              <rect x="0" y="6" width="12" height="4" fill="#161616"/>
              <rect x="0" y="12" width="12" height="4" fill="#161616"/>
              <rect x="0" y="18" width="12" height="4" fill="#161616"/>
              <rect x="16" width="12" height="4" fill="#161616"/>
              <rect x="16" y="6" width="12" height="4" fill="#161616"/>
              <rect x="16" y="12" width="12" height="4" fill="#161616"/>
              <rect x="16" y="18" width="12" height="4" fill="#161616"/>
              <rect x="32" width="12" height="4" fill="#161616"/>
              <rect x="32" y="6" width="12" height="4" fill="#161616"/>
              <rect x="32" y="12" width="12" height="4" fill="#161616"/>
              <rect x="32" y="18" width="12" height="4" fill="#161616"/>
              <rect x="48" width="12" height="4" fill="#161616"/>
              <rect x="48" y="6" width="12" height="4" fill="#161616"/>
              <rect x="48" y="12" width="12" height="4" fill="#161616"/>
              <rect x="48" y="18" width="12" height="4" fill="#161616"/>
            </svg>
          </div>

          {/* Error Message */}
          <h1 className="text-[#da1e28] mb-3" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
            Access Denied
          </h1>
          
          <p className="text-[#525252] mb-6">
            You don't have permission to view this page. Please contact your administrator if you believe this is an error.
          </p>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={() => onNavigate('catalog')}
              className="w-full bg-[#0f62fe] hover:bg-[#0353e9] text-white rounded-none"
              style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}
            >
              <Home className="w-4 h-4 mr-2" />
              Return to Home
            </Button>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-[#e0e0e0]">
            <p className="text-[#525252]">
              Error Code: 403 - Forbidden
            </p>
            <p className="text-[#525252] mt-1">
              IBM Confidential
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
