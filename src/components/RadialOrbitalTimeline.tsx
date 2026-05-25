import { LiquidButton } from './ui/liquid-glass-button';
"use client";
import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, Link, Zap, Activity, Heart, Sparkles, Cpu, Truck, Dna } from "lucide-react";

// CUSTOM MINIMAL COMPATIBILITY COMPONENT SHIMS
// To avoid missing shadcn dependencies and secure zero-error deployment
const Badge = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide ${className}`}>
    {children}
  </span>
);

const Button = ({ children, className = "", onClick, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <LiquidButton
    onClick={onClick}
    className={`inline-flex items-center justify-center rounded-md font-medium transition-all focus:outline-none active:scale-95 disabled:pointer-events-none disabled:opacity-50 ${className}`}
    {...props}
  >
    {children}
  </LiquidButton>
);

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`glass-panel-dark relative ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`flex flex-col space-y-1.5 p-4 ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <h3 className={`font-semibold leading-none tracking-tight text-white ${className}`}>
    {children}
  </h3>
);

const CardContent = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`p-4 pt-0 text-zinc-300 ${className}`}>
    {children}
  </div>
);

interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

interface RadialOrbitalTimelineProps {
  lang?: "RU" | "EN";
}

export default function RadialOrbitalTimeline({
  lang = "RU",
}: RadialOrbitalTimelineProps) {
  // Translate timeline objects dynamically based on the current active language
  const getTimelineData = (): TimelineItem[] => {
    if (lang === "RU") {
      return [
        {
          id: 1,
          title: "ООО «БСС»",
          date: "Учреждено в 1996",
          category: "Дистрибуция",
          icon: Activity,
          relatedIds: [5, 6],
          status: "completed",
          energy: 100,
          content: "Ключевое юридическое лицо холдинга, организующее комплексные оптовые поставки сертифицированных лекарственных средств и вакцин по всей России.",
        },
        {
          id: 2,
          title: "ООО «Алоэ»",
          date: "Учреждено в 2014",
          category: "Аптечный Ритейл",
          icon: Heart,
          relatedIds: [1, 4],
          status: "completed",
          energy: 95,
          content: "Розничное подразделение холдинга, управляющее разветвлённой федеральной аптечной сетью из более 650 современных аптек.",
        },
        {
          id: 3,
          title: "ООО «ЭндоАрт»",
          date: "Учреждено в 2019",
          category: "Косметология",
          icon: Sparkles,
          relatedIds: [1, 6],
          status: "completed",
          energy: 88,
          content: "Эксклюзивный поставщик инъекционных имплантатов, профессиональной косметики и хай-тек лазерного оборудования для клиник красоты.",
        },
        {
          id: 4,
          title: "ООО «Дзен Ай Ти»",
          date: "Учреждено в 2021",
          category: "ИТ-разработка",
          icon: Cpu,
          relatedIds: [1, 2],
          status: "completed",
          energy: 91,
          content: "Высокотехнологичный IT-отдел холдинга, создающий логистические ERP-платформы, финтех и интеграции Честного ЗНАКа.",
        },
        {
          id: 5,
          title: "ООО «БСС-Логистика»",
          date: "Учреждено в 2011",
          category: "3PL Логистика",
          icon: Truck,
          relatedIds: [1, 2],
          status: "completed",
          energy: 98,
          content: "Специализированный GDP-оператор полного цикла со своим термолабильным автопарком и складами класса «А» свыше 45 000 м².",
        },
        {
          id: 6,
          title: "ООО «БСС-Биотех»",
          date: "Учреждено в 2023",
          category: "Биотехнологии",
          icon: Dna,
          relatedIds: [1, 3],
          status: "in-progress",
          energy: 76,
          content: "Инновационное R&D производство биотехнологических препаратов, лечебных биостимуляторов и сборки российских медизделий.",
        },
      ];
    } else {
      return [
        {
          id: 1,
          title: "BSS LLC",
          date: "Founded in 1996",
          category: "Distribution",
          icon: Activity,
          relatedIds: [5, 6],
          status: "completed",
          energy: 100,
          content: "Main legal entity supervising nationwide pharmaceutical wholesale logistics, vaccine deliveries, and public health supplies.",
        },
        {
          id: 2,
          title: "ALOE LLC",
          date: "Founded in 2014",
          category: "Retail Pharmacy",
          icon: Heart,
          relatedIds: [1, 4],
          status: "completed",
          energy: 95,
          content: "Retail asset of BSS Holding, managing a robust nationwide sequence of over 650 physical pharmacies.",
        },
        {
          id: 3,
          title: "ENDOART LLC",
          date: "Founded in 2019",
          category: "Aesthetics",
          icon: Sparkles,
          relatedIds: [1, 6],
          status: "completed",
          energy: 88,
          content: "Exclusive boutique supply company representing dermal injectables, collagen boosters, and state-of-the-art beauty equipment.",
        },
        {
          id: 4,
          title: "ZEN IT LLC",
          date: "Founded in 2021",
          category: "Software R&D",
          icon: Cpu,
          relatedIds: [1, 2],
          status: "completed",
          energy: 91,
          content: "Tech-oriented development center creating distribution ERP models, mobile apps, and track-trace serialization algorithms.",
        },
        {
          id: 5,
          title: "BSS-LOGISTICS LLC",
          date: "Founded in 2011",
          category: "GDP Transport",
          icon: Truck,
          relatedIds: [1, 2],
          status: "completed",
          energy: 98,
          content: "A grade 3PL logistical unit executing thermoregulation services via custom cold-store complexes (45k+ sqm).",
        },
        {
          id: 6,
          title: "BSS-BIOTECH LLC",
          date: "Founded in 2023",
          category: "Biotechnology",
          icon: Dna,
          relatedIds: [1, 3],
          status: "in-progress",
          energy: 76,
          content: "Biopharma R&D entity innovating healing substrates, skin cellular stimulants and Russian assembly of key hardware, standardizing GMP.",
        },
      ];
    }
  };

  const timelineData = getTimelineData();

  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [centerOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  
  // Custom states to facilitate full responsive control structure
  const [radius, setRadius] = useState<number>(200);

  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  // Responsive setup for dynamic radius change as per strict design framework
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 480) {
        setRadius(100);
      } else if (window.innerWidth < 640) {
        setRadius(120);
      } else if (window.innerWidth < 768) {
        setRadius(160);
      } else {
        setRadius(200);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        if (parseInt(key) !== id) {
          newState[parseInt(key)] = false;
        }
      });

      newState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);

        const relatedItems = getRelatedItems(id);
        const newPulseEffect: Record<number, boolean> = {};
        relatedItems.forEach((relId) => {
          newPulseEffect[relId] = true;
        });
        setPulseEffect(newPulseEffect);

        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }

      return newState;
    });
  };

  useEffect(() => {
    let rotationTimer: NodeJS.Timeout;

    if (autoRotate) {
      rotationTimer = setInterval(() => {
        setRotationAngle((prev) => {
          const newAngle = (prev + 0.25) % 360;
          return Number(newAngle.toFixed(3));
        });
      }, 50);
    }

    return () => {
      if (rotationTimer) {
        clearInterval(rotationTimer);
      }
    };
  }, [autoRotate]);

  const centerViewOnNode = (nodeId: number) => {
    if (!nodeRefs.current[nodeId]) return;

    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;

    // Smoothly rotates node to standard highlight focus position
    setRotationAngle(270 - targetAngle);
  };

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radian = (angle * Math.PI) / 180;

    const x = radius * Math.cos(radian) + centerOffset.x;
    const y = radius * Math.sin(radian) + centerOffset.y;

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(
      0.3,
      Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2))
    );

    return { x, y, angle, zIndex, opacity };
  };

  const getRelatedItems = (itemId: number): number[] => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    const relatedItems = getRelatedItems(activeNodeId);
    return relatedItems.includes(itemId);
  };

  const getStatusStyles = (status: TimelineItem["status"]): string => {
    switch (status) {
      case "completed":
        return "text-white bg-emerald-600 border-none";
      case "in-progress":
        return "text-zinc-950 bg-brand-teal border-none animate-pulse";
      case "pending":
        return "text-zinc-300 bg-zinc-800 border-none";
      default:
        return "text-white bg-zinc-800 border-none";
    }
  };

  return (
    <section className="py-20 bg-zinc-950 text-white relative border-t border-b border-zinc-900 overflow-hidden select-none">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,159,156,0.08)_0%,transparent_70%)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
        {/* Title elements */}
        <div className="text-center mb-10 max-w-2xl">
          <span className="text-[10px] uppercase font-bold text-brand-teal tracking-widest bg-brand-teal/10 px-2.5 py-1 rounded">
            {lang === "RU" ? "Интерактивная Карта Структуры" : "Interactive Corporate Map"}
          </span>
          <h2 className="text-3xl font-extrabold text-white tracking-tight mt-3">
            {lang === "RU" ? "Юридические лица БСС Холдинга" : "Legal Entities of BSS Holding"}
          </h2>
          <p className="text-xs text-zinc-400 mt-2 font-light">
            {lang === "RU"
              ? "Исследуйте ключевые дочерние компании и уставную структуру холдинга в космической интерактивной орбите. Кликните на элементы для подробностей."
              : "Explore our constituent legal entities, subsidiary departments and connected workflows in an interactive cosmic orbit."}
          </p>
        </div>

        {/* Outer dynamic height bounding box tailored for full scroll protection */}
        <div
          ref={containerRef}
          onClick={handleContainerClick}
          className="w-full max-w-4xl h-[520px] sm:h-[600px] flex items-center justify-center glass-panel-dark relative overflow-hidden"
        >
          {/* Orbital grid systems */}
          <div
            ref={orbitRef}
            className="absolute w-full h-full flex items-center justify-center"
            style={{
              perspective: "1000px",
              transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)`,
            }}
          >
            {/* Pulsing Core Sun Symbol representing the central mother-holding entity BSS */}
            <div className="absolute w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-brand-teal/80 via-brand-teal to-[#002B5B] flex items-center justify-center z-10 select-none shadow-xl shadow-brand-teal/20 border border-brand-teal/40">
              <div className="absolute sm:w-20 sm:h-20 w-16 h-16 rounded-full border border-brand-teal/20 animate-ping opacity-60"></div>
              <div
                className="absolute sm:w-24 sm:h-24 w-18 h-18 rounded-full border border-brand-teal/10 animate-ping opacity-30"
                style={{ animationDelay: "0.5s" }}
              ></div>
              <span className="text-[10px] sm:text-xs font-black tracking-widest text-white">БСС</span>
            </div>

            {/* Simulated orbit tracks */}
            <div
              className="absolute rounded-full border border-zinc-800/60 pointer-events-none"
              style={{ width: `${radius * 2}px`, height: `${radius * 2}px` }}
            ></div>

            {timelineData.map((item, index) => {
              const position = calculateNodePosition(index, timelineData.length);
              const isExpanded = expandedItems[item.id];
              const isRelated = isRelatedToActive(item.id);
              const isPulsing = pulseEffect[item.id];
              const Icon = item.icon;

              const nodeStyle = {
                transform: `translate(${position.x}px, ${position.y}px)`,
                zIndex: isExpanded ? 200 : position.zIndex,
                opacity: isExpanded ? 1 : position.opacity,
              };

              return (
                <div
                  key={item.id}
                  ref={(el) => (nodeRefs.current[item.id] = el)}
                  className="absolute transition-all duration-700 cursor-pointer flex flex-col items-center justify-center"
                  style={nodeStyle}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleItem(item.id);
                  }}
                >
                  {/* Energy Wave backdrop */}
                  <div
                    className={`absolute rounded-full pointer-events-none -inset-1 ${
                      isPulsing ? "animate-pulse duration-1000" : ""
                    }`}
                    style={{
                      background: `radial-gradient(circle, rgba(0,159,156,0.15) 0%, rgba(0,159,156,0) 70%)`,
                      width: `${item.energy * 0.4 + 30}px`,
                      height: `${item.energy * 0.4 + 30}px`,
                      transform: 'translate(-50%, -50%)',
                      left: '50%',
                      top: '50%'
                    }}
                  ></div>

                  {/* Node Circle */}
                  <div
                    className={`
                      w-10 h-10 rounded-full flex items-center justify-center
                      ${
                        isExpanded
                          ? "bg-brand-teal text-white"
                          : isRelated
                          ? "bg-brand-teal/20 text-brand-teal"
                          : "bg-zinc-900 text-zinc-300"
                      }
                      border-2 
                      ${
                        isExpanded
                          ? "border-brand-teal shadow-lg shadow-brand-teal/40"
                          : isRelated
                          ? "border-brand-teal animate-pulse"
                          : "border-zinc-700/60"
                      }
                      transition-all duration-300 transform hover:scale-110 active:scale-95
                    `}
                  >
                    <Icon size={16} />
                  </div>

                  {/* Title indicator label under the circle node */}
                  <div
                    className={`
                      absolute top-11 whitespace-nowrap
                      text-[9px] sm:text-[10px] font-bold tracking-wider
                      transition-all duration-300
                      ${isExpanded ? "text-brand-teal scale-110" : "text-zinc-400"}
                    `}
                  >
                    {item.title}
                  </div>

                  {/* Popover Card detailing information of the specific corporate node */}
                  {isExpanded && (
                    <Card className="absolute top-16 w-56 sm:w-64 -translate-x-1/2 left-1/2 overflow-visible">
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-brand-teal/40"></div>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <Badge className={`px-2 text-[9px] font-bold uppercase tracking-wider ${getStatusStyles(item.status)}`}>
                            {lang === "RU"
                              ? (item.status === "completed" ? "АКТИВНО" : "РИТЕЙЛ/В РАЗВИТИИ")
                              : (item.status === "completed" ? "ACTIVE" : "IN PROGRESS")}
                          </Badge>
                          <span className="text-[9px] font-mono text-zinc-500">
                            {item.date}
                          </span>
                        </div>
                        <CardTitle className="text-xs sm:text-sm mt-1">
                          {item.title}
                        </CardTitle>
                      </CardHeader>
                      
                      <CardContent className="text-[10px] sm:text-xs">
                        <p className="leading-relaxed font-light text-zinc-300">{item.content}</p>

                        {/* Energy Level Bar */}
                        <div className="mt-3 pt-2.5 border-t border-zinc-800">
                          <div className="flex justify-between items-center text-[9px] text-zinc-400 mb-1">
                            <span className="flex items-center">
                              <Zap size={9} className="mr-0.5 text-brand-teal" />
                              {lang === "RU" ? "Ресурсная доля" : "Operational Share"}
                            </span>
                            <span className="font-mono text-white">{item.energy}%</span>
                          </div>
                          <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-teal-500 to-indigo-600"
                              style={{ width: `${item.energy}%` }}
                            ></div>
                          </div>
                        </div>

                        {/* Connected subsidiaries mapping */}
                        {item.relatedIds.length > 0 && (
                          <div className="mt-3 pt-2.5 border-t border-zinc-800">
                            <div className="flex items-center mb-1.5">
                              <Link size={10} className="text-zinc-400 mr-1" />
                              <h4 className="text-[9px] uppercase tracking-wider font-semibold text-zinc-400">
                                {lang === "RU" ? "Связанные фирмы" : "Affiliated Firms"}
                              </h4>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {item.relatedIds.map((relatedId) => {
                                const relatedItem = timelineData.find((i) => i.id === relatedId);
                                return (
                                  <Button
                                    key={relatedId}
                                    className="flex items-center h-5 px-1.5 py-0 text-[8px] font-bold rounded bg-zinc-900 border border-zinc-800 hover:bg-brand-teal/10 hover:border-brand-teal/40 hover:text-brand-teal text-zinc-400 transition-colors"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleItem(relatedId);
                                    }}
                                  >
                                    {relatedItem?.title}
                                    <ArrowRight size={6} className="ml-0.5 opacity-60" />
                                  </Button>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )}
                </div>
              );
            })}
          </div>

          {/* Orbit rotation controls at the bottom left-right inside coordinate box */}
          <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center bg-zinc-900/40 p-2 rounded-xl backdrop-blur-md border border-zinc-800/60 pointer-events-auto">
            <span className="text-[8px] font-mono tracking-widest text-zinc-500 uppercase">
              {lang === "RU" ? "СИСТЕМА: СТАБИЛЬНА" : "SYSTEM: STABLE"}
            </span>
            <Button
              className="text-[9px] bg-brand-teal/10 hover:bg-brand-teal/20 text-brand-teal px-2 py-1 rounded border border-brand-teal/20"
              onClick={() => setAutoRotate(!autoRotate)}
            >
              {autoRotate 
                ? (lang === "RU" ? "Остановить вращение" : "Pause Orbit") 
                : (lang === "RU" ? "Запустить вращение" : "Auto Rotate")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
