export const textAnimations = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  },
  slideDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
  },
  bounce: {
    initial: { opacity: 0, scale: 0.3 },
    animate: { 
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    },
  }
};

export const stickers = [
  {
    id: 'fire',
    url: 'https://images.unsplash.com/photo-1549886607-22f7b25d7f14?w=64&h=64&fit=crop&auto=format',
    label: 'Fire'
  },
  {
    id: 'heart',
    url: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=64&h=64&fit=crop&auto=format',
    label: 'Heart'
  },
  {
    id: 'star',
    url: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=64&h=64&fit=crop&auto=format',
    label: 'Star'
  }
];

export const soundEffects = [
  {
    id: 'pop',
    url: 'https://assets.mixkit.co/sfx/preview/mixkit-bubble-pop-up-alert-notification-2357.mp3',
    label: 'Pop'
  },
  {
    id: 'success',
    url: 'https://assets.mixkit.co/sfx/preview/mixkit-achievement-bell-600.mp3',
    label: 'Success'
  },
  {
    id: 'click',
    url: 'https://assets.mixkit.co/sfx/preview/mixkit-mouse-click-close-1113.mp3',
    label: 'Click'
  }
];

export const overlays = [
  {
    id: 'gradient',
    label: 'Gradient Overlay',
    className: 'bg-gradient-to-br from-purple-500/20 to-pink-500/20'
  },
  {
    id: 'noise',
    label: 'Noise Texture',
    className: 'bg-noise opacity-10'
  },
  {
    id: 'vignette',
    label: 'Vignette',
    className: 'bg-radial-gradient from-transparent to-black/30'
  }
];