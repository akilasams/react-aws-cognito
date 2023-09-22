import { Field } from "formik";

interface TextInputProps {
  type?: string;
  name?: string;
  variant?: string;
  title?: string;
}

const TextInput = ({ type, name, variant, title }: TextInputProps) => {
  return (
    <div className="text__input-container">
      <div>{title}</div>
      <Field
        type={type ? type : ""}
        name={name}
        className={variant ? `text__input-${variant}` : "text__input-primary"}
      />
    </div>
  );
};

export default TextInput;
