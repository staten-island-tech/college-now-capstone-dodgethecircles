export default function SinglePlayer() {
  return (
    <div>
      <div className="topBar grid grid-areas-score-click-home">
        <h1 id="score" className="ml-4 text-2xl inline-block">
          Points: 0
        </h1>
        <h2 className="click inline-block text-2.25rem">Click to Start</h2>
        <a href="/">
          <button className="home-button mr-2 mt-0.5 float-right w-16 h-16 inline-block px-10 py-20 border-2 border-solid border-gray-700 rounded-full text-center text-18px text-gray-700 no-underline transition-all duration-200 ease-in-out relative">
            <i className="fas fa-home font-FontAwesome inline-block mr-12 text-25px"></i>
          </button>
        </a>
      </div>
      <div className="container m-auto mt-4">
        <canvas id="gameArea"></canvas>
      </div>
    </div>
  );
}
