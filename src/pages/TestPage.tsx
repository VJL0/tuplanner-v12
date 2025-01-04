const TestPage = () => {
  async function createSession() {
    // Send POST request to /proxy/session
    const postResponse = await fetch("https://tu-backend.onrender.com/proxy/session", {
      method: "POST",
      credentials: "include", // Ensure cookies are included in the request
    });

    console.log(
      "POST Response Headers:",
      postResponse.headers.get("set-cookie")
    );

    // Send GET request to /testing (example)
    const getResponse = await fetch("https://tu-backend.onrender.com/testing", {
      method: "GET",
      credentials: "include", // Ensure cookies are included in the request
    });

    const data = await getResponse.json();
    console.log("Response data:", data);
  }

  return <button onClick={createSession}>Create Session</button>;
};

export default TestPage;
