import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Icon from "@/components/ui/icon";
import CreateTopicModal from "@/components/forum/CreateTopicModal";

const forumSections = [
  {
    title: "ОБЩИЕ ВОПРОСЫ",
    description: "Обсуждение игры, новости, анонсы",
    topics: 156,
    posts: 2341,
    lastPost: {
      title: "Новое обновление сервера",
      author: "Admin_Vitalik",
      time: "2 часа назад"
    },
    icon: "MessageSquare"
  },
  {
    title: "ТЕХНИЧЕСКИЕ ПРОБЛЕМЫ",
    description: "Баги, лаги, проблемы с подключением",
    topics: 89,
    posts: 1205,
    lastPost: {
      title: "Не могу зайти на сервер",
      author: "Player_228",
      time: "15 минут назад"
    },
    icon: "Settings"
  },
  {
    title: "ТАКТИКА И СТРАТЕГИЯ",
    description: "Обсуждение тактик, карт, оружия",
    topics: 234,
    posts: 3567,
    lastPost: {
      title: "Лучшие позиции на de_dust2",
      author: "ProGamer2000",
      time: "1 час назад"
    },
    icon: "Target"
  },
  {
    title: "КЛАНЫ И КОМАНДЫ",
    description: "Поиск команды, клановые войны",
    topics: 67,
    posts: 892,
    lastPost: {
      title: "[RECRUITMENT] Ищем игроков",
      author: "ClanLeader",
      time: "3 часа назад"
    },
    icon: "Users"
  },

];

