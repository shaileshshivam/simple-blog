import React, { useState } from "react";

function upperCase(str) {
  return str.toUpperCase();
}

const style = {
  error: {
    color: "red",
    textTransform: "uppercase",
    paddingLeft: "1rem",
    letterSpacing: "1px",
  },

  input: {
    fontSize: "1.2rem",
    width: "100%",
    padding: "1rem 0.25rem",
    outline: "none",
    border: "none",
    boxShadow:
      "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px,rgba(0, 0, 0, 0.1) 0px 0px 1px 0px",
    borderRadius: "5px",
    paddingLeft: "1rem",
  },

  container: {
    margin: "1.25rem 0",
  },

  icon: {
    marginRight: "0.25rem",
  },

  optional: {
    color: "dodgerblue",
    textTransform: "uppercase",
    paddingLeft: "1rem",
    letterSpacing: "1px",
  },
};

const TextInput = (props) => {
  const { onChange, placeholder, required, name, value } = props;
  const [inErrorState, setInErrorState] = useState(false);

  const handleInputChange = (event) => {
    const content = event.target.value;

    if (content.trim().length === 0) {
      setInErrorState(true);
    } else {
      if (inErrorState) {
        setInErrorState(false);
      }
    }
    onChange(content);
  };

  return (
    <div style={style.container}>
      <input
        style={style.input}
        type="text"
        required={required}
        value={value}
        onChange={handleInputChange}
        placeholder={upperCase(placeholder)}
      ></input>
      {inErrorState && required && (
        <p style={style.error}>
          <span style={style.icon}>❌</span> {name} cannot be empty
        </p>
      )}
      {inErrorState && !required && (
        <p style={style.optional}>
          <span style={style.icon}>ℹ️</span> you choose to keep {name} empty |
          optional field
        </p>
      )}
    </div>
  );
};

export default TextInput;
