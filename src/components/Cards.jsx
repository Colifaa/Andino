import React, { useEffect, useState } from 'react';
import { Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay,Flex,Image } from '@chakra-ui/react';
import Web3 from "web3";
import _ from 'lodash';

const cardsData = [
  {
    title: 'Card 1',
    description: 'Description for card 1.',
    imageUrl: 'https://placekitten.com/400/400', // Dimensiones más cuadradas
  },
  {
    title: 'Card 2',
    description: 'Description for card 2.',
    imageUrl: 'https://placekitten.com/401/401', // Dimensiones más cuadradas
  },
  {
    title: 'Card 3',
    description: 'Description for card 3.',
    imageUrl: 'https://placekitten.com/500/500', // Dimensiones más cuadradas
  },
  {
    title: 'Card 4',
    description: 'Description for card 3.',
    imageUrl: 'https://placekitten.com/500/600', // Dimensiones más cuadradas
  },
  // Agrega más objetos de tarjeta según sea necesario
];

const CardsContainer = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [userAddress, setUserAddress] = useState(null);
  
  const [poapIds, setPoapIds] = useState([]);
  const [poapData, setPoapData] = useState([]); // Agregamos el estado para almacenar los datos de POAP
  console.log("poapData",poapData);
  const [jsonData, setJsonData] = useState([]);
  console.log("jsonData", jsonData);
  console.log("poapData",poapData);
  console.log("poapIds",poapIds);
  useEffect(() => {
    const fetchUserAddress = async () => {
      if (window.ethereum) {
        try {
          const web3 = new Web3(window.ethereum);
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const accounts = await web3.eth.getAccounts();
          setUserAddress(accounts[0]);

          const contractABI = JSON.parse(process.env.NEXT_PUBLIC_CONTRACT_ABI);
          const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
          const contract = new web3.eth.Contract(contractABI, contractAddress);

          const response = await contract.methods.getPoapsByAccount(accounts[0]).call();
          const ids = response.map((tuple) => tuple[0].toString().replace('n', ''));
          setPoapIds(ids);
        } catch (error) {
          console.error('Error al interactuar con el contrato:', error);
        }
      }
    };

    fetchUserAddress();
  }, []);

  const fetchPoapData = async () => {
    const web3 = new Web3(window.ethereum);
  
    // Crear un objeto para almacenar los datos por ID
    const dataObject = {};
  
    // Iterar sobre las IDs y obtener la URL para cada POAP
    const dataPromises = poapIds.map(async (id) => {
      try {
        const contractABI = JSON.parse(process.env.NEXT_PUBLIC_CONTRACT_ABI);
        const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
        const contract = new web3.eth.Contract(contractABI, contractAddress);
  
        const uri = await contract.methods.uri(id).call();
        const response = await fetch(uri);
        const jsonData = await response.json();
  
        // Almacenar los datos en el objeto usando la ID como clave
        dataObject[id] = _.cloneDeep(jsonData);
      } catch (error) {
        console.error(`Error al obtener datos para POAP con ID ${id}:`, error);
      }
    });
  
    // Esperar a que todas las promesas se resuelvan
    await Promise.all(dataPromises);
  
    // Actualizar el estado jsonData con el objeto completo
    setJsonData(dataObject);
  };
  useEffect(() => {
    if (poapIds.length > 0) {
      fetchPoapData();
    }
  }, [poapIds]);

  const openCardDrawer = (card) => {
    setSelectedCard(card);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setSelectedCard(null);
    setIsDrawerOpen(false);
  };
  const renderCardContent = (card) => (
    <>
      <Flex align="center" justify="center">
        <Image src={card.image} alt={card.title} objectFit="cover" rounded="full"   borderRadius='full'
  boxSize='220px' />
      </Flex>
      <h3 className="text-4xl font-bold mb-2 text-gray-800 font-serif">{card.title}</h3>
      <p className="text-xl font-bold text-red-500">{card.description}</p>
      {/* Ajustar el código para mostrar datos de eventos POAP */}
      {card.attributes && card.attributes.map((attribute, index) => (
        <p key={index} className="text-xl font-bold text-black">
          {attribute.trait_type}: {attribute.value}
        </p>
      ))}
    </>
  );

  return (
    <div className="container max-w-5xl mx-auto px-4">
      {/* Mapa para mostrar tarjetas */}
      <div className="flex flex-wrap justify-center mx-auto">
        {Object.keys(jsonData).map((id) => {
          const card = jsonData[id];
          return (
            <div key={id} className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 p-4" onClick={() => openCardDrawer(card)}>
              <div className=" bg-gradient-to-br from-indigo-600 to-green-600 py-6 flex flex-col justify-center sm:py-12 p-10 rounded-md shadow-md">
                {renderCardContent(card)}
              </div>
            </div>
          );
        })}
      </div>

      {/* Chakra UI Drawer */}
      <Drawer isOpen={isDrawerOpen} placement="right" onClose={closeDrawer} size="md" >
        <DrawerOverlay>
          <DrawerContent bgSize="cover" bgRepeat="no-repeat" bgImage="https://media.istockphoto.com/id/1135953192/es/foto/bosque-en-una-cresta-de-monta%C3%B1a-cubierta-de-nieve-v%C3%ADa-l%C3%A1ctea-en-un-cielo-estrellado-noche-de.jpg?s=2048x2048&w=is&k=20&c=N5ts0vAVPWN3krWvLNWtdCg7hkxHvuqCJHJQSAN6jr4=">
          <DrawerHeader borderBottomWidth="1px" borderBottomColor="orange" color="orange" >My Poap</DrawerHeader>
            <DrawerBody mt="10" size="md" color="blue" borderRadius="50px">
             
              {selectedCard && renderCardContent(selectedCard)}
            
              <Button mt={4} onClick={closeDrawer}>
                Cerrar
              </Button>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </div>
  );
};
export default CardsContainer;