// Supabase Configuration - These values are safe to be public (anon key is meant to be exposed)
const SUPABASE_URL = 'https://iiwdpempngtapcyytdbg.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlpd2RwZW1wbmd0YXBjeXl0ZGJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI3NjMyMDksImV4cCI6MjA3ODMzOTIwOX0.rJd6CzqUEerOs0DeFNOATAuWZ2UeZOTbEXKX-loGrJM';

// Check if Supabase JS library loaded
if (typeof window.supabase === 'undefined') {
    console.error('Supabase JS library not loaded. Make sure the CDN script is included before this file.');
    alert('Configuration error: Supabase library not loaded. Please refresh the page.');
} else {
    console.log('Supabase JS library loaded successfully');
}

// Initialize Supabase client
const supabase = window.supabase?.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Export for use in other files
window.supabaseClient = supabase;

console.log('supabaseClient initialized:', window.supabaseClient ? 'Success' : 'Failed');