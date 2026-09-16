import React, { useState, useEffect, useRef } from 'react';
import { PageId } from '../types';

interface ConciergeAIPageProps {
  initialPrompt?: string;
  onNavigate: (page: PageId) => void;
}

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text?: string;
  timestamp: string;
  recommendations?: {
    name: string;
    rating: string;
    location: string;
    price: string;
    tags: string[];
    imageUrl: string;
  }[];
}

export const ConciergeAIPage: React.FC<ConciergeAIPageProps> = ({ initialPrompt, onNavigate }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      text: 'Hello! I am your <strong>lukaAI</strong> concierge. Ask me about restaurants, hotels, or services across West Africa with specific payment methods and budget filters. How can I help you today?',
      timestamp: 'Just now',
    },
    {
      id: '2',
      sender: 'ai',
      text: 'Here are 2 quiet restaurants in <strong>Abidjan (Cocody)</strong> accepting <strong>Wave</strong> with dishes under 10,000 FCFA:',
      timestamp: 'Just now',
      recommendations: [
        {
          name: 'Le Jardin Secret',
          rating: '4.8 ★',
          location: 'Cocody Ambassades • Quiet garden setting',
          price: 'Avg: 7,500 FCFA / dish',
          tags: ['Wave', 'Orange Money'],
          imageUrl:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuCvXfONZ8Qx9gJ6wGo3K4kNYC5UpBrazPYizNhzyyiZNwli1vDFdWHGfCenjw7Rzb8yWrgcRhUMDj9jfuJFanjDoFaxOuoOd6JTFQlLkDTIfsy0u3iuk1kpbx0cuPFu5mgvs541l7Zsok1KEDpvbhJRBFcYXE185VLXjdFUA9CAG_p9cGGAYDa67Y8ihjbZ3BINkcbBh9xpzE6U0VqF26rZ2OSHv4Av76huaC8KHjBnArftleBWfhiJTg',
        },
        {
          name: "Café de l'Indénié",
          rating: '4.6 ★',
          location: 'Plateau • Calm atmosphere, great acoustics',
          price: 'Avg: 6,000 FCFA / dish',
          tags: ['Wave'],
          imageUrl:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuCqPzcTNwpJ0YCF_Inqp-pNAZEjio7gCJD2j9k9Shad8D1oa0OzfLMQewwttTgZhdtf0W15W10gGjdSsr_JAAc7TEqy514ieyf6y7Uso4h4tycwT2kracXli0XdCxh-3B3gvtJtEwi0ISsiGl-mg5MLgVm8OJHoLk0ghRvddUIdziCrtotUtQ4RoIrEjSs_dByJ1uQZZdMoNZEizgvabOm35N1VWqVCbMCE2xi715wgg55aiPGreW-xWw',
        },
      ],
    },
  ]);

  const [inputVal, setInputVal] = useState(initialPrompt || '');
  const [isTyping, setIsTyping] = useState(false);
  const chatStreamRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatStreamRef.current) {
      chatStreamRef.current.scrollTop = chatStreamRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const setQuery = (text: string) => {
    setInputVal(text);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: Date.now().toString(),
        sender: 'ai',
        text: 'Chat reset. How can I assist you with your local discovery today? Ask me about verified places accepting Wave, Orange Money, or cards.',
        timestamp: 'Just now',
      },
    ]);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const query = inputVal.trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: `I searched our verified database for <strong>"${query}"</strong>. Here is the best verified match in the network:`,
        timestamp: 'Just now',
        recommendations: [
          {
            name: "L'Étoile du Sud (Teranga Lounge)",
            rating: '4.9 ★',
            location: 'Central District • Verified mobile payments',
            price: 'Avg: 8,000 FCFA',
            tags: ['Wave', 'Orange Money', 'Cartes'],
            imageUrl:
              'https://lh3.googleusercontent.com/aida-public/AB6AXuBO0Rciq3_Wmsmf9PERBe7cyGoH1XRD_N2Q7YgDArW8Git4z73UmKXdx2KrGTI7j-UM6soRK1toIlzZ7msn_IpGTIU6vVRYRHOO9stHbztNNm8VquKGM39o51GIXGHIUUXNSEIAsnoVegG6OIDIZSweTXd5-kd6iEXv7hHZ-FEdScJlug1mGcoBsNC7vCUwrO8xGqRWY-ZV3KOtncH7WPgdOEQDX8RlT0_i95VllubOR9yH0thV0QnAHg',
          },
        ],
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 900);
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-surface text-on-surface">
      <div className="max-w-7xl mx-auto w-full px-space-lg py-space-xl flex flex-col gap-space-xl">
        {/* Top Intro Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-space-md">
          <div className="flex items-center gap-space-md">
            <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container shadow-sm">
              <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                smart_toy
              </span>
            </div>
            <div>
              <h1 className="font-headline-lg font-bold text-on-surface tracking-tight">Concierge lukaAI</h1>
              <p className="font-body-md text-on-surface-variant">Your hyper-localized, intelligent multi-service assistant</p>
            </div>
          </div>
          <div className="flex items-center gap-space-xs bg-surface-container-low px-space-md py-2 rounded-full shadow-sm border border-surface-container">
            <span className="w-2.5 h-2.5 rounded-full bg-tertiary animate-pulse"></span>
            <span className="font-label-md font-semibold text-on-surface">Abidjan, CI • Connected</span>
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
          {/* Left Column: Quick Prompts & Saved Context */}
          <div className="lg:col-span-4 flex flex-col gap-space-lg">
            <div className="bg-surface-container-low rounded-2xl p-space-lg shadow-sm flex flex-col gap-space-md border border-surface-container">
              <div className="flex items-center justify-between">
                <span className="font-headline-md font-bold text-on-surface">Suggested Queries</span>
                <span className="material-symbols-outlined text-outline text-[20px]">bolt</span>
              </div>
              <p className="font-body-sm text-on-surface-variant">
                Tap any intelligent prompt to instantly test localized concierge discovery:
              </p>
              <div className="flex flex-col gap-space-xs">
                <button
                  type="button"
                  onClick={() =>
                    setQuery('Find a quiet restaurant in Abidjan accepting Wave with a dish under 10,000 FCFA')
                  }
                  className="text-left p-space-md bg-surface hover:bg-surface-container-high transition-all rounded-xl shadow-sm flex items-start gap-space-sm group cursor-pointer border border-surface-container/60"
                >
                  <span className="material-symbols-outlined text-primary text-[18px] mt-0.5 group-hover:scale-110 transition-transform">
                    restaurant
                  </span>
                  <span className="font-body-sm text-on-surface">
                    "Find a quiet restaurant in Abidjan accepting Wave with a dish under 10,000 FCFA"
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setQuery('Which hotel in Dakar accepts Orange Money and has a pool?')}
                  className="text-left p-space-md bg-surface hover:bg-surface-container-high transition-all rounded-xl shadow-sm flex items-start gap-space-sm group cursor-pointer border border-surface-container/60"
                >
                  <span className="material-symbols-outlined text-primary text-[18px] mt-0.5 group-hover:scale-110 transition-transform">
                    hotel
                  </span>
                  <span className="font-body-sm text-on-surface">
                    "Which hotel in Dakar accepts Orange Money and has a pool?"
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setQuery('Top rated coworking spaces in Cotonou with fast Wi-Fi & Moov Money')}
                  className="text-left p-space-md bg-surface hover:bg-surface-container-high transition-all rounded-xl shadow-sm flex items-start gap-space-sm group cursor-pointer border border-surface-container/60"
                >
                  <span className="material-symbols-outlined text-primary text-[18px] mt-0.5 group-hover:scale-110 transition-transform">
                    laptop_mac
                  </span>
                  <span className="font-body-sm text-on-surface">
                    "Top rated coworking spaces in Cotonou with fast Wi-Fi & Moov Money"
                  </span>
                </button>
              </div>
            </div>

            {/* Verified Partners Banner */}
            <div className="bg-primary-container/15 rounded-2xl p-space-lg shadow-sm flex flex-col gap-space-sm border border-primary-container/30">
              <div className="flex items-center gap-space-sm text-primary">
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  verified
                </span>
                <span className="font-headline-sm font-bold">Verified Local Network</span>
              </div>
              <p className="font-body-sm text-on-surface-variant">
                All recommended establishments support direct local mobile money transfers (Wave, Orange Money, Moov)
                and verified physical on-site settlement with zero internet banking transaction fees.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Chat Interface */}
          <div className="lg:col-span-8 flex flex-col bg-surface-container-low rounded-2xl shadow-md overflow-hidden min-h-[620px] border border-surface-container">
            {/* Chat Header */}
            <div className="px-space-lg py-space-md bg-surface border-b border-surface-container-high flex items-center justify-between">
              <div className="flex items-center gap-space-sm">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary shadow-sm">
                  <span className="material-symbols-outlined text-[16px]">smart_toy</span>
                </div>
                <div>
                  <span className="font-headline-sm font-bold text-on-surface">lukaAI Assistant</span>
                  <span className="block font-body-sm text-outline">Active session • Ready</span>
                </div>
              </div>
              <button
                type="button"
                onClick={handleResetChat}
                className="text-outline hover:text-on-surface font-label-md transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">refresh</span>
                <span>Reset</span>
              </button>
            </div>

            {/* Chat Messages Area */}
            <div
              ref={chatStreamRef}
              className="flex-1 p-space-lg flex flex-col gap-space-lg overflow-y-auto max-h-[560px]"
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-space-md max-w-2xl ${
                    msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 shadow-sm ${
                      msg.sender === 'user'
                        ? 'bg-surface-container-high text-on-surface'
                        : 'bg-primary text-on-primary'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      {msg.sender === 'user' ? 'person' : 'smart_toy'}
                    </span>
                  </div>

                  <div className={`flex flex-col gap-space-xs ${msg.sender === 'user' ? 'items-end' : ''}`}>
                    <div
                      className={`p-space-md rounded-2xl shadow-sm text-body-md ${
                        msg.sender === 'user'
                          ? 'bg-primary text-on-primary rounded-tr-none'
                          : 'bg-surface text-on-surface rounded-tl-none border border-surface-container'
                      }`}
                    >
                      <div dangerouslySetInnerHTML={{ __html: msg.text || '' }}></div>

                      {/* Attached Recommendation Cards */}
                      {msg.recommendations && (
                        <div className="flex flex-col gap-space-md mt-space-md">
                          {msg.recommendations.map((rec, rIdx) => (
                            <div
                              key={rIdx}
                              onClick={() => onNavigate('comparateur')}
                              className="bg-surface-container-low rounded-xl p-space-md flex flex-col md:flex-row gap-space-md items-center shadow-sm hover:shadow-md transition-all cursor-pointer border border-surface-container"
                            >
                              <div
                                className="w-full md:w-28 h-24 rounded-lg bg-cover bg-center shrink-0"
                                style={{ backgroundImage: `url('${rec.imageUrl}')` }}
                              ></div>
                              <div className="flex flex-col gap-1 flex-1 w-full">
                                <div className="flex items-center justify-between">
                                  <span className="font-headline-sm font-bold text-on-surface">{rec.name}</span>
                                  <span className="bg-tertiary-container text-on-tertiary-container px-2 py-0.5 rounded-full font-label-sm font-bold">
                                    {rec.rating}
                                  </span>
                                </div>
                                <span className="font-body-sm text-on-surface-variant">{rec.location}</span>
                                <div className="flex items-center justify-between mt-2 flex-wrap gap-2">
                                  <span className="font-label-md font-bold text-primary">{rec.price}</span>
                                  <div className="flex gap-1">
                                    {rec.tags.map((tag, tIdx) => (
                                      <span
                                        key={tIdx}
                                        className="bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded text-label-sm font-bold"
                                      >
                                        {tag}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <span className="font-label-sm text-outline">{msg.timestamp}</span>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-start gap-space-md max-w-xl">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary shrink-0 mt-1 shadow-sm">
                    <span className="material-symbols-outlined text-[16px]">smart_toy</span>
                  </div>
                  <div className="bg-surface p-space-md rounded-2xl shadow-sm text-body-md text-on-surface flex items-center gap-2 border border-surface-container">
                    <span className="w-2 h-2 rounded-full bg-primary animate-bounce"></span>
                    <span className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:0.4s]"></span>
                    <span className="text-body-sm text-outline ml-1">lukaAI is thinking...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input Form */}
            <div className="p-space-md bg-surface border-t border-surface-container-high">
              <form onSubmit={handleSendMessage} className="flex items-center gap-space-sm">
                <div className="relative flex-1">
                  <span className="absolute left-4 top-3.5 material-symbols-outlined text-outline text-[20px] pointer-events-none">
                    chat
                  </span>
                  <input
                    type="text"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    placeholder="Ask lukaAI anything (e.g. 'Find hotels in Dakar accepting Orange Money...')"
                    className="w-full h-12 pl-12 pr-4 bg-surface-container-low rounded-full text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary shadow-inner border border-surface-container"
                  />
                </div>
                <button
                  type="submit"
                  className="h-12 px-space-lg bg-primary text-on-primary rounded-full font-label-lg hover:opacity-95 transition-all flex items-center gap-space-xs shadow-sm cursor-pointer font-bold"
                >
                  <span>Send</span>
                  <span className="material-symbols-outlined text-[18px]">send</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
