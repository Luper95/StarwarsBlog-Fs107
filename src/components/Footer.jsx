import "../index.css";
export const Footer = () => {
  const handleDelete = () => {
    localStorage.clear();
    console.log("all clear");
  };
  return (
    <footer className="footer mt-auto py-3  gradientbT d-flex justify-content-center align-items-baseline gap-3">
      <p>Limpiar el cache?</p>
      <button className="btn btn-danger" onClick={handleDelete}>
        Borrar cache
      </button>
    </footer>
  );
};
