import HeroPage from './components/Hero';
import UploadPage from './components/Upload';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';

export default function Home() {
  return (
    <>
      <main className='flex min-h-screen flex-col items-center justify-between'>
        <div className='w-full'>
          <HeroPage />
          <Features />
          <HowItWorks />
          <UploadPage />
          <Testimonials />
        </div>
      </main>
    </>
  );
}
