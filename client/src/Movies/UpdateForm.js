import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

// const initialMovie = {
//   id: "",
//   title: "",
//   director: "",
//   metascore: "",
//   stars: "",
// };

const UpdateForm = (props) => {
  const [movie, setMovie] = useState('');
  const { title, director, metascore, stars } = movie;
  const { id } = useParams();
  const { push } = useHistory();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
        setMovie(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const changeHandler = (event) => {
    event.persist();
    let value = event.target.value;
    if (event.target.name === "price") {
      value = parseInt(value, 10);
    }
    setMovie({
      ...movie,
      [event.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${id}`, movie)
      .then((res) => {
        setMovie(res.data);
        // window.location.reload(true);
        push(`/movies/${movie.id}`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h2 className="update-form">Update Movie</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder="Title"
          value={title}
        />
        <input
          type="text"
          name="director"
          onChange={changeHandler}
          placeholder="Director"
          value={director}
        />
        <input
          type="number"
          name="metascore"
          onChange={changeHandler}
          placeholder="Metascore"
          value={metascore}
        />
        <input
            type="string"
            name="stars"
            onChange={changeHandler}
            placeholder="Stars"
            value={stars}
        />
        <div className="baseline" />

        <button className="form-button">Update</button>
      </form>
    </div>
  );
};

export default UpdateForm;