import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

interface Player {
  name: string;
  score: number;
  kills: number;
  deaths: number;
  ping: number;
  time: string;
}

interface RankInfo {
  name: string;
  color: string;
  textColor: string;
  icon: string;
}

interface TopPlayer {
  rank: number;
  nick: string;
  score: string;
  kd: string;
  time: string;
  rankInfo: RankInfo;
}

interface TopPlayersCardProps {
  players: Player[];
  topPlayers: TopPlayer[];
}

export const TopPlayersCard = ({ players, topPlayers }: TopPlayersCardProps) => {
  // Фильтруем только реальных игроков (не ботов) из текущих онлайн
  const realOnlinePlayers = players.filter(player => 
    !player.name.toLowerCase().includes('bot') && 
    !player.name.toLowerCase().includes('бот') &&
    !player.name.toLowerCase().includes('[bot]') &&
    player.name.trim() !== ''
  );

  return (
    <Card className="bg-cs-gray/80 border-cs-orange/20 backdrop-blur-sm mb-8">
      <CardHeader>
        <CardTitle className="font-orbitron text-cs-orange flex items-center justify-center space-x-2">
          <Icon name="Trophy" size={24} />
          <span>ТОП ИГРОКИ СЕРВЕРА</span>
          {realOnlinePlayers.length > 0 && (
            <span className="text-green-500 text-sm">
              ({realOnlinePlayers.length} онлайн)
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topPlayers.map((player, index) => {
            // Проверяем, онлайн ли игрок (только среди реальных игроков)
            const isOnline = realOnlinePlayers.some(p => 
              p.name.toLowerCase() === player.nick.toLowerCase()
            );
            
            return (
              <div key={index} className={`p-4 rounded border transition-colors ${
                isOnline 
                  ? 'bg-cs-dark/40 border-green-500/40 shadow-green-500/20 shadow-lg' 
                  : 'bg-cs-dark/40 border-cs-orange/20 hover:border-cs-orange/40'
              }`}>
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
                    {/* Онлайн индикатор только для реальных игроков */}
                    {isOnline && (
                      <div className="flex items-center space-x-1">
                        <Icon name="Circle" size={8} className="text-green-500 animate-pulse" />
                        <span className="text-green-500 text-xs font-bold">ОНЛАЙН</span>
                      </div>
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
                  {isOnline && (
                    <div className="flex justify-between">
                      <span className="text-cs-light/70">Статус:</span>
                      <span className="text-green-500 font-bold text-xs">🎮 ИГРАЕТ</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Информация о текущих онлайн игроках */}
        {realOnlinePlayers.length > 0 && (
          <div className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Users" size={16} className="text-green-500" />
              <span className="text-green-500 font-semibold">Сейчас играют реальные игроки:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {realOnlinePlayers.slice(0, 10).map((player, index) => (
                <span key={index} className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-sm font-mono">
                  {player.name}
                </span>
              ))}
              {realOnlinePlayers.length > 10 && (
                <span className="px-2 py-1 bg-cs-dark/30 text-cs-light/70 rounded text-sm">
                  +{realOnlinePlayers.length - 10} еще...
                </span>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};