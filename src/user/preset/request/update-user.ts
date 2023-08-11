import { tzIdentifiers } from "../../../utils/timezone/timezones";
import { JSONSchemaType } from "ajv";

export interface IUpdateUserRequest {
  id: string;
  email: string;
  fullName: string;
  dob: string;
  timezone: string;
}

export const updateUserScheme: JSONSchemaType<IUpdateUserRequest> = {
  type: "object",
  properties: {
    id: { type: "string" },
    email: { type: "string", format: "email" },
    fullName: { type: "string" },
    dob: { type: "string", format: "date" },
    timezone: { type: "string", enum: [...tzIdentifiers] },
  },
  required: ["id", "email", "fullName", "dob", "timezone"],
  additionalProperties: false,
};
