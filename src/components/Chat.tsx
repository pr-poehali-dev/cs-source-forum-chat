import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface ChatMessage {
  id: string;
  username: string;
  message: string;
  timestamp: Date;
  type: 'user' | 'system' | 'admin';
}

const Chat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      username: 'Admin',
      message: 'Добро пожаловать в чат Counter-Strike: Source!',
      timestamp: new Date(Date.now() - 300000),
      type: 'admin'
    },
    {
      id: '2',
      username: 'PlayerOne',
      message: 'Кто хочет поиграть на de_dust2?',
      timestamp: new Date(Date.now() - 240000),
      type: 'user'
    },
    {
      id: '3',
      username: 'FragMaster',
      message: 'Я готов! Собираем команду',
      timestamp: new Date(Date.now() - 180000),
      type: 'user'
    },
    {
      id: '4',
      username: 'System',
      message: 'Сервер de_dust2 #1 доступен для подключения',
      timestamp: new Date(Date.now() - 120000),
      type: 'system'
    },
    {
      id: '5',
      username: 'SnipeKing',
      message: 'Ищу напарника для миссий. AWP + AK47',
      timestamp: new Date(Date.now() - 60000),
      type: 'user'
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [currentUser] = useState('Гость'); // В реальном приложении это будет из контекста авторизации
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const onlineUsers = [
    { name: 'PlayerOne', status: 'В игре' },
    { name: 'FragMaster', status: 'В лобби' },
    { name: 'SnipeKing', status: 'Онлайн' },
    { name: 'CyberNinja', status: 'В игре' },
    { name: 'Headshot', status: 'Онлайн' }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: ChatMessage = {
        id: Date.now().toString(),
        username: currentUser,
        message: newMessage,
        timestamp: new Date(),
        type: 'user'
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ru-RU', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getMessageTypeClass = (type: string) => {
    switch (type) {
      case 'admin':
        return 'text-cs-red font-bold';
      case 'system':
        return 'text-cs-orange italic';
      default:
        return 'text-cs-light';
    }
  };

  const getUserStatusColor = (status: string) => {
    switch (status) {
      case 'В игре':
        return 'bg-cs-red';
      case 'В лобби':
        return 'bg-cs-orange';
      default:
        return 'bg-green-500';
    }
  };

  return (
    <div className="min-h-screen bg-cs-blue p-4">
      <div className="max-w-7xl mx-auto">
        {/* Заголовок */}
        <div className="mb-6">
          <h1 className="text-4xl font-orbitron font-bold text-cs-light mb-2 cs-text-shadow">
            CS:S Chat
          </h1>
          <p className="text-cs-light/80">Общайтесь с игроками в реальном времени</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Основной чат */}
          <div className="lg:col-span-3">
            <Card className="bg-cs-gray border-cs-orange/20 h-[600px] flex flex-col">
              <CardHeader>
                <CardTitle className="text-cs-light font-orbitron flex items-center gap-2">
                  <Icon name="MessageSquare" size={24} className="text-cs-orange" />
                  Общий чат
                  <Badge variant="secondary" className="ml-auto">
                    {onlineUsers.length} онлайн
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                {/* Сообщения */}
                <div className="flex-1 overflow-y-auto mb-4 space-y-2 pr-2">
                  {messages.map((msg) => (
                    <div key={msg.id} className="flex items-start gap-3">
                      <span className="text-cs-orange text-sm font-mono">
                        {formatTime(msg.timestamp)}
                      </span>
                      <div className="flex-1">
                        <span className={`font-semibold ${getMessageTypeClass(msg.type)}`}>
                          {msg.username}:
                        </span>
                        <span className="text-cs-light ml-2">{msg.message}</span>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Поле ввода */}
                <div className="flex gap-2">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Введите сообщение..."
                    className="flex-1 bg-cs-blue border-cs-orange/30 text-cs-light placeholder:text-cs-light/50"
                  />
                  <Button 
                    onClick={handleSendMessage}
                    className="bg-cs-orange hover:bg-cs-orange/80 text-white"
                  >
                    <Icon name="Send" size={16} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Боковая панель */}
          <div className="space-y-6">
            {/* Онлайн пользователи */}
            <Card className="bg-cs-gray border-cs-orange/20">
              <CardHeader>
                <CardTitle className="text-cs-light font-orbitron flex items-center gap-2">
                  <Icon name="Users" size={20} className="text-cs-orange" />
                  Онлайн
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {onlineUsers.map((user, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-cs-light text-sm">{user.name}</span>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${getUserStatusColor(user.status)} text-white border-0`}
                      >
                        {user.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Быстрые команды */}
            <Card className="bg-cs-gray border-cs-orange/20">
              <CardHeader>
                <CardTitle className="text-cs-light font-orbitron flex items-center gap-2">
                  <Icon name="Zap" size={20} className="text-cs-orange" />
                  Команды
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full text-left justify-start border-cs-orange/30 text-cs-light hover:bg-cs-orange/20"
                    onClick={() => setNewMessage('/players')}
                  >
                    /players - список игроков
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full text-left justify-start border-cs-orange/30 text-cs-light hover:bg-cs-orange/20"
                    onClick={() => setNewMessage('/servers')}
                  >
                    /servers - доступные сервера
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full text-left justify-start border-cs-orange/30 text-cs-light hover:bg-cs-orange/20"
                    onClick={() => setNewMessage('/help')}
                  >
                    /help - справка
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Статистика сервера */}
            <Card className="bg-cs-gray border-cs-orange/20">
              <CardHeader>
                <CardTitle className="text-cs-light font-orbitron flex items-center gap-2">
                  <Icon name="BarChart3" size={20} className="text-cs-orange" />
                  Сервер
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-cs-light">
                    <span>Игроков:</span>
                    <span className="text-cs-orange">24/32</span>
                  </div>
                  <div className="flex justify-between text-cs-light">
                    <span>Карта:</span>
                    <span className="text-cs-orange">de_dust2</span>
                  </div>
                  <div className="flex justify-between text-cs-light">
                    <span>Пинг:</span>
                    <span className="text-green-400">45ms</span>
                  </div>
                  <div className="flex justify-between text-cs-light">
                    <span>Режим:</span>
                    <span className="text-cs-orange">Competitive</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;