import re

def process():
    with open('dce.txt', 'r') as f:
        content = f.read()
        
    # Split the content into Test I and Test II if needed, or just extract all questions sequentially.
    # We know there are 48 questions for Test I and 32 for Test II. Total 80.
    
    # Clean up markdown bold markers just in case
    content = content.replace('**', '')
    
    # Split by question numbers: either "1. " or "### 1." at the start of a line.
    parts = re.split(r'(?m)^(?:\#\#\#\s*)?\d+\.\s*', content)
    
    # The first part is preamble ("### Questions 1-48..."). Drop it.
    questions = [p.strip() for p in parts[1:] if p.strip()]
    
    # Filter out any lingering section headers from the split if they got caught in the text
    cleaned_questions = []
    for q in questions:
        # If the question has '---', split and take the first part
        q = q.split('---')[0].strip()
        # If the question contains the Test II header, we split it off
        if '# 22AM206' in q:
            q = q.split('# 22AM206')[0].strip()
        
        if q:
            # Escape single quotes for SQL
            q = q.replace("'", "''")
            cleaned_questions.append(q)
            
    subject_id = 'a1000000-0000-0000-0000-000000000005' # Digital Computer Electronics
    subject_name = '22AM206 - Digital Computer Electronics'
    
    sql_statements = []
    sql_statements.append("INSERT INTO questions (id, subject_id, question, answer, image_url, \"references\", notes, order_index) VALUES")
    
    for i, q in enumerate(cleaned_questions):
        # UUID prefix 'dce00000' to be unique
        uuid = f"dce00000-0000-0000-0000-{i+1:012d}"
        
        order_index = i + 1
        note = f"Module Test-I Q{i+1}" if i < 48 else f"Module Test-II Q{i-47+1}"
        
        values = f"  ('{uuid}', '{subject_id}', '{q}', 'Answer not provided in source text.', NULL, '{subject_name}', '{note}', {order_index})"
        
        if i == len(cleaned_questions) - 1:
            values += "\nON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, answer = EXCLUDED.answer, notes = EXCLUDED.notes, order_index = EXCLUDED.order_index;"
        else:
            values += ","
            
        sql_statements.append(values)
        
    with open('seed_dce.sql', 'w') as f:
        f.write('\n'.join(sql_statements) + '\n')
        
    print(f"Processed {len(cleaned_questions)} questions.")

if __name__ == '__main__':
    process()
