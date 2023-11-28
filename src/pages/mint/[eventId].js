import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Loading from '@/components/Loading';


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
        <div>
            {
                loading ?

                    <Loading />

                    :
                    response ?

                        <div className='flex flex-col h-screen justify-center ml-60 mr-60 gap-28'>
                            <div className='flex flex-col gap-6'>

                                <p>The event id is {eventId}</p>
                                <p>Your address is {userAddress}</p>

                                <button className="bg-blue-500 text-black px-4 py-2 rounded w-48 hover:bg-slate-400" onClick={handleConnectMetamask}>
                                    Connect Metamask
                                </button>
                            </div>

                            <button className=" text-black px-4 py-2 rounded bg-emerald-400 hover:bg-emerald-300   " onClick={handleMintMyPoap}>
                                Mint my POAP
                            </button>

                        </div>

                        :

                        <div>

                            <div className="h-screen w-screen bg-white flex flex-col justify-center align-middle items-center gap-10 ">
                                <p className="text-4xl text-amber-950">A ocurrido el siguiente error</p>
                                <p className='text-4xl text-red-400'>{errorMessage}</p>
                                <button className=" text-white px-4 py-2 rounded bg-red-800" onClick={handleErrorMessage} >Entendido</button>
                            </div>

                        </div>

            }


        </div>
    )
}