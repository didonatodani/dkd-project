import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import supabase from "../supabase/config";

const genresArray = ["Action", "Comedy", "Drama", "Romance", "Thriller"];

function EditPage({ moviesArray, setMoviesArray =() => {} }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const movieToEdit = moviesArray.find((movie) => movie._id === id); 
    if (movieToEdit) {
      setFormData(movieToEdit);
    }
  }, [id, moviesArray]);

  const handleOnChange = (e) => {
    const { type, value, name, checked } = e.target;

    if (type === "checkbox" && name === "genre") {
        
      setFormData((prevFormData) => ({
        ...prevFormData,
        genre: checked
          ? [...(prevFormData.genre || []), value] 
          : (prevFormData.genre || []).filter((genre) => genre !== value), 
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from("moviesdb")
      .update(formData)
      .eq("_id", id); 

    if (error) {
      console.error("Error updating movie:", error);
    } else {
      setMoviesArray((prevMovies) =>
        prevMovies.map((movie) => (movie._id === id ? data[0] : movie))
      );
      navigate(`/movie/${id}`); 
    }
  };

  if (!formData) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          name="title"
          value={formData.title || ""}
          onChange={handleOnChange}
        />
      </label>

      <fieldset>
        <legend>Genre:</legend>
        {genresArray.map((genre, index) => (
          <label key={index}>
            <input
              type="checkbox"
              name="genre"
              value={genre}
              checked={formData.genre?.includes(genre) || false}
              onChange={handleOnChange}
            />
            {genre}
          </label>
        ))}
      </fieldset>

      <label htmlFor="release_date">Release Date:</label>
      <input
        type="date"
        name="release_date"
        value={formData.release_date || ""}
        onChange={handleOnChange}
      />

      <label htmlFor="rotten_tomatoes">Rotten Tomatoes:</label>
      <input
        type="number"
        name="rotten_tomatoes"
        value={formData.rotten_tomatoes || ""}
        onChange={handleOnChange}
      />

      <label htmlFor="audience_rating">Audience Rating:</label>
      <input
        type="number"
        name="audience_rating"
        value={formData.audience_rating || ""}
        onChange={handleOnChange}
      />

      <label htmlFor="watched">Watched:</label>
      <input
        type="text"
        name="watched"
        value={formData.watched || ""}
        onChange={handleOnChange}
      />

      <label htmlFor="description">Description:</label>
      <input
        type="text"
        name="description"
        value={formData.description || ""}
        onChange={handleOnChange}
      />

      <label htmlFor="image">Image:</label>
      <input
        type="text"
        name="image"
        value={formData.image || ""}
        onChange={handleOnChange}
      />

      <button type="submit">Save Changes</button>
    </form>
  );
}

export default EditPage;
