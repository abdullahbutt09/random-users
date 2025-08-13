import React, { useState } from "react";
import StylishForm from "./Form";
import App from "./UsersCard";

export default function MainComponent() {
  const [numberOfUsers, setNumberOfUsers] = useState(null);

  return (
    <>
      <StylishForm onSubmitNumber={setNumberOfUsers} />
      {numberOfUsers && <App count={numberOfUsers} />}
    </>
  );
}