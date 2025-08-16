import React, { useContext, useEffect, useRef, useState } from 'react'
import assets from '../assets/assets'
import { formatMessageTime } from '../lib/util'
import { ChatContext } from '../../context/ChatContext'
import { AuthContext } from '../../context/AuthContext'
import toast from 'react-hot-toast'

const ChatContainer = () => {

  const chatContext = useContext(ChatContext);
  const authContext = useContext(AuthContext);

  if (!chatContext || !authContext) {
    return <div className='flex items-center justify-center h-full text-white'>Loading contexts...</div>;
  }

  const { messages, selectedUser, setSelectedUser, sendMessage, getMessages } = chatContext;
  const { authUser, onlineUser } = authContext;

  const [input, setInput] = useState("");

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!input.trim()) {
      return;
    }
    
    try {
      await sendMessage({ text: input.trim() });
      setInput("");
    } catch (error) {
      toast.error("Failed to send message");
    }
  };

  const handleSendImage = async (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith('image/')) {
      toast.error("Select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      try {
        await sendMessage({ image: reader.result });
        e.target.value = ''; // Clear the input after sending
      } catch (error) {
        toast.error("Failed to send image");
      }
    }
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (selectedUser && selectedUser._id && getMessages) {
      getMessages(selectedUser._id);
    }
  }, [selectedUser, getMessages]);

  return selectedUser ? (
    <div className='h-full overflow-scroll relative backdrop-blur-lg'>
      {/*--------------------- Header --------------------- */}
      <div className='flex items-center gap-3 py-3 mx-4 border-b border-stone-500'>
        <img src={selectedUser.profilePic || assets.avatar_icon} alt="" className='w-8 rounded-full' />
        <p className='flex-1 text-lg text-white flex items-center gap-2'>
          {selectedUser.fullName}
          {onlineUser && Array.isArray(onlineUser) && onlineUser.includes(selectedUser._id) ? 
            <span className='w-2 h-2 rounded-full bg-green-500'></span> : 
            <span className='w-2 h-2 rounded-full bg-red-500'></span>}
        </p>
        <img onClick={() => setSelectedUser(null)} src={assets.arrow_icon} alt="" className='md:hidden max-w-7' />
        <img src={assets.help_icon} alt="" className='max-md:hidden max-w-5' />
      </div>
      {/*--------------------- Chat area --------------------- */}
      <div className='flex flex-col h-[calc(100%-120px)] overflow-y-auto p-3 pb-6'>
        {messages && messages.length > 0 ? (
          messages.map((msg, index) => {
            return msg ? (
              <div key={msg._id || index} className={`flex items-end gap-2 mb-4 ${msg.senderId !== authUser?._id ? 'justify-start' : 'justify-end'}`}>
                <div className={`flex items-end gap-2 ${msg.senderId !== authUser?._id && 'flex-row-reverse'}`}>
                  {msg.image ? (
                    <img src={msg.image} alt="" className='max-w-[230px] border border-gray-700 rounded-lg overflow-hidden' />
                  ) : (
                    <p className={`p-3 max-w-[200px] text-sm font-light rounded-lg break-words bg-violet-500/30 text-white ${msg.senderId === authUser?._id ? 'rounded-br-none' : 'rounded-bl-none'}`}>
                      {msg.text}
                    </p>
                  )}
                  <div className='text-center text-xs flex flex-col items-center'>
                    <img 
                      src={msg.senderId === authUser?._id ? authUser?.profilePic || assets.avatar_icon : selectedUser?.profilePic || assets.avatar_icon}
                      alt="" 
                      className='w-7 h-7 rounded-full mb-1' 
                    />
                    <p className='text-gray-500 text-xs'>{formatMessageTime(msg.createdAt)}</p>
                  </div>
                </div>
              </div>
            ) : null;
          })
        ) : (
          <div className='flex-1 flex items-center justify-center'>
            <div className='text-center text-gray-400'>
              <p>No messages yet.</p>
              <p className='text-sm mt-1'>Start a conversation!</p>
            </div>
          </div>
        )}
      </div>
      {/*--------------------- bottom area ---------------------  */}
      <div className='absolute bottom-0 left-0 right-0 flex items-center gap-3 p-3'>
        <div className='flex-1 flex items-center bg-gray-100/12 px-3 rounded-full '>
          <input onChange={(e) => setInput(e.target.value)} value={input}
            onKeyDown={(e) => e.key === 'Enter' ? handleSendMessage(e) : null}
            type="text" name="message" id="" placeholder='Send a message...'
            className='flex-1 text-sm p-3 border-none rounded-lg outline-none text-white placeholder-gray-400' />
          <input onChange={handleSendImage} type="file" id="image" accept='image/png, image/jpeg' hidden />
          <label htmlFor="image">
            <img src={assets.gallery_icon} alt="" className='w-5 mr-2 cursor-pointer' />
          </label>
        </div>
        <img onClick={handleSendMessage} src={assets.send_button} alt="" className='w-7 cursor-pointer' />
      </div>
    </div>
  ) : (
    <div className='flex flex-col items-center justify-center gap-2 text-gray-500 bg-white/10 max-md:hidden'>
      <img src={assets.logo_icon} alt="" className='max-w-16' />
      <p className='text-lg font-medium text-white'>Chat anytime, anywhere</p>
    </div>
  )
}

export default ChatContainer