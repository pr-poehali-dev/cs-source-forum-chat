import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Player {
  name: string;
  frags: number;
  time: string;
}

interface ServerInfo {
  name: string;
  map: string;
  game: string;
  players: number;
  max: number;
  bots: number;
  secure: boolean;
  password: boolean;
  os: string;
  version: string;
  ping: number;
  online: boolean;
}

interface ServerStats {
  info: ServerInfo;
  players: Player[];
  rules: Record<string, string>;
  error: string | null;
  queryTime: number;
}

export default function ServerStats() {
  const [serverStats, setServerStats] = useState<ServerStats>({
    info: {
      name: "РЕАЛЬНЫЕ ПАЦАНЫ ИЗ 90-х",
      map: "de_dust2",
      game: "Counter-Strike: Source",
      players: 0,
      max: 32,
      bots: 0,
      secure: true,
      password: false,
      os: "Linux",
      version: "1.0.0.7",
      ping: 0,
      online: false
    },
    players: [],
    rules: {},
    error: null,
    queryTime: 0
  });

  const [isLoading, setIsLoading] = useState(false);

  // Имена для симуляции игроков
  const playerNames = [
    "Витек_Босс", "Димон_Киллер", "Серёга_Про", "Антоха_Снайпер", 
    "Максон_Хардкор", "Толян_Мастер", "Колян_Легенда", "Вован_Терминатор",
    "Санёк_Разрушитель", "Игорёк_Професор", "Денис_Убийца", "Алексей_Воин"
  ];

  // Симуляция запроса к серверу (имитация PHP SourceQuery)
  const updateServerInfo = async () => {
    setIsLoading(true);
    const startTime = performance.now();
    
    try {
      // Имитируем задержку сети
      await new Promise(resolve => setTimeout(resolve, Math.random() * 2000 + 500));
      
      const isOnline = Math.random() > 0.15; // 85% шанс что сервер онлайн
      
      if (!isOnline) {
        setServerStats(prev => ({
          ...prev,
          info: { ...prev.info, online: false, players: 0 },
          players: [],
          error: "Failed to connect to server",
          queryTime: (performance.now() - startTime) / 1000
        }));
        setIsLoading(false);
        return;
      }

      // Симулируем случайные данные сервера
      const randomPlayers = Math.floor(Math.random() * 32);
      const randomBots = Math.floor(Math.random() * 3);
      const maps = ['de_dust2', 'de_mirage', 'de_inferno', 'de_nuke', 'de_cache', 'cs_office', 'de_aztec'];
      const randomMap = maps[Math.floor(Math.random() * maps.length)];
      
      // Генерируем список игроков
      const players: Player[] = [];
      for (let i = 0; i < randomPlayers; i++) {
        const name = playerNames[Math.floor(Math.random() * playerNames.length)];
        const frags = Math.floor(Math.random() * 50);
        const timeMinutes = Math.floor(Math.random() * 120);
        players.push({
          name: `${name}_${Math.floor(Math.random() * 999)}`,
          frags,
          time: `${Math.floor(timeMinutes / 60)}:${(timeMinutes % 60).toString().padStart(2, '0')}`
        });
      }
      
      // Сортируем игроков по фрагам
      players.sort((a, b) => b.frags - a.frags);

      setServerStats({
        info: {
          name: "РЕАЛЬНЫЕ ПАЦАНЫ ИЗ 90-х | 45.136.205.92:27015",
          map: randomMap,
          game: "Counter-Strike: Source",
          players: randomPlayers,
          max: 32,
          bots: randomBots,
          secure: true,
          password: false,
          os: "Linux",
          version: "1.0.0.7",
          ping: Math.floor(Math.random() * 100 + 10),
          online: true
        },
        players,
        rules: {
          "mp_timelimit": "30",
          "mp_maxrounds": "15",
          "mp_friendly_fire": "0",
          "sv_gravity": "800",
          "mp_roundtime": "1.75"
        },
        error: null,
        queryTime: (performance.now() - startTime) / 1000
      });
    } catch (error) {
      setServerStats(prev => ({
        ...prev,
        error: "Connection failed",
        queryTime: (performance.now() - startTime) / 1000
      }));
    }
    
    setIsLoading(false);
  };

  // Автообновление каждые 30 секунд
  useEffect(() => {
    const interval = setInterval(updateServerInfo, 30000);
    return () => clearInterval(interval);
  }, []);

  const playerPercentage = serverStats.info.online ? (serverStats.info.players * 100) / serverStats.info.max : 0;

  return (
    <div className="space-y-6">
      {/* Основная информация о сервере */}
      <Card className="bg-cs-gray/80 border-cs-orange/20 backdrop-blur-sm hover:bg-cs-gray/90 transition-all duration-300">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Server" size={24} className="text-cs-orange" />
              <span className="font-orbitron text-lg font-bold text-cs-orange">
                ИНФОРМАЦИЯ О СЕРВЕРЕ
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant={serverStats.queryTime > 1.0 ? "destructive" : "default"} className="font-mono">
                {serverStats.queryTime.toFixed(3)}s
              </Badge>
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
            </div>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {serverStats.error && (
            <div className="p-3 bg-red-500/20 border border-red-500/40 rounded text-red-400 text-sm font-mono">
              {serverStats.error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            {/* Статус */}
            <div className="flex items-center justify-between">
              <span className="text-cs-light/80 font-orbitron text-sm">Статус:</span>
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${serverStats.info.online ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                <span className={`font-orbitron font-bold ${serverStats.info.online ? 'text-green-500' : 'text-red-500'}`}>
                  {serverStats.info.online ? 'ОНЛАЙН' : 'ОФФЛАЙН'}
                </span>
              </div>
            </div>

            {/* Игра */}
            <div className="flex items-center justify-between">
              <span className="text-cs-light/80 font-orbitron text-sm">Игра:</span>
              <span className="text-cs-light font-orbitron font-bold text-sm">
                {serverStats.info.game}
              </span>
            </div>

            {/* Карта */}
            <div className="flex items-center justify-between">
              <span className="text-cs-light/80 font-orbitron text-sm">Карта:</span>
              <span className="text-cs-orange font-orbitron font-bold text-sm">
                {serverStats.info.online ? serverStats.info.map : '—'}
              </span>
            </div>

            {/* Пинг */}
            <div className="flex items-center justify-between">
              <span className="text-cs-light/80 font-orbitron text-sm">Пинг:</span>
              <span className="text-green-400 font-orbitron font-bold text-sm">
                {serverStats.info.online ? `${serverStats.info.ping}ms` : '—'}
              </span>
            </div>

            {/* Защита */}
            <div className="flex items-center justify-between">
              <span className="text-cs-light/80 font-orbitron text-sm">VAC:</span>
              <span className={`font-orbitron font-bold text-sm ${serverStats.info.secure ? 'text-green-400' : 'text-red-400'}`}>
                {serverStats.info.secure ? 'ВКЛЮЧЕН' : 'ВЫКЛЮЧЕН'}
              </span>
            </div>

            {/* Пароль */}
            <div className="flex items-center justify-between">
              <span className="text-cs-light/80 font-orbitron text-sm">Пароль:</span>
              <span className={`font-orbitron font-bold text-sm ${serverStats.info.password ? 'text-red-400' : 'text-green-400'}`}>
                {serverStats.info.password ? 'ЕСТЬ' : 'НЕТ'}
              </span>
            </div>
          </div>

          {/* Игроки */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-cs-light/80 font-orbitron text-sm">Игроки:</span>
              <span className="text-cs-light font-orbitron font-bold text-sm">
                {serverStats.info.online ? `${serverStats.info.players} / ${serverStats.info.max}` : '0 / 32'}
                {serverStats.info.bots > 0 && ` (+${serverStats.info.bots} ботов)`}
              </span>
            </div>
            
            {/* Прогресс бар */}
            <div className="space-y-1">
              <Progress 
                value={playerPercentage} 
                className="h-3 bg-cs-dark/60"
              />
              <div className="flex justify-between text-xs text-cs-light/60 font-orbitron">
                <span>{serverStats.info.online ? serverStats.info.players : 0} игроков</span>
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

      {/* Список игроков */}
      {serverStats.info.online && serverStats.players.length > 0 && (
        <Card className="bg-cs-gray/80 border-cs-orange/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="font-orbitron text-lg font-bold text-cs-orange flex items-center space-x-2">
              <Icon name="Users" size={20} />
              <span>ИГРОКИ</span>
              <Badge variant="secondary">{serverStats.players.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {serverStats.players.map((player, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-cs-dark/40 rounded">
                  <div className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      index === 0 ? 'bg-yellow-500 text-black' : 
                      index === 1 ? 'bg-gray-400 text-black' : 
                      index === 2 ? 'bg-orange-600 text-white' : 
                      'bg-cs-gray text-white'
                    }`}>
                      {index + 1}
                    </div>
                    <span className="font-orbitron text-sm text-cs-light">{player.name}</span>
                  </div>
                  <div className="flex items-center space-x-4 text-xs text-cs-light/60">
                    <span className="text-cs-orange font-bold">{player.frags} фрагов</span>
                    <span>{player.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Правила сервера */}
      {serverStats.info.online && Object.keys(serverStats.rules).length > 0 && (
        <Card className="bg-cs-gray/80 border-cs-orange/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="font-orbitron text-lg font-bold text-cs-orange flex items-center space-x-2">
              <Icon name="Settings" size={20} />
              <span>ПРАВИЛА СЕРВЕРА</span>
              <Badge variant="secondary">{Object.keys(serverStats.rules).length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {Object.entries(serverStats.rules).map(([rule, value]) => (
                <div key={rule} className="flex items-center justify-between p-2 bg-cs-dark/40 rounded">
                  <span className="text-cs-light/80 font-orbitron text-sm">{rule}</span>
                  <span className="text-cs-orange font-mono text-sm">{value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}