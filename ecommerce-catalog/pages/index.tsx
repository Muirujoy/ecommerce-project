
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/auth"); // your auth page route
  }, [router]);

  return (
    <div className="flex justify-center items-center h-screen bg-black text-white">
      <p className="text-yellow-500 text-xl">Redirecting to Authentication...</p>
    </div>
  );
}
