import { Heading } from "@chakra-ui/react";
import React, { useState } from "react";
import { socket } from "./socket";

export default function Message() {
  const [lastMessage, setLastMessage] = useState(null);
  socket.on("message", (data) => {
    setLastMessage(data);
  });

  return <Heading>{lastMessage}</Heading>;
}
