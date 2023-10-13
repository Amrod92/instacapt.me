import HeroPage from './components/Hero';
import UploadPage from './components/Upload';
export default function Home() {
  return (
    <>
      <main className='flex min-h-screen items-center justify-between p-24'>
        <div className='w-full items-center justify-center m-10'>
          <HeroPage />
          <UploadPage />
        </div>
      </main>
    </>
  );
}
