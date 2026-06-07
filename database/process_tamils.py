import re
import uuid

def convert_flow(text):
    lines = text.split('\n')
    new_lines = []
    i = 0
    while i < len(lines):
        line = lines[i]
        
        # Specific match for the architecture formula
        if "Indian" in line and i+1 < len(lines) and "+" in lines[i+1]:
            # Gather until =
            new_lines.append("```mermaid")
            new_lines.append("graph TD")
            new_lines.append('  "Indian" --> "Indo-Saracenic"')
            new_lines.append('  "Islamic" --> "Indo-Saracenic"')
            new_lines.append('  "Mughal" --> "Indo-Saracenic"')
            new_lines.append('  "Gothic" --> "Indo-Saracenic"')
            new_lines.append('  "European" --> "Indo-Saracenic"')
            new_lines.append("```")
            while i < len(lines) and "Indo-Saracenic" not in lines[i]:
                i += 1
            i += 1 # skip the Indo-Saracenic line
            continue

        # Check if line is just "↓"
        if i + 1 < len(lines) and '↓' in lines[i+1]:
            nodes = [lines[i].strip()]
            i += 1
            while i < len(lines):
                if '↓' in lines[i]:
                    i += 1
                    if i < len(lines) and lines[i].strip() != '':
                        nodes.append(lines[i].strip())
                        i += 1
                    else:
                        break
                else:
                    break
            if len(nodes) > 1:
                new_lines.append("```mermaid")
                new_lines.append("graph TD")
                for j in range(len(nodes) - 1):
                    a = nodes[j].replace('"', '').replace('(', '').replace(')', '').replace('/', '-')
                    b = nodes[j+1].replace('"', '').replace('(', '').replace(')', '').replace('/', '-')
                    new_lines.append(f'  "{a}" --> "{b}"')
                new_lines.append("```")
                continue
                
        # Inline flow diagrams
        if '↓' in line and not line.strip().startswith('↓'):
            parts = [p.strip() for p in line.split('↓') if p.strip()]
            if len(parts) > 1:
                new_lines.append("```mermaid")
                new_lines.append("graph TD")
                for j in range(len(parts) - 1):
                    a = parts[j].replace('"', '')
                    b = parts[j+1].replace('"', '')
                    new_lines.append(f'  "{a}" --> "{b}"')
                new_lines.append("```")
                i += 1
                continue
                
        new_lines.append(line)
        i += 1
        
    res = '\n'.join(new_lines)
    
    # CHARTS
    res = res.replace('''Relative historical importance in architecture and sculpture.

0
30
60
90
120
Architecture
Sculpture
Tourism
Heritage''', '''```mermaid
xychart-beta
    title "Major Contributions"
    x-axis ["Architecture", "Sculpture", "Tourism", "Heritage"]
    y-axis "Importance" 0 --> 120
    bar [100, 90, 80, 110]
```''')

    res = res.replace('''Major overseas trade regions connected through Tamil ports.

Arabia
Trade Importance
90
0
30
60
90
120
Sri Lanka
Rome
Arabia
Southeast Asia
Egypt''', '''```mermaid
xychart-beta
    title "Maritime Connections"
    x-axis ["Sri Lanka", "Rome", "Arabia", "Southeast Asia", "Egypt"]
    y-axis "Trade Importance" 0 --> 120
    bar [60, 90, 80, 70, 50]
```''')

    res = res.replace('''Relative importance of benefits provided by the Grand Anicut.

0
30
60
90
120
Irrigation
Agriculture
Flood Control
Water Storage
Economic Growth''', '''```mermaid
xychart-beta
    title "Benefits of Kallanai"
    x-axis ["Irrigation", "Agriculture", "Flood Control", "Storage", "Economy"]
    y-axis "Impact" 0 --> 120
    bar [110, 100, 85, 90, 75]
```''')

    res = res.replace('''Approximate distribution of commonly referenced bead categories.

Coral
Gemstone
Glass
Gold
Pearl''', '''```mermaid
pie title "Types of Beads"
    "Pearl" : 30
    "Glass" : 25
    "Gemstone" : 20
    "Gold" : 15
    "Coral" : 10
```''')

    res = res.replace('''Approximate distribution of pearl usage in ancient society.

Jewellery
Religious Use
Royal Gifts
Trade''', '''```mermaid
pie title "Uses of Ancient Pearls"
    "Jewellery" : 40
    "Trade" : 30
    "Royal Gifts" : 20
    "Religious Use" : 10
```''')

    res = res.replace('''Major application domains of modern Tamil computing.

0
30
60
90
120
Education
Mobile Apps
AI Tools
Translation
Digital Publishing''', '''```mermaid
xychart-beta
    title "Growth Areas in Tamil Computing"
    x-axis ["Education", "Mobile Apps", "AI Tools", "Translation", "Publishing"]
    y-axis "Growth" 0 --> 120
    bar [100, 90, 85, 75, 65]
```''')

    res = res.replace('''Impact Areas of Scientific Tamil

Major sectors benefited by scientific Tamil development.

Education
Government
Publishing
Research
Technology''', '''```mermaid
pie title "Impact Areas of Scientific Tamil"
    "Education" : 25
    "Research" : 25
    "Technology" : 20
    "Publishing" : 15
    "Government" : 15
```''')

    return res

