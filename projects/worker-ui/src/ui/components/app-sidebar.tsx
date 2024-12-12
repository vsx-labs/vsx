import * as React from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail
} from "../../components/ui/sidebar"
import { VersionSwitcher } from "./version-switcher"
import { Link } from "@tanstack/react-router"

const data = {
  versions: ["MainNet", "TestNet", "DevNet"],
  navMain: [
    {
      title: "Getting Started",
      url: "#",
      items: [
        {
          title: "Home",
          url: "/",
        },
        {
          title: "About",
          url: "/about",
        },
      ],
    },
    {
      title: "Solana Blockchain",
      url: "#",
      items: [
        {
          title: "Epoch",
          url: "/epoch",
        },
        {
          title: "Validators",
          url: "/validators",
          isActive: true,
        },
      ],
    },
    {
      title: "API Reference",
      url: "#",
      items: [
        {
          title: "Geyser",
          url: "#",
        },
        {
          title: "JITO",
          url: "#",
        },
        {
          title: "Stackwiz",
          url: "#",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <VersionSwitcher
          versions={data.versions}
          defaultVersion={data.versions[0]}
        />
      </SidebarHeader>
      <SidebarContent>
        {data.navMain.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <Link to={item.url}>
                        {item.title}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}

