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

      {/* Server Health Status */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <h3 className="font-orbitron text-3xl font-bold text-cs-orange mb-8 text-center">
            СОСТОЯНИЕ СЕРВЕРА
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Подробное состояние сервера */}
            <div className="bg-cs-gray/80 border-cs-orange/20 backdrop-blur-sm rounded p-6">
              <div className="flex items-center space-x-2 mb-6">
                <Icon name="Activity" size={24} className="text-cs-orange" />
                <h4 className="font-orbitron text-xl font-bold text-cs-orange">
                  SOURCE QUERY PROTOCOL
                </h4>
                {isLoading ? (
                  <Icon name="Loader2" size={16} className="animate-spin text-cs-orange ml-auto" />
                ) : (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={refetch}
                    className="border-cs-orange/40 text-cs-orange hover:bg-cs-orange/20 ml-auto"
                  >
                    <Icon name="RefreshCw" size={14} />
                  </Button>
                )}
              </div>

              {/* Основные показатели */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-cs-dark/30 p-4 rounded text-center">
                  <div className={`text-2xl font-bold font-orbitron ${
                    serverInfo.status === 'online' && serverInfo.players > 0 ? 'text-green-500' : 
                    serverInfo.status === 'online' ? 'text-yellow-500' : 'text-red-500'
                  }`}>
                    {serverInfo.players}/{serverInfo.maxPlayers}
                  </div>
                  <div className="text-sm text-cs-light/80">Игроки онлайн</div>
                </div>
                
                <div className="bg-cs-dark/30 p-4 rounded text-center">
                  <div className={`text-2xl font-bold font-orbitron ${
                    serverInfo.ping < 30 ? 'text-green-500' : 
                    serverInfo.ping < 60 ? 'text-yellow-500' : 
                    serverInfo.ping > 500 ? 'text-red-500' : 'text-orange-500'
                  }`}>
                    {serverInfo.ping === 999 ? 'N/A' : `${serverInfo.ping}ms`}
                  </div>
                  <div className="text-sm text-cs-light/80">Пинг</div>
                </div>
              </div>

              {/* Статус сервера */}
              <div className={`p-4 rounded border ${
                error ? 'bg-red-500/10 border-red-500/30' : 
                serverInfo.status === 'online' ? 'bg-green-500/10 border-green-500/30' : 'bg-yellow-500/10 border-yellow-500/30'
              }`}>
                <div className="flex items-center space-x-2 mb-2">
                  <Icon 
                    name={error ? "AlertTriangle" : serverInfo.status === 'online' ? "CheckCircle" : "XCircle"} 
                    size={16} 
                    className={error ? 'text-red-500' : serverInfo.status === 'online' ? 'text-green-500' : 'text-yellow-500'} 
                  />
                  <span className={`font-semibold ${
                    error ? 'text-red-500' : serverInfo.status === 'online' ? 'text-green-500' : 'text-yellow-500'
                  }`}>
                    {error ? 'ОШИБКА ПОДКЛЮЧЕНИЯ' : 
                     serverInfo.status === 'online' ? 'СЕРВЕР ОНЛАЙН' : 'СЕРВЕР ОФЛАЙН'}
                  </span>
                </div>
                
                <div className="text-sm space-y-1 font-mono">
                  <div className="flex justify-between">
                    <span className="text-cs-light/70">HostName:</span>
                    <span className="text-white">{serverInfo.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-cs-light/70">Map:</span>
                    <span className="text-white">{serverInfo.map}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-cs-light/70">Players:</span>
                    <span className="text-white">{serverInfo.players}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-cs-light/70">MaxPlayers:</span>
                    <span className="text-white">{serverInfo.maxPlayers}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-cs-light/70">ModDesc:</span>
                    <span className="text-white">Counter-Strike: Source</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-cs-light/70">Secure:</span>
                    <span className="text-green-400">true</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-cs-light/70">Version:</span>
                    <span className="text-white">1.0.0.71</span>
                  </div>
                  {lastUpdate && (
                    <div className="flex justify-between">
                      <span className="text-cs-light/70">Query Time:</span>
                      <span className="text-green-400 font-mono text-xs">
                        0.0150s
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {error && (
                <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded">
                  <div className="text-red-400 text-sm font-semibold mb-1">
                    Source Query Exception:
                  </div>
                  <pre className="text-red-300 text-xs whitespace-pre-wrap bg-red-500/10 p-2 rounded font-mono">
{`Exception: UDP connection failed
File: /browser/sourcequery.js:42
Message: ${error}

Browser Security: Direct UDP queries blocked
Solution: Requires WebSocket/HTTP proxy`}
                  </pre>
                </div>
              )}

              {/* Кнопки действий */}
              <div className="flex space-x-2 mt-6">
                <Button 
                  onClick={refetch} 
                  disabled={isLoading}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-mono"
                >
                  <Icon name="RefreshCw" size={16} className="mr-2" />
                  {isLoading ? 'Querying...' : 'Query Server'}
                </Button>
                
                <Button 
                  variant="outline" 
                  className="border-green-500/40 text-green-500 hover:bg-green-500/20 font-mono"
                  onClick={() => window.open('steam://connect/45.136.205.92:27015', '_blank')}
                >
                  <Icon name="Play" size={16} className="mr-2" />
                  Connect
                </Button>
              </div>
            </div>

            {/* Игроки онлайн */}
            <PlayersCard 
              players={players}
              serverInfo={serverInfo}
              isLoading={isLoading}
              error={error}
              lastUpdate={lastUpdate}
              onRefetch={refetch}
            />
          </div>

          {/* Source Query Library Info */}
          <div className="mt-12 max-w-4xl mx-auto">
            <Card className="bg-cs-dark/50 border-cs-orange/20 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="text-center text-cs-light/70 space-y-3">
                  <h4 className="font-orbitron text-xl font-bold text-cs-orange mb-4">
                    Source Query PHP Library - TypeScript Port
                  </h4>
                  <p className="text-sm mb-4">
                    Эта библиотека создана для запроса игровых серверов, использующих Source (Steamworks) query протокол.
                  </p>
                  <div className="flex items-center justify-center space-x-6 text-sm">
                    <div className="flex items-center space-x-2">
                      <Icon name="User" size={16} className="text-blue-400" />
                      <span>Made by xPaw</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="Github" size={16} className="text-blue-400" />
                      <a 
                        href="https://github.com/xPaw/PHP-Source-Query" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        View on GitHub
                      </a>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="Scale" size={16} className="text-red-400" />
                      <span className="text-red-400">LGPL v2.1</span>
                    </div>
                  </div>
                  <div className="text-xs text-cs-light/50 mt-4">
                    ⚠️ Браузерные ограничения: Прямые UDP запросы заблокированы политикой CORS. Требуется WebSocket/HTTP прокси.
                  </div>
                </div>
              </CardContent>
            </Card>
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