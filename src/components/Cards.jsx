import React, { useState } from 'react';
import { Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay } from '@chakra-ui/react';

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
        <div className="w-4/5">
          <h1 className="mt-32 text-white text-6xl font-bold">
            La forma más rápida y segura de crear POAPs <br />
            <span className="text-blue-400">para tus eventos.</span>
          </h1>
        </div>
        <div className="w-5/6 my-10 ml-6">
          <h3 className="text-gray-300">
            Diseña, edita y distribuye POAPs únicos para <br />
            <strong className="text-white">cualquier tipo de evento</strong>
            <br />con instalaciones de paquetes rápidas y seguridad garantizada.
          </h3>
        </div>
        <div className="hidden sm:block opacity-50 z-0"></div>
        <div className="text-white relative">
          <h3 className="uppercase font-semibold">Eventos y Ocasiones</h3>
        </div>

        <div className="flex flex-wrap justify-center mx-auto">
  {cardsData.map((card, index) => (
    <div key={index} className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 p-4" onClick={() => openCardDrawer(card)}>
      <div className="bg-white p-6 rounded-md shadow-md">
        <img src={card.imageUrl} alt={card.title} className="w-full h-60 object-cover mb-4 rounded" />
        <h3 className="text-xl font-bold mb-2">{card.title}</h3>
        <p className="text-gray-700">{card.description}</p>
      </div>
    </div>
  ))}
</div>

        {/* Chakra UI Drawer */}
        <Drawer isOpen={isDrawerOpen} placement="right" onClose={closeDrawer}>
          <DrawerOverlay>
            <DrawerContent>
              <DrawerHeader borderBottomWidth="1px">Card Details</DrawerHeader>
              <DrawerBody>
                <h3 className="text-xl font-bold mb-2">{selectedCard?.title}</h3>
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
