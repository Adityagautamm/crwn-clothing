/*
Button type
default
inverted
google


*/
import Spinner from "../spinner/spinner.component";
export const BUTTON_TYPE_CLASSES = {
  google: "google-sign-in",
  inverted: "inverted",
};

const Button = ({ children, isLoading, buttonType, ...otherProps }) => {
  return isLoading ? (
    <Spinner />
  ) : (
    <button
      // disabled={isLoading}
      className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button;
