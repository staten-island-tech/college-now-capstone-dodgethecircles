export default function GameSelect() {
  return (
    <div className="grid grid-cols-3 w-160rem">
      <div className="text" id="title">
        <h1 className="text-6xl text-white mt-12rem mb-8rem">
          Select Your Game Mode
        </h1>
      </div>
      <div className="text" id="mult">
        <h2 className="text-4rem text-white mb-4rem">Multi-Player</h2>
      </div>
      <div className="text" id="single">
        <h2 className="text-4rem text-white">Single Player</h2>
      </div>
      <div className="text">
        <button className="game-button w-40rem inline-block px-10 py-2 rounded-lg bg-green-500 text-white text-lg text-center hover:bg-green-600 transform transition duration-200 ease-in-out shadow-md hover:shadow-lg">
          Join A Game
        </button>
      </div>
      <div className="text">
        <button className="game-button w-40rem inline-block px-10 py-2 rounded-lg bg-green-500 text-white text-lg text-center hover:bg-green-600 transform transition duration-200 ease-in-out shadow-md hover:shadow-lg">
          Create A Game
        </button>
      </div>
      <div className="text">
        <a href="single/">
          <button className="game-button w-40rem inline-block px-10 py-2 rounded-lg bg-green-500 text-white text-lg text-center hover:bg-green-600 transform transition duration-200 ease-in-out shadow-md hover:shadow-lg">
            Single Player
          </button>
        </a>
      </div>
    </div>
  );
}
