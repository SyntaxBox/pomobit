import { useUI } from "../hooks";

function App() {
  const { workPallet, breakPallet } = useUI();

  return (
    <div
      className="h-screen"
      style={{
        background: breakPallet.background,
      }}
    >
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </div>
  );
}

export default App;
