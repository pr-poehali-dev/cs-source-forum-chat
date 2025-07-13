import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

export const Navigation = () => {
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    // Проверяем авторизованного пользователя при загрузке
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      const user = JSON.parse(userData);
      if (user.isLoggedIn) {
        setCurrentUser(user);
      }
    }
  }, []);

  const handleLogout = () => {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      const user = JSON.parse(userData);
      user.isLoggedIn = false;
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
    setCurrentUser(null);
    window.location.reload();
  };

  return (
    <nav className="bg-cs-gray/80 backdrop-blur-sm border-b border-cs-orange/20">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button 
              variant="outline" 
              size="sm"
              className="border-cs-orange/40 text-cs-orange hover:bg-cs-orange/20"
            >
              <Icon name="Menu" size={20} />
            </Button>
          </div>
          <div className="flex items-center space-x-4">
            <img
              src="/img/e949d1b7-0f67-42f4-9d67-b231b08add42.jpg"
              alt="CS:S Logo"
              className="w-12 h-12 rounded"
            />
            <div className="font-orbitron cs-text-shadow">
              <h1 className="text-2xl font-black text-cs-orange leading-none">
                РЕАЛЬНЫЕ ПАЦАНЫ ИЗ 90-х
              </h1>
              <div className="text-sm font-bold text-cs-light/80 tracking-widest mt-1">
                [<span className="text-cs-red">PUBLIC PRO</span>]{" "}
                <span className="text-cs-orange">v34</span>
              </div>
            </div>
          </div>
          <div className="hidden md:flex space-x-2">
            <a 
              href="/" 
              className="group relative px-6 py-3 bg-gradient-to-r from-cs-orange/20 to-cs-orange/10 border-2 border-cs-orange/40 rounded-lg font-orbitron font-bold text-cs-light hover:text-cs-orange transition-all duration-300 hover:border-cs-orange/80 hover:bg-gradient-to-r hover:from-cs-orange/30 hover:to-cs-orange/20 hover:shadow-lg hover:shadow-cs-orange/20 transform hover:scale-105"
            >
              <div className="flex items-center space-x-2">
                <Icon name="Home" size={18} className="group-hover:text-cs-orange transition-colors" />
                <span className="tracking-wider">ГЛАВНАЯ</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cs-orange/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
            </a>
            
            <a 
              href="/forum" 
              className="group relative px-6 py-3 bg-gradient-to-r from-cs-blue/20 to-cs-blue/10 border-2 border-cs-blue/40 rounded-lg font-orbitron font-bold text-cs-light hover:text-blue-300 transition-all duration-300 hover:border-blue-400/80 hover:bg-gradient-to-r hover:from-blue-500/30 hover:to-blue-500/20 hover:shadow-lg hover:shadow-blue-400/20 transform hover:scale-105"
            >
              <div className="flex items-center space-x-2">
                <Icon name="MessageSquare" size={18} className="group-hover:text-blue-300 transition-colors" />
                <span className="tracking-wider">ФОРУМ</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
            </a>
            

            
            <a 
              href="/rules" 
              className="group relative px-6 py-3 bg-gradient-to-r from-cs-red/20 to-cs-red/10 border-2 border-cs-red/40 rounded-lg font-orbitron font-bold text-cs-light hover:text-red-300 transition-all duration-300 hover:border-red-400/80 hover:bg-gradient-to-r hover:from-red-500/30 hover:to-red-500/20 hover:shadow-lg hover:shadow-red-400/20 transform hover:scale-105"
            >
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={18} className="group-hover:text-red-300 transition-colors animate-pulse" />
                <span className="tracking-wider">ПРАВИЛА</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
            </a>
          </div>
          
          {currentUser ? (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3 bg-cs-gray/60 px-4 py-2 rounded-lg border border-green-500/40">
                <Icon name="User" size={16} className="text-green-500" />
                <div>
                  <div className="text-green-500 font-orbitron font-bold text-sm">
                    {currentUser.nickname}
                  </div>
                  <div className="text-cs-light/60 text-xs">
                    Игрок онлайн
                  </div>
                </div>
              </div>
              <Button 
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="border-red-500/40 text-red-500 hover:bg-red-500/20 font-orbitron"
              >
                <Icon name="LogOut" size={16} className="mr-2" />
                ВЫЙТИ
              </Button>
            </div>
          ) : (
            <a href="/auth">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-cs-orange to-cs-red hover:from-cs-red hover:to-cs-orange text-white font-orbitron font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-cs-orange/30 transform hover:scale-105 transition-all duration-300 border-2 border-cs-orange/50 hover:border-cs-orange"
              >
                <Icon name="UserCheck" size={18} className="mr-2" />
                <span className="tracking-wider">ВОЙТИ</span>
              </Button>
            </a>
          )}
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div className="md:hidden bg-cs-gray/90 border-t border-cs-orange/20 px-6 py-4">
        <div className="grid grid-cols-3 gap-3">
          <a 
            href="/" 
            className="flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-cs-orange/20 to-cs-orange/10 border border-cs-orange/40 rounded-lg font-orbitron font-bold text-cs-light hover:text-cs-orange transition-all duration-300"
          >
            <Icon name="Home" size={16} />
            <span className="text-sm">ГЛАВНАЯ</span>
          </a>
          
          <a 
            href="/forum" 
            className="flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-cs-blue/20 to-cs-blue/10 border border-cs-blue/40 rounded-lg font-orbitron font-bold text-cs-light hover:text-blue-300 transition-all duration-300"
          >
            <Icon name="MessageSquare" size={16} />
            <span className="text-sm">ФОРУМ</span>
          </a>
          
          <a 
            href="/chat" 
            className="flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-green-600/20 to-green-600/10 border border-green-500/40 rounded-lg font-orbitron font-bold text-cs-light hover:text-green-300 transition-all duration-300"
          >
            <Icon name="MessageCircle" size={16} />
            <span className="text-sm">ЧАТ</span>
          </a>
          
          <a 
            href="/stats" 
            className="flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-purple-600/20 to-purple-600/10 border border-purple-500/40 rounded-lg font-orbitron font-bold text-cs-light hover:text-purple-300 transition-all duration-300"
          >
            <Icon name="BarChart3" size={16} />
            <span className="text-sm">СТАТЫ</span>
          </a>
          
          <a 
            href="/rules" 
            className="flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-cs-red/20 to-cs-red/10 border border-cs-red/40 rounded-lg font-orbitron font-bold text-cs-light hover:text-red-300 transition-all duration-300"
          >
            <Icon name="Shield" size={16} />
            <span className="text-sm">ПРАВИЛА</span>
          </a>
        </div>
      </div>
    </nav>
  );
};