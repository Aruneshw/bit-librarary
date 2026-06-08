import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';

// Load env variables
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY not found in environment');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const scratchDir = '/home/aruneshwaran/.gemini/antigravity/brain/2228b4b1-dd51-4837-aaa4-da2fd4437603/scratch';

async function seedPhysics() {
  const subjectId = 'a1000000-0000-0000-0000-000000000002';
  const references = '22PH202 - Electromagnetism and Modern Physics';
  const rows: any[] = [];

  // 1. Process MT1 (Questions 1-48)
  const mt1Files = ['physics_mt1_1_16.json', 'physics_mt1_17_32.json', 'physics_mt1_33_48.json'];
  for (const filename of mt1Files) {
    const filePath = path.join(scratchDir, filename);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    for (const item of data) {
      const qText = item.question;
      let fullQuestion = qText;
      if (item.marks_info) {
        // Only append if not already appended in the json question text
        if (!fullQuestion.includes(item.marks_info)) {
          fullQuestion += `\n\n*(${item.marks_info})*`;
        }
      }
      
      const qNum = item.number; // 1 to 48
      const orderIndex = qNum; // 1 to 48
      const uuid = `c1000000-0000-0000-0000-${String(qNum).padStart(12, '0')}`;
      
      rows.push({
        id: uuid,
        subject_id: subjectId,
        question: fullQuestion,
        answer: item.answer,
        image_url: null,
        references: references,
        notes: `Module Test-I Q${qNum}`,
        order_index: orderIndex
      });
    }
  }

  // 2. Process MT2 (Questions 49-80)
  const mt2Files = ['physics_mt2_1_16.json', 'physics_mt2_17_32.json'];
  for (const filename of mt2Files) {
    const filePath = path.join(scratchDir, filename);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    for (const item of data) {
      const qText = item.question;
      let fullQuestion = qText;
      if (item.marks_info) {
        if (!fullQuestion.includes(item.marks_info)) {
          fullQuestion += `\n\n*(${item.marks_info})*`;
        }
      }
      
      const qNum = item.number; // 1 to 32
      const orderIndex = 48 + qNum; // 49 to 80
      const uuid = `c2000000-0000-0000-0000-${String(qNum).padStart(12, '0')}`;
      
      rows.push({
        id: uuid,
        subject_id: subjectId,
        question: fullQuestion,
        answer: item.answer,
        image_url: null,
        references: references,
        notes: `Module Test-II Q${qNum}`,
        order_index: orderIndex
      });
    }
  }

  console.log(`Upserting ${rows.length} questions for Physics (MT1 & MT2)...`);
  
  const { error } = await supabase
    .from('questions')
    .upsert(rows, { onConflict: 'id' });

  if (error) {
    console.error('Error seeding Physics:', error);
  } else {
    console.log(`Successfully seeded ${rows.length} questions for Physics!`);
  }
}

seedPhysics().catch(console.error);

