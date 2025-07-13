import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { ForumSection } from "@/types/forum";

interface ForumSectionsProps {
  sections: ForumSection[];
}

export default function ForumSections({ sections }: ForumSectionsProps) {
  return (
    <div className="space-y-4">
      {sections.map((section, index) => (
        <Card 
          key={index} 
          className="bg-cs-gray/80 border-cs-orange/20 backdrop-blur-sm hover:bg-cs-gray/90 transition-colors cursor-pointer"
        >
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
                <div className="text-sm text-cs-light/80 mb-1">
                  Последний пост:
                </div>
                <div className="text-cs-orange font-bold text-sm truncate">
                  {section.lastPost.title}
                </div>
                <div className="text-xs text-cs-light/60 mt-1">
                  от <span className="text-cs-orange">{section.lastPost.author}</span>
                </div>
                <div className="text-xs text-cs-light/60">
                  {section.lastPost.time}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}