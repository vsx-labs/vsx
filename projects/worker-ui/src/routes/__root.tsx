import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import React, { Suspense } from 'react'
import { TransportProvider } from "@connectrpc/connect-query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createConnectTransport } from '@connectrpc/connect-web';


// import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from '@radix-ui/react-context-menu';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '../components/ui/breadcrumb';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '../components/ui/sidebar';
import { AppSidebar } from '../ui/components/app-sidebar';
import { ThemeProvider } from '../ui/components/theme-provider';
import { ThemeModeToggle } from '../ui/components/theme-mode-toggle';

const finalTransport = createConnectTransport({
    // baseUrl: "http://localhost:8787/",
    baseUrl: "https://api.vsx.dev/",
});

const queryClient = new QueryClient();

const TanStackRouterDevtools =
    process.env.NODE_ENV === 'production'
        ? () => null // Render nothing in production
        : React.lazy(() =>
            // Lazy load in development
            import('@tanstack/router-devtools').then((res) => ({
                default: res.TanStackRouterDevtools,
                // For Embedded Mode
                // default: res.TanStackRouterDevtoolsPanel
            })),
        )

export const Route = createRootRoute({
    component: () => (
        <TransportProvider transport={finalTransport}>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                    <App />
                    <Suspense>
                        <TanStackRouterDevtools />
                    </Suspense>
                </ThemeProvider>
            </QueryClientProvider>
        </TransportProvider >

    ),
})

export function App() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator className="mr-2 h-4" />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block">
                                    <Link to='/'>
                                        <BreadcrumbLink> @ </BreadcrumbLink>
                                    </Link>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block" />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>vsx.dev</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                    <div className="ml-auto px-3">
                        <ThemeModeToggle />
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
                        <div className='p-2'>
                            <Outlet />
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
