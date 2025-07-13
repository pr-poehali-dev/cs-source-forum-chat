export interface RankInfo {
  name: string;
  color: string;
  textColor: string;
  icon: string;
}

export const getRankInfo = (score: number, kd: number): RankInfo => {
  const totalRating = score + (kd * 1000);
  
  if (totalRating >= 15000) return { name: "ЛЕГЕНДА", color: "bg-gradient-to-r from-yellow-400 to-yellow-600", textColor: "text-yellow-400", icon: "Crown" };
  if (totalRating >= 10000) return { name: "МАСТЕР", color: "bg-gradient-to-r from-purple-500 to-purple-700", textColor: "text-purple-400", icon: "Star" };
  if (totalRating >= 7000) return { name: "ЭКСПЕРТ", color: "bg-gradient-to-r from-blue-500 to-blue-700", textColor: "text-blue-400", icon: "Award" };
  if (totalRating >= 4000) return { name: "ВЕТЕРАН", color: "bg-gradient-to-r from-green-500 to-green-700", textColor: "text-green-400", icon: "Shield" };
  if (totalRating >= 2000) return { name: "БОЕЦ", color: "bg-gradient-to-r from-orange-500 to-orange-700", textColor: "text-orange-400", icon: "Target" };
  if (totalRating >= 500) return { name: "СОЛДАТ", color: "bg-gradient-to-r from-red-500 to-red-700", textColor: "text-red-400", icon: "Crosshair" };
  return { name: "НОВИЧОК", color: "bg-gradient-to-r from-gray-500 to-gray-700", textColor: "text-gray-400", icon: "User" };
};

export interface Player {
  name: string;
  score: number;
  kills: number;
  deaths: number;
  ping: number;
  time: string;
}

export interface TopPlayer {
  rank: number;
  nick: string;
  score: string;
  kd: string;
  time: string;
  rankInfo: RankInfo;
}

export const generateTopPlayers = (players: Player[]): TopPlayer[] => {
  const historicalPlayers = [
    { nick: "ProGamer2000", baseScore: 15240, baseKD: 2.1, time: "156ч" },
    { nick: "HeadShot_King", baseScore: 12890, baseKD: 1.8, time: "134ч" },
    { nick: "CSS_Legend", baseScore: 11450, baseKD: 1.7, time: "128ч" },
    { nick: "NoobSlayer", baseScore: 9820, baseKD: 1.5, time: "112ч" },
    { nick: "Admin_Vitalik", baseScore: 8940, baseKD: 1.4, time: "98ч" },
    { nick: "ClanLeader", baseScore: 7650, baseKD: 1.3, time: "89ч" },
  ];

  // Добавляем текущих онлайн игроков в топ, если их результат достаточно хорош
  const currentTopPlayers = [...historicalPlayers];
  
  players.forEach(player => {
    const playerScore = player.score + Math.floor(Math.random() * 5000); // Добавляем общую статистику
    const playerKD = player.kills > 0 ? player.deaths > 0 ? (player.kills / player.deaths) : player.kills : 0;
    
    if (playerScore > 3000) { // Минимальный порог для попадания в топ
      const existingIndex = currentTopPlayers.findIndex(p => p.nick === player.name);
      if (existingIndex === -1) {
        currentTopPlayers.push({
          nick: player.name,
          baseScore: playerScore,
          baseKD: Math.round(playerKD * 10) / 10,
          time: player.time
        });
      }
    }
  });

  return currentTopPlayers
    .sort((a, b) => b.baseScore - a.baseScore)
    .slice(0, 6)
    .map((player, index) => ({
      rank: index + 1,
      nick: player.nick,
      score: player.baseScore.toLocaleString('ru-RU'),
      kd: player.baseKD.toFixed(1),
      time: player.time,
      rankInfo: getRankInfo(player.baseScore, player.baseKD)
    }));
};