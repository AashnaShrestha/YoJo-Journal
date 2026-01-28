import * as Yup from "yup";

export const signupSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .email("Invalid email")
    .matches(/\.[a-zA-Z]{2,}$/, "Invalid email")
    .max(254)
    .required("Required"),
  name: Yup.string()
    .trim()
    .max(100, `Max ${100} characters`)
    .required("Required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(/[a-z]/, "Password requires at least one lowercase letter")
    .matches(/[0-9]/, "Password requires at least one number")
    .matches(
      /[^a-zA-Z0-9]/,
      "Password requires at least one special character",
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});
