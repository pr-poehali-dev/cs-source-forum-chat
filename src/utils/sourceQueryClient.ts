// TypeScript версия Source Query для получения реальной статистики сервера
// Базируется на PHP xPaw/SourceQuery библиотеке

interface SourceQueryInfo {
  Protocol: number;
  HostName: string;
  Map: string;
  ModDir: string;
  ModDesc: string;
  AppID: number;
  Players: number;
  MaxPlayers: number;
  Bots: number;
  Dedicated: string;
  Os: string;
  Password: boolean;
  Secure: boolean;
  Version: string;
  ExtraDataFlags: number;
  GamePort: number;
  ServerID: string;
}

interface SourceQueryPlayer {
  Index: number;
  Name: string;
  Frags: number;
  Time: number;
  TimeF: string;
}

interface SourceQueryRule {
  [key: string]: string;
}

interface SourceQueryResult {
  info: SourceQueryInfo | null;
  players: SourceQueryPlayer[];
  rules: SourceQueryRule[];
  timer: number;
  error: string | null;
  serverAddress: string;
  serverPort: number;
}

const SERVER_IP = '45.136.205.92';
const SERVER_PORT = 27015;
const TIMEOUT = 3;

/**
 * Эмуляция Source Query Protocol через WebSocket/HTTP прокси
 * Поскольку браузер не может напрямую работать с UDP
 */
export const querySourceServer = async (): Promise<SourceQueryResult> => {
  const startTime = performance.now();
  
  try {
    console.log(`🎯 Source Query к ${SERVER_IP}:${SERVER_PORT}...`);
    
    // Попытка через различные Source Query прокси
    const result = await trySourceQueryProxies();
    
    const timer = (performance.now() - startTime) / 1000;
    
    return {
      ...result,
      timer: parseFloat(timer.toFixed(4)),
      serverAddress: SERVER_IP,
      serverPort: SERVER_PORT
    };
    
  } catch (error) {
    const timer = (performance.now() - startTime) / 1000;
    console.error('❌ Source Query ошибка:', error);
    
    return {
      info: null,
      players: [],
      rules: [],
      timer: parseFloat(timer.toFixed(4)),
      error: error instanceof Error ? error.message : 'Unknown error',
      serverAddress: SERVER_IP,
      serverPort: SERVER_PORT
    };
  }
};

/**
 * Попытка подключения через различные Source Query прокси
 */
const trySourceQueryProxies = async (): Promise<Omit<SourceQueryResult, 'timer' | 'serverAddress' | 'serverPort'>> => {
  const proxies = [
    // Прямой Source Query через WebSocket прокси
    {
      name: 'Source Query WebSocket',
      url: `wss://sourcequery-proxy.herokuapp.com/query/${SERVER_IP}:${SERVER_PORT}`,
      type: 'websocket'
    },
    // HTTP прокси для Source Query
    {
      name: 'Source Query HTTP',
      url: `https://api.sourcequery.net/info/${SERVER_IP}:${SERVER_PORT}`,
      type: 'http'
    },
    // Альтернативный прокси
    {
      name: 'GameQuery API',
      url: `https://gamequery.herokuapp.com/source/${SERVER_IP}:${SERVER_PORT}`,
      type: 'http'
    },
    // Локальный эмулятор Source Query
    {
      name: 'Local Source Query Emulator',
      url: `/api/sourcequery?host=${SERVER_IP}&port=${SERVER_PORT}`,
      type: 'http'
    }
  ];

  let lastError: Error | null = null;

  for (const proxy of proxies) {
    try {
      console.log(`🔍 Пробую ${proxy.name}...`);
      
      if (proxy.type === 'websocket') {
        const result = await queryViaWebSocket(proxy.url);
        if (result) return result;
      } else {
        const result = await queryViaHTTP(proxy.url);
        if (result) return result;
      }
    } catch (error) {
      console.log(`❌ ${proxy.name} не удалось:`, error);
      lastError = error instanceof Error ? error : new Error(String(error));
    }
  }

  // Если все прокси не удались, используем эмуляцию данных
  console.warn('⚠️ Все Source Query прокси недоступны, используем эмуляцию...');
  return generateMockSourceQueryData();
};

/**
 * Запрос через WebSocket прокси
 */
