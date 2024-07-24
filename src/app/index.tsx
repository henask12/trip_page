import Head from 'next/head';

export default function TitleMe() {
  return (
    <div>
      <Head>
        <title>heni suck DA</title>
      </Head>
      <div className="bg-blue-500 text-white min-h-screen">
        <header className="container mx-auto py-4 text-center">
          <h1 className="text-3xl font-bold">Your Trip Starts Here</h1>
        </header>
        <div className="bg-blue-700 py-8">
          <div className="container mx-auto bg-white rounded-md shadow-md p-6">
            <div className="flex justify-around">
              <button className="px-4 py-2 bg-blue-500 text-white rounded">Hotels</button>
              <button className="px-4 py-2 bg-white text-blue-500 rounded">Flights</button>
              <button className="px-4 py-2 bg-white text-blue-500 rounded">Trains</button>
              <button className="px-4 py-2 bg-white text-blue-500 rounded">Cars</button>
              <button className="px-4 py-2 bg-white text-blue-500 rounded">Attractions & Tours</button>
              <button className="px-4 py-2 bg-white text-blue-500 rounded">Flight + Hotel</button>
            </div>
            <div className="flex mt-6">
              <div className="w-full">
                <label className="block text-gray-700">From</label>
                <input className="w-full border rounded p-2 mt-1" type="text" placeholder="Amsterdam" />
              </div>
              <div className="w-full ml-4">
                <label className="block text-gray-700">To</label>
                <input className="w-full border rounded p-2 mt-1" type="text" placeholder="Shanghai" />
              </div>
            </div>
            <div className="flex mt-6">
              <div className="w-full">
                <label className="block text-gray-700">Departure</label>
                <input className="w-full border rounded p-2 mt-1" type="date" />
              </div>
              <div className="w-full ml-4">
                <label className="block text-gray-700">Return</label>
                <input className="w-full border rounded p-2 mt-1" type="date" />
              </div>
            </div>
            <div className="flex mt-6 justify-center">
              <button className="px-6 py-2 bg-blue-500 text-white rounded">Search</button>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-100 p-6 rounded shadow-md">
            <h2 className="text-xl font-bold">Time to Travel!</h2>
            <p className="mt-2">Deals that open up the world</p>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Book Now</button>
          </div>
          <div className="bg-blue-100 p-6 rounded shadow-md">
            <h2 className="text-xl font-bold">Attractions & Tours</h2>
            <p className="mt-2">Up to 25% OFF</p>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Book Now</button>
          </div>
          <div className="bg-blue-100 p-6 rounded shadow-md">
            <h2 className="text-xl font-bold">Save Big on Flights</h2>
            <p className="mt-2">Save up to $10 on flights</p>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Book Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}
