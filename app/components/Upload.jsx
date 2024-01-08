'use client';
import { useEffect, useState } from 'react';
import { Uploader } from 'uploader';
import { UploadDropzone } from 'react-uploader';
import Image from 'next/image';
import { captionPrompt } from '../helpers/gpt-prompt';
import {
  SentimentIcon,
  ToneIcon,
  CaptionLengthIcon,
  HashtagsIcon,
  CTAIcon,
  CategoryThemeIcon,
  LanguageIcon,
  TargetAudienceIcon,
} from '../utils/caption-suite-options';
import OptionSection from '../components/OptionSection ';
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
import { convertSecondstoTime } from '../utils/converter-limiter';
import CountdownTimer from './CountdownTimer';
import { Tooltip } from 'react-tooltip';
import { formatDistanceToNow } from 'date-fns';

import { Button, ButtonGroup } from '@nextui-org/react';

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
      primary: '#a855f7',
    },
  },
};

const UploadPage = () => {
  //TODO: Implement how many captions are left, for instance 3 out of 5
  const [time, setTime] = useState('');
  const [retryAfter, setRetryAfter] = useState(null);
  const [remainingUpload, setRemainingUpload] = useState('');
  const [imageFile, setImageFile] = useState('');
  // const [imageFile, setImageFile] = useState(
  //   'https://static.wikia.nocookie.net/marvelcentral/images/9/97/Tony-Stark.jpg/revision/latest?cb=20130429010603'
  // ); example image
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
  const [responseData, setResposeData] = useState([]);
  const [loadingData, setLoadingData] = useState(false);

  const handleTimerFinish = () => {
    setTimeout(() => setRetryAfter(null), 0);
  };

  const handleSubmitGenerateCaption = async e => {
    e.preventDefault();
    setLoadingData(true);

    // Check if 'hashtags' is set to 'yes' to include them
    const includeHashtags = hashtagsValueSelected.name.toLowerCase() === 'yes';

    // Generate the prompt using the function and pass the includeHashtags flag
    const prompt = captionPrompt({ includeHashtags })
      .replace('${sentiment}', sentimentValueSelected.name)
      .replace('${caption_length}', captionValueSelected.name)
      .replace('${hashtags}', hashtagsValueSelected.name)
      .replace('${call_to_action}', callToActionValueSelected.name)
      .replace('${category_or_theme}', categoryOrThemeValueSelected.name)
      .replace('${target_audience}', targetAudianceValueSelected.name)
      .replace('${language_preference}', languageValueSelected.name)
      .replace('${tone}', toneValueSelected.name);

    // Prepare the data to be sent, including the prompt
    const data = {
      prompt: prompt,
      image_url: imageFile[0],
    };

    try {
      // Make a POST request to the API
      const response = await fetch('/api/image-processing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.status === 429) {
        setLoadingData(false);
        const responseSecondLimitAPI = response.headers.get('retry-after');
        const convertedSecondstoTimeStamp = convertSecondstoTime(
          responseSecondLimitAPI
        );
        setRetryAfter(responseSecondLimitAPI);
        setRemainingUpload(0);
        console.error(
          'Error checking upload limit:',
          convertedSecondstoTimeStamp
        );
      }

      const responseRemaining = response.headers.get('remaning-limit');
      setRemainingUpload(responseRemaining);

      // Get the JSON response body
      const result = await response.json();

      setLoadingData(false);
      setResposeData(result);
    } catch (error) {
      console.error('There was a problem with the fetch:', error);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(responseData.content)
      .then(() => {
        console.log('Text copied to clipboard');
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
      });
  };

  const formatRelativeTime = date => {
    const distance = formatDistanceToNow(date, { addSuffix: false });
    return distance
      .replace('less than a minute', 'now')
      .replace(' minute', 'm')
      .replace(' minutes', 'm')
      .replace(' hour', 'h')
      .replace(' hours', 'h')
      .replace(' day', 'd')
      .replace(' days', 'd');
  };

  useEffect(() => {
    if (imageFile) {
      const createdAt = new Date(); // Set to current date and time if imageFile is not empty
      const updateTime = () => {
        setTime(formatRelativeTime(createdAt));
      };

      updateTime();
      const intervalId = setInterval(updateTime, 60000); // Update every minute

      return () => clearInterval(intervalId);
    }
  }, [imageFile]);

  return (
    <div className='mt-5 sm:mt-20'>
      {imageFile.length == 0 ? (
        <div className='flex flex-col items-center justify-center w-full px-4 mt-5'>
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
        <div className='flex flex-col lg:flex-row items-center justify-center w-full px-4 mt-5 mx-auto max-w-4xl'>
          {/* Left Side */}
          <div className='w-full lg:w-1/2 p-2'>
            <h2 className='text-center mb-5'>Caption Crafting Suite</h2>
            {retryAfter != null && (
              <CountdownTimer
                endTimeInSeconds={retryAfter}
                onTimerFinish={handleTimerFinish}
              />
            )}
            {/* Sentiment Section */}
            <OptionSection
              label='Sentiment'
              tooltipText="It's important to match the sentiment of the caption to the emotion conveyed in the image."
              iconSVG={<SentimentIcon />}
              dropdownProps={{
                captionSuiteValue: sentiment,
                selectedStateValue: setSentimentValueSelected,
              }}
            />

            <OptionSection
              label='Tone'
              tooltipText='Different tones will resonate with different audiences and contexts.'
              iconSVG={<ToneIcon />}
              dropdownProps={{
                captionSuiteValue: tone,
                selectedStateValue: setToneValueSelected,
              }}
            />

            <OptionSection
              label='Caption Length'
              tooltipText='Some platforms or posts may be better suited to shorter or longer captions.'
              iconSVG={<CaptionLengthIcon />} // Replace with your actual Caption Length SVG component
              dropdownProps={{
                captionSuiteValue: caption_length,
                selectedStateValue: setCaptionValueSelected,
              }}
            />

            <OptionSection
              label='Hashtags'
              tooltipText='Hashtags can help with discoverability of posts on many social media platforms.'
              iconSVG={<HashtagsIcon />} // Replace with your actual Hashtags SVG component
              dropdownProps={{
                captionSuiteValue: hashtags,
                selectedStateValue: setHashtagsValueSelected,
              }}
            />

            <OptionSection
              label='Call to Action (CTA)'
              tooltipText='CTAs can drive engagement and interactions on the post.'
              iconSVG={<CTAIcon />} // Replace with your actual CTA SVG component
              dropdownProps={{
                captionSuiteValue: call_to_action,
                selectedStateValue: setCallToActionValueSelected,
              }}
            />

            <OptionSection
              label='Category or Theme'
              tooltipText="This can help in generating a caption that aligns with the theme of the image or the user's social media profile."
              iconSVG={<CategoryThemeIcon />} // Replace with your actual Category or Theme SVG component
              dropdownProps={{
                captionSuiteValue: category_or_theme,
                selectedStateValue: setCategoryOrThemeValueSelected,
              }}
            />

            <OptionSection
              label='Language Preference'
              tooltipText="This can help in generating a caption that aligns with the theme of the image or the user's social media profile."
              iconSVG={<LanguageIcon />} // Replace with your actual Language SVG component
              dropdownProps={{
                captionSuiteValue: language_preference,
                selectedStateValue: setLanguageValueSelected,
              }}
            />
            <OptionSection
              label='Target Audience'
              tooltipText='Knowing the target audience can help in crafting a caption that resonates well.'
              iconSVG={<TargetAudienceIcon />} // Replace with your actual Target Audience SVG component
              dropdownProps={{
                captionSuiteValue: target_audience,
                selectedStateValue: setTargetAudianceValueSelected,
              }}
            />

            {responseData.content && !retryAfter && (
              <p className='text-sm mt-2'>
                You have left {remainingUpload} captions left ✍️
              </p>
            )}

            {/* Generate Caption Button */}
            <div className='mt-2 mr-20 justify-end flex'>
              <Tooltip
                id='my-tooltip-generate'
                place='bottom'
                style={{ backgroundColor: 'rgb(0, 255, 30)', color: '#222' }}
              >
                Let's gooo!
              </Tooltip>
              {!loadingData ? (
                <button
                  type='button'
                  data-tooltip-id='my-tooltip-generate'
                  onClick={handleSubmitGenerateCaption}
                  className='text-white bg-purple-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2'
                >
                  Generate Caption!
                </button>
              ) : (
                <button
                  disabled
                  type='button'
                  className='py-2.5 px-5 me-2 text-sm font-medium text-white bg-purple-500 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-purple-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-purple-700 focus:text-purple-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center'
                >
                  <svg
                    aria-hidden='true'
                    role='status'
                    className='inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600'
                    viewBox='0 0 100 101'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                      fill='currentColor'
                    />
                    <path
                      d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                      fill='#1C64F2'
                    />
                  </svg>
                  Loading...
                </button>
              )}
            </div>
          </div>
          {/* Right Side */}
          <div className='w-full lg:w-1/2 p-2'>
            <div className='space-y-4'>
              <div className='max-w-md lg:max-w-full mx-auto border border-gray-300 bg-white'>
                <header className='flex items-center border-b border-b-gray-300 p-3'>
                  <img
                    src='https://picsum.photos/50/50'
                    className='h-10 w-10 rounded-full'
                    alt='Profile'
                  />

                  <div className='flex-grow ml-3 text-sm font-semibold'>
                    InstaCapt.me <span className='text-gray-400'>• {time}</span>
                  </div>

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
                </header>

                {imageFile[0] ? (
                  <div className='w-full'>
                    <Image
                      className='w-full'
                      src={imageFile[0] ?? ''}
                      alt='Glorious picture to generate caption'
                      width={500}
                      height={500}
                    />
                  </div>
                ) : (
                  <div className='animate-pulse'>
                    <div className='h-48 bg-gray-300'></div>
                  </div>
                )}

                <div className='p-4'>
                  <div className='flex justify-between gap-3'>
                    {/* Group for the first three SVGs */}
                    <div className='flex gap-3'>
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
                    </div>
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

                  <div className='text-sm'>
                    Liked by{' '}
                    <a href='https://www.instagram.com/zuck/' target='_blank'>
                      <span className='text-sm font-semibold'>zuck</span>
                    </a>{' '}
                    and <span className='text-sm font-semibold'>others</span>
                  </div>

                  {loadingData && !responseData.content && !retryAfter && (
                    <div className='max-w-sm animate-pulse overflow-hidden rounded'>
                      <div className='mb-2 h-6 bg-gray-300'></div>
                      <div className='h-4 w-2/3 bg-gray-300'></div>
                    </div>
                  )}
                  {(responseData.content && !loadingData && retryAfter) ||
                  (responseData.content && !loadingData && !retryAfter) ? (
                    <>
                      <div className='text-sm'>
                        <span className='font-semibold'>InstaCapt.me</span>{' '}
                        {responseData.content}{' '}
                      </div>
                      <button
                        onClick={copyToClipboard}
                        className='flex items-center gap-1.5 rounded-md place-content-end pl-0 text-xs text-gray-700 hover:text-gray-950 dark:text-gray-400 dark:hover:text-gray-200'
                      >
                        <svg
                          width='24'
                          height='24'
                          viewBox='0 0 24 24'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                          className='icon-md'
                        >
                          <path
                            fillRule='evenodd'
                            clipRule='evenodd'
                            d='M12 4C10.8954 4 10 4.89543 10 6H14C14 4.89543 13.1046 4 12 4ZM8.53513 4C9.22675 2.8044 10.5194 2 12 2C13.4806 2 14.7733 2.8044 15.4649 4H17C18.6569 4 20 5.34315 20 7V19C20 20.6569 18.6569 22 17 22H7C5.34315 22 4 20.6569 4 19V7C4 5.34315 5.34315 4 7 4H8.53513ZM8 6H7C6.44772 6 6 6.44772 6 7V19C6 19.5523 6.44772 20 7 20H17C17.5523 20 18 19.5523 18 19V7C18 6.44772 17.5523 6 17 6H16C16 7.10457 15.1046 8 14 8H10C8.89543 8 8 7.10457 8 6Z'
                            fill='currentColor'
                          ></path>
                        </svg>
                      </button>
                    </>
                  ) : loadingData && !retryAfter ? (
                    <div className='max-w-sm animate-pulse overflow-hidden rounded'>
                      <div className='mb-2 h-6 bg-gray-300'></div>
                      <div className='h-4 w-2/3 bg-gray-300'></div>
                    </div>
                  ) : null}
                  <div className='text-sm text-gray-500'>
                    View all 562 comments
                  </div>

                  {/* <div className='text-xs text-gray-400'>2 HOURS AGO</div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadPage;
