import React, { useState, useEffect, useCallback } from "react";
import {
  ArrowUp,
  Terminal,
  Github,
  Linkedin,
  Instagram,
  Mail,
  Phone,
  Globe,
  Download,
  MessageCircle,
} from "lucide-react";
import { EnvelopeSimple, UserSwitchIcon } from "@phosphor-icons/react";
import { Navbar, Footer, Button, Card } from "../components/index.js";
import { SectionHeader } from "../components/Section.jsx";
import ArcadeHub from "../components/arcade/ArcadeHub.jsx";
import ConfettiEffect from "../components/arcade/ConfettiEffect.jsx";
import ScoreBoard from "../components/arcade/ScoreBoard.jsx";
import DevTyping from "../components/games/DevTyping.jsx";
import TechMemory from "../components/games/TechMemory.jsx";
import BugSquasher from "../components/games/BugSquasher.jsx";
import ArticlePuzzle from "../components/games/ArticlePuzzle.jsx";
import AboutSection from "../components/sections/AboutSection.jsx";
import ProjectsSection from "../components/sections/ProjectsSection.jsx";
import SkillsSection from "../components/sections/SkillsSection.jsx";
import ArticlesSection from "../components/sections/ArticlesSection.jsx";
import cvIndonesian from "../assets/CV ADAM 26N-ID.pdf";

const Home = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [completedGames, setCompletedGames] = useState(() => {
    const saved = localStorage.getItem("arcadeCompleted");
    return saved ? JSON.parse(saved) : [];
  });
  const [activeGame, setActiveGame] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    localStorage.setItem("arcadeCompleted", JSON.stringify(completedGames));
  }, [completedGames]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleGameComplete = useCallback((gameId) => {
    setCompletedGames((prev) => [...new Set([...prev, gameId])]);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 4000);
    setActiveGame(null);
  }, []);

  const handleCloseGame = useCallback(() => {
    setActiveGame(null);
  }, []);

  return (
    <>
      <div className="flex flex-col min-h-screen text-gray-900 dark:text-white font-mono overflow-x-hidden gradient-mesh-light scanline-overlay">
        <Navbar currentPage="home" showArticlesLink={true} />

        <main className="pt-20">
          <div className="fixed top-20 right-4 z-40 hidden md:block">
            <ScoreBoard completedGames={completedGames} />
          </div>

          <section className="py-16 px-4 text-center">
            <div className="mb-6">
              <Terminal size={48} className="mx-auto text-arcade-orange" />
              {/* <UserSwitchIcon size={48} className="mx-auto text-arcade-orange" /> */}
            </div>
            <h1 className="font-pixel text-2xl md:text-5xl text-arcade-orange neon-orange mb-4">
              ADAM FAWWAZ HAQ
            </h1>
            <p className="text-lg text-gray-600 dark:text-white/60 mb-2">
              WEB DEVELOPER
            </p>
            <p className="text-sm text-gray-400 dark:text-white/40 max-w-lg mx-auto">
              Fullstack Web Developer specializing in end-to-end solutions. Crafting seamless digital experiences with Laravel and the JavaScript ecosystem.
            </p>
          </section>

          <AboutSection />
          <ProjectsSection />
          <SkillsSection />
          <ArticlesSection />
          <section id="arcade" className="py-16 px-4">
            <ArcadeHub
              onPlayGame={setActiveGame}
              completedGames={completedGames}
            />
          </section>

          <section id="contact" className="py-16 px-4">
            <div className="max-w-6xl mx-auto">
              <SectionHeader
                icon={EnvelopeSimple}
                title="CONTACT"
                subtitle="Get in touch anytime"
              />
              <div className="grid md:grid-cols-2 gap-8">
                <Card>
                  <h3 className="text-xl font-bold mb-4">
                    Let&apos;s Collaborate!
                  </h3>
                  <p className="text-sm mb-6 text-gray-500 dark:text-white/60 leading-relaxed">
                    Have an interesting project or want to discuss web
                    technologies?
                  </p>
                  <div className="space-y-3 text-sm text-gray-500 dark:text-white/60">
                    <div className="flex items-center">
                      <Mail size={18} className="mr-3 text-arcade-orange" />
                      fawwazadam1005@gmail.com
                    </div>
                    <div className="flex items-center">
                      <Phone size={18} className="mr-3 text-arcade-purple" />
                      +62 812 5235 5711
                    </div>
                    <div className="flex items-center">
                      <Globe size={18} className="mr-3 text-arcade-cyan" />
                      Surabaya, Indonesia
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3 mt-6">
                    <Button
                      variant="secondary"
                      className="text-xs"
                      onClick={() =>
                        window.open("https://github.com/Fawwazxdam", "_blank")
                      }
                    >
                      <Github size={16} className="mr-1 inline" />
                      GITHUB
                    </Button>
                    <Button
                      variant="secondary"
                      className="text-xs"
                      onClick={() =>
                        window.open(
                          "https://linkedin.com/in/adam-fawwaz",
                          "_blank",
                        )
                      }
                    >
                      <Linkedin size={16} className="mr-1 inline" />
                      LINKEDIN
                    </Button>
                    <Button
                      variant="outline"
                      className="text-xs"
                      onClick={() =>
                        window.open(
                          "https://instagram.com/youngdam_free",
                          "_blank",
                        )
                      }
                    >
                      <Instagram size={16} className="mr-1 inline" />
                      INSTAGRAM
                    </Button>
                    <Button
                      variant="outline"
                      className="text-xs"
                      onClick={() => window.open(cvIndonesian, "_blank")}
                    >
                      <Download size={16} className="mr-1 inline" />
                      CV
                    </Button>
                  </div>
                </Card>
                <Card>
                  <h3 className="text-xl font-bold mb-4">Send Message</h3>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full p-3 rounded-xl glass-input text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/30"
                    />
                    <input
                      type="email"
                      placeholder="email@domain.com"
                      className="w-full p-3 rounded-xl glass-input text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/30"
                    />
                    <textarea
                      rows="4"
                      placeholder="Write your message..."
                      className="w-full p-3 rounded-xl glass-input text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/30 resize-none"
                    ></textarea>
                    <Button className="w-full text-xs">
                      <MessageCircle size={16} className="mr-2 inline" />
                      LET'S COLLABORATE
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>

      {showConfetti && <ConfettiEffect active={showConfetti} />}

      {activeGame === "typing" && (
        <DevTyping
          onComplete={() => handleGameComplete("typing")}
          onClose={handleCloseGame}
        />
      )}
      {activeGame === "memory" && (
        <TechMemory
          onComplete={() => handleGameComplete("memory")}
          onClose={handleCloseGame}
        />
      )}
      {activeGame === "squasher" && (
        <BugSquasher
          onComplete={() => handleGameComplete("squasher")}
          onClose={handleCloseGame}
        />
      )}
      {activeGame === "puzzle" && (
        <ArticlePuzzle
          onComplete={() => handleGameComplete("puzzle")}
          onClose={handleCloseGame}
        />
      )}

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-4 rounded-2xl glass border border-arcade-orange/30 text-arcade-orange hover:bg-arcade-orange/10 transition-all duration-300 transform hover:scale-110 shadow-lg z-50"
        >
          <ArrowUp size={24} />
        </button>
      )}
    </>
  );
};

export default Home;
