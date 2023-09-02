import "./App.css";
import MapLayout from "./MapLayout";
import Navigation from "./Navigation";
import ResultContainer from "./ResultContainer";

function App() {
  return (
    <main className="min-h-screen min-w-screen flex">
      <MapLayout />
      <Navigation />
      <ResultContainer />
    </main>
  );
}

export default App;
