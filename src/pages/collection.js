import Cards from '@/components/Cards'
import NavBarUser from '@/components/NavBarUser'
import React from 'react'

function collection() {
    return (

      
        <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-green-600 py-6 flex flex-col items-center sm:py-12">
              <NavBarUser/>
          <div className="container max-w-5xl mx-auto px-4">
            
          <h1 className="mt-32 text-white text-6xl font-bold">
          ¡Te damos la bienvenida a tu santuario personal de POAPs!
          <br />
            <span className="text-blue-300 text-4xl">Aquí encontrarás todos tus POAPs,que representan tu participación en eventos, conferencias y experiencias.</span>
          </h1>
        </div>
        <div className="w-5/6 my-10 ml-6">
            <div className="hidden sm:block opacity-50 z-0"></div>
            <div className="text-blue relative">
           
          <div className="text-white text-center mt-8">

          <div className="hidden sm:block opacity-50 z-0"></div>
        <div className="text-blue relative text-center bg-emerald-400 text-black px-4 py-2 rounded-full inline-block hover:bg-emerald-300">
          <h3 className="flex items-center justify-center h-full text-2xl font-bold">
            Explora tus POAPs minteados y disfruta de tus logros
          </h3>
        </div>
      </div>
        </div>
            <Cards />
          </div>
        </div>
      );
    }

export default collection
