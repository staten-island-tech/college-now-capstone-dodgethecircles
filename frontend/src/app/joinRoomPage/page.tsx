export default function JoinRoom() {
  return (
    <div className="flex justify-around items-center bg-gray-700 text-white h-screen m-0">
      <div className="w-45 p-20 text-center bg-gray-800 rounded-lg shadow-md h-90">
        <h2>Join Game Rooms</h2>
        <form>
          <input
            type="text"
            placeholder="Room code"
            className="block m-10 0 p-10 w-full box-border border-none rounded-md bg-gray-900 text-black"
          />
          <input
            type="password"
            placeholder="Password"
            className="block m-10 0 p-10 w-full box-border border-none rounded-md bg-gray-900 text-black"
          />
          <input
            type="submit"
            value="Join"
            className="p-10 20 bg-green-600 text-white border-none rounded-md cursor-pointer transition duration-200 ease-in-out font-bold text-uppercase tracking-wider"
          />
        </form>
      </div>
      <div className="w-45 p-20 text-center bg-gray-800 rounded-lg shadow-md h-90">
        <h3>Available Rooms</h3>
        <div className="m-10 0 p-10 bg-gray-900 text-left rounded-md shadow-md transition duration-200 ease-in-out cursor-pointer">
          <span>Room code: 123456</span>
          <span>Players: 5/10</span>
        </div>
        <div className="m-10 0 p-10 bg-gray-900 text-left rounded-md shadow-md transition duration-200 ease-in-out cursor-pointer">
          <span>Room code: 654321</span>
          <span>Players: 8/10</span>
        </div>
      </div>
    </div>
  );
}
