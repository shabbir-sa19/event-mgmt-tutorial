"use client"

import { Button } from "@/components/ui/button"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { decrement, increment } from "./counter"

const Counter = () => {
  const count = useAppSelector(state => state.counter.value)
  const dispatch = useAppDispatch()
  return (
    <div className="flex gap-2">
      <Button onClick={() => { dispatch(increment()) }}>Increment</Button>
      <span className="w-md">{count}</span>
      <Button onClick={() => { dispatch(decrement()) }}>Decrement</Button>
    </div>
  )
}

export default Counter
