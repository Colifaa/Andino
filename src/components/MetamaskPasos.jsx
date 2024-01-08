import React from 'react';

function MetamaskPasos() {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Cómo agregar nuestro Poap a MetaMask</h1>
      <ol className="list-none pl-6 text-lg text-gray-700">
        <li className="mb-6">
          <p className="text-xl font-bold ">
            1. Instala MetaMask si aún no lo has hecho:{' '}
            <a
              className="text-green-600 underline"
              href="https://metamask.io/"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://metamask.io/
            </a>
          </p>
        </li>
        <li className="mb-6">
          <p className="text-xl font-bold ">2. Accede al enlace del token que se te envió por WhatsApp.</p>
        </li>
        <li className="mb-6">
          <p className="text-xl font-bold">3. Copia el Token ID del NFT.</p>
        </li>
        <li className="mb-6">
          <p className="text-xl font-bold">4. Abre MetaMask desde tu navegador o la aplicación.</p>
        </li>
        <li className="mb-6">
          <p className="text-xl font-bold">5. Ve a la pestaña "Assets" (Activos).</p>
        </li>
        <li className="mb-6">
          <p className="text-xl font-bold">6. Selecciona "Agregar Token" o "Add Token".</p>
        </li>
        <li className="mb-6">
          <p className="text-xl font-bold">7. Elige "Token Personalizado" o "Custom Token".</p>
        </li>
        <li className="mb-6">
          <p className="text-xl font-bold">
            8. Ingresa la dirección del contrato:{' '}
            <code className="bg-gray-200 p-1">0x6019c08DDC3A113AEd21D7a56ca61FE9040F54ef</code>
          </p>
        </li>
        <li className="mb-6">
          <p className="text-xl font-bold">9. Ingresa el Token ID que copiaste.</p>
        </li>
        <li className="mb-6">
          <p className="text-xl font-bold">10. Confirma la adición del NFT.</p>
        </li>
      </ol>
    </div>
  );
}

export default MetamaskPasos;