// Компонент для ответов на темы
const ReplyModal = ({ children, topicId, topicTitle }: { children: React.ReactNode; topicId: string; topicTitle: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (!replyContent.trim()) {
      alert('Напишите ответ!');
      setIsSubmitting(false);
      return;
    }
    
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      alert('Для ответа на тему необходимо войти в аккаунт!');
      setIsSubmitting(false);
      return;
    }
    
    const user = JSON.parse(currentUser);
    
    const newReply = {
      id: Date.now().toString(),
      topicId: topicId,
      content: replyContent,
      author: user.nickname,
      authorEmail: user.email,
      createdAt: new Date().toISOString(),
      likes: 0
    };
    
    const existingReplies = JSON.parse(localStorage.getItem('forumReplies') || '[]');
    existingReplies.unshift(newReply);
    localStorage.setItem('forumReplies', JSON.stringify(existingReplies));
    
    const existingTopics = JSON.parse(localStorage.getItem('forumTopics') || '[]');
    const topicIndex = existingTopics.findIndex((topic: any) => topic.id === topicId);
    if (topicIndex >= 0) {
      existingTopics[topicIndex].replies = (existingTopics[topicIndex].replies || 0) + 1;
      existingTopics[topicIndex].lastReply = {
        author: user.nickname,
        time: "только что"
      };
      localStorage.setItem('forumTopics', JSON.stringify(existingTopics));
    }
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setReplyContent("");
    setIsSubmitting(false);
    setIsOpen(false);
    
    alert(`Ответ на тему "${topicTitle}" успешно отправлен!`);
    window.location.reload();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl bg-cs-gray border-cs-orange/30 text-cs-light">
        <DialogHeader>
          <DialogTitle className="font-orbitron text-2xl font-bold text-cs-orange flex items-center space-x-2">
            <Icon name="MessageCircle" size={24} />
            <span>ОТВЕТИТЬ НА ТЕМУ</span>
          </DialogTitle>
          <DialogDescription className="text-cs-light/70 font-orbitron">
            Тема: "{topicTitle}"
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-cs-orange font-orbitron tracking-wider">
              ВАШ ОТВЕТ *
            </label>
            <Textarea
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="Напишите ваш ответ..."
              className="auth-input bg-cs-gray/40 border-cs-orange/40 text-white placeholder:text-gray-400 min-h-[120px] font-orbitron focus:bg-cs-gray/60 focus:border-cs-orange focus:text-white"
              style={{ color: 'white !important', WebkitTextFillColor: 'white' }}
              maxLength={1000}
            />
            <div className="text-xs text-cs-light/60 text-right">
              {replyContent.length}/1000 символов
            </div>
          </div>

          <div className="flex space-x-3">
            <Button 
              type="submit"
              disabled={isSubmitting || !replyContent.trim()}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-orbitron font-bold disabled:opacity-50"
            >
              {isSubmitting ? (
                <Icon name="Loader2" size={16} className="animate-spin mr-2" />
              ) : (
                <Icon name="Send" size={16} className="mr-2" />
              )}
              {isSubmitting ? 'ОТПРАВЛЯЕМ...' : 'ОТПРАВИТЬ ОТВЕТ'}
            </Button>
            
            <Button 
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="border-cs-orange/40 text-cs-orange hover:bg-cs-orange/20 font-orbitron"
            >
              ОТМЕНА
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default function Forum() {
  const [userTopics, setUserTopics] = useState<any[]>([]);
  const [topicReplies, setTopicReplies] = useState<any[]>([]);

  useEffect(() => {
    // Загружаем созданные пользователем темы
    const savedTopics = localStorage.getItem('forumTopics');
    if (savedTopics) {
      setUserTopics(JSON.parse(savedTopics));
    }
    
    // Загружаем ответы на темы
    const savedReplies = localStorage.getItem('forumReplies');
    if (savedReplies) {
      setTopicReplies(JSON.parse(savedReplies));
    }
  }, []);
  return (
    <div className="min-h-screen bg-cs-dark text-cs-light">
      {/* Header */}
      <div className="bg-cs-gray/80 backdrop-blur-sm border-b border-cs-orange/20">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Icon name="MessageSquare" size={40} className="text-cs-orange" />
              <div>
                <h1 className="font-orbitron text-4xl font-black text-cs-orange cs-text-shadow">
                  ФОРУМ
                </h1>
                <p className="text-cs-light/80 font-orbitron text-sm tracking-widest">
                  [ОБСУЖДЕНИЕ] РЕАЛЬНЫЕ ПАЦАНЫ ИЗ 90-х
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <a href="/chat" className="bg-cs-gray/80 hover:bg-cs-gray text-cs-light px-4 py-2 rounded font-orbitron font-bold transition-colors flex items-center space-x-2">
                <Icon name="MessageCircle" size={16} />
                <span>ЧАТ</span>
              </a>
              <a href="/" className="bg-cs-orange hover:bg-cs-orange/80 text-cs-dark px-6 py-3 rounded font-orbitron font-bold transition-colors flex items-center space-x-2">
                <Icon name="Home" size={20} />
                <span>ГЛАВНАЯ</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Forum Stats */}
      <div className="container mx-auto px-6 py-6">
        {/* Action Bar */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
          <div className="flex items-center space-x-4">
            <h2 className="font-orbitron text-xl font-bold text-cs-light">
              РАЗДЕЛЫ ФОРУМА
            </h2>
          </div>
          <div className="flex space-x-3">
            {/* Clear Forum Button */}
            <Button 
              onClick={() => {
                if (confirm('Вы уверены, что хотите очистить все темы форума и ответы? Это действие нельзя отменить.')) {
                  localStorage.removeItem('forumTopics');
                  localStorage.removeItem('forumReplies');
                  setUserTopics([]);
                  setTopicReplies([]);
                  alert('Форум очищен!');
                }
              }}
              className="hidden md:flex bg-red-600 hover:bg-red-700 text-white font-orbitron font-bold px-4 py-3 rounded-lg shadow-lg hover:shadow-red-600/30 transform hover:scale-105 transition-all duration-300 border-2 border-red-500/50 hover:border-red-500"
            >
              <Icon name="Trash2" size={18} className="mr-2" />
              <span className="tracking-wider">ОЧИСТИТЬ</span>
            </Button>
            
            {/* Desktop Create Topic Button */}
            <CreateTopicModal>
              <Button className="hidden md:flex bg-gradient-to-r from-cs-orange to-cs-red hover:from-cs-red hover:to-cs-orange text-white font-orbitron font-bold px-6 py-3 rounded-lg shadow-lg hover:shadow-cs-orange/30 transform hover:scale-105 transition-all duration-300 border-2 border-cs-orange/50 hover:border-cs-orange">
                <Icon name="Plus" size={18} className="mr-2" />
                <span className="tracking-wider">СОЗДАТЬ ТЕМУ</span>
              </Button>
            </CreateTopicModal>
            
            {/* Mobile Buttons */}
            <div className="md:hidden flex space-x-2 w-full">
              <Button 
                onClick={() => {
                  if (confirm('Вы уверены, что хотите очистить все темы форума и ответы? Это действие нельзя отменить.')) {
                    localStorage.removeItem('forumTopics');
                    localStorage.removeItem('forumReplies');
                    setUserTopics([]);
                    setTopicReplies([]);
                    alert('Форум очищен!');
                  }
                }}
                className="bg-red-600 hover:bg-red-700 text-white font-orbitron font-bold px-3 py-3 rounded-lg shadow-lg transition-all duration-300 border-2 border-red-500/50"
              >
                <Icon name="Trash2" size={16} />
              </Button>
              
              <CreateTopicModal>
                <Button className="flex-1 bg-gradient-to-r from-cs-orange to-cs-red hover:from-cs-red hover:to-cs-orange text-white font-orbitron font-bold px-4 py-3 rounded-lg shadow-lg transition-all duration-300 border-2 border-cs-orange/50">
                  <Icon name="Plus" size={16} className="mr-2" />
                  <span className="tracking-wider text-sm">СОЗДАТЬ</span>
                </Button>
              </CreateTopicModal>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-cs-gray/80 border-cs-orange/20 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-cs-orange font-orbitron">890</div>
              <div className="text-sm text-cs-light/80">ВСЕГО ТЕМ</div>
            </CardContent>
          </Card>
          <Card className="bg-cs-gray/80 border-cs-orange/20 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-cs-orange font-orbitron">13,005</div>
              <div className="text-sm text-cs-light/80">ВСЕГО ПОСТОВ</div>
            </CardContent>
          </Card>
          <Card className="bg-cs-gray/80 border-cs-orange/20 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-cs-orange font-orbitron">342</div>
              <div className="text-sm text-cs-light/80">УЧАСТНИКОВ</div>
            </CardContent>
          </Card>
          <Card className="bg-cs-gray/80 border-cs-orange/20 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-500 font-orbitron">47</div>
              <div className="text-sm text-cs-light/80">ОНЛАЙН</div>
            </CardContent>
          </Card>
        </div>

        {/* User Created Topics */}
        {userTopics.length > 0 && (
          <div className="mb-8">
            <h3 className="font-orbitron text-xl font-bold text-cs-light mb-4">
              🔥 НЕДАВНО СОЗДАННЫЕ ТЕМЫ
            </h3>
            <div className="space-y-3">
              {userTopics.map((topic) => (
                <Card key={topic.id} className="bg-cs-gray/80 border-green-500/30 backdrop-blur-sm hover:bg-cs-gray/90 transition-colors cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        <Icon name="MessageSquare" size={24} className="text-green-500 mt-1" />
                        <div className="flex-1">
                          <h4 className="font-orbitron text-lg font-bold text-white mb-1">
                            {topic.title}
                          </h4>
                          <p className="text-cs-light/70 text-sm mb-2 line-clamp-2">
                            {topic.content}
                          </p>
                          <div className="flex items-center space-x-4 text-xs text-cs-light/60">
                            <span className="flex items-center space-x-1">
                              <Icon name="User" size={12} className="text-green-500" />
                              <span className="text-green-500">{topic.author}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Icon name="Clock" size={12} />
                              <span>{new Date(topic.createdAt).toLocaleDateString('ru-RU')}</span>
                            </span>
                            <Badge variant="outline" className="border-green-500/40 text-green-500 text-xs">
                              Новая тема
                            </Badge>
                          </div>
                          {topic.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {topic.tags.map((tag: string, tagIndex: number) => (
                                <Badge key={tagIndex} variant="outline" className="border-cs-orange/40 text-cs-orange text-xs">
                                  #{tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <ReplyModal topicId={topic.id} topicTitle={topic.title}>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="border-green-500/40 text-green-500 hover:bg-green-500/20"
                          >
                            <Icon name="MessageCircle" size={14} className="mr-1" />
                            Ответить ({topic.replies || 0})
                          </Button>
                        </ReplyModal>
                      </div>
                    </div>
                    
                    {/* Ответы на тему */}
                    {topicReplies.filter(reply => reply.topicId === topic.id).length > 0 && (
                      <div className="mt-4 pt-4 border-t border-green-500/20">
                        <div className="text-sm font-bold text-green-500 mb-3 flex items-center space-x-2">
                          <Icon name="MessageSquare" size={16} />
                          <span>ОТВЕТЫ ({topicReplies.filter(reply => reply.topicId === topic.id).length})</span>
                        </div>
                        <div className="space-y-3">
                          {topicReplies
                            .filter(reply => reply.topicId === topic.id)
                            .slice(0, 3)
                            .map((reply) => (
                            <div key={reply.id} className="bg-cs-dark/40 p-3 rounded border-l-4 border-green-500">
                              <div className="text-white text-sm mb-2">
                                {reply.content}
                              </div>
                              <div className="flex items-center justify-between text-xs text-cs-light/60">
                                <div className="flex items-center space-x-2">
                                  <Icon name="User" size={12} className="text-green-500" />
                                  <span className="text-green-500">{reply.author}</span>
                                  <Icon name="Clock" size={12} />
                                  <span>{new Date(reply.createdAt).toLocaleDateString('ru-RU')}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                      const currentUser = localStorage.getItem('currentUser');
                                      if (!currentUser) {
                                        alert('Для оценки ответа необходимо войти в аккаунт!');
                                        return;
                                      }
                                      
                                      const user = JSON.parse(currentUser);
                                      const likeKey = `like_${reply.id}_${user.email}`;
                                      const hasLiked = localStorage.getItem(likeKey);
                                      
                                      if (hasLiked) {
                                        alert('Вы уже оценили этот ответ!');
                                        return;
                                      }
                                      
                                      const updatedReplies = topicReplies.map(r => 
                                        r.id === reply.id 
                                          ? { ...r, likes: (r.likes || 0) + 1 }
                                          : r
                                      );
                                      setTopicReplies(updatedReplies);
                                      localStorage.setItem('forumReplies', JSON.stringify(updatedReplies));
                                      localStorage.setItem(likeKey, 'true');
                                    }}
                                    className="h-6 px-2 text-xs text-blue-400 hover:bg-blue-500/20 hover:text-blue-300 transition-colors"
                                  >
                                    <Icon name="ThumbsUp" size={12} className="mr-1" />
                                    {reply.likes || 0}
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                          {topicReplies.filter(reply => reply.topicId === topic.id).length > 3 && (
                            <div className="text-center">
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="border-green-500/40 text-green-500 hover:bg-green-500/20 text-xs"
                              >
                                Показать все ответы ({topicReplies.filter(reply => reply.topicId === topic.id).length})
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Forum Sections */}
        <div className="space-y-4">
          {forumSections.map((section, index) => (
            <Card key={index} className="bg-cs-gray/80 border-cs-orange/20 backdrop-blur-sm hover:bg-cs-gray/90 transition-colors cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <Icon name={section.icon as any} size={32} className="text-cs-orange mt-1" />
                    <div className="flex-1">
                      <h3 className="font-orbitron text-xl font-bold text-cs-orange mb-2">
                        {section.title}
                      </h3>
                      <p className="text-cs-light/80 mb-3">{section.description}</p>
                      <div className="flex space-x-4 text-sm text-cs-light/60">
                        <span>Тем: <span className="text-cs-orange">{section.topics}</span></span>
                        <span>Постов: <span className="text-cs-orange">{section.posts}</span></span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right min-w-[200px]">
                    <div className="text-sm text-cs-light/80 mb-1">Последний пост:</div>
                    <div className="text-sm font-semibold text-cs-light">{section.lastPost.title}</div>
                    <div className="text-xs text-cs-light/60">
                      от <span className="text-cs-orange">{section.lastPost.author}</span>
                    </div>
                    <div className="text-xs text-cs-light/60">{section.lastPost.time}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Online Users */}
        <Card className="bg-cs-gray/80 border-cs-orange/20 backdrop-blur-sm mt-8">
          <CardHeader>
            <CardTitle className="font-orbitron text-cs-orange flex items-center space-x-2">
              <Icon name="Users" size={24} />
              <span>СЕЙЧАС НА ФОРУМЕ</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {["Admin_Vitalik", "ProGamer2000", "Player_228", "ClanLeader", "RandomPlayer", "NoobSlayer", "HeadShot_King", "CSS_Legend"].map((user) => (
                <Badge key={user} variant="outline" className="border-cs-orange/40 text-cs-light">
                  <Icon name="Circle" size={8} className="text-green-500 mr-1" />
                  {user}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Floating Action Button for Mobile */}
        <div className="fixed bottom-6 right-6 md:hidden z-50">
          <CreateTopicModal>
            <Button 
              size="lg"
              className="w-14 h-14 rounded-full bg-gradient-to-r from-cs-orange to-cs-red hover:from-cs-red hover:to-cs-orange shadow-2xl hover:shadow-cs-orange/40 transform hover:scale-110 transition-all duration-300 border-2 border-cs-orange/50 hover:border-cs-orange"
            >
              <Icon name="Plus" size={24} className="text-white" />
            </Button>
          </CreateTopicModal>
        </div>
      </div>
    </div>
  );
}