import React, { useState } from 'react';
import Viewer3D from './components/Viewer3D';
import InfoPanel from './components/InfoPanel';
import ChatInterface from './components/ChatInterface';
import { TabView } from './types';
import { MessageSquare } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabView>(TabView.BOM);
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-100 font-sans text-slate-900">
      
      {/* Left Sidebar (BOM & Steps) */}
      <div className="w-96 hidden md:block h-full shrink-0 z-20">
        <InfoPanel activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Main 3D View */}
      <div className="flex-1 relative h-full">
        <Viewer3D />
        
        {/* Mobile Tab Toggle Overlay */}
        <div className="md:hidden absolute top-4 left-4 right-4 z-30 flex gap-2">
           <button 
             onClick={() => setActiveTab(TabView.BOM)}
             className={`flex-1 py-2 rounded-lg shadow font-bold text-sm ${activeTab === TabView.BOM ? 'bg-blue-600 text-white' : 'bg-white text-slate-700'}`}
           >
             Materials
           </button>
           <button 
             onClick={() => setActiveTab(TabView.STEPS)}
             className={`flex-1 py-2 rounded-lg shadow font-bold text-sm ${activeTab === TabView.STEPS ? 'bg-blue-600 text-white' : 'bg-white text-slate-700'}`}
           >
             Steps
           </button>
        </div>

        {/* Mobile Panel Overlay */}
        <div className={`md:hidden absolute top-16 left-4 bottom-20 right-4 rounded-xl shadow-2xl overflow-hidden z-20 transition-transform duration-300 ${activeTab !== TabView.CHAT ? 'translate-x-0' : '-translate-x-[120%]'}`}>
           <InfoPanel activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      </div>

      {/* Right Sidebar (Chat) - Collapsible */}
      <div className={`fixed inset-y-0 right-0 w-80 md:w-96 bg-white shadow-2xl transform transition-transform duration-300 z-30 ${isChatOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="h-full relative">
          <button 
            onClick={() => setIsChatOpen(false)}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 md:hidden"
          >
            ✕
          </button>
          <ChatInterface />
        </div>
      </div>

      {/* Chat Toggle Button */}
      <button 
        onClick={() => setIsChatOpen(!isChatOpen)}
        className={`fixed bottom-6 right-6 p-4 rounded-full shadow-lg z-40 transition-colors ${isChatOpen ? 'bg-slate-700 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
      >
        <MessageSquare size={24} />
      </button>

    </div>
  );
};

export default App;
