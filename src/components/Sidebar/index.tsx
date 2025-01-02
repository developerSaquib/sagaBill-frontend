/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import SagaBlackLogo from "@/assets/saga_black_logo.png";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { ChevronUp, User2 } from "lucide-react";
import AppRoutes from "../../AppRoutes";
import { Link } from "react-router-dom";
import { initStore } from "@/store/init-store";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { FiLogOut } from "react-icons/fi";
import { ChevronDown } from "lucide-react";

// Define the type for the menu items
interface MenuItem {
  title: string;
  url: string;
  icon?: React.ComponentType<{ size?: number }>; // Optional icon type
  subItems: { title: string; url: string }[];
}

export function AppSidebar() {
  const [mainMenuItems, setMainMenuItems] = useState<MenuItem[]>([]);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(initStore());
  }, []);
  const { menuRoutes }: any = useAppSelector((state) => state?.headerMenu);
  const { userData }: any = useAppSelector((state) => state?.userData);
  // Type the state as an array of numbers
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);
  useEffect(() => {
    setMainMenuItems([
      {
        title: "Dashboard",
        url: "#",
        // icon: MdDashboard,
        subItems: [{ title: "Sale Insights", url: `${AppRoutes.DASHBOARD}` }],
      },
      ...menuRoutes,
    ]);
  }, [menuRoutes]);
  // Add type annotation for the index parameter
  const toggleMenu = (index: number): void => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  return (
    <Sidebar>
      <SidebarContent className="flex flex-col h-full">
        <SidebarGroup>
          <SidebarGroupLabel className="mb-5 mt-5">
            <img src={SagaBlackLogo} alt="Logo" className="img-fluid" width={"35%"} />
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((menu, index) => (
                <div key={index} className="group/collapsible font-serif">
                  <SidebarMenuItem className="text-slate-950">
                    <SidebarMenuButton
                      onClick={() => toggleMenu(index)}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        {menu.icon && <menu.icon size={25} />}
                        <span>{menu.title}</span>
                      </div>
                      <ChevronDown
                        className={`transition-transform duration-300 ${
                          openIndexes.includes(index)
                            ? "rotate-180"
                            : "rotate-0"
                        }`}
                        size={20}
                      />
                    </SidebarMenuButton>
                    {openIndexes.includes(index) && (
                      <SidebarMenuSub>
                        {menu.subItems.map((subItem: any, subIndex: any) => (
                          <SidebarMenuSubItem key={subIndex}>
                            <Link to={subItem.url}>{subItem.title}</Link>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    )}
                  </SidebarMenuItem>
                </div>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Footer content */}
        <SidebarFooter className="mt-auto pb-4 border-t border-b border-slate-200">
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <User2 className="text-slate-950" />{" "}
                    <span className="text-slate-950 text-sm font-serif uppercase">
                      {" "}
                      Logged-In -:{" "}
                    </span>
                    <span
                      className="text-bold text-slate-950 text-base font-serif"
                      style={{ color: "var(--color-primary)" }}
                    >
                      {userData.userName}
                    </span>
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width] text-slate-950"
                >
                  <DropdownMenuItem>
                    <span
                      className="flex items-center justify-end font-serif hover:cursor-pointer mb-6"
                      onClick={handleLogout}
                    >
                      <FiLogOut className="mr-2" />
                      Sign out
                    </span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
