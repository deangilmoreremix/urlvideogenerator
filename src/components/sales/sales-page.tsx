import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, Zap, Globe, Clock, Wand2, Brain, 
  CheckCircle2, ArrowRight, Play, Star
} from 'lucide-react';
import { DemoVideo } from './demo-video';

export const SalesPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Globe,
      title: '50+ Video Templates',
      description: 'Choose from a wide variety of professional templates for any content type'
    },
    {
      icon: Brain,
      title: 'AI-Powered Creation',
      description: 'Let AI generate scripts, voiceovers, and enhance your content automatically'
    },
    {
      icon: Clock,
      title: 'Save Hours of Work',
      description: 'Create professional videos in minutes instead of hours'
    },
    {
      icon: Wand2,
      title: 'One-Click Generation',
      description: 'Just paste a URL and let our platform do the magic'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Content Creator',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      quote: 'This platform has revolutionized my content creation process. What used to take hours now takes minutes!'
    },
    {
      name: 'Michael Chen',
      role: 'Marketing Director',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      quote: 'The AI features are incredible. It\'s like having a whole video production team at your fingertips.'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#E44E51]/20 to-[#E44E51]/10" />
        <div className="container mx-auto px-6 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="mb-6 flex items-center justify-center gap-2">
              <Sparkles className="h-6 w-6 text-[#E44E51]" />
              <span className="rounded-full bg-[#E44E51]/10 px-4 py-1 text-sm text-[#E44E51]">
                AI-Powered Video Generation
              </span>
            </div>
            <h1 className="mb-6 text-5xl font-bold leading-tight">
              Transform Any URL into
              <br />
              <span className="bg-gradient-to-r from-[#E44E51] to-[#E44E51] bg-clip-text text-transparent">
                Professional Videos
              </span>
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-400">
              Create stunning videos for social media, marketing, and education in minutes.
              No video editing experience required.
            </p>
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => navigate('/templates')}
                className="flex items-center gap-2 rounded-lg bg-[#E44E51] px-6 py-3 font-medium text-white hover:bg-[#E44E51]/90"
              >
                Start Creating Now
                <ArrowRight className="h-4 w-4" />
              </button>
              <DemoVideo />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-6 py-24">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold">Why Choose Our Platform?</h2>
          <p className="mx-auto max-w-2xl text-gray-400">
            Everything you need to create professional videos at scale
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="rounded-lg border border-gray-800 bg-gray-900/50 p-6"
            >
              <feature.icon className="mb-4 h-8 w-8 text-[#E44E51]" />
              <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-gray-900/50">
        <div className="container mx-auto px-6 py-24">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold">What Our Users Say</h2>
            <p className="mx-auto max-w-2xl text-gray-400">
              Join thousands of content creators who trust our platform
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="rounded-lg border border-gray-800 bg-gray-900/50 p-6"
              >
                <div className="mb-4 flex items-center gap-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="h-12 w-12 rounded-full"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-300">{testimonial.quote}</p>
                <div className="mt-4 flex text-[#E44E51]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-6 py-24">
        <div className="rounded-2xl bg-gradient-to-br from-[#E44E51] to-[#E44E51]/80 p-12 text-center">
          <h2 className="mb-4 text-4xl font-bold">Ready to Transform Your Content?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-white/90">
            Join thousands of creators and businesses using our platform to create
            professional videos in minutes.
          </p>
          <button
            onClick={() => navigate('/templates')}
            className="flex items-center gap-2 rounded-lg bg-white px-8 py-4 font-medium text-[#E44E51] hover:bg-gray-100"
          >
            Get Started Free
            <Zap className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};