'use client';
import { useEffect, useState } from 'react';
import { Uploader } from 'uploader';
import { UploadDropzone } from 'react-uploader';
import Image from 'next/image';
import DropdownMenu from './dropdown-menu';
import {
  sentiment,
  caption_length,
  hashtags,
  call_to_action,
  category_or_theme,
  language_preference,
  target_audience,
  tone,
} from '../utils/constants';

// Get production API keys from Upload.io
const uploader = Uploader({
  apiKey: 'free',
});

// Customize the dropzone UI (see "customization"):
const options = {
  multi: false,

  // Comment out this line & use 'onUpdate' instead of
  // 'onComplete' to have the dropzone close after upload.
  showFinishButton: true,

  styles: {
    colors: {
      primary: '#377dff',
    },
  },
};

const UploadPage = () => {
  const [imageFile, setImageFile] = useState(
    'https://static.wikia.nocookie.net/marvelcentral/images/9/97/Tony-Stark.jpg/revision/latest?cb=20130429010603'
  );

  const [sentimentValueSelected, setSentimentValueSelected] = useState([]);
  const [toneValueSelected, setToneValueSelected] = useState([]);
  const [captionValueSelected, setCaptionValueSelected] = useState([]);
  const [hashtagsValueSelected, setHashtagsValueSelected] = useState([]);
  const [callToActionValueSelected, setCallToActionValueSelected] = useState(
    []
  );
  const [categoryOrThemeValueSelected, setCategoryOrThemeValueSelected] =
    useState([]);
  const [languageValueSelected, setLanguageValueSelected] = useState([]);
  const [targetAudianceValueSelected, setTargetAudianceValueSelected] =
    useState([]);

  return (
    <div className='mt-20'>
      {imageFile.length == 0 ? (
        <div className='flex flex-1 w-full flex-col items-center justify-center px-4 mt-15'>
          <UploadDropzone
            uploader={uploader} // Required.
            options={options} // Optional.
            width='600px' // Optional.
            height='375px' // Optional.
            onUpdate={files => {
              // Optional.
              if (files.length === 0) {
                console.log('No files selected.');
              } else {
                console.log('Files uploaded!');
                const imageURL = files.map(f => f.fileUrl);

                setImageFile(imageURL); // Update the state with the array of file URLs
                console.log('this is imageURL: ', imageURL);
              }
            }}
          />
        </div>
      ) : (
        <div className='grid grid-cols-2 gap-2 w-full items-center justify-center px-4 mt-15 mx-auto max-w-4xl'>
          {/* Left Side */}
          <div>
            <h2 className='text-center mb-5'>Caption Crafting Suite</h2>
            <div className='mb-3'>
              <label
                htmlFor='website-admin'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                Sentiment
              </label>
              <div className='flex'>
                <span className='inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-gray-300 rounded dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-6 h-6'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z'
                    />
                  </svg>
                </span>
                <DropdownMenu
                  captionSuiteValue={sentiment}
                  selectedStateValue={setSentimentValueSelected}
                />
              </div>
            </div>
            <div className='mb-3'>
              <label
                htmlFor='website-admin'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                Tone
              </label>
              <div className='flex'>
                <span className='inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-gray-300 rounded dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-6 h-6'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46'
                    />
                  </svg>
                </span>
                <DropdownMenu
                  captionSuiteValue={tone}
                  selectedStateValue={setToneValueSelected}
                />
              </div>
            </div>
            <div className='mb-3'>
              <label
                htmlFor='website-admin'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                Caption Length
              </label>
              <div className='flex'>
                <span className='inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-gray-300 rounded dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-6 h-6'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12'
                    />
                  </svg>
                </span>
                <DropdownMenu
                  captionSuiteValue={caption_length}
                  selectedStateValue={setCaptionValueSelected}
                />
              </div>
            </div>
            <div className='mb-3'>
              <label
                htmlFor='website-admin'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                Hashtags
              </label>
              <div className='flex'>
                <span className='inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-gray-300 rounded dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-6 h-6'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z'
                    />
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M6 6h.008v.008H6V6z'
                    />
                  </svg>
                </span>
                <DropdownMenu
                  captionSuiteValue={hashtags}
                  selectedStateValue={setHashtagsValueSelected}
                />
              </div>
            </div>
            <div className='mb-3'>
              <label
                htmlFor='website-admin'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                Call to Action (CTA)
              </label>
              <div className='flex'>
                <span className='inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-gray-300 rounded dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-6 h-6'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z'
                    />
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z'
                    />
                  </svg>
                </span>
                <DropdownMenu
                  captionSuiteValue={call_to_action}
                  selectedStateValue={setCallToActionValueSelected}
                />
              </div>
            </div>
            <div className='mb-3'>
              <label
                htmlFor='website-admin'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                Category or Theme
              </label>
              <div className='flex'>
                <span className='inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-gray-300 rounded dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-6 h-6'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122'
                    />
                  </svg>
                </span>
                <DropdownMenu
                  captionSuiteValue={category_or_theme}
                  selectedStateValue={setCategoryOrThemeValueSelected}
                />
              </div>
            </div>
            <div className='mb-3'>
              <label
                htmlFor='website-admin'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                Language Preference
              </label>
              <div className='flex'>
                <span className='inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-gray-300 rounded dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-6 h-6'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802'
                    />
                  </svg>
                </span>
                <DropdownMenu
                  captionSuiteValue={language_preference}
                  selectedStateValue={setLanguageValueSelected}
                />
              </div>
            </div>
            <div className='mb-3'>
              <label
                htmlFor='website-admin'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                Target Audience
              </label>
              <div className='flex'>
                <span className='inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-gray-300 rounded dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-6 h-6'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z'
                    />
                  </svg>
                </span>
                <DropdownMenu
                  captionSuiteValue={target_audience}
                  selectedStateValue={setTargetAudianceValueSelected}
                />
              </div>
            </div>
            <div className='mt-2 mr-20 justify-end flex'>
              <button
                type='button'
                className='text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center  mb-2'
              >
                Generate Caption!
              </button>
            </div>
          </div>

          {/* Right Side */}
          <div className='ml-10'>
            <div className='grid grid-cols-3 gap-16'>
              <div className='w-96 border border-gray-300 bg-white'>
                <header className='grid grid-cols-6 items-center border-b border-b-gray-300 p-3'>
                  <div>
                    <img
                      src='https://picsum.photos/50/50'
                      className='h-10 w-10 rounded-full'
                    />
                  </div>

                  <div className='col-span-4 text-sm font-semibold'>
                    pianizz
                  </div>

                  <div className=''>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-6 w-6'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z'
                      />
                    </svg>
                  </div>
                </header>

                <Image
                  className='mx-auto mb-3 shadow-lg'
                  //   src={imageFile[0] ?? ''}
                  src={imageFile ?? ''}
                  alt={'lol'}
                  width={500}
                  height={500}
                />

                <div className='flex flex-col gap-3 p-4'>
                  <div className='flex flex-row gap-3'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-6 w-6'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
                      />
                    </svg>

                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-6 w-6'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z'
                      />
                    </svg>

                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-6 w-6'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M12 19l9 2-9-18-9 18 9-2zm0 0v-8'
                      />
                    </svg>

                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-6 w-6'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z'
                      />
                    </svg>
                  </div>

                  <div className='text-sm font-semibold'>11,552 Likes</div>

                  <div className='text-sm'>
                    <span className='font-semibold'>gnfi</span> Saat ini
                    Indonesia memiliki 34 provinsi, jumlah tersebut diproyeksi
                    bertambah seiring dengan adanya usulan 30 Daerah Otonomi
                    Baru (DOB) khusus untuk provinsi, dan 9 diantaranya berada
                    di Pulau Jawa.
                  </div>

                  <div className='text-sm text-gray-500'>
                    View all 877 comments
                  </div>

                  <div className='text-xs text-gray-400'>2 HOURS AGO</div>
                </div>

                <footer></footer>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadPage;
