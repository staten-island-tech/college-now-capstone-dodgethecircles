export default function GameRoom() {
  return (
    <div className="flex flex-col items-center bg-gray-900 text-white text-base h-screen">
      <div className="border-b-2 border-yellow-600 w-1/2 text-center py-4">
        Player List (1/6):
      </div>
      <div className="border-b-2 border-yellow-600 w-1/2 text-center py-4">
        Room Code: ABCDEF
      </div>
      <div className="w-1/2 text-center py-4">
        <ol>
          <li className="text-left mb-12"></li>
          <li className="text-left mb-12"></li>
          <li className="text-left mb-12"></li>
          <li className="text-left mb-12"></li>
          <li className="text-left mb-12"></li>
          <li className="text-left mb-12"></li>
        </ol>
      </div>
      <div className="w-1/2 text-center py-4">
        <button className="bg-yellow-600 text-black border-2 border-black rounded-full py-4 px-8 transition duration-200 ease-in-out transform hover:bg-black hover:text-white uppercase font-bold tracking-wider mt-8">
          Start Game
        </button>
      </div>
    </div>
  );
}
