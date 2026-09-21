import React from "react";
import { UserCircle } from "@phosphor-icons/react";
import { User, Coffee, Star, Terminal } from "lucide-react";
import { Card, Section } from "../index.js";

const AboutSection = () => {
  return (
    <Section id="about" title="ABOUT ME" icon={UserCircle}>
      <div className="grid md:grid-cols-2 gap-6 items-start">
        <Card>
          <div className="flex items-center mb-4">
            <User size={32} className="mr-3 text-arcade-orange" />
            <h3 className="font-pixel text-sm text-arcade-orange">
              Developer Profile
            </h3>
          </div>
          <div className="space-y-3 text-sm leading-relaxed text-gray-600 dark:text-white/70">
            <p>
              I am a Fullstack Web Developer with over 3 years of experience
              specializing in building robust, scalable web architectures. I
              have a strong track record of developing end-to-end
              solutions—from engineering complex ERP systems and dynamic
              digital registration flows to structuring reliable APIs. My core
              expertise revolves around Laravel, Next.js, React, and Vue,
              heavily utilizing JSX/TSX for component-driven frontend development.
              Whether designing relational database schemas or deploying
              applications on servers, my focus is always on delivering
              seamless, maintainable, and high-performing digital
              experiences.
            </p>
          </div>
        </Card>

        <div className="space-y-6">
          <Card>
            <div className="flex items-center mb-3">
              <Coffee size={24} className="mr-2 text-arcade-purple" />
              <h4 className="font-pixel text-xs text-arcade-purple">
                Quick Facts
              </h4>
            </div>
            <ul className="space-y-1.5 text-sm text-gray-600 dark:text-white/70">
              <li>Solid in Laravel & Javascript Ecosystem</li>
              <li>Fullstack Developer & Graphic Designer</li>
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
                <div className="text-xs opacity-60">
                  State University of Malang (2018-2022)
                </div>
              </div>
              <div>
                <div className="font-bold">Fullstack Developer Bootcamp</div>
                <div className="text-xs opacity-60">
                  LKP Karisma Academy (2022)
                </div>
              </div>
            </div>
          </Card>
        </div>

        <Card className="md:col-span-2">
          <div className="flex items-center mb-3">
            <Star size={24} className="mr-2 text-arcade-cyan" />
            <h4 className="font-pixel text-xs text-arcade-cyan">Experience</h4>
          </div>
          <div className="space-y-2 text-sm text-gray-600 dark:text-white/70">
            <div>
              <div className="font-bold">Frontend Programmer</div>
              <div className="text-xs opacity-60">
                Muatmuat (Jul 2025 - Oct 2025)
              </div>
            </div>
            <div>
              <div className="font-bold">Fullstack Developer</div>
              <div className="text-xs opacity-60">
                CV. Biliva Nature (Jun 2023 - Jan 2025)
              </div>
            </div>
            <div>
              <div className="font-bold">Freelance Web Developer</div>
              <div className="text-xs opacity-60">Remote (2023 - now)</div>
            </div>
          </div>
        </Card>
      </div>
    </Section>
  );
};

export default AboutSection;
