import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import Icon from "@/components/ui/icon";

export default function Auth() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    nickname: "",
    agreeToRules: false
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleEmailAuth = async (type: 'login' | 'register') => {
    setIsLoading(true);
    
    // Валидация данных
    if (type === 'register') {
      if (!formData.nickname || !formData.email || !formData.password || !formData.confirmPassword) {
        alert('Заполните все обязательные поля!');
        setIsLoading(false);
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        alert('Пароли не совпадают!');
        setIsLoading(false);
        return;
      }
      if (!formData.agreeToRules) {
        alert('Необходимо согласиться с правилами сервера!');
        setIsLoading(false);
        return;
      }
    }
    
    // Имитация регистрации/входа
    setTimeout(() => {
      setIsLoading(false);
      
      if (type === 'register') {
        // Сохраняем данные пользователя в localStorage
        const userData = {
          nickname: formData.nickname,
          email: formData.email,
          registeredAt: new Date().toISOString(),
          isLoggedIn: true
        };
        localStorage.setItem('currentUser', JSON.stringify(userData));
        alert(`Добро пожаловать, ${formData.nickname}! Регистрация прошла успешно!`);
      } else {
        // Проверяем существующего пользователя
        const existingUser = localStorage.getItem('currentUser');
        if (existingUser) {
          const userData = JSON.parse(existingUser);
          userData.isLoggedIn = true;
          localStorage.setItem('currentUser', JSON.stringify(userData));
          alert(`С возвращением, ${userData.nickname}!`);
        } else {
          alert('Пользователь не найден. Зарегистрируйтесь сначала.');
          setIsLoading(false);
          return;
        }
      }
      
      // Перенаправляем на главную
      window.location.href = '/';
    }, 1500);
  };

  const handleVKAuth = () => {
    // Здесь будет интеграция с VK API
    alert("Авторизация через ВКонтакте в разработке!");
  };

  return (
    <div className="min-h-screen bg-cs-dark text-cs-light">
      {/* Header */}
      <div className="bg-cs-gray/80 backdrop-blur-sm border-b border-cs-orange/20">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Icon name="UserCheck" size={40} className="text-cs-orange" />
              <div>
                <h1 className="font-orbitron text-4xl font-black text-cs-orange cs-text-shadow">
                  АВТОРИЗАЦИЯ
                </h1>
                <p className="text-cs-light/80 font-orbitron text-sm tracking-widest">
                  [ВХОД] РЕАЛЬНЫЕ ПАЦАНЫ ИЗ 90-х
                </p>
              </div>
            </div>
            <a href="/" className="bg-cs-orange hover:bg-cs-orange/80 text-cs-dark px-6 py-3 rounded font-orbitron font-bold transition-colors flex items-center space-x-2">
              <Icon name="Home" size={20} />
              <span>ГЛАВНАЯ</span>
            </a>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-md mx-auto">
          <Card className="bg-cs-gray/80 border-cs-orange/20 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="font-orbitron text-2xl text-cs-orange">
                ПРИСОЕДИНЯЙСЯ К НАМ
              </CardTitle>
              <p className="text-cs-light/80 text-sm">
                Войди в аккаунт или зарегистрируйся
              </p>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="login" className="space-y-6">
                <TabsList className="grid w-full grid-cols-2 bg-cs-dark/50">
                  <TabsTrigger 
                    value="login" 
                    className="data-[state=active]:bg-cs-orange data-[state=active]:text-cs-dark font-orbitron font-bold"
                  >
                    ВХОД
                  </TabsTrigger>
                  <TabsTrigger 
                    value="register"
                    className="data-[state=active]:bg-cs-orange data-[state=active]:text-cs-dark font-orbitron font-bold"
                  >
                    РЕГИСТРАЦИЯ
                  </TabsTrigger>
                </TabsList>

                {/* Login Tab */}
                <TabsContent value="login" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email" className="text-cs-light font-orbitron">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="твой@email.ru"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="bg-cs-dark/50 border-cs-orange/40 text-white placeholder:text-gray-400 focus:text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password" className="text-cs-light font-orbitron">Пароль</Label>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className="bg-cs-dark/50 border-cs-orange/40 text-white placeholder:text-gray-400 focus:text-white"
                    />
                  </div>
                  <Button 
                    onClick={() => handleEmailAuth('login')}
                    disabled={isLoading}
                    className="w-full bg-cs-orange hover:bg-cs-orange/80 text-cs-dark font-orbitron font-bold py-3"
                  >
                    {isLoading ? (
                      <Icon name="Loader2" size={20} className="animate-spin mr-2" />
                    ) : (
                      <Icon name="LogIn" size={20} className="mr-2" />
                    )}
                    ВОЙТИ
                  </Button>
                </TabsContent>

                {/* Register Tab */}
                <TabsContent value="register" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-nickname" className="text-cs-light font-orbitron">Игровой ник</Label>
                    <Input
                      id="register-nickname"
                      type="text"
                      placeholder="ProGamer2000"
                      value={formData.nickname}
                      onChange={(e) => handleInputChange('nickname', e.target.value)}
                      className="bg-cs-dark/50 border-cs-orange/40 text-white placeholder:text-gray-400 focus:text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-email" className="text-cs-light font-orbitron">Email</Label>
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="твой@email.ru"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="bg-cs-dark/50 border-cs-orange/40 text-white placeholder:text-gray-400 focus:text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password" className="text-cs-light font-orbitron">Пароль</Label>
                    <Input
                      id="register-password"
                      type="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className="bg-cs-dark/50 border-cs-orange/40 text-white placeholder:text-gray-400 focus:text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password" className="text-cs-light font-orbitron">Повторите пароль</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      className="bg-cs-dark/50 border-cs-orange/40 text-white placeholder:text-gray-400 focus:text-white"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="agree-rules"
                      checked={formData.agreeToRules}
                      onCheckedChange={(checked) => handleInputChange('agreeToRules', checked as boolean)}
                      className="border-cs-orange/40 data-[state=checked]:bg-cs-orange data-[state=checked]:border-cs-orange"
                    />
                    <Label htmlFor="agree-rules" className="text-cs-light text-sm">
                      Я согласен с{" "}
                      <a href="/rules" className="text-cs-orange hover:underline">
                        правилами сервера
                      </a>
                    </Label>
                  </div>

                  <Button 
                    onClick={() => handleEmailAuth('register')}
                    disabled={isLoading || !formData.agreeToRules}
                    className="w-full bg-cs-orange hover:bg-cs-orange/80 text-cs-dark font-orbitron font-bold py-3 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <Icon name="Loader2" size={20} className="animate-spin mr-2" />
                    ) : (
                      <Icon name="UserPlus" size={20} className="mr-2" />
                    )}
                    ЗАРЕГИСТРИРОВАТЬСЯ
                  </Button>
                </TabsContent>
              </Tabs>

              {/* Social Auth */}
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-cs-orange/20"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-cs-gray/80 text-cs-light/60">или войти через</span>
                  </div>
                </div>

                <div className="mt-4 space-y-3">
                  <Button 
                    onClick={handleVKAuth}
                    variant="outline"
                    className="w-full border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white font-orbitron font-bold"
                  >
                    <Icon name="Users" size={20} className="mr-2" />
                    ВОЙТИ ЧЕРЕЗ ВКОНТАКТЕ
                  </Button>
                  
                  <div className="text-center">
                    <a 
                      href="https://t.me/realguys90x" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 text-sm flex items-center justify-center space-x-2"
                    >
                      <Icon name="Send" size={16} className="rotate-45" />
                      <span>Нужна помощь? Пишите в Telegram</span>
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Benefits */}
          <Card className="bg-cs-gray/80 border-cs-orange/20 backdrop-blur-sm mt-6">
            <CardHeader>
              <CardTitle className="font-orbitron text-cs-orange text-center">
                ПРЕИМУЩЕСТВА РЕГИСТРАЦИИ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { icon: "Trophy", text: "Сохранение статистики и рангов" },
                  { icon: "MessageSquare", text: "Доступ к форуму и чату" },
                  { icon: "Users", text: "Поиск друзей и команд" },
                  { icon: "Star", text: "Участие в турнирах" },
                  { icon: "Settings", text: "Персональные настройки" }
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3 p-2 bg-cs-dark/30 rounded">
                    <Icon name={benefit.icon as any} size={16} className="text-cs-orange" />
                    <span className="text-cs-light text-sm">{benefit.text}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}