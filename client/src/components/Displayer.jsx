import PropTypes from "prop-types";
import "./Displayer.css";

export default function Displayer({ data }) {
  return (
    <>
      {data.map((item) => (
        <div className="displayer" key={item.id}>
          {item.firstname && item.lastname && (
            <p>
              {item.firstname} {item.lastname}
            </p>
          )}
          {item.birthdate && <p>{item.birthdate}</p>}
          {item.title && <p>{item.title}</p>}
          {item.author && item.author.firstname && item.author.lastname && (
            <p>
              Author: {item.author.firstname} {item.author.lastname}
            </p>
          )}
          {item.genre && item.genre.name && <p>Genre: {item.genre.name}</p>}
          {item.name && <p>{item.name}</p>}
        </div>
      ))}
    </>
  );
}

Displayer.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      firstname: PropTypes.string,
      lastname: PropTypes.string,
      birthdate: PropTypes.string,
      title: PropTypes.string,
      name: PropTypes.string,
      author: PropTypes.shape(),
      genre: PropTypes.shape(),
    })
  ).isRequired,
};
