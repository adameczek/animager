import { PrismaLibSql } from "@prisma/adapter-libsql";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@/generated/prisma/client";

const adapter = new PrismaLibSql({
  url: process.env.DATABASE_URL ?? "file:./dev.db",
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const args = process.argv.slice(2);

  const email = args[0] || "admin@example.com";
  const password = args[1] || "admin";
  const name = args[2] || "Admin";

  console.log(`⏳ Preparing account for: ${name} (${email})...`);

  // Basic email validation
  if (!email.includes("@")) {
    console.error(
      "❌ Error: The provided argument does not look like a valid email address.",
    );
    return;
  }

  console.log("⏳ Checking if user already exists...");
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    console.log(
      `❌ Error: User with email ${email} already exists in the database.`,
    );
    return;
  }

  console.log("🔐 Hashing the password...");
  const hashedPassword = await bcrypt.hash(password, 10);

  console.log("🚀 Creating user in the database...");
  const admin = await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });

  console.log(`✅ Success! Created user: ${admin.name} (${admin.email})`);
  console.log(`🔑 Password: ${password}`);
}

main()
  .catch((e) => {
    console.error("💥 An unexpected error occurred:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
