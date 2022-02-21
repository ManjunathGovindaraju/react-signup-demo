import React, { useState } from "react";
import { Auth } from "aws-amplify";
import FormElement from "./FormElement";
const SignUp = () => {
  const [given_name, setGivenName] = useState("");
  const [family_name, setFamilyName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [birthdate, setBrithdate] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [waitingForCode, setWaitingForCode] = useState(false);
  const [code, setCode] = useState("");

  const signUp = (e) => {
    e.preventDefault();
    Auth.signUp({ username: family_name, password, attributes: { given_name, family_name, email, gender, birthdate, address } })
      .then((data) => {
        console.log(data);
        setWaitingForCode(true);
        setPassword("");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const confirmSignUp = (e) => {
    e.preventDefault();
    Auth.confirmSignUp(family_name, code)
      .then((data) => {
        console.log(data);
        setWaitingForCode(false);
        setEmail("");
        setCode("");
      })
      .catch((err) => console.log(err));
  };
  const resendCode = () => {
    Auth.resendSignUp(family_name)
      .then(() => {
        console.log("code resent successfully");
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div className="form" >
      <h3>Sign Up</h3>
      {!waitingForCode && (
        <form>
            <FormElement label="First Name" forId="sign-up-email">
            <input
              id="sign-up-email"
              type="text"
              value={given_name}
              onChange={(e) => setGivenName(e.target.value)}
              placeholder="First Name"
            />
          </FormElement>
          <FormElement label="Last Name" forId="sign-up-email">
            <input
              id="sign-up-email"
              type="text"
              value={family_name}
              onChange={(e) => setFamilyName(e.target.value)}
              placeholder="Last Name"
            />
          </FormElement>


          <FormElement label="E-mail" forId="sign-up-email">
            <input
              id="sign-up-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email"
            />
          </FormElement>

          <FormElement label="Gender" forId="sign-up-email">
            <input
              id="sign-up-email"
              type="text"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              placeholder="Male/Female"
            />
          </FormElement>

          <FormElement label="Birth Date" forId="sign-up-email">
            <input
              id="sign-up-email"
              type="text"
              value={birthdate}
              onChange={(e) => setBrithdate(e.target.value)}
              placeholder="mm/dd/yyyy"
            />
          </FormElement>
          <FormElement label="Address" forId="sign-up-email">
            <input
              id="sign-up-email"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address"
            />
          </FormElement>

          <FormElement label="Password" forId="sign-up-email">
            <input
              id="sign-up-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
            />
          </FormElement>
          <button type="submit" onClick={signUp}>
            Sign Up
          </button>
        </form>
      )}
      {waitingForCode && (
        <form>
          <FormElement label="Confirmation Code" forId="sign-up-code">
            <input
              id="sign-up-code"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="code"
            />
          </FormElement>
          <button type="submit" onClick={confirmSignUp}>
            Confirm Sign Up
          </button>
          <button type="button" onClick={resendCode}>
            Resend code
          </button>
        </form>
      )}
    </div>
  );
};
export default SignUp;