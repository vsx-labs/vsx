import { createRootRoute, Outlet } from '@tanstack/react-router'
import React, { Suspense } from 'react'
import { ThemeProvider, BaseStyles, SplitPageLayout } from '@primer/react'
import { TransportProvider } from "@connectrpc/connect-query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createConnectTransport } from '@connectrpc/connect-web';
import { MainNav } from '../components/MainNav';

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
                <ThemeProvider colorMode='dark'>
                    <BaseStyles>
                        <div className='main-container'>
                            <SplitPageLayout>
                                <SplitPageLayout.Header divider='none'>
                                    <MainNav />
                                </SplitPageLayout.Header>
                                {/* <SplitPageLayout.Pane position="start" aria-label="Pane" sx={{ maxWidth: '12rem' }}>
                                    <SideNav />
                                </SplitPageLayout.Pane> */}
                                <SplitPageLayout.Content width='full' sx={{ height: '80vw', textAlign: 'left' }}>
                                    <Outlet />
                                </SplitPageLayout.Content>
                                <SplitPageLayout.Footer divider='line'>
                                    <div className="text-muted">
                                        2024 vsx.dev
                                    </div>
                                </SplitPageLayout.Footer>
                            </SplitPageLayout>
                        </div>
                        <Suspense>
                            <TanStackRouterDevtools />
                        </Suspense>
                    </BaseStyles>
                </ThemeProvider>
            </QueryClientProvider>
        </TransportProvider >

    ),
})
