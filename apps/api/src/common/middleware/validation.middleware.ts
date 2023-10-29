import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { RequestHandler } from "express";
import HttpException from "@shopizer/helpers/HttpException";
import { convertDTOValidationErrorMessage } from "../utils/format.util";
import { toString } from "lodash";

interface DTOValidationError {
  name: string;
  value?: string;
  message: any[];
}
function getDTOValidationErrors(
  errors: ValidationError[]
): DTOValidationError[] {
  const result: DTOValidationError[] = [];
  errors.forEach((error: ValidationError) => {
    if (error.children.length > 0) {
      result.push({
        name: error.property,
        message: getDTOValidationErrors(error.children),
      });
    } else if (error.constraints) {
      result.push({
        name: error.property,
        value: error.value === undefined ? "" : error.value,
        message: Object.values(error.constraints).map((val) =>
          convertDTOValidationErrorMessage(val)
        ),
      });
    }
  });
  return result;
}

export function DtoValidation<T>(
  type: any,
  skipMissingProperties = false
): RequestHandler {
  return (req, res, next) => {
    validate(plainToInstance(type, req.body), { skipMissingProperties }).then(
      (errors: ValidationError[]) => {
        console.log(errors);
        if (errors.length > 0) {
          next(
            new HttpException(500, "Wrong Dto", getDTOValidationErrors(errors))
          );
        } else {
          next();
        }
      }
    );
  };
}
