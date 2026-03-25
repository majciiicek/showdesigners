-- Showdesigners — schéma databáze pro AI asistenta
-- Spusť v Supabase SQL Editoru

-- Tabulka konverzací
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_token UUID UNIQUE NOT NULL DEFAULT gen_random_uuid(),
  name TEXT,
  email TEXT,
  inquiry_sent BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabulka zpráv
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index pro rychlé načítání zpráv konverzace
CREATE INDEX messages_conversation_id_idx ON messages(conversation_id);

-- Index pro vyhledávání konverzace podle emailu
CREATE INDEX conversations_email_idx ON conversations(email);

-- Automaticky aktualizuje updated_at při každé změně konverzace
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER conversations_updated_at
  BEFORE UPDATE ON conversations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- RLS zapnuto — service_role klíč ho automaticky obchází (plný přístup ze serveru)
-- anon klíč nemá žádná policy → zablokován
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
