import HeroPage from './components/Hero';
import UploadPage from './components/Upload';
export default function Home() {
  return (
    <>
      <main className='flex min-h-screen items-center justify-between inert'>
        <div className='w-full items-center justify-center'>
          <HeroPage />
          <UploadPage />
        </div>
      </main>
    </>
  );
}
