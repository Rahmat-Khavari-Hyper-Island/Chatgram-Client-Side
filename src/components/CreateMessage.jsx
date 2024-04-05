import React, { useState, useEffect } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useCreateMessageContext } from "../context/CreateMessageContext";
import { useUpdateMessage } from "../context/UpdateMessageContext";

const CreateMessage = ({
  messageNeedsEdit,
  editingMode,
  setEditingMode,
  handleHideCMF,
}) => {
  const [messageText, setMessageText] = useState("");

  useEffect(() => {
    if (editingMode && messageNeedsEdit) {
      setMessageText(messageNeedsEdit.messageContent);
    } else {
      setMessageText("");
    }
  }, [editingMode, messageNeedsEdit]);

  const {
    createMessage,
    loading: createLoading,
    error: createError,
  } = useCreateMessageContext();
  const { updateMessage, error: updateError } = useUpdateMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingMode) {
        if (!messageText.trim()) {
          throw new Error("Message text cannot be empty");
        }
        await updateMessage(messageNeedsEdit.messageId, messageText);
        console.log("Your message edited successfully!"); // Added console log
      } else {
        if (!messageText.trim()) {
          throw new Error("Message text cannot be empty");
        }
        await createMessage(messageText);
      }
      setMessageText("");
      setEditingMode(false);
    } catch (error) {
      console.error("Error creating/updating message:", error);
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <Card className="mb-3" style={{ width: "500px" }}>
        <Card.Body>
          <Card.Title>
            {editingMode ? "Edit Message" : "Create New Message"}
          </Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formMessageText" className="mb-3">
              <Form.Label>Message Text</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter message text"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                disabled={createLoading}
              />
            </Form.Group>

            <div className="d-flex justify-content-end">
              <Button
                variant="secondary"
                className="me-2"
                onClick={() => {
                  setEditingMode(false);
                  handleHideCMF(); // Corrected function call
                }}
                disabled={createLoading}
              >
                Cancel
              </Button>

              {editingMode && (
                <Button
                  variant="primary"
                  type="submit"
                  disabled={createLoading}
                >
                  Send Edited Message
                </Button>
              )}
              {!editingMode && (
                <Button
                  variant="success"
                  type="submit"
                  disabled={createLoading}
                >
                  Create Message
                </Button>
              )}
            </div>
            {createError && <p className="text-danger mt-2">{createError}</p>}
            {updateError && <p className="text-danger mt-2">{updateError}</p>}
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CreateMessage;
