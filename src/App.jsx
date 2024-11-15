import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import supabase from "./supabase/config";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ErrorPage from "./pages/ErrorPage";
import NewMoviePage from "./pages/NewMoviePage";
import EditPage from "./pages/EditPage";
import DetailsPage from "./pages/DetailsPage";
import AllMoviesPage from "./pages/AllMoviesPage";

function App() {
  const [moviesArray, setMoviesArray] = useState([])

  async function getMovies() {
    try {
      let response = await supabase
      .from("movie_data_3") //name of the table in superbase
      .select("*") //we want to import all table entries
      setMoviesArray(response.data);  
    } catch {(error) => console.log("Error fetching data: ", error);
    }
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/allmovies" element={<AllMoviesPage moviesArray={moviesArray} setMoviesArray={setMoviesArray} getMovies={getMovies}/>}/>
        <Route path="/movie/:id" element={<DetailsPage/>}/>
        <Route path="/newmovie" element={<NewMoviePage />} />
        <Route path="/editmovie" element={<EditPage/>}/>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
