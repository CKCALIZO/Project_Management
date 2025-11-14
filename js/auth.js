// Authentication helper functions

async function checkAuth() {
    const { data: { session }, error } = await supabaseClient.auth.getSession();
    
    if (error || !session) {
        window.location.href = 'login.html';
        return null;
    }
    
    return session;
}

async function signOut() {
    console.log('signOut called');
    try {
        // Try to sign out from Supabase
        const { error } = await supabaseClient.auth.signOut();
        
        // Ignore "Auth session missing" error - user is already logged out
        if (error && error.name !== 'AuthSessionMissingError') {
            console.error('Error signing out:', error);
        }
        console.log('Supabase signOut completed');
    } catch (err) {
        console.log('Sign out catch:', err);
    }
    
    // Always redirect to login page
    console.log('Redirecting to login...');
    window.location.href = 'login.html';
    return false; // Prevent default link behavior
}

// Add logout button to navbar
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar-nav');
    if (navbar) {
        const logoutBtn = document.createElement('li');
        logoutBtn.className = 'nav-item';
        logoutBtn.innerHTML = '<a class="nav-link text-danger" href="#" onclick="signOut(); return false;">Logout</a>';
        navbar.appendChild(logoutBtn);
    }
});
