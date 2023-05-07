import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { config } from 'dotenv';
config();

const prisma = new PrismaClient();

async function main() {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(process.env.SYSTEM_USER_PW, salt);

  const systemUser = await prisma.user.upsert({
    where: { email: 'system@mJis.com' },
    update: {},
    create: {
      email: 'system@mJis.com',
      role: 'ADMIN',
      nickname: 'system',
      password: hashedPassword,
    },
  });

  console.log(`systemUser id: ${systemUser.id}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
