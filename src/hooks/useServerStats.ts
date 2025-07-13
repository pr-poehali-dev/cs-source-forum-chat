import { useState, useEffect } from 'react';

interface Player {
  name: string;
  score: number;
  kills: number;
  deaths: number;
  time: string;
  ping: number;
}

interface ServerInfo {
  name: string;
  map: string;
  players: number;
  maxPlayers: number;
  ping: number;
  status: 'online' | 'offline';
}

interface ServerStats {
  serverInfo: ServerInfo;
  players: Player[];
  isLoading: boolean;
  error: string | null;
  lastUpdate: Date | null;
}

const SERVER_IP = '45.136.205.92:27015';

// Симуляция запроса к CS:S серверу (в реальности нужен Source Query протокол)
const fetchServerData = async (): Promise<{ serverInfo: ServerInfo; players: Player[] }> => {
  // Имитация задержки сети
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
  
  // Симуляция случайных данных как с реального сервера
  const isOnline = Math.random() > 0.1; // 90% времени сервер онлайн
  
  if (!isOnline) {
    throw new Error('Сервер недоступен');
  }
  
  const maps = ['de_dust2', 'de_mirage', 'de_inferno', 'cs_office', 'de_nuke'];
  const currentMap = maps[Math.floor(Math.random() * maps.length)];
  
  const playerCount = Math.floor(Math.random() * 32) + 1;
  const maxPlayers = 32;
  
  const serverInfo: ServerInfo = {
    name: 'РЕАЛЬНЫЕ ПАЦАНЫ ИЗ 90-х [PUBLIC PRO] v34',
    map: currentMap,
    players: playerCount,
    maxPlayers,
    ping: Math.floor(Math.random() * 30) + 10,
    status: 'online'
  };
  
  // Генерация реалистичных имен игроков
  const playerNames = [
    'ProGamer2000', 'HeadShot_King', 'NoobSlayer', 'CSS_Legend', 'Player_228',
    'ClanLeader', 'RandomPlayer', 'Admin_Vitalik', 'Sniper_Elite', 'RushB_Master',
    'AK47_Lover', 'AWP_God', 'FragMaster', 'KillStorm', 'Terminator_90',
    'DeathMachine', 'BombDefuser', 'ClutchKing', 'SprayMaster', 'FlashBang_Pro',
    'Hostage_Saver', 'Map_Control', 'EcoWarrior', 'ForceWinner', 'PistolAce'
  ];
  
  const players: Player[] = Array.from({ length: playerCount }, (_, i) => {
    const name = playerNames[Math.floor(Math.random() * playerNames.length)] + 
                 (Math.random() > 0.7 ? '_' + Math.floor(Math.random() * 999) : '');
    const kills = Math.floor(Math.random() * 50);
    const deaths = Math.floor(Math.random() * 40);
    const score = kills * 2 - deaths + Math.floor(Math.random() * 100);
    const minutes = Math.floor(Math.random() * 180);
    const seconds = Math.floor(Math.random() * 60);
    
    return {
      name,
      score: Math.max(score, 0),
      kills,
      deaths,
      time: `${Math.floor(minutes / 60)}:${(minutes % 60).toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`,
      ping: Math.floor(Math.random() * 150) + 5
    };
  }).sort((a, b) => b.score - a.score); // Сортировка по очкам
  
  return { serverInfo, players };
};

export const useServerStats = (autoRefresh = true, refreshInterval = 30000) => {
  const [stats, setStats] = useState<ServerStats>({
    serverInfo: {
      name: 'Подключение...',
      map: '---',
      players: 0,
      maxPlayers: 32,
      ping: 0,
      status: 'offline'
    },
    players: [],
    isLoading: true,
    error: null,
    lastUpdate: null
  });

  const fetchStats = async () => {
    try {
      setStats(prev => ({ ...prev, isLoading: true, error: null }));
      
      const { serverInfo, players } = await fetchServerData();
      
      setStats({
        serverInfo,
        players,
        isLoading: false,
        error: null,
        lastUpdate: new Date()
      });
    } catch (error) {
      setStats(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Ошибка подключения к серверу',
        serverInfo: { ...prev.serverInfo, status: 'offline' }
      }));
    }
  };

  useEffect(() => {
    // Первоначальная загрузка
    fetchStats();
    
    if (autoRefresh) {
      const interval = setInterval(fetchStats, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [autoRefresh, refreshInterval]);

  return {
    ...stats,
    refetch: fetchStats,
    serverIp: SERVER_IP
  };
};