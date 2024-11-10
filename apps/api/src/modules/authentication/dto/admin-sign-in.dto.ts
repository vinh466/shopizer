import { IsString } from 'class-validator';

class AdminSignInDto {
  @IsString()
  public username: string;

  @IsString()
  public password: string;

}
export default AdminSignInDto;
