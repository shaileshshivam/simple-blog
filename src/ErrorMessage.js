const style = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  width: "100vw",
};

const ErrorMessage = (props) => {
  const { message } = props;
  return (
    <div style={style}>
      <h1>{message}</h1>
    </div>
  );
};

export default ErrorMessage;
