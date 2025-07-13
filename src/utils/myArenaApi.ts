// Утилита для работы с MyArena API
export interface MyArenaServerData {
  id: number;
  name: string;
  game: string;
  ip: string;
  port: number;
  map: string;
  players: number;
  maxplayers: number;
  online: boolean;
  ping?: number;
  playersList?: MyArenaPlayer[];
}

export interface MyArenaPlayer {
  name: string;
  score: number;
  kills?: number;
  deaths?: number;
  time: number;
  ping: number;
}

const MYARENA_GAME_ID = 110421;
const MYARENA_BASE_URL = 'https://www.myarena.ru';

/**
 * Получить данные сервера из MyArena
 */
export const getMyArenaServerData = async (): Promise<MyArenaServerData> => {
  try {
    // Попытка получить JSON данные
    const jsonResponse = await fetch(`${MYARENA_BASE_URL}/api/game-monitoring/${MYARENA_GAME_ID}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'CS-Community-Site/1.0'
      }
    });

    if (jsonResponse.ok) {
      const data = await jsonResponse.json();
      console.log('✅ MyArena JSON API:', data);
      return parseMyArenaJson(data);
    }

    // Если JSON API недоступен, пытаемся парсить HTML виджет
    const htmlResponse = await fetch(`${MYARENA_BASE_URL}/game-monitoring.html?game=${MYARENA_GAME_ID}`, {
      method: 'GET',
      headers: {
        'Accept': 'text/html'
      }
    });

    if (htmlResponse.ok) {
      const html = await htmlResponse.text();
      console.log('📄 MyArena HTML получен, парсинг...');
      return parseMyArenaHtml(html);
    }

    throw new Error('MyArena API недоступен');
  } catch (error) {
    console.error('❌ Ошибка MyArena API:', error);
    throw error;
  }
};

/**
 * Парсинг JSON ответа MyArena
 */
const parseMyArenaJson = (data: any): MyArenaServerData => {
  return {
    id: MYARENA_GAME_ID,
    name: data.name || data.hostname || 'РЕАЛЬНЫЕ ПАЦАНЫ ИЗ 90-х [PUBLIC PRO] v34',
    game: 'css',
    ip: '45.136.205.92',
    port: 27015,
    map: data.map || 'de_dust2',
    players: data.players || data.numplayers || 0,
    maxplayers: data.maxplayers || 32,
    online: data.online !== false,
    ping: data.ping || 15,
    playersList: parsePlayersList(data.playersList || data.players_list || [])
  };
};

/**
 * Парсинг HTML виджета MyArena
 */
const parseMyArenaHtml = (html: string): MyArenaServerData => {
  // Базовый парсинг HTML для извлечения данных сервера
  const serverNameMatch = html.match(/<title>([^<]+)<\/title>/);
  const playersMatch = html.match(/(\d+)\/(\d+)\s*игроков/i);
  const mapMatch = html.match(/Карта:\s*([^\s<]+)/i);
  const onlineMatch = html.includes('онлайн') || html.includes('online');

  return {
    id: MYARENA_GAME_ID,
    name: serverNameMatch?.[1] || 'РЕАЛЬНЫЕ ПАЦАНЫ ИЗ 90-х [PUBLIC PRO] v34',
    game: 'css',
    ip: '45.136.205.92',
    port: 27015,
    map: mapMatch?.[1] || 'de_dust2',
    players: playersMatch ? parseInt(playersMatch[1]) : 0,
    maxplayers: playersMatch ? parseInt(playersMatch[2]) : 32,
    online: onlineMatch,
    ping: 15,
    playersList: [] // HTML парсинг игроков сложнее, оставляем пустым
  };
};

/**
 * Парсинг списка игроков
 */
const parsePlayersList = (playersData: any[]): MyArenaPlayer[] => {
  if (!Array.isArray(playersData)) return [];

  return playersData.map(player => ({
    name: player.name || player.nick || 'Unknown',
    score: player.score || player.frags || 0,
    kills: player.kills || player.frags || 0,
    deaths: player.deaths || 0,
    time: player.time || player.duration || 0,
    ping: player.ping || 50
  }));
};

/**
 * Получить URL изображения статистики MyArena
 */
export const getMyArenaImageUrl = (
  gameId: number = MYARENA_GAME_ID,
  width: number = 560,
  style: number = 1,
  bgColor: string = 'FF9A37',
  textColor: string = 'FFFFFF',
  borderColor: string = 'FF9A37',
  transparency: number = 0
): string => {
  return `//img.myarena.ru/${gameId}/${width}_${style}_${bgColor}_${textColor}_${borderColor}_${transparency}.png`;
};

/**
 * Форматирование времени
 */
export const formatGameTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
};