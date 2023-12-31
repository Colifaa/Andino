import QRCode from "qrcode.react";
import ImageLoad from "../pages/imageLoad";
import axios from "axios";
import DepositButton from "./DepositButton";

import { useState } from "react";
import Web3 from "web3";
import Cards from "./Cards";
import CardsUser from "./CardsUser";
import Wallet from "./wallet";


// Contrato ABI
// Imprime el contenido antes de parsear


const abi = JSON.parse(process.env.NEXT_PUBLIC_CONTRACT_ABI);

// Dirección del contrato
const address = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

export default function Admin() {
  const [url, setUrl] = useState("");
  const [eventName, seteventName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [eventNum, setEventNum] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [loadingQR, setLoadingQR] = useState(false);
  const [eventId, setEventId] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [eventCreated, setEventCreated] = useState(false);

  const uploadFile = async (file) => {
    const data = new FormData();
    data.append("file", file);

    const uploadUrl = "https://api.pinata.cloud/pinning/pinFileToIPFS"; // Reemplaza con tu URL de carga a Pinata

    const headers = {
      "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
      pinata_api_key: process.env.NEXT_PUBLIC_PINATA_API_KEY,
      pinata_secret_api_key: process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY,
    };

    try {
      const response = await axios.post(uploadUrl, data, { headers });
      const newCid = response.data.IpfsHash;
      const ipfsGateway = "https://ipfs.io/ipfs/";
      const newImageUrl = ipfsGateway + newCid;

      console.log("File uploaded successfully. CID:", newCid);
      console.log("IPFS URL:", newImageUrl);

      setImageUrl(newImageUrl);

      return { cid: newCid, url: newImageUrl };
    } catch (error) {
      console.error("Error uploading file:", error);
      return { error };
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const createEvent = async (e) => {
    e.preventDefault();

    const currentDate = new Date();
    const currentDateInSeconds = Math.floor(currentDate.getTime() / 1000);

    if (!imageFile) {
      console.error("Debes subir una imagen antes de crear el evento.");
      return;
    }

    try {
      const { url: imageUrl } = await uploadFile(imageFile);

      if (typeof window.ethereum !== "undefined") {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });

        const accounts = await web3.eth.getAccounts();
        const contract = new web3.eth.Contract(abi, address); // Reemplaza con tu dirección de contrato

        const startDateInSeconds = Math.floor(
          new Date(startDate).getTime() / 1000
        );
        const expirationDateInSeconds = Math.floor(
          new Date(endDate).getTime() / 1000
        );

        if (expirationDateInSeconds < startDateInSeconds) {
          console.error("La fecha de finalización debe ser en el futuro");
          return;
        }

        setLoadingQR(true); // Establece el estado de carga a true antes de la generación del QR

        console.log("Antes de llamar a createPoap, imageUrl es:", imageUrl);

        const metadata = {
          name: eventName,
          description: eventDescription,
          image: imageUrl,
          attributes: [
            {
              trait_type: "Fecha de inicio",
              value: startDate,
            },
            {
              trait_type: "Fecha de finalización",
              value: endDate,
            },
            {
              trait_type: "Poaps Creados",
              value: eventNum,
            },
          ],
        };

        const uploadMetadata = async () => {
          try {
            const { url: metadataUrl } = await uploadFile(
              new Blob([JSON.stringify(metadata)], { type: "application/json" })
            );
            console.log("Metadata uploaded successfully. URL:", metadataUrl);
            return metadataUrl;
          } catch (error) {
            console.error("Error uploading metadata:", error);
            return { error };
          }
        };

        const metadataJSON = JSON.stringify(metadata);

        const metadataUrl = await uploadMetadata();

        const result = await contract.methods
          .createPoap(
            eventName,
            startDateInSeconds,
            expirationDateInSeconds,
            eventDescription,
            eventNum,
            metadataUrl // Agrega la URL de la metadata aquí
          )
          .send({ from: accounts[0] });

        console.log("Evento creado:", result);

        const CID = result.cid;
        const generatedUrl = `https://ipfs.io/ipfs/${CID}`;

        console.log("URL del evento:", generatedUrl);
        setUrl(generatedUrl);
        setEventCreated(true);
      } else {
        console.error("Web3 no está disponible en este navegador");
      }
    } catch (error) {
      console.error("Error al crear el evento:", error);
    } finally {
      setLoadingQR(false); // Establece el estado de carga a false después de la generación del QR
    }
  };

  return (
  
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-green-600 py-6 flex flex-col justify-center sm:py-12">
     
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
            <br />
            con instalaciones de paquetes rápidas y seguridad garantizada.
          </h3>
        </div>
        <div className="hidden sm:block opacity-50 z-0"></div>
        <div className="text-white relative">
          <h3 className="uppercase font-semibold">Eventos y Ocasiones</h3>
        </div>
      </div>

      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
          <div className="max-w-md mx-auto">
            <div className="flex items-center space-x-5">
              
            <div className="flex items-center space-x-5 justify-center">
  <div className="h-20 w-20' bg-yellow-200 rounded-full flex-shrink-0 relative">
    <img
      src="https://i.ibb.co/5jtGkKZ/9ef73640-b5cb-4d8b-aa78-ac26ce045444.jpg"
      alt="Imagen"
      className="rounded-full object-cover h-full w-full"
    />
  </div>
  <div className="block pl-2 font-semibold text-xl text-center text-gray-700">
    <h2 className="leading-relaxed">Crea tu evento</h2>
    <p className="text-sm text-gray-500 font-normal leading-relaxed">
      "Odisea de Poaps: Donde las Ideas se Transforman en Asombrosos Poaps NFT"
    </p>
  </div>
</div>

            </div>
            <form onSubmit={createEvent}>
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="flex flex-col">
                  <label className="leading-loose">Nombre del evento</label>
                  <input
                    type="text"
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    placeholder="Event title"
                    value={eventName}
                    onChange={(e) => seteventName(e.target.value)}
                  />
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex flex-col">
                    <label className="leading-loose">Comienza</label>
                    <div className="relative focus-within:text-gray-600 text-gray-400">
                      <input
                        type="date"
                        className="pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                      />
                      <div className="absolute left-3 top-2">
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label className="leading-loose">Finaliza</label>
                    <div className="relative focus-within:text-gray-600 text-gray-400">
                      <input
                        type="date"
                        className="pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                      />
                      <div className="absolute left-3 top-2">
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="leading-loose">Cantidad de Poaps</label>
                  <input
                    type="text"
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    placeholder="Cantidad de Poaps"
                    value={eventNum}
                    onChange={(e) => setEventNum(e.target.value)}
                  />
                </div>

                <div className="flex flex-col">
                  <label className="leading-loose"> Descripción</label>
                  <textarea
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    placeholder="Descripción del evento"
                    value={eventDescription}
                    onChange={(e) => setEventDescription(e.target.value)}
                  />
                </div>

                <div className="flex flex-col">
                  <label className="leading-loose"> Imagen</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                  />
                </div>
              </div>
              {eventCreated && <ImageLoad />}{" "}
              {/* Renderizar ImageLoad solo si se ha creado un evento */}
              <div className="pt-4 flex items-center space-x-4">
                <button
                  className="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none"
                  type="submit"
                  disabled={loadingQR}
                >
                  {loadingQR ? (
                    <div className="flex items-center space-x-2">
                      <span>Creando...</span>
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                    </div>
                  ) : (
                    <span>Crear Poap</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <DepositButton />
    </div>
  );
}