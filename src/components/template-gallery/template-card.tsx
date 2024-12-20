import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'lucide-react';

interface TemplateCardProps {
  template: {
    id: string;
    title: string;
    description: string;
    categories: string[];
    icon: React.ElementType;
    previewUrl: string;
    features: string[];
  };
  onSelect: (template: TemplateCardProps['template']) => void;
}

export const TemplateCard: React.FC<TemplateCardProps> = ({ template, onSelect }) => {
  const Icon = template.icon;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      onClick={() => onSelect(template)}
      className="group cursor-pointer overflow-hidden rounded-lg border border-gray-800 bg-gray-900"
    >
      <div className="aspect-video w-full overflow-hidden">
        <img
          src={template.previewUrl}
          alt={template.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      
      <div className="p-6">
        <div className="mb-4 flex items-center gap-3">
          <div className="rounded-lg bg-[#E44E51]/10 p-2">
            <Icon className="h-5 w-5 text-[#E44E51]" />
          </div>
          <h3 className="text-lg font-semibold text-white">
            {template.title}
          </h3>
        </div>

        <p className="mb-4 text-sm text-gray-400">
          {template.description}
        </p>

        <div className="mb-4 flex flex-wrap gap-2">
          {template.categories.map((category) => (
            <span
              key={category}
              className="rounded-full bg-gray-800 px-2.5 py-0.5 text-xs text-gray-300"
            >
              {category}
            </span>
          ))}
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
            <Link className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="url"
            placeholder="Enter URL to generate video..."
            className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 pl-10 text-white placeholder-gray-500 focus:border-[#E44E51] focus:outline-none focus:ring-1 focus:ring-[#E44E51]"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(template);
            }}
            readOnly
          />
        </div>
      </div>
    </motion.div>
  );
};