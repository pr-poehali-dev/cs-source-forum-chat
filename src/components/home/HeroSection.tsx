import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

export const HeroSection = () => {
  return (
    <section 
      className="py-20 px-6 relative bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/img/be0e4ee6-c0b2-49e3-a108-86aa87cdfb75.jpg')`
      }}
    >
      <div className="container mx-auto text-center relative z-10">
        <h2 className="font-orbitron text-6xl font-black text-cs-orange cs-text-shadow mb-6">
          ГОТОВ К БОЮ?
        </h2>
        <p className="text-xl text-cs-light/90 mb-8 max-w-2xl mx-auto font-semibold text-shadow">
          Присоединяйся к легендарному сообществу Counter-Strike: Source.
          Соревнуйся, общайся и становись лучшим!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-cs-orange hover:bg-cs-orange/80 font-semibold"
            onClick={() => navigator.clipboard.writeText('connect 45.136.205.92:27015')}
          >
            <Icon name="Play" size={20} className="mr-2" />
            Играть сейчас
          </Button>
          <a href="/forum">
            <Button
              size="lg"
              variant="outline"
              className="border-cs-orange text-cs-orange hover:bg-cs-orange hover:text-white w-full"
            >
              <Icon name="Users" size={20} className="mr-2" />
              Перейти на форум
            </Button>
          </a>
          <a href="/chat">
            <Button
              size="lg"
              variant="outline"
              className="border-cs-blue text-cs-blue hover:bg-cs-blue hover:text-white w-full"
            >
              <Icon name="MessageSquare" size={20} className="mr-2" />
              Открыть чат
            </Button>
          </a>
        </div>
      </div>
      
      {/* Weapon overlay elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 opacity-20 transform rotate-12">
          <Icon name="Crosshair" size={60} className="text-cs-orange" />
        </div>
        <div className="absolute bottom-10 left-10 opacity-20 transform -rotate-12">
          <Icon name="Target" size={60} className="text-cs-red" />
        </div>
        <div className="absolute top-1/2 left-10 opacity-10 transform -rotate-45">
          <Icon name="Zap" size={80} className="text-cs-orange" />
        </div>
        <div className="absolute top-1/3 right-20 opacity-10 transform rotate-45">
          <Icon name="Flame" size={70} className="text-cs-red" />
        </div>
      </div>
    </section>
  );
};