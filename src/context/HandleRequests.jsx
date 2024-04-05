import React, { createContext, useState, useEffect } from "react";
export const HandleRequestsContext = createContext();

export const HandleRequestsProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const messagesResponse = await fetch(
          "https://vercel-server-gold.vercel.app/messages"
        );
        if (!messagesResponse.ok) {
          throw new Error(
            "Failed to fetch messages: " + messagesResponse.statusText
          );
        }
        const messagesData = await messagesResponse.json();
        setMessages(messagesData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const formatMessages = (messages) => {
    const sortedMessages = messages.sort((a, b) => {
      return new Date(b.timestamp) - new Date(a.timestamp);
    });

    const formattedMessages = sortedMessages.map((message) => {
      return {
        id: message.message_id,
        timestamp: formatDate(message.timestamp),
        author: message.user_id,
        content: message.message_text,
      };
    });

    return formattedMessages;
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return `${year}.${month}.${day}_${hours}:${minutes}:${seconds}`;
  };

  const formattedMessages = formatMessages(messages);

  return (
    <HandleRequestsContext.Provider
      value={{ formattedMessages, loading, error }}
    >
      {children}
    </HandleRequestsContext.Provider>
  );
};
