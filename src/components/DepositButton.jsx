import { useState } from 'react';
import Web3 from 'web3';
import CardsUser from './CardsUser';

export default function DepositButton(params) {
  const [amount, setAmount] = useState("");

  async function handleDeposit(e) {
    e.preventDefault();

    const web3 = new Web3(window.ethereum);
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const accounts = await web3.eth.getAccounts();

    console.log(accounts);

    const amountToSend = web3.utils.toWei(amount, 'ether');
    const recipientAddress = process.env.NEXT_PUBLIC_ADDRESS_RELAYER;

    try {
      const gasLimit = await web3.eth.estimateGas({
        to: recipientAddress,
        value: amountToSend,
      });

      const gasPrice = await web3.eth.getGasPrice();
      const gasLimitNumber = Number(gasLimit);

      const result = await web3.eth.sendTransaction({
        from: accounts[0],
        to: recipientAddress,
        value: amountToSend,
        gas: gasLimitNumber,
        gasPrice: gasPrice,
      });

      console.log('Transaction Result:', result);
    } catch (error) {
      console.error('Transaction Error:', error.message || error);
    }
  }

  function handleInputChange(e) {
    setAmount(e.target.value);
  }

  return (
    <div className="bg-gradient-to-br from-indigo-600 to-green-600 min-h-screen overflow-auto">
      <div className="container max-w-5xl mx-auto px-4">
        <div className="w-4/5">
          <h1 className="mt-20 text-white text-4xl md:text-6xl font-bold">
            Envía MATIC al Relayer con confianza<br />
            <span className="text-blue-400">de forma rápida y segura.</span>
          </h1>
        </div>
        <div className="w-5/6 my-10 ml-6">
          <h3 className="text-gray-300">
            Realiza depósitos de MATIC en el relayer para<br />
            <strong className="text-white">asegurar transacciones rápidas y seguras</strong>
            <br />con facilidad y confianza.
          </h3>
        </div>
        <div className="flex items-center justify-center mt-6">
          <div className="flex items-center justify-center border w-1/2 p-8 rounded-lg border-orange-400 bg-white shadow-lg">
            <form className="flex flex-col gap-6 justify-center w-full">
              <label className="text-xl font-bold text-gray-800" htmlFor="deposit">
                Monto a depositar (MATIC)
              </label>
              <input
                type="number"
                id="deposit"
                placeholder="Ingresa la cantidad de MATIC"
                value={amount}
                onChange={(e) => handleInputChange(e)}
                className="px-4 py-3 border focus:ring-orange-500 focus:border-orange-700 w-full sm:text-sm border-orange-300 rounded-md focus:outline-none text-gray-800 bg-gray-100"
              />
              <button
                className="w-full bg-orange-500 text-white px-6 py-3 rounded-md focus:outline-none hover:bg-white hover:text-orange-600 hover:border-orange-500 transition-all duration-300"
                type="submit"
              >
                Enviar MATIC
              </button>
            </form>
          </div>
         
        </div>
      </div>
      <CardsUser/>
    </div>
  );
}
