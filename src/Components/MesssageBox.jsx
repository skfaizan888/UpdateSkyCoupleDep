import { useContext, useEffect, useState } from "react";
import { SearchContext } from "./SearchContext";
import axios from "axios";
import { Avatar } from "flowbite-react";
import { useLocation } from "react-router-dom";
import { IoSend, IoArrowBack } from "react-icons/io5";

export const MesssageBox = () => {
  const { state } = useLocation();
  const item = state?.item;
  const receiverId = item?.signid;
  const { currentSignid } = useContext(SearchContext);

  const [conversationdata, setConversationdata] = useState([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [conversationprofile, setConversationprofile] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  console.log(conversationprofile, "---------conversationprofile-");
  // ✅ safe initials generator with fallback
  const getInitials = (name = "") => {
    if (!name || typeof name !== "string") return "U";
    const parts = name.trim().split(" ").filter(Boolean);
    if (parts.length === 0) return "U";
    if (parts.length === 1) return parts[0][0]?.toUpperCase() || "U";
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };

  const handleSendMesssage = async () => {
    if (!message.trim()) return;
    const payload = {
      conversationId: conversationprofile?.conversationId || "new",
      senderId: currentSignid.signid,
      receiverId: messages[0]?.userdata?.signid || receiverId,
      message,
    };

    try {
      const res = await axios.post(
        "https://skycouple-api.vercel.app/api/sendmessage",
        payload
      );

      if (!conversationprofile) {
        setConversationprofile({
          conversationId: res.data.conversationId,
          userdata: res.data?.userdata || item,
        });
        fetchConversation();
      }

      setMessage("");
      fetchMessage(res.data.conversationId, item, receiverId);
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  const fetchConversation = async () => {
    try {
      const res = await axios.get(
        `https://skycouple-api.vercel.app/api/conversation/${currentSignid.signid}`
      );
      setConversationdata(res.data);
    } catch (err) {
      console.error("Error fetching conversations:", err);
    }
  };

  const fetchMessage = async (conversationId, userdata, receiverIdParam) => {
    try {
      const resolvedReceiverId =
        receiverIdParam || userdata?.signid || receiverId;

      const res = await axios.get(
        `https://skycouple-api.vercel.app/api/message/${conversationId}?senderId=${currentSignid.signid}&receiverId=${resolvedReceiverId}`
      );

      setMessages(res.data);
      console.log(userdata, "----profile--userdata-------");
      setConversationprofile({ conversationId, userdata });
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  };

  useEffect(() => {
    fetchConversation();
    if (receiverId) {
      fetchMessage(
        "new",
        { fullname: item?.fullname, signid: receiverId },
        receiverId
      );
    }
  }, [receiverId]);

  return (
    <div className="flex min-h-[70vh] bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white">
      <aside
        className={`${
          conversationprofile ? "hidden md:flex" : "flex"
        } md:flex flex-col w-full md:w-1/4 border-r border-gray-200 dark:border-slate-800`}
      >
        <div className="p-3">
          <input
            type="text"
            placeholder="Search conversation..."
            className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-slate-700 bg-white focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-gray-100 dark:divide-slate-800">
          {conversationdata.length > 0 ? (
            conversationdata.filter(({ userdata }) =>
              userdata?.fullname
                ?.toLowerCase()
                .includes(searchQuery.toLowerCase())
            ).length > 0 ? (
              conversationdata
                .filter(({ userdata }) =>
                  userdata?.fullname
                    ?.toLowerCase()
                    .includes(searchQuery.toLowerCase())
                )
                .map(({ conversationId, userdata }) => (
                  <button
                    key={conversationId}
                    onClick={() =>
                      fetchMessage(conversationId, userdata, userdata?.signid)
                    }
                    className="w-full text-left px-4 py-3 hover:bg-indigo-50 dark:hover:bg-slate-800 flex items-center gap-3"
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

      <main
        className={`flex flex-col ${
          conversationprofile ? "flex-1" : "hidden md:flex"
        }`}
      >
        {conversationprofile && (
          <div className="p-4 border-b flex items-center gap-3">
            <button
              onClick={() => setConversationprofile(null)}
              className="md:hidden p-2 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white"
            >
              <IoArrowBack size={20} />
            </button>

            <Avatar
              rounded
              size="sm"
              placeholderInitials={getInitials(
                conversationprofile.userdata?.fullname
              )}
              className="text-white"
            />
            <p className="font-semibold">
              {conversationprofile?.userdata?.fullname}
            </p>
          </div>
        )}

        <div className="overflow-y-auto p-4 space-y-3 no-scrollbar h-[70vh]">
          {messages.length > 0 ? (
            messages.map((item, i) => {
              const isMine = item.userdata?.signid === currentSignid.signid;
              return (
                <div
                  key={i}
                  className={`flex ${isMine ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-2xl shadow text-sm flex flex-col ${
                      isMine
                        ? "bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-br-none"
                        : "bg-gray-200 dark:bg-slate-700 text-black dark:text-white rounded-bl-none"
                    }`}
                  >
                    <p className="break-words">{item.message}</p>
                    <span
                      className={`text-[10px] mt-1 self-end ${
                        isMine
                          ? "text-white/80"
                          : "text-gray-500 dark:text-gray-300"
                      }`}
                    >
                      {item.time}
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center text-lg font-light pt-28">
              No Message Or No Conversation Selected
            </div>
          )}
        </div>

        {conversationprofile && (
          <div className="p-3 border-t flex items-center gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 rounded-xl bg-gray-100 dark:bg-slate-800 focus:outline-none"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              onClick={handleSendMesssage}
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
