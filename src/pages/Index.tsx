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
              <h1 className="font-orbitron text-2xl font-bold text-cs-orange cs-text-shadow">
                COUNTER-STRIKE: SOURCE
              </h1>
            </div>
            <div className="hidden md:flex space-x-6">
              {[
                "Главная",
                "Форум",
                "Чат",
                "Серверы",
                "Статистика",
                "Новости",
                "О нас",
              ].map((item) => (
                <Button
                  key={item}
                  variant="ghost"
                  className="text-cs-light hover:text-cs-orange hover:bg-cs-orange/10"
                >
                  {item}
                </Button>
              ))}
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

      {/* Server Monitoring */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <h3 className="font-orbitron text-3xl font-bold text-cs-orange mb-8 text-center">
            МОНИТОРИНГ СЕРВЕРОВ
          </h3>
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
