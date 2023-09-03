import { Module } from '@nestjs/common';
import { UserController } from "@/modules/user/controllers/user.controller";

@Module({
  providers: [],
  exports: [],
  imports: [],
  controllers: [UserController],
})
export class UserModule {}
