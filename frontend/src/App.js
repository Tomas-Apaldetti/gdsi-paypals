import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Other from "./components/Other";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/other" element={<Other />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
