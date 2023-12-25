import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import dayjs from "dayjs";
import { yupResolver } from "@hookform/resolvers/yup";

const validFileExtensions = { image: ["jpg"] };

function isValidFileType(fileName, fileType) {
  return (
    fileName &&
    validFileExtensions[fileType].indexOf(fileName.split(".").pop()) > -1
  );
}

const MAX_FILE_SIZE = 1024000;

export const formSchema = yup.object().shape({
  // photo: yup
  //   .mixed()
  //   .required("Required")
  //   .test("is-valid-type", "Not a valid image type", (value) =>
  //     isValidFileType(value && value.name.toLowerCase(), "image")
  //   )
  //   .test(
  //     "is-valid-size",
  //     "Max allowed size is 100KB",
  //     (value) => value && value.size <= MAX_FILE_SIZE
  //   ),
  surname: yup.string().required("Surname is required"),
  firstName: yup.string().required("First name is required"),
  middleName: yup.string().required("Middle name is required"),
  gender: yup.string().required("Gender is required"),
  email: yup.string().required("Email address is required"),
  dateofbirth: yup.date().typeError("Date of birth is required"),
  // dateofbirth: yup.date()
  //   .transform(function (value, originalValue) {
  //     if (isType(value)) {
  //       return value;
  //     }
  //     const result = parse(originalValue, "dd.MM.yyyy", new Date());
  //     return result;
  //   })
  //   .typeError("please enter a valid date")
  //   .required()
  //   .min("1969-11-13", "Date is too early"),
  stateoforigin: yup.string().required("State of origin is required"),
  address: yup.string().required("Contact address is required"),
  institution: yup.string().required("Institution is required"),
  course: yup.string().required("Course is required"),
  level: yup.number().required("Level is required"),
  // firstInternship: yup.string().required("Pick an option"),
  year: yup.number().when("firstInternship", {
    is: (value) => value === "no",
    then: () => yup.number().required(),
    otherwise: () => yup.string(),
  }),
  duration: yup.string().when("firstInternship", {
    is: (value) => value === "no",
    then: () => yup.string().required(),
    // otherwise: () => yup.string(),
  }),
  organization: yup.string().when("firstInternship", {
    is: (value) => value === "no",
    then: () => yup.string().required(),
    // otherwise: () => yup.string(),
  }),
  // duration: yup.string().required("Duration is required"),
  // organization: yup.string().required("Organization is required"),
  interest: yup
    .array()
    .min(1, "Please select at least one option.")
    .max(3, "You can only select up to three options."),
  reasonitems: yup
    .string()
    .required("Your reason for choosing ITeMS is required"),
  expectations: yup.string().required("This field is required"),
  explainInterest: yup.string().required("This field is required"),
  skills: yup.string().required("This field is required"),
});
