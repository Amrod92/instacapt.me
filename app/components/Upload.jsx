'use client';
import { useEffect, useState } from 'react';
import { Uploader } from 'uploader';
import { UploadDropzone } from 'react-uploader';
import Image from 'next/image';
import DropdownMenu from './dropdown-menu';
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
import { Tooltip } from 'react-tooltip';

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
  // const [imageFile, setImageFile] = useState('');
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
  const [responseData, setResposeData] = useState([]);

  const handleSubmitGenerateCaption = async e => {
    e.preventDefault();

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
      const response = await fetch(
        'http://localhost:3000/api/image-processing',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );

      // Check for a successful response
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Get the JSON response body
      const result = await response.json();

      setResposeData(result);
    } catch (error) {
      console.error('There was a problem with the fetch:', error);
    }
  };

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

            {/* Generate Caption Button */}
            <div className='mt-2 mr-20 justify-end flex'>
              <Tooltip
                id='my-tooltip-generate'
                place='bottom'
                style={{ backgroundColor: 'rgb(0, 255, 30)', color: '#222' }}
              >
                Let's gooo!
              </Tooltip>
              <button
                type='button'
                data-tooltip-id='my-tooltip-generate'
                onClick={handleSubmitGenerateCaption}
                className='text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2'
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
                    in.famous
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
                  //src={imageFile[0] ?? ''}
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

                  <div className='text-sm font-semibold'>10,552 Likes</div>

                  <div className='text-sm'>
                    <span className='font-semibold'>in.famous</span>{' '}
                    {responseData.content}
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
