import { AnySchemaObject } from "ajv";

export interface CustomValidation {
  keyword: string;
  function: (
    schema: any,
    parentSchema: AnySchemaObject
  ) => (data: any) => boolean;
}

export const notEmptyString =
  (schema: boolean, parentSchema: object) =>
  (data: string): boolean => {
    data = data.trim();
    if (schema === true && data.length === 0) return false;
    return true;
  };

export const customValidations: CustomValidation[] = [
  {
    keyword: "notEmptyString",
    function: notEmptyString,
  },
];
