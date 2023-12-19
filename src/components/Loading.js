import { Box, Spinner, Text } from '@chakra-ui/react';

const Loading = () => {
  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      right="0"
      bottom="0"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bg="gray.800" // Cambia el color de fondo aquí
      zIndex="1000" // Ajusta según sea necesario
    >
      <Box textAlign="center">
        <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="amber.950" size="xl" />
        <Text mt={4} fontSize="2xl" color="amber.950" fontWeight="bold">
          LOADING...
        </Text>
      </Box>
    </Box>
  );
};

export default Loading;
