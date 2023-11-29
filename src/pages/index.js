import React from 'react'



	import { useState } from 'react';
	import Image from 'next/image';
	
	const Home = () => {
	 const [buttonText, setButtonText] = useState('Drop me');
	
	 const handleDrop = () => {
		setButtonText('Claimed');
	 };
	
	 return (
		<div className="bg-gray-100 min-h-screen">
		  <div className="relative flex items-center justify-center min-h-screen">
			<div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-center p-8">
			  <h1 className="text-6xl font-bold text-center text-white">
				Drop to Win POAPs
			  </h1>
			</div>
			<div className="relative z-20 p-8">
			  <div className="relative w-64 h-64">
				<Image
				  src="/drop.png"
				  alt="Drop to win POAPs"
				  layout="fill"
				  objectFit="contain"
				/>
			  </div>
			  <button
				className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-gradient-to-l focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
				onClick={handleDrop}
			  >
				{buttonText}
			  </button>
			</div>
		  </div>
		</div>
	 );
	};
	
	export default Home;
