import StdError from "./stderror";

export const ErrBadRequest = () => new StdError(400, "Not valid request");

export const ErrUnauthorized = () => new StdError(401, "Unauthorized error");

export const ErrNotFound = () => new StdError(404, "Resource not found");

export const ErrDuplicateRecord = () =>
  new StdError(409, "Record already exist");

export const ErrInternalServerError = () =>
  new StdError(500, "Internal server error");

export const ErrServiceUnavailable = () =>
  new StdError(503, "Server is unavailable");
