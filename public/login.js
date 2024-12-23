

document.getElementById('login-form').addEventListener('submit', async function (e) {

    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        // Fetch users data from the API
        const response = await fetch('http://localhost:3000/api/users', {
            headers: { 'Content-Type': 'application/json' },
        });

        const data = await response.json();

        console.log("Received users data:", data);

        // Find the user by username
        const user = data.find(user => user.username === username && user.password ===password);
        if (user) {
            // Verify the password using bcryptjs

            console.log(user, 'user');
            
            const isPasswordValid = user.password

            console.log(isPasswordValid, 'passwordvalid');
            
            if (isPasswordValid) {
                // Store the user in localStorage
                localStorage.setItem('user', JSON.stringify(user));
                alert('Login successful! Redirecting to chat...');
                // Redirect to chat.html
                window.location.href = './chat.html';
            } else {
                alert('Invalid password. Please try again.');
            }
        } else {
            alert('User not found. Please check your username.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }
});
