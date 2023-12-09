import React, { useEffect, useState } from 'react';
import { Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay } from '@chakra-ui/react';
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

  return (
    <div className="container max-w-5xl mx-auto px-4">
      {/* Resto del código */}
      <div className="flex flex-wrap justify-center mx-auto">
      {Object.keys(jsonData).map((id) => {
    const card = jsonData[id];
    return (
      <div key={id} className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 p-4" onClick={() => openCardDrawer(card)}>
        <div className="bg-white p-6 rounded-md shadow-md">
          <img src={card.imageUrl} alt={card.title} className="w-full h-60 object-cover mb-4 rounded" />
          <h3 className="text-xl font-bold mb-2">{card.title}</h3>
          <p className="text-gray-700">Descripción: {card.eventDescription}</p>
          <p className="text-gray-700">Fecha de inicio: {card.startDate}</p>
          <p className="text-gray-700">Fecha de finalización: {card.endDate}</p>
          <p className="text-gray-700">Número del evento: {card.eventNum}</p>
        </div>
      </div>
    );
  })}
</div>
      {/* Chakra UI Drawer */}
      <Drawer isOpen={isDrawerOpen} placement="right" onClose={closeDrawer}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerHeader borderBottomWidth="1px">Card Details</DrawerHeader>
            <DrawerBody>
              <h3 className="text-xl font-bold mb-2">{selectedCard?.name}</h3>
              <p className="text-gray-700">{selectedCard?.description}</p>
              {/* Otras partes del contenido del Drawer */}
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