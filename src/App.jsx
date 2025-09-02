import { Landing } from "./Components/Landing";

import { SearchProvider } from "./Components/SearchContext";

function App() {
  return (
    <div className="min-h-[100dvh] bg-pink-50">
      <SearchProvider>
        <Landing />
      </SearchProvider>
    </div>
  );
}

export default App;
