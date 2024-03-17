import React, { useState } from "react";
import { Box, Button, FormControl, FormLabel, Input, VStack, HStack, Text, Heading, Divider, Avatar, Textarea } from "@chakra-ui/react";
import { FaUser, FaEnvelope, FaLock, FaPaperPlane } from "react-icons/fa";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const sampleUsers = [
    { id: 1, name: "John Doe", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxtYWxlJTIwYXZhdGFyfGVufDB8fHx8MTcxMDYxMTg2OHww&ixlib=rb-4.0.3&q=80&w=1080" },
    { id: 2, name: "Jane Smith", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBhdmF0YXJ8ZW58MHx8fHwxNzEwNjExODY4fDA&ixlib=rb-4.0.3&q=80&w=1080" },
    { id: 3, name: "Mike Johnson", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwyfHxtYWxlJTIwYXZhdGFyfGVufDB8fHx8MTcxMDYxMTg2OHww&ixlib=rb-4.0.3&q=80&w=1080" },
    { id: 4, name: "Emily Davis", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwyfHxmZW1hbGUlMjBhdmF0YXJ8ZW58MHx8fHwxNzEwNjExODY4fDA&ixlib=rb-4.0.3&q=80&w=1080" },
  ];

  const handleSignUp = () => {
    // Perform sign up logic here
    setShowLogin(true);
  };

  const handleLogin = () => {
    // Perform login logic here
    setIsLoggedIn(true);
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      setMessages([...messages, { text: message, isSent: true }]);
      setMessage("");
    }
  };

  if (!isLoggedIn) {
    return (
      <Box p={8}>
        <Heading mb={8}>{showLogin ? "Login" : "Sign Up"}</Heading>
        <VStack spacing={4} align="stretch">
          {!showLogin && (
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input type="text" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </FormControl>
          )}
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </FormControl>
          <Button colorScheme="blue" onClick={showLogin ? handleLogin : handleSignUp}>
            {showLogin ? "Login" : "Sign Up"}
          </Button>
          <Text>
            {showLogin ? "Don't have an account?" : "Already have an account?"}
            <Button variant="link" onClick={() => setShowLogin(!showLogin)} ml={2}>
              {showLogin ? "Sign Up" : "Login"}
            </Button>
          </Text>
        </VStack>
      </Box>
    );
  }

  return (
    <Box p={8}>
      <Heading mb={8}>Welcome, {username}!</Heading>
      <HStack spacing={8} align="stretch">
        <Box flex={1} borderWidth={1} borderRadius="md" p={4}>
          <Heading size="md" mb={4}>
            Active Users
          </Heading>
          <VStack spacing={4} align="stretch">
            {sampleUsers.map((user) => (
              <HStack key={user.id} p={2} borderWidth={1} borderRadius="md" cursor="pointer" onClick={() => handleUserSelect(user)} bg={selectedUser === user ? "gray.100" : "white"}>
                <Avatar src={user.avatar} />
                <Text>{user.name}</Text>
              </HStack>
            ))}
          </VStack>
        </Box>
        <Box flex={2} borderWidth={1} borderRadius="md" p={4}>
          <Heading size="md" mb={4}>
            Chat with {selectedUser?.name}
          </Heading>
          {selectedUser ? (
            <>
              <Box h="300px" overflowY="auto" mb={4}>
                {messages.map((msg, index) => (
                  <Box key={index} p={2} borderWidth={1} borderRadius="md" alignSelf={msg.isSent ? "flex-end" : "flex-start"} bg={msg.isSent ? "blue.100" : "gray.100"} maxW="80%">
                    {msg.text}
                  </Box>
                ))}
              </Box>
              <Divider mb={4} />
              <HStack>
                <Textarea placeholder="Type your message..." value={message} onChange={(e) => setMessage(e.target.value)} />
                <Button colorScheme="blue" onClick={handleSendMessage}>
                  <FaPaperPlane />
                </Button>
              </HStack>
            </>
          ) : (
            <Text>Select a user to start chatting.</Text>
          )}
        </Box>
      </HStack>
    </Box>
  );
};

export default Index;
