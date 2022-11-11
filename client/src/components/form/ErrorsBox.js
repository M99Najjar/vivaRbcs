const ErrorsBox = ({ errors }) => {
  return errors ? (
    <>
      <div className="w-full p-4 rounded-md bg-red-200">
        <p className="text-red-900">{errors}</p>
      </div>
    </>
  ) : null;
};

export default ErrorsBox;
