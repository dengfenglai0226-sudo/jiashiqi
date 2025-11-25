import React from 'react';
import { MATERIALS, STEPS } from '../constants';
import { Package, Wrench, CheckCircle2 } from 'lucide-react';
import { TabView } from '../types';

interface InfoPanelProps {
  activeTab: TabView;
  setActiveTab: (tab: TabView) => void;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex flex-col h-full bg-white border-r border-slate-200 shadow-xl z-10 w-full md:max-w-md">
      {/* Header */}
      <div className="p-6 bg-slate-900 text-white">
        <h1 className="text-xl font-bold mb-1">PVC Humidifier</h1>
        <p className="text-slate-400 text-sm">2m x 1m DIY Evaporative Cooler</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200">
        <button
          onClick={() => setActiveTab(TabView.BOM)}
          className={`flex-1 py-3 px-4 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
            activeTab === TabView.BOM ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <Package size={16} /> Materials
        </button>
        <button
          onClick={() => setActiveTab(TabView.STEPS)}
          className={`flex-1 py-3 px-4 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
            activeTab === TabView.STEPS ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <Wrench size={16} /> Assembly
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto bg-slate-50">
        {activeTab === TabView.BOM && (
          <div className="p-4 space-y-6">
            {Object.entries(MATERIALS).map(([category, items]) => (
              <div key={category}>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">{category}</h3>
                <div className="space-y-3">
                  {items.map((item, idx) => (
                    <div key={idx} className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm flex justify-between items-start">
                      <div>
                        <div className="font-semibold text-slate-800">{item.name}</div>
                        <div className="text-xs text-slate-500">{item.spec}</div>
                        <div className="text-xs text-slate-400 mt-1">{item.usage}</div>
                      </div>
                      <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2 py-1 rounded">
                        x{item.count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === TabView.STEPS && (
          <div className="p-4 relative">
             <div className="absolute left-8 top-4 bottom-4 w-0.5 bg-slate-200"></div>
             <div className="space-y-8 relative">
               {STEPS.map((step, idx) => (
                 <div key={idx} className="flex gap-4">
                   <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 z-10 ring-4 ring-slate-50 font-bold text-sm">
                     {idx + 1}
                   </div>
                   <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex-1">
                     <h4 className="font-bold text-slate-800 mb-2">{step.title}</h4>
                     <p className="text-sm text-slate-600 leading-relaxed">{step.description}</p>
                   </div>
                 </div>
               ))}
               <div className="flex gap-4">
                 <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center shrink-0 z-10 ring-4 ring-slate-50">
                   <CheckCircle2 size={16} />
                 </div>
                 <div className="pt-1">
                   <h4 className="font-bold text-slate-800">Complete!</h4>
                 </div>
               </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoPanel;
