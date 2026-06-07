import re

def process():
    with open('physics_part2.txt', 'r') as f:
        content = f.read()
        
    # Split by ### <number>.
    sections = re.split(r'### \d+\.\n', content)
    # The first section is the header.
    questions = sections[1:]
    
    subject_id = 'a1000000-0000-0000-0000-000000000002'
    subject_name = '22PH202 - Electromagnetism and Modern Physics'
    
    sql_statements = []
    sql_statements.append("INSERT INTO questions (id, subject_id, question, answer, image_url, \"references\", notes, order_index) VALUES")
    
    for i, q in enumerate(questions):
        # Extract question text (ignoring the '---' at the end)
        q = q.split('---')[0].strip()
        
        # Format the question properly (escape single quotes)
        q = q.replace("'", "''")
        
        # UUID generation (c2000000... to distinguish from part 1 which was c1000000)
        uuid = f"c2000000-0000-0000-0000-{i+1:012d}"
        
        order_index = 48 + i + 1
        note = f"Module Test-II Q{i+1}"
        
        values = f"  ('{uuid}', '{subject_id}', '{q}', 'Answer not provided in source text.', NULL, '{subject_name}', '{note}', {order_index})"
        
        if i == len(questions) - 1:
            values += ";"
        else:
            values += ","
            
        sql_statements.append(values)
        
    with open('seed_physics_part2.sql', 'w') as f:
        f.write('\n'.join(sql_statements) + '\n')
        
if __name__ == '__main__':
    process()
