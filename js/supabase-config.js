// Supabase Configuration
const SUPABASE_URL = 'https://iiwdpempngtapcyytdbg.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlpd2RwZW1wbmd0YXBjeXl0ZGJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI3NjMyMDksImV4cCI6MjA3ODMzOTIwOX0.rJd6CzqUEerOs0DeFNOATAuWZ2UeZOTbEXKX-loGrJM';

// Initialize Supabase client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Export for use in other files
window.supabaseClient = supabase;
