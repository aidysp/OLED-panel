import { useEffect, useState } from "react";
import { ClassRoom } from "../components/ClassRoom/ClassRoom";

// Интерфейс для занятия из API
interface Lesson {
  time: string;
  title: string;
  audience: string | null;
  professor: string | null;
  type: string | null;
  status: "busy" | "free";
}

// Интерфейс для дня из API
interface ScheduleDay {
  date: string;
  lessons: Lesson[];
}

function App() {
  const [scheduleDays, setScheduleDays] = useState<ScheduleDay[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('http://127.0.0.1:8000/schedule');

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Отладка - посмотрим что приходит
        console.log("Данные с API:", data);

        // Ваш API возвращает массив дней с занятиями
        if (Array.isArray(data)) {
          setScheduleDays(data);
        } else {
          setScheduleDays([]);
        }

      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
        console.error('Error fetching schedule:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, []);

  // Получаем сегодняшние занятия
  const getTodayLessons = (): Lesson[] => {
    if (scheduleDays.length === 0) return [];

    const today = new Date().toISOString().split('T')[0]; // Формат YYYY-MM-DD
    const todaySchedule = scheduleDays.find(day => day.date === today);

    return todaySchedule ? todaySchedule.lessons : [];
  };

  // Фильтруем занятия на определенное время (10:35 – 12:10)
  const getCurrentTimeLessons = (): Lesson[] => {
    const todayLessons = getTodayLessons();

    // Фильтруем занятия по времени (например, которые происходят сейчас или ближайшие)
    // Для простоты возьмем первые несколько занятий
    return todayLessons.slice(0, 10); // Увеличиваем количество для скролла
  };

  const currentLessons = getCurrentTimeLessons();

  return (
    <div className="flex flex-col gap-4 min-h-screen justify-center font-inter px-4 bg-back overflow-hidden">
      {/* Верхняя панель с датой и погодой */}
      <div className="flex justify-between items-start gap-3">
        <div className="text-white text-2xl font-medium leading-tight">
          Понедельник, 2 марта | 10:26
        </div>
        <div className="text-white text-2xl flex items-center">
          <img src="./sun.svg" alt="sun" className="w-6 h-6 mr-2" />
          -1
        </div>
      </div>

      {/* Основной контент */}
      <div className="grid grid-cols-[75%_23%] gap-4 h-[80vh] overflow-y-auto">
        {/* Видео блок */}
        <div className="border rounded-xl border-white/5 overflow-hidden aspect-video">
          <img className="w-full h-full object-cover" src="./video.svg" alt="video" />
        </div>

        {/* Боковая панель с расписанием */}
        <div className="text-white rounded-6xl bg-white/5 p-4 flex flex-col">
          {/* Заголовок времени */}
          <div className="text-xl font-medium pb-4">
            10:35 – 12:10
          </div>

          {/* Блок с скроллом для расписаний */}
          <div className="flex-1 overflow-y-auto pr-2 space-y-3">
            {loading ? (
              <div className="text-white flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mr-3"></div>
                Загрузка расписания...
              </div>
            ) : error ? (
              <div className="text-red-400 flex flex-col items-center justify-center h-full">
                <div>Ошибка: {error}</div>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-4 px-4 py-2 bg-blue-500 rounded text-sm"
                >
                  Повторить
                </button>
              </div>
            ) : currentLessons.length === 0 ? (
              // Fallback если данных нет
              <div className="space-y-3">
                <ClassRoom number="112" pair="Математический анализ" group="932420" />
                <ClassRoom number="103 (a)" pair="Объектно-ориентированное программирование" group="932420" />
                <ClassRoom number="103 (б)" pair="Технологическая практика" group="932420" />
                <ClassRoom number="110" status={true} />
                <ClassRoom number="115" pair="Базы данных" group="932420" />
                <ClassRoom number="120" pair="Физика" group="932420" />
                <ClassRoom number="125" status={true} />
                <ClassRoom number="130" pair="Английский язык" group="932420" />
              </div>
            ) : (
              currentLessons.map((lesson, index) => {
                console.log("Занятие:", lesson);

                // Если аудитория свободна (status === "free")
                if (lesson.status === "free") {
                  return (
                    <ClassRoom
                      key={index}
                      number={lesson.audience}
                      status={true}
                    />
                  );
                }

                // Если есть занятие
                return (
                  <ClassRoom
                    key={index}
                    number={lesson.audience}
                    pair={lesson.title}
                    group="932420"
                    status={false}

                  />
                );
              })
            )}
          </div>

          {/* Отладочная информация */}
          {!loading && !error && (
            <div className="mt-4 text-xs text-gray-400 pt-4 border-t border-white/10">
              Загружено дней: {scheduleDays.length}, Занятий сегодня: {getTodayLessons().length}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;