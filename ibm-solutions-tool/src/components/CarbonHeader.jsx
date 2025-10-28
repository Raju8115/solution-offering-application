import React from "react";
import { User, Settings, LogOut, Menu } from "lucide-react";
import { Button } from "./ui/button";
import IBMLogo from "../images/ibm-logo.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";

export function CarbonHeader({
  onNavigate,
  onLogout,
  userRole,
  onRoleChange, // ✅ new callback prop for role change
  currentPage,
  onToggleSidebar,
}) {
  return (
    <header className="bg-[#161616] text-white h-12 flex items-center justify-between px-4 sticky top-0 z-50">
      {/* Left section: Logo + Sidebar Toggle */}
      <div className="flex items-center gap-4">
        {onToggleSidebar && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleSidebar}
            className="text-white hover:bg-[#262626] lg:hidden rounded-none p-2 h-8"
          >
            <Menu className="w-5 h-5" />
          </Button>
        )}

        {/* IBM Logo + Title */}
        <div className="flex items-center gap-3">
          <img
            src={IBMLogo}
            alt="IBM Logo"
            className="h-14 w-auto object-contain bg-transparent"
          />
          <span
            className="text-sm md:text-base"
            style={{ fontFamily: "IBM Plex Sans, sans-serif" }}
          >
            Solution & Offerings Tool
          </span>
        </div>
      </div>

      {/* Middle Navigation */}
      <nav className="hidden md:flex items-center gap-1">
        <Button
          variant="ghost"
          onClick={() => onNavigate("catalog")}
          className={`text-white hover:text-[#c4c4c4] rounded-none h-12 px-4 ${
            currentPage === "catalog" ? "border-b-2 border-[#0f62fe]" : ""
          }`}
          style={{ fontFamily: "IBM Plex Sans, sans-serif" }}
        >
          Catalog
        </Button>

        {(userRole === "architect" || userRole === "admin") && (
          <Button
            variant="ghost"
            onClick={() => onNavigate("solution-builder")}
            className={`text-white hover:text-[#c4c4c4] rounded-none h-12 px-4 ${
              currentPage === "solution-builder"
                ? "border-b-2 border-[#0f62fe]"
                : ""
            }`}
            style={{ fontFamily: "IBM Plex Sans, sans-serif" }}
          >
            Solution Builder
          </Button>
        )}

        {userRole === "admin" && (
          <>
            <Button
              variant="ghost"
              onClick={() => onNavigate("admin")}
              className={`text-white hover:text-[#c4c4c4] rounded-none h-12 px-4 ${
                currentPage === "admin" ? "border-b-2 border-[#0f62fe]" : ""
              }`}
              style={{ fontFamily: "IBM Plex Sans, sans-serif" }}
            >
              Admin
            </Button>
            <Button
              variant="ghost"
              onClick={() => onNavigate("import-export")}
              className={`text-white hover:text-[#c4c4c4] rounded-none h-12 px-4 ${
                currentPage === "import-export"
                  ? "border-b-2 border-[#0f62fe]"
                  : ""
              }`}
              style={{ fontFamily: "IBM Plex Sans, sans-serif" }}
            >
              Import/Export
            </Button>
          </>
        )}
      </nav>

      {/* Right Section: Role Select + User Menu */}
      <div className="flex items-center gap-2">
        {/* ✅ Role Selector */}
        <Select value={userRole} onValueChange={onRoleChange}>
          <SelectTrigger
            className="min-w-[100px] max-w-[300px] border border-[#393939] rounded-none h-8 text-sm px-2"
            style={{ width: 'auto' }} // ✅ let width adjust dynamically
          >
            <SelectValue placeholder="Select Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="seller">Seller</SelectItem>
            <SelectItem value="architect">Architect</SelectItem>
            <SelectItem value="brand-sales-and-renewal-rep">Brand sales and Renewal rep</SelectItem>
            <SelectItem value="deal-maker">Deal Maker</SelectItem>
          </SelectContent>
        </Select>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-[#262626] rounded-none h-8 px-2"
            >
              <User className="w-5 h-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white rounded-none">
            <div className="px-3 py-2">
              <p
                className="text-[#161616]"
                style={{ fontFamily: "IBM Plex Sans, sans-serif" }}
              >
                {userRole === "admin"
                  ? "Admin User"
                  : userRole === "architect"
                  ? "Solution Architect"
                  : "Sales User"}
              </p>
              <p className="text-[#525252] text-sm">{userRole}@ibm.com</p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => onNavigate("user-profile")}
              className="rounded-none"
            >
              <User className="w-4 h-4 mr-2" />
              Profile
            </DropdownMenuItem>
            {/* <DropdownMenuItem className="rounded-none">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </DropdownMenuItem> */}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={onLogout}
              className="rounded-none text-[#da1e28]"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
