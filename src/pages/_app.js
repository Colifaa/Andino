import '@/styles/globals.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider >
  <Component {...pageProps} />
    </ChakraProvider>
  );
}
