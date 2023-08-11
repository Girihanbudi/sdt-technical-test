import { JSONSchemaType } from "ajv";

export interface IHappyBirthdayEvent {
  hour: number;
}

export const happyBirthdayEventScheme: JSONSchemaType<IHappyBirthdayEvent> = {
  type: "object",
  properties: {
    hour: { type: "number" },
  },
  required: ["hour"],
  additionalProperties: false,
};
