// lib/error-codes.ts

export enum ErrorCode {
  // 1000–1999: Authentication & Security
  AUTH_INVALID_CREDENTIALS = 1001,
  AUTH_ACCOUNT_LOCKED = 1002,
  AUTH_ACCOUNT_DISABLED = 1003,
  AUTH_ACCESS_DENIED = 1004,
  AUTH_ROLE_NOT_FOUND = 1005,
  AUTH_EMAIL_SENDING_FAILED = 1006,
  AUTH_INVALID_ACTIVATION_TOKEN = 1007,
  AUTH_ACTIVATION_TOKEN_EXPIRED = 1008,

  // 2000–2999: Users & Profiles
  USER_USERNAME_TOO_SHORT = 2001,
  USER_USERNAME_TOO_LONG = 2002,
  USER_USERNAME_ALREADY_EXISTS = 2003,
  USER_EMAIL_INVALID = 2004,
  USER_EMAIL_ALREADY_EXISTS = 2005,
  USER_TERMS_NOT_ACCEPTED = 2006,
  USER_DOB_INVALID = 2007,
  USER_VALIDATION_FAILED = 2008,
  FAVORITE_ALREADY_EXISTS = 2009,

  // 3000–3999: Reviews / Content
  REVIEW_ALREADY_EXISTS = 3001,

  // 4000–4999: Not Found
  ENTITY_NOT_FOUND = 4040,

  // 5000: Generic / Internal
  INTERNAL_ERROR = 5000,
}

export interface ErrorInfo {
  httpStatus: number;
  message: string;
}

/**
 * Lookup table so you can do:
 *   const info = ERROR_CATALOG[ErrorCode.REVIEW_ALREADY_EXISTS];
 *   console.log(info.httpStatus, info.message);
 */
export const ERROR_CATALOG: Record<ErrorCode, ErrorInfo> = {
  [ErrorCode.AUTH_INVALID_CREDENTIALS]: {
    httpStatus: 403,
    message: "Invalid email or password",
  },
  [ErrorCode.AUTH_ACCOUNT_LOCKED]: {
    httpStatus: 403,
    message: "Account is locked",
  },
  [ErrorCode.AUTH_ACCOUNT_DISABLED]: {
    httpStatus: 403,
    message: "Account is disabled",
  },
  [ErrorCode.AUTH_ACCESS_DENIED]: {
    httpStatus: 403,
    message: "Access denied",
  },
  [ErrorCode.AUTH_ROLE_NOT_FOUND]: {
    httpStatus: 500,
    message: "User role not found",
  },
  [ErrorCode.AUTH_EMAIL_SENDING_FAILED]: {
    httpStatus: 500,
    message: "Failed to send activation email",
  },
  [ErrorCode.AUTH_INVALID_ACTIVATION_TOKEN]: {
    httpStatus: 400,
    message: "Invalid activation token",
  },
  [ErrorCode.AUTH_ACTIVATION_TOKEN_EXPIRED]: {
    httpStatus: 400,
    message: "Activation token expired",
  },

  [ErrorCode.USER_USERNAME_TOO_SHORT]: {
    httpStatus: 400,
    message: "Username must be at least 3 characters",
  },
  [ErrorCode.USER_USERNAME_TOO_LONG]: {
    httpStatus: 400,
    message: "Username must be at most 20 characters",
  },
  [ErrorCode.USER_USERNAME_ALREADY_EXISTS]: {
    httpStatus: 409,
    message: "Username is already taken",
  },
  [ErrorCode.USER_EMAIL_INVALID]: {
    httpStatus: 400,
    message: "Email address is invalid",
  },
  [ErrorCode.USER_EMAIL_ALREADY_EXISTS]: {
    httpStatus: 409,
    message: "Email is already registered",
  },
  [ErrorCode.USER_TERMS_NOT_ACCEPTED]: {
    httpStatus: 400,
    message: "You must accept the Terms and Conditions",
  },
  [ErrorCode.USER_DOB_INVALID]: {
    httpStatus: 400,
    message: "Date of birth is invalid",
  },
  [ErrorCode.USER_VALIDATION_FAILED]: {
    httpStatus: 400,
    message: "Validation failed",
  },
  [ErrorCode.FAVORITE_ALREADY_EXISTS]: {
    httpStatus: 409,
    message: "Movie is already in favorites",
  },

  [ErrorCode.REVIEW_ALREADY_EXISTS]: {
    httpStatus: 409,
    message: "You have already submitted a review for this movie",
  },

  [ErrorCode.ENTITY_NOT_FOUND]: {
    httpStatus: 404,
    message: "Resource not found",
  },

  [ErrorCode.INTERNAL_ERROR]: {
    httpStatus: 500,
    message: "Internal server error",
  },
};
