import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { getCurrentUser, addReply } from "@/utils/forumUtils";

interface ReplyModalProps {
  children: React.ReactNode;
  topicId: string;
  topicTitle: string;
  onReplyAdded?: () => void;
}

export default function ReplyModal({ children, topicId, topicTitle, onReplyAdded }: ReplyModalProps) {
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
    
    const currentUser = getCurrentUser();
    if (!currentUser) {
      alert('Для ответа на тему необходимо войти в аккаунт!');
      setIsSubmitting(false);
      return;
    }
    
    try {
      // Имитируем задержку отправки
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      addReply(topicId, replyContent, currentUser);
      
      setReplyContent("");
      setIsSubmitting(false);
      setIsOpen(false);
      
      alert(`Ответ на тему "${topicTitle}" успешно отправлен!`);
      
      // Вызываем колбек для обновления данных
      if (onReplyAdded) {
        onReplyAdded();
      } else {
        // Fallback к перезагрузке страницы если колбек не передан
        window.location.reload();
      }
    } catch (error) {
      alert('Ошибка при отправке ответа');
      setIsSubmitting(false);
    }
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
          {/* Содержание ответа */}
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

          {/* Превью */}
          {replyContent && (
            <Card className="bg-cs-dark/50 border-cs-orange/20">
              <CardContent className="p-4">
                <div className="text-sm font-bold text-cs-orange font-orbitron mb-2">
                  ПРЕВЬЮ ОТВЕТА:
                </div>
                <div className="bg-cs-gray/30 p-3 rounded border-l-4 border-green-500">
                  <div className="text-white text-sm whitespace-pre-wrap">
                    {replyContent}
                  </div>
                  <div className="text-xs text-cs-light/60 mt-2 flex items-center space-x-2">
                    <Icon name="User" size={12} className="text-green-500" />
                    <span>Ваш ответ</span>
                    <Icon name="Clock" size={12} />
                    <span>только что</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Кнопки */}
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
}