import { useState } from "react";
import PropTypes from "prop-types";
import ImageItemGallery from "../ImageItemGallery/ImageItemGallery";
import Modal from "../Modal/Modal";
import s from "./ImageListGallery.module.scss";
import Loaders from "../Loader/Loader";

export default function ImageListGallery({ searchImages }) {
  const [largeImageURL, setlargeImageURL] = useState("");
  const [tags, settags] = useState("");
  const [showModal, setshowModal] = useState(false);
  const [loader, setloader] = useState(false);

  const toggoleModal = () => {
    setshowModal(!showModal);
  };

  const handleImageClick = (largeImageURL, tags) => {
    setshowModal(true);
    setloader(true);
    setlargeImageURL(largeImageURL);
    settags(tags);
  };

  const hideLoaderInModal = () => {
    setloader(false);
  };
  return (
    <>
      <ul className={s.gallery}>
        {searchImages.map(({ id, webformatURL, largeImageURL, tags }) => (
          <ImageItemGallery
            key={id}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
            tags={tags}
            handleImageClick={handleImageClick}
          />
        ))}
      </ul>

      {showModal && (
        <Modal onClose={toggoleModal}>
          {loader && <Loaders />}
          <img
            width="100%"
            src={largeImageURL}
            alt={tags}
            onLoad={hideLoaderInModal}
          />
        </Modal>
      )}
    </>
  );
}

ImageListGallery.propTypes = {
  searchImages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
};
