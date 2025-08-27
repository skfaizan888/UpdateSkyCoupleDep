import { Landing } from "./Components/Landing";
import { Login } from "./Components/Login";
import { ProfileStart } from "./Components/ProfileStart";
import { SearchProvider } from "./Components/SearchContext";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* <SearchProvider> */}
      <Landing />
      {/* </SearchProvider> */}
      {/* <Login /> */}
      {/* <ProfileStart /> */}
    </div>
  );
}

export default App;
