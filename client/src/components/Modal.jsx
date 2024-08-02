import PropTypes from "prop-types";
import "./Modal.css";
import { useState } from "react";

export default function Modal({ setButtonPressed }) {
  const [author, setAuthor] = useState({
    firstname: "",
    lastname: "",
    birthdate: "",
  });

  async function handleSubmit(event) {
    event.preventDefault();

    const body = {
      ...author,
    };

    if (body.birthdate === "") {
      body.birthdate = null;
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
        setButtonPressed(() => "None");
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
            value={author.firstname}
            onChange={(e) =>
              setAuthor((data) => {
                return { ...data, firstname: e.target.value };
              })
            }
          />
        </div>
        <div>
          <label>Author&apos;s lastname: </label>
          <input
            type="text"
            required
            value={author.lastname}
            onChange={(e) =>
              setAuthor((data) => {
                return { ...data, lastname: e.target.value };
              })
            }
          />
        </div>
        <div>
          <label>Author&apos;s birthdate: </label>
          <input
            type="date"
            value={author.birthdate}
            onChange={(e) =>
              setAuthor((data) => {
                return { ...data, birthdate: e.target.value };
              })
            }
          />
        </div>
        <input type="submit" value="Submit" />
      </form>
      <button
        className="cancel-button"
        onClick={() => setButtonPressed(() => "None")}
      >
        Cancel
      </button>
    </div>
  );
}

Modal.propTypes = {
  setButtonPressed: PropTypes.func.isRequired,
};
