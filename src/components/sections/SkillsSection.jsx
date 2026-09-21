import React from 'react';
import { Sword } from '@phosphor-icons/react';
import { Star, Award } from 'lucide-react';
import { Card, Section } from '../index.js';

const categories = [
  {
    name: 'Frontend',
    color: 'arcade-cyan',
    skills: [
      { name: 'React.js', color: '#61DAFB' },
      { name: 'Next.js', color: '#000000' },
      { name: 'Vue.js', color: '#42B883' },
      { name: 'Astro', color: '#FF5D01' },
      { name: 'TypeScript', color: '#3178C6' },
    ],
  },
  {
    name: 'Backend',
    color: 'arcade-purple',
    skills: [
      { name: 'Laravel', color: '#FF2D20' },
      { name: 'Node.js', color: '#339933' },
      { name: 'Express.js', color: '#000000' },
      { name: 'Nest.js', color: '#E0234E' },
      { name: 'PHP', color: '#777BB4' },
    ],
  },
  {
    name: 'Database & API',
    color: 'arcade-pink',
    skills: [
      { name: 'MySQL', color: '#4479A1' },
      { name: 'PostgreSQL', color: '#4169E1' },
      { name: 'REST API', color: '#009688' },
    ],
  },
  {
    name: 'Tools & DevOps',
    color: 'arcade-yellow',
    skills: [
      { name: 'Git', color: '#F05032' },
      { name: 'Docker', color: '#2496ED' },
      { name: 'CI/CD', color: '#40A5F0' },
      { name: 'Linux', color: '#FCC624' },
    ],
  },
  {
    name: 'Design & Other',
    color: 'arcade-orange',
    skills: [
      { name: 'UI/UX', color: '#FF7262' },
      { name: 'Figma', color: '#A259FF' },
      { name: 'Problem Solving', color: '#00BCD4' },
      { name: 'Team Leadership', color: '#9C27B0' },
    ],
  },
];

const colorClassMap = {
  'arcade-cyan': { bg: 'bg-arcade-cyan/15', text: 'text-arcade-cyan', dot: 'bg-arcade-cyan' },
  'arcade-purple': { bg: 'bg-arcade-purple/15', text: 'text-arcade-purple', dot: 'bg-arcade-purple' },
  'arcade-pink': { bg: 'bg-arcade-pink/15', text: 'text-arcade-pink', dot: 'bg-arcade-pink' },
  'arcade-yellow': { bg: 'bg-arcade-yellow/15', text: 'text-arcade-yellow', dot: 'bg-arcade-yellow' },
  'arcade-orange': { bg: 'bg-arcade-orange/15', text: 'text-arcade-orange', dot: 'bg-arcade-orange' },
};

const SkillsSection = () => {
  return (
    <Section id="skills" title="SKILLS & TECH STACK" icon={Sword}>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {categories.map((cat) => {
          const cc = colorClassMap[cat.color];
          return (
            <Card key={cat.name}>
              <div className="flex items-center mb-4">
                <div className={`w-2 h-2 rounded-full ${cc.dot} mr-2`} />
                <h3 className={`font-pixel text-xs ${cc.text}`}>{cat.name}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg ${cc.bg} hover:scale-105 transition-transform duration-200`}
                  >
                    <div
                      className="w-3 h-3 rounded-sm flex-shrink-0"
                      style={{ backgroundColor: skill.color }}
                    />
                    <span className="text-xs font-bold text-gray-700 dark:text-white/80">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          );
        })}
      </div>

      <div className="flex items-center justify-center gap-4 flex-wrap">
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10">
          <Award size={16} className="text-arcade-yellow" />
          <span className="text-xs font-bold text-gray-700 dark:text-white/80">
            Fullstack Web Developer
          </span>
          <span className="text-xs text-gray-400 dark:text-white/40">
            LSK TIK — 2022
          </span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10">
          <Star size={16} className="text-arcade-pink" />
          <span className="text-xs font-bold text-gray-700 dark:text-white/80">
            5+ Projects Shipped
          </span>
        </div>
      </div>
    </Section>
  );
};

export default SkillsSection;
