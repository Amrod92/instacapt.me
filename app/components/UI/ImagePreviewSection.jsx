import React, {useState, useEffect} from "react";
import {
    Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious
} from "@/components/ui/carousel"
import instacapt_logo from '../../../public/instacapt_logo.png';
import VerifiedIcon from '../VerifiedIcon';
import Image from "next/image";

const ImagePreviewSection = ({imageFile, loadingData, responseData, time, retryAfter}) => {
    console.log('this is responseData', responseData);
    const [api, setApi] = useState();
    const [current, setCurrent] = React.useState(0);
    const [count, setCount] = React.useState(0);

    useEffect(() => {
        if (!api) {
            return
        }

        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap() + 1)

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1)
        })
    }, [api]);

    return (<div
            className="mx-auto w-full lg:w-1/2 p-2 flex justify-center max-w-3xl mt-4 bg-white items-center relative border-y border-b-gray-300">
            {/* Header Section */}
            <div className="h-full relative w-full ">
                <div>
                    <div className="flex justify-between items-center py-2">
                        <div className="relative mt-1 flex">
                            <div className="bg-gradient-to-tr from-yellow-400 to-purple-600 p-1 rounded-full">
                                <div className="bg-white p-1 rounded-full">
                                    <Image
                                        src={instacapt_logo}
                                        alt="Profile Picture"
                                        className="w-10 h-10 rounded-full object-cover"
                                        width={40}
                                        height={40}
                                    />
                                </div>
                            </div>
                            <div className='flex-grow flex ml-3 text-sm items-center'>
                                <a href='https://www.instagram.com/manlio_kt/' target='_blank'
                                   rel="noopener noreferrer">
                                    <span className='font-semibold'>InstaCapt.Me</span>
                                </a>
                                <VerifiedIcon className="mx-1"/>
                                <span className='text-gray-400'>• {time}</span>
                            </div>
                        </div>
                        <button
                            type="button"
                            className="relative p-2 focus:outline-none border-none bg-gray-100 rounded-full"
                        >
                            <svg
                                className="w-5 h-5 text-gray-700"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                                ></path>
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Image Section */}
                <div className="relative w-full h-full">
                    <Image
                        src={imageFile[0]}
                        alt="Uploaded Image"
                        className="rounded-lg w-full h-full object-cover"
                        width={500}
                        height={500}
                    />
                </div>

                {/* Action Section */}
                <div className="flex justify-between items-start my-2">
                    <div className="flex space-x-2 items-center">
                        <button className="focus:outline-none">
                            <svg
                                className="w-8 h-8 text-gray-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.6"
                                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                ></path>
                            </svg>
                        </button>
                        <button className="focus:outline-none">
                            <svg
                                className="w-8 h-8 text-gray-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.6"
                                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                ></path>
                            </svg>
                        </button>
                        <button className="focus:outline-none">
                            <svg
                                className="w-8 h-8 text-gray-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.6"
                                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                ></path>
                            </svg>
                        </button>
                    </div>
                    <div className="flex space-x-2 items-center">
                        <button className="focus:outline-none">
                            <svg
                                className="w-8 h-8 text-gray-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.6"
                                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                                ></path>
                            </svg>
                        </button>
                    </div>
                </div>

                {loadingData && !responseData[0]?.message.content && !retryAfter && (
                    <div className='max-w-sm animate-pulse overflow-hidden rounded'>
                        <div className='mb-2 h-6 bg-gray-300'></div>
                        <div className='h-4 w-2/3 bg-gray-300'></div>
                    </div>)}
                {(responseData[0]?.message.content && !loadingData && retryAfter) || (responseData[0]?.message.content && !loadingData && !retryAfter) ? (
                    <>
                        {/* Like Section */}
                        <div className="text-sm flex flex-col space-y-3">
                            <div className="w-full text-gray-700">
                                Liked by{' '}
                                <a href='https://www.instagram.com/zuck/' target='_blank' rel="noopener noreferrer">
                                    <span className='font-semibold'>zuck</span>
                                </a>{' '}
                                and <span className='font-semibold'>others</span>
                            </div>
                        </div>
                    <div>
                        {/* Left Content */}
                        <div>
                            <Carousel setApi={setApi}>
                                <CarouselContent>
                                    {responseData.map((item, index) => (
                                        <CarouselItem key={index} className="contain-inline-size text-sm my-2">
                                            <div>
                                                <span className="font-bold inline-flex items-center">InstaCapt.me <VerifiedIcon
                                                    className="mx-1"/></span>
                                                <span>{item.message?.content}</span>
                                            </div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                            </Carousel>
                        </div>

                        {/* Right Button */}
                        <div className="mt-1.5">
                            <button
                                onClick={() => {
                                    copyToClipboard();
                                    notifyClipboard();
                                }}
                                className="flex items-center gap-1.5 rounded-md place-content-end pl-0 text-xs text-gray-700 hover:text-gray-950 dark:text-gray-400 dark:hover:text-gray-200"
                            >
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="icon-md"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M12 4C10.8954 4 10 4.89543 10 6H14C14 4.89543 13.1046 4 12 4ZM8.53513 4C9.22675 2.8044 10.5194 2 12 2C13.4806 2 14.7733 2.8044 15.4649 4H17C18.6569 4 20 5.34315 20 7V19C20 20.6569 18.6569 22 17 22H7C5.34315 22 4 20.6569 4 19V7C4 5.34315 5.34315 4 7 4H8.53513ZM8 6H7C6.44772 6 6 6.44772 6 7V19C6 19.5523 6.44772 20 7 20H17C17.5523 20 18 19.5523 18 19V7C18 6.44772 17.5523 6 17 6H16C16 7.10457 15.1046 8 14 8H10C8.89543 8 8 7.10457 8 6Z"
                                        fill="currentColor"
                                    ></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </>) : loadingData && !retryAfter ? (
                    <div className='max-w-sm animate-pulse overflow-hidden rounded'>
                    <div className='mb-2 h-6 bg-gray-300'></div>
                        <div className='h-4 w-2/3 bg-gray-300'></div>
                    </div>) : null}

                <div className='text-sm text-gray-500 mt-2'>
                    View all 1,557 comments
                </div>

                {/* Add Comment Section */}
                <div className="z-50">
                    <div>
                        <div className="flex justify-between w-full">
                            <div className="w-full">
                                <input
                                    type="text"
                                    name="comment"
                                    id="comment"
                                    placeholder="Add A Comment..."
                                    className="w-full text-sm py-4 rounded-none focus:outline-none"
                                />
                            </div>
                            <div className="w-20">
                                <button
                                    className="border-none text-sm px-4 bg-white py-4 text-indigo-600 focus:outline-none"
                                >
                                    Post
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
};

export default ImagePreviewSection;
