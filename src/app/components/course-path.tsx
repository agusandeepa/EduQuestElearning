import { motion } from "motion/react";
import { Lock, Crown, Flame, CheckCircle2 } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";

interface CourseUnit {
  id: string;
  title: string;
  lessons: number;
  completed: number;
  locked: boolean;
  image: string;
  color: string;
}

const courseUnits: CourseUnit[] = [
  {
    id: "1",
    title: "Ancient Egypt",
    lessons: 15,
    completed: 15,
    locked: false,
    image: "https://images.unsplash.com/photo-1647855607036-3382193c4f02?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwaGlzdG9yeSUyMHB5cmFtaWQlMjBlZ3lwdHxlbnwxfHx8fDE3NzE2NjM4NTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    color: "from-yellow-400 to-orange-500",
  },
  {
    id: "2",
    title: "Ancient Greece",
    lessons: 20,
    completed: 12,
    locked: false,
    image: "https://images.unsplash.com/photo-1761701466204-e826c4a769d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwZ3JlZWslMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzcxNjYzODU0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    color: "from-blue-400 to-cyan-500",
  },
  {
    id: "3",
    title: "Roman Empire",
    lessons: 25,
    completed: 5,
    locked: false,
    image: "https://images.unsplash.com/photo-1637921021834-d9aa16066b69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb21hbiUyMGNvbG9zc2V1bSUyMGhpc3Rvcnl8ZW58MXx8fHwxNzcxNjYzODUzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    color: "from-red-400 to-pink-500",
  },
  {
    id: "4",
    title: "Medieval Europe",
    lessons: 18,
    completed: 0,
    locked: false,
    image: "https://images.unsplash.com/photo-1636668151697-6a1d7c988a71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpZXZhbCUyMGNhc3RsZSUyMGhpc3Rvcnl8ZW58MXx8fHwxNzcxNjYzODUzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    color: "from-purple-400 to-indigo-500",
  },
  {
    id: "5",
    title: "Renaissance",
    lessons: 22,
    completed: 0,
    locked: true,
    image: "https://images.unsplash.com/photo-1694727504199-44bebbe72ad2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZW5haXNzYW5jZSUyMGFydCUyMHBhaW50aW5nfGVufDF8fHx8MTc3MTU5ODg3MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    color: "from-green-400 to-emerald-500",
  },
  {
    id: "6",
    title: "Modern History",
    lessons: 30,
    completed: 0,
    locked: true,
    image: "https://images.unsplash.com/photo-1636406770396-6cc2efd9d487?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3JsZCUyMHdhciUyMGhpc3RvcmljYWwlMjBtb251bWVudHxlbnwxfHx8fDE3NzE2NjM4NTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    color: "from-slate-400 to-gray-600",
  },
];

interface CoursePathProps {
  onUnitClick: (unitId: string) => void;
}

export function CoursePath({ onUnitClick }: CoursePathProps) {
  return (
    <section className="py-16 bg-gray-50" id="courses">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Your Learning Path
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Progress through history from ancient times to the modern era. Complete units to unlock new eras!
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Learning Path */}
          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-300 -translate-x-1/2 hidden md:block" />

            {courseUnits.map((unit, index) => (
              <motion.div
                key={unit.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative mb-8 md:mb-12 ${
                  index % 2 === 0 ? "md:pr-1/2" : "md:pl-1/2 md:ml-auto"
                } md:w-1/2`}
              >
                {/* Timeline Dot */}
                <div className="hidden md:block absolute top-8 w-8 h-8 bg-white border-4 border-green-500 rounded-full z-10"
                     style={{
                       [index % 2 === 0 ? "right" : "left"]: "-1rem",
                     }}
                >
                  {unit.completed === unit.lessons && (
                    <CheckCircle2 className="w-full h-full text-green-500 -m-1" />
                  )}
                </div>

                <div
                  className={`bg-white rounded-3xl shadow-lg overflow-hidden border-2 transition-all hover:shadow-xl ${
                    unit.locked ? "border-gray-300 opacity-75" : "border-transparent"
                  } ${index % 2 === 0 ? "md:mr-12" : "md:ml-12"}`}
                >
                  <div className="relative h-48 overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${unit.color} opacity-90`} />
                    <ImageWithFallback
                      src={unit.image}
                      alt={unit.title}
                      className="w-full h-full object-cover mix-blend-overlay"
                    />
                    {unit.locked && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <div className="text-center text-white">
                          <Lock className="w-12 h-12 mx-auto mb-2" />
                          <p className="font-bold">Locked</p>
                        </div>
                      </div>
                    )}
                    {unit.completed === unit.lessons && !unit.locked && (
                      <div className="absolute top-4 right-4 bg-yellow-400 rounded-full p-2">
                        <Crown className="w-6 h-6 text-yellow-900" />
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {unit.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {unit.lessons} lessons • {unit.completed}/{unit.lessons} completed
                    </p>

                    {!unit.locked && (
                      <>
                        <Progress
                          value={(unit.completed / unit.lessons) * 100}
                          className="mb-4 h-2"
                        />
                        <Button
                          className={`w-full rounded-xl ${
                            unit.completed === unit.lessons
                              ? "bg-yellow-500 hover:bg-yellow-600"
                              : "bg-green-600 hover:bg-green-700"
                          } text-white`}
                          disabled={unit.locked}
                          onClick={() => onUnitClick(unit.id)}
                        >
                          {unit.completed === unit.lessons ? (
                            <>
                              <Crown className="w-4 h-4 mr-2" />
                              Review Unit
                            </>
                          ) : unit.completed > 0 ? (
                            <>
                              <Flame className="w-4 h-4 mr-2" />
                              Continue Learning
                            </>
                          ) : (
                            "Start Unit"
                          )}
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}