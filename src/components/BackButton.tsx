'use client'
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
const BackButton = () => {
  const router = useRouter();
  return (
    <button className="flex items-center gap-2 font-semibold" onClick={() => router.back()}>
      <ChevronLeft size={20} />
      Back
    </button>
  );
};
export default BackButton;