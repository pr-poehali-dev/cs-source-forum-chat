import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

interface ServerInfo {
  name: string;
  map: string;
  players: number;
  maxPlayers: number;
  ping: number;
  status: 'online' | 'offline';
}

interface ServerStatusCardProps {
  serverInfo: ServerInfo;
  isLoading: boolean;
  error: string | null;
  lastUpdate: Date | null;
  onRefetch: () => void;
}

export const ServerStatusCard = ({ 
  serverInfo, 
  isLoading, 
  error, 
  lastUpdate, 
  onRefetch 
}: ServerStatusCardProps) => {
  return (
    <Card className="bg-cs-gray/80 border-cs-orange/20 backdrop-blur-sm relative overflow-hidden">
      <CardHeader>
        <CardTitle className="font-orbitron text-cs-orange flex items-center space-x-2 relative z-10">
          <Icon name="Server" size={24} />
          <span>ПОДКЛЮЧЕНИЕ К СЕРВЕРУ</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 relative z-10">
        <div 
          className="relative p-6 rounded-lg border-2 border-cs-orange/40 bg-gradient-to-br from-cs-dark/90 via-cs-gray/60 to-cs-dark/90 backdrop-blur-sm overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(rgba(44, 62, 80, 0.85), rgba(44, 62, 80, 0.85)), url('/img/309b55ae-a24d-4702-88fc-abca28bddeeb.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          {/* Decorative weapon silhouettes */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-2 left-2">
              <Icon name="Crosshair" size={32} className="text-cs-orange rotate-45" />
            </div>
            <div className="absolute top-2 right-2">
              <Icon name="Target" size={32} className="text-cs-red -rotate-45" />
            </div>
            <div className="absolute bottom-2 left-2">
              <Icon name="Zap" size={28} className="text-cs-orange rotate-12" />
            </div>
            <div className="absolute bottom-2 right-2">
              <Icon name="Shield" size={28} className="text-cs-orange -rotate-12" />
            </div>
          </div>
          
          {/* Content */}
          <div className="text-center relative z-10">
            <div className="mb-4">
              <div className="inline-flex items-center space-x-2 mb-3">
                <Icon name="Wifi" size={20} className="text-green-400 animate-pulse" />
                <span className="text-green-400 font-orbitron font-bold text-sm tracking-wider">
                  СЕРВЕР ОНЛАЙН
                </span>
              </div>
              <div className="bg-black/50 p-4 rounded-lg border border-cs-orange/60 backdrop-blur-sm">
                <div className="text-3xl font-bold text-cs-orange font-mono mb-2 tracking-wider drop-shadow-lg">
                  45.136.205.92:27015
                </div>
                <div className="text-sm text-cs-light/90 mb-4 font-orbitron">
                  IP АДРЕС СЕРВЕРА
                </div>
              </div>
            </div>
            
            <Button 
              className="bg-gradient-to-r from-cs-orange to-cs-red hover:from-cs-red hover:to-cs-orange text-white font-orbitron font-bold py-3 px-6 text-lg shadow-lg transform hover:scale-105 transition-all duration-200"
              onClick={() => {
                navigator.clipboard.writeText('connect 45.136.205.92:27015');
              }}
            >
              <Icon name="Copy" size={18} className="mr-2" />
              СКОПИРОВАТЬ КОМАНДУ
            </Button>
          </div>
        </div>
        
        <div className="bg-cs-dark/70 p-4 rounded-lg border border-cs-orange/20">
          <div className="text-center">
            <div className="text-xs text-cs-light/80 mb-2 font-orbitron tracking-wider">
              КОМАНДА ДЛЯ КОНСОЛИ CS:S:
            </div>
            <code className="text-cs-orange font-mono text-sm bg-black/50 px-3 py-1 rounded border border-cs-orange/30">
              connect 45.136.205.92:27015
            </code>
            <div className="text-xs text-cs-light/60 mt-2">
              Откройте консоль (~) и вставьте команду
            </div>
          </div>
        </div>
      </CardContent>
      
      {/* Background decorative elements */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url('/img/9f272ee3-8270-43b2-a239-05cfaf550294.jpg')`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
    </Card>
  );
};