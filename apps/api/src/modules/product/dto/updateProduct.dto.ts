import { IsString } from "class-validator";

class UpdateProductDto {
  @IsString()
  public content: string;

  @IsString()
  public title: string;
}

export default UpdateProductDto;
