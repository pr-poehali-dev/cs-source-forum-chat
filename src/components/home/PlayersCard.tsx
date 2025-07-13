import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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

interface ServerInfo {
  name: string;
  map: string;
  players: number;
  maxPlayers: number;
  ping: number;
  status: 'online' | 'offline';
}

interface PlayersCardProps {
  players: Player[];
  serverInfo: ServerInfo;
  isLoading: boolean;
  error: string | null;
  lastUpdate: Date | null;
  onRefetch: () => void;
}

export const PlayersCard = ({ 
  players, 
  serverInfo, 
  isLoading, 
  error, 
  lastUpdate, 
  onRefetch 
}: PlayersCardProps) => {
  // Фильтрация реальных игроков
  const realPlayers = players.filter(player => 
    !player.name.toLowerCase().includes('bot') && 
    !player.name.toLowerCase().includes('бот') &&
    !player.name.toLowerCase().includes('[bot]') &&
    player.name.trim() !== ''
  );

  const totalPlayersCount = players.length;
  const realPlayersCount = realPlayers.length;
  const botsCount = totalPlayersCount - realPlayersCount;
  return (
    <Card className="bg-cs-gray/95 border-cs-orange/30 backdrop-blur-sm shadow-xl">
      <CardHeader>
        <CardTitle className="font-orbitron text-cs-orange flex items-center space-x-2">
          <Icon name="Users" size={20} />
          <span>Players</span>
          <div className="ml-auto flex items-center space-x-2">
            {isLoading ? (
              <Icon name="Loader2" size={16} className="animate-spin text-cs-orange" />
            ) : (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onRefetch}
                className="border-cs-orange/40 text-cs-orange hover:bg-cs-orange/20"
              >
                <Icon name="RefreshCw" size={14} />
              </Button>
            )}
            <Badge variant="outline" className="border-blue-400 text-blue-400 font-mono">
              {totalPlayersCount}
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
                onClick={onRefetch} 
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

            {/* Players Table (PHP Style) */}
            <div className="overflow-hidden max-h-[400px] overflow-y-auto">
              <table className="w-full">
                <thead className="bg-cs-dark/80 sticky top-0">
                  <tr className="border-b border-cs-orange/40">
                    <th className="px-4 py-3 text-left text-cs-orange font-orbitron text-sm font-bold">
                      Player
                    </th>
                    <th className="px-4 py-3 text-center text-cs-orange font-orbitron text-sm font-bold w-20">
                      Frags
                    </th>
                    <th className="px-4 py-3 text-center text-cs-orange font-orbitron text-sm font-bold w-20">
                      Time
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {players.length > 0 ? (
                    players.map((player, index) => {
                      const isBot = player.name.toLowerCase().includes('bot') || 
                                    player.name.toLowerCase().includes('бот') || 
                                    player.name.toLowerCase().includes('[bot]');
                      
                      return (
                        <tr key={index} className="border-b border-cs-orange/20 hover:bg-cs-dark/40 transition-colors">
                          <td className="px-4 py-3 text-white font-semibold truncate max-w-[150px]">
                            <div className="flex items-center space-x-2">
                              {isBot && <Icon name="Bot" size={12} className="text-gray-400" />}
                              <span className={isBot ? 'text-gray-400' : 'text-white'}>
                                {player.name}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-center text-cs-orange font-mono font-bold">
                            {player.score || player.kills}
                          </td>
                          <td className="px-4 py-3 text-center text-blue-400 font-mono text-sm">
                            {player.time}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={3} className="px-4 py-8 text-center text-white/60">
                        <Icon name="Users" size={24} className="mx-auto mb-2 opacity-50" />
                        No players received
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};