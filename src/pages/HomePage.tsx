import { Button, Typography } from "@mui/material";
import { PROGRAMS } from "../data/PROGRAMS";
import Dropdown from "../components/Dropdown";
import { useState } from "react";

const HomePage = () => {
  const [selectedProgram, setSelectedProgram] = useState<string>("");
  const programs = Object.keys(PROGRAMS);
  return (
    <div className="bg-red-50 sm:p-[3rem] p-0">
      <section className="bg-white flex flex-col sm:h-[calc(100vh-6rem)] h-screen rounded-3xl">
        <div className="h-20 bg-gray-300 rounded-t-3xl"></div>
        <div className="flex flex-col w-full h-full items-center mt-20 space-y-4">
          <Typography variant="h3" gutterBottom>
            What major are you pursuing?
          </Typography>
          <div className="w-full flex flex-col ">
            <div>{PROGRAMS[selectedProgram]}</div>
            <Dropdown
              label="Academic Program"
              placeholder="Select program"
              value={selectedProgram}
              options={programs}
              onSelect={(_, value) => setSelectedProgram(value)}
            />
            <Button variant="contained">Submit</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
