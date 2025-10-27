import { useState, useEffect } from 'react';
import { LoginPage } from './components/LoginPage';
import { OfferingsCatalog } from './components/OfferingsCatalog';
import { OfferingDetail } from './components/OfferingDetail';
import { SolutionBuilder } from './components/SolutionBuilder';
import { AdminDashboard } from './components/AdminDashboard';
import { ImportExport } from './components/ImportExport';
import { UserProfile } from './components/UserProfile';
import { AccessDenied } from './components/AccessDenied';
import { CarbonHeader } from './components/CarbonHeader'; // ✅ Import the header

export default function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('seller');
  const [selectedOffering, setSelectedOffering] = useState(null);

  // ✅ Load persisted role (optional)
  useEffect(() => {
    const savedRole = localStorage.getItem('userRole');
    if (savedRole) setUserRole(savedRole);
  }, []);

  // ✅ Persist role changes
  useEffect(() => {
    localStorage.setItem('userRole', userRole);
  }, [userRole]);

  const handleLogin = (role) => {
    setIsAuthenticated(true);
    setUserRole(role);
    setCurrentPage('catalog');
    localStorage.setItem('userRole', role);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage('login');
    localStorage.removeItem('userRole');
  };

  const navigateTo = (page, offeringId) => {
    if (offeringId) {
      setSelectedOffering(offeringId);
    }
    setCurrentPage(page);
  };

  // Not logged in → show login page
  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  // ✅ Common header (only after login)
  return (
    <>
      <CarbonHeader
        onNavigate={navigateTo}
        onLogout={handleLogout}
        userRole={userRole}
        onRoleChange={setUserRole}   // ✅ Enables live role change from dropdown
        currentPage={currentPage}
      />

      {/* Page routing */}
      {currentPage === 'catalog' && (
        <OfferingsCatalog 
          onNavigate={navigateTo} 
          onLogout={handleLogout}
          userRole={userRole}
        />
      )}

      {currentPage === 'offering-detail' && (
        <OfferingDetail 
          onNavigate={navigateTo}
          onLogout={handleLogout}
          userRole={userRole}
          offeringId={selectedOffering}
        />
      )}

      {currentPage === 'solution-builder' && (
        <SolutionBuilder 
          onNavigate={navigateTo}
          onLogout={handleLogout}
          userRole={userRole}
        />
      )}

      {currentPage === 'admin' && (
        <AdminDashboard 
          onNavigate={navigateTo}
          onLogout={handleLogout}
          userRole={userRole}
        />
      )}

      {currentPage === 'import-export' && (
        <ImportExport 
          onNavigate={navigateTo}
          onLogout={handleLogout}
          userRole={userRole}
        />
      )}

      {currentPage === 'user-profile' && (
        <UserProfile 
          onNavigate={navigateTo}
          onLogout={handleLogout}
          userRole={userRole}
        />
      )}

      {currentPage === 'access-denied' && (
        <AccessDenied onNavigate={navigateTo} />
      )}
    </>
  );
}
