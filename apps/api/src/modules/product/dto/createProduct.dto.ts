import { Type } from "class-transformer";
import {
  IsArray,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsNotEmptyObject,
  IsString,
  ValidateNested,
} from "class-validator";

class Test {
  @IsString()
  public name: string;
}
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

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Test)
  public attributes: Test[];
}

export default CreateProductDto;
