import React, { useEffect, useState } from "react";

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [existingSuccess, setExistingSuccess] = useState(false);
  const [desiredSuccess, setDesiredSuccess] = useState(false);

  useEffect(() => {
    Promise.all([
      import("../existing").then(({ existing }) => {
        try {
          setExistingSuccess(existing());
        } catch (e) {
          console.error(e.stack || e);
        }
      }),
      import("../desired").then(({ existing }) => {
        try {
          setDesiredSuccess(existing());
        } catch (e) {
          console.error(e.stack || e);
        }
      })
    ])
      .catch(() => null)
      .then(() => setIsLoading(false));
  }, []);

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div>
      <h1>Existing Recrypt: {existingSuccess ? "works" : "not working"}</h1>
      <h1>Desired Recrypt: {desiredSuccess ? "works" : "not working"}</h1>
    </div>
  );

  return <div>Welcome</div>;
}

export default Home;
