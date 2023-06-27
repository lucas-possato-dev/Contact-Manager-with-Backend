import spinnerImg from "../../assets/loading-gif.gif";
const Spinner = () => {
  return (
    <>
      <div>
        <img
          src={spinnerImg}
          className="d-block m-auto"
          style={{ width: "100px" }}
          alt=""
        />
      </div>
    </>
  );
};

export default Spinner;
