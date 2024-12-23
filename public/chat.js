// Fetch the logged-in user from localStorage
const user = JSON.parse(localStorage.getItem("user"));
console.log("chat", user);

// If user is not logged in, redirect to login page
if (!user) {
  alert("You must log in first.");
  window.location.href = "/login";
}

// Display user's name in the header
document.getElementById("user-name").textContent = user.username;

// User ID for sending messages
const userId = user.id;

// Function to fetch and display online users
async function fetchOnlineUsers() {
  try {
    console.log("Fetching online users...");
    const response = await fetch("http://localhost:3000/api/users");

    // Check if the response was successful
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Fetched online users:", data);

    // Display the list of online users
    const userList = document.getElementById("online-users");
    userList.innerHTML = data.users
      .map((u) => `<li>${u.username} (${u.email})</li>`)
      .join("");
  } catch (error) {
    console.error("Error fetching online users:", error);
  }
}

// Function to send a user message
async function sendUserMessage() {
  const messageInput = document.getElementById("message");
  const message = messageInput.value.trim(); // Get the latest message input

  if (!message) {
    alert("Message cannot be empty!");
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/api/users-chats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, userId }),
    });

    // Check if the response was successful
    if (!response.ok) {
      throw new Error(`Failed to send message! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Message sent successfully:", data);

    // Clear the message input field
    messageInput.value = "";
  } catch (error) {
    console.error("Error sending message:", error);
    alert("Failed to send the message. Please try again.");
  }
}

// Attach the sendUserMessage function to the send button
document.getElementById("send-button").onclick = sendUserMessage;

// Call the function to fetch and display online users
fetchOnlineUsers();
