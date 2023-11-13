import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { FindUserUseCase } from 'src/modules/user/usecases/find-user.use-case';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly findUserUseCase: FindUserUseCase) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    const user = await this.findUserUseCase.execute(payload.sub);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
