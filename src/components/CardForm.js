import whiteBg from "../images/whiteBg.jpg";

const CardForm = ({ title, content, imgSrc, onClick }) => {
  return (
    <div className="col mb-5">
      <div
        className="card shadow " aria-hidden="true"
        style={{ width: "18vw", height: "30vh" }}
        onClick={onClick}>
        <img
          src={imgSrc !== "" ? imgSrc : whiteBg}
          className="card-img-top"
          alt="..."
          style={{ width: "100%", height: "55%", objectFit:'cover'}}
        />
        <div className="card-body">
          <h5 className="card-title cardTitle placeholder-glow">{title}</h5>
          <p className="card-text cardText placeholder-glow">{content}</p>
        </div>
      </div>
    </div>
  );
};
export default CardForm;
