import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext.jsx";
import toast from "react-hot-toast";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {

    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [unseenMessages, setUnseenMessages] = useState({});

    const authContext = useContext(AuthContext);
    
    // Add safety check and debugging
    if (!authContext) {
        console.error("ChatProvider: AuthContext is not available");
        return <div>Loading...</div>;
    }

    const { socket, axios } = authContext;

    if (!axios) {
        console.error("ChatProvider: axios is not available from AuthContext");
        return <div>Loading...</div>;
    }

    // function to get all users for sidebar
    const getUsers = async () => {
        try {
            const { data } = await axios.get("/api/messages/users");
            if (data.success) {
                setUsers(data.users);
                setUnseenMessages(data.unseenMessages);
            }
        } catch (error) {
            toast.error(error.message)
        }
    };

    // function to get messages for selected user
    const getMessages = async (userId) => {
        try {
            const { data } = await axios.get(`/api/messages/${userId}`);
            if (data.success) {
                setMessages(data.messages);
            } else {
                setMessages([]); // Clear messages on failure
                toast.error("Failed to load messages");
            }
        } catch (error) {
            console.error("Failed to load messages:", error);
            setMessages([]); // Clear messages on error
            toast.error("Failed to load messages");
        }
    };

    //function to send message to selected user
    const sendMessage = async (messageData) => {
        if (!selectedUser || !selectedUser._id) {
            toast.error("No user selected");
            return;
        }

        try {
            // Send the message data directly instead of wrapping it
            const { data } = await axios.post(`/api/messages/send/${selectedUser._id}`, messageData);
            
            if (data.success) {
                setMessages((prevMessages) => [...prevMessages, data.newMessage]);
            } else {
                toast.error(data.message || "Failed to send message");
            }
        } catch (error) {
            console.error("Send message error:", error);
            toast.error(error.response?.data?.message || "Failed to send message");
        }
    };

    //function to subscribe to messages for selected user
    const subscribeToMessages = () => {
        if (!socket) return;

        socket.on("newMessage", (newMessage) => {
            if (selectedUser && newMessage.senderId === selectedUser._id) {
                newMessage.seen = true;
                setMessages((prevMessages) => [...prevMessages, newMessage]);
                axios.put(`/api/messages/mark/${newMessage._id}`);
            } else {
                setUnseenMessages((prevUnseenMessages) => ({
                    ...prevUnseenMessages,
                    [newMessage.senderId]: prevUnseenMessages[newMessage.senderId] ?
                        prevUnseenMessages[newMessage.senderId] + 1 : 1
                }));
            }
        });
    };

    //function to unsubscribe from messages
    const unsubscribeFromMessages = () => {
        if (socket) socket.off("newMessage");
    };

    useEffect(() => {
        subscribeToMessages();

        return () => {
            unsubscribeFromMessages();
        };
    }, [socket, selectedUser]);

    const value = {
        messages,
        users,
        selectedUser,
        getUsers,
        getMessages,
        sendMessage,
        setSelectedUser,
        unseenMessages,
        setUnseenMessages
    };

    return (
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    );
};
