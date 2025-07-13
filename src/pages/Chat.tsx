import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";

const chatMessages = [
  {
    id: 1,
    user: "Admin_Vitalik",
    role: "admin",
    message: "Добро пожаловать на сервер! Соблюдайте правила.",
    time: "14:25",
    isOnline: true
  },
  {
    id: 2,
    user: "ProGamer2000",
    role: "player",
    message: "Кто-нибудь хочет поиграть на dust2?",
    time: "14:27",
    isOnline: true
  },
  {
    id: 3,
    user: "NoobSlayer",
    role: "vip",
    message: "Я готов! Приглашайте в команду",
    time: "14:28",
    isOnline: true
  },
  {
    id: 4,
    user: "HeadShot_King",
    role: "player",
    message: "Лучше на aztec поиграем, dust2 надоел",
    time: "14:30",
    isOnline: true
  },
  {
    id: 5,
    user: "CSS_Legend",
    role: "moderator",
    message: "Напоминаю, мат запрещен. Следующее нарушение - мут",
    time: "14:32",
    isOnline: true
  },
  {
    id: 6,
    user: "RandomPlayer",
    role: "player",
    message: "Кто знает, когда будет турнир?",
    time: "14:35",
    isOnline: false
  }
];

const onlineUsers = [
  { name: "Admin_Vitalik", role: "admin", status: "В игре" },
  { name: "ProGamer2000", role: "player", status: "В лобби" },
  { name: "NoobSlayer", role: "vip", status: "В игре" },
  { name: "HeadShot_King", role: "player", status: "В меню" },
  { name: "CSS_Legend", role: "moderator", status: "Наблюдает" },
  { name: "Player_228", role: "player", status: "Ушел" },
  { name: "ClanLeader", role: "player", status: "В игре" },
  { name: "Tournament_Admin", role: "admin", status: "Офлайн" }
];

const getRoleColor = (role: string) => {
  switch (role) {
    case "admin": return "text-red-500";
    case "moderator": return "text-blue-500";
    case "vip": return "text-yellow-500";
    default: return "text-cs-light";
  }
};

const getRoleBadge = (role: string) => {
  switch (role) {
    case "admin": return "ADMIN";
    case "moderator": return "MOD";
    case "vip": return "VIP";
    default: return "";
  }
};

export default function Chat() {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-cs-dark text-cs-light">
      {/* Header */}
      <div className="bg-cs-gray/80 backdrop-blur-sm border-b border-cs-orange/20">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center space-x-4">
            <Icon name="MessageCircle" size={40} className="text-cs-orange" />
            <div>
              <h1 className="font-orbitron text-4xl font-black text-cs-orange cs-text-shadow">
                ЧАТ
              </h1>
              <p className="text-cs-light/80 font-orbitron text-sm tracking-widest">
                [ОБЩЕНИЕ] ОНЛАЙН: 47 ИГРОКОВ
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Chat */}
          <div className="lg:col-span-3">
            <Card className="bg-cs-gray/80 border-cs-orange/20 backdrop-blur-sm h-[600px] flex flex-col">
              <CardHeader className="border-b border-cs-orange/20">
                <CardTitle className="font-orbitron text-cs-orange flex items-center space-x-2">
                  <Icon name="Hash" size={24} />
                  <span>ОБЩИЙ ЧАТ</span>
                  <Badge variant="outline" className="border-green-500 text-green-500 ml-auto">
                    47 онлайн
                  </Badge>
                </CardTitle>
              </CardHeader>
              
              {/* Messages */}
              <CardContent className="flex-1 p-4 overflow-y-auto space-y-3">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className="flex items-start space-x-3">
                    <div className="flex items-center space-x-2 min-w-[150px]">
                      <Icon 
                        name="Circle" 
                        size={8} 
                        className={msg.isOnline ? "text-green-500" : "text-red-500"} 
                      />
                      <span className={`font-semibold text-sm ${getRoleColor(msg.role)}`}>
                        {msg.user}
                      </span>
                      {getRoleBadge(msg.role) && (
                        <Badge variant="outline" className={`text-xs px-1 py-0 h-4 ${
                          msg.role === "admin" ? "border-red-500 text-red-500" :
                          msg.role === "moderator" ? "border-blue-500 text-blue-500" :
                          "border-yellow-500 text-yellow-500"
                        }`}>
                          {getRoleBadge(msg.role)}
                        </Badge>
                      )}
                    </div>
                    <div className="flex-1">
                      <span className="text-cs-light">{msg.message}</span>
                      <span className="text-xs text-cs-light/50 ml-2">{msg.time}</span>
                    </div>
                  </div>
                ))}
              </CardContent>

              {/* Message Input */}
              <div className="p-4 border-t border-cs-orange/20">
                <div className="flex space-x-2">
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Введите сообщение..."
                    className="bg-cs-dark/50 border-cs-orange/40 text-cs-light placeholder:text-cs-light/50"
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <Button 
                    onClick={handleSendMessage}
                    className="bg-cs-orange hover:bg-cs-orange/80 text-cs-dark font-orbitron font-bold"
                  >
                    <Icon name="Send" size={16} />
                  </Button>
                </div>
                <div className="text-xs text-cs-light/50 mt-1">
                  Правила: без мата, спама и флуда. Уважайте других игроков.
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Online Users */}
            <Card className="bg-cs-gray/80 border-cs-orange/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="font-orbitron text-cs-orange flex items-center space-x-2">
                  <Icon name="Users" size={24} />
                  <span>ОНЛАЙН</span>
                  <Badge variant="outline" className="border-green-500 text-green-500 ml-auto">
                    47
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 max-h-[300px] overflow-y-auto">
                {onlineUsers.map((user, index) => (
                  <div key={index} className="flex items-center justify-between p-2 rounded bg-cs-dark/30">
                    <div className="flex items-center space-x-2">
                      <Icon 
                        name="Circle" 
                        size={8} 
                        className={user.status === "Офлайн" ? "text-red-500" : "text-green-500"} 
                      />
                      <span className={`text-sm font-semibold ${getRoleColor(user.role)}`}>
                        {user.name}
                      </span>
                      {getRoleBadge(user.role) && (
                        <Badge variant="outline" className={`text-xs px-1 py-0 h-4 ${
                          user.role === "admin" ? "border-red-500 text-red-500" :
                          user.role === "moderator" ? "border-blue-500 text-blue-500" :
                          "border-yellow-500 text-yellow-500"
                        }`}>
                          {getRoleBadge(user.role)}
                        </Badge>
                      )}
                    </div>
                    <span className="text-xs text-cs-light/60">{user.status}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Server Info */}
            <Card className="bg-cs-gray/80 border-cs-orange/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="font-orbitron text-cs-orange flex items-center space-x-2">
                  <Icon name="Server" size={24} />
                  <span>СЕРВЕР</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-cs-light/80">IP:</span>
                  <span className="text-cs-orange font-mono">192.168.1.100:27015</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-cs-light/80">Карта:</span>
                  <span className="text-cs-orange">de_dust2</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-cs-light/80">Игроков:</span>
                  <span className="text-green-500">24/32</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-cs-light/80">Пинг:</span>
                  <span className="text-green-500">15ms</span>
                </div>
                <Button className="w-full bg-cs-orange hover:bg-cs-orange/80 text-cs-dark font-orbitron font-bold">
                  <Icon name="Gamepad2" size={16} className="mr-2" />
                  ПРИСОЕДИНИТЬСЯ
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}