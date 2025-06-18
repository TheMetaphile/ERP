import React, { useContext, useEffect, useRef, useState } from "react";
import { Search, Star, UserX } from "react-feather";
import { getMailsBySection, getSectionTitle } from "../MailData";
import { useParams } from "react-router-dom";
import AuthContext from "../../../Context/AuthContext";
import axios from "axios";
import { BASE_URL, WEB_SOCKET_BASE_URL } from "../../../Config";

function MailList({
  emails,
  setEmails,
  setSelectedMail,
  selectedMail,
  isOpen,
  onClose,
  darkMode,
  currentSection,
}) {
  const { authState } = useContext(AuthContext);
  // const emails = getMailsBySection(currentSection);
  const { section, id: folderId } = useParams();
  const socketRef = useRef(null);
  const [socketChange, setSocketChange] = useState([]);

  useEffect(() => {
    const fetchMails = async () => {
      try {
        const socket = new WebSocket(
          `${WEB_SOCKET_BASE_URL}/getThreadedConversations?token=${authState?.accessToken}`
        );
        socketRef.current = socket;
        socket.onopen = () => {
          console.log("WebSocket connected");
          setSocketChange(socket);
        };

        socket.onmessage = (event) => {
          try {
            const response = JSON.parse(event.data);
            console.log(response);
            // setEmails(response.data.Conversation);

            switch (response.type) {
              case "initial":
                console.log("here", response.conversations);
                setEmails(response.conversations);
                break;

              case "new":
                setEmails((prevEmails) => [response.messageId, ...prevEmails]);
                break;

              case "update":
                setEmails((prevEmails) => {
                  const updatedEmail = prevEmails.find(email => email._id === response.conversationId);
                  if (!updatedEmail) return prevEmails;

                  const newEmail = {
                    ...updatedEmail,
                    unSeenCount: updatedEmail.unSeenCount + 1,
                    lastMessage: response.messageId.MessageBody,
                    LastMessageAt: response.messageId.SentAt,
                  };

                  return [
                    newEmail,
                    ...prevEmails.filter(email => email._id !== response.conversationId),
                  ];
                });
                break;
              default:
                console.log("Default");
            }
          } catch (err) {
            console.error("Error parsing WebSocket message:", err);
          }
        };

        socket.onerror = (error) => {
          console.error("WebSocket error:", error);
        };

        socket.onclose = () => {
          console.log("WebSocket disconnected");
        };

        return () => {
          socket.close();
        };
      } catch (error) {
        console.error("Error fetching emails:", error);
      }
    };

    fetchMails();
  }, [authState]);

  useEffect(() => {
    console.log("executed", section);
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      console.log("executed too");

      var IsStarred = false;
      var IsFavourite = false;
      var IsArchived = false;
      var IsInbox = false;
      var IsOutbox = false;
      var IsDeleted = false;
      switch (section) {
        case "starred":
          IsStarred = true;
          break;
        case "favourite":
          IsFavourite = true;
          break;
        case "archived":
          IsArchived = true;
          break;
        case "inbox":
          IsInbox = true;
          break;
        case "sent":
          IsOutbox = true;
          break;
        case "deleted":
          IsDeleted = true;
          break;
        default:
          IsInbox = true;
          break;
      }
      socketRef.current.send(
        JSON.stringify({
          action: "loadPage",
          page: 1,
          folderID: folderId, // Or pass as IsInbox/IsStarred/etc
          IsStarred,
          IsFavourite,
          IsArchived,
          IsInbox,
          IsOutbox,
          IsDeleted,
        })
      );
    }
    console.log('initial call')
  }, [folderId, section, socketChange]);

  return (
    <div
      className={`
    ${darkMode ? "bg-gray-900" : "bg-gray-50"}
    transform transition-all duration-300 ease-in-out
    ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
    flex flex-col border-r border-gray-200 dark:border-gray-700 h-full
  `}
    >
      <div
        className={`
      p-4 border-b
      ${darkMode ? "border-gray-700 bg-gray-900" : "border-gray-200 bg-white"}
    `}
      >
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder={`Search ${section}...`}
            className={`
          w-full pl-10 pr-4 py-2 rounded-lg border transition-all duration-200 shadow-sm
          ${darkMode
                ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500"
                : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500"
              }
          focus:outline-none focus:ring-2 focus:ring-blue-500/30
        `}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-2 py-4 space-y-3">
        {emails.length === 0 ? (
          <div className={`text-center ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            <p>No emails in {section}</p>
          </div>
        ) : (
          emails.map((email) => (
            <div
              key={email._id}
              className={`
            p-4 rounded-2xl border transition-all duration-300 ease-in-out
            shadow-sm hover:shadow-lg hover:scale-[1.01] hover:translate-x-1 cursor-pointer
            ${selectedMail?._id === email?._id
                  ? "bg-blue-50 dark:bg-blue-900/30 border-blue-500 border-l-4"
                  : darkMode
                    ? "bg-gray-800 border-gray-700 hover:bg-gray-700"
                    : "bg-white border-gray-200 hover:bg-gray-50"
                }
            ${email?.unSeenCount ? "font-semibold" : "font-normal"}
          `}
              onClick={() => {
                setSelectedMail(email);
                setEmails(prevEmails =>
                  prevEmails.map(e =>
                    e._id === email._id ? { ...e, unSeenCount: 0 } : e
                  )
                );
              }}
            >
              <div className="flex items-start gap-4">
                <div className="relative w-12 h-12 flex-shrink-0">
                  <img
                    src={email.CreatedUser.profileLink}
                    alt="avatar"
                    className="w-full h-full object-cover rounded-full border-2 border-white shadow-md"
                  />
                  {email.unSeenCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-md">
                      {email.unSeenCount}
                    </span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className={`truncate text-md font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>
                      {email.CreatedUser?.name}
                    </h4>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                        {new Date(email.LastMessageAt).toLocaleDateString("en-GB")}
                      </span>
                      {email?.status?.TagData?.length > 0 && (
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: email.status.TagData[0].TagColor }}
                          title={email.status.TagData[0].TagName}
                        />
                      )}
                    </div>
                  </div>

                  <h5 className={`text-sm truncate font-semibold ${darkMode ? "text-gray-300" : "text-gray-800"}`}>
                    {email.Subject}
                  </h5>

                  <div
                    className={`text-sm line-clamp-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                    dangerouslySetInnerHTML={{ __html: email.lastMessage }}
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>

  );
}

export default MailList;
