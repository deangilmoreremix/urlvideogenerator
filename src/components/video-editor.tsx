import React from 'react';
import { Player } from '@remotion/player';
import { TikTokTemplate } from './templates/tiktok-template';
import { Toolbar } from './video-editor/toolbar';
import { Timeline } from './video-editor/timeline';
import { Sidebar } from './video-editor/sidebar';
import { SequenceTimeline } from './video-editor/sequence-timeline';
import { PropertiesPanel } from './video-editor/properties-panel';
import { HeaderControls } from './video-editor/header-controls';

export const VideoEditor = () => {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-gray-900">
      <HeaderControls />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="flex-1 overflow-hidden p-6">
            <div className="mx-auto aspect-[9/16] w-full max-w-md overflow-hidden rounded-lg border border-gray-800 bg-gray-950">
              <Player
                component={TikTokTemplate}
                durationInFrames={300}
                fps={30}
                compositionWidth={1080}
                compositionHeight={1920}
                style={{
                  width: '100%',
                  height: '100%',
                }}
                controls
                inputProps={{
                  sequences: [{
                    id: '1',
                    type: 'text',
                    startFrame: 0,
                    endFrame: 90,
                    content: '👋 Welcome to VideoGen AI!\nCreate amazing videos with React',
                    props: {
                      fontSize: 48,
                      textAlign: 'center'
                    }
                  }]
                }}
              />
            </div>
          </div>
          <Timeline />
          <SequenceTimeline />
        </div>
        <PropertiesPanel />
      </div>
    </div>
  );
};