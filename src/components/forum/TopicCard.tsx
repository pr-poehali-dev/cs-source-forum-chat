import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import ReplyModal from "./ReplyModal";
import { ForumTopic, ForumReply } from "@/types/forum";
import { getCurrentUser, toggleLike, getForumReplies } from "@/utils/forumUtils";

interface TopicCardProps {
  topic: ForumTopic;
  replies: ForumReply[];
  onDataUpdate: () => void;
}

export default function TopicCard({ topic, replies, onDataUpdate }: TopicCardProps) {
  const topicReplies = replies.filter(reply => reply.topicId === topic.id);

  const handleLike = (replyId: string) => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      alert('Для оценки ответа необходимо войти в аккаунт!');
      return;
    }

    const success = toggleLike(replyId, currentUser.email);
    if (!success) {
      alert('Вы уже оценили этот ответ!');
      return;
    }

    onDataUpdate();
  };

  return (
    <Card className="bg-cs-gray/80 border-cs-orange/20 backdrop-blur-sm hover:bg-cs-gray/90 transition-colors">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-orbitron text-xl font-bold text-cs-orange mb-2">
              {topic.title}
            </h3>
            <p className="text-cs-light/80 mb-3 line-clamp-2">
              {topic.content}
            </p>
            <div className="flex items-center space-x-4 text-sm text-cs-light/60 mb-3">
              <div className="flex items-center space-x-2">
                <Icon name="User" size={14} className="text-cs-orange" />
                <span>{topic.author}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={14} />
                <span>{new Date(topic.createdAt).toLocaleDateString('ru-RU')}</span>
              </div>
              {topic.lastReply && (
                <div className="flex items-center space-x-2">
                  <Icon name="MessageCircle" size={14} />
                  <span>Последний ответ: {topic.lastReply.author} ({topic.lastReply.time})</span>
                </div>
              )}
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
          <div className="text-right">
            <ReplyModal topicId={topic.id} topicTitle={topic.title} onReplyAdded={onDataUpdate}>
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
        {topicReplies.length > 0 && (
          <div className="mt-4 pt-4 border-t border-green-500/20">
            <div className="text-sm font-bold text-green-500 mb-3 flex items-center space-x-2">
              <Icon name="MessageSquare" size={16} />
              <span>ОТВЕТЫ ({topicReplies.length})</span>
            </div>
            <div className="space-y-3">
              {topicReplies.slice(0, 3).map((reply) => (
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
                        onClick={() => handleLike(reply.id)}
                        className="h-6 px-2 text-xs text-blue-400 hover:bg-blue-500/20 hover:text-blue-300 transition-colors"
                      >
                        <Icon name="ThumbsUp" size={12} className="mr-1" />
                        {reply.likes || 0}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              {topicReplies.length > 3 && (
                <div className="text-center">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-green-500/40 text-green-500 hover:bg-green-500/20 text-xs"
                  >
                    Показать все ответы ({topicReplies.length})
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}