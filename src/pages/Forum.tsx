import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import ForumHeader from "@/components/forum/ForumHeader";
import ForumSections from "@/components/forum/ForumSections";
import TopicCard from "@/components/forum/TopicCard";
import { ForumTopic, ForumReply } from "@/types/forum";
import { getForumTopics, getForumReplies } from "@/utils/forumUtils";
import { forumSections } from "@/data/forumData";

export default function Forum() {
  const [userTopics, setUserTopics] = useState<ForumTopic[]>([]);
  const [topicReplies, setTopicReplies] = useState<ForumReply[]>([]);

  const loadForumData = () => {
    setUserTopics(getForumTopics());
    setTopicReplies(getForumReplies());
  };

  useEffect(() => {
    loadForumData();
  }, []);

  const handleDataUpdate = () => {
    loadForumData();
  };

  return (
    <div className="min-h-screen bg-cs-dark text-cs-light">
      <ForumHeader onDataUpdate={handleDataUpdate} />

      <div className="container mx-auto px-6 py-6">
        {/* Forum Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-cs-gray/80 border-cs-orange/20 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-cs-orange font-orbitron">
                {userTopics.length}
              </div>
              <div className="text-sm text-cs-light/70 font-orbitron">СОЗДАННЫХ ТЕМ</div>
            </CardContent>
          </Card>
          
          <Card className="bg-cs-gray/80 border-cs-orange/20 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-cs-orange font-orbitron">
                {topicReplies.length}
              </div>
              <div className="text-sm text-cs-light/70 font-orbitron">ВСЕГО ОТВЕТОВ</div>
            </CardContent>
          </Card>
          
          <Card className="bg-cs-gray/80 border-cs-orange/20 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-cs-orange font-orbitron">
                {new Set(topicReplies.map(r => r.author)).size}
              </div>
              <div className="text-sm text-cs-light/70 font-orbitron">АКТИВНЫХ ИГРОКОВ</div>
            </CardContent>
          </Card>
          
          <Card className="bg-cs-gray/80 border-cs-orange/20 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-cs-orange font-orbitron">
                ОНЛАЙН
              </div>
              <div className="text-sm text-cs-light/70 font-orbitron">СТАТУС ФОРУМА</div>
            </CardContent>
          </Card>
        </div>

        {/* User Created Topics */}
        {userTopics.length > 0 && (
          <div className="mb-8">
            <h2 className="font-orbitron text-2xl font-bold text-cs-light mb-6 flex items-center space-x-2">
              <span>СОЗДАННЫЕ ТЕМЫ</span>
              <div className="w-8 h-8 bg-cs-orange rounded-full flex items-center justify-center text-cs-dark font-bold text-sm">
                {userTopics.length}
              </div>
            </h2>
            <div className="space-y-4">
              {userTopics.map((topic) => (
                <TopicCard 
                  key={topic.id} 
                  topic={topic} 
                  replies={topicReplies} 
                  onDataUpdate={handleDataUpdate}
                />
              ))}
            </div>
          </div>
        )}

        {/* Forum Sections */}
        <div className="space-y-4">
          <ForumSections sections={forumSections} />
        </div>
      </div>
    </div>
  );
}