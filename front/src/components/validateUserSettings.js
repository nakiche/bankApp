const regexName = /^[a-zA-Z]+$/;
const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

export default function Validate(inputs) {
  var errors = {};


      //email validation

      if (!inputs.email) {
        errors.email = "Email is required";
      } else if ( !regexEmail.test(inputs.email)) {
        errors.email = "must be an email";
      }

      
      //email validation

      if (inputs.email && !inputs.telephone) {
        errors.telephone = "telephone is required";
      } else if (inputs.email && inputs.telephone.length<9){
        errors.telephone = "must have at least 9 digits";
      } else if (inputs.email && inputs.telephone.length>9){
        errors.telephone = "must have 9 digits";
      }
  return errors;
}
