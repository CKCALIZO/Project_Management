// Main application entry point - Updated for Supabase

document.addEventListener('DOMContentLoaded', async function() {
    console.log('Application loaded');
    
    // Check authentication
    const session = await checkAuth();
    if (!session) return;
    
    // Load page-specific content
    const currentPage = window.location.pathname.split('/').pop();
    
    if (currentPage === 'index.html' || currentPage === '') {
        await updateDashboard();
    }
});
