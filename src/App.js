import Map from "./components/Map";
import Navbar from "./layouts/Navbar";
import { StateProvider } from "./contexts/StateContext";
import Disclaimer from "./components/Disclaimer";
import { QueryClient, QueryClientProvider } from "react-query";

import "leaflet/dist/leaflet.css";
import "./index.css";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Disclaimer />
      <StateProvider>
        <Navbar />
        <Map />
      </StateProvider>
    </QueryClientProvider>
  );
}

export default App;
