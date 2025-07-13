import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

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

interface SourceQueryCardProps {
  info: SourceQueryInfo | null;
  players: SourceQueryPlayer[];
  rules: SourceQueryRule[];
  timer: number;
  error: string | null;
  isLoading: boolean;
  onRefetch: () => void;
}

export const SourceQueryCard = ({ 
  info, 
  players, 
  rules, 
  timer, 
  error, 
  isLoading, 
  onRefetch 
}: SourceQueryCardProps) => {
  const formatValue = (value: any): string => {
    if (value === true) return 'true';
    if (value === false) return 'false';
    if (Array.isArray(value)) return JSON.stringify(value, null, 2);
    return String(value);
  };

  const getTimerColor = (time: number): string => {
    if (time > 1.0) return 'text-red-500';
    if (time > 0.5) return 'text-yellow-500';
    return 'text-green-500';
  };

  return (
    <div className="space-y-6">
      {/* Header - Source Query PHP Library Style */}
      <Card className="bg-gradient-to-r from-blue-600/20 to-cs-gray/90 border-2 border-blue-500/40 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="text-center">
            <h2 className="font-orbitron text-3xl font-black text-cs-orange mb-2">
              Source Query Protocol
            </h2>
            <p className="text-cs-light/80 mb-4">
              Эмуляция PHP xPaw/SourceQuery библиотеки для сервера 45.136.205.92:27015
            </p>
            <div className="flex items-center justify-center space-x-4">
              <Button 
                onClick={onRefetch}
                disabled={isLoading}
                className="bg-cs-orange hover:bg-cs-orange/80 text-cs-dark font-orbitron font-bold"
              >
                {isLoading ? (
                  <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                ) : (
                  <Icon name="RefreshCw" size={16} className="mr-2" />
                )}
                {isLoading ? 'ЗАГРУЗКА...' : 'ОБНОВИТЬ'}
              </Button>
              <Badge className={`${getTimerColor(timer)} font-mono text-sm`}>
                {timer.toFixed(4)}s
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Error Panel */}
      {error && (
        <Card className="bg-red-500/10 border-red-500/30 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <Icon name="AlertTriangle" size={20} className="text-red-500 mt-1" />
              <div>
                <div className="text-red-400 font-semibold mb-2">Source Query Error:</div>
                <pre className="text-red-300 text-sm whitespace-pre-wrap bg-red-500/10 p-3 rounded">
                  {error}
                </pre>
                <div className="mt-3 text-xs text-red-400">
                  Браузеры блокируют прямые UDP соединения. Требуется серверный прокси для Source Query протокола.
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Server Info Table */}
        <Card className="bg-cs-gray/95 border-cs-orange/30 backdrop-blur-sm shadow-xl">
          <CardHeader>
            <CardTitle className="font-orbitron text-cs-orange flex items-center space-x-2">
              <Icon name="Server" size={20} />
              <span>Server Info</span>
              <Badge className={`ml-auto ${getTimerColor(timer)} font-mono`}>
                {timer.toFixed(4)}s
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-hidden">
              <table className="w-full">
                <thead className="bg-cs-dark/80">
                  <tr className="border-b border-cs-orange/40">
                    <th className="px-4 py-3 text-left text-cs-orange font-orbitron text-sm font-bold w-32">
                      Property
                    </th>
                    <th className="px-4 py-3 text-left text-cs-orange font-orbitron text-sm font-bold">
                      Value
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {info ? (
                    Object.entries(info).map(([key, value]) => (
                      <tr key={key} className="border-b border-cs-orange/20 hover:bg-cs-dark/40 transition-colors">
                        <td className="px-4 py-3 text-white font-mono text-sm font-semibold">
                          {key}
                        </td>
                        <td className="px-4 py-3 text-white/90 text-sm">
                          {Array.isArray(value) ? (
                            <pre className="text-xs bg-cs-dark/50 p-2 rounded overflow-x-auto">
                              {JSON.stringify(value, null, 2)}
                            </pre>
                          ) : (
                            <span className={`font-mono ${
                              typeof value === 'boolean' ? 
                                (value ? 'text-green-400' : 'text-red-400') : 
                                'text-white'
                            }`}>
                              {formatValue(value)}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={2} className="px-4 py-8 text-center text-white/60">
                        <Icon name="AlertCircle" size={24} className="mx-auto mb-2 opacity-50" />
                        No information received
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Players Table */}
        <Card className="bg-cs-gray/95 border-cs-orange/30 backdrop-blur-sm shadow-xl">
          <CardHeader>
            <CardTitle className="font-orbitron text-cs-orange flex items-center space-x-2">
              <Icon name="Users" size={20} />
              <span>Players</span>
              <Badge variant="outline" className="ml-auto border-blue-400 text-blue-400">
                {players.length}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-hidden max-h-[400px] overflow-y-auto">
              <table className="w-full">
                <thead className="bg-cs-dark/80 sticky top-0">
                  <tr className="border-b border-cs-orange/40">
                    <th className="px-4 py-3 text-left text-cs-orange font-orbitron text-sm font-bold">
                      Player
                    </th>
                    <th className="px-4 py-3 text-center text-cs-orange font-orbitron text-sm font-bold w-20">
                      Frags
                    </th>
                    <th className="px-4 py-3 text-center text-cs-orange font-orbitron text-sm font-bold w-20">
                      Time
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {players.length > 0 ? (
                    players.map((player, index) => (
                      <tr key={player.Index} className="border-b border-cs-orange/20 hover:bg-cs-dark/40 transition-colors">
                        <td className="px-4 py-3 text-white font-semibold truncate max-w-[150px]">
                          {player.Name}
                        </td>
                        <td className="px-4 py-3 text-center text-cs-orange font-mono font-bold">
                          {player.Frags}
                        </td>
                        <td className="px-4 py-3 text-center text-blue-400 font-mono text-sm">
                          {player.TimeF}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className="px-4 py-8 text-center text-white/60">
                        <Icon name="Users" size={24} className="mx-auto mb-2 opacity-50" />
                        No players received
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Rules Table */}
      <Card className="bg-cs-gray/95 border-cs-orange/30 backdrop-blur-sm shadow-xl">
        <CardHeader>
          <CardTitle className="font-orbitron text-cs-orange flex items-center space-x-2">
            <Icon name="Settings" size={20} />
            <span>Rules</span>
            <Badge variant="outline" className="ml-auto border-purple-400 text-purple-400">
              {rules.length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-hidden max-h-[300px] overflow-y-auto">
            <table className="w-full">
              <thead className="bg-cs-dark/80 sticky top-0">
                <tr className="border-b border-cs-orange/40">
                  <th className="px-4 py-3 text-left text-cs-orange font-orbitron text-sm font-bold">
                    Rule
                  </th>
                  <th className="px-4 py-3 text-left text-cs-orange font-orbitron text-sm font-bold">
                    Value
                  </th>
                </tr>
              </thead>
              <tbody>
                {rules.length > 0 ? (
                  rules.map((rule, index) => (
                    Object.entries(rule).map(([key, value]) => (
                      <tr key={`${index}-${key}`} className="border-b border-cs-orange/20 hover:bg-cs-dark/40 transition-colors">
                        <td className="px-4 py-3 text-white font-mono text-sm font-semibold">
                          {key}
                        </td>
                        <td className="px-4 py-3 text-white/90 font-mono text-sm">
                          {value}
                        </td>
                      </tr>
                    ))
                  ))
                ) : (
                  <tr>
                    <td colSpan={2} className="px-4 py-8 text-center text-white/60">
                      <Icon name="Settings" size={24} className="mx-auto mb-2 opacity-50" />
                      No rules received
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Technical Info */}
      <Card className="bg-cs-dark/50 border-cs-orange/20 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="text-center text-cs-light/70 text-sm space-y-2">
            <div className="flex items-center justify-center space-x-4">
              <span>🚀 Эмуляция xPaw/PHP-Source-Query</span>
              <span>⚡ TypeScript/React версия</span>
              <span>🔒 LGPL v2.1 License</span>
            </div>
            <div className="text-xs">
              Библиотека создана для запроса игровых серверов использующих Source (Steamworks) query протокол
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};