import React, { useState } from 'react';
import { Send, User as UserIcon, Calendar } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useBookings } from '../context/BookingContext';
import { Button } from '../components/common/Button';

export const MessagesPage: React.FC = () => {
  const { user } = useAuth();
  const { bookings } = useBookings();

  const [activeChatId, setActiveChatId] = useState(bookings[0]?.id || 'bk-101');
  const [inputText, setInputText] = useState('');

  const activeBooking = bookings.find((b) => b.id === activeChatId) || bookings[0];

  const [messagesMap, setMessagesMap] = useState<Record<string, Array<{ id: string; sender: string; text: string; time: string }>>>({
    'bk-101': [
      { id: 'm1', sender: 'Rahul Kumar', text: 'Hello Aniket! I have received your doorstep Car Wash booking for tomorrow at 10:30 AM.', time: '10:32 AM' },
      { id: 'm2', sender: 'Aniket Sharma', text: 'Hi Rahul, great! Is there any water connection required at my parking lot?', time: '10:34 AM' },
      { id: 'm3', sender: 'Rahul Kumar', text: 'No worries at all! My vehicle carries a 50L eco-foam tank and high-pressure washer.', time: '10:35 AM' }
    ]
  });

  const currentMessages = messagesMap[activeChatId] || [
    { id: 'm0', sender: activeBooking?.providerName || 'Provider', text: 'Hi! Let me know if you have any questions regarding your booking.', time: '09:00 AM' }
  ];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    const newMsg = {
      id: `m-${Date.now()}`,
      sender: user?.name || 'Aniket Sharma',
      text: inputText.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessagesMap((prev) => ({
      ...prev,
      [activeChatId]: [...(prev[activeChatId] || []), newMsg]
    }));
    setInputText('');
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 h-[calc(100vh-140px)] min-h-[500px] animate-fade-in">
      {/* Left Chat List */}
      <div className="w-full md:w-80 bg-white rounded-card border border-gray-200 shadow-card flex flex-col overflow-hidden shrink-0">
        <div className="p-4 border-b border-gray-200">
          <h2 className="font-bold text-base text-civic-text-primary">Conversations</h2>
        </div>
        <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
          {bookings.map((b) => (
            <button
              key={b.id}
              onClick={() => setActiveChatId(b.id)}
              className={`w-full p-3.5 text-left flex items-start gap-3 transition-colors ${
                activeChatId === b.id ? 'bg-civic-blue-50/70 border-l-4 border-civic-blue' : 'hover:bg-gray-50'
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-civic-blue-100 flex items-center justify-center text-civic-blue font-bold shrink-0">
                <UserIcon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-xs text-civic-text-primary truncate">{b.providerName}</span>
                  <span className="text-[10px] text-civic-text-muted">Active</span>
                </div>
                <span className="text-xs text-civic-text-secondary line-clamp-1 mt-0.5">{b.gigTitle}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Right Main Chat Window */}
      <div className="flex-1 bg-white rounded-card border border-gray-200 shadow-card flex flex-col overflow-hidden">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gray-50/50">
          <div>
            <h3 className="font-bold text-sm text-civic-text-primary">
              {activeBooking?.providerName}
            </h3>
            <span className="text-xs text-civic-text-secondary flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-civic-blue" />
              Booking #{activeBooking?.id} • {activeBooking?.gigTitle}
            </span>
          </div>
        </div>

        {/* Message History */}
        <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3 bg-civic-bg/50">
          {currentMessages.map((msg) => {
            const isMe = msg.sender === (user?.name || 'Aniket Sharma');
            return (
              <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                <div
                  className={`max-w-xs sm:max-w-md p-3 rounded-card text-xs sm:text-sm leading-relaxed ${
                    isMe
                      ? 'bg-civic-blue text-white rounded-br-none shadow-xs'
                      : 'bg-white border border-gray-200 text-civic-text-primary rounded-bl-none shadow-2xs'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[10px] text-civic-text-muted mt-1 px-1">{msg.time}</span>
              </div>
            );
          })}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="p-3 border-t border-gray-200 flex items-center gap-2 bg-white">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your message to provider..."
            className="flex-1 min-h-[44px] px-3.5 text-sm rounded-input border border-gray-300 focus:outline-none focus:border-civic-blue"
          />
          <Button variant="primary" icon={Send} type="submit">
            Send
          </Button>
        </form>
      </div>
    </div>
  );
};
