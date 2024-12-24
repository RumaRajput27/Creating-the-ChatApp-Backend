// Fetch the logged-in user from localStorage
const user = JSON.parse(localStorage.getItem("user"));
console.log("chat", user);

// Display user's name in the header
document.getElementById("user-name").textContent = user.username;

// Clear chat list initially
// document.getElementById("chat-list").textContent = '';

// User ID for sending messages
const userId = user.id;

// Function to fetch and display online users
async function fetchOnlineUsers() {
  try {
    console.log("Fetching online users...");
    const response = await fetch("http://localhost:3000/api/users");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Fetched online users:", data);

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
  const message = messageInput.value.trim();

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

    if (!response.ok) {
      throw new Error(`Failed to send message! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Message sent successfully:", data);

    // Clear the message input field and refresh chat list
    messageInput.value = "";
    fetchUsersChat(); // Refresh the chat list
  } catch (error) {
    console.error("Error sending message:", error);
    alert("Failed to send the message. Please try again.");
  }
}

// Function to fetch and display users' chat messages
async function fetchUsersChat() {
  try {
    console.log("Fetching users' chat...");
    const response = await fetch("http://localhost:3000/api/users-chats");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Fetched users' chat:", data);

    const usersChat = document.getElementById("chat-list");
    usersChat.innerHTML = data.messages
      .map(
        (msg) =>
          `<li><strong>${msg.username || 'Unknown User'}:</strong> ${msg.message}</li>`
      )
      .join("");
  } catch (error) {
    console.error("Error fetching users' chat:", error);
  }
}

// Attach the sendUserMessage function to the send button
document.getElementById("send-btn").onclick = sendUserMessage;

// Call functions to fetch data and display chats
fetchOnlineUsers();
fetchUsersChat();

// Optionally, poll for new messages every few seconds
setInterval(fetchUsersChat, 5000);
