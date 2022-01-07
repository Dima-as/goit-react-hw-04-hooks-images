import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import ImageListGallery from "./components/ImageListGallery/ImageListGallery";
import Searchbar from "./components/Searchbar/Searchbar";
import ImageSearch from "./components/ImageSearch/ImageSearch";
import ErrorImages from "./components/ErrorImages/ErrorImages";
import API from "./service";
import Loaders from "./components/Loader/Loader";
import Button from "./components/Button/Button";

const Status = {
  IDLE: "idle",
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};

export default function App() {
  const [inputName, setInputName] = useState("");
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);
  const [search, setSearch] = useState([]);

  const handleFormSubmit = (inputName) => {
    setInputName(inputName);
    setSearch([]);
    setInputName(inputName);
    setPage(1);
    setStatus(Status.PENDING);
  };
  const onLoadMoreBtn = (e) => {
    setPage(page + 1, scrollPageToEnd());
  };
  const scrollPageToEnd = () => {
    setTimeout(() => {
      window.scrollBy({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }, 1000);
  };

  useEffect(() => {
    if (!inputName) {
      setSearch(search);
    }
    if (!inputName) {
      return;
    }

    API.fetchImage(inputName, page)
      .then(({ hits }) => {
        if (hits.length === 0) {
          return (
            toast.error(`We did not find ${inputName}`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            }),
            setStatus(Status.IDLE)
          );
        }
        setSearch((search) => [...search, ...hits]);
        setStatus(Status.RESOLVED);
      })
      .catch((error) => setError(error, Status.REJECTED));
  }, [inputName, page]);

  return (
    <>
      {status === Status.IDLE && (
        <div>
          <Searchbar onSubmit={handleFormSubmit} />
          <ToastContainer autoClose={4000} />
          <ImageSearch />
        </div>
      )}
      {status === Status.PENDING && (
        <>
          <Searchbar onSubmit={handleFormSubmit} />
          <Loaders />
        </>
      )}
      {status === Status.REJECTED && (
        <>
          <Searchbar onSubmit={handleFormSubmit} />
          <ErrorImages message={error.message} />
        </>
      )}
      {status === Status.RESOLVED && (
        <>
          <Searchbar onSubmit={handleFormSubmit} />
          <ToastContainer autoClose={4000} />
          <ul>
            <ImageListGallery searchImages={search} />
          </ul>
          <Button onSubmitPage={onLoadMoreBtn} />
        </>
      )}
    </>
  );
}
