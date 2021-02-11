import { StyledDropdown, StyledDropdownContainer } from "./styles";
import {
  StyledErrorMessage,
  StyledErrorMessagePlaceholder,
} from "../../../pages/shared/styles";

interface DropdownProps {
  name: string;
  placeholder: string;
  options: Array<any>;
  onChange: (e: string | React.ChangeEvent<any>) => void;
  value: string;
  onBlur: (e: any) => void;
  error?: string;
  touched?: boolean;
}

const Dropdown = ({
  placeholder,
  options,
  touched,
  value,
  error,
  ...props
}: DropdownProps) => {
  const borderColor = touched && error ? "error" : "normal";

  return (
    <>
      <StyledDropdownContainer color={borderColor}>
        <StyledDropdown {...props}>
          <option>{placeholder}</option>
          {options.map((option: string) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </StyledDropdown>
      </StyledDropdownContainer>

      {touched && error ? (
        <StyledErrorMessage>{error}</StyledErrorMessage>
      ) : (
        <StyledErrorMessagePlaceholder>
          Placeholder
        </StyledErrorMessagePlaceholder>
      )}
    </>
  );
};

export default Dropdown;
