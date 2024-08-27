import { AgentType, PrismaClient, Role } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const agentTypes: Omit<AgentType, "status">[] = [
    {
      id: 1,
      name: "Operador",
    },
    {
      id: 2,
      name: "Guru",
    },
  ];

  const roles: Omit<Role, "status">[] = [
    {
      id: 1,
      name: "Admin",
    },
    {
      id: 2,
      name: "User",
    },
  ];

  for (const agentType of agentTypes) {
    await prisma.agentType.upsert({
      where: { id: agentType.id },
      update: {},
      create: agentType,
    });
  }

  for (const role of roles) {
    await prisma.role.upsert({
      where: { id: role.id },
      update: {},
      create: role,
    });
  }
}
main();
