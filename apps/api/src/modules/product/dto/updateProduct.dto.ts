
import { Type } from "class-transformer";
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsDate,
  IsEmpty,
  IsInt,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
  ValidateNested,
} from "class-validator";
class ImageDto {
  @IsString()
  uid
  @IsString()
  name
  @IsString()
  status
  @IsString()
  url
}
class DetailList {
  @IsString()
  title
  @IsString()
  value
}
class CategoryDto {
  @IsString()
  value
  @IsString()
  label
  @IsBoolean()
  isLeaf
}
export class ModelList {
  @IsNumber()
  price
  @IsNumber()
  stock
  @IsString()
  variantId
}
export class TierVariation {
  @IsString()
  name
  // @IsArray()
  // options
  @ArrayNotEmpty()
  public options: string[];
}

class UpdateProductDto {
  @IsNotEmpty()
  @IsString()
  public name: string;

  @IsString()
  public description: string;

  @IsInt()
  @IsOptional()
  public price: number;

  @IsInt()
  @IsOptional()
  public stock: number;

  @ArrayNotEmpty()
  public productImage: ImageDto[];


  @Type(() => DetailList)
  public detailList: DetailList[];


  @Type(() => ImageDto)
  public productImageDesc: ImageDto[];

  @ArrayNotEmpty()
  @Type(() => CategoryDto)
  public category: CategoryDto[];

  @Type(() => ModelList)
  public modelList: ModelList[];

  @Type(() => TierVariation)
  public tierVariation: TierVariation[];
}

export default UpdateProductDto;
