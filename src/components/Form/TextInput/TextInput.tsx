import {
  StyledTextInputContainer,
  StyledTextInput,
  StyledTextInputPlaceholder,
} from "./styles";
import {
  StyledErrorMessage,
  StyledErrorMessagePlaceholder,
} from "../../../pages/shared/styles";

interface ITextInputProps {
  name: string;
  type: string;
  placeholder: string;
  onChange: (e: string | React.ChangeEvent<any>) => void;
  value: string;
  onBlur: (e: any) => void;
  required: boolean;
  icon?: React.ReactElement;
  error?: string;
  touched?: boolean;
}

const TextInput = ({
  name,
  type,
  icon,
  placeholder,
  error,
  value,
  required,
  touched,
  ...props
}: ITextInputProps) => {
  const errorState = touched && error ? "error" : "normal";
  const wasTouched = touched ? "true" : "false";

  return (
    <>
      <StyledTextInputContainer color={errorState}>
        <StyledTextInput
          name={name}
          type={type}
          required={required}
          {...props}
        />

        <StyledTextInputPlaceholder>{placeholder}</StyledTextInputPlaceholder>

        <i>{icon}</i>
      </StyledTextInputContainer>
      {touched && error ? (
        <StyledErrorMessage>{error}</StyledErrorMessage>
      ) : (
        <StyledErrorMessagePlaceholder color={wasTouched}>
          Placeholder
        </StyledErrorMessagePlaceholder>
      )}
    </>
  );
};

export default TextInput;
