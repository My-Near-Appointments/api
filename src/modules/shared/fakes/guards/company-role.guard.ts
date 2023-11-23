import { CanActivate } from '@nestjs/common';

export class CompanyAdminGuardFake implements CanActivate {
  canActivate(): boolean {
    return true;
  }
}
