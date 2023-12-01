import React, { useState } from 'react';
import QRCode from 'qrcode.react';

const ImageLoad = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const generateQRCode = () => {
    // Aquí puedes realizar cualquier lógica adicional necesaria
    const newImageUrl = 'http://localhost:3000/mint/10';
    setImageUrl(newImageUrl);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(imageUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareUrl = () => {
    navigator.share({ url: imageUrl })
      .then(() => console.log('URL compartida exitosamente'))
      .catch((error) => console.error('Error al compartir:', error));
  };

  return (
    <div className="p-4">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
        onClick={generateQRCode}
      >
        Generar QR
      </button>

      {imageUrl && (
        <div className="text-center">
         
          

          <QRCode value={imageUrl} />

          <p className="text-black">URL de la imagen: {imageUrl}</p>

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
            onClick={copyToClipboard}
          >
            {copied ? '¡Copiado!' : 'Copiar enlace'}
          </button>

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
            onClick={shareUrl}
          >
            Compartir
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageLoad;
