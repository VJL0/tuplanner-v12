const TestPage = () => {
  async function createSession() {
    await fetch(
      "https://prd-xereg.temple.edu/StudentRegistrationSsb/ssb/term/search?mode=search",
      {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ term: 202436 }),
        mode: "no-cors",
      }
    );
  }

  async function fetchCourse() {
    await fetch("https://tu-backend.onrender.com/testing", {
      method: "GET",
      credentials: "include", // Ensure cookies are included in the request
      mode: "no-cors",
    });
  }

  return (
    <div>
      <button onClick={createSession}>Create Session</button>
      <button onClick={fetchCourse}>Fetch Course</button>
    </div>
  );
};

export default TestPage;
