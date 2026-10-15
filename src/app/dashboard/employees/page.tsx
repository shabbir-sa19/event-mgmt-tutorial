"use client"

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from '@/components/ui/drawer'
import { useIsMobile } from '@/hooks/use-mobile'
import { EmployeeType } from '@/types/types'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Loading from '../loading'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import EmployeeForm from '@/components/forms/EmployeeForm'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Card, CardContent } from '@/components/ui/card'

const apiUrl = "";

const sampleEmployees: EmployeeType[] = [
  {
    name: "emp 01",
    role: "chef",
    availabilityStatus: "available",
    phone: "",
    userID: "01",
    salaryType: "contract",
    salaryAmount: 100,
    isActive: true,

  },
  {
    name: "emp 02",
    role: "server",
    availabilityStatus: "available",
    phone: "",
    userID: "02",
    salaryType: "contract",
    salaryAmount: 100,
    isActive: true,

  }
]

export default function EmployeePage() {
  const [openForm, setOpenForm] = useState(false);
  const [Employees, setEmployees] = useState<EmployeeType[] | null>(sampleEmployees)
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeType | null>(null)
  const title = selectedEmployee ? "Edit Employee" : "Add Employee"
  const isMobile = useIsMobile()
  const queryClient = useQueryClient()

  const { data, error, isPending } = useQuery({
    queryKey: ["employee"],
    queryFn: async (): Promise<EmployeeType[]> => {
      return []
    },
  })

  useEffect(() => {
    try {
      setSelectedEmployee(null);
      queryClient.refetchQueries({ queryKey: ["employee"] })
    } catch (error) {
      console.log(error)
    }
  }, [])

  if (isPending) return <Loading />;

  return (
    <section className="w-full">
      <header className="flex rounded-xl border items-center justify-between gap-4 p-2 mb-8 px-2">
        <div className="flex gap-2 items-center">
          <SidebarTrigger className="" />
          <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-8 my-auto" />
          <h2 className="font-heading text-lg font-semibold leading-tight">Employees</h2>
        </div>
        <Button onClick={() => {
          setSelectedEmployee(null)
          setOpenForm(true)
        }}>
          + Add Employee
        </Button>
      </header>
      <Card className="">
        <CardContent className=''>
          <Table className='w-full'>
            <TableHeader className='table-header-group'>
              <TableRow className='text-start'>
                <TableHead>UserID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>SalaryType</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Availability</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Employees?.map((e, i) => {
                return (
                  <TableRow className="" key={i}>
                    <TableCell className="">{e.userID}</TableCell>
                    <TableCell className="">{e.name}</TableCell>
                    <TableCell className="">{e.role}</TableCell>
                    <TableCell className="">{e.salaryType}</TableCell>
                    <TableCell className="">{e.phone || "-"}</TableCell>
                    <TableCell className="">{e.availabilityStatus}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      {isMobile ? (
        <Drawer swipeDirection="down" open={openForm} onOpenChange={setOpenForm}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle className="">{title}</DrawerTitle>
              <DrawerDescription>This action cannot be undone.</DrawerDescription>
            </DrawerHeader>
            <div className="no-scrollbar overflow-y-auto px-2">
              <EmployeeForm employee={selectedEmployee}
                btnTitle={title}
                onSuccess={() => {
                  setOpenForm(false)
                  setSelectedEmployee(null)
                  queryClient.invalidateQueries({ queryKey: ["employee"] })
                }} />
            </div>
            <DrawerFooter>
              <Button>Submit</Button>
              <DrawerClose render={<Button variant={"outline"} />}>Cancel</DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={openForm} onOpenChange={setOpenForm}>
          <DialogContent className="max-w-xl">
            <DialogHeader>
              <DialogTitle className="">{title}</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <div className="no-scrollbar overflow-y-auto px-2">
              <EmployeeForm employee={selectedEmployee}
                btnTitle={title}
                onSuccess={() => {
                  setSelectedEmployee(null)
                  setOpenForm(false);
                  queryClient.invalidateQueries({ queryKey: ["employee"] })
                }} />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </section >
  )
}