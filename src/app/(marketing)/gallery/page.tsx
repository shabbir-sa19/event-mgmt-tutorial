"use client";

import Gallery from "@/components/Gallery";
import { Search } from "lucide-react"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { increment } from "@/lib/features/counter/counter";
import { addImage } from "@/lib/features/Images/images";
import Masonry from "react-masonry-css";
import Image from "next/image";

const samplePayload = [
  "1920x1081-px-1967-mustang-fastback-car-drive-neon-retrowave-synthwave-vehicle-art-skyline-hd-art-wallpaper-105c0a064a0622456552ef3335f6197c.jpg",
  "320x200.png",
  "4131870.jpg",
  "5ecea6c03f5cbb358d27d3e1_maxime-caron-9_hRmtjD8O4-unsplash.jpg",
  "cyberpunk-2077-girl-car-mantis-blade-uhdpaper.com-4K-8.676.jpg",
  "cyberpunk-2077-girl-glasses-uhdpaper.com-4K-3.1971.jpg",
  "cyberpunk-night-city-4k-wallpaper-uhdpaper.com-82@0@h.jpg",
  "digital-art-photoshop-concept-art-futuristic-wallpaper-a444d21f487cf81ee9ce690a63e234d3.jpg",
  "digital-digital-art-artwork-night-city-hd-wallpaper-db165cade371bf79d5f46b69adec8c20.jpg",
  "dj-cyber-neon-boy-4k-6m.jpg",
  "eddie-mendoza-street-justice-1.jpg",
  "OIP(3).jpg",
  "sci-fi-assassin-gas-mask-ai-art-4k-wallpaper-uhdpaper.com-20@0@i.jpg",
];
const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1
};
type GalleryProps = {
  imgs: string[];
};
export default function GalleryPage() {
  const count = useAppSelector(state => state.counter.value)
  const dispatch = useAppDispatch()
  const [query, setQuery] = useState("")

  const { data, isLoading } = useQuery({
    queryKey: ["search"],
    queryFn: () => {
      // Todo: fetch Images from backend api
      return [query]
    },
  })

  const handler = () => {
    if (count < samplePayload.length) {
      dispatch(increment())
    }
  }

  useEffect(() => {
    if (count != 0) {
      console.log(count)
      dispatch(addImage(samplePayload[count]))
    }
  }, [count])


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
          <div className="">
            <Button className={"hover:cursor-pointer"} onClick={handler}>Add {count}</Button>
          </div>
        </div>
        <div className="p-8 w-full flex mx-auto justify-center">
          <Gallery />
        </div>
      </div>
    </section >
  );
}
