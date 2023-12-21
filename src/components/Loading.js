import { Box, Spinner, Text, Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

const Loading = () => {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    // Simulando un tiempo de carga, puedes ajustar esto según tus necesidades
    const loadingTime = setTimeout(() => {
      setShowAlert(true);
    }, 5000);

    // Limpiando el temporizador al desmontar el componente
    return () => clearTimeout(loadingTime);
  }, []); // El segundo argumento vacío asegura que este efecto se ejecute solo después del montaje inicial

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
        {showAlert && (
          <Alert status="success" mt={4} variant="subtle" flexDirection="column" alignItems="center" justifyContent="center">
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              POAP RECLAMADO CORRECTAMENTE
            </AlertTitle>
            <AlertDescription maxWidth="sm">
              Refresca la página para ver los efectos.
            </AlertDescription>
          </Alert>
        )}
      </Box>
    </Box>
  );
};

export default Loading;
