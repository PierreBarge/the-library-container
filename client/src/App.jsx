import { useEffect, useState } from "react";
import "./App.css";
import Button from "./components/Button";
import Displayer from "./components/Displayer";
import Modal from "./components/Modal";

const buttonList = ["Authors", "Genres", "Books"];

export default function App() {
  const [buttonPressed, setButtonPressed] = useState("None");
  const [fetchedData, setFetchedData] = useState(null);

  useEffect(() => {
    switch (buttonPressed) {
      case "Authors": {
        fetch(`http://localhost:3000/author`)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Something went wrong");
            }
            return response.json();
          })
          .then((data) => {
            setFetchedData(data);
            console.log("Fetch done!!");
          });
        return;
      }
      case "Genres": {
        fetch(`http://localhost:3000/genre`)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Something went wrong");
            }
            return response.json();
          })
          .then((data) => {
            setFetchedData(data);
            console.log("Fetch done!!");
          });
        return;
      }
      case "Books": {
        fetch(`http://localhost:3000/book/detailed`)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Something went wrong");
            }
            return response.json();
          })
          .then((data) => {
            setFetchedData(data);
            console.log("Fetch done!!");
          });
        return;
      }
      default:
        setFetchedData(() => null);
        return;
    }
  }, [buttonPressed]);

  return (
    <div className="app">
      <h1>Welcome to The All Mighty Book Nest!!</h1>

      <div>
        <button onClick={() => setButtonPressed("Post")}>Add an Author</button>
      </div>
      <div>
        {buttonList.map((button, index) => (
          <Button
            key={index}
            setButtonPressed={setButtonPressed}
            value={button}
          />
        ))}

        {fetchedData && <Displayer data={fetchedData} />}
      </div>
      {buttonPressed === "Post" && (
        <Modal setButtonPressed={setButtonPressed} />
      )}
    </div>
  );
}
