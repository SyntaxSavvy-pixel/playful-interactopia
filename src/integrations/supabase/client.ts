// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://vgrbdqnwmvqtsiitxuzn.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZncmJkcW53bXZxdHNpaXR4dXpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ4NTEwMzUsImV4cCI6MjA1MDQyNzAzNX0.RfNlf2pCVCuR-KUVlIZ9Ojyiujt2MlREhdherGrQupY";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);