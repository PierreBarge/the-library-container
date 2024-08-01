import PropTypes from "prop-types";
import "./Modal.css";

export default function Modal({ setButtonPressed }) {
  const post = () => {
    fetch("http://localhost:3000/author", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname: "",
        lastname: "",
        birthdate: "",
      }),
    });
  };

  return (
    <div className="modal">
      <h2>Please fill this form to add an author</h2>
      <form>
        <div>
          <label htmlFor="firstname">Author&apos;s firstname: </label>
          <input type="text" name="firstname" id="firstname" required />
        </div>
        <div>
          <label htmlFor="lastname">Author&apos;s lastname: </label>
          <input type="text" name="lastname" id="lastname" required />
        </div>
        <div>
          <label htmlFor="birthdate">Author&apos;s birthdate: </label>
          <input type="date" name="birthdate" id="birthdate" />
        </div>
        <input type="submit" value="Submit" onSubmit={post()} />
      </form>
      <button
        className="cancel-button"
        onClick={() => setButtonPressed(() => "None")}>
        Cancel
      </button>
    </div>
  );
}

Modal.propTypes = {
  setButtonPressed: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
