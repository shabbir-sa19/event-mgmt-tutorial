"use client"
import ExpenseForm from '@/components/forms/ExpenseForm'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from '@/components/ui/drawer'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useIsMobile } from '@/hooks/use-mobile'
import Counter from '@/lib/features/counter/Counter'
import { expenseType } from '@/types/types'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import Loading from '../loading'

const apiUrl = "";

const SamplePayload: expenseType[] = [
  {
    title: "Wedding buffet ingredients",
    amount: 18500,
    category: "food",
    expenseDate: new Date("2026-07-20"),
    vendor: "Metro Cash & Carry",
    paymentMethod: "upi",
    note: "Bulk grocery purchase",
  },
  {
    title: "Tempo for equipment transport",
    amount: 3200,
    category: "transport",
    expenseDate: new Date("2026-07-21"),
    vendor: "Kolkata Local Transport",
    paymentMethod: "cash",
  },
  {
    title: "Banquet hall advance",
    amount: 45000,
    category: "venue",
    expenseDate: new Date("2026-07-22"),
    vendor: "Golden Orchid Banquet",
    paymentMethod: "bank",
  },
  {
    title: "Floral stage decor",
    amount: 12000,
    category: "decor",
    expenseDate: new Date("2026-07-23"),
    vendor: "Bloom Craft Decor",
    paymentMethod: "card",
  },
];

export default function ExpensePage() {
  const [openForm, setOpenForm] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<expenseType | null>(null)
  const [expenses, setExpenses] = useState<expenseType[] | null>(SamplePayload)
  const title = selectedExpense ? "Edit Expense" : "Add Expense"
  const isMobile = useIsMobile()
  const queryClient = useQueryClient()

  const { data, error, isPending } = useQuery({
    queryKey: ["expense"],
    queryFn: async (): Promise<expenseType[]> => {
      return []
    },
  })

  useEffect(() => {
    try {
      setSelectedExpense(null);
      queryClient.refetchQueries({ queryKey: ["expense"] })

    } catch (error) {
      console.log(error)
    }
  }, [])

  if (isPending) return <Loading />;

  return (
    <section className="w-full">
      <header className="flex rounded-xl border items-center justify-between gap-4 mb-8 px-4 py-2">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="" />
          <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-8 my-auto" />
          <h2 className="font-heading text-2xl leading-tight">Expenses</h2>
        </div>
        <Button onClick={() => {
          setSelectedExpense(null)
          setOpenForm(true)
        }}>+ Add Expense</Button>
      </header>
      <div className="space-y-4">
        <Counter />
        <Card className=''>
          <CardContent className='w-full'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Payment Method</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Vendor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {expenses?.map((e, i) => (
                  <TableRow key={i}>
                    <TableCell>{e.title}</TableCell>
                    <TableCell>{e.category}</TableCell>
                    <TableCell>{e.amount}</TableCell>
                    <TableCell>{e.paymentMethod}</TableCell>
                    <TableCell>{e.expenseDate?.toDateString()}</TableCell>
                    <TableCell>{e.vendor}</TableCell>
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
              <DrawerTitle className="text-xl font-bold mb-4">{title}</DrawerTitle>
              <DrawerDescription className=""></DrawerDescription>
            </DrawerHeader>
            <div className="no-scrollbar overflow-y-auto px-4">
              <ExpenseForm expense={selectedExpense}
                btnTitle={title}
                onSuccess={() => {
                  setOpenForm(false)
                  setSelectedExpense(null)
                }} />
            </div>
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={openForm} onOpenChange={setOpenForm}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-xl font-bold mb-4">{title}</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <div className="-mx-4 no-scrollbar max-h-[75vh] overflow-y-auto px-4">
              <ExpenseForm expense={selectedExpense}
                btnTitle={title}
                onSuccess={() => {
                  setOpenForm(false)
                  setSelectedExpense(null)
                }} />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </section>
  )
}