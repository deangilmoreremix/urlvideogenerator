import React from 'react';
import { Settings, Video, Volume2, Clock } from 'lucide-react';

interface VideoSettings {
  width: number;
  height: number;
  fps: number;
  duration: number;
  quality: number;
  volume: number;
}

interface VideoSettingsPanelProps {
  settings: VideoSettings;
  onSettingsChange: (settings: VideoSettings) => void;
}

export const VideoSettingsPanel: React.FC<VideoSettingsPanelProps> = ({
  settings,
  onSettingsChange,
}) => {
  const handleChange = (key: keyof VideoSettings, value: number) => {
    onSettingsChange({
      ...settings,
      [key]: value,
    });
  };

  return (
    <div className="space-y-4 p-4">
      <h3 className="flex items-center gap-2 text-lg font-semibold text-white">
        <Settings className="h-5 w-5" />
        Video Settings
      </h3>

      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm text-gray-400">Resolution</label>
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="mb-1 block text-xs text-gray-500">Width</label>
              <input
                type="number"
                value={settings.width}
                onChange={(e) => handleChange('width', parseInt(e.target.value))}
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white"
                min={480}
                max={3840}
                step={16}
              />
            </div>
            <div className="flex-1">
              <label className="mb-1 block text-xs text-gray-500">Height</label>
              <input
                type="number"
                value={settings.height}
                onChange={(e) => handleChange('height', parseInt(e.target.value))}
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white"
                min={360}
                max={2160}
                step={16}
              />
            </div>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm text-gray-400">Frame Rate (FPS)</label>
          <input
            type="range"
            value={settings.fps}
            onChange={(e) => handleChange('fps', parseInt(e.target.value))}
            className="w-full"
            min={24}
            max={60}
            step={1}
          />
          <div className="mt-1 text-sm text-gray-500">{settings.fps} FPS</div>
        </div>

        <div>
          <label className="mb-2 block text-sm text-gray-400">Duration (seconds)</label>
          <input
            type="range"
            value={settings.duration}
            onChange={(e) => handleChange('duration', parseInt(e.target.value))}
            className="w-full"
            min={5}
            max={60}
            step={1}
          />
          <div className="mt-1 text-sm text-gray-500">{settings.duration} seconds</div>
        </div>

        <div>
          <label className="mb-2 block text-sm text-gray-400">Quality</label>
          <input
            type="range"
            value={settings.quality}
            onChange={(e) => handleChange('quality', parseInt(e.target.value))}
            className="w-full"
            min={1}
            max={100}
            step={1}
          />
          <div className="mt-1 text-sm text-gray-500">{settings.quality}%</div>
        </div>

        <div>
          <label className="mb-2 block text-sm text-gray-400">Volume</label>
          <input
            type="range"
            value={settings.volume}
            onChange={(e) => handleChange('volume', parseFloat(e.target.value))}
            className="w-full"
            min={0}
            max={1}
            step={0.1}
          />
          <div className="mt-1 text-sm text-gray-500">
            {Math.round(settings.volume * 100)}%
          </div>
        </div>
      </div>
    </div>
  );
};