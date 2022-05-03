import { isAPIException, isErrorWithMessage } from "./exceptions";

export function hasKey<K extends string>(obj: object, key: K): obj is Record<K, unknown> {
  return key in obj;
}

export function getErrorMessage(err: unknown): string {
  if (err instanceof Error) {
    return err.message;
  }

  if (isAPIException(err)) {
    return err.data.message;
  }

  if (isErrorWithMessage(err)) {
    return err.message;
  }

  try {
    return new Error(JSON.stringify(err)).message;
  } catch {
    // fallback
    return new Error(String(err)).message;
  }
}