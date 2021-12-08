import mermaid from 'mermaid';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import '../styles/globals.scss';

const queryClient = new QueryClient();

function MyApp ({ Component, pageProps }: AppProps) {

  mermaid.initialize({ startOnLoad: true });

  return (
    <QueryClientProvider client={ queryClient }>
      <div className="w-screen h-screen">
        <Component { ...pageProps } />
      </div>
    </QueryClientProvider>
  );
}

export default MyApp;
