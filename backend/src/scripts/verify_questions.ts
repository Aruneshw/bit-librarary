import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY not found in environment');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function verifySubject(subjectCode: string, subjectId: string) {
  const { data, error, count } = await supabase
    .from('questions')
    .select('id, question, order_index, notes', { count: 'exact' })
    .eq('subject_id', subjectId)
    .order('order_index', { ascending: true });

  if (error) {
    console.error(`Error fetching questions for ${subjectCode}:`, error);
    return;
  }

  console.log(`\n=== Verification for ${subjectCode.toUpperCase()} ===`);
  console.log(`Total questions in database: ${count}`);
  
  if (data && data.length > 0) {
    console.log(`First question (order_index: ${data[0].order_index}):`);
    console.log(`  ID: ${data[0].id}`);
    console.log(`  Note: ${data[0].notes}`);
    console.log(`  Question snippet: "${data[0].question.substring(0, 100)}..."`);
    
    // Check transition around index 48-49
    const q48 = data.find(q => q.order_index === 48);
    const q49 = data.find(q => q.order_index === 49);
    const q80 = data.find(q => q.order_index === 80);
    
    if (q48) {
      console.log(`Question 48 (order_index: 48):`);
      console.log(`  ID: ${q48.id}`);
      console.log(`  Note: ${q48.notes}`);
      console.log(`  Snippet: "${q48.question.substring(0, 100)}..."`);
    }
    if (q49) {
      console.log(`Question 49 (order_index: 49):`);
      console.log(`  ID: ${q49.id}`);
      console.log(`  Note: ${q49.notes}`);
      console.log(`  Snippet: "${q49.question.substring(0, 100)}..."`);
    }
    if (q80) {
      console.log(`Question 80 (order_index: 80):`);
      console.log(`  ID: ${q80.id}`);
      console.log(`  Note: ${q80.notes}`);
      console.log(`  Snippet: "${q80.question.substring(0, 100)}..."`);
    }
  }
}

async function run() {
  await verifySubject('beee', 'a1000000-0000-0000-0000-000000000007');
  await verifySubject('bee', 'a1000000-0000-0000-0000-000000000008');
  await verifySubject('physics', 'a1000000-0000-0000-0000-000000000002');
}

run().catch(console.error);
