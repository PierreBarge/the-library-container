import PropTypes from "prop-types";
import "./Modal.css";
import { useState } from "react";

export default function Modal({ setButtonPressed }) {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [birthdate, setBirthdate] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    let body = {
      firstname: firstname,
      lastname: lastname,
    };

    if (birthdate !== "") {
      body = { ...body, birthdate: birthdate };
    }

    try {
      const response = await fetch("http://localhost:3000/author", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Author added: ", result);
        setButtonPressed("None");
      } else {
        console.error("Something went wrong");
      }
    } catch (error) {
      console.error("An error happened: ", error);
    }
    return false;
  }

  return (
    <div className="modal">
      <h2>Please fill this form to add an author</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Author&apos;s firstname: </label>
          <input
            type="text"
            required
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </div>
        <div>
          <label>Author&apos;s lastname: </label>
          <input
            type="text"
            required
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>
        <div>
          <label>Author&apos;s birthdate: </label>
          <input
            type="date"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
          />
        </div>
        <input type="submit" value="Submit" />
      </form>
      <button
        className="cancel-button"
        onClick={() => setButtonPressed("None")}>
        Cancel
      </button>
    </div>
  );
}

Modal.propTypes = {
  setButtonPressed: PropTypes.func.isRequired,
};
