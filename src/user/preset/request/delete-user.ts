import { JSONSchemaType } from "ajv";

export interface IDeleteUserRequest {
  id: string;
}

export const deleteUserScheme: JSONSchemaType<IDeleteUserRequest> = {
  type: "object",
  properties: {
    id: { type: "string" },
  },
  required: ["id"],
  additionalProperties: false,
};
