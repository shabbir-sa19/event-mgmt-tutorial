"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import type { clientType } from "@/types/types";
import { Pencil, Trash2 } from "lucide-react";
import Loading from "../loading";
import ClientForm from "@/components/forms/ClientForm";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

const apiUrl = ""

const sampleClients: clientType[] = [
  {
    name: "Client 01",
    email: "client01@email.com",
    address: "delhi"
  },
  {
    name: "Client 02",
    email: "client02@email.com",
    address: "mumbai"
  }
]

export default function page() {
  const [openForm, setOpenForm] = useState(false);
  const [clients, setClients] = useState<clientType[]>(sampleClients);
  const [selectedClient, setSelectedClient] = useState<clientType | null>(null);
  const isMobile = useIsMobile();
  const title = selectedClient ? "Edit Client" : "Add Client";
  const queryClient = useQueryClient()

  const { data, error, isPending } = useQuery({
    queryKey: ["client"],
    queryFn: async (): Promise<clientType[]> => {
      return []
    },
  })
  const deleteClientMutataion = useMutation({
    mutationFn: async (id: any) => {
      console.log(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["client"] })
    }
  })
  const updateClientMutation = useMutation({
    mutationFn: async ({ id, body }: { id: string, body: any }) => {
      console.log(body)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["client"] })
    }
  })

  useEffect(() => {
    try {
      setSelectedClient(null);
      queryClient.refetchQueries({ queryKey: ["client"] })
    } catch (error) {
      console.log(error)
    }
  }, [])

  return (
    <section className="w-full">
      <div className="mb-8 px-2 flex rounded-xl border items-center justify-between gap-4 p-2">
        <div className="flex gap-2 items-center">
          <SidebarTrigger className="" />
          <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-8 my-auto" />
          <h2 className="text-lg font-semibold leading-tight">Clients</h2>
          <p className="text-sm text-muted-foreground hidden lg:flex">
            Track client contacts and linked event accounts.
          </p>
        </div>
        <Button
          className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground"
          onClick={() => {
            setSelectedClient(null)
            setOpenForm(true)
          }}
        >
          + Add client
        </Button>
      </div>
      <div className="">
        <Card className="w-full">
          <CardContent className="overflow-x-auto">
            <Table className="w-full">
              <TableHeader className="border-b font-heading text-base text-center">
                <TableRow className="w-full text-center">
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isPending ? (
                  <TableRow className="border-b">
                    <TableCell colSpan={5} className="text-center">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : (data?.length === 0 ? (
                  <TableRow className="border-b">
                    <TableCell colSpan={5} className="text-center">
                      No data found
                    </TableCell>
                  </TableRow>
                ) : data?.map((client, idx) => (
                  <TableRow key={idx} className="border-b">
                    <TableCell className="font-medium">
                      {client.name}
                    </TableCell>
                    <TableCell className="font-medium">
                      {client.email}
                    </TableCell>
                    <TableCell className="font-medium">
                      {client.phone}
                    </TableCell>
                    <TableCell className="font-medium">
                      {client.address}
                    </TableCell>
                    <TableCell className="flex gap-2 justify-center">
                      <Button
                        variant={"outline"}
                        onClick={(e) => {
                          e.preventDefault();
                          updateClientMutation.mutate({ id: client._id, body: client })
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={"destructive"}
                        onClick={() => {
                          deleteClientMutataion.mutate(client._id)
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                )))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      {isMobile ? (
        <Drawer swipeDirection="down" open={openForm} onOpenChange={setOpenForm}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle className="font-bold leading-tight text-xl mb-4">{title}</DrawerTitle>
              <DrawerDescription>Click save when you&apos;re done.</DrawerDescription>
            </DrawerHeader>
            <div className="no-scrollbar overflow-y-auto px-4">
              <ClientForm
                client={selectedClient}
                btnTitle={title}
                onSuccess={() => {
                  setOpenForm(false)
                  setSelectedClient(null)
                  queryClient.invalidateQueries({ queryKey: ["client"] })
                }}
              />
            </div>
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={openForm} onOpenChange={setOpenForm}>
          <DialogContent className="max-w-xl">
            <DialogHeader>
              <DialogTitle className="font-bold leading-tight text-xl mb-4">{title}</DialogTitle>
              <DialogDescription>Click save when you&apos;re done.</DialogDescription>
            </DialogHeader>
            <div className="no-scrollbar overflow-y-auto px-4">
              <ClientForm client={selectedClient}
                btnTitle={title}
                onSuccess={() => {
                  setOpenForm(false)
                  setSelectedClient(null)
                  queryClient.invalidateQueries({ queryKey: ["client"] })
                }}
              />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </section>
  )
}