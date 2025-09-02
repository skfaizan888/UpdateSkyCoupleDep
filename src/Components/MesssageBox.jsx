import { useContext, useEffect, useState } from "react";
import { SearchContext } from "./SearchContext";
import axios from "axios";
import { Avatar } from "flowbite-react";
import { useLocation } from "react-router-dom";
import { IoSend, IoArrowBack } from "react-icons/io5";

export const MesssageBox = () => {
  const { state } = useLocation();
  const item = state?.item;
  const initialReceiverId = item?.signid;
  const { currentSignid } = useContext(SearchContext);

  const [conversationData, setConversationData] = useState([]);
  const [conversationProfile, setConversationProfile] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const getInitials = (name = "") => {
    if (!name || typeof name !== "string") return "U";
    const parts = name.trim().split(" ").filter(Boolean);
    if (parts.length === 0) return "U";
    if (parts.length === 1) return parts[0][0]?.toUpperCase() || "U";
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };

  // Save userdata correctly
  useEffect(() => {
    if (conversationProfile?.userdata) {
      localStorage.setItem(
        "userdata",
        JSON.stringify(conversationProfile.userdata)
      );
    }
  }, [conversationProfile]);

  const receivID = JSON.parse(localStorage.getItem("userdata"));

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const receiverId = receivID?.receiverId || initialReceiverId;

    const payload = {
      conversationId: conversationProfile?.conversationId || "new",
      senderId: currentSignid.signid,
      receiverId,
      message,
    };

    try {
      const res = await axios.post(
        "https://skycouple-api.vercel.app/api/sendmessage",
        payload
      );

      if (!conversationProfile) {
        setConversationProfile({
          conversationId: res.data.conversationId,
          userdata: res.data?.userdata || item,
        });
        fetchConversations();
      }

      setMessage("");
      fetchMessages(res.data.conversationId, item, receiverId);
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  const fetchConversations = async () => {
    try {
      const res = await axios.get(
        `https://skycouple-api.vercel.app/api/conversation/${currentSignid.signid}`
      );
      setConversationData(res.data);
    } catch (err) {
      console.error("Error fetching conversations:", err);
    }
  };

  const fetchMessages = async (conversationId, userdata) => {
    const receiverId =
      userdata?.signid || receivID?.receiverId || initialReceiverId;

    try {
      const res = await axios.get(
        `https://skycouple-api.vercel.app/api/message/${conversationId}?senderId=${currentSignid.signid}&receiverId=${receiverId}`
      );

      setMessages(res.data);
      setConversationProfile({ conversationId, userdata });
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  };

  useEffect(() => {
    fetchConversations();
    if (initialReceiverId) {
      fetchMessages("new", {
        fullname: item?.fullname,
        signid: initialReceiverId,
      });
    }
  }, [initialReceiverId]);

  return (
    <div className="flex min-h-[50vh] text-gray-900 -ml-4 -mr-4">
      <aside
        className={`${
          conversationProfile ? "hidden md:flex" : "flex"
        } md:flex flex-col w-full md:w-1/4 border-r border-gray-200 dark:border-slate-800`}
      >
        <div className="p-3">
          <h2 className="font-bold text-lg mb-2">Message Box !</h2>
          <input
            type="text"
            placeholder="Search conversation..."
            className="w-full px-4 py-2 rounded-xl border border-gray-300  bg-white focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
          {conversationData.length > 0 ? (
            conversationData.filter(({ userdata }) =>
              userdata?.fullname
                ?.toLowerCase()
                .includes(searchQuery.toLowerCase())
            ).length > 0 ? (
              conversationData
                .filter(({ userdata }) =>
                  userdata?.fullname
                    ?.toLowerCase()
                    .includes(searchQuery.toLowerCase())
                )
                .map(({ conversationId, userdata }) => (
                  <button
                    key={conversationId}
                    onClick={() => fetchMessages(conversationId, userdata)}
                    className="w-full text-left px-4 py-3 hover:bg-pink-100 flex items-center gap-3"
                  >
                    <Avatar
                      rounded
                      size="sm"
                      placeholderInitials={getInitials(userdata?.fullname)}
                      className="text-white"
                    />
                    <div className="min-w-0">
                      <p className="font-semibold truncate">
                        {userdata?.fullname}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        Tap to chat
                      </p>
                    </div>
                  </button>
                ))
            ) : (
              <div className="text-center text-sm font-light pt-10">
                No matches found
              </div>
            )
          ) : (
            <div className="text-center text-lg font-light pt-28">
              No Conversation
            </div>
          )}
        </div>
      </aside>

      {/* Chat Box */}
      <main
        className={`flex flex-col ${
          conversationProfile ? "flex-1 w-full" : "hidden md:flex"
        }`}
      >
        {conversationProfile && (
          <div className="bg-white p-4 border-b w-auto flex items-center gap-3">
            <button
              onClick={() => setConversationProfile(null)}
              className="md:hidden text-black"
            >
              <IoArrowBack size={20} />
            </button>

            <Avatar
              rounded
              size="sm"
              placeholderInitials={getInitials(
                conversationProfile?.userdata?.fullname
              )}
              className="text-white"
            />
            <p className="font-semibold">
              {conversationProfile?.userdata?.fullname}
            </p>
          </div>
        )}

        <div className="overflow-y-auto p-4 m-0 space-y-3 no-scrollbar h-[52vh] md:h-[45vh]">
          {messages.length > 0 ? (
            messages.map((msg, i) => {
              const isMine = msg.userdata?.signid === currentSignid.signid;
              return (
                <div
                  key={i}
                  className={`flex ${isMine ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-2xl shadow text-sm flex flex-col ${
                      isMine
                        ? "bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-br-none"
                        : "bg-gray-200 text-black  rounded-bl-none"
                    }`}
                  >
                    <p className="break-words">{msg.message}</p>
                    <span
                      className={`text-[10px] mt-1 self-end ${
                        isMine ? "text-white/80" : "text-gray-500"
                      }`}
                    >
                      {msg.time}
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center text-lg font-light pt-20">
              No Message Or No Conversation Selected
            </div>
          )}
        </div>

        {/* Input */}
        {conversationProfile && (
          <div className="p-3 flex items-center gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 rounded-xl bg-gray-100  focus:outline-none"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              onClick={handleSendMessage}
              className="p-3 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white shadow hover:opacity-90"
            >
              <IoSend size={20} />
            </button>
          </div>
        )}
      </main>
    </div>
  );
};
