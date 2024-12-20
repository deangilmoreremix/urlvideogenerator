import React from 'react';
import { Layout, Type, Film, Music, Sparkles, Globe, ChevronLeft, ChevronRight } from 'lucide-react';
import { AssetPanel } from './asset-panel';
import { UrlGenerators } from './url-generators';
import { TextPanel } from './text-panel';
import { MediaPanel } from './media-panel';
import { AudioPanel } from './audio-panel';
import { FramesPanel } from './frames-panel';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';

const sidebarItems = [
  { icon: Layout, label: 'Frames', panel: 'frames', component: FramesPanel },
  { icon: Globe, label: 'URL', panel: 'url', component: UrlGenerators },
  { icon: Type, label: 'Text', panel: 'text', component: TextPanel },
  { icon: Film, label: 'Media', panel: 'media', component: MediaPanel },
  { icon: Music, label: 'Audio', panel: 'audio', component: AudioPanel },
  { icon: Sparkles, label: 'Assets', panel: 'assets', component: AssetPanel },
];

export const Sidebar = () => {
  const [activePanel, setActivePanel] = React.useState('url');
  const [isExpanded, setIsExpanded] = React.useState(true);

  const ActivePanelComponent = sidebarItems.find(
    (item) => item.panel === activePanel
  )?.component;

  return (
    <div className="flex border-r border-gray-800 bg-gray-900">
      <div className={cn(
        "flex flex-col transition-all duration-300",
        isExpanded ? "w-20" : "w-14"
      )}>
        <div className="flex-1">
          {sidebarItems.map((item) => (
            <button
              key={item.panel}
              onClick={() => setActivePanel(item.panel)}
              className={cn(
                "flex w-full items-center p-2 mb-1 transition-colors relative group",
                activePanel === item.panel
                  ? "text-purple-500 bg-purple-500/10"
                  : "text-gray-400 hover:text-gray-300 hover:bg-gray-800"
              )}
            >
              <item.icon className={cn(
                "w-5 h-5",
                isExpanded ? "mx-auto" : "ml-auto mr-auto"
              )} />
              {isExpanded && (
                <span className="text-xs mt-1 block w-full text-center">
                  {item.label}
                </span>
              )}
              {!isExpanded && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 rounded-md text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
                  {item.label}
                </div>
              )}
            </button>
          ))}
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 text-gray-400 hover:text-gray-300 hover:bg-gray-800 transition-colors"
        >
          {isExpanded ? (
            <ChevronLeft className="w-5 h-5 mx-auto" />
          ) : (
            <ChevronRight className="w-5 h-5 mx-auto" />
          )}
        </button>
      </div>
      
      <AnimatePresence>
        {activePanel && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "16rem", opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="border-l border-gray-800 overflow-hidden"
          >
            {ActivePanelComponent && <ActivePanelComponent />}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};