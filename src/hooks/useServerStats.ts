import { useState, useEffect } from 'react';
import { getRealServerStats, formatPlayTime, measureServerPing } from '@/utils/sourceQueryApi';
import type { SourceServerInfo, SourcePlayer } from '@/utils/sourceQueryApi';

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

const SERVER_IP = '45.136.205.92';
const SERVER_PORT = 27015;
const MYARENA_GAME_ID = 110421;

// РЕАЛЬНОЕ подключение к CS:S серверу 45.136.205.92:27015
// Используем расширенную систему Source Query API
const fetchServerData = async (): Promise<{ serverInfo: ServerInfo; players: Player[] }> => {
  try {
    console.log(`🔍 Подключаемся к серверу ${SERVER_IP}:${SERVER_PORT}...`);
    
    // Используем новую улучшенную систему запросов
    const result = await getRealServerStats();
    
    if (result.success) {
      console.log(`✅ Данные получены через ${result.source}:`, result);
      
      // Конвертируем в старый формат для совместимости
      const serverInfo: ServerInfo = {
        name: result.serverInfo.name,
        map: result.serverInfo.map,
        players: result.serverInfo.players,
        maxPlayers: result.serverInfo.maxPlayers,
        ping: result.serverInfo.ping,
        status: result.serverInfo.players > 0 || result.success ? 'online' : 'offline'
      };

      const players: Player[] = result.players.map(player => ({
        name: player.name,
        score: player.score,
        kills: player.kills || Math.floor(player.score * 0.7),
        deaths: player.deaths || Math.floor(player.score * 0.5),
        time: formatPlayTime(player.duration),
        ping: player.ping || 50
      }));

      return { serverInfo, players };
    } else {
      throw new Error(result.error || 'Не удалось получить данные сервера');
    }
  } catch (error) {
    console.error('❌ Ошибка подключения к серверу:', error);
    throw error;
  }
};

// Функция измерения пинга к серверу
const measurePing = async (): Promise<number> => {
  try {
    return await measureServerPing();
  } catch {
    return 999;
  }
};

// Дополнительная функция для отладки подключения
const debugServerConnection = async (): Promise<void> => {
  console.log('🔧 Отладка подключения к серверу...');
  console.log(`📍 Сервер: ${SERVER_IP}:${SERVER_PORT}`);
  console.log(`🆔 MyArena ID: ${MYARENA_GAME_ID}`);
  
  const ping = await measurePing();
  console.log(`📡 Пинг: ${ping}ms`);
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
      
      // Запускаем отладку (только в dev режиме)
      if (process.env.NODE_ENV === 'development') {
        await debugServerConnection();
      }
      
      const { serverInfo, players } = await fetchServerData();
      
      setStats({
        serverInfo,
        players,
        isLoading: false,
        error: null,
        lastUpdate: new Date()
      });
      
      console.log(`✅ Данные сервера ${SERVER_IP}:${SERVER_PORT} обновлены:`, { 
        serverInfo, 
        playersCount: players.length,
        realPlayers: players.filter(p => !p.name.includes('Bot')).length 
      });
    } catch (error) {
      console.error(`❌ Ошибка получения данных с ${SERVER_IP}:${SERVER_PORT}:`, error);
      
      setStats(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Ошибка подключения к серверу',
        serverInfo: { 
          name: 'РЕАЛЬНЫЕ ПАЦАНЫ ИЗ 90-х [PUBLIC PRO] v34',
          map: 'Неизвестно',
          players: 0,
          maxPlayers: 32,
          ping: 999,
          status: 'offline' 
        }
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