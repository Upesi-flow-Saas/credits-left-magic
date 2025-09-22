import { NavLink, useLocation } from "react-router-dom";
import { 
  Home, 
  Bot, 
  FileText, 
  CreditCard, 
  Settings, 
  Zap,
  PlusCircle 
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "My Agents", href: "/agents", icon: Bot },
  { name: "Custom Requests", href: "/requests", icon: PlusCircle },
  { name: "My Requests", href: "/my-requests", icon: FileText },
  { name: "Billing", href: "/billing", icon: CreditCard },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const { profile } = useAuth();
  const collapsed = state === "collapsed";

  return (
    <Sidebar className="sidebar-gradient border-r-0">
      <SidebarHeader className="p-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl flex items-center justify-center">
            <Zap className="w-6 h-6 text-white" />
          </div>
          {!collapsed && (
            <div>
              <h1 className="text-xl font-bold text-white">Upesi Hub</h1>
              <p className="text-purple-200 text-sm">AI Automation</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-6">
        <SidebarGroup>
          <SidebarGroupLabel className="text-purple-200">Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton asChild isActive={isActive} tooltip={collapsed ? item.name : undefined}>
                      <NavLink
                        to={item.href}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                          isActive
                            ? "bg-white/20 text-white shadow-lg backdrop-blur-sm"
                            : "text-purple-200 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        <item.icon className="w-5 h-5 flex-shrink-0" />
                        {!collapsed && <span className="font-medium">{item.name}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {!collapsed && (
        <SidebarFooter className="p-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-400 rounded-xl mx-auto mb-3 flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white font-semibold mb-1">Unlock Premium</h3>
              <p className="text-purple-200 text-sm mb-4">
                Get unlimited agents and priority support
              </p>
              <button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl py-2 px-4 font-medium hover:shadow-lg transition-all duration-200">
                Upgrade Now
              </button>
            </div>
          </div>
        </SidebarFooter>
      )}
    </Sidebar>
  );
}