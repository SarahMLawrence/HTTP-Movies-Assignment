import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList, getMovieList  }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const { push } = useHistory();

  //---------------------------------------//
  //  Fetch Movie Data using a Get Request //
  //---------------------------------------//
  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  //----------------------//
  //  Save Selected Movie //
  //----------------------//
  const saveMovie = () => {
    addToSavedList(movie);
  };

  
  //--------------------------------//
  //          Update MOVIE          //
  //        * Update a resource     //
  //--------------------------------//
  const updateMovie = () => {
    push(`/update-movie/${movie.id}`);
  }


  //--------------------------------//
  //        DELETE MOVIE            //       
  //     * Delete a resource        //
  //--------------------------------//
  const deleteMovie = (e) => {
    e.preventDefault();
      axios
        .delete(`http://localhost:5000/api/movies/${params.id}`)
        .then(() => {
          setMovie(movie);
        //  window.location.reload(true);
          push('/');
          window.location.reload(true);
        })
        .catch((err) => console.log(err));
    };

  //============================//
  // GET REQUEST via fetchMovie //
  //============================//
  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>

      <button className="md-button" onClick={updateMovie}>
        Edit
      </button>

      <button className="delete-button" onClick={deleteMovie}>
        Delete
        </button>
    </div>
  );
}

export default Movie;
