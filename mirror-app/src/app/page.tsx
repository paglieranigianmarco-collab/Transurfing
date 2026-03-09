import InteractiveMirror from '@/components/InteractiveMirror';
import Splash from '@/components/Splash';

export default function Home() {
  return (
    <main className="relative w-full h-screen overflow-hidden bg-black text-white">
      <InteractiveMirror />
      <Splash />
    </main>
  );
}
