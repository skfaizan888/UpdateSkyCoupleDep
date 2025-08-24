import { Landing } from "./Components/Landing";
import { SearchProvider } from "./Components/SearchContext";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <SearchProvider>
        <Landing />
      </SearchProvider>
    </div>
  );
}

export default App;
