import React from 'react';
import { useVideoStore } from '../../store/video-store';
import { Button } from '../ui/button';
import { Trash2, Copy, Music, Wand2, ArrowRightLeft } from 'lucide-react';

export const PropertiesPanel = () => {
  const { sequences, selectedSequence, updateSequence, removeSequence, addSequence } =
    useVideoStore();

  const sequence = sequences.find((s) => s.id === selectedSequence);

  const handleCopy = () => {
    if (!sequence) return;
    const copy = { ...sequence };
    delete copy.id;
    addSequence({
      ...copy,
      startFrame: sequence.startFrame + 30,
      endFrame: sequence.endFrame + 30,
    });
  };

  if (!sequence) {
    return (
      <div className="w-80 border-l border-gray-800 bg-gray-900 p-4">
        <p className="text-sm text-gray-400">No sequence selected</p>
      </div>
    );
  }

  return (
    <div className="w-80 border-l border-gray-800 bg-gray-900 p-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Properties</h3>
        <div className="flex gap-2">
          <Button
            className="text-gray-400 hover:text-white"
            variant="secondary"
            size="sm"
            onClick={handleCopy}
          >
            <Copy className="mr-1 h-4 w-4" />
            <span>Copy</span>
          </Button>
          <Button
            className="text-red-400 hover:text-red-300"
            variant="secondary"
            size="sm"
            onClick={() => removeSequence(sequence.id)}
          >
            <Trash2 className="mr-1 h-4 w-4" />
            <span>Delete</span>
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm text-gray-400">Start Frame</label>
          <input
            type="number"
            value={sequence.startFrame}
            onChange={(e) =>
              updateSequence(sequence.id, {
                startFrame: parseInt(e.target.value),
              })
            }
            className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-white"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-gray-400">End Frame</label>
          <input
            type="number"
            value={sequence.endFrame}
            onChange={(e) =>
              updateSequence(sequence.id, {
                endFrame: parseInt(e.target.value),
              })
            }
            className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-white"
          />
        </div>

        {sequence.type === 'text' && (
          <>
            <div>
              <label className="mb-2 block text-sm text-gray-400">Content</label>
              <textarea
                value={sequence.content}
                onChange={(e) =>
                  updateSequence(sequence.id, { content: e.target.value })
                }
                className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-white"
                rows={3}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm text-gray-400">Motion Effect</label>
              <select
                value={sequence.props?.effect || 'none'}
                onChange={(e) =>
                  updateSequence(sequence.id, {
                    props: { ...sequence.props, effect: e.target.value },
                  })
                }
                className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-white"
              >
                <option value="none">None</option>
                <option value="spring">Spring</option>
                <option value="bounce">Bounce</option>
                <option value="elastic">Elastic</option>
                <option value="smooth">Smooth</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm text-gray-400">Transition</label>
              <select
                value={sequence.props?.transition || 'none'}
                onChange={(e) =>
                  updateSequence(sequence.id, {
                    props: { ...sequence.props, transition: e.target.value },
                  })
                }
                className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-white"
              >
                <option value="none">None</option>
                <option value="slide">Slide</option>
                <option value="fade">Fade</option>
                <option value="zoom">Zoom</option>
                <option value="rotate">Rotate</option>
              </select>
            </div>
          </>
        )}

        {sequence.type === 'audio' && (
          <div>
            <label className="mb-2 block text-sm text-gray-400">Visualizer</label>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={sequence.props?.visualizer || false}
                onChange={(e) =>
                  updateSequence(sequence.id, {
                    props: { ...sequence.props, visualizer: e.target.checked },
                  })
                }
                className="rounded border-gray-700 bg-gray-800 text-[#E44E51]"
              />
              <span className="text-sm text-gray-400">Show audio visualizer</span>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 space-y-4">
        <Button
          className="w-full justify-start text-gray-400 hover:text-white"
          variant="ghost"
          size="sm"
        >
          <Music className="mr-2 h-4 w-4" />
          Add Audio Effect
        </Button>
        <Button
          className="w-full justify-start text-gray-400 hover:text-white"
          variant="ghost"
          size="sm"
        >
          <Wand2 className="mr-2 h-4 w-4" />
          Add Motion Effect
        </Button>
        <Button
          className="w-full justify-start text-gray-400 hover:text-white"
          variant="ghost"
          size="sm"
        >
          <ArrowRightLeft className="mr-2 h-4 w-4" />
          Add Transition
        </Button>
      </div>
    </div>
  );
};