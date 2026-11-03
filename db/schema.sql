-- Run once against your PostgreSQL database (or use `npm run db:push`).
CREATE TABLE IF NOT EXISTS leads (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  business_type TEXT,
  interested_in TEXT NOT NULL,
  message TEXT NOT NULL,
  budget TEXT,
  source_page TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS applications (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  city TEXT,
  course TEXT NOT NULL,
  background TEXT,
  message TEXT,
  source_page TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS certificates (
  id SERIAL PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  student_name TEXT NOT NULL,
  course TEXT NOT NULL,
  issued_on DATE NOT NULL DEFAULT CURRENT_DATE,
  revoked BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Added later: batch and slot preference on applications.
ALTER TABLE applications ADD COLUMN IF NOT EXISTS batch TEXT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS slot TEXT;
