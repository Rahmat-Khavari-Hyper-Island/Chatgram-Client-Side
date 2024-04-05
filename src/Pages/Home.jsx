import React, { useContext, useState, useEffect } from "react";
import { HandleRequestsContext } from "../context/HandleRequests";
import { UserContext } from "../context/UserContext";
import Message from "../components/Message";
import CreateMessageForm from "../components/CreateMessage";
import { useLikeContext } from "../context/LikeContext";

function Main() {
  const { formattedMessages, loading, error } = useContext(
    HandleRequestsContext
  );
  const { users } = useContext(UserContext);
  const { getLikes } = useLikeContext();
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const likesData = await getLikes();
        setLikes(likesData);
      } catch (error) {
        console.error("Error fetching likes:", error);
      }
    };

    fetchLikes();
  }, [getLikes]);

  const getUsername = (userId) => {
    const user = users.find((user) => user.user_id === userId);
    return user ? `${user.first_name} ${user.last_name}` : "Unknown";
  };

  const getLikesForMessage = (messageId) => {
    return likes.filter((like) => like.message_id === messageId).length;
  };

  const [editingMode, setEditingMode] = useState(false);
  const [passForEdit, setPassForEdit] = useState(null);
  const [showCreateMessageForm, setShowCreateMessageForm] = useState(false);

  const handleEditbutton = (messageId, messageContent) => {
    setPassForEdit({ messageId, messageContent });
    setEditingMode(true);
    setShowCreateMessageForm(!showCreateMessageForm);
  };

  const toggleCreateMessageForm = () => {
    setShowCreateMessageForm(!showCreateMessageForm);
  };

  const handleHideCMF = () => {
    toggleCreateMessageForm();
  };

  return (
    <>
      <div className="container pt-5">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <div
            style={{ position: "relative", minHeight: "calc(100vh - 56px)" }}
          >
            <ul className="list-unstyled">
              {formattedMessages.map((message) => (
                <Message
                  key={message.id}
                  message={message}
                  getUsername={getUsername}
                  numberOfLikes={getLikesForMessage(message.id)}
                  messageId={message.id}
                  onEdit={handleEditbutton}
                />
              ))}
            </ul>
            {showCreateMessageForm && (
              <div className="position-sticky bottom-0 z-index-10000">
                <CreateMessageForm
                  messageNeedsEdit={passForEdit}
                  editingMode={editingMode}
                  setEditingMode={setEditingMode}
                  handleHideCMF={handleHideCMF} // Pass handleHideCMF as a prop
                />
              </div>
            )}
            <button
              className="btn btn-primary position-fixed bottom-0 end-0 m-3"
              onClick={toggleCreateMessageForm}
            >
              New Message
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Main;
