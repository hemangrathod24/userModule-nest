import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsString } from "class-validator";
import { gender } from "../entities/user.entity";


export class CreateUserDto {
   
    @ApiProperty()
    @IsString()
    firstName: string;

    @ApiProperty()
    @IsString()
    lastName: string;

    @ApiProperty()
    @IsString()
    userName: string;

    @ApiProperty()
    @IsEnum({
        type:gender
    })
    gender:gender;

    @ApiProperty()
    @IsString()
    dob: Date;
}
