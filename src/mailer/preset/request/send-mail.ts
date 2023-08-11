import { JSONSchemaType } from "ajv";

export interface ISendMailRequest {
  topic: string;
  email: string;
  message: string;
}

export const sendMailScheme: JSONSchemaType<ISendMailRequest> = {
  type: "object",
  properties: {
    topic: { type: "string" },
    email: { type: "string", format: "email" },
    message: { type: "string" },
  },
  required: ["topic", "email", "message"],
  additionalProperties: false,
};
