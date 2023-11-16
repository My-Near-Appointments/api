import { UserRole } from '@prisma/client';

export class UserInternalResponseDto {
  id: string;
  name: string;
  role: UserRole;
  username: string;
  createdAt: Date;
  updatedAt: Date;
}