def parse_text(text):
    units = re.split(r'UNIT – [IV]+ : .*', text)
    if len(units) > 1:
        units = units[1:]
    
    questions = []
    
    for unit_idx, unit_text in enumerate(units):
        # Find 2-marks and 16-marks sections
        parts = re.split(r'16 MARK QUESTIONS.*', unit_text)
        two_marks = parts[0]
        sixteen_marks = parts[1] if len(parts) > 1 else ""
        
        # Parse 2-marks
        q_splits = re.split(r'(?m)^\d+\.\s', two_marks)
        for q_block in q_splits[1:]:
            if 'Answer:' in q_block:
                q, a = q_block.split('Answer:', 1)
                questions.append({
                    'q': q.strip(),
                    'a': convert_flow(a.strip()),
                    'type': '2-Mark',
                    'unit': unit_idx + 1
                })
                
        # Parse 16-marks
        q_splits = re.split(r'(?m)^\d+\.\s', sixteen_marks)
        for q_block in q_splits[1:]:
            if 'Introduction' in q_block or 'Answer:' in q_block:
                # usually they start with question text, then Introduction or Answer:
                if 'Answer:' in q_block:
                    q, a = q_block.split('Answer:', 1)
                else:
                    q, a = q_block.split('\n', 1) # First line is question
                questions.append({
                    'q': q.strip(),
                    'a': convert_flow(a.strip()),
                    'type': '16-Mark',
                    'unit': unit_idx + 1
                })

    return questions

def main():
    with open('tamils_tech.txt', 'r') as f:
        content = f.read()
        
    questions = parse_text(content)
    
    subject_id = 'a1000000-0000-0000-0000-000000000006' # Tamils and Technology
    subject_name = '22GE201 - Tamils and Technology'
    
    sql_statements = []
    sql_statements.append("INSERT INTO questions (id, subject_id, question, answer, image_url, \"references\", notes, order_index) VALUES")
    
    for i, q in enumerate(questions):
        # UUID prefix must be valid hex. 'tam' contains invalid 't' and 'm'. 
        # We will use 'faca0000' as a valid hex prefix.
        uid = f"faca0000-0000-0000-0000-{i+1:012d}"
        
        question_text = q['q'].replace("'", "''")
        answer_text = q['a'].replace("'", "''")
        note = f"Unit {q['unit']} - {q['type']}"
        
        values = f"  ('{uid}', '{subject_id}', '{question_text}', '{answer_text}', NULL, '{subject_name}', '{note}', {i+1})"
        
        if i == len(questions) - 1:
            values += "\nON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, answer = EXCLUDED.answer, notes = EXCLUDED.notes, order_index = EXCLUDED.order_index;"
        else:
            values += ","
            
        sql_statements.append(values)
        
    with open('seed_tamils.sql', 'w') as f:
        f.write('\n'.join(sql_statements) + '\n')
        
    print(f"Processed {len(questions)} questions.")

if __name__ == '__main__':
    main()
