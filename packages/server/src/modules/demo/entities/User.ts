import { Entity, UpdateDateColumn, CreateDateColumn, DeleteDateColumn, PrimaryColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IUser } from "../../../../../shared_types/entities";
@Entity('users')
export class User implements IUser {
    @ApiProperty({ description: 'Unique identifier (workday)' })
    @PrimaryColumn()
    id: number;

    @ApiProperty({})
    @CreateDateColumn()
    created_at: Date;

    @ApiProperty({})
    @UpdateDateColumn()
    updated_at: Date | null;

    @ApiProperty({})
    @DeleteDateColumn()
    deleted_at: Date | null;
}
