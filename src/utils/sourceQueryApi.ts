// Расширенный API клиент для получения реальной статистики CS:S сервера
// 45.136.205.92:27015

interface SourceServerInfo {
  name: string;
  map: string;
  folder: string;
  game: string;
  players: number;
  maxPlayers: number;
  bots: number;
  serverType: string;
  environment: string;
  visibility: string;
  vac: boolean;
  ping: number;
  version: string;
}

interface SourcePlayer {
  index: number;
  name: string;
  score: number;
  duration: number;
  kills?: number;
  deaths?: number;
  ping?: number;
}

interface ServerQueryResult {
  serverInfo: SourceServerInfo;
  players: SourcePlayer[];
  success: boolean;
  error?: string;
  source: string;
  timestamp: number;
}

const SERVER_IP = '45.136.205.92';
const SERVER_PORT = 27015;
const MYARENA_GAME_ID = 110421;

/**
 * Главная функция для получения реальной статистики сервера
 * Использует несколько источников данных с приоритетом
 */
export const getRealServerStats = async (): Promise<ServerQueryResult> => {
  console.log(`🎯 Начинаю подключение к серверу ${SERVER_IP}:${SERVER_PORT}...`);
  
  const queryMethods = [
    { name: 'MyArena API', fn: queryMyArenaAPI },
    { name: 'A2S Query Proxy', fn: queryA2SProxy },
    { name: 'GameServer API', fn: queryGameServerAPI },
    { name: 'Steam Web API', fn: querySteamWebAPI },
    { name: 'SourceQuery.net', fn: querySourceQueryNet },
    { name: 'ServerQuery.net', fn: queryServerQueryNet },
    { name: 'CS Monitor', fn: queryCSMonitor }
  ];

  for (const method of queryMethods) {
    try {
      console.log(`🔍 Пробую ${method.name}...`);
      const result = await method.fn();
      if (result.success) {
        console.log(`✅ Успешно получены данные через ${method.name}:`, result);
        return result;
      }
    } catch (error) {
      console.log(`❌ ${method.name} не удалось:`, error);
    }
  }

  // Если все методы не удались, возвращаем базовую информацию
  console.warn('⚠️ Все источники данных недоступны, использую статические данные');
  return getFallbackServerData();
};

/**
 * MyArena API - основной источник
 */
const queryMyArenaAPI = async (): Promise<ServerQueryResult> => {
  const endpoints = [
    `https://www.myarena.ru/api/game-monitoring/${MYARENA_GAME_ID}`,
    `https://myarena.ru/api/game-monitoring/${MYARENA_GAME_ID}`,
    `https://api.myarena.ru/server/${MYARENA_GAME_ID}`,
    `https://www.myarena.ru/monitoring/${MYARENA_GAME_ID}.json`
  ];

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'CS-Site/1.0 (Real Players Query)',
          'Cache-Control': 'no-cache'
        }
      });

      if (response.ok) {
        const data = await response.json();
        return parseMyArenaData(data);
      }
    } catch (error) {
      console.log(`MyArena endpoint ${endpoint} failed:`, error);
    }
  }

  throw new Error('MyArena API недоступен');
};

/**
 * A2S Query через прокси сервер
 */
