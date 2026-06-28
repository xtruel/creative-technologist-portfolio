import React, { useState } from 'react';
import { timelineData, TimelineItem } from '../data/portfolioData';
import { Calendar, MapPin, ChevronRight, CornerDownRight } from 'lucide-react';

export default function AboutTimeline() {
  const [activeFilter, setActiveFilter] = useState<string>('ALL');

  const disciplines = ['ALL', 'Programming', 'Graffiti', 'Design', '3D', 'Research'];

  const filteredTimeline = activeFilter === 'ALL' 
    ? timelineData 
    : timelineData.filter(item => item.discipline === activeFilter);

  return (
    <div className="w-full">
      {/* Category Selection Filter Bar (Swiss Plate grid) */}
      <div className="flex flex-wrap gap-2 mb-10 border-b border-neutral-200 pb-6">
        {disciplines.map((disc) => (
          <button
            key={disc}
            onClick={() => setActiveFilter(disc)}
            className={`font-mono text-[9px] uppercase tracking-wider px-3 py-1.5 border transition-all duration-300 ${
              activeFilter === disc 
                ? 'bg-neutral-950 text-white border-neutral-950' 
                : 'bg-white text-neutral-500 border-neutral-200 hover:border-neutral-800'
            }`}
          >
            {disc === 'ALL' ? 'ALL_MILESTONES' : disc.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Main Timeline Stream */}
      <div className="space-y-12 relative before:absolute before:inset-y-0 before:left-3 md:before:left-1/2 before:w-[1px] before:bg-neutral-200">
        {filteredTimeline.map((item, index) => {
          const isEven = index % 2 === 0;
          return (
            <div 
              key={item.year + item.title}
              className={`flex flex-col md:flex-row relative items-start md:items-stretch ${
                isEven ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-3 md:left-1/2 w-2 h-2 rounded-full bg-neutral-950 -translate-x-[3.5px] top-6 z-10 border-4 border-white shadow-sm" />

              {/* Left Column or Right Column depending on alignment */}
              <div className="w-full md:w-[46%] pl-10 md:pl-0 md:px-6">
                <div className="glass-panel p-6 rounded-xl bg-white/40 hover:bg-white border border-neutral-200/60 hover:border-neutral-900 transition-all duration-500 hover:shadow-md">
                  
                  {/* Event metadata */}
                  <div className="flex items-center justify-between font-mono text-[8.5px] text-neutral-400 uppercase mb-3">
                    <span className="flex items-center space-x-1">
                      <Calendar size={10} />
                      <span>YEAR_{item.year}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <MapPin size={10} />
                      <span>{item.location}</span>
                    </span>
                  </div>

                  {/* Discipline tags */}
                  <div className="mb-2.5">
                    <span className="font-mono text-[7px] font-bold px-1.5 py-0.5 bg-neutral-900 text-white tracking-widest rounded uppercase">
                      {item.discipline}
                    </span>
                  </div>

                  {/* Title & Organization */}
                  <h3 className="font-serif text-xl text-neutral-900 tracking-tight font-medium">
                    {item.title}
                  </h3>
                  <div className="font-mono text-[10px] text-neutral-500 mb-4 font-semibold tracking-wider uppercase">
                    {item.role}
                  </div>

                  {/* Core description */}
                  <p className="font-sans text-xs text-neutral-600 leading-relaxed font-light mb-4">
                    {item.description}
                  </p>

                  {/* Bullet specifics */}
                  <ul className="space-y-1.5 pt-3 border-t border-dashed border-neutral-200 font-sans text-[11px] text-neutral-500 font-light">
                    {item.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start space-x-1.5">
                        <CornerDownRight size={10} className="mt-0.5 text-neutral-400 flex-shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>

                </div>
              </div>

              {/* Empty spacer spacer on other side for desktop */}
              <div className="hidden md:block w-[46%]" />

            </div>
          );
        })}
      </div>
    </div>
  );
}
