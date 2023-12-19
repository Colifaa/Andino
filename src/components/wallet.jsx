import { useState } from 'react';

const Wallet = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(false);

  const connectMetaMask = async () => {
    try {
      setLoading(true);

      // Simular una conexión con un retraso de 2000 milisegundos
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Solicitar al usuario autorización para conectarse a MetaMask
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      // Si se autoriza, establecer la conexión
      setIsConnected(true);
      console.log('MetaMask conectado exitosamente');
    } catch (error) {
      console.error('Error al conectar con MetaMask:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md">
      <nav className="fixed top-0 z-10 w-full p-4 transition duration-700 ease-out bg-[#YourPOAPColor] shadow-md border-[#YourBorderColor]">
        <div className="flex justify-end items-center">
          <div className="flex items-center gap-4 text-lg font-bold">
            {!isConnected ? (
              <button
                onClick={connectMetaMask}
                className="px-4 py-2 text-black transition duration-700 ease-out bg-white border border-black rounded-md hover:bg-black hover:bg-opacity-50 hover:text-white"
                disabled={loading} // Deshabilitar el botón durante la carga
              >
                {loading ? 'Conectando...' : 'Conectar MetaMask'}
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <p className="px-4 py-2 text-black border border-black rounded-md bg-black bg-opacity-50 hover:bg-opacity-100">
                  Conectado a tu MetaMask
                </p>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Wallet;
