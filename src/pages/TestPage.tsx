const TestPage = () => {
  async function createSession() {
    // Send POST request to /proxy/session
    const postResponse = await fetch("http://127.0.0.1:5000/proxy/session", {
      method: "POST",
      credentials: "include", // Ensure cookies are included in the request
    });

    console.log(
      "POST Response Headers:",
      postResponse.headers.get("set-cookie")
    );

    // Send GET request to /testing (example)
    const getResponse = await fetch("http://127.0.0.1:5000/testing", {
      method: "GET",
      credentials: "include", // Ensure cookies are included in the request
    });

    const data = await getResponse.json();
    console.log("Response data:", data);
  }

  return <button onClick={createSession}>Create Session</button>;
};

export default TestPage;
