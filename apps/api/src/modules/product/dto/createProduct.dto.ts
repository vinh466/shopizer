import { Type } from "class-transformer";
import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsNotEmptyObject,
  IsString,
  ValidateNested,
} from "class-validator";

class BatchDto {
  @IsDate()
  @Type(() => Date)
  public expirationDate: Date;

  @IsInt()
  public stock: number;
}

class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  public name: string;

  @IsString()
  public description: string;

  @IsInt()
  public price: number;

  @IsString()
  public image: string;

  @IsNotEmptyObject()
  @Type(() => BatchDto)
  @ValidateNested()
  public batches: BatchDto;
}

export default CreateProductDto;
