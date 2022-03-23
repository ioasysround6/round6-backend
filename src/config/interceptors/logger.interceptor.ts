import {
  Injectable,
  Inject,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
} from '@nestjs/common';
import { Logger } from 'winston';
import { Observable } from 'rxjs';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(@Inject('winston') private logger: Logger) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    this.log(context.switchToHttp().getRequest());
    return next.handle();
  }

  private log(req: any) {
    const body = { ...req.body };
    delete body.password;
    const user = req.user;
    const userId = user ? user.id : null;
    const userRole = user ? user.role : null;
    const storedData = {
      timestamp: new Date().toISOString(),
      method: req.method,
      route: req.route.path,
      data: {
        body: body,
        query: req.query,
        params: req.params,
      },
      from: req.ip,
      madeBy: userId,
      role: userRole,
    };
    this.logger.info(JSON.stringify(storedData));
  }
}
