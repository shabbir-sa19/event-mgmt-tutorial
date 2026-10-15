"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, } from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { type venueType } from "@/types/types";
import { Card, CardAction, CardContent, CardHeader, } from "@/components/ui/card";
import Image from "next/image";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Loading from "../loading";

import { Types } from "mongoose";
import VenueForm from "@/components/forms/VenueForm";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

const apiUrl = "";

export default function VenuePage() {
  const [openForm, setOpenForm] = useState(false);
  const [venues, setVenues] = useState<venueType[] | null>(null);
  const [selectedVenue, setSelectedVenue] = useState<venueType | null>(null);
  const isMobile = useIsMobile();
  const title = selectedVenue ? "Edit Venue" : "Add Venue";
  const queryClient = useQueryClient();

  const { data, error, isPending, isError } = useQuery({
    queryKey: ["venue"],
    queryFn: async (): Promise<venueType[]> => {
      const response = await axios.get(apiUrl);
      const data = await response.data;
      setVenues((prev) => prev = data.venues);
      return [];
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: Types.ObjectId | string | undefined) => {
      const response = await axios.delete(`${apiUrl}?id=${id}`);
      const data = response.data;
      console.log(response.statusText);
      return;
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["venue"] });
    },
  });

  useEffect(() => {
    try {
      setSelectedVenue(null);
      queryClient.refetchQueries({ queryKey: ["venue"] });
    } catch (error) {
      console.log(error)
    }
  }, []);

  if (isPending) return <Loading />;

  return (
    <section className="w-full space-y-4">
      <div className="mb-8 px-2 flex rounded-xl border items-center justify-between gap-4 p-2">
        <div className="flex gap-2 items-center">
          <SidebarTrigger className="" />
          <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-8 my-auto" />
          <h2 className="font-heading text-2xl">Venues</h2>
          <p className="text-base text-muted-foreground hidden lg:flex">some text</p>
        </div>
        <Button onClick={() => {
          setSelectedVenue(null)
          setOpenForm(true)
        }}>Add Venue</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.map((o, i) => {
          return (
            <Card key={i} className="relative group m-0 p-0 max-w-md scale-100 hover:scale-105 duration-500 fade-in">
              <CardHeader className="absolute z-10 w-full px-0">
                <CardAction>
                  <Button
                    variant="ghost"
                    className="hidden group-hover:flex transition duration-500 fade-in"
                    onClick={() => {
                      deleteMutation.mutate(o?._id);
                    }}
                  >
                    Delete
                  </Button>
                </CardAction>
              </CardHeader>
              <CardContent className="m-0 p-0">
                <Image
                  className="w-full h-auto object-cover scale-105 group-hover:scale-100 duration-500"
                  src={o.imageUrl ?? "/320x200.png"}
                  alt={o.name}
                  width={320}
                  height={200}
                />
                <div className="absolute flex inset-0 bg-background/10 opacity-0 group-hover:opacity-100 transition items-end p-4">
                  <div className="flex w-full text-foreground font-medium text-base justify-start">
                    <p className="">{o.name}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      {isMobile ? (
        <Drawer swipeDirection="down" open={openForm} onOpenChange={setOpenForm}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle className="text-xl font-bold mb-4">{title}</DrawerTitle>
              <DrawerDescription>
                Click save when you&apos;re done.
              </DrawerDescription>
            </DrawerHeader>
            <div className="no-scrollbar overflow-y-auto px-2">
              <VenueForm venue={selectedVenue}
                btnTitle={title}
                onSuccess={() => {
                  setSelectedVenue(null);
                  setOpenForm(false);
                  queryClient.refetchQueries({ queryKey: ["venue"] });
                }}
              />
            </div>
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={openForm} onOpenChange={setOpenForm}>
          <DialogContent className="max-w-xl">
            <DialogHeader>
              <DialogTitle className="font-heading text-2xl">
                {title}
              </DialogTitle>
            </DialogHeader>
            <div className="-mx-4 no-scrollbar max-h-[75vh] overflow-y-auto px-4">
              <VenueForm venue={selectedVenue}
                btnTitle={title}
                onSuccess={() => {
                  setSelectedVenue(null);
                  setOpenForm(false);
                  queryClient.refetchQueries({ queryKey: ["venue"] });
                }}
              />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
}