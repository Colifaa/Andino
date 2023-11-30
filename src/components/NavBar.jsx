// components/NavBar.js
import {
  Heading,
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Text,
  Stack,
  Button,
  Grid,
  useColorModeValue,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import Link from 'next/link';
const NavBar = () => {


  return (
   
    <nav className="fixed inset-x-0 top-0 z-10 w-full px-4 py-1 bg-[#YourPOAPColor] shadow-md border-[#YourBorderColor] dark:bg-[#YourDarkColor] transition duration-700 ease-out">
    <Flex justify="space-between" align="center" p={4}>
    <Link href="/">
     
        <Box width="8rem" height="auto">
          <Image
            src="https://th.bing.com/th/id/OIG.TXoN1fY_SxiGAMzB2QF.?pid=ImgGn"
            alt="POAP Logo"
            borderRadius="full"
            boxSize="70px" // Ajusta el tamaño de la imagen según tus necesidades
          />
        </Box>
      
    </Link>
          <div className="flex items-center space-x-4 text-lg font-semibold tracking-tight">
            <button
              className="px-6 py-2 text-black transition duration-700 ease-out bg-white border border-black rounded-lg hover:bg-black hover:border hover:text-white dark:border-white dark:bg-inherit dark:text-white dark:hover:bg-white dark:hover:text-black"
            >
              Sign in
            </button>
            <Link className="px-6 py-2 text-white transition duration-500 ease-out bg-blue-700 rounded-lg hover:bg-blue-800 hover:ease-in hover:underline" href="/admin">
       
        Crear POAP
     
    </Link>
          </div>
        </Flex>
      </nav>

  
   
  );
};

export default NavBar;
