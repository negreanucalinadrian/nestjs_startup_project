import { NestMiddleware } from "@nestjs/common";
import { Response, NextFunction } from 'express';

export class LoginMiddleware implements NestMiddleware {

    async use(req: any, res: Response, next: NextFunction): Promise<any> {
        try {
            //req.user =
            next();
        } catch (e) {
            next(e);
        }
    }
}
