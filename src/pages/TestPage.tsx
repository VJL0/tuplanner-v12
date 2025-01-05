const TestPage = () => {
  async function createSession() {
    try {
      // Send POST request to /proxy/session
      const postResponse = await fetch(
        "https://tu-backend.onrender.com/proxy/session",
        {
          method: "POST",
          credentials: "include", // Ensure cookies are included in the request
        }
      );

      // Check if the response was successful
      if (postResponse.ok) {
        console.log("POST request successful");
      } else {
        console.log("Failed to create session, status:", postResponse.status);
      }

      // Log all cookies set by the server
      const cookies = document.cookie; // Check cookies set in the browser
      console.log("Current cookies:", cookies);

      // Logging headers (Browser won't allow accessing set-cookie directly)
      const allHeaders = postResponse.headers;
      allHeaders.forEach((value, key) => {
        console.log(key, value);
      });
    } catch (error) {
      console.error("Error creating session:", error);
    }
  }

  async function fetchCourse() {
    try {
      const getResponse = await fetch(
        "https://tu-backend.onrender.com/testing",
        {
          method: "GET",
          credentials: "include", // Ensure cookies are included in the request
        }
      );

      if (getResponse.ok) {
        const data = await getResponse.json();
        console.log("Response data:", data);
      } else {
        console.log("Failed to fetch course data, status:", getResponse.status);
      }
    } catch (error) {
      console.error("Error fetching course data:", error);
    }
  }

  return (
    <div>
      <button onClick={createSession}>Create Session</button>
      <button onClick={fetchCourse}>Fetch Course</button>
    </div>
  );
};

export default TestPage;
