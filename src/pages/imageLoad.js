import React, { useState } from 'react';
import axios from 'axios';
import QRCode from 'qrcode.react';
require('dotenv').config();

const uploadUrl = 'https://api.pinata.cloud/pinning/pinFileToIPFS';

const ImageLoad = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const uploadFile = async (file) => {
    const data = new FormData();
    data.append('file', file);

    const headers = {
      'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
      'pinata_api_key': process.env.NEXT_PUBLIC_PINATA_API_KEY,
      'pinata_secret_api_key': process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY
    };

    try {
      const response = await axios.post(uploadUrl, data, { headers });
      const newCid = response.data.IpfsHash;
      const ipfsGateway = 'https://gateway.pinata.cloud/ipfs/';
      const newImageUrl = ipfsGateway + newCid;

      console.log('File uploaded successfully. CID:', newCid);
      console.log('IPFS URL:', newImageUrl);

      setImageUrl(newImageUrl);

      return { cid: newCid, url: newImageUrl };
    } catch (error) {
      console.error('Error uploading file:', error);
      return { error };
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const result = await uploadFile(file);
    console.log(result);
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
     <label htmlFor="fileUpload" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
       Subir archivo
     </label>
     <input type="file" id="fileUpload" onChange={handleFileUpload} className="hidden" />
 
     {imageUrl && (
       <div className="text-center">
         {/* POAP redondo */}
         <div className="w-20 h-20 rounded-full overflow-hidden inline-block">
           <img src={imageUrl} alt="POAP" className="w-full h-full object-cover" />
         </div>
 
         <QRCode value={imageUrl} />
        {/* <button
           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 mr-2"
     onClick={copyToClipboard}
     >
           {copied ? '¡Copiado!' : 'Copiar enlace'}
         </button>*/}
         <p className="text-black">URL de la imagen: {imageUrl}</p>
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
