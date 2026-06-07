# ARC_OS — Database Schema & RLS Policies

## Overview

Database: **Supabase PostgreSQL**  
All tables use UUID primary keys.  
Row Level Security (RLS) enabled on all tables.

---

## Table: profiles

Stores user identity and department selection.

| Column | Type | Constraints | Default |
|--------|------|-------------|---------|
| id | UUID | PK, references auth.users(id) | — |
| email | TEXT | UNIQUE, NOT NULL | — |
| name | TEXT | — | — |
| department | TEXT | CHECK (CS,IT,AL,AD,EEE,EIE,ME,MZ,AG,BT) | — |
| created_at | TIMESTAMPTZ | NOT NULL | now() |

### RLS Policies
```sql
-- Users can read their own profile
CREATE POLICY "Users read own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Service role can insert profiles (on signup trigger)
CREATE POLICY "Service inserts profiles"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);
```

---

## Table: subjects

Static table of available subjects with department mapping.

| Column | Type | Constraints | Default |
|--------|------|-------------|---------|
| id | UUID | PK | gen_random_uuid() |
| department | TEXT[] | NOT NULL | — |
| subject_name | TEXT | NOT NULL | — |
| icon | TEXT | — | — |

### RLS Policies
```sql
-- All authenticated users can read subjects
CREATE POLICY "Authenticated users read subjects"
  ON subjects FOR SELECT
  USING (auth.role() = 'authenticated');
```

---

## Table: questions

Questions belonging to subjects, ordered by order_index.

| Column | Type | Constraints | Default |
|--------|------|-------------|---------|
| id | UUID | PK | gen_random_uuid() |
| subject_id | UUID | FK → subjects(id) ON DELETE CASCADE | — |
| question | TEXT | NOT NULL | — |
| answer | TEXT | NOT NULL | — |
| image_url | TEXT | NULLABLE | — |
| references | TEXT | NULLABLE | — |
| notes | TEXT | NULLABLE | — |
| order_index | INT | NOT NULL | 0 |

### RLS Policies
```sql
-- All authenticated users can read questions
CREATE POLICY "Authenticated users read questions"
  ON questions FOR SELECT
  USING (auth.role() = 'authenticated');
```

---

## Table: question_views

Tracks which questions each user has viewed.

| Column | Type | Constraints | Default |
|--------|------|-------------|---------|
| id | UUID | PK | gen_random_uuid() |
| user_id | UUID | FK → profiles(id) ON DELETE CASCADE | — |
| subject_id | UUID | FK → subjects(id) ON DELETE CASCADE | — |
| question_id | UUID | FK → questions(id) ON DELETE CASCADE | — |
| viewed | BOOLEAN | NOT NULL | false |
| viewed_at | TIMESTAMPTZ | — | — |

### Unique Constraint
```sql
UNIQUE (user_id, question_id)
```

### RLS Policies
```sql
-- Users can read their own views
CREATE POLICY "Users read own views"
  ON question_views FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own views
CREATE POLICY "Users insert own views"
  ON question_views FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own views
CREATE POLICY "Users update own views"
  ON question_views FOR UPDATE
  USING (auth.uid() = user_id);
```

---

## Table: settings

Per-user application settings.

| Column | Type | Constraints | Default |
|--------|------|-------------|---------|
| id | UUID | PK | gen_random_uuid() |
| user_id | UUID | FK → profiles(id) ON DELETE CASCADE, UNIQUE | — |
| tutorial_seen | BOOLEAN | NOT NULL | false |

### RLS Policies
```sql
-- Users can read their own settings
CREATE POLICY "Users read own settings"
  ON settings FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own settings
CREATE POLICY "Users insert own settings"
  ON settings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own settings
CREATE POLICY "Users update own settings"
  ON settings FOR UPDATE
  USING (auth.uid() = user_id);
```

---

## Database Trigger: Auto-create profile on signup

```sql
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data ->> 'full_name'
  );

  INSERT INTO public.settings (user_id)
  VALUES (NEW.id);

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();
```

---

## Subject-Department Mapping Reference

| Subject | Departments |
|---------|------------|
| Engineering Mathematics II | CS,IT,AL,AD,EEE,EIE,ME,MZ,AG,BT |
| Electromagnetism and Modern Physics | CS,IT,AL,AD,EEE,EIE,ME,MZ,AG,BT |
| Engineering Chemistry II | CS,IT,AL,AD,EEE,EIE,ME,MZ,AG,BT |
| Computational Problem Solving | CS,IT,AL,AD,EEE,EIE,ME,MZ,AG,BT |
| Digital Computer Electronics | CS,IT,AL,AD |
| Tamils and Technology | CS,IT,AL,AD,AG,BT |
| Basics of Electrical Engineering | _(not assigned to any dept in spec)_ |
| Basics of Electronics Engineering | EEE,EIE,ME,MZ,AG,BT |
