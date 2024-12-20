import { interpolate, spring } from 'remotion';

export const frameTemplates = [
  {
    id: 'gradient-flow',
    label: 'Flowing Gradient',
    preview: 'bg-gradient-to-br from-purple-600 to-blue-600',
    component: ({ frame }: { frame: number }) => ({
      background: `linear-gradient(${interpolate(frame, [0, 120], [0, 360])}deg, #8B5CF6, #3B82F6)`,
    })
  },
  {
    id: 'particles',
    label: 'Particle Background',
    preview: 'bg-gray-900',
    component: ({ frame }: { frame: number }) => ({
      background: '#111827',
      backgroundImage: `radial-gradient(circle at ${spring({ frame, from: 0, to: 100, durationInFrames: 60 })}% ${spring({ frame, from: 0, to: 100, durationInFrames: 90 })}%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)`
    })
  },
  {
    id: 'geometric',
    label: 'Geometric Patterns',
    preview: 'bg-gray-900',
    component: ({ frame }: { frame: number }) => ({
      background: '#111827',
      backgroundImage: `linear-gradient(30deg, #8B5CF6 12%, transparent 12.5%, transparent 87%, #8B5CF6 87.5%, #8B5CF6),
        linear-gradient(150deg, #8B5CF6 12%, transparent 12.5%, transparent 87%, #8B5CF6 87.5%, #8B5CF6),
        linear-gradient(30deg, #8B5CF6 12%, transparent 12.5%, transparent 87%, #8B5CF6 87.5%, #8B5CF6),
        linear-gradient(150deg, #8B5CF6 12%, transparent 12.5%, transparent 87%, #8B5CF6 87.5%, #8B5CF6),
        linear-gradient(60deg, #8B5CF677 25%, transparent 25.5%, transparent 75%, #8B5CF677 75%, #8B5CF677),
        linear-gradient(60deg, #8B5CF677 25%, transparent 25.5%, transparent 75%, #8B5CF677 75%, #8B5CF677)`,
      backgroundSize: '80px 140px',
      backgroundPosition: `${interpolate(frame, [0, 120], [0, 80])}px 0`,
    })
  },
  {
    id: 'noise',
    label: 'Animated Noise',
    preview: 'bg-gray-900',
    component: ({ frame }: { frame: number }) => ({
      background: '#111827',
      filter: `url(#noise-${Math.floor(frame / 2) % 3})`,
    })
  },
  {
    id: 'color-morph',
    label: 'Color Morph',
    preview: 'bg-gradient-to-r from-purple-600 to-blue-600',
    component: ({ frame }: { frame: number }) => ({
      background: `hsl(${interpolate(frame, [0, 120], [270, 630])}deg, 95%, 75%)`,
    })
  }
];