const queryA2SProxy = async (): Promise<ServerQueryResult> => {
  const proxies = [
    `https://api.sourcequery.net/query/${SERVER_IP}:${SERVER_PORT}`,
    `https://sourcequery.herokuapp.com/query/${SERVER_IP}:${SERVER_PORT}`,
    `https://cs-query-proxy.vercel.app/api/query?ip=${SERVER_IP}&port=${SERVER_PORT}`
  ];

  for (const proxy of proxies) {
    try {
      const response = await fetch(proxy, {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        const data = await response.json();
        return parseA2SData(data);
      }
    } catch (error) {
      console.log(`A2S proxy ${proxy} failed:`, error);
    }
  }

  throw new Error('A2S Query прокси недоступны');
};

/**
 * GameServer API сервисы
 */
const queryGameServerAPI = async (): Promise<ServerQueryResult> => {
  const apis = [
    `https://api.gametools.network/css/${SERVER_IP}:${SERVER_PORT}`,
    `https://api.battlemetrics.com/servers?filter[search]=${SERVER_IP}:${SERVER_PORT}`,
    `https://api.gameserverquery.com/v1/css/${SERVER_IP}:${SERVER_PORT}`,
    `https://cssquery.ru/api/server/${SERVER_IP}:${SERVER_PORT}`
  ];

  for (const api of apis) {
    try {
      const response = await fetch(api, {
        method: 'GET',
        headers: { 
          'Accept': 'application/json',
          'User-Agent': 'CS-Community-Site/1.0'
        }
      });

      if (response.ok) {
        const data = await response.json();
        return parseGameServerData(data, api);
      }
    } catch (error) {
      console.log(`GameServer API ${api} failed:`, error);
    }
  }

  throw new Error('GameServer API сервисы недоступны');
};

/**
 * Steam Web API
 */
const querySteamWebAPI = async (): Promise<ServerQueryResult> => {
  try {
    const response = await fetch(
      `https://api.steampowered.com/ISteamApps/GetServersAtAddress/v0001/?addr=${SERVER_IP}&format=json`,
      { method: 'GET' }
    );

    if (response.ok) {
      const data = await response.json();
      return parseSteamData(data);
    }
  } catch (error) {
    console.log('Steam API failed:', error);
  }

  throw new Error('Steam Web API недоступен');
};

/**
 * SourceQuery.net сервис
 */
const querySourceQueryNet = async (): Promise<ServerQueryResult> => {
  try {
    const response = await fetch(
      `https://api.sourcequery.net/info/${SERVER_IP}:${SERVER_PORT}`,
      { method: 'GET', headers: { 'Accept': 'application/json' } }
    );

    if (response.ok) {
      const data = await response.json();
      return parseSourceQueryData(data);
    }
  } catch (error) {
    console.log('SourceQuery.net failed:', error);
  }

  throw new Error('SourceQuery.net недоступен');
};

/**
 * ServerQuery.net сервис
 */
const queryServerQueryNet = async (): Promise<ServerQueryResult> => {
  try {
    const response = await fetch(
      `https://serverquery.net/api/css/${SERVER_IP}:${SERVER_PORT}`,
      { method: 'GET', headers: { 'Accept': 'application/json' } }
    );

    if (response.ok) {
      const data = await response.json();
      return parseServerQueryData(data);
    }
  } catch (error) {
    console.log('ServerQuery.net failed:', error);
  }

  throw new Error('ServerQuery.net недоступен');
};

/**
 * CS Monitor API
 */
const queryCSMonitor = async (): Promise<ServerQueryResult> => {
  try {
    const response = await fetch(
      `https://cs-monitor.ru/api/server/${SERVER_IP}:${SERVER_PORT}`,
      { method: 'GET', headers: { 'Accept': 'application/json' } }
    );

    if (response.ok) {
      const data = await response.json();
      return parseCSMonitorData(data);
    }
  } catch (error) {
    console.log('CS Monitor failed:', error);
  }

  throw new Error('CS Monitor недоступен');
};

/**
 * Парсеры данных от различных API
 */
const parseMyArenaData = (data: any): ServerQueryResult => {
  const serverInfo: SourceServerInfo = {
    name: data.name || data.hostname || 'РЕАЛЬНЫЕ ПАЦАНЫ ИЗ 90-х [PUBLIC PRO] v34',
    map: data.map || 'de_dust2',
    folder: 'cstrike',
    game: 'Counter-Strike: Source',
    players: parseInt(data.players) || 0,
    maxPlayers: parseInt(data.maxplayers) || 32,
    bots: parseInt(data.bots) || 0,
    serverType: 'd',
    environment: 'l',
    visibility: '1',
    vac: true,
    ping: parseInt(data.ping) || 15,
    version: '1.0.0.71'
  };

  const players: SourcePlayer[] = (data.playersList || data.players_list || [])
    .map((player: any, index: number) => ({
      index,
      name: player.name || player.nick || `Player_${index + 1}`,
      score: parseInt(player.score) || parseInt(player.frags) || 0,
      duration: parseInt(player.time) || parseInt(player.duration) || 0,
      kills: parseInt(player.kills) || parseInt(player.frags) || 0,
      deaths: parseInt(player.deaths) || 0,
      ping: parseInt(player.ping) || 50
    }))
    .sort((a: SourcePlayer, b: SourcePlayer) => b.score - a.score);

  return {
    serverInfo,
    players,
    success: true,
    source: 'MyArena API',
    timestamp: Date.now()
  };
};

const parseA2SData = (data: any): ServerQueryResult => {
  const serverInfo: SourceServerInfo = {
    name: data.info?.name || 'РЕАЛЬНЫЕ ПАЦАНЫ ИЗ 90-х [PUBLIC PRO] v34',
    map: data.info?.map || 'de_dust2',
    folder: data.info?.folder || 'cstrike',
    game: data.info?.game || 'Counter-Strike: Source',
    players: parseInt(data.info?.players) || 0,
    maxPlayers: parseInt(data.info?.maxPlayers) || 32,
    bots: parseInt(data.info?.bots) || 0,
    serverType: data.info?.serverType || 'd',
    environment: data.info?.environment || 'l',
    visibility: data.info?.visibility || '1',
    vac: data.info?.vac !== false,
    ping: parseInt(data.ping) || 15,
    version: data.info?.version || '1.0.0.71'
  };

  const players: SourcePlayer[] = (data.players || [])
    .map((player: any, index: number) => ({
      index: player.index || index,
      name: player.name || `Player_${index + 1}`,
      score: parseInt(player.score) || 0,
      duration: parseInt(player.duration) || 0,
      ping: parseInt(player.ping) || 50
    }))
    .sort((a: SourcePlayer, b: SourcePlayer) => b.score - a.score);

  return {
    serverInfo,
    players,
    success: true,
    source: 'A2S Query',
    timestamp: Date.now()
  };
};

const parseGameServerData = (data: any, source: string): ServerQueryResult => {
  // Универсальный парсер для различных GameServer API
  const info = data.data?.[0]?.attributes || data;
  
  const serverInfo: SourceServerInfo = {
    name: info.name || info.hostname || 'РЕАЛЬНЫЕ ПАЦАНЫ ИЗ 90-х [PUBLIC PRO] v34',
    map: info.map || info.details?.map || 'de_dust2',
    folder: 'cstrike',
    game: 'Counter-Strike: Source',
    players: parseInt(info.players) || parseInt(info.numplayers) || 0,
    maxPlayers: parseInt(info.maxPlayers) || parseInt(info.maxplayers) || 32,
    bots: parseInt(info.bots) || 0,
    serverType: 'd',
    environment: 'l',
    visibility: '1',
    vac: true,
    ping: parseInt(info.ping) || 15,
    version: '1.0.0.71'
  };

  const players: SourcePlayer[] = (info.players || [])
    .map((player: any, index: number) => ({
      index,
      name: player.name || `Player_${index + 1}`,
      score: parseInt(player.score) || 0,
      duration: parseInt(player.time) || 0,
      ping: parseInt(player.ping) || 50
    }))
    .sort((a: SourcePlayer, b: SourcePlayer) => b.score - a.score);

  return {
    serverInfo,
    players,
    success: true,
    source,
    timestamp: Date.now()
  };
};

const parseSteamData = (data: any): ServerQueryResult => {
  const server = data.response?.servers?.[0];
  if (!server) {
    throw new Error('Сервер не найден в Steam API');
  }

  const serverInfo: SourceServerInfo = {
    name: server.name || 'РЕАЛЬНЫЕ ПАЦАНЫ ИЗ 90-х [PUBLIC PRO] v34',
    map: server.map || 'de_dust2',
    folder: 'cstrike',
    game: 'Counter-Strike: Source',
    players: parseInt(server.players) || 0,
    maxPlayers: parseInt(server.max_players) || 32,
    bots: parseInt(server.bots) || 0,
    serverType: 'd',
    environment: 'l',
    visibility: '1',
    vac: server.secure === 1,
    ping: 15,
    version: server.version || '1.0.0.71'
  };

  return {
    serverInfo,
    players: [], // Steam API не предоставляет список игроков
    success: true,
    source: 'Steam Web API',
    timestamp: Date.now()
  };
};

const parseSourceQueryData = (data: any): ServerQueryResult => {
  return parseA2SData(data); // Схожий формат
};

const parseServerQueryData = (data: any): ServerQueryResult => {
  return parseGameServerData(data, 'ServerQuery.net');
};

const parseCSMonitorData = (data: any): ServerQueryResult => {
  return parseGameServerData(data, 'CS Monitor');
};

/**
 * Fallback данные когда все API недоступны
 */
const getFallbackServerData = (): ServerQueryResult => {
  const serverInfo: SourceServerInfo = {
    name: 'РЕАЛЬНЫЕ ПАЦАНЫ ИЗ 90-х [PUBLIC PRO] v34',
    map: 'de_dust2',
    folder: 'cstrike',
    game: 'Counter-Strike: Source',
    players: 0,
    maxPlayers: 32,
    bots: 0,
    serverType: 'd',
    environment: 'l',
    visibility: '1',
    vac: true,
    ping: 999,
    version: '1.0.0.71'
  };

  return {
    serverInfo,
    players: [],
    success: false,
    error: 'Все источники данных недоступны. Требуется прямое подключение к серверу.',
    source: 'Fallback',
    timestamp: Date.now()
  };
};

/**
 * Форматирование времени в игре
 */
export const formatPlayTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Получение актуального пинга к серверу
 */
export const measureServerPing = async (): Promise<number> => {
  const startTime = performance.now();
  try {
    await fetch(`http://${SERVER_IP}:${SERVER_PORT}`, { 
      method: 'HEAD',
      mode: 'no-cors' 
    });
    return Math.round(performance.now() - startTime);
  } catch {
    return 999; // Недоступен
  }
};

export { SERVER_IP, SERVER_PORT, MYARENA_GAME_ID };
export type { SourceServerInfo, SourcePlayer, ServerQueryResult };