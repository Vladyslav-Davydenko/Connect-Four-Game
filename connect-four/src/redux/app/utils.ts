import { SerializedError } from "@reduxjs/toolkit";

const commonErrorProperties: Array<keyof SerializedError> = [
  "name",
  "message",
  "stack",
  "code",
];

export const toSerializedError = (value: any): SerializedError => {
  const simpleError: SerializedError = {};
  for (const property of commonErrorProperties) {
    if (typeof value[property] === "string") {
      simpleError[property] = value[property];
    }
  }
  return simpleError;
};
