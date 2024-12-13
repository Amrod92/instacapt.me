import React from "react";
import { CarouselContainer } from "./CarouselContainer";
import instacapt_logo from '../../../public/instacapt_logo.png';
import Image from "next/image";

const ImagePreviewSection = ({ imageFile, responseData, time }) => {
    return (
        <div className="w-full lg:w-1/2 p-2">
            <div className="space-y-4">
                <div className="max-w-md lg:max-w-full mx-auto border border-gray-300 bg-white">
                    <header className="flex items-center border-b border-b-gray-300 p-3">
                        <div className="bg-gradient-to-tr from-yellow-400 to-purple-600 p-1 rounded-full">
                            <div className="bg-white p-1 rounded-full">
                                <Image
                                    className="rounded-full"
                                    src={instacapt_logo} // Replace with actual path
                                    alt="Profile Picture"
                                    width={35}
                                    height={35}
                                />
                            </div>
                        </div>
                        <div className="flex-grow ml-3 text-sm font-semibold">
                            <span className="text-sm font-semibold">InstaCapt.Me</span>
                            <span className="text-gray-400">• {time}</span>
                        </div>
                    </header>
                    <div className="w-full">
                        <Image src={imageFile[0]} alt="Uploaded Image" width={500} height={500} />
                    </div>
                    <div className="p-3">
                        {responseData.length > 0 && <CarouselContainer genCompationData={responseData} />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImagePreviewSection;
