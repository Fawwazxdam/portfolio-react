import React, { useState, useEffect } from 'react';
import { Github as GithubIcon, Star, Code2, ExternalLink, GitBranch } from 'lucide-react';
import { Card, Button, LoadingSpinner, Section } from '../index.js';
import { phases, githubRepos } from '../../config/githubRepos.js';

const colorMap = {
  'arcade-pink': {
    bg: 'bg-arcade-pink/15',
    text: 'text-arcade-pink',
    dot: 'bg-arcade-pink',
    border: 'border-arcade-pink/30',
  },
  'arcade-purple': {
    bg: 'bg-arcade-purple/15',
    text: 'text-arcade-purple',
    dot: 'bg-arcade-purple',
    border: 'border-arcade-purple/30',
  },
  'arcade-cyan': {
    bg: 'bg-arcade-cyan/15',
    text: 'text-arcade-cyan',
    dot: 'bg-arcade-cyan',
    border: 'border-arcade-cyan/30',
  },
};

const GithubSection = () => {
  const [repoMetadata, setRepoMetadata] = useState({});

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const response = await fetch(
          'https://api.github.com/users/Fawwazxdam/repos?sort=created&per_page=100&type=public'
        );
        if (!response.ok) return;
        const data = await response.json();
        const meta = {};
        data.forEach((repo) => {
          meta[repo.name] = {
            stars: repo.stargazers_count,
            language: repo.language,
            updatedAt: repo.updated_at,
            homepage: repo.homepage,
          };
        });
        setRepoMetadata(meta);
      } catch {
        // Silently fail — metadata is optional
      }
    };
    fetchMetadata();
  }, []);

  const reposByPhase = phases.map((phase) => ({
    ...phase,
    repos: githubRepos.filter((r) => r.phase === phase.id),
  }));

  const activePhaseIndex = phases.length - 1;

  return (
    <Section id="github" title="GITHUB JOURNEY" icon={GithubIcon} subtitle="From first commits to clean code">
      <div className="mb-10">
        <div className="flex items-center justify-center gap-2 mb-4">
          {phases.map((phase, i) => {
            const colors = colorMap[phase.color];
            const isActive = i <= activePhaseIndex;
            return (
              <React.Fragment key={phase.id}>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-4 h-4 rounded-full border-2 transition-all ${
                      isActive
                        ? `${colors.dot} ${colors.border} shadow-lg`
                        : 'bg-gray-200 dark:bg-white/10 border-gray-300 dark:border-white/20'
                    }`}
                  />
                  <span className={`mt-2 text-xs font-bold ${isActive ? colors.text : 'text-gray-400 dark:text-white/30'}`}>
                    {phase.label}
                  </span>
                </div>
                {i < phases.length - 1 && (
                  <div
                    className={`w-16 md:w-24 h-0.5 mb-6 transition-all ${
                      i < activePhaseIndex
                        ? 'bg-gradient-to-r from-arcade-pink to-arcade-purple'
                        : 'bg-gray-200 dark:bg-white/10'
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {reposByPhase.map((phase) => {
        if (phase.repos.length === 0) return null;
        const colors = colorMap[phase.color];
        return (
          <div key={phase.id} className="mb-12 last:mb-0">
            <div className="flex items-center mb-6">
              <div className={`w-3 h-3 rounded-full ${colors.dot} mr-3`} />
              <h3 className={`font-pixel text-sm ${colors.text}`}>{phase.label}</h3>
              <span className="ml-3 text-xs text-gray-400 dark:text-white/30">{phase.description}</span>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {phase.repos.map((repo) => {
                const meta = repoMetadata[repo.name] || {};
                return (
                  <Card key={repo.name} className="h-full flex flex-col">
                    <div className="flex items-center mb-3">
                      <GitBranch size={18} className={`mr-2 ${colors.text}`} />
                      <h4 className="text-sm font-bold line-clamp-1">{repo.name}</h4>
                    </div>

                    <p className="text-xs text-gray-500 dark:text-white/60 leading-relaxed mb-3 line-clamp-3">
                      {repo.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {repo.tech.map((t) => (
                        <span
                          key={t}
                          className={`px-2 py-0.5 ${colors.bg} ${colors.text} text-xs font-bold rounded-md`}
                        >
                          {t}
                        </span>
                      ))}
                      {meta.language && !repo.tech.includes(meta.language) && (
                        <span className={`px-2 py-0.5 ${colors.bg} ${colors.text} text-xs font-bold rounded-md`}>
                          {meta.language}
                        </span>
                      )}
                    </div>

                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs text-gray-400 dark:text-white/40">
                        {meta.stars > 0 && (
                          <span className="flex items-center gap-1">
                            <Star size={12} className="text-arcade-yellow" />
                            {meta.stars}
                          </span>
                        )}
                        {meta.updatedAt && (
                          <span>{new Date(meta.updatedAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                        )}
                      </div>
                      <a
                        href={repo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-1 text-xs font-bold ${colors.text} hover:underline`}
                      >
                        <ExternalLink size={12} />
                        View
                      </a>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        );
      })}

      <div className="text-center mt-8">
        <Button
          variant="secondary"
          onClick={() => window.open('https://github.com/Fawwazxdam', '_blank')}
        >
          <GithubIcon size={16} className="mr-2 inline" />
          VIEW ALL ON GITHUB
        </Button>
      </div>
    </Section>
  );
};

export default GithubSection;
