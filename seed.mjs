// seed.mjs
import { faker } from '@faker-js/faker';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PRIVATE_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !serviceKey) {
  throw new Error("Supabase URL or Service Key is missing in .env.local");
}

const supabase = createClient(supabaseUrl, serviceKey);

async function createDummyUsers() {
  console.log('Starting to seed data...');

  // --- Create Fighters ---
  for (let i = 0; i < 20; i++) {
    const email = faker.internet.email();
    const password = 'password123';
    const username = faker.internet.username(); // ✅ updated
    const fullName = faker.person.fullName();   // ✅ still valid
    const role = 'fighter';
    const location = faker.location.city();     // ✅ new API
    const style = faker.helpers.arrayElement([
      'Boxing',
      'MMA',
      'Muay Thai',
      'BJJ',
      'Wrestling',
    ]);
    const experience = faker.helpers.arrayElement(['amateur', 'pro']);
    const weight = faker.number.int({ min: 50, max: 120 });
    const height = faker.number.int({ min: 150, max: 210 });

    const { error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        username,
        full_name: fullName,
        role,
        weight_kg: weight,
        height_cm: height,
        location,
        style,
        experience,
      },
    });

    if (authError) {
      console.error(`Error creating fighter #${i + 1}:`, authError.message);
      continue;
    }

    console.log(`Created fighter: ${username} (${email})`);
  }

  // --- Create Referees ---
  for (let i = 0; i < 5; i++) {
    const email = faker.internet.email();
    const password = 'password123';
    const username = faker.internet.username(); // ✅ updated
    const fullName = faker.person.fullName();
    const role = 'referee';
    const certification = `Certified by ${faker.company.name()} Federation`; // ✅ still valid

    const { error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        username,
        full_name: fullName,
        role,
        certification_details: certification,
      },
    });

    if (authError) {
      console.error(`Error creating referee #${i + 1}:`, authError.message);
      continue;
    }

    console.log(`Created referee: ${username} (${email})`);
  }

  console.log('Seeding complete!');
}

createDummyUsers();
