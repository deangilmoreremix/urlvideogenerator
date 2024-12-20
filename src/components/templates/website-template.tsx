import { AbsoluteFill, useCurrentFrame, interpolate, Sequence } from 'remotion';
import { motion } from 'framer-motion';

interface WebsiteTemplateProps {
  url: string;
  title: string;
}

export const WebsiteTemplate: React.FC<WebsiteTemplateProps> = ({ url, title }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const scale = interpolate(frame, [0, 30], [0.9, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill className="bg-gradient-to-br from-gray-900 to-gray-800 p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <h1 className="text-4xl font-bold text-white">{title}</h1>
        <p className="text-xl text-gray-400">{url}</p>
      </motion.div>

      <div
        style={{
          opacity,
          transform: `scale(${scale})`,
        }}
        className="relative mx-auto aspect-video w-full max-w-5xl overflow-hidden rounded-xl border border-gray-700 shadow-2xl"
      >
        <iframe
          src={url}
          className="h-full w-full"
          style={{
            transform: 'scale(1)',
            transformOrigin: 'top left',
          }}
        />
      </div>
    </AbsoluteFill>
  );
};