export const getErrorMessage = (input: string): string => {
  switch (input) {
    case "email.invalid":
      return "Your Email is invalid. Please try again.";
    case "credentials.invalid":
      return "Your Email or Password is not correct";
    case "identity.notfound":
      return "We could not found your email in our system.";
    default:
      return "Unknown problem. Please contact our administrator to get support";
  }
};
