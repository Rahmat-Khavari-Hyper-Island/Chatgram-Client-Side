import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { HandleRequestsProvider } from "./context/HandleRequests.jsx";
import { UserProvider } from "./context/UserContext.jsx";
import { DeleteProvider } from "./context/DeleteContext.jsx";
import { UpdateMessageProvider } from "./context/UpdateMessageContext.jsx";
import { CreateMessageProvider } from "./context/CreateMessageContext.jsx";
import { LikeProvider } from "./context/LikeContext.jsx";
import { LoginProvider } from "./context/LoginContext.jsx";
import { SignupProvider } from "./context/SignupContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HandleRequestsProvider>
      <UserProvider>
        <DeleteProvider>
          <UpdateMessageProvider>
            <CreateMessageProvider>
              <LikeProvider>
                <LoginProvider>
                  <SignupProvider>
                    <App />
                  </SignupProvider>
                </LoginProvider>
              </LikeProvider>
            </CreateMessageProvider>
          </UpdateMessageProvider>
        </DeleteProvider>
      </UserProvider>
    </HandleRequestsProvider>
  </React.StrictMode>
);
