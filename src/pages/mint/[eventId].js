import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Loading from '@/components/Loading';
import Cards from '@/components/Cards';
import { Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react';
import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import Wallet from '@/components/wallet';
import NavBarUser from '@/components/NavBarUser';
import CardsUsersRecent from '@/components/CardsUsersRecent';
import MetamaskPasos from '@/components/MetamaskPasos';

export default function Mint() {
  const router = useRouter();
  const { eventId } = router.query;

  const [userAddress, setUserAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Intentar obtener la dirección del usuario al cargar la página
    const getUserAddress = async () => {
      try {
        if (window.ethereum) {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts && accounts.length > 0) {
            setUserAddress(accounts[0]);
          }
        }
      } catch (error) {
        console.error('Error al obtener la dirección del usuario:', error);
      }
    };

    getUserAddress();
  }, []); // Ejecutar solo al montar el componente



  const handleConnectMetamask = async () => {
    try {
      if (window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        setUserAddress(accounts[0] || '');
        setResponse(true); // Mostrar mensaje de conexión establecida
      } else {
        console.error('Metamask no está instalado o no es compatible.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleMintMyPoap = async () => {
    setLoading(true);
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKURL}/mint/${userAddress}/${eventId}`)
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
  };

  const handleErrorMessage = () => {
    setResponse(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-green-600 py-6 flex flex-col items-center sm:py-12">
      <NavBarUser />

      {loading ? (
        <Loading />
      ) : response ? (
        <div className="flex-grow text-center space-y-8">
          <div>
            <h1 className="mt-16 text-white text-6xl font-bold">
              ¡Bienvenido a POAPs Generator!
            </h1>
          </div>
          <div>
            <h3 className="text-gray-300 text-2xl md:text-3xl lg:text-2xl">
              Aquí podrás reclamar tu POAP
              <strong className="text-white"> de cualquier tipo de evento </strong>
              de forma rápida y segura.
            </h3>
          </div>
          <div className="flex flex-col gap-6 text-white text-lg md:text-xl lg:text-md">
            <p>
              {userAddress ? (
                <span className="font-bold bg-emerald-400 text-black px-4 py-2 rounded-full inline-block hover:bg-emerald-300 text-2xl">
                  Conexión establecida: {userAddress}
                </span>
              ) : 'Conecta tu billetera MetaMask haciendo clic en el botón "Conectar MetaMask".'}
            </p>
            {!userAddress && (
              <button
                className="text-black px-4 py-2 rounded bg-emerald-400 hover:bg-emerald-300 text-lg md:text-xl lg:text-2xl"
                onClick={handleConnectMetamask}
              >
                Conectar MetaMask
              </button>
            )}
            {userAddress && (
              <>
                <p>
               
                </p>
                <p className='font-bold'>
                  Haz clic en "Reclamar mi POAP" para recibir tu POAP único.
                </p>

                <p className='font-bold text-2xl'>
                 Recuerda debes tener instalado MetaMask para proceder con el minteo.
                 
                </p>

               
          <p className='text-2xl'>Instala MetaMask desde aqui: <a className=" font-bold text-green-500" href="https://metamask.io/" target="_blank" rel="noopener noreferrer">https://metamask.io/</a></p>
      

                <button
                  className="font-bold text-black px-4 py-2 rounded bg-emerald-400 hover:bg-emerald-300 text-lg md:text-xl lg:text-2xl"
                  onClick={handleMintMyPoap}
                >
                  Reclamar mi POAP
                </button>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="h-screen w-screen flex flex-col justify-center items-center gap-10">
          <Alert status="error" variant="subtle" flexDirection="column" alignItems="center" justifyContent="center" textAlign="center" width="400px" mb="8">
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              Ha ocurrido un error
            </AlertTitle>
            <AlertDescription maxWidth="sm">
              {errorMessage}
            </AlertDescription>
          </Alert>
          <button
            className="text-white px-4 py-2 rounded bg-red-800 hover:bg-red-600"
            onClick={handleErrorMessage}
          >
            Entendido
          </button>
        </div>
      )}

      <div className="text-white text-center mt-8">
        {userAddress && (
          <div className="bg-emerald-400 text-black px-4 py-2 rounded-full inline-block hover:bg-emerald-300 text-2xl">
            <p className="font-bold">
              ¡Explora tus POAPs minteados recientemente!
            </p>
          </div>
        )}
        <CardsUsersRecent />
        <MetamaskPasos/>
      </div>
    </div>
  );
}