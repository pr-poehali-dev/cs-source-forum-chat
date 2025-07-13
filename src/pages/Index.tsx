import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useServerStats } from "@/hooks/useServerStats";
import { Navigation } from "@/components/home/Navigation";
import { HeroSection } from "@/components/home/HeroSection";
import { ServerStatusCard } from "@/components/home/ServerStatusCard";
import { PlayersCard } from "@/components/home/PlayersCard";
import { TopPlayersCard } from "@/components/home/TopPlayersCard";
import { generateTopPlayers, getRankInfo } from "@/utils/playerUtils";
import Icon from "@/components/ui/icon";

const Index = () => {
  const { serverInfo, players, isLoading, error, lastUpdate, refetch } = useServerStats(true, 30000);
  
  const topPlayers = generateTopPlayers(players);
  
  const servers = [
    { name: "de_dust2", players: "32/32", ping: "12ms", status: "online" },
    { name: "de_mirage", players: "28/32", ping: "18ms", status: "online" },
    { name: "cs_office", players: "16/20", ping: "25ms", status: "online" },
    { name: "de_inferno", players: "0/32", ping: "---", status: "offline" },
  ];

  const ranks = [
    { name: "Новичок", xp: 100, maxXp: 100, color: "bg-gray-400" },
    { name: "Боец", xp: 250, maxXp: 500, color: "bg-green-500" },
    { name: "Ветеран", xp: 750, maxXp: 1000, color: "bg-blue-500" },
    { name: "Эксперт", xp: 1200, maxXp: 2000, color: "bg-purple-500" },
    { name: "Легенда", xp: 2800, maxXp: 5000, color: "bg-cs-orange" },
  ];

  return (
    <div className="min-h-screen relative bg-cs-dark overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{
          backgroundImage: "url('/img/a298e115-709d-4b48-8f88-25f8aba46ef3.jpg')"
        }}
      ></div>
      
      {/* Dark overlay for better readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-cs-dark/60 via-cs-dark/70 to-cs-dark/80"></div>
      
      {/* Content overlay */}
      <div className="relative z-10">
        <Navigation />
        <HeroSection />



      {/* Server Monitoring */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <h3 className="font-orbitron text-3xl font-bold text-cs-orange mb-8 text-center">
            МОНИТОРИНГ СЕРВЕРОВ
          </h3>

          {/* Server Connection Info */}
          <div className="max-w-4xl mx-auto mb-12">
            <ServerStatusCard 
              serverInfo={serverInfo}
              isLoading={isLoading}
              error={error}
              lastUpdate={lastUpdate}
              onRefetch={refetch}
            />
          </div>

        </div>
      </section>



      {/* Telegram Channel */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-r from-blue-600/20 to-cs-gray/90 border-2 border-blue-500/40 backdrop-blur-sm hover:border-blue-500/60 transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0 md:space-x-8">
                  {/* Left side - Icon and Info */}
                  <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
                    <div className="w-20 h-20 bg-blue-500 rounded-xl flex items-center justify-center text-white">
                      <Icon name="Send" size={40} className="rotate-45" />
                    </div>
                    
                    <div className="text-center md:text-left">
                      <h3 className="font-orbitron text-3xl font-black text-cs-orange mb-2">
                        НАШ TELEGRAM
                      </h3>
                      <p className="text-cs-light/80 text-lg mb-3">
                        Новости, турниры и общение с игроками
                      </p>
                      <div className="bg-cs-dark/50 px-4 py-2 rounded-lg border border-blue-500/20 inline-block">
                        <span className="text-blue-400 font-mono text-xl">@realguys90x</span>
                      </div>
                    </div>
                  </div>

                  {/* Right side - Button */}
                  <div className="flex flex-col items-center space-y-3">
                    <a 
                      href="https://t.me/realguys90x" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <Button className="bg-blue-500 hover:bg-blue-600 text-white font-orbitron font-bold py-4 px-8 text-lg">
                        <Icon name="Send" size={24} className="mr-3 rotate-45" />
                        ПОДПИШИСЬ
                      </Button>
                    </a>
                    <div className="text-sm text-cs-light/60 text-center">
                      Будь в курсе всех событий!
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>



      {/* Footer */}
      <footer className="bg-cs-gray border-t border-cs-orange/20 py-8 px-6">
        <div className="container mx-auto text-center">
          <p className="text-cs-light/70 font-mono">
            © 2024 Counter-Strike: Source Community • Готовы к легендарным
            битвам
          </p>
        </div>
      </footer>
      </div>
    </div>
  );
};

export default Index;