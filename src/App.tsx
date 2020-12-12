import React, { useEffect, useState } from 'react';
import {
  getDay,
  getYear,
  getDaysInMonth,
  format,
  differenceInCalendarDays,
  differenceInCalendarMonths, getMonth
} from 'date-fns'
import './App.css';
import {ptBR} from "date-fns/locale";
import BottomLine from "./components/BottomLine";

interface CalendarData {
  index: number;
  name: string;
  current: boolean;
  days: {
    day: number;
    dayName: string;
    dayNameExt: string;
    currentDay: boolean;
  }[];
}

function App() {
  // getDaysInMonth(new Date()) entrega a quantidade de dias no mes
  // getWeeksInMonth(new Date()) entrega o numero de semanas no mes
  // getDay(new Date()) entrega qual dia da semana estamos -- [0 = Domingo]
  // getDate(new Date()) entrega o numero dia atual

  const [calendar, setCalendar] = useState<CalendarData[]>()
  const [currentMonth, setCurrentMonth] = useState<number>(getMonth(new Date()))

  useEffect(() => {
    const calendar: CalendarData[] = []

    const currentYear = getYear(new Date())

    const toCapitalize = (text: string): string => {
      return text.charAt(0).toUpperCase()+text.substring(1)
    }

    for (let month = 0; month < 12; month++) {
      const currentMonth = new Date(currentYear, month)
      const amountDayInMonth = getDaysInMonth(currentMonth)
      const monthName = format(currentMonth, 'MMMM',{ locale: ptBR })

      calendar.push({
        index: month+1,
        name: toCapitalize(monthName),
        current: differenceInCalendarMonths(new Date(), currentMonth) === 0,
        days: []
      })

      for (let day = 1; day <= amountDayInMonth; day++) {
        const currentDate = new Date(currentYear, month, day)
        const nameDate = format(currentDate, 'EEEE', { locale: ptBR })
        const nameDateUp = toCapitalize(nameDate)
        calendar[month].days.push({
          day,
          dayNameExt: nameDateUp,
          dayName: nameDateUp.substring(0,3),
          currentDay: differenceInCalendarDays(new Date(), currentDate) === 0
        })
      }
    }

    console.log(calendar)
    setCalendar(calendar)
  }, [])

  return (
    <div className="main">
      <div className={'rd-content-main'}>
        <div className={'rd-header'}>
          <p>Horario</p>
          <BottomLine width={98} />
        </div>
        <div className={'rd-month-content'}>
          {calendar ? (
            <>
              <div className={'rd-month-title'}>
                <i>anterior</i>
                <p>{calendar[currentMonth].name}</p>
                <i>proximo</i>
              </div>
              <div className={'rd-day-content'}>
                <div>
                  {calendar[currentMonth].days.map(day => {
                    return (
                      <div>
                        <p>{day.day}</p>
                        <p>{day.dayNameExt}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
            </>
          ) : (
            <div>Carregando</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
