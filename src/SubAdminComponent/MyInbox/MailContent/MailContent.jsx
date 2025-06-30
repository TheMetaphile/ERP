import React, { useContext, useEffect, useRef, useState } from "react";
import { Mail, Star, Trash2 } from "react-feather";
import { Archive, Heart, Folder } from "lucide-react";
import { LuArrowDownUp } from "react-icons/lu";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthContext from "../../../Context/AuthContext";
import { BASE_URL, WEB_SOCKET_BASE_URL } from "../../../Config";
import axios from "axios";
import ForwardDialog from "./ForwardDialog";
import ReplyDialog from "./ReplyDialog";
import { useParams } from "react-router-dom";
import { AiOutlineUnlock, AiOutlineLock } from "react-icons/ai";
import { refreshAccessToken } from "../../../RefreshTokenHelper";

function MailContent({ mail, darkMode, onUpdateMail, onStatusUpdateMail }) {
  const { authState, updateAccessToken, logout } = useContext(AuthContext);
  const [showCreateFolderModal, setShowCreateFolderModal] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [tags, setTags] = useState([]);
  const [mailContent, setMailContent] = useState([]);
  const [mailTo, setMailTo] = useState([]);
  const [mailCc, setMailCc] = useState([]);
  const [showForwardDialog, setShowForwardDialog] = useState(false);
  const [showReplyDialog, setShowReplyDialog] = useState(false);
  const { section, id, conversationID } = useParams();
  const socketRef = useRef(null);
  const bottomRef = useRef(null);
  const [data, setData] = useState([]);

  const [folders, setFolders] = useState([]);
  // console.log(mail);
  const handleCreateNewFolder = () => {
    setShowCreateFolderModal(true);
  };

  useEffect(() => {
    console.log('here*****************')
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [data]);

  useEffect(() => {
    const fetchCustomFolders = async () => {
      try {
        const response = await axios.post(
          `${BASE_URL}/myInbox/fetch/getFolder`,
          { UserID: authState?.userDetails?._id || "" },
          {
            headers: {
              Authorization: `Bearer ${authState?.accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        const customFolders = response.data.Folders.map((folder, index) => ({
          name: folder.Name,
          _id: folder._id,
          unSeenCount: folder.unSeenCount,
        }));

        setFolders((prev) => [...prev, ...customFolders]);
      } catch (error) {
        console.error(
          "Error fetching folders:",
          error?.response?.data?.message || error.message
        );
        if (
          error.response &&
          error.response.data.error === 'You are not permitted to access this data. Please contact the admin'
        ) {
          toast.warn('Access denied. Attempting to refresh token...');
          try {
            const newToken = await refreshAccessToken(authState, updateAccessToken, logout, toast);
            await fetchCustomFolders();
          } catch (refreshError) {
          }
        } else {
          toast.error(error.response?.data?.error || "An error occurred");
        }
      }
    };

    if (authState?.userDetails?._id) {
      fetchCustomFolders();
    }
  }, [authState?.userDetails?._id]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await axios.post(
          `${BASE_URL}/myInbox/fetch/getTag`,
          {
            UserID: authState?.userDetails?._id,
          },
          {
            headers: {
              Authorization: `Bearer ${authState?.accessToken}`,
            },
          }
        );

        setTags(res.data.Tags || []);
      } catch (err) {
        console.error("Failed to load tags:", err);
        if (
          err.response &&
          err.response.data.error === 'You are not permitted to access this data. Please contact the admin'
        ) {
          toast.warn('Access denied. Attempting to refresh token...');
          try {
            const newToken = await refreshAccessToken(authState, updateAccessToken, logout, toast);
            await fetchTags();
          } catch (refreshError) {
          }
        } else {
          toast.error(err.response?.data?.error || "An error occurred");
        }
      }
    };

    fetchTags();
  }, [authState?.userDetails?._id]);

  const handleSaveFolder = async () => {
    if (!newFolderName.trim()) return;

    try {
      const payload = {
        FolderName: newFolderName.trim(),
        UserID: authState?.userDetails?._id || "",
      };

      const response = await axios.post(
        `${BASE_URL}/myInbox/createFolder`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${authState?.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const newFolder = {
          id: response.data.result?.FolderID || Date.now(),
          name: newFolderName.trim(),
        };
        setFolders((prev) => [...prev, newFolder]);
        setNewFolderName("");
        setShowCreateFolderModal(false);
        toast.success("Folder created successfully");
      } else {
        toast.error(response.data?.error || "Failed to create folder");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.error ||
        "An error occurred while creating the folder"
      );
      if (
        error.response &&
        error.response.data.error === 'You are not permitted to access this data. Please contact the admin'
      ) {
        toast.warn('Access denied. Attempting to refresh token...');
        try {
          const newToken = await refreshAccessToken(authState, updateAccessToken, logout, toast);
          await handleSaveFolder();
        } catch (refreshError) {
        }
      } else {
        toast.error(error.response?.data?.error || "An error occurred");
      }
    }
  };

  const handleMarkAs = async (conversationID, actionFlags) => {
    try {
      const payload = {
        ConversationID: conversationID,
        UserID: authState?.userDetails?._id,
        ...actionFlags,
      };

      const response = await axios.put(
        `${BASE_URL}/myInbox/update/markAs`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${authState?.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      const updatedFlags = {};
      for (const key in actionFlags) {
        updatedFlags[`Is${key}`] = actionFlags[key];
      }

      onStatusUpdateMail(conversationID, updatedFlags);
      setData((prev) => ({
        ...prev, status: { ...prev.status, ...updatedFlags }
      })
      );
      // console.log("Status updated:", response.data);
    } catch (error) {
      console.error("Failed to update status:", error);
      if (
        error.response &&
        error.response.data.error === 'You are not permitted to access this data. Please contact the admin'
      ) {
        toast.warn('Access denied. Attempting to refresh token...');
        try {
          const newToken = await refreshAccessToken(authState, updateAccessToken, logout, toast);
          await handleMarkAs(conversationID, actionFlags);
        } catch (refreshError) {
        }
      } else {
        toast.error(error.response?.data?.error || "An error occurred");
      }
    }
  };

  const handleApplyTag = async (tagId, mailId) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/myInbox/applyTag`,
        {
          TagID: tagId,
          ConversationID: mailId,
          UserID: authState?.userDetails?._id,
        },
        {
          headers: {
            Authorization: `Bearer ${authState?.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Tag applied successfully");
        onUpdateMail(mailId, {
          status: {
            ...data.status,
            TagData: [
              // ...(data.status?.TagData || []),
              tags.find((tag) => tag._id === tagId),
            ],
          },
        });
        setData((prev) => ({
          ...prev, status: {
            ...data.status,
            TagData: [
              // ...(data.status?.TagData || []),
              tags.find((tag) => tag._id === tagId),
            ],
          }
        })
        );
      } else {
        toast.error(response.data?.error || "Failed to apply tag");
      }
    } catch (error) {
      console.error("Error applying tag:", error);
      toast.error(
        error.response?.data?.error ||
        "An error occurred while applying the tag"
      );
      if (
        error.response &&
        error.response.data.error === 'You are not permitted to access this data. Please contact the admin'
      ) {
        toast.warn('Access denied. Attempting to refresh token...');
        try {
          const newToken = await refreshAccessToken(authState, updateAccessToken, logout, toast);
          await handleApplyTag(tagId, mailId);
        } catch (refreshError) {
        }
      } else {
        toast.error(error.response?.data?.error || "An error occurred");
      }
    }
  };

  const handleRemoveTag = async (tagId, mailId) => {
    try {
      const payload = {
        ConversationID: mailId,
        TagID: tagId,
        UserID: authState?.userDetails?._id,
      };

      await axios.put(`${BASE_URL}/myInbox/update/removeTag`, payload, {
        headers: {
          Authorization: `Bearer ${authState?.accessToken}`,
          "Content-Type": "application/json",
        },
      });

      toast.success("Tag removed");

      onUpdateMail(mailId, {
        status: {
          ...data.status,
          TagData: [],
        },
      });
      setData((prev) => ({
        ...prev, status: {
          ...data.status,
          TagData: [],
        }
      })
      );
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove tag");
      if (
        error.response &&
        error.response.data.error === 'You are not permitted to access this data. Please contact the admin'
      ) {
        toast.warn('Access denied. Attempting to refresh token...');
        try {
          const newToken = await refreshAccessToken(authState, updateAccessToken, logout, toast);
          await handleRemoveTag(tagId, mailId);
        } catch (refreshError) {
        }
      } else {
        toast.error(error.response?.data?.error || "An error occurred");
      }
    }
  };

  const handleMoveToFolder = async (folderId, mailId) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/myInbox/moveToFolder`,
        {
          FolderID: folderId,
          ConversationID: mailId,
          UserID: authState?.userDetails?._id,
        },
        {
          headers: {
            Authorization: `Bearer ${authState?.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Mail moved to folder successfully");
      } else {
        toast.error(response.data?.error || "Failed to move mail to folder");
      }
    } catch (error) {
      console.error("Error moving mail to folder:", error);
      toast.error(
        error.response?.data?.error || "An error occurred while moving the mail"
      );
      if (
        error.response &&
        error.response.data.error === 'You are not permitted to access this data. Please contact the admin'
      ) {
        toast.warn('Access denied. Attempting to refresh token...');
        try {
          const newToken = await refreshAccessToken(authState, updateAccessToken, logout, toast);
          await handleMoveToFolder(folderId, mailId);
        } catch (refreshError) {
        }
      } else {
        toast.error(error.response?.data?.error || "An error occurred");
      }
    }
  };

  const handleRemoveFromFolder = async (mailId) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/myInbox/update/removeFromFolder`,
        {
          ConversationID: mailId,
          UserID: authState?.userDetails?._id,
        },
        {
          headers: {
            Authorization: `Bearer ${authState?.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Mail removed from folder successfully");
      } else {
        toast.error(
          response.data?.error || "Failed to remove mail from folder"
        );
      }
    } catch (error) {
      console.error("Error removing mail from folder:", error);
      toast.error(
        error.response?.data?.error ||
        "An error occurred while removing the mail"
      );
      if (
        error.response &&
        error.response.data.error === 'You are not permitted to access this data. Please contact the admin'
      ) {
        toast.warn('Access denied. Attempting to refresh token...');
        try {
          const newToken = await refreshAccessToken(authState, updateAccessToken, logout, toast);
          await handleRemoveFromFolder(mailId);
        } catch (refreshError) {
        }
      } else {
        toast.error(error.response?.data?.error || "An error occurred");
      }
    }
  };

  const handleOpenConversation = async (mailId) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/myInbox/update/openConversation`,
        {
          ConversationID: mailId,
          UserID: authState?.userDetails?._id,
        },
        {
          headers: {
            Authorization: `Bearer ${authState?.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Conversation opened successfully");
        onUpdateMail(mailId, { IsClosed: false });
        setData((prev) => ({
          ...prev, IsClosed: false
        }));
      } else {
        toast.error(response.data?.error || "Failed to open conversation");
      }
    } catch (error) {
      console.error("Error while opening conversation:", error);
      toast.error(
        error.response?.data?.error ||
        "An error occurred while opening conversation"
      );
      if (
        error.response &&
        error.response.data.error === 'You are not permitted to access this data. Please contact the admin'
      ) {
        toast.warn('Access denied. Attempting to refresh token...');
        try {
          const newToken = await refreshAccessToken(authState, updateAccessToken, logout, toast);
          await handleOpenConversation(mailId);
        } catch (refreshError) {
        }
      } else {
        toast.error(error.response?.data?.error || "An error occurred");
      }
    }
  };

  const handleCloseConversation = async (mailId) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/myInbox/update/closeConversation`,
        {
          ConversationID: mailId,
          UserID: authState?.userDetails?._id,
        },
        {
          headers: {
            Authorization: `Bearer ${authState?.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Conversation Closed successfully");
        onUpdateMail(mailId, { IsClosed: true });
        setData((prev) => ({
          ...prev, IsClosed: true
        }));
      } else {
        toast.error(response.data?.error || "Failed to close conversation");
      }
    } catch (error) {
      console.error("Error closing conversation:", error);
      toast.error(
        error.response?.data?.error ||
        "An error occurred while closing conversation"
      );
      if (
        error.response &&
        error.response.data.error === 'You are not permitted to access this data. Please contact the admin'
      ) {
        toast.warn('Access denied. Attempting to refresh token...');
        try {
          const newToken = await refreshAccessToken(authState, updateAccessToken, logout, toast);
          await handleCloseConversation(mailId);
        } catch (refreshError) {
        }
      } else {
        toast.error(error.response?.data?.error || "An error occurred");
      }
    }
  };

  useEffect(() => {
    if (!mailContent || !Array.isArray(mailContent) || mailContent.length == 0)
      return;
    const markSeen = async (msgId) => {
      try {
        const payload = {
          MessageID: msgId,
          UserID: authState?.userDetails?._id,
          seen: true,
          ConversationID: conversationID,
        };
        setMailContent((prev) =>
          prev.map((msg) => {
            if (msg._id != msgId) return msg;
            // console.log("msg from mark seen", msg);
            return { ...msg, isRead: true };
          })
        );

        const response = await axios.put(
          `${BASE_URL}/myInbox/update/markSeen`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${authState?.accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
      } catch (err) {
        console.error(err);
        toast.error(err);
        if (
          err.response &&
          err.response.data.error === 'You are not permitted to access this data. Please contact the admin'
        ) {
          toast.warn('Access denied. Attempting to refresh token...');
          try {
            const newToken = await refreshAccessToken(authState, updateAccessToken, logout, toast);
            await markSeen(msgId);
          } catch (refreshError) {
          }
        } else {
          toast.error(err.response?.data?.error || "An error occurred");
        }
      }
    };

    for (const msg of mailContent) {
      if (!msg?.isRead) {
        // console.log("Msg from id", msg);
        markSeen(msg._id);
      }
    }
  }, [authState?.userDetails?._id, mailContent]);

  useEffect(() => {
    if (!conversationID) return;
    const fetchMail = async () => {
      try {
        const socket = new WebSocket(
          `${WEB_SOCKET_BASE_URL}/getThreadedMessages/${conversationID}?token=${authState?.accessToken}`
        );
        socketRef.current = socket;
        socket.onopen = () => {
          // console.log("WebSocket connected");
        };

        socket.onmessage = (event) => {
          try {
            const response = JSON.parse(event.data);
            // console.log(response);

            switch (response.type) {
              case "initial":
                // console.log("here", response.messages);
                setData(response);
                setMailTo(response.To);
                setMailCc(response.Cc);
                setMailContent(response.messages);
                break;

              case "new":
                var sender = "";
                sender = mailTo.find(
                  (user) => user._id == response.newMessage.Sender
                );
                // console.log("Check sender 1", sender);

                if (!sender || typeof sender == "string") {
                  sender = mailCc.find(
                    (user) => user._id == response.newMessage.Sender
                  );
                  // console.log("Check sender 2", sender);
                }
                if (!sender || data.CreatedUser._id == response.newMessage.Sender) {
                  sender = data.CreatedUser;
                  // console.log("Check sender 3", sender);
                }
                response.newMessage.Sender = sender;
                // console.log("Check sender", response.newMessage.Sender);
                setMailContent((prevEmails) => [
                  ...prevEmails,
                  response.newMessage,
                ]);
                break;

              case "update":
                setMailContent((prevEmails) =>
                  prevEmails.map((email) => {
                    if (email._id !== response.messageId) return email;
                    // console.log(" check this", email);
                    const seenByArray = Array.isArray(response.SeenBy)
                      ? response.SeenBy
                      : [response.SeenBy];

                    return {
                      ...email,
                      SeenBy: [...(email.SeenBy || []), ...seenByArray],
                    };
                  })
                );

                break;
              default:
              // console.log("Default");
            }
          } catch (err) {
            console.error("Error parsing WebSocket message:", err);
          }
        };

        socket.onerror = (error) => {
          console.error("WebSocket error:", error);
        };

        socket.onclose = () => {
          // console.log("WebSocket disconnected");
        };

        return () => {
          socket.close();
        };
      } catch (error) {
        console.error("Error fetching emails:", error);
        if (
          error.response &&
          error.response.data.error === 'You are not permitted to access this data. Please contact the admin'
        ) {
          toast.warn('Access denied. Attempting to refresh token...');
          try {
            const newToken = await refreshAccessToken(authState, updateAccessToken, logout, toast);
            await fetchMail();
          } catch (refreshError) {
          }
        } else {
          toast.error(error.response?.data?.error || "An error occurred");
        }
      }
    };

    fetchMail();
  }, [authState?.userDetails?._id, conversationID]);

  // const addNewMessage = (newMessage) => {
  //     setMailContent((prevContent) => [...prevContent, newMessage]);
  // };

  useEffect(() => {
    setShowReplyDialog(false);
  }, [conversationID]);

  if (!conversationID) {
    return (
      <div
        className={`h-full w-full flex items-center justify-center ${darkMode ? "bg-gray-900" : "bg-white"
          }`}
      >
        <div
          className={`text-center ${darkMode ? "text-gray-400" : "text-gray-500"
            }`}
        >
          <Mail className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <h3 className="text-xl font-semibold mb-2">No email selected</h3>
          <p>Choose an email from the list to view its contents</p>
        </div>
      </div>
    );
  }

  // console.log(section, "here", id, authState);
  return (
    <div className={``}>
      <div
        className={`flex flex-wrap lg:flex-nowrap items-center justify-between px-4 sm:px-6 py-3 border-b ${darkMode ? "border-gray-700 bg-gray-900" : "border-gray-100 bg-white"
          } sticky top-0 z-10`}
      >
        <div className="flex flex-wrap gap-4 text-sm">
          <button
            onClick={() =>
              handleMarkAs(conversationID, { Archived: !data.status?.IsArchived })
            }
            className={`flex items-center gap-1 transition ${data.status?.IsArchived
              ? "text-blue-600"
              : darkMode
                ? "text-gray-300 hover:text-blue-400"
                : "text-gray-600 hover:text-blue-600"
              }`}
          >
            <Archive
              size={16}
              fill={data.status?.IsArchived ? "currentColor" : "none"}
              stroke="currentColor"
            />
            <span className="hidden sm:inline">Archive</span>
          </button>


          <button
            onClick={() =>
              handleMarkAs(conversationID, { Deleted: !data.status?.IsDeleted })
            }
            className={`flex items-center gap-1 transition ${data.status?.IsDeleted ? "text-red-500" : darkMode
              ? "text-gray-300 hover:text-red-500"
              : "text-gray-600 hover:text-red-500"
              }`}
          >
            <Trash2
              size={16}
              fill={data.status?.IsDeleted ? "currentColor" : "none"}
              stroke="currentColor"
            />
            <span className="hidden sm:inline">Delete</span>
          </button>

          <button
            onClick={() =>
              handleMarkAs(conversationID, { Starred: !data.status?.IsStarred })
            }
            className={`flex items-center gap-1 transition ${data.status?.IsStarred ? "text-yellow-500" : darkMode
              ? "text-gray-300 hover:text-yellow-500"
              : "text-gray-600 hover:text-yellow-500"
              }`}
          >
            <Star
              size={16}
              fill={data.status?.IsStarred ? "currentColor" : "none"}
              stroke="currentColor"
            />
            <span className="hidden sm:inline">Star</span>
          </button>

          <button
            onClick={() =>
              handleMarkAs(conversationID, {
                Favourite: !data.status?.IsFavourite,
              })
            }
            className={`flex items-center gap-1 transition ${data.status?.IsFavourite ? "text-red-600" : darkMode
              ? "text-gray-300 hover:text-red-500"
              : "text-gray-600 hover:text-red-500"
              }`}
          >
            <Heart
              size={16}
              fill={data.status?.IsFavourite ? "currentColor" : "none"}
              stroke="currentColor"
            />
            <span className="hidden sm:inline">Favorite</span>
          </button>

          {tags.length > 0 && (
            <div className="relative group">
              <div
                className={`flex items-center gap-1 cursor-pointer transition ${darkMode ? "text-gray-300 hover:text-green-400" : "text-gray-700 hover:text-green-600"
                  }`}
              >
                <Folder size={16} className="text-inherit" />
                <span className="hidden sm:inline">Apply Tag ▾</span>
              </div>

              <div
                className={`absolute left-0 mt-1 p-3 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-20 ${darkMode
                  ? "bg-gray-900 border border-gray-700"
                  : "bg-white border border-gray-200"
                  }`}
              >
                <ul
                  className={`py-2 text-sm max-h-60 overflow-y-auto ${darkMode ? "text-gray-200" : "text-gray-700"
                    }`}
                >
                  {tags.map((tag, index) => {
                    const isApplied =
                      Array.isArray(data?.status?.TagData) &&
                      data.status.TagData.some((t) => t.TagName === tag.TagName);

                    return (
                      <li
                        key={`tag-${index}`}
                        className={`flex items-center gap-2 px-4 py-2 cursor-pointer transition-colors rounded-md ${isApplied
                          ? darkMode
                            ? "bg-green-600/30 text-green-200 font-semibold"
                            : "bg-green-100 text-green-800 font-semibold"
                          : darkMode
                            ? "hover:bg-gray-800"
                            : "hover:bg-gray-200"
                          }`}
                        onClick={() =>
                          isApplied
                            ? handleRemoveTag(tag._id, conversationID)
                            : handleApplyTag(tag._id, conversationID)
                        }
                      >
                        <span
                          className="w-3 h-3 rounded-full shrink-0"
                          style={{ backgroundColor: tag.TagColor }}
                        ></span>
                        <span className="truncate">{tag.TagName}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>

            </div>
          )}


          {(authState.userDetails.rolee === "Admin-Dashboard" ||
            authState.userDetails.rolee === "Sub-Admin") && (
              <div className="relative group">
                <div
                  className={`flex items-center gap-1 text-sm cursor-pointer transition ${data?.IsClosed
                    ? "text-red-600 hover:underline"
                    : "text-green-600 hover:underline"
                    }`}
                  onClick={() =>
                    data?.IsClosed
                      ? handleOpenConversation(conversationID)
                      : handleCloseConversation(conversationID)
                  }
                >
                  {data?.IsClosed ? (
                    <>
                      <AiOutlineLock size={16} />
                      <span className="hidden sm:inline">Close Conversation</span>
                    </>
                  ) : (
                    <>
                      <AiOutlineUnlock size={16} />
                      <span className="hidden sm:inline">Open Conversation</span>
                    </>
                  )}
                </div>
              </div>
            )}
        </div>

        <div className="">
          {section && id ? (
            <div className="relative group">
              <div
                className={`flex items-center gap-1 text-sm font-medium cursor-pointer transition ${darkMode
                  ? "text-gray-300 hover:text-red-400"
                  : "text-gray-700 hover:text-green-600"
                  }`}
                onClick={() => handleRemoveFromFolder(conversationID)}
              >
                <Folder size={16} className="text-inherit" />
                <span className="hidden sm:inline">Remove from Folder</span>
              </div>
            </div>
          ) : (
            <div className="relative group">
              <div
                className={`flex items-center gap-1 text-sm font-medium cursor-pointer transition ${darkMode
                  ? "text-gray-300 hover:text-green-400"
                  : "text-gray-700 hover:text-green-600"
                  }`}
              >
                <Folder size={16} className="text-inherit" />
                <span className="hidden sm:inline">Move to Folder ▾</span>
              </div>

              <div
                className={`absolute right-0 mt-1 w-48 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-20 ${darkMode
                  ? "bg-gray-900 border border-gray-700"
                  : "bg-white border border-gray-200"
                  }`}
              >
                <ul className={`py-2 text-sm ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
                  {folders.map((folder, index) => (
                    <li
                      key={index}
                      className={`px-4 py-2 cursor-pointer transition-colors ${darkMode
                        ? "hover:bg-gray-800"
                        : "hover:bg-gray-100"
                        }`}
                      onClick={() => handleMoveToFolder(folder._id, conversationID)}
                    >
                      {folder.name}
                    </li>
                  ))}
                  <li
                    className={`px-4 py-2 cursor-pointer transition ${darkMode
                      ? "text-blue-400 hover:underline"
                      : "text-blue-600 hover:underline"
                      }`}
                    onClick={handleCreateNewFolder}
                  >
                    ➕ Create New Folder
                  </li>
                </ul>
              </div>

            </div>
          )}
        </div>
      </div>

      <div
        className={`p-6 border-b ${darkMode ? "border-gray-700" : "border-gray-200"
          }`}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h2
              className={`text-2xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-900"
                }`}
            >
              {data.Subject}
            </h2>

            <div className="flex items-center gap-2 text-sm mb-3">
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <img
                  src={data.CreatedUser?.UserDetails[0]?.profileLink}
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p
                  className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"
                    }`}
                >
                  {data.CreatedUser?.UserDetails[0]?.name}
                </p>
                <p
                  className={`${darkMode ? "text-gray-400" : "text-gray-500"}`}
                >
                  {data.CreatedUser?.UserDetails[0]?.email}
                </p>
              </div>
            </div>

            {mailTo && (
              <div className="flex items-center gap-1 flex-wrap text-sm">
                <span
                  className={`${darkMode ? "text-gray-300" : "text-gray-700"} font-medium`}
                >
                  To:
                </span>

                {mailTo.slice(0, 1).map((recipient, index) => (
                  <span
                    key={index}
                    className={`px-2 py-1 rounded-full text-xs font-medium ${darkMode
                      ? "bg-blue-900 text-blue-200"
                      : "bg-blue-100 text-blue-800"
                      }`}
                  >
                    {recipient.name}
                  </span>
                ))}

                {mailTo.length > 1 && (
                  <div className="relative group inline-block">
                    <span
                      className={`underline cursor-pointer text-xs font-medium ml-1 transition ${darkMode
                        ? "text-blue-400 group-hover:text-blue-300"
                        : "text-blue-600 group-hover:text-blue-800"
                        }`}
                    >
                      +{mailTo.length - 1} more
                    </span>

                    <div
                      className={`absolute z-50 hidden group-hover:block p-4 rounded-lg shadow-lg w-72 max-h-64 overflow-y-auto mt-2 left-0 border ${darkMode
                        ? "bg-gray-800 border-gray-600"
                        : "bg-white border-gray-200"
                        }`}
                    >
                      <h4
                        className={`text-sm font-semibold mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                      >
                        All Recipients
                      </h4>
                      <ul className="space-y-2 text-sm">
                        {mailTo.map((recipient, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <img
                              src={recipient.profileLink}
                              alt={recipient.name}
                              className="w-6 h-6 rounded-full object-cover border"
                            />
                            <div>
                              <div
                                className={`font-medium ${darkMode ? "text-gray-100" : "text-gray-800"
                                  }`}
                              >
                                {recipient.name}
                              </div>
                              <div
                                className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"
                                  }`}
                              >
                                {recipient.email}
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            )}

            {mailCc && (
              <div className="flex items-center gap-1 flex-wrap text-sm mt-2">
                <span
                  className={`${darkMode ? "text-gray-300" : "text-gray-700"} font-medium`}
                >
                  Cc:
                </span>

                {mailCc.slice(0, 1).map((recipient, index) => (
                  <span
                    key={index}
                    className={`px-2 py-1 rounded-full text-xs font-medium ${darkMode
                      ? "bg-blue-900 text-blue-200"
                      : "bg-blue-100 text-blue-800"
                      }`}
                  >
                    {recipient.name}
                  </span>
                ))}

                {mailCc.length > 1 && (
                  <div className="relative group inline-block">
                    <span
                      className={`underline cursor-pointer text-xs font-medium ml-1 transition ${darkMode
                        ? "text-blue-400 group-hover:text-blue-300"
                        : "text-blue-600 group-hover:text-blue-800"
                        }`}
                    >
                      +{mailCc.length - 1} more
                    </span>

                    <div
                      className={`absolute z-50 hidden group-hover:block p-4 rounded-lg shadow-lg w-72 max-h-64 overflow-y-auto mt-2 left-0 border ${darkMode
                        ? "bg-gray-800 border-gray-600"
                        : "bg-white border-gray-200"
                        }`}
                    >
                      <h4
                        className={`text-sm font-semibold mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                      >
                        All Recipients
                      </h4>
                      <ul className="space-y-2 text-sm">
                        {mailCc.map((recipient, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <img
                              src={recipient.profileLink}
                              alt={recipient.name}
                              className="w-6 h-6 rounded-full object-cover border"
                            />
                            <div>
                              <div
                                className={`font-medium ${darkMode ? "text-gray-100" : "text-gray-800"
                                  }`}
                              >
                                {recipient.name}
                              </div>
                              <div
                                className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"
                                  }`}
                              >
                                {recipient.email}
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            )}

          </div>

          {/* <span
            className={`text-sm ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            {new Date(mail.LastMessageAt).toLocaleString()}
          </span> */}
        </div>
      </div>

      <div
        className={`flex-1 p-6 overflow-y-auto bg-gradient-to-br ${darkMode
          ? "from-gray-900 via-gray-900 to-gray-800"
          : "from-gray-50 via-white to-gray-100"
          }`}
      >
        <div className={`space-y-6 ${darkMode ? "text-white" : "text-gray-800"}`}>
          {mailContent.map((message, index) => (
            <div
              key={message._id}
              className={`p-6 rounded-2xl shadow-lg border transition-all duration-300 hover:shadow-xl group ${message.Sender._id === authState.userDetails._id
                ? darkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
                : darkMode
                  ? "bg-gray-700 border-gray-600"
                  : "bg-gray-200 border-gray-100"
                }`}
            >
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <div className="flex items-center gap-3">
                  <img
                    src={message.Sender?.profileLink}
                    alt={message.Sender?.name}
                    className="w-12 h-12 rounded-full border-2 border-blue-500 object-cover shadow-sm"
                  />
                  <div>
                    <h4 className="font-semibold text-lg">
                      {message.Sender?.name}{" "}
                      <span className="text-sm text-gray-400">
                        ({message.Sender?.Role})
                      </span>
                    </h4>
                    <p
                      className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                    >
                      {message.Sender?.email}
                    </p>
                  </div>
                </div>
                <div
                  className={`flex justify-center items-center gap-2 text-xs sm:text-sm ${darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                >
                  <span>Sent At: {new Date(message.SentAt).toLocaleString()}</span>
                </div>
              </div>

              <div
                className={`prose max-w-none leading-relaxed text-[15px] ${darkMode ? "prose-invert" : ""
                  }`}
                dangerouslySetInnerHTML={{ __html: message.MessageBody }}
              />

              {message.SeenBy && message.SeenBy.length > 0 && (
                <div className="flex items-center gap-1 flex-wrap text-sm mt-4">
                  <span
                    className={`font-medium ${darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                  >
                    Seen By ({message.SeenBy.length})
                  </span>

                  <ul className="text-sm pl-2 space-y-2">
                    {message.SeenBy.slice(0, 1).map((seen, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <img
                          src={seen.UserID?.profileLink}
                          alt={seen.UserID?.name}
                          className="w-8 h-8 rounded-full object-cover border"
                        />
                        <div className="flex gap-3 items-center flex-wrap">
                          <div
                            className={`font-medium ${darkMode ? "text-white" : "text-gray-800"
                              }`}
                          >
                            {seen.UserID?.name}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>

                  {message.SeenBy.length > 1 && (
                    <div className="relative inline-block">
                      <div className="group/seen relative inline-block">
                        <span
                          className={`underline cursor-pointer text-xs font-medium ml-1 ${darkMode
                            ? "text-blue-400 group-hover/seen:text-blue-300"
                            : "text-blue-600 group-hover/seen:text-blue-800"
                            }`}
                        >
                          +{message.SeenBy.length - 1} more
                        </span>

                        <div
                          className={`absolute z-50 hidden group-hover/seen:block p-4 rounded-lg shadow-lg w-64 max-h-64 overflow-y-auto mt-2 left-0 border ${darkMode
                            ? "bg-gray-800 border-gray-600"
                            : "bg-white border-gray-200"
                            }`}
                        >
                          <h4
                            className={`text-sm font-semibold mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"
                              }`}
                          >
                            Seen By
                          </h4>
                          <ul className="space-y-2 text-sm">
                            {message.SeenBy.map((seen, index) => (
                              <li key={index} className="flex items-center gap-2">
                                <img
                                  src={seen.UserID?.profileLink}
                                  alt={seen.UserID?.name}
                                  className="w-6 h-6 rounded-full object-cover border"
                                />
                                <div>
                                  <div
                                    className={`font-medium ${darkMode
                                      ? "text-gray-100"
                                      : "text-gray-800"
                                      }`}
                                  >
                                    {seen.UserID?.name}
                                  </div>
                                  <div
                                    className={`text-xs ${darkMode
                                      ? "text-gray-400"
                                      : "text-gray-500"
                                      }`}
                                  >
                                    &lt;{seen.UserID?.email}&gt;
                                  </div>
                                  <div
                                    className={`text-xs ${darkMode
                                      ? "text-gray-400"
                                      : "text-gray-500"
                                      }`}
                                  >
                                    {seen.IsRead
                                      ? `Read at ${new Date(
                                        seen.ReadAt
                                      ).toLocaleString()}`
                                      : "Unread"}
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          <div ref={bottomRef} />
        </div>
      </div>


      {showReplyDialog && (
        <div className="px-6 pb-2">
          <ReplyDialog
            onClose={() => setShowReplyDialog(false)}
            ConversationID={conversationID}
          // addNewMessage={addNewMessage}
          />
        </div>
      )}

      <div
        className={`p-6 border-t ${darkMode ? "border-gray-700" : "border-gray-200"
          }`}
      >
        <div className="flex gap-3">
          {!data?.IsClosed && (
            <button
              onClick={() => setShowReplyDialog(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              Reply
            </button>
          )}

          <button
            onClick={() => setShowForwardDialog(true)}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-2 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            Forward
          </button>
        </div>
      </div>

      {showForwardDialog && (
        <ForwardDialog
          onClose={() => setShowForwardDialog(false)}
          ConversationID={conversationID}
        />
      )}

      {showCreateFolderModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          role="dialog"
          aria-modal="true"
        >
          <div
            className={`rounded-xl p-6 shadow-lg w-full max-w-md ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
              }`}
          >
            <h2 className="text-lg font-semibold mb-4">
              Create New Folder
            </h2>

            <input
              type="text"
              placeholder="Enter folder name"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              autoFocus
              className={`w-full px-3 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-opacity-70
          ${darkMode
                  ? "bg-gray-800 text-white border-gray-700 placeholder-gray-400"
                  : "bg-gray-50 text-gray-900 border-gray-300 placeholder-gray-500"
                }`}
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowCreateFolderModal(false)}
                className={`px-4 py-2 rounded-lg transition ${darkMode
                  ? "bg-gray-700 text-white hover:bg-gray-600"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  }`}
              >
                Cancel
              </button>

              <button
                onClick={handleSaveFolder}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default MailContent;
