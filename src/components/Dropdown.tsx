import { Autocomplete, TextField } from "@mui/material";
import { matchSorter } from "../utils/matchSorter";

interface SearchDropdownProps {
  label: string;
  value: string;
  options: string[];
  onSelect: (event: any, value: any) => void;
  onInputChange?: (event: any, value: any) => void;
  customRender?: (option: string, key: string, props: any) => React.ReactNode;
  customfilter?: (options: string[], inputValue: string) => string[];
  placeholder?: string;
  disabled?: boolean;
  freeSolo?: boolean;
}

const Dropdown: React.FC<SearchDropdownProps> = ({
  label,
  value,
  options,
  onSelect,
  onInputChange,
  customRender,
  customfilter,
  placeholder,
  disabled,
  freeSolo = false,
}) => {
  return (
    <Autocomplete
      value={value} // Selected value
      options={options}
      onChange={onSelect}
      onInputChange={onInputChange}
      renderInput={(params) => (
        <TextField {...params} label={label} placeholder={placeholder} />
      )}
      renderOption={(props, option) => {
        const { key, ...otherProps } = props;
        return customRender ? (
          customRender(option, key, otherProps)
        ) : (
          <li key={key} {...otherProps}>
            {option}
          </li>
        );
      }}
      filterOptions={(options, { inputValue }) => {
        const filteredOptions = customfilter
          ? customfilter(options, inputValue)
          : matchSorter(options, inputValue).slice(0, 20);

        return filteredOptions;
      }}
      // Settings
      disabled={disabled}
      freeSolo={freeSolo}
      noOptionsText={"No results found"}
      fullWidth
      disablePortal
      autoComplete
      clearOnBlur
    />
  );
};

export default Dropdown;
