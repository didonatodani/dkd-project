import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard.jsx";
import { Link, useNavigate } from "react-router-dom";
import Searchbar from "../components/Searchbar.jsx";
import "./AllMoviesPage.css";
import leftButton from "../assets/left.svg";
import rightButton from "../assets/right.svg";
import errorSearchImg from "../assets/search-error.png";

function AllMoviesPage({ moviesArray, getMovies }) {
  // well destructured props! 👍
  const navigate = useNavigate();
  const [filteredMovies, setFilteredMovies] = useState(moviesArray);
  const [watched, setWatched] = useState(null);

  const handleSearchInput = (searchText) => {
    if (!searchText.trim()) {
      setFilteredMovies(moviesArray);
    } else {
      const filtered = moviesArray.filter((movie) =>
        movie.title.toLowerCase().includes(searchText.toLowerCase())
      );
      /* In this case, you are filtering the movies directly in the
      frontend, which is fine for small datasets. If you have a large
      dataset, you might want to consider filtering the data in the
      request to the database, so you don't have to load all the data
      to the frontend and then filter it. */
      setFilteredMovies(filtered);
    }
  };

  // same as the previous comment, you could also ask supabase to sort the data
  const sortByTomatoes = () => {
    const arrayCopy = [...filteredMovies];
    arrayCopy.sort((a, b) => b.rotten_tomatoes - a.rotten_tomatoes);
    setFilteredMovies(arrayCopy);
  };

  const sortByTitle = () => {
    const arrayCopy = [...filteredMovies];
    arrayCopy.sort((a, b) => a.title.localeCompare(b.title));
    setFilteredMovies(arrayCopy);
  };

  const slideLeft = () => {
    let slider = document.querySelector(".movie-cards-container");
    slider.scrollLeft = slider.scrollLeft - 400;
  };

  const slideRight = () => {
    let slider = document.querySelector(".movie-cards-container");
    slider.scrollLeft = slider.scrollLeft + 400;
  };

  useEffect(() => {
    if (moviesArray.length === 0) {
      getMovies();
    }
  }, [getMovies, moviesArray]); // the getMovies is not going to have any effect here, since it's not changing

  useEffect(() => {
    setFilteredMovies(moviesArray);
  }, [moviesArray]);

  return (
    <section className="all-movies-section">
      <Searchbar moviesArray={moviesArray} onSearch={handleSearchInput} />
      <div className="btns-div">
        <button
          className="primary-button"
          onClick={() => navigate("/newmovie")} // The navigate is not necessary here, you could just use a Link
        >
          New Movie +
        </button>
        <button onClick={sortByTomatoes} className="sort-btn">
          Sort By Tomatoes
        </button>
        <button onClick={sortByTitle} className="sort-btn">
          Sort By Title
        </button>

        <fieldset className="fieldset">
          <input
            type="radio"
            id="all"
            name="watched"
            onClick={() => {
              setWatched(null);
            }}
            defaultChecked
          />
          <label htmlFor="all">All</label>

          <input
            type="radio"
            id="watched"
            name="watched"
            onClick={() => {
              setWatched(true);
            }}
          />
          <label htmlFor="watched">Watched</label>

          <input
            type="radio"
            id="unwatched"
            name="watched"
            onClick={() => {
              setWatched(false);
            }}
          />
          <label htmlFor="unwatched">Unwatched</label>
        </fieldset>
      </div>
      <section className="scroll-container">
        {filteredMovies.length === 0 ? (
          <img
            src={errorSearchImg}
            alt="error search image"
            className="search-error-img"
          />
        ) : (
          <>
            <button className="scroll-btn left" onClick={slideLeft}>
              <img src={leftButton} alt="left scroll button" />
            </button>
            {/*
            could this be a separate component?
            */}
            <div className="movie-cards-container">
              {watched === null // by default will we this, since "all" is watched === null
                ? filteredMovies.map((movie) => (
                    <Link key={movie._id} to={`/movie/${movie._id}`}>
                      <MovieCard movie={movie} />
                    </Link>
                  ))
                : filteredMovies //if watched is not null:
                    .filter((movie) => movie.watched === watched) //we first filter movies by watched true or false
                    .map(
                      (
                        movie //then, render the filtered list
                      ) => (
                        <Link key={movie._id} to={`/movie/${movie._id}`}>
                          <MovieCard movie={movie} />
                        </Link>
                      )
                    )}
            </div>
            <button className="scroll-btn right" onClick={slideRight}>
              <img src={rightButton} alt="right scroll button" />
            </button>
          </>
        )}
        {/*
          REMEMBER TO DELETE COMMENTS THAT ARE NOT USEFUL ANYMORE
        */}
        {/* <button className="scroll-btn left" onClick={slideLeft}>
          <img src={leftButton} alt="left scroll button" />
        </button>
        <div className="movie-cards-container">
          {watched === null // by default will we this, since "all" is watched === null
            ? filteredMovies.map((movie) => (
                <Link key={movie._id} to={`/movie/${movie._id}`}>
                  <MovieCard movie={movie} />
                </Link>
              ))
            : filteredMovies //if watched is not null:
                .filter((movie) => movie.watched === watched) //we first filter movies by watched true or false
                .map(
                  (
                    movie //then, render the filtered list
                  ) => (
                    <Link key={movie._id} to={`/movie/${movie._id}`}>
                      <MovieCard movie={movie} />
                    </Link>
                  )
                )}
        </div>
        <button className="scroll-btn right" onClick={slideRight}>
          <img src={rightButton} alt="right scroll button" />
        </button> */}
      </section>
    </section>
  );
}

export default AllMoviesPage;
