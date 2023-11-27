import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

function Poap() {
  const [address, setAddress] = useState('');
  const [collections, setCollections] = useState([]);

  const handleConnectMetamask = async () => {
    try {
      if (window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        setAddress(accounts[0] || '');
      } else {
        console.error("Metamask no está instalado o no es compatible.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleShowCollections = async () => {
    try {
      if (!address) {
        console.error("Conéctate a Metamask primero.");
        return;
      }

      const web3 = new Web3(window.ethereum);

      // Aquí deberías usar las funciones de Web3.js o Ethers.js para interactuar con la blockchain
      // y obtener información sobre las colecciones y NFTs asociados a la dirección de la billetera.

      // Ejemplo de cómo obtener información sobre las colecciones:
      // const collectionsInfo = await obtenerInformacionDeColecciones();

      // Actualizar el estado con la información obtenida
      // setCollections(collectionsInfo);

      console.log(`NFTs en la dirección ${address}:`, collectionsInfo);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Ejemplo de cómo obtener información sobre las colecciones al cargar la página
    handleShowCollections();
  }, [address]); // Se ejecutará cuando la dirección de la billetera cambie

  return (
    <div className="bg-gradient-to-r from-purple-400 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-4 text-black">POAP Dashboard</h1>
        <div className="flex space-x-4">
          <button className="bg-blue-500 text-black px-4 py-2 rounded" onClick={handleConnectMetamask}>
            Connect Metamask
          </button>
          <button className="bg-green-500 text-black px-4 py-2 rounded" onClick={handleShowCollections}>
            Show Collections
          </button>
        </div>
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2 text-black">Your NFTs</h2>
          <div className="bg-gray-100 p-4 rounded-lg">
            {collections.map((nft, index) => (
              <div key={index} className="bg-white p-4 rounded-lg">
                <p className="text-gray-600">{`NFT #${index + 1}: ${nft.name}`}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-black">Wallet Address:</label>
          <input
            type="text"
            value={address}
            readOnly
            className="mt-1 p-2 border rounded-md w-full bg-gray-100 text-black"
          />
        </div>
      </div>
    </div>
  );
}

export default Poap;
