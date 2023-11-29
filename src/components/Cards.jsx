// components/CardsContainer.js
import React from 'react';

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
    imageUrl: 'https://placekitten.com/402/402', // Dimensiones más cuadradas
  },
  // Agrega más objetos de tarjeta según sea necesario
];

const CardsContainer = () => {
  return (
    <div className="flex flex-wrap justify-center mx-auto">
      {cardsData.map((card, index) => (
        <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/5 p-8 ">
          <div className="bg-white p-6 rounded-md shadow-md">
            <img src={card.imageUrl} alt={card.title} className="w-full h-30 object-cover mb-4 rounded" />
            {/* Ajustar el estilo de acuerdo a tus necesidades */}
            <h3 className="text-xl font-bold mb-2">{card.title}</h3>
            <p className="text-gray-700">{card.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardsContainer;
