import type { PrismaClient } from '@prisma/client'
import { $Enums } from '@prisma/client'

import { environment } from '~/.server/constants/environment.constants'

export const createDefaultAdmin = async (prisma: PrismaClient) => {
  console.log('Seeding default admin');
  const user = await prisma.user.findFirst({where: {email: environment.users.admin.email}})

  if (user) {
    console.log('Default admin already exists');
    return;
  }

  console.log('Creating default admin');
  await prisma.user.create({
    data: {
      fullName: 'Default Admin',
      email: environment.users.admin.email,
      password: environment.users.admin.password, // @FIXME: Crypt password
      role: $Enums.AdminRole.ADMIN
    }
  })
}
