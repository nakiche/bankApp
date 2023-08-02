const regexName = /^[a-zA-Z]+$/;
const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

export default function Validate(inputs) {
  var errors = {};

  //first name validation
  if (!inputs.firstName) {
    errors.firstName = "first name is required";
  } else if (inputs.firstName.length < 2) {
    errors.firstName = "first name must contain at least 2 characters";
  } else if (!regexName.test(inputs.firstName)) {
    //a-Z checking
    errors.firstName = "Invalid first name given";
  }

  //last name validation
  if (!inputs.lastName && inputs.firstName) {
    errors.lastName = "last name is required";
  } else if (inputs.lastName.length < 2 && inputs.firstName) {
    errors.lastName = "last name must contain at least 2 characters";
  } else if (!regexName.test(inputs.lastName) && inputs.firstName) {
    //a-Z checking
    errors.lastName = "Invalid last name given";
  }

  //userName validation
  if (!inputs.userName && inputs.lastName) {
    errors.userName = "userName is required";
  } else if (inputs.userName.length < 8 && inputs.lastName) {
    errors.userName = "userName must contain at least 8 characters";
  } 


  //password validation
  if (!inputs.password && inputs.userName.length>=8) {
    errors.password = "password is required";
  } else if (inputs.password.length < 6 && inputs.userName.length>=8) {
    errors.password = "password must contain at least 6 characters";
  } 

    //password-confirmation validation
    if (!inputs.passwordConfirm && inputs.password.length>=6) {
      errors.passwordConfirm = "password confirmation is required";
    } else if (inputs.passwordConfirm.length < 6 && inputs.password.length>=6) {
      errors.passwordConfirm = "password must contain at least 6 characters";
    } else if (inputs.passwordConfirm !== inputs.password && inputs.password.length>=6){
      errors.passwordConfirm = "passwords must be identic";
    }

  return errors;
}
