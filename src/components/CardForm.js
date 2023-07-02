const CardForm = ({ title, content, imgSrc, onClick }) => {
  return (
    <div className="col mb-3">
      <div
        className="card shadow" aria-hidden="true"
        style={{ width: "20rem", height: "15rem" }}
        onClick={onClick}
      >
        <img
          src={imgSrc}
          className="card-img-top"
          alt="..."
          style={{ width: "19.9rem", height: "8rem" }}
        />
        <div className="card-body">
          <h5 className="card-title fs-5 placeholder-glow">{title}</h5>
          <p className="card-text fs-6 placeholder-glow">{content}</p>
        </div>
      </div>
    </div>
  );
};
export default CardForm;
