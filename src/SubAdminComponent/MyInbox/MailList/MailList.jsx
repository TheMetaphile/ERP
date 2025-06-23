import React, { useContext, useEffect, useRef, useState } from "react";
import { Search, Star, UserX } from "react-feather";
import { getMailsBySection, getSectionTitle } from "../MailData";
import { useParams } from "react-router-dom";
import AuthContext from "../../../Context/AuthContext";
import axios from "axios";
import { BASE_URL, WEB_SOCKET_BASE_URL } from "../../../Config";
import { Archive, Trash2, Heart } from "lucide-react";

function MailList({
  emails,
  setEmails,
  setSelectedMail,
  selectedMail,
  isOpen,
  onClose,
  darkMode,
  currentSection,
  folderName
}) {
  const { authState } = useContext(AuthContext);
  // const emails = getMailsBySection(currentSection);
  const { id: folderId } = useParams();
  const socketRef = useRef(null);
  const [socketChange, setSocketChange] = useState([]);
  const [page, setPage] = useState(1);
  const listRef = useRef(null);
  const [hasMore, setHasMore] = useState(true);

  const getStatuses = (status) => {
    if (!status) return [];

    const statuses = [];

    if (status.IsStarred)
      statuses.push({ label: "Starred", icon: Star, colorClass: "text-yellow-500" });
    if (status.IsArchived)
      statuses.push({ label: "Archived", icon: Archive, colorClass: "text-blue-600" });
    if (status.IsDeleted)
      statuses.push({ label: "Deleted", icon: Trash2, colorClass: "text-red-500" });
    if (status.IsFavourite)
      statuses.push({ label: "Favourite", icon: Heart, colorClass: "text-pink-500" });

    return statuses;
  };


  useEffect(() => {
    const handleScroll = () => {
      if (!listRef.current || !hasMore) return;
      const { scrollTop, scrollHeight, clientHeight } = listRef.current;

      if (scrollHeight - scrollTop - clientHeight < 100) {
        setPage(prev => prev + 1);
        setHasMore(false);

      }
    };

    const el = listRef.current;
    el?.addEventListener("scroll", handleScroll);

    return () => el?.removeEventListener("scroll", handleScroll);
  }, [hasMore]);

  useEffect(() => {
    setPage(1);
    setHasMore(true);
  }, [folderId]);

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
                setHasMore(true);
                console.log("here", response.conversations);
                setEmails(response.conversations);
                break;

              case "more":
                if (Array.isArray(response.conversations)) {
                  if (response.conversations.length === 0) {
                    setHasMore(false);
                  } else {
                    setHasMore(true);
                    if (page === 1) {
                      setEmails(response.conversations);
                    } else {
                      setEmails(prev => [...prev, ...response.conversations]);
                    }
                  }
                }
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
    console.log("executed", folderId);
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      console.log("executed too");

      var IsStarred = false;
      var IsFavourite = false;
      var IsArchived = false;
      var IsInbox = false;
      var IsOutbox = false;
      var IsDeleted = false;
      var id = '';
      switch (folderId) {
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
          id = folderId;
          break;
      }
      socketRef.current.send(
        JSON.stringify({
          action: "loadPage",
          page: page,
          folderID: id, // Or pass as IsInbox/IsStarred/etc
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
  }, [folderId, socketChange, page]);

  console.log(authState.userDetails._id)
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
            placeholder={`Search ${folderName.toUpperCase()}...`}
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

      <div ref={listRef} className="flex-1 overflow-y-auto px-2 py-4 space-y-3">
        {emails.length === 0 ? (
          <div className={`text-center ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            <p>No emails in {folderName}</p>
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
                setSelectedMail(email, folderId);
                setEmails(prevEmails =>
                  prevEmails.map(e =>
                    e._id === email._id ? { ...e, unSeenCount: 0 } : e
                  )
                );
              }}
            >
              <div className="flex items-start gap-4">
                <div className="relative w-12 h-12 flex-shrink-0">
                  {email?.CreatedUser._id === authState?.userDetails?._id ? (
                    Array.isArray(email?.TO) && email.TO.length > 0 ? (
                      <div className="relative w-full h-full">
                        {email.TO.length === 1 && (
                          <img
                            src={email.TO[0].profileLink}
                            alt={email.TO[0].name}
                            className="w-full h-full object-cover rounded-full border-2 border-white shadow-md"
                            title={`${email.TO[0].name} (${email.TO[0].email}) [${email.TO[0].Role}]`}
                          />
                        )}

                        {email.TO.length === 2 && (
                          <>
                            <img
                              src={email.TO[0].profileLink}
                              alt={email.TO[0].name}
                              className="absolute top-0 left-0 w-8 h-8 object-cover rounded-full border-2 border-white shadow-md"
                              title={`${email.TO[0].name} (${email.TO[0].email}) [${email.TO[0].Role}]`}
                            />
                            <img
                              src={email.TO[1].profileLink}
                              alt={email.TO[1].name}
                              className="absolute bottom-0 right-0 w-8 h-8 object-cover rounded-full border-2 border-white shadow-md"
                              title={`${email.TO[1].name} (${email.TO[1].email}) [${email.TO[1].Role}]`}
                            />
                          </>
                        )}

                        {email.TO.length >= 3 && (
                          <div className="relative w-12 h-12">
                            {email.TO.slice(0, 3).map((recipient, index) => {
                              const positions = [
                                "top-0 left-1/2 -translate-x-1/2",
                                "bottom-1 left-0",
                                "bottom-1 right-0",
                              ];
                              const size = "w-7 h-7";
                              const commonStyles = `absolute ${size} object-cover rounded-full border-2 border-white shadow-md`;

                              return (
                                <img
                                  key={recipient._id}
                                  src={recipient.profileLink}
                                  alt={recipient.name}
                                  className={`${commonStyles} ${positions[index]}`}
                                  title={`${recipient.name} (${recipient.email}) [${recipient.Role}]`}
                                />
                              );
                            })}
                          </div>

                        )}
                      </div>
                    ) : null
                  ) : (
                    <img
                      src={email.CreatedUser.profileLink}
                      alt={email.CreatedUser.name}
                      className="w-full h-full object-cover rounded-full border-2 border-white shadow-md"
                      title={`${email.CreatedUser.name}`}
                    />
                  )}

                  {email.unSeenCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-md">
                      {email.unSeenCount}
                    </span>
                  )}
                </div>


                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    {email?.CreatedUser._id === authState?.userDetails?._id ? (
                      <h4 className={`truncate text-md font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>
                        {Array.isArray(email?.TO) && email.TO.length > 0 ? (
                          <>
                            {email.TO.slice(0, 2).map((recipient, index) => (
                              <span key={recipient._id}>
                                {recipient.name}
                                {index === 0 && email.TO.length > 1 ? ', ' : ''}
                              </span>
                            ))}
                            {email.TO.length > 2 && (
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                +{email.TO.length - 2} more
                              </span>
                            )}
                          </>
                        ) : (<></>
                        )}
                      </h4>
                    ) : (
                      <h4 className={`truncate text-md font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>
                        {email.CreatedUser?.name}
                      </h4>
                    )}


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

                  <div className="flex justify-between items-center">
                    <h5 className={`text-sm truncate font-semibold ${darkMode ? "text-gray-300" : "text-gray-800"}`}>
                      {email.Subject}
                    </h5>

                    {getStatuses(email.status).length > 0 && (
                      <div className="flex gap-1">
                        {getStatuses(email.status).map((statusInfo, index) => {
                          const Icon = statusInfo.icon;
                          return (
                            <span
                              key={index}
                              className={`flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full transition-colors duration-200
            ${darkMode ? "bg-gray-700" : "bg-gray-100"}
            ${statusInfo.colorClass} hover:opacity-90`}
                            >
                              <Icon size={12} className={`stroke-current fill-current ${statusInfo.colorClass}`} />
                            </span>
                          );
                        })}
                      </div>
                    )}
                  </div>



                  <div
                    className={`text-sm overflow-hidden whitespace-nowrap text-ellipsis ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                    dangerouslySetInnerHTML={{ __html: email.lastMessage }}
                  />

                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div >

  );
}

export default MailList;
