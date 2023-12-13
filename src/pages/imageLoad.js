import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import Web3 from 'web3';

const ImageLoad = () => {
  const [qrUrl, setQrUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true); // Nuevo estado para el indicador de carga

  const abi = JSON.parse(process.env.NEXT_PUBLIC_CONTRACT_ABI);
  const address = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

  useEffect(() => {
    const generateQRCode = async () => {
      try {
        if (typeof window.ethereum !== 'undefined') {
          const web3 = new Web3(window.ethereum);

          // Comprobar si el usuario está conectado a MetaMask
          const accounts = await web3.eth.getAccounts();

          if (accounts.length === 0) {
            // Si el usuario no está conectado, solicitar la conexión
            await window.ethereum.request({ method: 'eth_requestAccounts' });
          }

          // Obtener los eventos después de esperar 5 segundos
          setTimeout(async () => {
            try {
              const contract = new web3.eth.Contract(abi, address);
              const eventIds = await contract.methods.getEvents().call();

              // Obtener solo el último ID si hay varios
              const lastId = Array.isArray(eventIds) ? eventIds[eventIds.length - 1] : eventIds;

              const newQrUrl = `https://andino.vercel.app/mint/${lastId}`;
              setQrUrl(newQrUrl);
              setLoading(false); // Cuando se ha generado el QR, establece el indicador de carga en falso
            } catch (error) {
              console.error('Error al obtener el último ID:', error);
            }
          }, 5000);
        } else {
          console.error('Web3 no está disponible en este navegador');
        }
      } catch (error) {
        console.error('Error al obtener el último ID:', error);
      }
    };

    generateQRCode();
  }, []);

  const copyToClipboard = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(qrUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareQrUrl = async (e) => {
    e.preventDefault();

    // Generar el QRCode solo si aún no se ha generado
    if (!qrUrl) {
      await generateQRCode();
    }

    // Ahora puedes incluir el QRCode en el mensaje compartido
    const shareMessage = `¡Echa un vistazo a mi QRCode! ${qrUrl}`;

    navigator.share({ text: shareMessage, url: qrUrl })
      .then(() => console.log('URL compartida exitosamente'))
      .catch((error) => console.error('Error al compartir:', error));
  };

  return (
    <div className="p-4">
      {loading ? ( // Muestra el indicador de carga mientras se genera el QR
        <div className="text-center">
          <p>Generando QR...</p>
        </div>
      ) : (
        <div className="text-center">
          <QRCode value={qrUrl} />

          <p className="text-black">URL del QR: {qrUrl}</p>

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
            onClick={copyToClipboard}
          >
            {copied ? '¡Copiado!' : 'Copiar enlace'}
          </button>

          <button
            className="bg-blue-500 hover.bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
            onClick={shareQrUrl}
          >
            Compartir
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageLoad;
