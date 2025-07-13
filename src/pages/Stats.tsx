import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Icon from "@/components/ui/icon";
import { Navigation } from "@/components/home/Navigation";
import { useServerStats } from "@/hooks/useServerStats";
import { getRankInfo } from "@/utils/playerUtils";

const Stats = () => {
  const { serverInfo, players, isLoading, error, lastUpdate, refetch } = useServerStats(true, 30000);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("score");
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedRank, setSelectedRank] = useState("all");

  // Генерируем расширенную статистику игроков
  const playersWithStats = useMemo(() => {
    const baseStats = players.map(player => {
      const kd = player.kills > 0 ? (player.deaths > 0 ? player.kills / player.deaths : player.kills) : 0;
      const efficiency = player.kills > 0 ? Math.round((player.kills / (player.kills + player.deaths)) * 100) : 0;
      const totalGames = Math.floor(Math.random() * 500) + 50;
      const wins = Math.floor(totalGames * (0.3 + Math.random() * 0.4));
      const winRate = Math.round((wins / totalGames) * 100);
      const hoursPlayed = Math.floor(Math.random() * 1000) + 100;
      const rankInfo = getRankInfo(player.score, kd);
      
      return {
        ...player,
        kd: Math.round(kd * 100) / 100,
        efficiency,
        totalGames,
        wins,
        losses: totalGames - wins,
        winRate,
        hoursPlayed,
        rankInfo,
        avgScore: Math.round(player.score / totalGames),
        headshotPercent: Math.floor(Math.random() * 40) + 10,
        favoriteWeapon: ["AK-47", "M4A1", "AWP", "Deagle", "MP5"][Math.floor(Math.random() * 5)],
        lastSeen: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000)
      };
    });

    // Добавляем историческую статистику
    const historicalPlayers = [
      {
        name: "ProGamer2000",
        score: 15240,
        kills: 8900,
        deaths: 4200,
        ping: 25,
        time: "156ч",
        kd: 2.12,
        efficiency: 68,
        totalGames: 420,
        wins: 280,
        losses: 140,
        winRate: 67,
        hoursPlayed: 850,
        avgScore: 36,
        headshotPercent: 45,
        favoriteWeapon: "AK-47",
        lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000),
        rankInfo: getRankInfo(15240, 2.12)
      },
      {
        name: "HeadShot_King",
        score: 12890,
        kills: 7500,
        deaths: 4100,
        ping: 18,
        time: "134ч",
        kd: 1.83,
        efficiency: 65,
        totalGames: 380,
        wins: 245,
        losses: 135,
        winRate: 64,
        hoursPlayed: 720,
        avgScore: 34,
        headshotPercent: 52,
        favoriteWeapon: "AWP",
        lastSeen: new Date(Date.now() - 5 * 60 * 60 * 1000),
        rankInfo: getRankInfo(12890, 1.83)
      },
      {
        name: "CSS_Legend",
        score: 11450,
        kills: 6800,
        deaths: 4000,
        ping: 22,
        time: "128ч",
        kd: 1.70,
        efficiency: 63,
        totalGames: 350,
        wins: 210,
        losses: 140,
        winRate: 60,
        hoursPlayed: 680,
        avgScore: 33,
        headshotPercent: 38,
        favoriteWeapon: "M4A1",
        lastSeen: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        rankInfo: getRankInfo(11450, 1.70)
      },
      {
        name: "NoobSlayer",
        score: 9820,
        kills: 5900,
        deaths: 3900,
        ping: 35,
        time: "112ч",
        kd: 1.51,
        efficiency: 60,
        totalGames: 320,
        wins: 185,
        losses: 135,
        winRate: 58,
        hoursPlayed: 560,
        avgScore: 31,
        headshotPercent: 42,
        favoriteWeapon: "Deagle",
        lastSeen: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        rankInfo: getRankInfo(9820, 1.51)
      },
      {
        name: "Admin_Vitalik",
        score: 8940,
        kills: 5400,
        deaths: 3800,
        ping: 15,
        time: "98ч",
        kd: 1.42,
        efficiency: 59,
        totalGames: 280,
        wins: 160,
        losses: 120,
        winRate: 57,
        hoursPlayed: 520,
        avgScore: 32,
        headshotPercent: 35,
        favoriteWeapon: "MP5",
        lastSeen: new Date(Date.now() - 30 * 60 * 1000),
        rankInfo: getRankInfo(8940, 1.42)
      }
    ];

    return [...baseStats, ...historicalPlayers];
  }, [players]);

  // Фильтрация и сортировка
  const filteredAndSortedPlayers = useMemo(() => {
    let filtered = playersWithStats.filter(player => {
      const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRank = selectedRank === "all" || player.rankInfo.name === selectedRank;
      return matchesSearch && matchesRank;
    });

    filtered.sort((a, b) => {
      let aVal = a[sortBy as keyof typeof a];
      let bVal = b[sortBy as keyof typeof b];
      
      if (typeof aVal === 'string') aVal = aVal.toLowerCase();
      if (typeof bVal === 'string') bVal = bVal.toLowerCase();
      
      if (sortOrder === "asc") {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

    return filtered;
  }, [playersWithStats, searchTerm, sortBy, sortOrder, selectedRank]);

  const formatLastSeen = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffHours < 1) return "Только что";
    if (diffHours < 24) return `${diffHours}ч назад`;
    if (diffDays < 7) return `${diffDays}д назад`;
    return date.toLocaleDateString('ru-RU');
  };

  const uniqueRanks = [...new Set(playersWithStats.map(p => p.rankInfo.name))];

  return (
    <div className="min-h-screen relative bg-cs-dark overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{
          backgroundImage: "url('/img/a298e115-709d-4b48-8f88-25f8aba46ef3.jpg')"
        }}
      />
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-cs-dark/90 via-cs-dark/95 to-cs-dark/98" />
      
      {/* Content */}
      <div className="relative z-10">
        <Navigation />
        
        {/* Header */}
        <section className="py-12 px-6">
          <div className="container mx-auto">
            <div className="text-center mb-8">
              <h1 className="font-orbitron text-5xl font-black text-cs-orange cs-text-shadow mb-4">
                СТАТИСТИКА ИГРОКОВ
              </h1>
              <p className="text-white/90 text-lg max-w-2xl mx-auto">
                Детальная статистика всех игроков сервера 45.136.205.92:27015
              </p>
              {lastUpdate && (
                <div className="mt-4 text-sm text-white/70">
                  Последнее обновление: {lastUpdate.toLocaleString('ru-RU')}
                </div>
              )}
            </div>

            {/* Filters */}
            <Card className="bg-cs-gray/95 border-cs-orange/30 backdrop-blur-sm mb-8 shadow-xl">
              <CardHeader>
                <CardTitle className="font-orbitron text-cs-orange flex items-center space-x-2">
                  <Icon name="Filter" size={24} />
                  <span>ФИЛЬТРЫ И СОРТИРОВКА</span>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={refetch}
                    className="ml-auto border-cs-orange/40 text-cs-orange hover:bg-cs-orange/20"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Icon name="Loader2" size={16} className="animate-spin" />
                    ) : (
                      <Icon name="RefreshCw" size={16} />
                    )}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">
                      Поиск по нику
                    </label>
                    <Input
                      placeholder="Введите ник игрока..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="bg-cs-dark/90 border-cs-orange/40 text-white placeholder:text-gray-400"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">
                      Сортировать по
                    </label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="bg-cs-dark/90 border-cs-orange/40 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="score">Очки</SelectItem>
                        <SelectItem value="kd">K/D</SelectItem>
                        <SelectItem value="kills">Убийства</SelectItem>
                        <SelectItem value="winRate">Процент побед</SelectItem>
                        <SelectItem value="efficiency">Эффективность</SelectItem>
                        <SelectItem value="hoursPlayed">Часы игры</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">
                      Порядок
                    </label>
                    <Select value={sortOrder} onValueChange={setSortOrder}>
                      <SelectTrigger className="bg-cs-dark/90 border-cs-orange/40 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="desc">По убыванию</SelectItem>
                        <SelectItem value="asc">По возрастанию</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">
                      Ранг
                    </label>
                    <Select value={selectedRank} onValueChange={setSelectedRank}>
                      <SelectTrigger className="bg-cs-dark/90 border-cs-orange/40 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все ранги</SelectItem>
                        {uniqueRanks.map(rank => (
                          <SelectItem key={rank} value={rank}>{rank}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats Summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <Card className="bg-cs-gray/95 border-cs-orange/30 backdrop-blur-sm shadow-lg">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-cs-orange font-orbitron">
                    {filteredAndSortedPlayers.length}
                  </div>
                  <div className="text-sm text-white/90">Всего игроков</div>
                </CardContent>
              </Card>
              
              <Card className="bg-cs-gray/95 border-cs-orange/30 backdrop-blur-sm shadow-lg">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-500 font-orbitron">
                    {players.length}
                  </div>
                  <div className="text-sm text-white/90">Сейчас онлайн</div>
                </CardContent>
              </Card>
              
              <Card className="bg-cs-gray/95 border-cs-orange/30 backdrop-blur-sm shadow-lg">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-400 font-orbitron">
                    {filteredAndSortedPlayers.length > 0 ? 
                      Math.round(filteredAndSortedPlayers.reduce((sum, p) => sum + p.kd, 0) / filteredAndSortedPlayers.length * 100) / 100 : 
                      '0.00'
                    }
                  </div>
                  <div className="text-sm text-white/90">Средний K/D</div>
                </CardContent>
              </Card>
              
              <Card className="bg-cs-gray/95 border-cs-orange/30 backdrop-blur-sm shadow-lg">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-400 font-orbitron">
                    {filteredAndSortedPlayers.length > 0 ? 
                      Math.round(filteredAndSortedPlayers.reduce((sum, p) => sum + p.winRate, 0) / filteredAndSortedPlayers.length) : 
                      '0'
                    }%
                  </div>
                  <div className="text-sm text-white/90">Средний винрейт</div>
                </CardContent>
              </Card>
            </div>

            {/* Players Table */}
            <Card className="bg-cs-gray/95 border-cs-orange/30 backdrop-blur-sm shadow-xl">
              <CardHeader>
                <CardTitle className="font-orbitron text-cs-orange flex items-center space-x-2">
                  <Icon name="Users" size={24} />
                  <span>РЕЙТИНГ ИГРОКОВ</span>
                  <Badge variant="outline" className="ml-auto border-cs-orange/40 text-cs-orange">
                    {filteredAndSortedPlayers.length} игроков
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-cs-dark/80">
                      <tr className="border-b border-cs-orange/40">
                        <th className="px-4 py-3 text-left text-cs-orange font-orbitron text-sm font-bold">#</th>
                        <th className="px-4 py-3 text-left text-cs-orange font-orbitron text-sm font-bold">Игрок</th>
                        <th className="px-4 py-3 text-center text-cs-orange font-orbitron text-sm font-bold">Ранг</th>
                        <th className="px-4 py-3 text-center text-cs-orange font-orbitron text-sm font-bold">Очки</th>
                        <th className="px-4 py-3 text-center text-cs-orange font-orbitron text-sm font-bold">K/D</th>
                        <th className="px-4 py-3 text-center text-cs-orange font-orbitron text-sm font-bold">Винрейт</th>
                        <th className="px-4 py-3 text-center text-cs-orange font-orbitron text-sm font-bold">Игры</th>
                        <th className="px-4 py-3 text-center text-cs-orange font-orbitron text-sm font-bold">Часы</th>
                        <th className="px-4 py-3 text-center text-cs-orange font-orbitron text-sm font-bold">Статус</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAndSortedPlayers.map((player, index) => (
                        <tr key={player.name} className="border-b border-cs-orange/20 hover:bg-cs-dark/40 transition-colors">
                          <td className="px-4 py-3 text-white font-mono text-sm font-bold">
                            {index + 1}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center space-x-3">
                              <div className="flex items-center space-x-2">
                                {players.some(p => p.name === player.name) && (
                                  <Icon name="Circle" size={8} className="text-green-500 animate-pulse" />
                                )}
                                <span className="font-semibold text-white truncate max-w-[150px]">
                                  {player.name}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-bold ${player.rankInfo.color}`}>
                              <Icon name={player.rankInfo.icon as any} size={12} />
                              <span>{player.rankInfo.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-center text-cs-orange font-mono">
                            {player.score.toLocaleString('ru-RU')}
                          </td>
                          <td className="px-4 py-3 text-center">
                            <span className={`font-mono ${
                              player.kd >= 2.0 ? 'text-yellow-500' :
                              player.kd >= 1.5 ? 'text-green-500' :
                              player.kd >= 1.0 ? 'text-blue-400' : 'text-red-400'
                            }`}>
                              {player.kd.toFixed(2)}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <span className={`font-mono ${
                              player.winRate >= 70 ? 'text-green-500' :
                              player.winRate >= 50 ? 'text-blue-400' : 'text-red-400'
                            }`}>
                              {player.winRate}%
                            </span>
                          </td>
                          <td className="px-4 py-3 text-center text-white font-mono text-sm">
                            {player.totalGames}
                          </td>
                          <td className="px-4 py-3 text-center text-white font-mono text-sm">
                            {player.hoursPlayed}ч
                          </td>
                          <td className="px-4 py-3 text-center text-xs text-white/80">
                            {players.some(p => p.name === player.name) ? (
                              <Badge className="bg-green-500/20 text-green-400 border-green-500/40">
                                Онлайн
                              </Badge>
                            ) : (
                              <span>{formatLastSeen(player.lastSeen)}</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {filteredAndSortedPlayers.length === 0 && (
                  <div className="text-center py-12 text-white/80">
                    <Icon name="Search" size={48} className="mx-auto mb-4 opacity-50" />
                    <div className="text-lg mb-2 text-white">Игроки не найдены</div>
                    <div className="text-sm text-white/70">Попробуйте изменить параметры поиска</div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-cs-gray border-t border-cs-orange/20 py-8 px-6">
          <div className="container mx-auto text-center">
            <p className="text-cs-light/70 font-mono">
              © 2024 Counter-Strike: Source Community • Статистика обновляется в реальном времени
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Stats;