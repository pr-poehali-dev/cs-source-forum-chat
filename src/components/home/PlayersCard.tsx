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
  return (
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
                onClick={onRefetch}
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
  );
};