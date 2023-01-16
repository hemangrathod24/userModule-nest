import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional, IsDate } from "class-validator";
import { Entity, Column, PrimaryGeneratedColumn  } from "typeorm";
export enum gender {
    Maleuser = "Male",
    Femaluser = "Female"
}


@Entity()
export class User {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty()
    @Column({
        name: 'first_Name'
    })
    firstName: string

    @ApiProperty()
    @Column({
        name: 'last_Name'
    })
    lastName: string

    @ApiProperty()
    @Column({
        name: 'user_Name'
    })
    userName: string

    @ApiProperty()
    @Column({
        type: "enum",
        enum: gender,
        
    })  
    gender: gender

    @ApiProperty()
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    @Column('datetime', { nullable: true, select: false })
    public dob!: Date;
    
}


