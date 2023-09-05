import { capitalize } from "lodash";

export function reverseCamelCaseString(str: string) {
  return (
    str?.replace(/[A-Z]/g, function (match) {
      return " " + match.toLowerCase();
    }) || ""
  );
}

export function convertDTOValidationErrorMessage(str: string) {
  const [firstString, ...restStr] = str?.split(" ") || [];
  return [capitalize(reverseCamelCaseString(firstString)), ...restStr].join(
    " "
  );
}
