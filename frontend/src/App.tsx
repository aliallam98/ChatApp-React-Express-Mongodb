import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <main
        className="relative h-screen bg-no-repeat bg-cover bg-center flex justify-center items-center  "
        style={{
          backgroundImage: `url(https://w.wallha.com/ws/13/GTmrxuNl.jpg)`,
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <Toaster />
        <Outlet />
      </main>
    </>
  );
}

export default App;
