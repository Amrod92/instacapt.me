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
  apiKey: "free",
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
  // const [imageFile, setImageFile] = useState([]);
  const [imageFile, setImageFile] = useState( ['https://static.wikia.nocookie.net/marvelcentral/images/9/97/Tony-Stark.jpg/revision/latest?cb=20130429010603'] ); // example image
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
    ].some(value => value?.id === 0);
  };



  const updateTime = () => {
    if (imageFile.length) {
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

    console.log("Generated Prompt:", prompt);
    try {
      setLoadingData(true);
      const response = await fetch("/api/image-processing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(prompt),
      });

      if (response.status === 429) {
        const retryAfter = response.headers.get("retry-after");
        setRetryAfter(convertSecondstoTime(retryAfter));
        setRemainingUpload(0);
        setLoadingData(false);
        notifyRateLimiter();
        toast.error("You've reached the rate limit. Try again later.");
      }

      if (!response.ok) throw new Error("API Error");

      const responseRemaining = response.headers.get("remaining-limit");
      setRemainingUpload(parseInt(responseRemaining));

      const results = await response.json();
      setResposeData(results);
      toast.success("Captions generated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate captions.");
    } finally {
      setLoadingData(false);
    }
  };

  return (
      <div className="mt-5 sm:mt-20">
        {imageFile.length === 0 ? (
            <div className="flex flex-col lg:flex-row items-center justify-center w-full px-4 mt-5 mx-auto max-w-4xl">
              <UploadDropzone
                  uploader={uploader}
                  options={options}
                  width="600px"
                  height="375px"
                  onUpdate={(files) => {
                    if (files.length > 0) {
                      setImageFile(files.map((file) => file.fileUrl));
                    }
                  }}
              />
              <span className="text-sm text-slate-400">Image size limit is 5MB</span>
            </div>
        ) : (
            <div className="flex flex-col lg:flex-row items-center justify-center w-full px-4 mt-5 mx-auto max-w-4xl">
              {/* Left Section: Caption Crafting Suite */}
              <CaptionCraftingSuite
                  retryAfter={retryAfter}
                  remainingUpload={remainingUpload}
                  setRemainingUpload={setRemainingUpload}
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
              />


              {/* Right Section: Image Preview */}
              <ImagePreviewSection
                  imageFile={imageFile}
                  responseData={responseData}
                  time={time}
              />
            </div>
        )}
        <Toaster position="bottom-right" />
      </div>
  );
};

export default UploadPage;
