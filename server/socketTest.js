import { io } from "socket.io-client";

const socket = io("http://localhost:6001");

socket.on("connect", () => {
  console.log("Connected with id:", socket.id);

  // Test join-chat-room event
  socket.emit("join-chat-room", { projectId: "testProjectId", freelancerId: "testFreelancerId" });

  // Test join-chat-room-client event
  socket.emit("join-chat-room-client", { projectId: "testProjectId" });

  // Listen for messages-updated event
  socket.on("messages-updated", (data) => {
    console.log("Messages updated:", data);
  });

  // Listen for user-joined-room event
  socket.on("user-joined-room", () => {
    console.log("User joined room");
  });

  // Test new-message event
  socket.emit("new-message", {
    projectId: "testProjectId",
    senderId: "testSenderId",
    message: "Hello from test",
    time: new Date().toISOString(),
  });

  // Test update-messages event
  socket.emit("update-messages", { projectId: "testProjectId" });

  // Disconnect after 5 seconds
  setTimeout(() => {
    socket.disconnect();
  }, 5000);
});
