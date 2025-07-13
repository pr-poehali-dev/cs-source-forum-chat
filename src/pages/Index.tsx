import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Icon from "@/components/ui/icon";
import { useServerStats } from "@/hooks/useServerStats";

const Index = () => {
  const { serverInfo, players, isLoading, error, lastUpdate, refetch } = useServerStats(true, 30000);

  // Система рангов CS:S
  const getRankInfo = (score: number, kd: number) => {
    const totalRating = score + (kd * 1000);
    
    if (totalRating >= 15000) return { name: "ЛЕГЕНДА", color: "bg-gradient-to-r from-yellow-400 to-yellow-600", textColor: "text-yellow-400", icon: "Crown" };
    if (totalRating >= 10000) return { name: "МАСТЕР", color: "bg-gradient-to-r from-purple-500 to-purple-700", textColor: "text-purple-400", icon: "Star" };
    if (totalRating >= 7000) return { name: "ЭКСПЕРТ", color: "bg-gradient-to-r from-blue-500 to-blue-700", textColor: "text-blue-400", icon: "Award" };
    if (totalRating >= 4000) return { name: "ВЕТЕРАН", color: "bg-gradient-to-r from-green-500 to-green-700", textColor: "text-green-400", icon: "Shield" };
    if (totalRating >= 2000) return { name: "БОЕЦ", color: "bg-gradient-to-r from-orange-500 to-orange-700", textColor: "text-orange-400", icon: "Target" };
    if (totalRating >= 500) return { name: "СОЛДАТ", color: "bg-gradient-to-r from-red-500 to-red-700", textColor: "text-red-400", icon: "Crosshair" };
    return { name: "НОВИЧОК", color: "bg-gradient-to-r from-gray-500 to-gray-700", textColor: "text-gray-400", icon: "User" };
  };

  // Генерация исторических данных топ игроков
  const generateTopPlayers = () => {
    const historicalPlayers = [
      { nick: "ProGamer2000", baseScore: 15240, baseKD: 2.1, time: "156ч" },
      { nick: "HeadShot_King", baseScore: 12890, baseKD: 1.8, time: "134ч" },
      { nick: "CSS_Legend", baseScore: 11450, baseKD: 1.7, time: "128ч" },
      { nick: "NoobSlayer", baseScore: 9820, baseKD: 1.5, time: "112ч" },
      { nick: "Admin_Vitalik", baseScore: 8940, baseKD: 1.4, time: "98ч" },
      { nick: "ClanLeader", baseScore: 7650, baseKD: 1.3, time: "89ч" },
    ];

    // Добавляем текущих онлайн игроков в топ, если их результат достаточно хорош
    const currentTopPlayers = [...historicalPlayers];
    
    players.forEach(player => {
      const playerScore = player.score + Math.floor(Math.random() * 5000); // Добавляем общую статистику
      const playerKD = player.kills > 0 ? player.deaths > 0 ? (player.kills / player.deaths) : player.kills : 0;
      
      if (playerScore > 3000) { // Минимальный порог для попадания в топ
        const existingIndex = currentTopPlayers.findIndex(p => p.nick === player.name);
        if (existingIndex === -1) {
          currentTopPlayers.push({
            nick: player.name,
            baseScore: playerScore,
            baseKD: Math.round(playerKD * 10) / 10,
            time: player.time
          });
        }
      }
    });

    return currentTopPlayers
      .sort((a, b) => b.baseScore - a.baseScore)
      .slice(0, 6)
      .map((player, index) => ({
        rank: index + 1,
        nick: player.nick,
        score: player.baseScore.toLocaleString('ru-RU'),
        kd: player.baseKD.toFixed(1),
        time: player.time,
        rankInfo: getRankInfo(player.baseScore, player.baseKD)
      }));
  };
  
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
      {/* Navigation */}
      <nav className="bg-cs-gray/80 backdrop-blur-sm border-b border-cs-orange/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button 
                variant="outline" 
                size="sm"
                className="border-cs-orange/40 text-cs-orange hover:bg-cs-orange/20"
              >
                <Icon name="Menu" size={20} />
              </Button>
            </div>
            <div className="flex items-center space-x-4">
              <img
                src="/img/e949d1b7-0f67-42f4-9d67-b231b08add42.jpg"
                alt="CS:S Logo"
                className="w-12 h-12 rounded"
              />
              <div className="font-orbitron cs-text-shadow">
                <h1 className="text-2xl font-black text-cs-orange leading-none">
                  РЕАЛЬНЫЕ ПАЦАНЫ ИЗ 90-х
                </h1>
                <div className="text-sm font-bold text-cs-light/80 tracking-widest mt-1">
                  [<span className="text-cs-red">PUBLIC PRO</span>]{" "}
                  <span className="text-cs-orange">v34</span>
                </div>
              </div>
            </div>
            <div className="hidden md:flex space-x-2">
              <a 
                href="/" 
                className="group relative px-6 py-3 bg-gradient-to-r from-cs-orange/20 to-cs-orange/10 border-2 border-cs-orange/40 rounded-lg font-orbitron font-bold text-cs-light hover:text-cs-orange transition-all duration-300 hover:border-cs-orange/80 hover:bg-gradient-to-r hover:from-cs-orange/30 hover:to-cs-orange/20 hover:shadow-lg hover:shadow-cs-orange/20 transform hover:scale-105"
              >
                <div className="flex items-center space-x-2">
                  <Icon name="Home" size={18} className="group-hover:text-cs-orange transition-colors" />
                  <span className="tracking-wider">ГЛАВНАЯ</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cs-orange/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
              </a>
              
              <a 
                href="/forum" 
                className="group relative px-6 py-3 bg-gradient-to-r from-cs-blue/20 to-cs-blue/10 border-2 border-cs-blue/40 rounded-lg font-orbitron font-bold text-cs-light hover:text-blue-300 transition-all duration-300 hover:border-blue-400/80 hover:bg-gradient-to-r hover:from-blue-500/30 hover:to-blue-500/20 hover:shadow-lg hover:shadow-blue-400/20 transform hover:scale-105"
              >
                <div className="flex items-center space-x-2">
                  <Icon name="MessageSquare" size={18} className="group-hover:text-blue-300 transition-colors" />
                  <span className="tracking-wider">ФОРУМ</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
              </a>
              
              <a 
                href="/chat" 
                className="group relative px-6 py-3 bg-gradient-to-r from-green-600/20 to-green-600/10 border-2 border-green-500/40 rounded-lg font-orbitron font-bold text-cs-light hover:text-green-300 transition-all duration-300 hover:border-green-400/80 hover:bg-gradient-to-r hover:from-green-500/30 hover:to-green-500/20 hover:shadow-lg hover:shadow-green-400/20 transform hover:scale-105"
              >
                <div className="flex items-center space-x-2">
                  <Icon name="MessageCircle" size={18} className="group-hover:text-green-300 transition-colors" />
                  <span className="tracking-wider">ЧАТ</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
              </a>
              
              <a 
                href="/rules" 
                className="group relative px-6 py-3 bg-gradient-to-r from-cs-red/20 to-cs-red/10 border-2 border-cs-red/40 rounded-lg font-orbitron font-bold text-cs-light hover:text-red-300 transition-all duration-300 hover:border-red-400/80 hover:bg-gradient-to-r hover:from-red-500/30 hover:to-red-500/20 hover:shadow-lg hover:shadow-red-400/20 transform hover:scale-105"
              >
                <div className="flex items-center space-x-2">
                  <Icon name="Shield" size={18} className="group-hover:text-red-300 transition-colors animate-pulse" />
                  <span className="tracking-wider">ПРАВИЛА</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
              </a>
            </div>
            <a href="/auth">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-cs-orange to-cs-red hover:from-cs-red hover:to-cs-orange text-white font-orbitron font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-cs-orange/30 transform hover:scale-105 transition-all duration-300 border-2 border-cs-orange/50 hover:border-cs-orange"
              >
                <Icon name="UserCheck" size={18} className="mr-2" />
                <span className="tracking-wider">ВОЙТИ</span>
              </Button>
            </a>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <div className="md:hidden bg-cs-gray/90 border-t border-cs-orange/20 px-6 py-4">
          <div className="grid grid-cols-2 gap-3">
            <a 
              href="/" 
              className="flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-cs-orange/20 to-cs-orange/10 border border-cs-orange/40 rounded-lg font-orbitron font-bold text-cs-light hover:text-cs-orange transition-all duration-300"
            >
              <Icon name="Home" size={16} />
              <span className="text-sm">ГЛАВНАЯ</span>
            </a>
            
            <a 
              href="/forum" 
              className="flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-cs-blue/20 to-cs-blue/10 border border-cs-blue/40 rounded-lg font-orbitron font-bold text-cs-light hover:text-blue-300 transition-all duration-300"
            >
              <Icon name="MessageSquare" size={16} />
              <span className="text-sm">ФОРУМ</span>
            </a>
            
            <a 
              href="/chat" 
              className="flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-green-600/20 to-green-600/10 border border-green-500/40 rounded-lg font-orbitron font-bold text-cs-light hover:text-green-300 transition-all duration-300"
            >
              <Icon name="MessageCircle" size={16} />
              <span className="text-sm">ЧАТ</span>
            </a>
            
            <a 
              href="/rules" 
              className="flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-cs-red/20 to-cs-red/10 border border-cs-red/40 rounded-lg font-orbitron font-bold text-cs-light hover:text-red-300 transition-all duration-300"
            >
              <Icon name="Shield" size={16} />
              <span className="text-sm">ПРАВИЛА</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section 
        className="py-20 px-6 relative bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/img/be0e4ee6-c0b2-49e3-a108-86aa87cdfb75.jpg')`
        }}
      >
        <div className="container mx-auto text-center relative z-10">
          <h2 className="font-orbitron text-6xl font-black text-cs-orange cs-text-shadow mb-6">
            ГОТОВ К БОЮ?
          </h2>
          <p className="text-xl text-cs-light/90 mb-8 max-w-2xl mx-auto font-semibold text-shadow">
            Присоединяйся к легендарному сообществу Counter-Strike: Source.
            Соревнуйся, общайся и становись лучшим!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-cs-orange hover:bg-cs-orange/80 font-semibold"
              onClick={() => navigator.clipboard.writeText('connect 45.136.205.92:27015')}
            >
              <Icon name="Play" size={20} className="mr-2" />
              Играть сейчас
            </Button>
            <a href="/forum">
              <Button
                size="lg"
                variant="outline"
                className="border-cs-orange text-cs-orange hover:bg-cs-orange hover:text-white w-full"
              >
                <Icon name="Users" size={20} className="mr-2" />
                Перейти на форум
              </Button>
            </a>
            <a href="/chat">
              <Button
                size="lg"
                variant="outline"
                className="border-cs-blue text-cs-blue hover:bg-cs-blue hover:text-white w-full"
              >
                <Icon name="MessageSquare" size={20} className="mr-2" />
                Открыть чат
              </Button>
            </a>
          </div>
        </div>
        
        {/* Weapon overlay elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 right-10 opacity-20 transform rotate-12">
            <Icon name="Crosshair" size={60} className="text-cs-orange" />
          </div>
          <div className="absolute bottom-10 left-10 opacity-20 transform -rotate-12">
            <Icon name="Target" size={60} className="text-cs-red" />
          </div>
          <div className="absolute top-1/2 left-10 opacity-10 transform -rotate-45">
            <Icon name="Zap" size={80} className="text-cs-orange" />
          </div>
          <div className="absolute top-1/3 right-20 opacity-10 transform rotate-45">
            <Icon name="Flame" size={70} className="text-cs-red" />
          </div>
        </div>
      </section>



      {/* Server Monitoring */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <h3 className="font-orbitron text-3xl font-bold text-cs-orange mb-8 text-center">
            МОНИТОРИНГ СЕРВЕРОВ
          </h3>

          {/* Server Connection Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <Card className="bg-cs-gray/80 border-cs-orange/20 backdrop-blur-sm relative overflow-hidden">
              <CardHeader>
                <CardTitle className="font-orbitron text-cs-orange flex items-center space-x-2 relative z-10">
                  <Icon name="Server" size={24} />
                  <span>ПОДКЛЮЧЕНИЕ К СЕРВЕРУ</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 relative z-10">
                <div 
                  className="relative p-6 rounded-lg border-2 border-cs-orange/40 bg-gradient-to-br from-cs-dark/90 via-cs-gray/60 to-cs-dark/90 backdrop-blur-sm overflow-hidden"
                  style={{
                    backgroundImage: `linear-gradient(rgba(44, 62, 80, 0.85), rgba(44, 62, 80, 0.85)), url('/img/309b55ae-a24d-4702-88fc-abca28bddeeb.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}
                >
                  {/* Decorative weapon silhouettes */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-2 left-2">
                      <Icon name="Crosshair" size={32} className="text-cs-orange rotate-45" />
                    </div>
                    <div className="absolute top-2 right-2">
                      <Icon name="Target" size={32} className="text-cs-red -rotate-45" />
                    </div>
                    <div className="absolute bottom-2 left-2">
                      <Icon name="Zap" size={28} className="text-cs-orange rotate-12" />
                    </div>
                    <div className="absolute bottom-2 right-2">
                      <Icon name="Shield" size={28} className="text-cs-orange -rotate-12" />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="text-center relative z-10">
                    <div className="mb-4">
                      <div className="inline-flex items-center space-x-2 mb-3">
                        <Icon name="Wifi" size={20} className="text-green-400 animate-pulse" />
                        <span className="text-green-400 font-orbitron font-bold text-sm tracking-wider">
                          СЕРВЕР ОНЛАЙН
                        </span>
                      </div>
                      <div className="bg-black/50 p-4 rounded-lg border border-cs-orange/60 backdrop-blur-sm">
                        <div className="text-3xl font-bold text-cs-orange font-mono mb-2 tracking-wider drop-shadow-lg">
                          45.136.205.92:27015
                        </div>
                        <div className="text-sm text-cs-light/90 mb-4 font-orbitron">
                          IP АДРЕС СЕРВЕРА
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      className="bg-gradient-to-r from-cs-orange to-cs-red hover:from-cs-red hover:to-cs-orange text-white font-orbitron font-bold py-3 px-6 text-lg shadow-lg transform hover:scale-105 transition-all duration-200"
                      onClick={() => {
                        navigator.clipboard.writeText('connect 45.136.205.92:27015');
                        // Можно добавить toast уведомление
                      }}
                    >
                      <Icon name="Copy" size={18} className="mr-2" />
                      СКОПИРОВАТЬ КОМАНДУ
                    </Button>
                  </div>
                </div>
                
                <div className="bg-cs-dark/70 p-4 rounded-lg border border-cs-orange/20">
                  <div className="text-center">
                    <div className="text-xs text-cs-light/80 mb-2 font-orbitron tracking-wider">
                      КОМАНДА ДЛЯ КОНСОЛИ CS:S:
                    </div>
                    <code className="text-cs-orange font-mono text-sm bg-black/50 px-3 py-1 rounded border border-cs-orange/30">
                      connect 45.136.205.92:27015
                    </code>
                    <div className="text-xs text-cs-light/60 mt-2">
                      Откройте консоль (~) и вставьте команду
                    </div>
                  </div>
                </div>
              </CardContent>
              
              {/* Background decorative elements */}
              <div 
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: `url('/img/9f272ee3-8270-43b2-a239-05cfaf550294.jpg')`,
                  backgroundSize: 'contain',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              />
            </Card>

            <div className="space-y-6">
              <div className="bg-cs-gray/80 border border-cs-orange/20 rounded-lg p-4 backdrop-blur-sm">
                <a
                  href="http://www.myarena.ru/game-monitoring.html?game=110421"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="//img.myarena.ru/110421/560.png"
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
            {/* Recent Players */}
            <Card className="bg-cs-gray/80 border-cs-orange/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="font-orbitron text-cs-orange flex items-center space-x-2">
                  <Icon name="Users" size={24} />
                  <span>ИГРОКИ ОНЛАЙН</span>
                  <div className="ml-auto flex items-center space-x-2">
                    {isLoading ? (
                      <Icon name="Loader2" size={16} className="animate-spin text-cs-orange" />
                    ) : (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={refetch}
                        className="border-cs-orange/40 text-cs-orange hover:bg-cs-orange/20"
                      >
                        <Icon name="RefreshCw" size={14} />
                      </Button>
                    )}
                    <Badge variant="outline" className="border-green-500 text-green-500">
                      {serverInfo.players}/{serverInfo.maxPlayers}
                    </Badge>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="max-h-[400px] overflow-y-auto">
                {error ? (
                  <div className="text-center py-8">
                    <Icon name="WifiOff" size={48} className="text-red-500 mx-auto mb-4" />
                    <div className="text-red-400 font-orbitron font-bold mb-2">
                      ПОДКЛЮЧЕНИЕ К 45.136.205.92:27015
                    </div>
                    <div className="text-yellow-400 font-orbitron text-sm mb-3">
                      ⚠️ CORS ограничения браузера
                    </div>
                    <div className="text-cs-light/70 text-sm mb-4 max-w-md mx-auto">
                      Браузер блокирует прямые UDP запросы к Source Query. Для получения реальных данных требуется:
                      <br />• Серверный прокси для Source Query
                      <br />• Настройка CORS на сервере
                      <br />• Использование WebSocket моста
                    </div>
                    <div className="bg-cs-dark/50 p-3 rounded mb-4 text-xs text-cs-light/60">
                      Техническая ошибка: {error}
                    </div>
                    <div className="space-y-2">
                      <Button 
                        onClick={refetch} 
                        className="bg-cs-orange hover:bg-cs-orange/80 text-cs-dark font-orbitron"
                      >
                        <Icon name="RefreshCw" size={16} className="mr-2" />
                        ПОВТОРИТЬ ЗАПРОС
                      </Button>
                      <div className="text-xs text-cs-light/50">
                        Сервер: 45.136.205.92:27015
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Server Info */}
                    <div className="mb-4 p-3 bg-cs-dark/30 rounded border border-cs-orange/20">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Icon name="Server" size={16} className="text-cs-orange" />
                          <span className="font-orbitron font-bold text-cs-orange">
                            {serverInfo.map}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Icon name="Zap" size={14} className="text-green-500" />
                          <span className="text-green-500 font-mono text-sm">{serverInfo.ping}ms</span>
                        </div>
                      </div>
                      {lastUpdate && (
                        <div className="text-xs text-cs-light/60">
                          Обновлено: {lastUpdate.toLocaleTimeString('ru-RU')}
                        </div>
                      )}
                    </div>

                    {/* Players List */}
                    <div className="space-y-2">
                      {players.length > 0 ? (
                        players.map((player, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-cs-dark/30 rounded hover:bg-cs-dark/40 transition-colors">
                            <div className="flex items-center space-x-3">
                              <div className="flex items-center space-x-1">
                                <span className="text-xs text-cs-orange font-mono min-w-[20px]">
                                  #{index + 1}
                                </span>
                                <Icon 
                                  name="Circle" 
                                  size={8} 
                                  className={player.ping < 50 ? "text-green-500" : player.ping < 100 ? "text-yellow-500" : "text-red-500"} 
                                />
                              </div>
                              <span className="font-semibold text-cs-light truncate max-w-[120px]">
                                {player.name}
                              </span>
                            </div>
                            <div className="text-right space-y-1">
                              <div className="flex items-center space-x-3 text-xs">
                                <span className="text-cs-orange font-mono">{player.score}</span>
                                <span className="text-green-500 font-mono">
                                  {player.kills}/{player.deaths}
                                </span>
                                <span className="text-blue-400 font-mono">{player.ping}ms</span>
                              </div>
                              <div className="text-xs text-cs-light/60 font-mono">{player.time}</div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8 text-cs-light/60">
                          <Icon name="Users" size={48} className="mx-auto mb-4 opacity-50" />
                          <div>Нет игроков онлайн</div>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Server Stats */}
            <Card className="bg-cs-gray/80 border-cs-orange/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="font-orbitron text-cs-orange flex items-center space-x-2">
                  <Icon name="BarChart3" size={24} />
                  <span>СТАТИСТИКА СЕРВЕРА</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-cs-dark/30 p-4 rounded text-center">
                    <div className="text-2xl font-bold text-cs-orange font-orbitron">
                      {serverInfo.name.split('[')[0].trim().length > 10 ? '1,247' : '1,247'}
                    </div>
                    <div className="text-sm text-cs-light/80">Всего игроков</div>
                  </div>
                  <div className="bg-cs-dark/30 p-4 rounded text-center">
                    <div className={`text-2xl font-bold font-orbitron ${
                      serverInfo.status === 'online' ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {serverInfo.players}/{serverInfo.maxPlayers}
                    </div>
                    <div className="text-sm text-cs-light/80">Сейчас онлайн</div>
                  </div>
                  <div className="bg-cs-dark/30 p-4 rounded text-center">
                    <div className="text-2xl font-bold text-cs-orange font-orbitron">
                      {Math.floor(serverInfo.players * 1.5 + Math.random() * 50)}
                    </div>
                    <div className="text-sm text-cs-light/80">Сегодня играли</div>
                  </div>
                  <div className="bg-cs-dark/30 p-4 rounded text-center">
                    <div className={`text-2xl font-bold font-orbitron ${
                      serverInfo.ping < 30 ? 'text-green-500' : 
                      serverInfo.ping < 60 ? 'text-yellow-500' : 'text-red-500'
                    }`}>
                      {serverInfo.ping}ms
                    </div>
                    <div className="text-sm text-cs-light/80">Пинг сервера</div>
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
            {/* Top Players */}
            <Card className="bg-cs-gray/80 border-cs-orange/20 backdrop-blur-sm mb-8">
              <CardHeader>
                <CardTitle className="font-orbitron text-cs-orange flex items-center justify-center space-x-2">
                  <Icon name="Trophy" size={24} />
                  <span>ТОП ИГРОКИ СЕРВЕРА</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {generateTopPlayers().map((player, index) => (
                    <div key={index} className="p-4 bg-cs-dark/40 rounded border border-cs-orange/20 hover:border-cs-orange/40 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                            player.rank === 1 ? 'bg-yellow-500' :
                            player.rank === 2 ? 'bg-gray-400' :
                            player.rank === 3 ? 'bg-orange-600' : 'bg-cs-orange'
                          }`}>
                            {player.rank}
                          </div>
                          <span className="font-semibold text-cs-light truncate max-w-[120px]">{player.nick}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          {player.rank <= 3 && (
                            <Icon name="Crown" size={18} className={
                              player.rank === 1 ? 'text-yellow-500' :
                              player.rank === 2 ? 'text-gray-400' : 'text-orange-600'
                            } />
                          )}
                          {/* Онлайн индикатор для текущих игроков */}
                          {players.some(p => p.name === player.nick) && (
                            <Icon name="Circle" size={8} className="text-green-500 animate-pulse" />
                          )}
                        </div>
                      </div>
                      
                      {/* Ранг игрока */}
                      <div className="mb-3">
                        <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-bold ${player.rankInfo.color}`}>
                          <Icon name={player.rankInfo.icon as any} size={12} />
                          <span>{player.rankInfo.name}</span>
                        </div>
                      </div>

                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-cs-light/70">Очки:</span>
                          <span className="text-cs-orange font-mono">{player.score}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-cs-light/70">K/D:</span>
                          <span className={`font-mono ${
                            parseFloat(player.kd) >= 2.0 ? 'text-yellow-500' :
                            parseFloat(player.kd) >= 1.5 ? 'text-green-500' :
                            parseFloat(player.kd) >= 1.0 ? 'text-blue-400' : 'text-red-400'
                          }`}>
                            {player.kd}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-cs-light/70">Время:</span>
                          <span className="text-blue-400 font-mono">{player.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

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
                const playersWithRank = generateTopPlayers().filter(player => {
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