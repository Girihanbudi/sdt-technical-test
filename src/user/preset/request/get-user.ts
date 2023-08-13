import { JSONSchemaType } from "ajv";

export interface IGetUserRequest {
  id: string;
}

export const getUserScheme: JSONSchemaType<IGetUserRequest> = {
  type: "object",
  properties: {
    id: { type: "string" },
  },
  required: ["id"],
  additionalProperties: false,
};
