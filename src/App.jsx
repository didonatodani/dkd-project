import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";
import supabase from "./supabase/config";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import NewMoviePage from "./pages/NewMoviePage.jsx";
import EditPage from "./pages/EditPage.jsx";
import DetailsPage from "./pages/DetailsPage.jsx";
import AllMoviesPage from "./pages/AllMoviesPage.jsx";
import { Flip, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [moviesArray, setMoviesArray] = useState([]);

  async function getMovies() {
    try {
      let response = await supabase // well handled with try/catch! 👍
        .from("moviesdb") //name of the table in superbase
        .select("*"); //we want to import all table entries
      setMoviesArray(response.data);
    } catch {
      (error) => console.log("Error fetching data: ", error);
    }
  }

  const navigate = useNavigate();

  function changesDiscarded() {
    navigate(-1); // we haven't seen this in class, but it's a way to go back to the previous page
    alert("Changes discarded"); // we could use a toast here instead of an alert
  }

  return (
    <>
      <Navbar />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Flip}
      />
      <div className="main-container">
        <Routes>
          <Route
            path="/"
            element={
              <AllMoviesPage
                moviesArray={moviesArray}
                setMoviesArray={setMoviesArray}
                getMovies={getMovies}
              />
            }
          />
          <Route path="/about" element={<AboutPage />} />
          <Route
            path="/movie/:id"
            element={
              <DetailsPage
                moviesArray={moviesArray}
                setMoviesArray={setMoviesArray}
              />
            }
          />
          <Route
            path="/newmovie"
            element={
              <NewMoviePage
                getMovies={getMovies}
                changesDiscarded={changesDiscarded}
              />
            }
          />
          <Route
            path="/movie/:id/editmovie" // to name it /editmovie is a bit redundant, since we are already in the movie
            element={
              <EditPage
                moviesArray={moviesArray}
                changesDiscarded={changesDiscarded}
                getMovies={getMovies}
              />
            }
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
