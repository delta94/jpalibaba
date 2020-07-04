export const getSuccessMessage = (input: string): string => {
  switch (input) {
    case "shippingAddress.updated":
      return "Your Shipping Address Updated";
    case "agency.updated":
      return "Your Agency Info Updated";
    case "campaign.created":
      return "Add Campaign Successfully";
    case "product.updated":
      return "Update Product Successfully";
    case "emailForgotPassword.sent":
      return "Email Reset Password was sent. Please check email to get the instruction.";
    case "password.reset":
      return "Your password has been updated.";
    default:
      return "Your action is processed successfully";
  }
};
