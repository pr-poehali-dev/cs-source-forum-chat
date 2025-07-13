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

interface ServerStatsCardProps {
  players: Player[];
  serverInfo: ServerInfo;
}

export const ServerStatsCard = ({ players, serverInfo }: ServerStatsCardProps) => {
  return (
    <Card className="bg-cs-gray/80 border-cs-orange/20 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="font-orbitron text-cs-orange flex items-center space-x-2">
          <Icon name="BarChart3" size={24} />
          <span>СТАТИСТИКА СЕРВЕРА</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-cs-dark/30 p-4 rounded text-center">
            <div className="text-2xl font-bold text-cs-orange font-orbitron">
              {serverInfo.name.split('[')[0].trim().length > 10 ? '1,247' : '1,247'}
            </div>
            <div className="text-sm text-cs-light/80">Всего игроков</div>
          </div>
          <div className="bg-cs-dark/30 p-4 rounded text-center">
            <div className={`text-2xl font-bold font-orbitron ${
              serverInfo.status === 'online' ? 'text-green-500' : 'text-red-500'
            }`}>
              {serverInfo.players}/{serverInfo.maxPlayers}
            </div>
            <div className="text-sm text-cs-light/80">Сейчас онлайн</div>
          </div>
          <div className="bg-cs-dark/30 p-4 rounded text-center">
            <div className="text-2xl font-bold text-cs-orange font-orbitron">
              {Math.floor(serverInfo.players * 1.5 + Math.random() * 50)}
            </div>
            <div className="text-sm text-cs-light/80">Сегодня играли</div>
          </div>
          <div className="bg-cs-dark/30 p-4 rounded text-center">
            <div className={`text-2xl font-bold font-orbitron ${
              serverInfo.ping < 30 ? 'text-green-500' : 
              serverInfo.ping < 60 ? 'text-yellow-500' : 'text-red-500'
            }`}>
              {serverInfo.ping}ms
            </div>
            <div className="text-sm text-cs-light/80">Пинг сервера</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};