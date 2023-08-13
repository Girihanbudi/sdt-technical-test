import { tzIdentifiers } from "../../../utils/timezone/timezones";
import { JSONSchemaType } from "ajv";

export interface ICreateUserRequest {
  email: string;
  fullName: string;
  dob: string;
  timezone: string;
}

export const createUserScheme: JSONSchemaType<ICreateUserRequest> = {
  type: "object",
  properties: {
    email: { type: "string", format: "email" },
    fullName: { type: "string", notEmptyString: true },
    dob: { type: "string", format: "date" },
    timezone: { type: "string", enum: [...tzIdentifiers] },
  },
  required: ["email", "fullName", "dob", "timezone"],
  additionalProperties: false,
};
