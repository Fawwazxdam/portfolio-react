import React from 'react';
import { UserCircle } from '@phosphor-icons/react';
import { User, Coffee, Star, Terminal } from 'lucide-react';
import { Card, Section } from '../index.js';

const AboutSection = () => {
  return (
    <Section id="about" title="ABOUT ME" icon={UserCircle}>
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div>
          <Card>
            <div className="flex items-center mb-4">
              <User size={32} className="mr-3 text-arcade-orange" />
              <h3 className="font-pixel text-sm text-arcade-orange">Developer Profile</h3>
            </div>
            <div className="space-y-3 text-sm leading-relaxed text-gray-600 dark:text-white/70">
              <p>
                I am a Web Developer with 3+ years of experience
                in developing modern web applications using technologies like Laravel, Express.js, Next.js, and Vue.js.
              </p>
              <p>
                Experienced as a Fullstack Developer at CV. Biliva Nature Indonesia,
                Frontend Programmer at Muatmuat, focusing on ERP application development and management systems.
              </p>
              <p>
                Alumni of D2 Computer Science at UM and graduate of intensive Fullstack Web Developer bootcamp
                with certification from LSK TIK (Information Technology Competency Certification Agency).
              </p>
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <div className="flex items-center mb-3">
              <Coffee size={24} className="mr-2 text-arcade-purple" />
              <h4 className="font-pixel text-xs text-arcade-purple">Fun Facts</h4>
            </div>
            <ul className="space-y-1.5 text-sm text-gray-600 dark:text-white/70">
              <li>Expert in Laravel & Javascript Ecosystem</li>
              <li>Web Developer & Graphic Designer</li>
              <li>Based in Surabaya, Indonesia</li>
            </ul>
          </Card>

          <Card>
            <div className="flex items-center mb-3">
              <Terminal size={24} className="mr-2 text-arcade-pink" />
              <h4 className="font-pixel text-xs text-arcade-pink">Education</h4>
            </div>
            <div className="space-y-2 text-sm text-gray-600 dark:text-white/70">
              <div>
                <div className="font-bold">D2 Computer Science</div>
                <div className="text-xs opacity-60">State University of Malang (2018-2022)</div>
              </div>
              <div>
                <div className="font-bold">Fullstack Developer Bootcamp</div>
                <div className="text-xs opacity-60">LKP Karisma Academy (2022)</div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center mb-3">
              <Star size={24} className="mr-2 text-arcade-cyan" />
              <h4 className="font-pixel text-xs text-arcade-cyan">Experience</h4>
            </div>
            <div className="space-y-2 text-sm text-gray-600 dark:text-white/70">
              <div>
                <div className="font-bold">Frontend Programmer</div>
                <div className="text-xs opacity-60">Muatmuat (Jul - Oct 2024)</div>
              </div>
              <div>
                <div className="font-bold">Fullstack Developer</div>
                <div className="text-xs opacity-60">CV. Biliva Nature (Jun 2023 - Jan 2025)</div>
              </div>
              <div>
                <div className="font-bold">Freelance Web Developer</div>
                <div className="text-xs opacity-60">Remote (2023 - now)</div>
              </div>
            </div>
          </Card>
          
        </div>
      </div>
    </Section>
  );
};

export default AboutSection;
