import { createClient } from "@supabase/supabase-js";

// Server-side client — uses service_role key, bypasses RLS
// Never expose this to the browser
export const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export interface Conversation {
  id: string;
  session_token: string;
  name: string | null;
  email: string | null;
  inquiry_sent: boolean;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  role: "user" | "assistant";
  content: string;
  created_at: string;
}
