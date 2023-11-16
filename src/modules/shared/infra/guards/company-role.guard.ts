import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CompanyAdminGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const company = await this.prisma.company.findFirst({
      where: { adminId: user.id },
    });

    return (
      user.role === UserRole.CompanyAdmin &&
      company &&
      company.adminId === user.id
    );
  }
}
