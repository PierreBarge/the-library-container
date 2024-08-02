import PropTypes from "prop-types";

export default function Button({ setButtonPressed, value }) {
  return <button onClick={() => setButtonPressed(value)}>{value}</button>;
}

Button.propTypes = {
  setButtonPressed: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
