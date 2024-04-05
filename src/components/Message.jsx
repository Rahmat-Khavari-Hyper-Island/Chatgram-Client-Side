import React, { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { useDeleteMessage } from "../context/DeleteContext";
import { useLikeContext } from "../context/LikeContext";

const Message = ({
  message,
  getUsername,
  messageId,
  numberOfLikes,
  onEdit,
}) => {
  const { deleteMessage } = useDeleteMessage();
  const { createLike } = useLikeContext();
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    setLiked(numberOfLikes > 0);
  }, [numberOfLikes]);

  const handleDelete = () => {
    deleteMessage(messageId);
  };

  const handleEdit = () => {
    onEdit(messageId, message.content);
  };

  const handleLike = () => {
    createLike(messageId);
  };

  return (
    <div className="d-flex justify-content-center">
      <Card className="mb-3" style={{ width: "500px" }}>
        <Card.Body>
          <Card.Title className="mb-2">
            {getUsername(message.author)}
          </Card.Title>
          <Card.Subtitle className="mb-4 text-muted">
            {message.timestamp}
          </Card.Subtitle>
          <Card.Text>{message.content}</Card.Text>
          <div className="d-flex justify-content-between align-items-center">
            <Button
              variant="outline-primary" // Change variant based on liked state
              className="me-2"
              onClick={handleLike}
            >
              Like {numberOfLikes}
            </Button>
            <Button
              className="btn btn-light btn-outline-danger"
              onClick={handleDelete}
            >
              Delete
            </Button>
            <Button variant="outline-secondary" onClick={handleEdit}>
              Edit your message
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Message;
