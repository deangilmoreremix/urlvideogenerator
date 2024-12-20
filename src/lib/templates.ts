import {
  Video, Languages, Youtube, Instagram, Camera, Twitter, FileText, 
  Palette, MessageSquare, Mic, Gamepad, Share2, PenTool, Film, MessageCircleQuestion,
  Layout, Sparkles, Newspaper, Star, Calendar, ShoppingBag, Users, Store, Facebook,
  Globe, Linkedin, BookOpen, Building, Shirt, Map, GraduationCap, Heart, Laptop,
  Music, Headphones, Dumbbell, UtensilsCrossed, Baby, Scale, Leaf, Briefcase, 
  Rocket, Globe2, Trophy, Gift, Box, FileVideo, Play, Presentation, Book, Home,
  Image, Brush, Easel, PaintBucket, Lightbulb, Award, Megaphone, Smile, Utensils,
  Plane, Hotel, Car, Smartphone, Tablet, Desktop, Server, Cloud, Code, Terminal,
  Coffee, ChefHat, Sandwich, Pizza, Cake, Wine, Cocktail, Beer, Gym, Yoga, Run,
  Bike, Swim, Basketball, Football, Baseball, Tennis, Golf, Chess, Camera2
} from 'lucide-react';

export const templates = [
  // Social Media Templates
  {
    id: 'tiktok-content',
    title: 'TikTok Content Generator',
    description: 'Extract content from URLs to create trending TikTok videos.',
    categories: ['Social Media'],
    icon: Video,
    previewUrl: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800&h=450&fit=crop',
    features: ['Trending effects', 'Music integration', 'Auto-captioning', 'Viral formatting']
  },
  {
    id: 'multilingual-subtitle',
    title: 'Multilingual Subtitle Integrator',
    description: 'Embed subtitles from text found at given URLs into videos in multiple languages.',
    categories: ['Accessibility', 'AI'],
    icon: Languages,
    previewUrl: 'https://images.unsplash.com/photo-1589149098258-3e9102cd63d3?w=800&h=450&fit=crop',
    features: ['Multi-language support', 'AI translation', 'Caption styling', 'Timing sync']
  },
  {
    id: 'youtube-shorts',
    title: 'YouTube Shorts Transformer',
    description: 'Turn long-form content from YouTube URLs into engaging YouTube Shorts.',
    categories: ['Social Media', 'Content'],
    icon: Youtube,
    previewUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=450&fit=crop',
    features: ['Content trimming', 'Vertical format', 'Engagement hooks', 'Trending music']
  },
  {
    id: 'instagram-story',
    title: 'Instagram Story Highlight Creator',
    description: 'Use content from Instagram profile URLs to craft animated Instagram Stories.',
    categories: ['Social Media'],
    icon: Instagram,
    previewUrl: 'https://images.unsplash.com/photo-1585951237318-9ea5e175b891?w=800&h=450&fit=crop',
    features: ['Story transitions', 'Interactive elements', 'Brand elements', 'Engagement tools']
  },
  {
    id: 'snapchat-spotlight',
    title: 'Snapchat Spotlight Producer',
    description: 'Generate Snapchat Spotlight videos from media URLs.',
    categories: ['Social Media'],
    icon: Camera,
    previewUrl: 'https://images.unsplash.com/photo-1527697911963-20cb424e9608?w=800&h=450&fit=crop',
    features: ['AR effects', 'Sound effects', 'Trending music', 'Visual effects']
  },
  {
    id: 'facebook-live',
    title: 'Facebook Live Preview Maker',
    description: 'Create enticing previews for Facebook Live using event URLs.',
    categories: ['Social Media', 'Marketing'],
    icon: Facebook,
    previewUrl: 'https://images.unsplash.com/photo-1576267423048-15c0040fec78?w=800&h=450&fit=crop',
    features: ['Live indicators', 'Viewer count', 'Chat preview', 'Schedule display']
  },
  {
    id: 'twitter-engagement',
    title: 'Twitter Engagement Booster',
    description: 'Convert tweets from URLs into sequential Twitter video threads.',
    categories: ['Social Media'],
    icon: Twitter,
    previewUrl: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?w=800&h=450&fit=crop',
    features: ['Thread visualization', 'Engagement metrics', 'Quote formatting', 'Reply chains']
  },
  {
    id: 'linkedin-article',
    title: 'LinkedIn Article Video Adapter',
    description: 'Transform professional articles from LinkedIn URLs into sleek videos.',
    categories: ['Business', 'Professional'],
    icon: Linkedin,
    previewUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=450&fit=crop',
    features: ['Professional styling', 'Key points', 'Author spotlight', 'Call-to-action']
  },
  {
    id: 'pinterest-tutorial',
    title: 'Pinterest Tutorial Video Maker',
    description: 'Develop tutorial videos from DIY project URLs on Pinterest.',
    categories: ['Education', 'Crafts'],
    icon: PenTool,
    previewUrl: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&h=450&fit=crop',
    features: ['Step-by-step guide', 'Material list', 'Time markers', 'Result showcase']
  },
  {
    id: 'reddit-ama',
    title: 'Reddit AMA Highlight Reel',
    description: 'Summarize Reddit AMAs into highlight videos using AMA session URLs.',
    categories: ['Social Media', 'Content'],
    icon: MessageSquare,
    previewUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=450&fit=crop',
    features: ['Q&A format', 'Best answers', 'User interaction', 'Topic grouping']
  },
  {
    id: 'clubhouse-recap',
    title: 'Clubhouse Recap Video Creator',
    description: 'Craft recap videos of Clubhouse discussions from shared session URLs.',
    categories: ['Social Media', 'Audio'],
    icon: Mic,
    previewUrl: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&h=450&fit=crop',
    features: ['Speaker highlights', 'Topic segments', 'Key moments', 'Visual elements']
  },
  {
    id: 'twitch-highlights',
    title: 'Twitch Stream Highlight Compiler',
    description: 'Create compilations of Twitch gaming highlights using stream URLs.',
    categories: ['Gaming', 'Entertainment'],
    icon: Gamepad,
    previewUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=450&fit=crop',
    features: ['Best moments', 'Chat reactions', 'Clip transitions', 'Stream stats']
  },
  {
    id: 'periscope-replay',
    title: 'Periscope Replay Enhancer',
    description: 'Enhance and repurpose content from Periscope broadcast URLs.',
    categories: ['Social Media', 'Live Content'],
    icon: Film,
    previewUrl: 'https://images.unsplash.com/photo-1576267423048-15c0040fec78?w=800&h=450&fit=crop',
    features: ['Highlight selection', 'Comment overlay', 'Heart animations', 'Viewer stats']
  },
  {
    id: 'tumblr-post',
    title: 'Tumblr Animated Post Producer',
    description: 'Turn blog posts from Tumblr URLs into captivating animated videos.',
    categories: ['Social Media', 'Blogging'],
    icon: Newspaper,
    previewUrl: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=800&h=450&fit=crop',
    features: ['Text animation', 'Image galleries', 'Tag visualization', 'Blog theme']
  },
  {
    id: 'vimeo-showcase',
    title: 'Vimeo Creative Project Showcase',
    description: 'Display creative projects in video form using Vimeo URLs.',
    categories: ['Creative', 'Portfolio'],
    icon: Play,
    previewUrl: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&h=450&fit=crop',
    features: ['Project details', 'Creator info', 'Process showcase', 'Portfolio style']
  },
  {
    id: 'quora-qa',
    title: 'Quora Q&A Video Maker',
    description: 'Convert Quora answer URLs into informative video content.',
    categories: ['Education', 'Knowledge'],
    icon: MessageCircleQuestion,
    previewUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=450&fit=crop',
    features: ['Answer highlights', 'Expert credentials', 'Source citations', 'Visual aids']
  },
  {
    id: 'behance-portfolio',
    title: 'Behance Portfolio Presenter',
    description: 'Showcase design portfolios through videos created from Behance URLs.',
    categories: ['Design', 'Portfolio'],
    icon: Layout,
    previewUrl: 'https://images.unsplash.com/photo-1561998338-13ad7883b20f?w=800&h=450&fit=crop',
    features: ['Project gallery', 'Design process', 'Client feedback', 'Case studies']
  },
  {
    id: 'dribbble-animation',
    title: 'Dribbble Design Animation Tool',
    description: 'Animate design shots into dynamic videos using Dribbble URLs.',
    categories: ['Design', 'Animation'],
    icon: Palette,
    previewUrl: 'https://images.unsplash.com/photo-1561998338-13ad7883b20f?w=800&h=450&fit=crop',
    features: ['Motion effects', 'Color schemes', 'Design specs', 'Interaction demo']
  },
  {
    id: 'medium-post',
    title: 'Medium Post Videofier',
    description: 'Create engaging videos from insightful Medium articles using their URLs.',
    categories: ['Content', 'Publishing'],
    icon: FileText,
    previewUrl: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=800&h=450&fit=crop',
    features: ['Key insights', 'Author info', 'Article stats', 'Visual summary']
  },
  {
    id: 'gmb-reviews',
    title: 'Google My Business Review Visualizer',
    description: 'Turn customer review URLs into persuasive video testimonials.',
    categories: ['Business', 'Marketing'],
    icon: Star,
    previewUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=450&fit=crop',
    features: ['Rating display', 'Customer photos', 'Response showcase', 'Business info']
  },
  {
    id: 'eventbrite-promo',
    title: 'Eventbrite Promo Video Generator',
    description: 'Craft promotional videos for events using Eventbrite URLs.',
    categories: ['Events', 'Marketing'],
    icon: Calendar,
    previewUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=450&fit=crop',
    features: ['Event details', 'Ticket info', 'Venue showcase', 'Speaker lineup']
  },
  {
    id: 'ecommerce-highlight',
    title: 'E-commerce Product Highlight Reel',
    description: 'Showcase products through videos generated from e-commerce URLs.',
    categories: ['Shopping', 'Marketing'],
    icon: ShoppingBag,
    previewUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=450&fit=crop',
    features: ['Product features', 'Price display', 'Review highlights', 'Shop info']
  },
  {
    id: 'testimonial-story',
    title: 'Customer Testimonial Storyteller',
    description: 'Convert textual testimonials from URLs into compelling video narratives.',
    categories: ['Marketing', 'Business'],
    icon: Users,
    previewUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=450&fit=crop',
    features: ['Customer photos', 'Quote styling', 'Brand elements', 'Success metrics']
  },
  {
    id: 'instagram-product',
    title: 'Instagram Reel Product Spotlight',
    description: 'Quickly produce product-focused videos from Instagram URLs.',
    categories: ['Social Media', 'Shopping'],
    icon: Store,
    previewUrl: 'https://images.unsplash.com/photo-1585951237318-9ea5e175b891?w=800&h=450&fit=crop',
    features: ['Product showcase', 'Shopping tags', 'Brand story', 'Call-to-action']
  },
  {
    id: 'facebook-ad',
    title: 'Facebook Ad Campaign Visualizer',
    description: 'Create targeted Facebook video ads using campaign URLs.',
    categories: ['Advertising', 'Marketing'],
    icon: Share2,
    previewUrl: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800&h=450&fit=crop',
    features: ['Ad metrics', 'Audience targeting', 'Campaign goals', 'Performance data']
  },
  {
    id: 'twitter-product',
    title: 'Twitter Product Teaser Creator',
    description: 'Generate enticing video teasers for products using Twitter URLs.',
    categories: ['Social Media', 'Marketing'],
    icon: Twitter,
    previewUrl: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?w=800&h=450&fit=crop',
    features: ['Product features', 'Tweet metrics', 'User feedback', 'Launch countdown']
  },
  {
    id: 'linkedin-success',
    title: 'LinkedIn Success Case Visualizer',
    description: 'Narrate success stories through videos crafted from LinkedIn URLs.',
    categories: ['Business', 'Professional'],
    icon: Trophy,
    previewUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=450&fit=crop',
    features: ['Success metrics', 'Company growth', 'Team spotlight', 'Achievement timeline']
  },
  {
    id: 'pinterest-craft',
    title: 'Pinterest Craft Guide Video Maker',
    description: 'Produce craft guide videos from detailed Pinterest URLs.',
    categories: ['DIY', 'Education'],
    icon: Brush,
    previewUrl: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&h=450&fit=crop',
    features: ['Step-by-step', 'Material list', 'Time estimates', 'Difficulty level']
  },
  {
    id: 'realestate-tour',
    title: 'Real Estate Listing Video Tour',
    description: 'Generate immersive property tours from real estate listing URLs.',
    categories: ['Real Estate', 'Marketing'],
    icon: Home,
    previewUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=450&fit=crop',
    features: ['Virtual tour', 'Property details', 'Location info', 'Contact agent']
  },
  {
    id: 'fashion-lookbook',
    title: 'Fashion Lookbook Video Creator',
    description: 'Create fashion lookbook videos using collection URLs.',
    categories: ['Fashion', 'Style'],
    icon: Shirt,
    previewUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=450&fit=crop',
    features: ['Style showcase', 'Product details', 'Size guide', 'Shop links']
  },
  {
    id: 'travel-vlog',
    title: 'Travel Blog Vlog Converter',
    description: 'Turn travel blog URLs into immersive travel vlogs.',
    categories: ['Travel', 'Lifestyle'],
    icon: Map,
    previewUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=450&fit=crop',
    features: ['Location showcase', 'Travel tips', 'Itinerary', 'Local insights']
  },
  {
    id: 'education-series',
    title: 'Educational Lecture Series Producer',
    description: 'Produce educational video series from lecture and article URLs.',
    categories: ['Education', 'Learning'],
    icon: GraduationCap,
    previewUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=450&fit=crop',
    features: ['Course structure', 'Learning goals', 'Quiz elements', 'Resources']
  },
  {
    id: 'health-advice',
    title: 'Health & Wellness Advice Video Maker',
    description: 'Create engaging advice videos using health blog URLs.',
    categories: ['Health', 'Lifestyle'],
    icon: Heart,
    previewUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=450&fit=crop',
    features: ['Expert tips', 'Wellness goals', 'Progress tracking', 'Resource links']
  },
  {
    id: 'tech-review',
    title: 'Tech Product Review Video Maker',
    description: 'Produce in-depth tech review videos using product review URLs.',
    categories: ['Technology', 'Reviews'],
    icon: Laptop,
    previewUrl: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&h=450&fit=crop',
    features: ['Product specs', 'Performance tests', 'Comparison charts', 'Pros and cons']
  },
  {
    id: 'spotify-visualizer',
    title: 'Spotify Track Video Visualizer',
    description: 'Develop visual music videos from Spotify track URLs.',
    categories: ['Music', 'Entertainment'],
    icon: Music,
    previewUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&h=450&fit=crop',
    features: ['Audio reactive', 'Artist info', 'Track stats', 'Playlist context']
  },
  {
    id: 'podcast-visual',
    title: 'Podcast Visual Engagement Tool',
    description: 'Enhance podcasts by creating visuals using episode URLs.',
    categories: ['Audio', 'Content'],
    icon: Headphones,
    previewUrl: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&h=450&fit=crop',
    features: ['Episode highlights', 'Guest info', 'Topic markers', 'Show notes']
  },
  {
    id: 'corporate-event',
    title: 'Corporate Event Video Recap',
    description: 'Compile corporate event footage into recaps using event URLs.',
    categories: ['Business', 'Events'],
    icon: Building,
    previewUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=450&fit=crop',
    features: ['Event highlights', 'Speaker moments', 'Attendee feedback', 'Key takeaways']
  },
  {
    id: 'fitness-routine',
    title: 'Fitness Routine Video Creator',
    description: 'Transform fitness tutorial URLs into motivating workout videos.',
    categories: ['Fitness', 'Health'],
    icon: Dumbbell,
    previewUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=450&fit=crop',
    features: ['Exercise demo', 'Form guide', 'Workout timer', 'Progress tracking']
  },
  {
    id: 'recipe-visual',
    title: 'Recipe Visual Instruction Maker',
    description: 'Convert online recipe URLs into easy-to-follow cooking videos.',
    categories: ['Food', 'Cooking'],
    icon: UtensilsCrossed,
    previewUrl: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&h=450&fit=crop',
    features: ['Ingredient list', 'Step-by-step', 'Cooking tips', 'Final presentation']
  },
  {
    id: 'kids-story',
    title: 'Children\'s Story Video Animator',
    description: 'Turn children\'s book URLs into animated story videos.',
    categories: ['Education', 'Kids'],
    icon: Baby,
    previewUrl: 'https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?w=800&h=450&fit=crop',
    features: ['Character animation', 'Voice narration', 'Sound effects', 'Interactive elements']
  },
  {
    id: 'legal-explainer',
    title: 'Legal Explainer Video Producer',
    description: 'Create videos explaining legal concepts using informational URLs.',
    categories: ['Legal', 'Education'],
    icon: Scale,
    previewUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=450&fit=crop',
    features: ['Legal concepts', 'Case studies', 'Expert insights', 'Resource links']
  },
  {
    id: 'sustainability',
    title: 'Sustainability Campaign Video Maker',
    description: 'Promote environmental campaigns through videos from advocacy URLs.',
    categories: ['Environment', 'Nonprofit'],
    icon: Leaf,
    previewUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=450&fit=crop',
    features: ['Impact metrics', 'Call to action', 'Success stories', 'Donation info']
  },
  {
    id: 'corporate-training',
    title: 'Corporate Training Video Suite',
    description: 'Develop training videos for corporate clients using educational URLs.',
    categories: ['Business', 'Education'],
    icon: Briefcase,
    previewUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=450&fit=crop',
    features: ['Learning modules', 'Assessment tools', 'Progress tracking', 'Certification']
  },
  {
    id: 'startup-pitch',
    title: 'Startup Pitch Video Creator',
    description: 'Create compelling startup pitch videos from company URLs.',
    categories: ['Business', 'Startup'],
    icon: Rocket,
    previewUrl: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=450&fit=crop',
    features: ['Business model', 'Market analysis', 'Growth metrics', 'Team showcase']
  },
  {
    id: 'global-news',
    title: 'Global News Video Summarizer',
    description: 'Transform news articles into concise video summaries.',
    categories: ['News', 'Media'],
    icon: Globe2,
    previewUrl: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&h=450&fit=crop',
    features: ['Key points', 'Source citations', 'Related stories', 'Timeline view']
  }
];