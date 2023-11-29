import Cards from '@/components/Cards';
import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import Head from 'next/head';

const Pruebas = () => (
  <div>
<NavBar/>

    <div className="bg-gradient-to-br from-indigo-600 to-green-600 min-h-screen overflow-auto">
      <div className="container max-w-5xl mx-auto px-4">
        <div className="w-4/5">
          <h1 className="mt-32 text-white text-6xl font-bold">
            The fastest, most secure dev environment <br />
            <span className="text-blue-400">on the planet.</span>
          </h1>
        </div>
        <div className="w-5/6 my-10 ml-6">
          <h3 className="text-gray-300">
            Create, edit & deploy fullstack apps with <br />
            <strong className="text-white">faster package installations & greater security</strong>
            <br />than even local environments.
          </h3>
        </div>
        <div className="hidden sm:block opacity-50 z-0">
     
        </div>
        <div className="text-white relative">
          <h3 className="uppercase font-semibold">Frameworks & Libraries</h3>

          </div>
        </div>
        <Cards/>
      </div>
      <Footer/>

  </div>
);

export default Pruebas;