const queryViaWebSocket = async (url: string): Promise<Omit<SourceQueryResult, 'timer' | 'serverAddress' | 'serverPort'> | null> => {
  return new Promise((resolve, reject) => {
    try {
      const ws = new WebSocket(url);
      const timeout = setTimeout(() => {
        ws.close();
        reject(new Error('WebSocket timeout'));
      }, TIMEOUT * 1000);

      ws.onopen = () => {
        console.log('✅ WebSocket соединение установлено');
        ws.send(JSON.stringify({ 
          command: 'query', 
          server: `${SERVER_IP}:${SERVER_PORT}`,
          timeout: TIMEOUT 
        }));
      };

      ws.onmessage = (event) => {
        clearTimeout(timeout);
        try {
          const data = JSON.parse(event.data);
          const result = parseSourceQueryResponse(data);
          ws.close();
          resolve(result);
        } catch (error) {
          reject(new Error('Ошибка парсинга WebSocket ответа'));
        }
      };

      ws.onerror = () => {
        clearTimeout(timeout);
        reject(new Error('WebSocket connection error'));
      };

      ws.onclose = (event) => {
        clearTimeout(timeout);
        if (event.code !== 1000) {
          reject(new Error(`WebSocket closed with code ${event.code}`));
        }
      };
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Запрос через HTTP прокси
 */
const queryViaHTTP = async (url: string): Promise<Omit<SourceQueryResult, 'timer' | 'serverAddress' | 'serverPort'> | null> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT * 1000);

  try {
    const response = await fetch(url, {
      method: 'GET',
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'SourceQuery-Client/1.0'
      }
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return parseSourceQueryResponse(data);
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
};

/**
 * Парсинг ответа Source Query
 */
const parseSourceQueryResponse = (data: any): Omit<SourceQueryResult, 'timer' | 'serverAddress' | 'serverPort'> => {
  console.log('📥 Получен Source Query ответ:', data);

  // Парсинг информации о сервере
  const info: SourceQueryInfo | null = data.info ? {
    Protocol: data.info.Protocol || 17,
    HostName: data.info.HostName || data.info.hostname || 'РЕАЛЬНЫЕ ПАЦАНЫ ИЗ 90-х [PUBLIC PRO] v34',
    Map: data.info.Map || data.info.map || 'de_dust2',
    ModDir: data.info.ModDir || 'cstrike',
    ModDesc: data.info.ModDesc || 'Counter-Strike: Source',
    AppID: data.info.AppID || 240,
    Players: parseInt(data.info.Players) || parseInt(data.info.players) || 0,
    MaxPlayers: parseInt(data.info.MaxPlayers) || parseInt(data.info.maxplayers) || 32,
    Bots: parseInt(data.info.Bots) || parseInt(data.info.bots) || 0,
    Dedicated: data.info.Dedicated || 'd',
    Os: data.info.Os || 'l',
    Password: data.info.Password === true || data.info.password === true,
    Secure: data.info.Secure !== false,
    Version: data.info.Version || data.info.version || '1.0.0.71',
    ExtraDataFlags: data.info.ExtraDataFlags || 0,
    GamePort: parseInt(data.info.GamePort) || SERVER_PORT,
    ServerID: data.info.ServerID || data.info.serverid || '0'
  } : null;

  // Парсинг игроков
  const players: SourceQueryPlayer[] = Array.isArray(data.players) ? 
    data.players.map((player: any, index: number) => ({
      Index: player.Index !== undefined ? player.Index : index,
      Name: player.Name || player.name || `Player_${index + 1}`,
      Frags: parseInt(player.Frags) || parseInt(player.frags) || parseInt(player.score) || 0,
      Time: parseInt(player.Time) || parseInt(player.time) || 0,
      TimeF: player.TimeF || formatTime(parseInt(player.Time) || parseInt(player.time) || 0)
    })) : [];

  // Парсинг правил
  const rules: SourceQueryRule[] = data.rules || [];

  return {
    info,
    players: players.sort((a, b) => b.Frags - a.Frags), // Сортировка по фрагам
    rules,
    error: null
  };
};

/**
 * Генерация mock данных когда все прокси недоступны
 */
const generateMockSourceQueryData = (): Omit<SourceQueryResult, 'timer' | 'serverAddress' | 'serverPort'> => {
  console.log('🔧 Генерация эмуляции Source Query данных...');

  const mockInfo: SourceQueryInfo = {
    Protocol: 17,
    HostName: 'РЕАЛЬНЫЕ ПАЦАНЫ ИЗ 90-х [PUBLIC PRO] v34',
    Map: 'de_dust2',
    ModDir: 'cstrike',
    ModDesc: 'Counter-Strike: Source',
    AppID: 240,
    Players: Math.floor(Math.random() * 20) + 5,
    MaxPlayers: 32,
    Bots: Math.floor(Math.random() * 5),
    Dedicated: 'd',
    Os: 'l',
    Password: false,
    Secure: true,
    Version: '1.0.0.71',
    ExtraDataFlags: 177,
    GamePort: SERVER_PORT,
    ServerID: '45136205921'
  };

  // Генерация игроков
  const playerNames = [
    'ProGamer2000', 'HeadShot_King', 'CSS_Legend', 'NoobSlayer', 'Admin_Vitalik',
    'WarriorXX', 'SniperElite', 'RushB_Master', 'FragHunter', 'TopPlayer'
  ];

  const mockPlayers: SourceQueryPlayer[] = Array.from({ length: mockInfo.Players }, (_, i) => {
    const time = Math.floor(Math.random() * 7200) + 300; // 5 минут - 2 часа
    return {
      Index: i,
      Name: playerNames[i] || `Player_${i + 1}`,
      Frags: Math.floor(Math.random() * 50) + 5,
      Time: time,
      TimeF: formatTime(time)
    };
  }).sort((a, b) => b.Frags - a.Frags);

  const mockRules: SourceQueryRule[] = [
    { mp_friendlyfire: '0' },
    { mp_autoteambalance: '1' },
    { mp_maxrounds: '30' },
    { sv_gravity: '800' },
    { mp_timelimit: '0' },
    { mp_fraglimit: '0' }
  ];

  return {
    info: mockInfo,
    players: mockPlayers,
    rules: mockRules,
    error: 'Используются эмулированные данные - прямой Source Query недоступен из браузера'
  };
};

/**
 * Форматирование времени в читаемый формат
 */
const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Получение детальной информации о сервере
 */
export const getServerDetails = async (): Promise<{
  isOnline: boolean;
  responseTime: number;
  playerCount: number;
  serverName: string;
  currentMap: string;
  gameVersion: string;
}> => {
  const result = await querySourceServer();
  
  return {
    isOnline: result.info !== null && !result.error,
    responseTime: result.timer,
    playerCount: result.info?.Players || 0,
    serverName: result.info?.HostName || 'Unknown Server',
    currentMap: result.info?.Map || 'Unknown Map',
    gameVersion: result.info?.Version || 'Unknown Version'
  };
};

export { SERVER_IP, SERVER_PORT };
export type { SourceQueryInfo, SourceQueryPlayer, SourceQueryRule, SourceQueryResult };