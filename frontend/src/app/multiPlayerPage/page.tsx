export default function MultiPlayer() {
  return (
    <div style={{ margin: 0, padding: 0 }} className="flex h-98v" id="game">
      <canvas
        id="player-canvas"
        style={{
          backgroundColor: "black",
          width: "85vw",
          aspectRatio: "17 / 20",
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#eee",
          width: "15vw",
        }}
        id="enemy-canvas-container"
      >
        <canvas className="m-10 bg-white"></canvas>
        <canvas className="m-10 bg-white"></canvas>
        <canvas className="m-10 bg-white"></canvas>
        <canvas className="m-10 bg-white"></canvas>
        <canvas className="m-10 bg-white"></canvas>
      </div>
    </div>
  );
}
