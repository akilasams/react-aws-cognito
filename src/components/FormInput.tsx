import { Formik, Form, FormikHelpers } from "formik";
import { PropsWithChildren } from "react";

interface Values {
  [key: string]: string;
}

interface FormProps {
  onSubmit: (values: Values) => void;
  initialValues: Values;
}

const FormInput = ({
  children,
  onSubmit,
  initialValues,
}: PropsWithChildren<FormProps>) => {
  const onSubmitHandler = (
    values: Values,
    { setSubmitting }: FormikHelpers<Values>
  ) => {
    onSubmit(values);
    setSubmitting(false);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmitHandler}>
      <Form className="form-container">{children}</Form>
    </Formik>
  );
};

export default FormInput;
