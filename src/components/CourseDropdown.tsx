import { COURSES } from "../data/COURSES";
import { SUBJECTS } from "../data/SUBJECTS";
import { useEffect, useState } from "react";
import Dropdown from "./Dropdown";

const removeSpaces = (str: string) => str.split(" ").join("");

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};

const CourseDropdown = () => {
  const [input, setInput] = useState("");
  const [filteredCourses, setFilteredCourses] = useState<string[]>([]);

  const debouncedInput = useDebounce(input, 300);

  useEffect(() => {
    if (!debouncedInput) return setFilteredCourses([]); // Reset when input is empty

    const formattedInput = removeSpaces(debouncedInput.toUpperCase()); // formattedInput is all uppercase, no spaces.

    const filteredCoursesList = COURSES.filter((course) => {
      if (SUBJECTS.some((subject) => formattedInput.startsWith(subject))) {
        return removeSpaces(course.c).startsWith(formattedInput);
      }
      return removeSpaces(course.t.toUpperCase()).includes(formattedInput);
    });

    setFilteredCourses(
      filteredCoursesList.length > 0
        ? filteredCoursesList.map((course) => course.c).slice(0, 20)
        : ["No results found"]
    );
  }, [debouncedInput]);

  return (
    <div>
      <h1>Search Courses by Subject Code</h1>
      <Dropdown
        label="Course"
        placeholder="Select course"
        value={input}
        options={filteredCourses}
        onSelect={(_, option) => setInput(option)}
        onInputChange={(_, input) => setInput(input)}
        customRender={(option, key, props) => {
          if (option == "No results found") {
            return (
              <li key={key} className="MuiAutocomplete-option">
                {option}
              </li>
            );
          }
          const course = COURSES.find((course) => course.c === option);
          return (
            <li key={key} {...props}>
              {course?.t}
              {course?.c}
            </li>
          );
        }}
        customfilter={(x) => x} // Disable filter
        freeSolo
      />
    </div>
  );
};

export default CourseDropdown;
