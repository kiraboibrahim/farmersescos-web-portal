export default function parseError(error) {
  let errorMessage =
    error?.data?.message ||
    error?.message ||
    error?.data?.error ||
    error?.error ||
    `${error}`;
  errorMessage = Array.isArray(errorMessage)
    ? errorMessage.join(", ")
    : errorMessage;
  // Don't disclose  server errors
  if (!!error?.status && error.status === 404)
    errorMessage = "API endpoint not found";
  if (!!error?.status && error.status >= 500)
    errorMessage = "Something went wrong";
  if (!!error?.status && error.status === 403) errorMessage = "Access Denied";
  return errorMessage;
}
