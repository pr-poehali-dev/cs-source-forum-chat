import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

export default function Rules() {
  return (
    <div className="min-h-screen bg-cs-dark text-cs-light">
      {/* Header */}
      <div className="bg-cs-gray/80 backdrop-blur-sm border-b border-cs-orange/20">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Icon name="Shield" size={40} className="text-cs-red" />
              <div>
                <h1 className="font-orbitron text-4xl font-black text-cs-red cs-text-shadow">
                  ПРАВИЛА СЕРВЕРА
                </h1>
                <p className="text-cs-light/80 font-orbitron text-sm tracking-widest">
                  [ОБЯЗАТЕЛЬНО] РЕАЛЬНЫЕ ПАЦАНЫ ИЗ 90-х
                </p>
              </div>
            </div>
            <a href="/" className="bg-cs-orange hover:bg-cs-orange/80 text-cs-dark px-6 py-3 rounded font-orbitron font-bold transition-colors flex items-center space-x-2">
              <Icon name="Home" size={20} />
              <span>ГЛАВНАЯ</span>
            </a>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Main Rules Card */}
        <Card className="bg-cs-gray/80 border-cs-red/40 backdrop-blur-sm mb-8">
          <CardHeader className="border-b border-cs-red/20">
            <CardTitle className="font-orbitron text-cs-red flex items-center space-x-2">
              <Icon name="AlertTriangle" size={24} />
              <span>ВНИМАНИЕ! ОБЯЗАТЕЛЬНО К ПРОЧТЕНИЮ</span>
            </CardTitle>
            <p className="text-cs-light/80">
              Незнание правил не освобождает от ответственности. Нарушение ведет к наказанию.
            </p>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Main Rules */}
              <div className="space-y-6">
                <h3 className="font-orbitron text-xl text-cs-orange font-bold mb-4 flex items-center space-x-2">
                  <Icon name="CheckCircle" size={20} />
                  <span>ОСНОВНЫЕ ПРАВИЛА</span>
                </h3>
                
                {[
                  {
                    title: "1. УВАЖЕНИЕ К ИГРОКАМ",
                    desc: "Запрещен мат, оскорбления, унижения других игроков. Общайтесь культурно."
                  },
                  {
                    title: "2. НЕТ СПАМУ",
                    desc: "Не спамить в чат и голосовой. Не повторять одно сообщение много раз."
                  },
                  {
                    title: "3. НИКАКИХ ЧИТОВ",
                    desc: "Запрещено использование любых читов, багов карт или эксплойтов."
                  },
                  {
                    title: "4. КОМАНДНАЯ ИГРА",
                    desc: "Не блокировать союзников, не мешать игре команды."
                  },
                  {
                    title: "5. ИГРА ПО ЦЕЛЯМ",
                    desc: "Играть по задачам карты. Не кемпить всю раунд без цели."
                  },
                  {
                    title: "6. СЛУШАТЬ АДМИНОВ",
                    desc: "Выполнять указания администрации сервера."
                  }
                ].map((rule, index) => (
                  <div key={index} className="p-4 bg-cs-dark/40 rounded border border-cs-orange/20">
                    <h4 className="font-orbitron text-cs-orange font-semibold mb-2">{rule.title}</h4>
                    <p className="text-cs-light/80 text-sm">{rule.desc}</p>
                  </div>
                ))}
              </div>

              {/* Additional Rules */}
              <div className="space-y-6">
                <h3 className="font-orbitron text-xl text-cs-orange font-bold mb-4 flex items-center space-x-2">
                  <Icon name="Settings" size={20} />
                  <span>ДОПОЛНИТЕЛЬНЫЕ ПРАВИЛА</span>
                </h3>

                {[
                  {
                    title: "7. ПРАВИЛЬНЫЙ НИК",
                    desc: "Ник должен содержать только латинские буквы и цифры. Без спецсимволов."
                  },
                  {
                    title: "8. НЕТ РЕКЛАМЕ",
                    desc: "Запрещена реклама других серверов, сайтов, каналов без разрешения."
                  },
                  {
                    title: "9. НЕ ПРОСИТЬ ПРАВА",
                    desc: "Не просить админку, привилегии или особые права."
                  },
                  {
                    title: "10. ОДИН АККАУНТ",
                    desc: "Не обходить наказания с других аккаунтов или IP адресов."
                  },
                  {
                    title: "11. РУССКИЙ ЯЗЫК",
                    desc: "В чате желательно общаться на русском языке."
                  },
                  {
                    title: "12. FAIR PLAY",
                    desc: "Играть честно, получать удовольствие от игры!"
                  }
                ].map((rule, index) => (
                  <div key={index} className="p-4 bg-cs-dark/40 rounded border border-cs-orange/20">
                    <h4 className="font-orbitron text-cs-orange font-semibold mb-2">{rule.title}</h4>
                    <p className="text-cs-light/80 text-sm">{rule.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Punishment System */}
        <Card className="bg-cs-gray/80 border-cs-red/40 backdrop-blur-sm mb-8">
          <CardHeader>
            <CardTitle className="font-orbitron text-cs-red flex items-center space-x-2">
              <Icon name="Ban" size={24} />
              <span>СИСТЕМА НАКАЗАНИЙ</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-cs-dark/40 rounded border border-yellow-500/20">
                <Icon name="MessageSquareWarning" size={48} className="text-yellow-500 mx-auto mb-4" />
                <h4 className="font-orbitron text-lg font-bold text-yellow-500 mb-2">ПРЕДУПРЕЖДЕНИЕ</h4>
                <p className="text-cs-light/80 text-sm mb-2">За первое нарушение</p>
                <ul className="text-xs text-cs-light/60 space-y-1">
                  <li>• Устное предупреждение</li>
                  <li>• Запись в базу нарушений</li>
                  <li>• Шанс исправиться</li>
                </ul>
              </div>

              <div className="text-center p-6 bg-cs-dark/40 rounded border border-orange-500/20">
                <Icon name="UserX" size={48} className="text-orange-500 mx-auto mb-4" />
                <h4 className="font-orbitron text-lg font-bold text-orange-500 mb-2">КИК</h4>
                <p className="text-cs-light/80 text-sm mb-2">За повторное нарушение</p>
                <ul className="text-xs text-cs-light/60 space-y-1">
                  <li>• Исключение с сервера</li>
                  <li>• Можно сразу вернуться</li>
                  <li>• Последнее предупреждение</li>
                </ul>
              </div>

              <div className="text-center p-6 bg-cs-dark/40 rounded border border-red-500/20">
                <Icon name="Ban" size={48} className="text-red-500 mx-auto mb-4" />
                <h4 className="font-orbitron text-lg font-bold text-red-500 mb-2">БАН</h4>
                <p className="text-cs-light/80 text-sm mb-2">За серьезные нарушения</p>
                <ul className="text-xs text-cs-light/60 space-y-1">
                  <li>• От 1 часа до навсегда</li>
                  <li>• В зависимости от тяжести</li>
                  <li>• Разбан только через админов</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-cs-red/10 border border-cs-red/20 rounded">
              <h4 className="font-orbitron text-cs-red font-bold mb-2">ОСОБЫЕ НАКАЗАНИЯ:</h4>
              <ul className="text-sm text-cs-light/80 space-y-1">
                <li>• <strong>Читы:</strong> Постоянный бан без предупреждений</li>
                <li>• <strong>Обход бана:</strong> Увеличение срока наказания в 2 раза</li>
                <li>• <strong>Оскорбление админов:</strong> Немедленный бан на 24 часа</li>
                <li>• <strong>Спам:</strong> Мут в чате на время, определяемое админом</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Contact Info */}
        <Card className="bg-cs-gray/80 border-cs-orange/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="font-orbitron text-cs-orange flex items-center space-x-2">
              <Icon name="MessageCircle" size={24} />
              <span>КОНТАКТЫ АДМИНИСТРАЦИИ</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-orbitron text-cs-orange font-semibold">Вопросы по правилам:</h4>
                <div className="p-4 bg-cs-dark/40 rounded">
                  <a 
                    href="https://t.me/realguys90x" 
                    className="flex items-center space-x-3 text-blue-400 hover:text-blue-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon name="Send" size={20} className="rotate-45" />
                    <span>@realguys90x</span>
                  </a>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-orbitron text-cs-orange font-semibold">Подача жалоб:</h4>
                <div className="p-4 bg-cs-dark/40 rounded">
                  <p className="text-cs-light/80 text-sm">
                    Жалобы на игроков принимаются с доказательствами (скриншоты, демо)
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center p-4 bg-cs-orange/10 border border-cs-orange/20 rounded">
              <p className="text-cs-light/80">
                <strong className="text-cs-orange">Помните:</strong> Соблюдение правил делает игру приятной для всех!
                <br />
                <span className="text-sm">Хорошей игры, бойцы! 🎮</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}