import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

interface ServerInfo {
  name: string;
  map: string;
  players: number;
  max: number;
  online: boolean;
}

export default function ServerStats() {
  const [serverInfo, setServerInfo] = useState<ServerInfo>({
    name: "РЕАЛЬНЫЕ ПАЦАНЫ ИЗ 90-х",
    map: "de_dust2",
    players: 12,
    max: 32,
    online: true
  });

  const [isLoading, setIsLoading] = useState(false);

  // Симуляция запроса к серверу
  const updateServerInfo = async () => {
    setIsLoading(true);
    
    // Имитируем задержку сети
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Симулируем случайные данные сервера
    const randomPlayers = Math.floor(Math.random() * 32);
    const maps = ['de_dust2', 'de_mirage', 'de_inferno', 'de_nuke', 'de_cache'];
    const randomMap = maps[Math.floor(Math.random() * maps.length)];
    
    setServerInfo({
      name: "РЕАЛЬНЫЕ ПАЦАНЫ ИЗ 90-х",
      map: randomMap,
      players: randomPlayers,
      max: 32,
      online: Math.random() > 0.1 // 90% шанс что сервер онлайн
    });
    
    setIsLoading(false);
  };

  // Автообновление каждые 30 секунд
  useEffect(() => {
    const interval = setInterval(updateServerInfo, 30000);
    return () => clearInterval(interval);
  }, []);

  const playerPercentage = serverInfo.online ? (serverInfo.players * 100) / serverInfo.max : 0;

  return (
    <Card className="bg-cs-gray/80 border-cs-orange/20 backdrop-blur-sm hover:bg-cs-gray/90 transition-all duration-300">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Server" size={24} className="text-cs-orange" />
            <span className="font-orbitron text-lg font-bold text-cs-orange">
              СТАТУС СЕРВЕРА
            </span>
          </div>
          <button
            onClick={updateServerInfo}
            disabled={isLoading}
            className="p-2 rounded-lg bg-cs-orange/20 hover:bg-cs-orange/30 transition-colors disabled:opacity-50"
          >
            <Icon 
              name="RotateCw" 
              size={16} 
              className={`text-cs-orange ${isLoading ? 'animate-spin' : ''}`} 
            />
          </button>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Статус онлайн */}
        <div className="flex items-center justify-between">
          <span className="text-cs-light/80 font-orbitron text-sm">Статус:</span>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${serverInfo.online ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
            <span className={`font-orbitron font-bold ${serverInfo.online ? 'text-green-500' : 'text-red-500'}`}>
              {serverInfo.online ? 'ОНЛАЙН' : 'ОФФЛАЙН'}
            </span>
          </div>
        </div>

        {/* Название сервера */}
        <div className="flex items-center justify-between">
          <span className="text-cs-light/80 font-orbitron text-sm">Сервер:</span>
          <span className="text-cs-light font-orbitron font-bold text-sm text-right max-w-[200px] truncate">
            {serverInfo.name}
          </span>
        </div>

        {/* Карта */}
        <div className="flex items-center justify-between">
          <span className="text-cs-light/80 font-orbitron text-sm">Карта:</span>
          <span className="text-cs-orange font-orbitron font-bold text-sm">
            {serverInfo.online ? serverInfo.map : '—'}
          </span>
        </div>

        {/* Игроки */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-cs-light/80 font-orbitron text-sm">Игроки:</span>
            <span className="text-cs-light font-orbitron font-bold text-sm">
              {serverInfo.online ? `${serverInfo.players} / ${serverInfo.max}` : '0 / 32'}
            </span>
          </div>
          
          {/* Прогресс бар */}
          <div className="space-y-1">
            <Progress 
              value={playerPercentage} 
              className="h-3 bg-cs-dark/60"
            />
            <div className="flex justify-between text-xs text-cs-light/60 font-orbitron">
              <span>{serverInfo.online ? serverInfo.players : 0} игроков</span>
              <span>{Math.round(playerPercentage)}%</span>
            </div>
          </div>
        </div>

        {/* IP адрес для подключения */}
        <div className="mt-4 p-3 bg-cs-dark/40 rounded border border-cs-orange/20">
          <div className="flex items-center justify-between">
            <span className="text-cs-light/80 font-orbitron text-xs">IP для подключения:</span>
            <button
              onClick={() => {
                navigator.clipboard.writeText('45.136.205.92:27015');
                alert('IP скопирован в буфер обмена!');
              }}
              className="text-cs-orange hover:text-cs-orange/80 transition-colors"
            >
              <Icon name="Copy" size={14} />
            </button>
          </div>
          <code className="text-cs-orange font-mono text-sm font-bold">
            45.136.205.92:27015
          </code>
        </div>
      </CardContent>
    </Card>
  );
}