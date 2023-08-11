import Ajv, { ValidateFunction } from "ajv";
import addFormats from "ajv-formats";
import { StdError, ErrBadRequest } from "../../pkg/stderror";
import { StdInvalidParam } from "../../pkg/stderror/stderror";
import { DataValidateFunction } from "ajv/dist/types";

export let ajv = new Ajv({ allErrors: true }); // options can be passed, e.g. {allErrors: true}
ajv = addFormats(ajv);

export const convertToStdErr = (
  validate: ValidateFunction
): StdError | undefined => {
  if (validate.errors) {
    var errors: StdInvalidParam[] = [];
    validate.errors.forEach((err) => {
      if (err.keyword === "required")
        errors.push({
          name: err.params.missingProperty,
          reason: "field is required",
        });
      else {
        errors.push({
          name: err.instancePath.substring(1),
          reason: err.message ? err.message : "",
        });
      }
    });
    return ErrBadRequest().addErrors(errors);
  }
};

export default ajv;
