"use client"

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from '@/components/ui/drawer'
import { useIsMobile } from '@/hooks/use-mobile'
import { eventType } from '@/types/types'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Loading from '../loading'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import EventForm from '@/components/forms/EventForm'
import { Card, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { EVENT_CATEGORIES } from '@/lib/constants'

const apiUrl = "";
type Props = {}

const SamplePayload: eventType[] = [
  {
    title: "Wedding",
    category: "",
    status: "lead",
    serviceType: "catering",
    eventDate: new Date("2026-07-20"),
  },
  {
    title: "Birthday",
    category: "",
    status: "lead",
    serviceType: "catering",
    eventDate: new Date("2026-07-21"),
  },
  {
    title: "Banquet",
    category: "",
    status: "lead",
    serviceType: "catering",
    eventDate: new Date("2026-07-22"),
  },
  {
    title: "Floral stage decor",
    category: "",
    status: "lead",
    serviceType: "catering",
    eventDate: new Date("2026-07-23"),
  },
];

export default function EventPage({ }: Props) {
  const [openForm, setOpenForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<eventType | null>(null)
  const [events, setEvents] = useState<eventType[] | null>(SamplePayload)
  const title = selectedEvent ? "Edit Event" : "Add Event"
  const isMobile = useIsMobile()
  const queryClient = useQueryClient()
  let ev: typeof EVENT_CATEGORIES;

  const { data, error, isPending } = useQuery({
    queryKey: ["event"],
    queryFn: async (): Promise<eventType[]> => {
      return []
    },
  })

  useEffect(() => {
    try {
      setSelectedEvent(null);
      queryClient.refetchQueries({ queryKey: ["event"] })
    } catch (error) {
      console.log(error)
    }
  }, [])

  isPending ?? <Loading />
  return (
    <section className="w-full space-y-4">
      <header className="mb-8 flex rounded-xl border items-center justify-between gap-4 p-2">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="" />
          <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-8 my-auto" />
          <h2 className="font-heading text-2xl leading-tight">Events</h2>
        </div>
        <Button onClick={() => {
          setSelectedEvent(null)
          setOpenForm(true)
        }}>+ Add Event</Button>
      </header>
      <div className="">
        <Card className=''>
          <CardContent className='w-full'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Service Type</TableHead>
                  <TableHead>Guest</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {events?.map((e, i) => (
                  <TableRow key={i}>
                    <TableCell>{e.title}</TableCell>
                    <TableCell>{e.category}</TableCell>
                    <TableCell>{e.serviceType}</TableCell>
                    <TableCell>{e.guestCount}</TableCell>
                    <TableCell>{e.eventDate?.toDateString()}</TableCell>
                    <TableCell>{e.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      {isMobile ? (
        <Drawer swipeDirection="down" open={openForm} onOpenChange={setOpenForm}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>{title}</DrawerTitle>
              <DrawerDescription></DrawerDescription>
            </DrawerHeader>
            <div className="no-scrollbar overflow-y-auto px-4">
              <EventForm event={selectedEvent}
                btnTitle={title}
                onSuccess={() => {
                  setOpenForm(false)
                  setSelectedEvent(null)
                }} />
            </div>
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={openForm} onOpenChange={setOpenForm}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <div className="-mx-4 no-scrollbar max-h-[75vh] overflow-y-auto px-4">
              <EventForm event={selectedEvent}
                btnTitle={title}
                onSuccess={() => {
                  setOpenForm(false)
                  setSelectedEvent(null)
                }} />
            </div>
            <DialogFooter>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </section>
  )
}