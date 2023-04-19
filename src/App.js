import { Route, Routes } from "react-router-dom";
import Main from "./Main.js";
import Movie from "./Movie.js";
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/movies/:id" element={<Movie />} />
    </Routes>
  );
}
