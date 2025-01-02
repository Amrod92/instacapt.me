"use client";
import { useEffect, useState } from "react";
import { Uploader } from 'uploader';
import toast, { Toaster } from "react-hot-toast";
import { UploadDropzone } from "react-uploader";
import { convertSecondstoTime } from "../utils/converter-limiter";
import { formatRelativeTime } from "../utils/time-utils";
import { captionPrompt } from '../helpers/gpt-prompt';
import CaptionCraftingSuite from "./UI/CaptionCraftingSuite";
import ImagePreviewSection from "./UI/ImagePreviewSection";

// Get production API keys from Upload.io
const uploader = Uploader({
  "apiKey": "free"
});

const options = {
  multi: false,
  showFinishButton: true,
  styles: {
    colors: { primary: "#a855f7" },
  },
};

const UploadPage = () => {
  const [time, setTime] = useState("");
  const [retryAfter, setRetryAfter] = useState(null);
  const [remainingUpload, setRemainingUpload] = useState(null);
  const [imageFile, setImageFile] = useState([]);
  // const [imageFile, setImageFile] = useState( ['https://static.wikia.nocookie.net/marvelcentral/images/9/97/Tony-Stark.jpg/revision/latest?cb=20130429010603'] ); // example image
  const [responseData, setResposeData] = useState([]);
  const [loadingData, setLoadingData] = useState(false);

  const [sentimentValueSelected, setSentimentValueSelected] = useState(null);
  const [toneValueSelected, setToneValueSelected] = useState(null);
  const [captionLengthValueSelected, setCaptionLengthValueSelected] = useState(null);
  const [hashtagsValueSelected, setHashtagsValueSelected] = useState(null);
  const [callToActionValueSelected, setCallToActionValueSelected] = useState(null);
  const [categoryOrThemeValueSelected, setCategoryOrThemeValueSelected] = useState(null);
  const [languagePreferenceValueSelected, setLanguagePreferenceValueSelected] = useState(null);
  const [targetAudienceValueSelected, setTargetAudienceValueSelected] = useState(null);
  const [generateVariantSelected, setGenerateVariantSelected] = useState(null);

// Define isAnyDropdownValueZero
  const isAnyDropdownValueZero = () => {
    return [
      sentimentValueSelected,
      toneValueSelected,
      captionLengthValueSelected,
      hashtagsValueSelected,
      callToActionValueSelected,
      categoryOrThemeValueSelected,
      languagePreferenceValueSelected,
      targetAudienceValueSelected,
      generateVariantSelected
    ].some(value => value?.id === 0);
  };

  const handleRetryComplete = () => {
    setRetryAfter(null);
    toast.success("Retry time is up! You can try again now.");
  };

  const updateTime = () => {
    if (!imageFile || imageFile.length) {
      const createdAt = new Date();
      setTime(formatRelativeTime(createdAt));
    }
  };

  useEffect(() => {
    updateTime();
    const intervalId = setInterval(updateTime, 60000);
    return () => clearInterval(intervalId);
  }, [imageFile]);

  const notifyRateLimiter = () => {
    toast.error("Rate limit exceeded. Please try again later.", {
      icon: "⏳",
      duration: 4000, // Customize duration
    });
  };

  const handleSubmitGenerateCaption = async () => {
    const data = {
      sentiment: sentimentValueSelected?.name,
      tone: toneValueSelected?.name,
      captionLength: captionLengthValueSelected?.name,
      hashtags: hashtagsValueSelected?.name,
      callToAction: callToActionValueSelected?.name,
      categoryOrTheme: categoryOrThemeValueSelected?.name,
      languagePreference: languagePreferenceValueSelected?.name,
      targetAudience: targetAudienceValueSelected?.name,
    };

    const includeHashtags = hashtagsValueSelected?.name.toLowerCase() === "yes";

    // Generate the prompt by replacing placeholders
    const prompt = captionPrompt({ includeHashtags })
        .replace("${sentiment}", data.sentiment)
        .replace("${caption_length}", data.captionLength)
        .replace("${call_to_action}", data.callToAction === "Yes" ? "Ensure to include an engaging and motivational call to action that drives interaction and engagement." : "Do not include a call to action")
        .replace("${category_or_theme}", data.categoryOrTheme)
        .replace("${target_audience}", data.targetAudience)
        .replace("${language_preference}", data.languagePreference)
        .replace("${tone}", data.tone);

    const sendData = {
      prompt: prompt,
      image_url: imageFile[0],
      generate_variants: generateVariantSelected.generate
    };

    try {
        setLoadingData(true);
        const response = await fetch("/api/image-processing", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(sendData),
        });

        if (response.status === 429) {
          const retryAfterHeader = response.headers.get("retry-after");
          let retryAfterSeconds = 0;

          try {
            const errorData = await response.json(); // Try to parse as JSON
            retryAfterSeconds = errorData.retryAfter || parseInt(retryAfterHeader, 10);
          } catch {
            retryAfterSeconds = parseInt(retryAfterHeader, 10); // Fallback to header
          }

          if (!isNaN(retryAfterSeconds)) {
            setRetryAfter(retryAfterSeconds);
          } else {
            console.error("Unable to determine retry time.");
          }

          setRemainingUpload(0);
          notifyRateLimiter();
          return;
        }

      const responseRemaining = response.headers.get("remaining-limit");
        setRemainingUpload(parseInt(responseRemaining, 10));

        const results = await response.json();
        setResposeData(results);
        toast.success("Captions generated successfully!");
      } catch (error) {
        console.error("Error submitting captions:", error);
        toast.error("Failed to generate captions.");

      if (error.status === 429 && error.error?.type === "insufficient_quota") {
        return res.status(429).json({
          error: "Quota exceeded. Please check your plan and billing details.",
        });
      }

      } finally {
        setLoadingData(false);
      }
  };

  return (
    <div id="upload-section" className="w-full max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-purple-50/60 shadow-xl shadow-purple-600/10 ring-1 ring-purple-50"></div>
      </div>

      <div className="relative rounded-2xl border border-purple-100 bg-white/80 backdrop-blur-xl shadow-2xl shadow-purple-500/5 p-6 sm:p-8">
        <div className="absolute top-0 right-0 -mt-4 mr-4 flex items-center space-x-2 rounded-full bg-purple-600 px-4 py-1.5 text-sm font-semibold text-white">
          <span className="animate-pulse relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-white"></span>
          </span>
          <span>Live</span>
        </div>

        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Create Your Caption</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Upload your image and let AI craft the perfect caption for your social media post
          </p>
        </div>

        <div className="relative">
          <UploadDropzone
            uploader={uploader}
            options={options}
            onUpdate={(files) => {
              if (files.length > 0) {
                setImageFile(files.map((x) => x.fileUrl));
                toast.success("Image uploaded successfully!");
              }
            }}
            width="600px"
            height="375px"
          />
          
          {loadingData && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-lg">
              <div className="flex flex-col items-center space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                <p className="text-sm font-medium text-gray-600">Generating captions...</p>
              </div>
            </div>
          )}
        </div>

        {(!imageFile || imageFile.length === 0) ? (
          <div className="justify-items-center">
            <span className="text-sm text-slate-400">Image size limit is 5MB</span>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row items-center justify-center w-full px-4 mt-5 mx-auto max-w-4xl">
            {/* Left Section: Caption Crafting Suite */}
            <CaptionCraftingSuite
                retryAfter={retryAfter}
                onComplete={handleRetryComplete}
                remainingUpload={remainingUpload}
                loadingData={loadingData}
                setLoadingData={setLoadingData}
                handleSubmitGenerateCaption={handleSubmitGenerateCaption}
                isAnyDropdownValueZero={isAnyDropdownValueZero}
                notifyRateLimiter={notifyRateLimiter}
                sentimentState={{ value: sentimentValueSelected, setValue: setSentimentValueSelected }}
                toneState={{ value: toneValueSelected, setValue: setToneValueSelected }}
                captionLengthState={{ value: captionLengthValueSelected, setValue: setCaptionLengthValueSelected }}
                hashtagsState={{ value: hashtagsValueSelected, setValue: setHashtagsValueSelected }}
                callToActionState={{ value: callToActionValueSelected, setValue: setCallToActionValueSelected }}
                categoryOrThemeState={{ value: categoryOrThemeValueSelected, setValue: setCategoryOrThemeValueSelected }}
                languagePreferenceState={{ value: languagePreferenceValueSelected, setValue: setLanguagePreferenceValueSelected }}
                targetAudienceState={{ value: targetAudienceValueSelected, setValue: setTargetAudienceValueSelected }}
                generateValueState={{ value: generateVariantSelected, setValue: setGenerateVariantSelected }}
            />

            {/* Right Section: Image Preview */}
            <ImagePreviewSection
                imageFile={imageFile}
                setActualImageFile={setImageFile}
                loadingData={loadingData}
                responseData={responseData}
                setActualResposeData={setResposeData}
                time={time}
                retryAfter={retryAfter}
            />
          </div>
        )}
        <Toaster position="bottom-right" />
      </div>
    </div>
  );
};

export default UploadPage;
