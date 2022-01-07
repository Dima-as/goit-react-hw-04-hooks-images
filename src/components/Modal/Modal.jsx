import { useEffect } from "react";
import s from "./Modal.module.scss";
import PropTypes from "prop-types";

export default function Modal({ onClose, children }) {
  useEffect(() => {
    window.addEventListener("keydown", hendleKeyDown);
    return () => {
      window.removeEventListener("keydown", hendleBackdropClick);
    };
  });
  const hendleBackdropClick = (event) => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  const hendleKeyDown = (e) => {
    if (e.code === "Escape") {
      onClose();
    }
  };
  return (
    <div className={s.backdrop} onClick={hendleBackdropClick}>
      <div className={s.content}>{children}</div>
    </div>
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
