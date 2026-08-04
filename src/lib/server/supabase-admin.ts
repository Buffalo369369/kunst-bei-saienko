import "server-only";

import { createClient } from "@supabase/supabase-js";
import { supabaseUrl } from "@/lib/env";
import { supabaseServiceRoleKey } from "@/lib/server/env";

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});
