import re
import sys
sys.path.insert(0, 'database')
from process_tamils import parse_text


def parse_entries_from_sql(sql_text):
    """Parse SQL INSERT VALUES into a list of entry texts.
    Correctly handles SQL string escaping ('' for single quote).
    """
    on_conflict = ""
    if 'ON CONFLICT' in sql_text:
        idx = sql_text.index('ON CONFLICT')
        on_conflict = sql_text[idx:]
        sql_text = sql_text[:idx]

    parts = sql_text.split('VALUES')
    header = parts[0] + 'VALUES'
    body = 'VALUES'.join(parts[1:])

    entries = []
    depth = 0
    start = None
    in_str = False
    i = 0
    while i < len(body):
        c = body[i]
        if c == "'":
            if not in_str:
                in_str = True
            else:
                if i + 1 < len(body) and body[i + 1] == "'":
                    i += 1  # skip escaped quote pair (stay in_str)
                else:
                    in_str = False
        if not in_str:
            if c == '(':
                if depth == 0:
                    start = i
                depth += 1
            elif c == ')':
                depth -= 1
                if depth == 0 and start is not None:
                    entries.append(body[start:i + 1])
                    start = None
        i += 1

    return header, entries, on_conflict


def extract_fields(entry):
    """Extract string fields from a SQL VALUES tuple."""
    inner = entry.strip()
    if inner.startswith('(') and inner.endswith(')'):
        inner = inner[1:-1]

    fields = []
    cur = []
    in_str = False
    i = 0
    while i < len(inner):
        c = inner[i]
        if c == "'":
            if not in_str:
                in_str = True
                cur = []
            else:
                if i + 1 < len(inner) and inner[i + 1] == "'":
                    cur.append("'")
                    i += 1  # skip the second quote of the pair
                else:
                    in_str = False
                    fields.append(''.join(cur))
        elif in_str:
            cur.append(c)
        i += 1
    return fields


def replace_answer_in_entry(entry, new_answer):
    """Replace the answer field in a SQL entry with a modified version."""
    fields = extract_fields(entry)
    if len(fields) < 4:
        return entry

    old_answer = fields[3]
    old_quoted = "'" + old_answer.replace("'", "''") + "'"
    new_quoted = "'" + new_answer.replace("'", "''") + "'"

    return entry.replace(old_quoted, new_quoted, 1)


def main():
    source_path = 'database/tamils_tech.txt'
    sql_path = 'database/seed_tamils.sql'

    with open(source_path, 'r') as f:
        source_content = f.read()
    
    questions = parse_text(source_content)
    short_answers = [q['a'] for q in questions]
    print(f"Parsed {len(short_answers)} short answers from source text.")

    with open(sql_path, 'r') as f:
        sql_text = f.read()

    header, entries, on_conflict = parse_entries_from_sql(sql_text)
    print(f"Parsed {len(entries)} SQL entries.")

    if len(short_answers) != len(entries):
        print(f"ERROR: Mismatch! {len(short_answers)} short answers vs {len(entries)} SQL entries.")
        return

    modified_entries = []
    for i, entry in enumerate(entries):
        old_answer = extract_fields(entry)[3]
        new_answer = old_answer + "\n\n---\n**Short Answer (சுருக்கமான பதில்):**\n" + short_answers[i]
        modified = replace_answer_in_entry(entry, new_answer)
        modified_entries.append(modified)
        if i < 3:
            print(f"  Q{i+1}: Added short answer ({len(short_answers[i])} chars)")

    result = header + '\n'
    for i, entry in enumerate(modified_entries):
        comma = ',' if i < len(modified_entries) - 1 else ''
        result += f"  {entry}{comma}\n"
    
    if on_conflict:
        result += on_conflict.strip() + '\n'

    with open(sql_path, 'w') as f:
        f.write(result)

    print(f"Successfully updated {len(modified_entries)} entries!")


if __name__ == '__main__':
    main()
