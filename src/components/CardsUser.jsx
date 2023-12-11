import React, { useEffect, useState } from 'react';

import Web3 from "web3";
import _ from 'lodash';
import { Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay,Flex,Image } from '@chakra-ui/react';



const CardsUser = () => {

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

      useEffect(() => {
        const fetchEvents = async () => {
          if (window.ethereum) {
            try {
              const web3 = new Web3(window.ethereum);
              await window.ethereum.request({ method: 'eth_requestAccounts' });
              const accounts = await web3.eth.getAccounts();
              setUserAddress(accounts[0]);
    
              const contractABI = JSON.parse(process.env.NEXT_PUBLIC_CONTRACT_ABI);
              const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
              const contract = new web3.eth.Contract(contractABI, contractAddress);
    
              // Llama a la función getEvents sin argumentos
              const eventIds = await contract.methods.getEvents().call();
              setPoapIds(eventIds);
            } catch (error) {
              console.error('Error al interactuar con el contrato:', error);
            }
          }
        };
    
        fetchEvents();
      }, []);
    


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
     

     <div className="container max-w-5xl mx-auto px-4">
       
      
       
        <div className="w-5/6 my-10 ml-6">
          <h3 className="mt-32 text-black-600 text-6xl font-bold">
            Aqui encontraras todos los eventos ya creados por ti<br />
          </h3>
        </div>
        <div className="hidden sm:block opacity-50 z-0"></div>
        <div className="text-blue relative">
          <h3 className="mt-32  text-3xl font-bold">Eventos</h3>
          {/* Puedes agregar más contenido relacionado con la creación de POAPs aquí */}
        </div>
      </div>
      <div className="flex flex-wrap justify-center mx-auto">
      {Object.keys(jsonData).map((id) => {
    const card = jsonData[id];
    return (
      <div key={id} className="w-full sm:w-1/5 md:w-1/2 lg:w-1/2 xl:w-1/2 p-4" onClick={() => openCardDrawer(card)}>
         <div className=" bg-gradient-to-br from-indigo-600 to-green-600 py-6 flex flex-col justify-center sm:py-12 p-10 rounded-md shadow-md">
         <Flex align="center" justify="center">
      <Image src={card.imageUrl} alt={card.title}  objectFit="cover" rounded="full" />
    </Flex>
    <h3 className="text-4xl font-bold mb-2 text-gray-800 font-serif">{card.title}</h3>
    <p className="text-xl font-bold text-red-500">{card.eventDescription}</p>
    <p className="text-xl font-bold text-black">Fecha de inicio: {card.startDate}</p>
    <p className="text-xl font-bold text-black">Fecha de finalización: {card.endDate}</p>
    <p className="text-xl font-bold text-black">Número del evento: {card.eventNum}</p>
    </div>
      </div>
    );
  })}
</div>
      {/* Chakra UI Drawer */}
      <Drawer isOpen={isDrawerOpen} placement="right" onClose={closeDrawer} size="md"  >
        <DrawerOverlay>
        <DrawerContent  bgSize="cover" bgRepeat="no-repeat" bgImage="https://media.istockphoto.com/id/1135953192/es/foto/bosque-en-una-cresta-de-monta%C3%B1a-cubierta-de-nieve-v%C3%ADa-l%C3%A1ctea-en-un-cielo-estrellado-noche-de.jpg?s=2048x2048&w=is&k=20&c=N5ts0vAVPWN3krWvLNWtdCg7hkxHvuqCJHJQSAN6jr4=">
            <DrawerHeader borderBottomWidth="1px" borderBottomColor="orange" color="orange" >Card Details</DrawerHeader>
            <DrawerBody mt="10" size="md"   borderRadius="50px"> 
            <Flex align="center" justify="center" >
      <Image src={selectedCard?.imageUrl} alt={selectedCard?.title}   objectFit="cover" rounded="full" />
    </Flex>
            <p className="text-4xl font-bold mb-2 text-red-800 font-serif">{selectedCard?.eventDescription}</p>
            <p className="text-xl font-bold text-black">{selectedCard?.startDate}</p>
            <p className="text-xl font-bold text-black">{selectedCard?.endDate}</p>
            <p className="text-xl font-bold text-black">{selectedCard?.eventNum}</p>
              <h3 className="text-xl font-bold text-black">{selectedCard?.name}</h3>
              <p className="text-xl font-bold text-black">{selectedCard?.description}</p>
             
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

export default CardsUser;