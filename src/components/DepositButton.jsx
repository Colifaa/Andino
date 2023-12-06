import { useState } from 'react';
import Web3 from 'web3';


export default function DepositButton(params) {

    const [amount, setAmount] = useState("");


    async function handleDeposit(e) {

        e.preventDefault();

        const web3 = new Web3(window.ethereum);
        window.ethereum.enable();
        const accounts =  await web3.eth.getAccounts();;
        console.log(accounts);


        const amountToSend = web3.utils.toWei(amount, 'ether');
        const recipientAddress = "0x873bEF9d900384E83c32Be16C4f227C204440BE3";


        try {
            const result = await web3.eth.sendTransaction({
              from: accounts[0],
              to: recipientAddress,
              value: amountToSend,
            });
        
            console.log('Transaction Result:', result);
          } catch (error) {
            console.error('Transaction Error:', error);
          }


    }

    function handleInputChange(e) {
        console.log(typeof e.target.value);
        setAmount(e.target.value);
    }

    return (

        <div className="flex w-screen justify-center items-center">
            <div className="flex justify-center  border w-2/6 p-10 rounded gap-8 border-orange-400 bg-white bg-opacity-90 ">
                <form className="flex flex-col w-80 gap-10 justify-center" onSubmit={handleDeposit}>
                    <div className="flex justify-center gap-5">
                        <label className="leading-loose" htmlFor="deposit">Depositar</label>
                        <input type="number" id="deposit" placeholder="Deposite Matic en el relayer" value={amount} onChange={e => handleInputChange(e)} className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"></input>
                    </div>
                    <div>
                        <input className="w-full border border-opacity-0 transition-all bg-orange-500 cursor-pointer  flex justify-center items-center  text-white px-4 py-3 rounded-md focus:outline-none hover:bg-white hover:text-orange-600 hover:border-orange-500" type="submit" value="Depositar"></input>
                    </div>
                </form>
            </div>
        </div>


    )
}