import CardPoaps from '@/components/CardPoaps';
import Cards from '@/components/Cards';
import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import Head from 'next/head';

const Home = () => (
  <div>
<NavBar/>
<div className="bg-gradient-to-br from-indigo-600 to-green-600 min-h-screen overflow-auto">
  <div className="container max-w-5xl mx-auto px-4">
    <div className="w-4/5">
      <h1 className="mt-32 text-white text-6xl font-bold">
      La forma más rápida y segura de crear  POAPs <br />
        <span className="text-blue-400">para tus eventos.</span>
      </h1>
    </div>
    <div className="w-5/6 my-10 ml-6">
      <h3 className="text-gray-300">
        Diseña, edita y distribuye POAPs únicos para <br />
        <strong className="text-white">cualquier tipo de evento</strong>
        <br />con instalaciones de paquetes rápidas y seguridad garantizada.
      </h3>
    </div>
    <div className="hidden sm:block opacity-50 z-0"></div>
    <div className="text-white relative">
      <h3 className="uppercase font-semibold">Eventos y Ocasiones</h3>
      {/* Puedes agregar más contenido relacionado con la creación de POAPs aquí */}
    </div>
  </div>
  
        <CardPoaps/>
      </div>
      <Footer/>

  </div>
);

export default Home;
