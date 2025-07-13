import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import CreateTopicModal from "./CreateTopicModal";
import { clearForumData } from "@/utils/forumUtils";

interface ForumHeaderProps {
  onDataUpdate: () => void;
}

export default function ForumHeader({ onDataUpdate }: ForumHeaderProps) {
  const handleClearForum = () => {
    if (confirm('Вы уверены, что хотите очистить все темы форума и ответы? Это действие нельзя отменить.')) {
      clearForumData();
      onDataUpdate();
      alert('Форум очищен!');
    }
  };

  return (
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
            <a 
              href="/chat" 
              className="bg-cs-gray/80 hover:bg-cs-gray text-cs-light px-4 py-2 rounded font-orbitron font-bold transition-colors flex items-center space-x-2"
            >
              <Icon name="MessageCircle" size={16} />
              <span>ЧАТ</span>
            </a>
            <a 
              href="/" 
              className="bg-cs-orange hover:bg-cs-orange/80 text-cs-dark px-6 py-3 rounded font-orbitron font-bold transition-colors flex items-center space-x-2"
            >
              <Icon name="Home" size={20} />
              <span>ГЛАВНАЯ</span>
            </a>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="container mx-auto px-6 py-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
          <div className="flex items-center space-x-4">
            <h2 className="font-orbitron text-xl font-bold text-cs-light">
              РАЗДЕЛЫ ФОРУМА
            </h2>
          </div>
          <div className="flex space-x-3">
            {/* Clear Forum Button */}
            <Button 
              onClick={handleClearForum}
              className="hidden md:flex bg-red-600 hover:bg-red-700 text-white font-orbitron font-bold px-4 py-3 rounded-lg shadow-lg hover:shadow-red-600/30 transform hover:scale-105 transition-all duration-300 border-2 border-red-500/50 hover:border-red-500"
            >
              <Icon name="Trash2" size={18} className="mr-2" />
              <span className="tracking-wider">ОЧИСТИТЬ</span>
            </Button>
            
            {/* Desktop Create Topic Button */}
            <CreateTopicModal onTopicCreated={onDataUpdate}>
              <Button className="hidden md:flex bg-gradient-to-r from-cs-orange to-cs-red hover:from-cs-red hover:to-cs-orange text-white font-orbitron font-bold px-6 py-3 rounded-lg shadow-lg hover:shadow-cs-orange/30 transform hover:scale-105 transition-all duration-300 border-2 border-cs-orange/50 hover:border-cs-orange">
                <Icon name="Plus" size={18} className="mr-2" />
                <span className="tracking-wider">СОЗДАТЬ ТЕМУ</span>
              </Button>
            </CreateTopicModal>
            
            {/* Mobile Buttons */}
            <div className="md:hidden flex space-x-2 w-full">
              <Button 
                onClick={handleClearForum}
                className="bg-red-600 hover:bg-red-700 text-white font-orbitron font-bold px-3 py-3 rounded-lg shadow-lg transition-all duration-300 border-2 border-red-500/50"
              >
                <Icon name="Trash2" size={16} />
              </Button>
              
              <CreateTopicModal onTopicCreated={onDataUpdate}>
                <Button className="flex-1 bg-gradient-to-r from-cs-orange to-cs-red hover:from-cs-red hover:to-cs-orange text-white font-orbitron font-bold px-4 py-3 rounded-lg shadow-lg transition-all duration-300 border-2 border-cs-orange/50">
                  <Icon name="Plus" size={16} className="mr-2" />
                  <span className="tracking-wider text-sm">СОЗДАТЬ</span>
                </Button>
              </CreateTopicModal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}