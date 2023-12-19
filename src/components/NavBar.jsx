import { Flex, Box, Image } from '@chakra-ui/react';
import Link from 'next/link';
import { useState } from 'react';

const NavBar = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [userAddress, setUserAddress] = useState('');

  const connectMetaMask = async () => {
    try {
      // Request account access if needed
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      if (accounts && accounts.length > 0) {
        setIsConnected(true);
        setUserAddress(accounts[0]);
        console.log('MetaMask connected successfully!');
      }
    } catch (error) {
      console.error('Error connecting to MetaMask:', error.message || error);
    }
  };

  return (
    <Box bg="white" boxShadow="md">
      <nav className="fixed inset-x-0 top-0 z-10 w-full px-4 py-1 bg-[#YourPOAPColor] shadow-md border-[#YourBorderColor] dark:bg-[#YourDarkColor] transition duration-700 ease-out">
        <Flex justify="space-between" align="center" p={4}>
          <Link href="/">
            <Box width="8rem" height="auto">
              <Image
                src="https://th.bing.com/th/id/OIG.TXoN1fY_SxiGAMzB2QF.?pid=ImgGn"
                alt="POAP Logo"
                borderRadius="full"
                boxSize="70px"
              />
            </Box>
          </Link>
          <div className="flex items-center space-x-4 text-lg font-semibold tracking-tight">
            {!isConnected ? (
              <button
                onClick={connectMetaMask}
                className="px-6 py-2 text-black transition duration-700 ease-out bg-white border border-black rounded-lg hover:bg-black hover:border hover:text-white dark:border-white dark:bg-inherit dark:text-white dark:hover:bg-white dark:hover:text-black"
              >
                Conectar MetaMask
              </button>
            ) : (
              <div className="flex items-center space-x-2">
                <p className="px-4 py-1 text-white bg-green-500 rounded-md">Conectado</p>
                <p className="px-4 py-1 text-black border border-black rounded-md">{userAddress}</p>
              </div>
            )}
            <Link
              className="px-6 py-2 text-white transition duration-500 ease-out bg-blue-700 rounded-lg hover:bg-blue-800 hover:ease-in hover:underline"
              href="/admin"
            >
              Crear POAP
            </Link>
          </div>
        </Flex>
      </nav>
    </Box>
  );
};

export default NavBar;
