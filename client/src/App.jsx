import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="text-center bg-white p-10 rounded-2xl shadow-xl max-w-lg w-full transform hover:scale-105 transition-transform duration-300">
          <div className="mb-6 flex justify-center">
            <div className="h-20 w-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Grocery Delivery App</h1>
          <p className="text-gray-500 text-lg mb-8">
            MERN Stack Project Setup Successful! Your client is ready and connected to Tailwind CSS.
          </p>
          <div className="inline-flex space-x-4">
            <span className="px-4 py-2 bg-green-50 text-green-700 rounded-lg font-medium text-sm">React + Vite</span>
            <span className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-medium text-sm">Tailwind CSS</span>
            <span className="px-4 py-2 bg-purple-50 text-purple-700 rounded-lg font-medium text-sm">React Router</span>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
