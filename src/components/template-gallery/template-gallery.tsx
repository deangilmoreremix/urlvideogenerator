import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Sparkles } from 'lucide-react';
import { templates } from '../../lib/templates';
import { TemplateCard } from './template-card';
import { VideoPreviewModal } from './video-preview-modal';

export const TemplateGallery = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<typeof templates[0] | null>(null);
  const navigate = useNavigate();

  const categories = Array.from(
    new Set(templates.flatMap((t) => t.categories))
  ).sort();

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch = 
      template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || template.categories.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#030711] px-6 py-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-4xl font-bold text-white">
                Video Generation Templates
              </h1>
              <Sparkles className="h-8 w-8 text-[#E44E51]" />
            </div>
            <p className="mt-2 text-lg text-gray-400">
              Transform any URL into engaging videos using our AI-powered templates
            </p>
          </div>
          <button
            onClick={() => navigate('/editor')}
            className="rounded-lg bg-[#E44E51] px-4 py-2 font-medium text-white hover:bg-[#E44E51]/90"
          >
            Open Editor
          </button>
        </div>

        <div className="mb-8 flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-gray-800 bg-gray-900 py-2 pl-10 pr-4 text-white placeholder-gray-500 focus:border-[#E44E51] focus:outline-none focus:ring-1 focus:ring-[#E44E51]"
            />
          </div>
          <select
            value={selectedCategory || ''}
            onChange={(e) => setSelectedCategory(e.target.value || null)}
            className="rounded-lg border border-gray-800 bg-gray-900 px-4 py-2 text-white focus:border-[#E44E51] focus:outline-none focus:ring-1 focus:ring-[#E44E51]"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredTemplates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              onSelect={setSelectedTemplate}
            />
          ))}
        </div>
      </div>

      {selectedTemplate && (
        <VideoPreviewModal
          isOpen={true}
          onClose={() => setSelectedTemplate(null)}
          template={selectedTemplate}
        />
      )}
    </div>
  );
};