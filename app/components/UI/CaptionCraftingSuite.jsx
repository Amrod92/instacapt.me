import React from "react";
import {Button} from "@/components/ui/button";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import CountdownTimer from "../CountdownTimer";
import OptionSection from "../OptionSection ";
import {

    SentimentIcon,
    ToneIcon,
    CaptionLengthIcon,
    HashtagsIcon,
    CTAIcon,
    CategoryThemeIcon,
    LanguageIcon,
    TargetAudienceIcon,
    GenerateIcon,
} from "../../utils/caption-suite-options";
import {
    generate_variants,
    sentiment,
    tone,
    caption_length,
    hashtags,
    call_to_action,
    category_or_theme,
    language_preference,
    target_audience,
} from "../../utils/constants";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"

const CaptionCraftingSuite = ({
                                  retryAfter,
                                  onComplete,
                                  handleRetryComplete,
                                  remainingUpload,
                                  loadingData,
                                  handleSubmitGenerateCaption,
                                  isAnyDropdownValueZero,
                                  sentimentState,
                                  toneState,
                                  captionLengthState,
                                  hashtagsState,
                                  callToActionState,
                                  categoryOrThemeState,
                                  languagePreferenceState,
                                  targetAudienceState,
                                  generateValueState,
                              }) => {
    return (
        <div className="w-full lg:w-1/2 p-2 justify-items-center">
            <h2 className="text-center mb-5">Caption Crafting Suite</h2>

            {retryAfter && (
                <CountdownTimer
                    retryAfterInSeconds={retryAfter}
                    onComplete={onComplete}
                />
            )}

            {/* Options Section for larger screens */}
            <div className="justify-items-center hidden lg:block">
                <OptionSection
                    label="Generate"
                    tooltipText="How many variants do you want to be generated?"
                    iconSVG={<GenerateIcon/>}
                    dropdownProps={{
                        captionSuiteValue: generate_variants,
                        selectedStateValue: generateValueState.setValue,
                    }}
                />

                <OptionSection
                    label="Sentiment"
                    tooltipText="Match the sentiment to the image."
                    iconSVG={<SentimentIcon/>}
                    dropdownProps={{
                        captionSuiteValue: sentiment,
                        selectedStateValue: sentimentState.setValue,
                    }}
                />

                <OptionSection
                    label="Tone"
                    tooltipText="Set the tone for your caption."
                    iconSVG={<ToneIcon/>}
                    dropdownProps={{
                        captionSuiteValue: tone,
                        selectedStateValue: toneState.setValue,
                    }}
                />

                <OptionSection
                    label="Caption Length"
                    tooltipText="Choose a suitable length for your caption."
                    iconSVG={<CaptionLengthIcon/>}
                    dropdownProps={{
                        captionSuiteValue: caption_length,
                        selectedStateValue: captionLengthState.setValue,
                    }}
                />

                <OptionSection
                    label="Hashtags"
                    tooltipText="Add hashtags for better discoverability."
                    iconSVG={<HashtagsIcon/>}
                    dropdownProps={{
                        captionSuiteValue: hashtags,
                        selectedStateValue: hashtagsState.setValue,
                    }}
                />

                <OptionSection
                    label="Call to Action (CTA)"
                    tooltipText="Encourage action with a strong CTA."
                    iconSVG={<CTAIcon/>}
                    dropdownProps={{
                        captionSuiteValue: call_to_action,
                        selectedStateValue: callToActionState.setValue,
                    }}
                />

                <OptionSection
                    label="Category or Theme"
                    tooltipText="Align captions with the image theme."
                    iconSVG={<CategoryThemeIcon/>}
                    dropdownProps={{
                        captionSuiteValue: category_or_theme,
                        selectedStateValue: categoryOrThemeState.setValue,
                    }}
                />

                <OptionSection
                    label="Language Preference"
                    tooltipText="Select the language for your caption."
                    iconSVG={<LanguageIcon/>}
                    dropdownProps={{
                        captionSuiteValue: language_preference,
                        selectedStateValue: languagePreferenceState.setValue,
                    }}
                />

                <OptionSection
                    label="Target Audience"
                    tooltipText="Craft captions that resonate with your audience."
                    iconSVG={<TargetAudienceIcon/>}
                    dropdownProps={{
                        captionSuiteValue: target_audience,
                        selectedStateValue: targetAudienceState.setValue,
                    }}
                />

                {/* Generate Caption Button */}
                <div className="mt-5">
                    {!loadingData ? (
                        <Button
                            type="button"
                            disabled={isAnyDropdownValueZero()}
                            onClick={handleSubmitGenerateCaption}
                            className={`text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 ${
                                isAnyDropdownValueZero()
                                    ? "bg-purple-500 opacity-50"
                                    : "bg-purple-500"
                            }`}
                        >
                            Generate Your Caption!
                        </Button>
                    ) : (
                        <Button disabled>
                            <span className="animate-spin mr-2">...</span>
                            Please wait
                        </Button>
                    )}
                </div>
            </div>

            {/* Drawer for smaller screens */}
            <div className="block lg:hidden">
                <Drawer>
                    <DrawerTrigger asChild>
                        <Button className="bg-purple-500">Open Caption Suite</Button>
                    </DrawerTrigger>
                    <DrawerContent>
                        <div className="mx-auto w-full max-w-sm mt-10 max-h-[80vh] overflow-y-auto px-6">
                            <DrawerHeader>
                                <DrawerTitle>Caption Crafting Options</DrawerTitle>
                                <DrawerDescription>
                                    Select your options below.
                                </DrawerDescription>
                            </DrawerHeader>
                            <div className="grid items-center justify-center">
                                <OptionSection
                                    label="Generate"
                                    tooltipText="How many variants do you want to be generated."
                                    iconSVG={<GenerateIcon/>}
                                    dropdownProps={{
                                        captionSuiteValue: generate_variants,
                                        selectedStateValue: generateValueState.setValue,
                                    }}
                                />

                                <OptionSection
                                    label="Sentiment"
                                    tooltipText="Match the sentiment to the image."
                                    iconSVG={<SentimentIcon/>}
                                    dropdownProps={{
                                        captionSuiteValue: sentiment,
                                        selectedStateValue: sentimentState.setValue,
                                    }}
                                />

                                <OptionSection
                                    label="Tone"
                                    tooltipText="Set the tone for your caption."
                                    iconSVG={<ToneIcon/>}
                                    dropdownProps={{
                                        captionSuiteValue: tone,
                                        selectedStateValue: toneState.setValue,
                                    }}
                                />

                                <OptionSection
                                    label="Caption Length"
                                    tooltipText="Choose a suitable length for your caption."
                                    iconSVG={<CaptionLengthIcon/>}
                                    dropdownProps={{
                                        captionSuiteValue: caption_length,
                                        selectedStateValue: captionLengthState.setValue,
                                    }}
                                />

                                <OptionSection
                                    label="Hashtags"
                                    tooltipText="Add hashtags for better discoverability."
                                    iconSVG={<HashtagsIcon/>}
                                    dropdownProps={{
                                        captionSuiteValue: hashtags,
                                        selectedStateValue: hashtagsState.setValue,
                                    }}
                                />

                                <OptionSection
                                    label="Call to Action (CTA)"
                                    tooltipText="Encourage action with a strong CTA."
                                    iconSVG={<CTAIcon/>}
                                    dropdownProps={{
                                        captionSuiteValue: call_to_action,
                                        selectedStateValue: callToActionState.setValue,
                                    }}
                                />

                                <OptionSection
                                    label="Category or Theme"
                                    tooltipText="Align captions with the image theme."
                                    iconSVG={<CategoryThemeIcon/>}
                                    dropdownProps={{
                                        captionSuiteValue: category_or_theme,
                                        selectedStateValue: categoryOrThemeState.setValue,
                                    }}
                                />

                                <OptionSection
                                    label="Language Preference"
                                    tooltipText="Select the language for your caption."
                                    iconSVG={<LanguageIcon/>}
                                    dropdownProps={{
                                        captionSuiteValue: language_preference,
                                        selectedStateValue: languagePreferenceState.setValue,
                                    }}
                                />

                                <OptionSection
                                    label="Target Audience"
                                    tooltipText="Craft captions that resonate with your audience."
                                    iconSVG={<TargetAudienceIcon/>}
                                    dropdownProps={{
                                        captionSuiteValue: target_audience,
                                        selectedStateValue: targetAudienceState.setValue,
                                    }}
                                />

                            </div>

                            <DrawerFooter>
                                {!loadingData ? (
                                    <Button
                                        type="button"
                                        disabled={isAnyDropdownValueZero()}
                                        onClick={handleSubmitGenerateCaption}
                                        className={`text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 ${
                                            isAnyDropdownValueZero()
                                                ? "bg-purple-500 opacity-50"
                                                : "bg-purple-500"
                                        }`}
                                    >
                                        Generate Your Caption!
                                    </Button>
                                ) : (
                                    <Button disabled>
                                        <span className="animate-spin mr-2">...</span>
                                        Please wait
                                    </Button>
                                )}
                                <DrawerClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DrawerClose>
                            </DrawerFooter>
                        </div>
                    </DrawerContent>
                </Drawer>
            </div>

            {remainingUpload !== null && (
                <Alert className="relative w-80 my-5">
                    <AlertTitle className="ml-2">Caption Remaining</AlertTitle>
                    <AlertDescription className="ml-2">
                        You have {remainingUpload} captions left.
                    </AlertDescription>
                </Alert>
            )}
        </div>

    );
};

export default CaptionCraftingSuite;
