import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

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
  {
    title: "ТУРНИРЫ И СОРЕВНОВАНИЯ",
    description: "Анонсы турниров, результаты матчей",
    topics: 45,
    posts: 678,
    lastPost: {
      title: "Результаты турнира 12.07",
      author: "Tournament_Admin",
      time: "1 день назад"
    },
    icon: "Trophy"
  },
  {
    title: "ФЛЕЙМ И ТРЕШ",
    description: "Для всего остального",
    topics: 312,
    posts: 4521,
    lastPost: {
      title: "Кто самый крутой?",
      author: "RandomPlayer",
      time: "30 минут назад"
    },
    icon: "Flame"
  }
];

export default function Forum() {
  return (
    <div className="min-h-screen bg-cs-dark text-cs-light">
      {/* Header */}
      <div className="bg-cs-gray/80 backdrop-blur-sm border-b border-cs-orange/20">
        <div className="container mx-auto px-6 py-8">
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
        </div>
      </div>

      {/* Forum Stats */}
      <div className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-cs-gray/80 border-cs-orange/20 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-cs-orange font-orbitron">1,247</div>
              <div className="text-sm text-cs-light/80">ВСЕГО ТЕМ</div>
            </CardContent>
          </Card>
          <Card className="bg-cs-gray/80 border-cs-orange/20 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-cs-orange font-orbitron">18,456</div>
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
      </div>
    </div>
  );
}