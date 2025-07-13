import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

const forumCategories = [
  { value: "general", label: "ОБЩИЕ ВОПРОСЫ", icon: "MessageSquare", color: "text-cs-orange" },
  { value: "technical", label: "ТЕХНИЧЕСКИЕ ПРОБЛЕМЫ", icon: "Settings", color: "text-red-500" },
  { value: "tactics", label: "ТАКТИКА И СТРАТЕГИЯ", icon: "Target", color: "text-blue-500" },
  { value: "clans", label: "КЛАНЫ И КОМАНДЫ", icon: "Users", color: "text-green-500" },
];

interface CreateTopicModalProps {
  children: React.ReactNode;
}

export default function CreateTopicModal({ children }: CreateTopicModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    content: "",
    tags: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Валидация
    if (!formData.title.trim() || !formData.category || !formData.content.trim()) {
      alert('Заполните все обязательные поля!');
      setIsSubmitting(false);
      return;
    }
    
    // Проверяем авторизацию
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      alert('Для создания темы необходимо войти в аккаунт!');
      setIsSubmitting(false);
      return;
    }
    
    const user = JSON.parse(currentUser);
    
    // Создаем новую тему
    const newTopic = {
      id: Date.now().toString(),
      title: formData.title,
      category: formData.category,
      content: formData.content,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      author: user.nickname,
      authorEmail: user.email,
      createdAt: new Date().toISOString(),
      views: 0,
      replies: 0,
      lastReply: null
    };
    
    // Сохраняем в localStorage
    const existingTopics = JSON.parse(localStorage.getItem('forumTopics') || '[]');
    existingTopics.unshift(newTopic);
    localStorage.setItem('forumTopics', JSON.stringify(existingTopics));
    
    // Симуляция отправки данных
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Сброс формы и закрытие модального окна
    setFormData({ title: "", category: "", content: "", tags: "" });
    setIsSubmitting(false);
    setIsOpen(false);
    
    alert(`Тема "${formData.title}" успешно создана!`);
    
    // Перезагружаем страницу чтобы отобразить новую тему
    window.location.reload();
  };

  const isFormValid = formData.title.trim() && formData.category && formData.content.trim();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl bg-cs-gray border-cs-orange/30 text-cs-light">
        <DialogHeader>
          <DialogTitle className="font-orbitron text-2xl font-bold text-cs-orange flex items-center space-x-2">
            <Icon name="Plus" size={24} />
            <span>СОЗДАТЬ НОВУЮ ТЕМУ</span>
          </DialogTitle>
          <DialogDescription className="text-cs-light/70 font-orbitron">
            Заполните все поля для создания новой темы на форуме
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Заголовок темы */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-cs-orange font-orbitron tracking-wider">
              ЗАГОЛОВОК ТЕМЫ *
            </label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Введите заголовок темы..."
              className="bg-cs-gray/40 border-cs-orange/40 text-white placeholder:text-gray-400 font-orbitron focus:bg-cs-gray/60 focus:border-cs-orange focus:text-white"
              maxLength={100}
            />
            <div className="text-xs text-cs-light/60 text-right">
              {formData.title.length}/100 символов
            </div>
          </div>

          {/* Категория */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-cs-orange font-orbitron tracking-wider">
              КАТЕГОРИЯ *
            </label>
            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
              <SelectTrigger className="bg-cs-gray/40 border-cs-orange/40 text-cs-light font-orbitron focus:bg-cs-gray/60 focus:border-cs-orange">
                <SelectValue placeholder="Выберите категорию..." />
              </SelectTrigger>
              <SelectContent className="bg-cs-gray border-cs-orange/40">
                {forumCategories.map((category) => (
                  <SelectItem key={category.value} value={category.value} className="text-cs-light hover:bg-cs-orange/20">
                    <div className="flex items-center space-x-2">
                      <Icon name={category.icon as any} size={16} className={category.color} />
                      <span className="font-orbitron">{category.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Содержание */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-cs-orange font-orbitron tracking-wider">
              СОДЕРЖАНИЕ *
            </label>
            <Textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Опишите вашу тему подробно..."
              className="bg-cs-gray/40 border-cs-orange/40 text-white placeholder:text-gray-400 min-h-[120px] font-orbitron focus:bg-cs-gray/60 focus:border-cs-orange focus:text-white"
              maxLength={2000}
            />
            <div className="text-xs text-cs-light/60 text-right">
              {formData.content.length}/2000 символов
            </div>
          </div>

          {/* Теги */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-cs-orange font-orbitron tracking-wider">
              ТЕГИ
            </label>
            <Input
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              placeholder="dust2, awp, тактика (через запятую)"
              className="bg-cs-gray/40 border-cs-orange/40 text-white placeholder:text-gray-400 font-orbitron focus:bg-cs-gray/60 focus:border-cs-orange focus:text-white"
            />
            <div className="text-xs text-cs-light/60">
              Используйте теги для лучшего поиска темы
            </div>
          </div>

          {/* Превью */}
          {formData.title && formData.category && (
            <Card className="bg-cs-dark/50 border-cs-orange/20">
              <CardContent className="p-4">
                <div className="text-sm font-bold text-cs-orange font-orbitron mb-2">
                  ПРЕВЬЮ ТЕМЫ:
                </div>
                <div className="flex items-start space-x-3">
                  <Icon 
                    name={forumCategories.find(c => c.value === formData.category)?.icon as any} 
                    size={24} 
                    className={forumCategories.find(c => c.value === formData.category)?.color} 
                  />
                  <div>
                    <h3 className="font-orbitron font-bold text-cs-light">{formData.title}</h3>
                    <div className="text-xs text-cs-light/60">
                      в категории <span className="text-cs-orange">{forumCategories.find(c => c.value === formData.category)?.label}</span>
                    </div>
                    {formData.content && (
                      <p className="text-sm text-cs-light/80 mt-2 line-clamp-3">
                        {formData.content}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Кнопки */}
          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="flex-1 border-cs-orange/40 text-cs-light hover:bg-cs-orange/20 font-orbitron"
            >
              <Icon name="X" size={16} className="mr-2" />
              ОТМЕНА
            </Button>
            <Button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className="flex-1 bg-gradient-to-r from-cs-orange to-cs-red hover:from-cs-red hover:to-cs-orange disabled:opacity-50 disabled:cursor-not-allowed font-orbitron font-bold"
            >
              {isSubmitting ? (
                <>
                  <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                  СОЗДАНИЕ...
                </>
              ) : (
                <>
                  <Icon name="Send" size={16} className="mr-2" />
                  СОЗДАТЬ ТЕМУ
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}