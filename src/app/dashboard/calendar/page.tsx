"use client"

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { DAY_NAMES, MONTH_NAMES } from "@/lib/constants";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function CalendarPage() {
  const today = new Date()
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [date, setDate] = useState(today)
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;
  return (
    <section className="">
      <header className="border px-8 py-4 flex items-center justify-between mb-4 rounded-xl">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="" />
          <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-8 my-auto" />
          <h2 className="text-lg font-semibold tracking-tight" onClick={() => {
            setYear(today.getFullYear())
            setMonth(today.getMonth())
          }}>Calendar</h2>
          <p className="text-sm text-muted-foreground hover:cursor-pointer hidden lg:flex">
            {MONTH_NAMES[today.getMonth()]} {today.getFullYear()}
          </p>
        </div>
        <Button
          onClick={() => { }}
          className="flex items-center gap-2 text-sm font-semibold transition-colorsrounded-md bg-primary px-4 py-2 text-primary-foreground"
        >
          <span className="text-lg leading-none">+</span> New Event
        </Button>
      </header>
      <div className="flex flex-1 overflow-hidden">
        {/* Calendar grid */}
        <div className="flex flex-1 flex-col overflow-auto border px-8 py-4 rounded-xl">
          {/* Month nav */}
          <div className="flex items-center justify-between mb-4">
            <Button onClick={() => {
              if (month > 0) {
                setMonth(month - 1)
              } else {
                setYear(year - 1)
                setMonth(11)
              }
            }}
              className="w-8 h-8 flex items-center justify-center transition-all"
            >
              <ChevronLeft />
            </Button>
            <h2 className="text-lg font-bold tracking-tight">
              <span className="">{MONTH_NAMES[month]}</span>
              <span className="ml-2">{year}</span>
            </h2>
            <Button onClick={() => {
              if (month < 11) {
                setMonth(month + 1)
              } else {
                setYear(year + 1)
                setMonth(0)
              }
            }}
              className="w-8 h-8 flex items-center justify-center transition-all">
              <ChevronRight />
            </Button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 mb-1">
            {DAY_NAMES.map((d) => (
              <div key={d} className="text-center text-xs font-semibold py-2 uppercase tracking-widest">{d}</div>
            ))}
          </div>

          {/* Day cells */}
          <div className="grid grid-cols-7 gap-1 flex-1">
            {Array.from({ length: totalCells }).map((_, i) => {
              const dayNum = i - firstDay + 1;
              if (dayNum < 1 || dayNum > daysInMonth) {
                return <div key={i} className="border" />;
              }
              const dateStr = `${String(month + 1)}/${String(dayNum)}/${year}`
              const isToday = dateStr === today.toLocaleDateString();
              return (
                <div
                  key={i}
                  className={`p-2 border cursor-pointer transition-all aspect-square lg:min-h-20 group ring-primary ${isToday ? "bg-primary/20 ring-1" : "hover:ring"}`}
                  onClick={() => {
                    const d = new Date(dateStr)
                    console.log(d)
                    setDate(d)
                  }}
                >
                  <div className={`text-xs font-bold w-4 h-4 flex items-center justify-center transition-all ${isToday ? "text-primary-foreground" : "text-muted-foreground"
                    }`}>
                    {dayNum}
                  </div>
                  <div className="space-y-1">
                    { }
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section >
  )
}