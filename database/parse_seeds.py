import os
import re
import json

def parse_tuples(sql_content):
    pos = 0
    questions = []
    n = len(sql_content)
    
    while True:
        # Locate INSERT INTO questions (case-insensitive)
        match = re.search(r'INSERT\s+INTO\s+questions\s+.*?\s+VALUES', sql_content[pos:], re.IGNORECASE | re.DOTALL)
        if not match:
            break
        
        start_pos = pos + match.end()
        i = start_pos
        
        while i < n:
            # Skip whitespace
            while i < n and sql_content[i].isspace():
                i += 1
            if i >= n:
                break
            
            # Check statement end
            if sql_content[i] == ';':
                i += 1
                pos = i
                break
            
            # Or ON CONFLICT
            if sql_content[i:i+11].upper() == 'ON CONFLICT':
                semicolon_pos = sql_content.find(';', i)
                if semicolon_pos != -1:
                    i = semicolon_pos + 1
                else:
                    i += 11
                pos = i
                break
            
            if sql_content[i] == ',':
                i += 1
                continue
                
            if sql_content[i] == '(':
                i += 1
                fields = []
                while i < n:
                    # Skip whitespace
                    while i < n and sql_content[i].isspace():
                        i += 1
                    
                    if i >= n:
                        break
                        
                    # String literal
                    if sql_content[i] == "'":
                        i += 1
                        val_chars = []
                        while i < n:
                            if sql_content[i] == "'":
                                if i + 1 < n and sql_content[i+1] == "'":
                                    val_chars.append("'")
                                    i += 2
                                else:
                                    i += 1
                                    break
                            else:
                                val_chars.append(sql_content[i])
                                i += 1
                        fields.append("".join(val_chars))
                    else:
                        start_token = i
                        while i < n and sql_content[i] not in (',', ')'):
                            i += 1
                        token = sql_content[start_token:i].strip()
                        if token.upper() == 'NULL':
                            fields.append(None)
                        else:
                            try:
                                if '.' in token:
                                    fields.append(float(token))
                                else:
                                    fields.append(int(token))
                            except ValueError:
                                fields.append(token)
                    
                    # Skip whitespace
                    while i < n and sql_content[i].isspace():
                        i += 1
                        
                    if i >= n:
                        break
                        
                    if sql_content[i] == ',':
                        i += 1
                        continue
                    elif sql_content[i] == ')':
                        i += 1
                        break
                
                if len(fields) >= 8:
                    questions.append({
                        'id': fields[0],
                        'subject_id': fields[1],
                        'question': fields[2],
                        'answer': fields[3],
                        'image_url': fields[4],
                        'references': fields[5],
                        'notes': fields[6],
                        'order_index': int(fields[7]) if isinstance(fields[7], (int, float)) else fields[7]
                    })
            else:
                i += 1
        pos = i

    return questions

def main():
    database_dir = os.path.dirname(os.path.abspath(__file__))
    frontend_mock_file = os.path.join(database_dir, '..', 'frontend', 'src', 'lib', 'mockData.ts')
    
    seed_files = [
        'seed.sql',
        'seed_dce.sql',
        'seed_maths.sql',
        'seed_physics_part2.sql',
        'seed_tamils.sql'
    ]
    
    all_questions = []
    
    for filename in seed_files:
        filepath = os.path.join(database_dir, filename)
        if not os.path.exists(filepath):
            print(f"Error: {filepath} not found.")
            continue
            
        print(f"Parsing {filename}...")
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        parsed = parse_tuples(content)
        print(f"Found {len(parsed)} questions in {filename}.")
        all_questions.extend(parsed)
        
    print(f"Total questions parsed: {len(all_questions)}")
    
    # Deduplicate by question ID
    seen_ids = set()
    unique_questions = []
    for q in all_questions:
        if q['id'] not in seen_ids:
            seen_ids.add(q['id'])
            unique_questions.append(q)
            
    print(f"Unique questions count: {len(unique_questions)}")
    
    # Subject breakdown
    subject_counts = {}
    for q in unique_questions:
        sub_id = q['subject_id']
        subject_counts[sub_id] = subject_counts.get(sub_id, 0) + 1
        
    print("Questions per subject ID:")
    for sub_id, count in subject_counts.items():
        print(f"  {sub_id}: {count}")

    # Generate file content
    subjects_definition = """import { type Subject, type Question } from '@/types';

export const MOCK_SUBJECTS: Subject[] = [
  {
    id: 'a1000000-0000-0000-0000-000000000001',
    department: ['CS', 'IT', 'AL', 'AD', 'EEE', 'EIE', 'ME', 'MZ', 'AG', 'BT'],
    subject_name: 'Engineering Mathematics II',
    icon: '∑',
  },
  {
    id: 'a1000000-0000-0000-0000-000000000002',
    department: ['CS', 'IT', 'AL', 'AD', 'EEE', 'EIE', 'ME', 'MZ', 'AG', 'BT'],
    subject_name: 'Electromagnetism and Modern Physics',
    icon: '⚛',
  },
  {
    id: 'a1000000-0000-0000-0000-000000000003',
    department: ['CS', 'IT', 'AL', 'AD', 'EEE', 'EIE', 'ME', 'MZ', 'AG', 'BT'],
    subject_name: 'Engineering Chemistry II',
    icon: '🧪',
  },
  {
    id: 'a1000000-0000-0000-0000-000000000004',
    department: ['CS', 'IT', 'AL', 'AD', 'EEE', 'EIE', 'ME', 'MZ', 'AG', 'BT'],
    subject_name: 'Computational Problem Solving',
    icon: '<>',
  },
  {
    id: 'a1000000-0000-0000-0000-000000000005',
    department: ['CS', 'IT', 'AL', 'AD'],
    subject_name: 'Digital Computer Electronics',
    icon: '🖥',
  },
  {
    id: 'a1000000-0000-0000-0000-000000000006',
    department: ['CS', 'IT', 'AL', 'AD', 'AG', 'BT'],
    subject_name: 'Tamils and Technology',
    icon: '🏛',
  },
  {
    id: 'a1000000-0000-0000-0000-000000000007',
    department: [],
    subject_name: 'Basics of Electrical Engineering',
    icon: '⚡',
  },
  {
    id: 'a1000000-0000-0000-0000-000000000008',
    department: ['EEE', 'EIE', 'ME', 'MZ', 'AG', 'BT'],
    subject_name: 'Basics of Electronics Engineering',
    icon: '🔌',
  },
];
"""

    # We need to print the list of questions as standard JSON-like JS list
    # Because of single quotes, formatting etc., we format as JSON then convert back or just write a nice serializer
    # JSON is valid JS, so we can serialize all questions to JSON, wrap it in JS export statement.
    questions_json = json.dumps(unique_questions, indent=2, ensure_ascii=False)
    
    file_content = f"{subjects_definition}\nexport const MOCK_QUESTIONS: Question[] = {questions_json};\n"
    
    with open(frontend_mock_file, 'w', encoding='utf-8') as f:
        f.write(file_content)
        
    print(f"Updated {frontend_mock_file} successfully.")

if __name__ == '__main__':
    main()
