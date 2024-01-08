import { Flex, Box, Image } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const NavBarUser = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
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
            <Link
              className="px-6 py-2 text-white transition duration-500 ease-out bg-black bg-opacity-50 border border-black rounded-lg hover:bg-opacity-100"
              href="/collection"
            >
              Mis POAPs
            </Link>
            <button
              className="px-6 py-2 text-white transition duration-500 ease-out bg-black bg-opacity-50 border border-black rounded-lg hover:bg-opacity-100"
              onClick={handleBack}
            >
              Volver
            </button>
          </div>
        </Flex>
      </nav>
    </Box>
  );
};

export default NavBarUser;
