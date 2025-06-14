import React, { useContext, useEffect, useRef, useState } from "react";
import { Search, Star, UserX } from "react-feather";
import { getMailsBySection, getSectionTitle } from "../MailData";
import { useParams } from "react-router-dom";
import AuthContext from "../../../Context/AuthContext";
import axios from "axios";
import { BASE_URL, WEB_SOCKET_BASE_URL } from "../../../Config";

function MailList({
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
  const [emails, setEmails] = useState([]);
  const socketRef = useRef(null);

  useEffect(() => {
    const fetchMails = async () => {
      try {
        const socket = new WebSocket(
          `${WEB_SOCKET_BASE_URL}/getThreadedConversations?token=${authState?.accessToken}`
        );
        socketRef.current = socket;
        socket.onopen = () => {
          console.log("WebSocket connected");
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
                setEmails((prevEmails) =>
                  prevEmails.map((email) =>
                    email._id === response.conversationId
                      ? { ...email, unSeenCount: email.unSeenCount++, lastMessage: response.messageId.MessageBody, LastMessageAt: response.messageId.SentAt }
                      : email
                  )
                );
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
  }, [folderId, section]);

  return (
    <div
      className={`${darkMode ? "bg-gray-50 dark:bg-gray-900" : "bg-gray-50"
        } transform transition-all duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } flex flex-col border-r border-gray-200 dark:border-gray-700 h-full`}
    >
      <div
        className={`p-4 border-b ${darkMode ? "border-gray-700 bg-gray-900" : "border-gray-200 bg-white"
          }`}
      >
        {/* <div className="flex items-center justify-between mb-4">
                    <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {sectionTitle}
                    </h2>
                    <button
                        onClick={onClose}
                        className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        <UserX className="w-5 h-5" />
                    </button>
                </div> */}

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder={`Search ${section}...`}
            className={`
                            w-full pl-10 pr-4 py-2 rounded-lg border transition-all duration-200
                            ${darkMode
                ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500"
              }
                            focus:outline-none focus:ring-2 focus:ring-blue-500/20
                        `}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {emails.length === 0 ? (
          <div
            className={`p-8 text-center ${darkMode ? "text-gray-400" : "text-gray-500"
              }`}
          >
            <p>No emails in {section}</p>
          </div>
        ) : (
          emails.map((email) => (
            <div
              key={email._id}
              className={`
                                p-4 border-b border-gray-200 dark:border-gray-700 cursor-pointer
                                transition-all duration-200 hover:shadow-md
                                ${selectedMail?._id === email._id
                  ? "bg-blue-50 dark:bg-blue-900/20 border-l-4 border-l-blue-500"
                  : `${darkMode
                    ? "bg-gray-900 hover:bg-gray-800"
                    : "bg-white hover:bg-gray-50"
                  }`
                }
                                ${email.unSeenCount ? "font-semibold" : "font-normal"
                }
                                transform hover:scale-[1.02] hover:translate-x-1
                            `}
              onClick={() => setSelectedMail(email)}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`
    w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0
    ${email.unSeenCount
                      ? "bg-gradient-to-r from-blue-500 to-purple-500"
                      : "bg-gray-400"
                    }
  `}
                >
                  <img
                    src={email.CreatedUser.profileLink}
                    alt="avatar"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4
                      className={`truncate ${darkMode ? "text-white" : "text-gray-900"
                        }`}
                    >
                      {email.CreatedUser?.name}
                    </h4>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {email.starred && (
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      )}
                      <span
                        className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                      >
                        {new Date(email.LastMessageAt).getDate()}/
                        {new Date(email.LastMessageAt).getMonth() + 1}/
                        {new Date(email.LastMessageAt).getFullYear()}
                      </span>
                    </div>
                  </div>

                  <h5
                    className={`text-sm mb-1 truncate ${darkMode ? "text-gray-200" : "text-gray-800"
                      }`}
                  >
                    {email.Subject}
                  </h5>

                  <div
                    className={`text-sm mb-1 truncate ${darkMode ? "text-gray-200" : "text-gray-800"
                      }`}
                    dangerouslySetInnerHTML={{ __html: email.lastMessage }}
                  />



                  {/* <p className={`text-xs leading-relaxed line-clamp-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                        {email.preview}
                                    </p> */}

                  {/* {email.unSeenCount && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  )} */}
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
