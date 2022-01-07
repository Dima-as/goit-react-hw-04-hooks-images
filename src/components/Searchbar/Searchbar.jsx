import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ImSearch } from "react-icons/im";
import s from "./Searchbar.module.scss";
import PropTypes from "prop-types";

export default function Searchbar({ onSubmit }) {
  const [inputName, setinputName] = useState("");

  const handleNameChange = (e) => {
    setinputName(e.currentTarget.value.toLowerCase());
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputName.trim() === "") {
      return toast.error(`We did not find ${inputName}`);
    }
    onSubmit(inputName);
    setinputName("");
  };

  return (
    <header>
      <form onSubmit={handleSubmit} className={s.form}>
        <input
          autoComplete="off"
          autoFocus
          type="text"
          name="inputName"
          placeholder="Search images and photos"
          onChange={handleNameChange}
          value={inputName}
          className={s.input}
        />
        <button type="submit" className={s.button}>
          <ImSearch style={{ marginRight: 8 }} />
          <span>Search</span>
        </button>
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
