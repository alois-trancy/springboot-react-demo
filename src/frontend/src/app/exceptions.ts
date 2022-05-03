import { hasKey } from "./utilities";

export interface ErrorWithMessage {
  message: string,
}

export interface APIException {
  status: number,
  data: {
    error: string,
    message: string,
    path: string,
    status: number,
    timestamp: string,
  },
}

export const isAPIException = (err: unknown): err is APIException => {
  return typeof err === "object"
    && err !== null
    && hasKey(err, "data")
    && typeof err.data === "object"
    && err.data !== null
    && hasKey(err.data, "message");
};

export const isErrorWithMessage = (err: unknown): err is ErrorWithMessage => {
  return typeof err === "object"
    && err !== null
    && hasKey(err, "message");
};