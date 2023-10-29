import { IsString } from "class-validator";

class SignUpDto {
  @IsString()
  public email: string;

  @IsString()
  public password: string;
}

export default SignUpDto;
