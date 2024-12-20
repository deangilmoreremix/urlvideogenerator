import React from 'react';
import { useVideoStore } from '../../store/video-store';
import { textAnimations } from '../../lib/assets';

const textStyles = [
  { id: 'heading', label: 'Heading', fontSize: 48 },
  { id: 'subheading', label: 'Subheading', fontSize: 32 },
  { id: 'body', label: 'Body Text', fontSize: 24 },
  { id: 'caption', label: 'Caption', fontSize: 18 },
];

export const TextPanel = () => {
  const { addSequence } = useVideoStore();

  const handleAddText = (style: typeof textStyles[0]) => {
    addSequence({
      type: 'text',
      startFrame: 0,
      endFrame: 90,
      content: style.label,
      props: {
        fontSize: style.fontSize,
        textAlign: 'center',
        animation: 'fadeIn'
      }
    });
  };

  return (
    <div className="p-4">
      <h3 className="mb-4 text-sm font-medium text-gray-400">Text Styles</h3>
      <div className="space-y-2">
        {textStyles.map((style) => (
          <button
            key={style.id}
            onClick={() => handleAddText(style)}
            className="w-full rounded-lg border border-gray-700 bg-gray-800 p-3 text-left hover:border-purple-500/50 hover:bg-purple-500/5"
          >
            <span className="block text-white" style={{ fontSize: style.fontSize / 2 }}>
              {style.label}
            </span>
          </button>
        ))}
      </div>

      <h3 className="mb-4 mt-6 text-sm font-medium text-gray-400">Animations</h3>
      <div className="grid grid-cols-2 gap-2">
        {Object.entries(textAnimations).map(([key, animation]) => (
          <button
            key={key}
            onClick={() => {
              addSequence({
                type: 'text',
                startFrame: 0,
                endFrame: 90,
                content: 'Animated Text',
                props: {
                  fontSize: 32,
                  animation: key
                }
              });
            }}
            className="rounded-lg border border-gray-700 bg-gray-800 p-2 text-sm text-gray-300 hover:border-purple-500/50 hover:bg-purple-500/5"
          >
            {key}
          </button>
        ))}
      </div>
    </div>
  );
};