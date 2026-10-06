import ThemeButton from "@/components/ThemeButton";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans">
      <Link href={"/gallery"}>Gallery</Link>
      <Link href={"/appoinment"}>Appoinment</Link>
    </div>
  );
}
