import { ForumSection } from "@/types/forum";

export const forumSections: ForumSection[] = [
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
  }
];