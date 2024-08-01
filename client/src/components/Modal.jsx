import PropTypes from "prop-types";
import "./Modal.css";

export default function Modal({ setButtonPressed }) {
  return (
    <div className="modal">
      <p>Bongour</p>
      <button onClick={() => setButtonPressed(() => "None")}>Cancel</button>
    </div>
  );
}

Modal.propTypes = {
  setButtonPressed: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
