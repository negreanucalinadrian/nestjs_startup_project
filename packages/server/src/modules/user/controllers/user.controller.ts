import { Controller, Get } from '@nestjs/common';
import { CurrentUser } from "@/decorators/user.decorator";
import {IUser} from "@/shared_types/entities";

@Controller('user')
export class UserController {
    @Get('/info')
    public async current(@CurrentUser() user: IUser): Promise<IUser> {
        return user;
    }
}