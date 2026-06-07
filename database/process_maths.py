import re

def process():
    with open('maths.txt', 'r') as f:
        content = f.read()
        
    # Convert block math delimiters from [ ] to $$
    content = re.sub(r'(?m)^\[\s*$', '$$', content)
    content = re.sub(r'(?m)^\s*\]\s*$', '$$', content)
    
    # Split by $$ to separate text blocks from math blocks
    parts = content.split('$$')
    
    for i in range(len(parts)):
        if i % 2 == 0:
            # We are OUTSIDE block math (this is regular text)
            # We convert inline math (...) to $...$
            def inline_replacer(match):
                text = match.group(1)
                if 'Questions' in text or 'Hint' in text or 'Marks' in text:
                    return f"({text})"
                # Check if it contains math operators or looks like a variable
                if re.search(r'[=^_\\]|[+\-*/<>]', text) or len(text.strip()) <= 5:
                    return f"${text}$"
                return f"({text})"
            
            parts[i] = re.sub(r'\(([^()]+)\)', inline_replacer, parts[i])
            # Run second pass for nested like ((1,1,1))
            parts[i] = re.sub(r'\(([^()]+)\)', inline_replacer, parts[i])
        else:
            # We are INSIDE block math. Do NOT convert (...) to $...$.
            pass
            
    content = '$$'.join(parts)
    
    # Split by sections
    sections = re.split(r'### \d+\.\n', content)
    questions = sections[1:] # first element is the header
    
    subject_id = 'a1000000-0000-0000-0000-000000000001' # Engineering Mathematics II
    subject_name = '22MA201 - Engineering Mathematics II'
    
    sql_statements = []
    sql_statements.append("INSERT INTO questions (id, subject_id, question, answer, image_url, \"references\", notes, order_index) VALUES")
    
    for i, q in enumerate(questions):
        # Clean up
        q = q.split('---')[0].strip()
        q = q.replace("'", "''")
        
        uuid = f"e1000000-0000-0000-0000-{i+1:012d}"
        
        order_index = i + 1
        note = f"Module Test-I Q{i+1}" if i < 48 else f"Module Test-II Q{i-47}"
        
        values = f"  ('{uuid}', '{subject_id}', '{q}', 'Answer not provided in source text.', NULL, '{subject_name}', '{note}', {order_index})"
        
        if i == len(questions) - 1:
            values += "\nON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, answer = EXCLUDED.answer, notes = EXCLUDED.notes, order_index = EXCLUDED.order_index;"
        else:
            values += ","
            
        sql_statements.append(values)
        
    with open('seed_maths.sql', 'w') as f:
        f.write('\n'.join(sql_statements) + '\n')
        
if __name__ == '__main__':
    process()
