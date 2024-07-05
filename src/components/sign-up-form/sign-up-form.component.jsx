import { useState } from "react";
import { createAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  conformPassowrd: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassoword } = formFields;

  console.log(formFields);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassoword) return;
    const userAuth = createAuthUserWithEmailAndPassword(email, password);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div>
      <h1>Sign up with email & passowrd</h1>
      <form onSubmit={() => {}}>
        <label>Display Name</label>
        <input
          type="text"
          required
          name="displayName"
          value={displayName}
          onChange={handleChange}
        />

        <label>Email</label>
        <input
          type="email"
          required
          name="email"
          value={email}
          onChange={handleChange}
        />

        <label>Password</label>
        <input
          type="password"
          required
          name="password"
          value={password}
          onChange={handleChange}
        />

        <label>Confirm Password</label>
        <input
          type="password"
          required
          name="confirmPassoword"
          value={confirmPassoword}
          onChange={handleChange}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
