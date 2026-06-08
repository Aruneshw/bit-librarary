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

async function seedSubject(subjectCode: string, subjectId: string, references: string, mt1Files: string[], mt2Files: string[]) {
  const rows: any[] = [];
  
  // Load MT1
  for (const filename of mt1Files) {
    const filePath = path.join(scratchDir, filename);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    for (const item of data) {
      const qText = item.question;
      const subPrefix = item.sub_number && item.sub_number !== '(i)' && item.sub_number !== '(ii)' ? `${item.sub_number} ` : '';
      let fullQuestion = `${subPrefix}${qText}`;
      if (item.marks_info) {
        fullQuestion += `\n\n*(${item.marks_info})*`;
      }
      
      const index = rows.length + 1;
      const firstBlock = subjectCode.padEnd(8, '0');
      const uuid = `${firstBlock}-0000-0000-0000-${String(index).padStart(12, '0')}`;
      
      rows.push({
        id: uuid,
        subject_id: subjectId,
        question: fullQuestion,
        answer: item.answer,
        image_url: null,
        references: references,
        notes: `Module Test-I Q${item.number}`,
        order_index: index
      });
    }
  }

  // Load MT2
  for (const filename of mt2Files) {
    const filePath = path.join(scratchDir, filename);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    for (const item of data) {
      const qText = item.question;
      const subNum = item.sub_number || '';
      let fullQuestion = qText;
      if (subNum && !qText.includes(subNum)) {
        fullQuestion = `${subNum} ${qText}`;
      }
      if (item.marks_info) {
        fullQuestion += `\n\n*(${item.marks_info})*`;
      }
      
      const index = rows.length + 1;
      const firstBlock = subjectCode.padEnd(8, '0');
      const uuid = `${firstBlock}-0000-0000-0000-${String(index).padStart(12, '0')}`;
      
      rows.push({
        id: uuid,
        subject_id: subjectId,
        question: fullQuestion,
        answer: item.answer,
        image_url: null,
        references: references,
        notes: `Module Test-II Q${item.number}`,
        order_index: index
      });
    }
  }

  console.log(`Upserting ${rows.length} questions for ${subjectCode}...`);
  
  const { error } = await supabase
    .from('questions')
    .upsert(rows, { onConflict: 'id' });

  if (error) {
    console.error(`Error seeding ${subjectCode}:`, error);
  } else {
    console.log(`Successfully seeded ${rows.length} questions for ${subjectCode}!`);
  }
}

async function run() {
  // BEEE
  await seedSubject(
    'beee',
    'a1000000-0000-0000-0000-000000000007',
    '22GE003 - Basics of Electrical Engineering',
    ['beee_1_24.json', 'beee_25_48.json'],
    ['beee_mt2_1_16.json', 'beee_mt2_17_32.json']
  );

  // BEE
  await seedSubject(
    'bee',
    'a1000000-0000-0000-0000-000000000008',
    '22GE004 - Basics of Electronics Engineering',
    ['bee_1_24.json', 'bee_25_48.json'],
    ['bee_mt2_1_16.json', 'bee_mt2_17_32.json']
  );
}

run().catch(console.error);
