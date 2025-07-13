import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Icon from "@/components/ui/icon";

const Index = () => {
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
    <div className="min-h-screen cs-gradient">
      {/* Navigation */}
      <nav className="bg-cs-gray/80 backdrop-blur-sm border-b border-cs-orange/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
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
            <div className="hidden md:flex space-x-6">
              <a href="/" className="text-cs-light hover:text-cs-orange transition-colors font-orbitron font-bold">
                ГЛАВНАЯ
              </a>
              <a href="/forum" className="text-cs-light hover:text-cs-orange transition-colors font-orbitron font-bold">
                ФОРУМ
              </a>
              <a href="/chat" className="text-cs-light hover:text-cs-orange transition-colors font-orbitron font-bold">
                ЧАТ
              </a>
            </div>
            <Button size="sm" className="bg-cs-orange hover:bg-cs-orange/80">
              <Icon name="User" size={16} className="mr-2" />
              Войти
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center">
          <h2 className="font-orbitron text-6xl font-black text-cs-orange cs-text-shadow mb-6">
            ГОТОВ К БОЮ?
          </h2>
          <p className="text-xl text-cs-light/80 mb-8 max-w-2xl mx-auto">
            Присоединяйся к легендарному сообществу Counter-Strike: Source.
            Соревнуйся, общайся и становись лучшим!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-cs-orange hover:bg-cs-orange/80 font-semibold"
            >
              <Icon name="Play" size={20} className="mr-2" />
              Играть сейчас
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-cs-orange text-cs-orange hover:bg-cs-orange hover:text-white"
            >
              <Icon name="Users" size={20} className="mr-2" />
              Присоединиться к форуму
            </Button>
          </div>
        </div>
      </section>

      {/* Telegram Channel */}
      <section className="py-12 px-6">
        <div className="container mx-auto">
          <div className="flex justify-center">
            <Card className="bg-gradient-to-r from-cs-gray/90 to-cs-dark/90 border-2 border-cs-orange/40 backdrop-blur-sm hover:border-cs-orange/60 transition-all duration-300 hover:scale-105 max-w-md">
              <CardContent className="p-8 text-center">
                <div className="flex flex-col items-center space-y-4">
                  {/* Telegram Icon */}
                  <div className="w-16 h-16 bg-blue-500 rounded-xl flex items-center justify-center text-white text-2xl font-bold">
                    <Icon name="Send" size={32} className="rotate-45" />
                  </div>
                  
                  {/* Title */}
                  <div>
                    <h3 className="font-orbitron text-2xl font-black text-cs-orange mb-2">
                      НАШ TELEGRAM
                    </h3>
                    <p className="text-cs-light/80 text-sm mb-4">
                      Новости, турниры и общение
                    </p>
                  </div>

                  {/* Channel Handle */}
                  <div className="bg-cs-dark/50 px-4 py-2 rounded-lg border border-cs-orange/20">
                    <span className="text-cs-orange font-mono text-lg">@realguys90x</span>
                  </div>

                  {/* Subscribe Button */}
                  <a 
                    href="https://t.me/realguys90x" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-orbitron font-bold py-3 text-lg">
                      <Icon name="Send" size={20} className="mr-2 rotate-45" />
                      ПОДПИШИСЬ
                    </Button>
                  </a>

                  <div className="text-xs text-cs-light/60">
                    Будь в курсе всех событий сервера!
                  </div>
                </div>
              </CardContent>
            </Card>
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
            <Card className="bg-cs-gray/80 border-cs-orange/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="font-orbitron text-cs-orange flex items-center space-x-2">
                  <Icon name="Server" size={24} />
                  <span>ПОДКЛЮЧЕНИЕ К СЕРВЕРУ</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-cs-dark/50 p-4 rounded border border-cs-orange/20">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-cs-orange font-mono mb-2">
                      45.136.205.92:27015
                    </div>
                    <div className="text-sm text-cs-light/80 mb-4">IP адрес сервера</div>
                    <Button 
                      className="bg-cs-orange hover:bg-cs-orange/80 text-cs-dark font-orbitron font-bold"
                      onClick={() => navigator.clipboard.writeText('45.136.205.92:27015')}
                    >
                      <Icon name="Copy" size={16} className="mr-2" />
                      СКОПИРОВАТЬ
                    </Button>
                  </div>
                </div>
                <div className="text-xs text-cs-light/60 text-center">
                  Вставьте этот IP в консоль CS:S командой: connect 45.136.205.92:27015
                </div>
              </CardContent>
            </Card>

            <div className="bg-cs-gray/80 border border-cs-orange/20 rounded-lg p-4 backdrop-blur-sm">
              <a
                href="http://www.myarena.ru/game-monitoring.html?game=110421"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="//img.myarena.ru/110421/560.png"
                  alt="Статистика сервера"
                  className="rounded hover:opacity-80 transition-opacity w-full"
                />
              </a>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {servers.map((server, index) => (
              <Card
                key={index}
                className="bg-cs-gray/80 border-cs-orange/20 backdrop-blur-sm"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-cs-light font-orbitron">
                      {server.name}
                    </CardTitle>
                    <Badge
                      variant={
                        server.status === "online" ? "default" : "destructive"
                      }
                      className={
                        server.status === "online" ? "bg-green-500" : ""
                      }
                    >
                      {server.status === "online" ? "ОНЛАЙН" : "ОФЛАЙН"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-cs-light/70">Игроки:</span>
                      <span className="text-cs-orange font-mono">
                        {server.players}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-cs-light/70">Пинг:</span>
                      <span className="text-cs-orange font-mono">
                        {server.ping}
                      </span>
                    </div>
                    {server.status === "online" && (
                      <Button
                        size="sm"
                        className="w-full bg-cs-orange/80 hover:bg-cs-orange"
                      >
                        <Icon name="ExternalLink" size={14} className="mr-2" />
                        Подключиться
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
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
                  <span>НЕДАВНИЕ ИГРОКИ</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="max-h-[400px] overflow-y-auto">
                <div className="space-y-3">
                  {[
                    { nick: "ProGamer2000", lastSeen: "2 минуты назад", server: "45.136.205.92:27015" },
                    { nick: "HeadShot_King", lastSeen: "15 минут назад", server: "45.136.205.92:27015" },
                    { nick: "NoobSlayer", lastSeen: "1 час назад", server: "45.136.205.92:27015" },
                    { nick: "CSS_Legend", lastSeen: "2 часа назад", server: "45.136.205.92:27015" },
                    { nick: "Player_228", lastSeen: "3 часа назад", server: "45.136.205.92:27015" },
                    { nick: "ClanLeader", lastSeen: "5 часов назад", server: "45.136.205.92:27015" },
                    { nick: "RandomPlayer", lastSeen: "1 день назад", server: "45.136.205.92:27015" },
                    { nick: "Admin_Vitalik", lastSeen: "2 дня назад", server: "45.136.205.92:27015" }
                  ].map((player, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-cs-dark/30 rounded">
                      <div className="flex items-center space-x-3">
                        <Icon name="Circle" size={8} className={index < 3 ? "text-green-500" : "text-gray-500"} />
                        <span className="font-semibold text-cs-light">{player.nick}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-cs-light/80">{player.lastSeen}</div>
                        <div className="text-xs text-cs-orange font-mono">{player.server}</div>
                      </div>
                    </div>
                  ))}
                </div>
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
                    <div className="text-2xl font-bold text-cs-orange font-orbitron">1,247</div>
                    <div className="text-sm text-cs-light/80">Всего игроков</div>
                  </div>
                  <div className="bg-cs-dark/30 p-4 rounded text-center">
                    <div className="text-2xl font-bold text-green-500 font-orbitron">24/32</div>
                    <div className="text-sm text-cs-light/80">Сейчас онлайн</div>
                  </div>
                  <div className="bg-cs-dark/30 p-4 rounded text-center">
                    <div className="text-2xl font-bold text-cs-orange font-orbitron">156</div>
                    <div className="text-sm text-cs-light/80">Сегодня играли</div>
                  </div>
                  <div className="bg-cs-dark/30 p-4 rounded text-center">
                    <div className="text-2xl font-bold text-cs-orange font-orbitron">15ms</div>
                    <div className="text-sm text-cs-light/80">Средний пинг</div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <div className="text-sm text-cs-light/80 mb-2">Популярные карты:</div>
                  <div className="space-y-2">
                    {[
                      { map: "de_dust2", plays: "2,341" },
                      { map: "de_aztec", plays: "1,892" },
                      { map: "cs_office", plays: "1,456" },
                      { map: "de_inferno", plays: "1,203" }
                    ].map((mapData, index) => (
                      <div key={index} className="flex justify-between items-center p-2 bg-cs-dark/30 rounded">
                        <span className="text-cs-light font-mono">{mapData.map}</span>
                        <span className="text-cs-orange">{mapData.plays} игр</span>
                      </div>
                    ))}
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
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {ranks.map((rank, index) => (
                <Card
                  key={index}
                  className="bg-cs-gray/80 border-cs-orange/20 backdrop-blur-sm"
                >
                  <CardHeader className="text-center pb-3">
                    <div
                      className={`w-16 h-16 rounded-full mx-auto mb-3 ${rank.color} flex items-center justify-center`}
                    >
                      <Icon name="Award" size={24} className="text-white" />
                    </div>
                    <CardTitle className="text-cs-light font-orbitron text-lg">
                      {rank.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Progress
                        value={(rank.xp / rank.maxXp) * 100}
                        className="h-2 bg-cs-blue"
                      />
                      <div className="text-center text-sm">
                        <span className="text-cs-orange font-mono">
                          {rank.xp}
                        </span>
                        <span className="text-cs-light/70">
                          /{rank.maxXp} XP
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Player Stats */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-cs-gray/80 border-cs-orange/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-cs-light font-orbitron flex items-center">
                    <Icon
                      name="Target"
                      size={20}
                      className="mr-2 text-cs-orange"
                    />
                    Убийства
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-cs-orange font-mono">
                    1,247
                  </div>
                  <p className="text-cs-light/70">Всего убийств</p>
                </CardContent>
              </Card>

              <Card className="bg-cs-gray/80 border-cs-orange/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-cs-light font-orbitron flex items-center">
                    <Icon
                      name="Clock"
                      size={20}
                      className="mr-2 text-cs-orange"
                    />
                    Время игры
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-cs-orange font-mono">
                    156ч
                  </div>
                  <p className="text-cs-light/70">Общее время</p>
                </CardContent>
              </Card>

              <Card className="bg-cs-gray/80 border-cs-orange/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-cs-light font-orbitron flex items-center">
                    <Icon
                      name="TrendingUp"
                      size={20}
                      className="mr-2 text-cs-orange"
                    />
                    K/D Ratio
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-cs-orange font-mono">
                    2.34
                  </div>
                  <p className="text-cs-light/70">Соотношение</p>
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
  );
};

export default Index;