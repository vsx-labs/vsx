import './App.css'
import { ThemeProvider, BaseStyles, Box } from '@primer/react'
import { WelcomeHeader } from './WelcomeHeader'
import { ValidatorsPane } from './ValidatorsPane'

import { TransportProvider } from "@connectrpc/connect-query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createConnectTransport } from '@connectrpc/connect-web';
import { Suspense } from 'react';
import { Loading } from './Loading';

const finalTransport = createConnectTransport({
  // baseUrl: "http://localhost:8787/",
  baseUrl: "https://api.vsx.dev/",
});

const queryClient = new QueryClient();

function App() {
  return (
    <TransportProvider transport={finalTransport}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <BaseStyles>
            <Box
              sx={{
                mx: 'auto',
                width: '100%',
              }}
            >
              <Box
                sx={{
                  position: 'sticky',
                  top: 0,
                  height: 64,
                  display: 'grid',
                  zIndex: 1000,
                  padding: '2rem',
                }}
              >
                <WelcomeHeader />
              </Box>
              <Box sx={{ padding: '40px', }}>
                <Suspense fallback={<Loading />}>
                  <ValidatorsPane />
                </Suspense>
              </Box>
            </Box>
          </BaseStyles>
        </ThemeProvider>
      </QueryClientProvider>
    </TransportProvider>
  )
}

export default App
