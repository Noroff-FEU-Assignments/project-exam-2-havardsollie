import * as yup from "yup";

export const schema = yup.object().shape({
  title: yup.string().required("Please enter a title"),
  body: yup.string().required("Please enter your message").max(280, "Max 280 characters"),
  tags: yup.string(),
  media: yup.string().nullable().notRequired(),
});