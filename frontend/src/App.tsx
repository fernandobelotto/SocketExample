import { Center, Heading, Text, useToast, VStack } from "@chakra-ui/react";
import AppButton from "./components/Button";

import { useEffect, useState } from "react";
import { socket } from "./socket";
import Message from "./Message";

export default function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const toast = useToast();

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });
    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("hello", (data) => {
      toast({
        title: data,
      });
    });
    return () => {
      socket.off('hello')
    }
  }, []);

  const sendMessage = () => {
    socket.emit("hello");
  };

  return (
    <Center h="100vh">
      <VStack spacing={3}>
        <Heading as="h3">{isConnected ? "connected!" : "Disconnected"}</Heading>
        <AppButton onClick={sendMessage}>Send Message!</AppButton>
        <Message></Message>
      </VStack>
    </Center>
  );
}
