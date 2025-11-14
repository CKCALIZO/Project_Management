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
    const { error } = await supabaseClient.auth.signOut();
    if (error) {
        console.error('Error signing out:', error);
        return;
    }
    // Supabase handles session cleanup automatically
    window.location.href = 'login.html';
}

// Add logout button to navbar
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar-nav');
    if (navbar) {
        const logoutBtn = document.createElement('li');
        logoutBtn.className = 'nav-item';
        logoutBtn.innerHTML = '<a class="nav-link text-danger" href="#" onclick="signOut()">Logout</a>';
        navbar.appendChild(logoutBtn);
    }
});
