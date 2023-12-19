import React from 'react';

function MetamaskPasos() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-4 text-gray-800">Para agregar nuestro hermoso Poap a nuestra METAMASK debes seguir los siguientes pasos</h1>
      <ol className="list-none pl-6 text-lg text-gray-700">
        <li className="text-4xl mb-4">
          <p>Instala MetaMask si aún no lo has hecho: <a className="text-blue-500" href="https://metamask.io/" target="_blank" rel="noopener noreferrer">https://metamask.io/</a></p>
        </li>
        <li className="text-4xl mb-4">
          <p>Accede al enlace del token que se te envió por WhatsApp.</p>
        </li>
        <li className="text-4xl mb-4">
          <p>Copia el Token ID del NFT.</p>
        </li>
        <li className="text-4xl mb-4">
          <p>Abre MetaMask desde tu navegador o la aplicación.</p>
        </li>
        <li className="text-4xl mb-4">
          <p>Ve a la pestaña "Assets" (Activos).</p>
        </li>
        <li className="text-4xl mb-4">
          <p>Selecciona "Agregar Token" o "Add Token".</p>
        </li>
        <li className="text-4xl mb-4">
          <p>Elige "Token Personalizado" o "Custom Token".</p>
        </li>
        <li className="text-4xl mb-4">
          <p>Ingresa la dirección del contrato: <code className="bg-gray-200 p-1">0x6019c08DDC3A113AEd21D7a56ca61FE9040F54ef</code></p>
        </li>
        <li className="text-4xl mb-4">
          <p>Ingresa el Token ID que copiaste.</p>
        </li>
        <li className="text-4xl mb-4">
          <p>Confirma la adición del NFT.</p>
        </li>
      </ol>
    </div>
  );
}

export default MetamaskPasos;
