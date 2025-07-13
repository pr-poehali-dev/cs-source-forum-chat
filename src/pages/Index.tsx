import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useServerStats } from "@/hooks/useServerStats";
import { Navigation } from "@/components/home/Navigation";
import { HeroSection } from "@/components/home/HeroSection";
import { ServerStatusCard } from "@/components/home/ServerStatusCard";
import { PlayersCard } from "@/components/home/PlayersCard";
import { ServerStatsCard } from "@/components/home/ServerStatsCard";
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <ServerStatusCard 
              serverInfo={serverInfo}
              isLoading={isLoading}
              error={error}
              lastUpdate={lastUpdate}
              onRefetch={refetch}
            />

            <div className="space-y-6">
              <div className="bg-cs-gray/80 border border-cs-orange/20 rounded-lg p-4 backdrop-blur-sm">
                <a
                  href="http://www.myarena.ru/game-monitoring.html?game=110421"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="//img.myarena.ru/110421/560_1_FF9A37_FFFFFF_FF9A37_0.png"
                    alt="Статистика сервера #1"
                    className="rounded hover:opacity-80 transition-opacity w-full"
                  />
                </a>
              </div>
              
              <div className="bg-cs-gray/80 border border-cs-orange/20 rounded-lg p-4 backdrop-blur-sm">
                <a
                  href="http://www.myarena.ru/game-monitoring.html?game=108751"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="//img.myarena.ru/108751/560.png"
                    alt="Статистика сервера #2"
                    className="rounded hover:opacity-80 transition-opacity w-full"
                  />
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Player Statistics */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <h3 className="font-orbitron text-3xl font-bold text-cs-orange mb-8 text-center">
            СТАТИСТИКА ИГРОКОВ
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <PlayersCard 
              players={players}
              serverInfo={serverInfo}
              isLoading={isLoading}
              error={error}
              lastUpdate={lastUpdate}
              onRefetch={refetch}
            />
            <ServerStatsCard 
              players={players}
              serverInfo={serverInfo}
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

      {/* Ranking System */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <h3 className="font-orbitron text-3xl font-bold text-cs-orange mb-8 text-center">
            СИСТЕМА РАНГОВ
          </h3>
          <div className="text-center mb-6">
            <p className="text-cs-light/80 font-orbitron text-sm tracking-widest">
              СЕРВЕР: <span className="text-cs-orange font-mono">45.136.205.92:27015</span>
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto mb-12">
            <TopPlayersCard players={players} topPlayers={topPlayers} />

            {/* Rank System */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {[
                { name: "НОВИЧОК", minScore: 500, rating: 500, color: "bg-gradient-to-r from-gray-500 to-gray-700", icon: "User" },
                { name: "СОЛДАТ", minScore: 2000, rating: 2000, color: "bg-gradient-to-r from-red-500 to-red-700", icon: "Crosshair" },
                { name: "БОЕЦ", minScore: 4000, rating: 4000, color: "bg-gradient-to-r from-orange-500 to-orange-700", icon: "Target" },
                { name: "ВЕТЕРАН", minScore: 7000, rating: 7000, color: "bg-gradient-to-r from-green-500 to-green-700", icon: "Shield" },
                { name: "ЭКСПЕРТ", minScore: 10000, rating: 10000, color: "bg-gradient-to-r from-blue-500 to-blue-700", icon: "Award" },
                { name: "МАСТЕР", minScore: 15000, rating: 15000, color: "bg-gradient-to-r from-purple-500 to-purple-700", icon: "Star" },
                { name: "ЛЕГЕНДА", minScore: 20000, rating: 20000, color: "bg-gradient-to-r from-yellow-400 to-yellow-600", icon: "Crown" }
              ].map((rank, index) => {
                // Подсчитываем сколько игроков имеют этот ранг
                const playersWithRank = topPlayers.filter(player => {
                  const playerRating = parseInt(player.score.replace(/,/g, '')) + (parseFloat(player.kd) * 1000);
                  return playerRating >= rank.rating && (index === 6 || playerRating < (index < 6 ? [500, 2000, 4000, 7000, 10000, 15000, 20000][index + 1] : Infinity));
                }).length;

                return (
                  <Card
                    key={index}
                    className="bg-cs-gray/80 border-cs-orange/20 backdrop-blur-sm hover:scale-105 transition-transform group"
                  >
                    <CardHeader className="text-center pb-3">
                      <div className={`w-12 h-12 rounded-full mx-auto mb-2 ${rank.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <Icon name={rank.icon as any} size={20} className="text-white" />
                      </div>
                      <CardTitle className="text-cs-light font-orbitron text-sm">
                        {rank.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center space-y-1">
                      <div className="text-xs text-cs-orange font-mono">
                        {rank.minScore.toLocaleString('ru-RU')}+ рейтинга
                      </div>
                      <div className="text-xs text-cs-light/60">
                        Формула: Очки + K/D×1000
                      </div>
                      <div className={`text-xs font-bold ${playersWithRank > 0 ? 'text-green-400' : 'text-gray-500'}`}>
                        {playersWithRank} {playersWithRank === 1 ? 'игрок' : playersWithRank > 4 ? 'игроков' : 'игрока'}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Server Activity Stats */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-cs-gray/80 border-cs-orange/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-cs-light font-orbitron flex items-center">
                    <Icon name="Users" size={20} className="mr-2 text-cs-orange" />
                    Онлайн сейчас
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={`text-3xl font-bold font-mono ${
                    serverInfo.status === 'online' ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {serverInfo.players}
                  </div>
                  <p className="text-cs-light/70">из {serverInfo.maxPlayers} мест</p>
                </CardContent>
              </Card>

              <Card className="bg-cs-gray/80 border-cs-orange/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-cs-light font-orbitron flex items-center">
                    <Icon name="Target" size={20} className="mr-2 text-cs-orange" />
                    Общие убийства
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-cs-orange font-mono">
                    {players.reduce((sum, player) => sum + player.kills, 0).toLocaleString('ru-RU')}
                  </div>
                  <p className="text-cs-light/70">Всего на сервере</p>
                </CardContent>
              </Card>

              <Card className="bg-cs-gray/80 border-cs-orange/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-cs-light font-orbitron flex items-center">
                    <Icon name="Trophy" size={20} className="mr-2 text-cs-orange" />
                    Лучший K/D
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-500 font-mono">
                    {players.length > 0 ? 
                      Math.max(...players.map(p => p.deaths > 0 ? p.kills / p.deaths : p.kills)).toFixed(2) : 
                      '0.00'
                    }
                  </div>
                  <p className="text-cs-light/70">Соотношение убийств</p>
                </CardContent>
              </Card>

              <Card className="bg-cs-gray/80 border-cs-orange/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-cs-light font-orbitron flex items-center">
                    <Icon name="Zap" size={20} className="mr-2 text-cs-orange" />
                    Средний пинг
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={`text-3xl font-bold font-mono ${
                    players.length > 0 && players.reduce((sum, p) => sum + p.ping, 0) / players.length < 50 ? 'text-green-500' : 
                    players.length > 0 && players.reduce((sum, p) => sum + p.ping, 0) / players.length < 100 ? 'text-yellow-500' : 'text-red-500'
                  }`}>
                    {players.length > 0 ? 
                      Math.round(players.reduce((sum, p) => sum + p.ping, 0) / players.length) + 'ms' : 
                      serverInfo.ping + 'ms'
                    }
                  </div>
                  <p className="text-cs-light/70">Соединение</p>
                </CardContent>
              </Card>
            </div>
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