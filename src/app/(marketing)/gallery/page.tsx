"use client";

import Gallery from "@/components/Gallery";
import { Search } from "lucide-react"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

export default function GalleryPage() {
  const [query, setQuery] = useState("")
  const { data, isLoading } = useQuery({
    queryKey: ["search"],
    queryFn: () => {
      // Todo: fetch Images from backend api
      return [query]
    },
  })
  return (isLoading ? <>Loading...</> :
    <section className="w-full">
      <div className="flex flex-col gap-4 justify-center items-center">
        <div className="w-full flex flex-col max-w-2xl items-center">
          <h2 className="text-2xl mt-2 text-center font-bold leading-loose lg:text-3xl">Gallery</h2>
          {/* Search bar */}
          <InputGroup className="w-full max-w-md">
            <InputGroupInput placeholder="Search..."
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  console.log(query)
                }
              }}
              className="w-full"
            />
            <InputGroupAddon align="inline-start">
              <Search />
            </InputGroupAddon>
            <InputGroupAddon align="inline-end">{ }</InputGroupAddon>
          </InputGroup>
        </div>
        <div className="p-8 w-full flex mx-auto justify-center">
          <Gallery imgs={data ?? []} />
        </div>
      </div>
    </section>
  );
}
