import * as yup from "yup";

export const schema = yup.object().shape({
  title: yup.string().required("Please enter a title"),
  body: yup.string().required("Please enter your message"),
  // tags: yup.array().nullable(),
  media: yup.string().nullable().notRequired(),
});