// One-time migration: moves the admin + test user from data/db.json into Supabase.
// Run with: npx tsx scripts/migrate-users.ts
import "dotenv/config";
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";

const supabaseUrl = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function migrate() {
  const usersToMigrate = [
    {
      name: "Rohit (Owner/Admin)",
      email: "rohit13513@gmail.com",
      phone: "+91 9999999999",
      password: "admin",
      status: "approved",
      role: "admin",
      devices: [],
    },
    {
      name: "Test User (Unlimited)",
      email: "test@rayoptica.com",
      phone: "+91 0000000000",
      password: "password123",
      status: "approved",
      role: "student",
      devices: [
        { deviceId: "DEV-ULBEK3EB8", deviceName: "Laptop", lastUsed: "2026-06-11T18:42:33.384Z" },
        { deviceId: "DEV-9DB6KZEA2", deviceName: "Laptop", lastUsed: "2026-07-05T19:13:16.980Z" },
        { deviceId: "DEV-LZDH83L91", deviceName: "Laptop", lastUsed: "2026-07-10T20:53:34.285Z" },
        { deviceId: "DEV-QKO9BXSXQ", deviceName: "Laptop", lastUsed: "2026-07-12T18:11:35.210Z" },
        { deviceId: "DEV-6NJVUXD6S", deviceName: "Laptop", lastUsed: "2026-07-16T19:42:12.003Z" },
        { deviceId: "DEV-YFV4ZLH5Z", deviceName: "Laptop", lastUsed: "2026-07-22T10:28:22.914Z" },
      ],
    },
  ];

  for (const u of usersToMigrate) {
    const password_hash = await bcrypt.hash(u.password, 10);
    const { error } = await supabase.from("users").insert({
      name: u.name,
      email: u.email,
      phone: u.phone,
      password_hash,
      status: u.status,
      role: u.role,
      devices: u.devices,
    });

    if (error) {
      console.error(`Failed to insert ${u.email}:`, error.message);
    } else {
      console.log(`Migrated ${u.email}`);
    }
  }

  const invites = [
    { code: "OPT-8888", maxDevices: 3, createdFor: "Board Student 1" },
    { code: "OPT-COMPETE", maxDevices: 3, createdFor: "Class 12 Competitive Student" },
  ];

  for (const inv of invites) {
    const { error } = await supabase.from("invite_codes").insert({
      code: inv.code,
      status: "active",
    });
    if (error) {
      console.error(`Failed to insert invite ${inv.code}:`, error.message);
    } else {
      console.log(`Migrated invite code ${inv.code}`);
    }
  }
}

migrate().then(() => {
  console.log("Migration complete.");
  process.exit(0);
});
