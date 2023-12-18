import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Loading from '@/components/Loading';
import Cards from '@/components/Cards';

export default function Mint() {
  const router = useRouter();
  const { eventId } = router.query;

  const [userAddress, setUserAddress] = useState();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const handleConnectMetamask = async () => {
    try {
      if (window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        setUserAddress(accounts[0] || '');
      } else {
        console.error("Metamask no está instalado o no es compatible.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleMintMyPoap = async () => {
    setLoading(true);
    axios.get(`${process.env.NEXT_PUBLIC_BACKURL}/mint/${userAddress}/${eventId}`)
      .then(function (response) {
        console.log(response);
        setLoading(false);
        setResponse(true);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
        setResponse(false);
        setErrorMessage(error.message);
      });
  }

  const handleErrorMessage = () => {
    setResponse(true);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-green-600 py-6 flex flex-col justify-center sm:py-12">
      {loading ? (
        <Loading />
      ) : response ? (
        <div className="flex flex-col h-screen justify-center mx-6 sm:mx-12 lg:mx-24 xl:mx-32 gap-10">
          <div className="flex flex-col gap-6">
            <p className="text-lg text-white">Evento ID: {eventId}</p>
            <p className="text-lg text-white">Tu dirección: {userAddress}</p>
            <button
              className="bg-blue-500 text-black px-4 py-2 rounded w-48 hover:bg-slate-400"
              onClick={handleConnectMetamask}
            >
              Conectar MetaMask
            </button>
          </div>
          <button
            className="text-black px-4 py-2 rounded bg-emerald-400 hover:bg-emerald-300"
            onClick={handleMintMyPoap}
          >
            Generar mi POAP
          </button>
        </div>
      ) : (
        <div className="h-screen w-screen bg-white flex flex-col justify-center align-middle items-center gap-10">
          <p className="text-4xl text-amber-950">Ha ocurrido el siguiente error:</p>
          <p className="text-2xl text-red-400">{errorMessage}</p>
          <button
            className="text-white px-4 py-2 rounded bg-red-800 hover:bg-red-600"
            onClick={handleErrorMessage}
          >
            Entendido
          </button>
        </div>
      )}

      <Cards />
    </div>
  );
}
