import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import Web3 from 'web3';

const ImageLoad = () => {
  const [qrUrl, setQrUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  const abi = JSON.parse(process.env.NEXT_PUBLIC_CONTRACT_ABI);
  const address = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

  useEffect(() => {
    const generateQRCode = async () => {
      try {
        if (typeof window.ethereum !== 'undefined') {
          const web3 = new Web3(window.ethereum);

          const accounts = await web3.eth.getAccounts();

          if (accounts.length === 0) {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
          }

          setTimeout(async () => {
            try {
              const contract = new web3.eth.Contract(abi, address);
              const eventIds = await contract.methods.getEvents().call();

              const lastId = Array.isArray(eventIds) ? eventIds[eventIds.length - 1] : eventIds;

              const newQrUrl = `https://andino.vercel.app/mint/${lastId}`;
              setQrUrl(newQrUrl);
              setLoading(false);
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
  
    const canvas = document.getElementById('qrcode');
  
    if (!canvas) {
      console.error('Error: No se pudo encontrar el elemento canvas del QRCode.');
      return;
    }
  
    // Convertir el canvas a un Blob
    canvas.toBlob(async (blob) => {
      if (!blob) {
        console.error('Error: No se pudo convertir el canvas a un Blob.');
        return;
      }
  
      const shareMessage = `¡Felicitaciones por concluir con el evento. Puedes Escanear el QR o hacer click en el enlace para Reclamar tu Poap!`;
  
      const sharedData = {
        text: shareMessage,
        url: qrUrl,  // Usar el enlace directamente desde el estado
        files: [new File([blob], 'qrcode.png', { type: 'image/png' })],
      };
  
      try {
        await navigator.share(sharedData);
        console.log('URL compartida exitosamente');
      } catch (error) {
        console.error('Error al compartir:', error);
      }
    }, 'image/png'); // Especificar el tipo de imagen para el Blob
  };
  
  return (
    <div className="p-4">
      {loading ? (
        <div className="text-center">
          <p>Generando QR...</p>
        </div>
      ) : (
        <div className="text-center">
          <div className="mx-auto max-w-sm"> {/* Establecer un ancho máximo */}
            <QRCode id="qrcode" value={qrUrl} />
          </div>
  
          <p className="text-black mt-4">URL de Minteo: {qrUrl}</p>
          
          <div className="flex justify-center mt-4"> {/* Centrar los botones */}
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={copyToClipboard}
            >
              {copied ? '¡Copiado!' : 'Copiar enlace'}
            </button>
  
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4"
              onClick={shareQrUrl}
            >
              Compartir
            </button>
          </div>
        </div>
      )}
    </div>
  );
      }  

export default ImageLoad;
