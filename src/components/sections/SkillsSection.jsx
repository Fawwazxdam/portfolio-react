import React from 'react';
import { Sword } from '@phosphor-icons/react';
import { Terminal, Code, Zap, Globe, Star } from 'lucide-react';
import { Card, Section } from '../index.js';

const skills = [
  { name: 'Laravel', level: 85, icon: Terminal, color: '#FF2D20' },
  { name: 'Next.js', level: 80, icon: Code, color: '#000000' },
  { name: 'React.js', level: 85, icon: Zap, color: '#61DAFB' },
  { name: 'Node.js', level: 85, icon: Terminal, color: '#339933' },
  { name: 'Vue.js', level: 80, icon: Code, color: '#42B883' },
  { name: 'Express.js', level: 80, icon: Globe, color: '#000000' },
];

const otherTechs = ['PHP', 'Astro', 'Nest.js', 'API Integration', 'Git', 'CI/CD', 'Docker', 'UI/UX', 'Graphic Design', 'Problem Solving'];

const SkillsSection = () => {
  const visibleSkills = skills;

  return (
    <Section id="skills" title="SKILLS" icon={Sword}>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {visibleSkills.map((skill) => {
          const IconComponent = skill.icon;
          return (
            <Card key={skill.name}>
              <div className="flex items-center mb-3">
                <IconComponent size={24} className="mr-2" style={{ color: skill.color }} />
                <h3 className="text-base font-bold">{skill.name}</h3>
              </div>
              <div className="w-full rounded-full h-2 bg-gray-200 dark:bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1000 delay-300"
                  style={{ width: `${skill.level}%`, backgroundColor: skill.color }}
                />
              </div>
              <div className="text-right mt-1 font-bold text-xs text-gray-400 dark:text-white/50">{skill.level}%</div>
            </Card>
          );
        })}
      </div>

      <div className="mt-12 text-center">
        <h3 className="font-pixel text-xs text-arcade-cyan mb-6">OTHER TECHNOLOGIES</h3>
        <div className="flex flex-wrap justify-center gap-2">
          {otherTechs.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-600 dark:text-white/60 text-xs hover:bg-gray-200 dark:hover:bg-white/10 transition-colors duration-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-8 text-center">
        <Card className="max-w-md mx-auto">
          <div className="flex items-center justify-center mb-3">
            <Star size={24} className="mr-2 text-arcade-yellow" />
            <h4 className="font-pixel text-xs text-arcade-yellow">Certification</h4>
          </div>
          <p className="text-sm text-gray-600 dark:text-white/70">
            <strong>Fullstack Web Developer</strong><br />
            LSK TIK - 2022
          </p>
        </Card>
      </div>
    </Section>
  );
};

export default SkillsSection;
