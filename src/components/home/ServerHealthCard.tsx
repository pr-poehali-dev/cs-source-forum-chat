import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

interface ServerInfo {
  name: string;
  map: string;
  players: number;
  maxPlayers: number;
  ping: number;
  status: 'online' | 'offline';
}

interface ServerHealthCardProps {
  serverInfo: ServerInfo;
  isLoading: boolean;
  error: string | null;
  lastUpdate: Date | null;
  onRefetch: () => void;
}

export const ServerHealthCard = ({ 
  serverInfo, 
  isLoading, 
  error, 
  lastUpdate, 
  onRefetch 
}: ServerHealthCardProps) => {
  const SERVER_IP = "45.136.205.92";
  const SERVER_PORT = "27015";
  
  // Определение состояния сервера
  const getServerHealth = () => {
    if (error) return { status: 'critical', color: 'text-red-500', bg: 'bg-red-500/10', label: 'КРИТИЧЕСКОЕ' };
    if (serverInfo.status === 'offline') return { status: 'offline', color: 'text-red-500', bg: 'bg-red-500/10', label: 'ОТКЛЮЧЕН' };
    if (serverInfo.ping > 100) return { status: 'poor', color: 'text-yellow-500', bg: 'bg-yellow-500/10', label: 'СЛАБОЕ' };
    if (serverInfo.players === 0) return { status: 'idle', color: 'text-blue-500', bg: 'bg-blue-500/10', label: 'ОЖИДАНИЕ' };
    return { status: 'healthy', color: 'text-green-500', bg: 'bg-green-500/10', label: 'ОТЛИЧНОЕ' };
  };

  const health = getServerHealth();
  const uptimePercent = error ? 95.7 : 99.8; // Имитация uptime
  const loadPercent = Math.min((serverInfo.players / serverInfo.maxPlayers) * 100, 100);

  return (
    <Card className="bg-cs-gray/80 border-cs-orange/20 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="font-orbitron text-cs-orange flex items-center space-x-2">
          <Icon name="Activity" size={24} />
          <span>СОСТОЯНИЕ СЕРВЕРА</span>
          <div className="ml-auto">
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
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Основная информация о сервере */}
        <div className="bg-cs-dark/30 p-4 rounded border border-cs-orange/20">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <Icon name="Server" size={20} className="text-cs-orange" />
              <div>
                <div className="font-orbitron font-bold text-cs-light">
                  {SERVER_IP}:{SERVER_PORT}
                </div>
                <div className="text-sm text-cs-light/70">
                  Counter-Strike: Source
                </div>
              </div>
            </div>
            <Badge 
              variant="outline" 
              className={`border-2 font-bold ${health.color} ${health.bg}`}
            >
              {health.label}
            </Badge>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-cs-light/70">Карта:</span>
              <span className="ml-2 text-cs-orange font-semibold">{serverInfo.map}</span>
            </div>
            <div>
              <span className="text-cs-light/70">Игроки:</span>
              <span className="ml-2 text-green-500 font-semibold">
                {serverInfo.players}/{serverInfo.maxPlayers}
              </span>
            </div>
          </div>
        </div>

        {/* Показатели производительности */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-cs-dark/20 p-4 rounded text-center">
            <div className={`text-2xl font-bold font-orbitron ${
              serverInfo.ping < 30 ? 'text-green-500' : 
              serverInfo.ping < 60 ? 'text-yellow-500' : 
              serverInfo.ping > 500 ? 'text-red-500' : 'text-orange-500'
            }`}>
              {serverInfo.ping === 999 ? 'N/A' : `${serverInfo.ping}ms`}
            </div>
            <div className="text-xs text-cs-light/70">Пинг</div>
          </div>
          
          <div className="bg-cs-dark/20 p-4 rounded text-center">
            <div className={`text-2xl font-bold font-orbitron ${
              uptimePercent > 99 ? 'text-green-500' : 
              uptimePercent > 95 ? 'text-yellow-500' : 'text-red-500'
            }`}>
              {uptimePercent}%
            </div>
            <div className="text-xs text-cs-light/70">Uptime</div>
          </div>
        </div>

        {/* Загрузка сервера */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-cs-light/70">Загрузка сервера</span>
            <span className="text-cs-orange font-semibold">{loadPercent.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-cs-dark/50 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${
                loadPercent > 90 ? 'bg-red-500' :
                loadPercent > 70 ? 'bg-yellow-500' :
                loadPercent > 30 ? 'bg-green-500' : 'bg-blue-500'
              }`}
              style={{ width: `${loadPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Технические детали */}
        <div className="bg-cs-dark/20 p-3 rounded space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-cs-light/60">Версия:</span>
            <span className="text-cs-light font-mono">v1.0.0.71</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-cs-light/60">VAC:</span>
            <span className="text-green-400 font-semibold">Защищен</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-cs-light/60">Регион:</span>
            <span className="text-cs-light">Европа (RU)</span>
          </div>
          {lastUpdate && (
            <div className="flex justify-between text-xs">
              <span className="text-cs-light/60">Обновлено:</span>
              <span className="text-blue-400 font-mono">
                {lastUpdate.toLocaleTimeString('ru-RU')}
              </span>
            </div>
          )}
        </div>

        {/* Статус подключения */}
        <div className={`p-3 rounded border ${health.bg} ${
          error ? 'border-red-500/30' : 
          serverInfo.status === 'online' ? 'border-green-500/30' : 'border-yellow-500/30'
        }`}>
          <div className="flex items-center space-x-2">
            <Icon 
              name={error ? "AlertTriangle" : serverInfo.status === 'online' ? "CheckCircle" : "XCircle"} 
              size={16} 
              className={health.color} 
            />
            <span className={`text-sm font-semibold ${health.color}`}>
              {error ? 'Ошибка подключения' : 
               serverInfo.status === 'online' ? 'Сервер онлайн' : 'Сервер офлайн'}
            </span>
          </div>
          
          {error && (
            <div className="mt-2 text-xs text-red-400">
              {error.includes('CORS') ? 
                'Ограничения браузера блокируют прямые запросы' : 
                'Не удается подключиться к серверу'
              }
            </div>
          )}
        </div>

        {/* Быстрые действия */}
        <div className="flex space-x-2">
          <Button 
            onClick={onRefetch} 
            disabled={isLoading}
            className="flex-1 bg-cs-orange hover:bg-cs-orange/80 text-cs-dark font-orbitron font-bold"
          >
            <Icon name="RefreshCw" size={16} className="mr-2" />
            {isLoading ? 'ПРОВЕРКА...' : 'ОБНОВИТЬ'}
          </Button>
          
          <Button 
            variant="outline" 
            className="border-green-500/40 text-green-500 hover:bg-green-500/20"
            onClick={() => window.open(`steam://connect/${SERVER_IP}:${SERVER_PORT}`, '_blank')}
          >
            <Icon name="Play" size={16} className="mr-2" />
            ИГРАТЬ
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};