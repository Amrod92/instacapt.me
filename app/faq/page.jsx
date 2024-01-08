'use client';
import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/20/solid';

function InformationPage() {
  return (
    <div className='bg-white py-12 sm:py-24'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='mx-auto max-w-2xl lg:text-center'>
          <h2 className='text-lg sm:text-base font-semibold leading-7 text-purple-500'>
            InstaCapt.me
          </h2>
          <p className='mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-gray-900'>
            Frequently Asked Questions
          </p>
          <p className='mt-4 sm:mt-6 text-base sm:text-lg leading-8 text-gray-600'>
            In this section, you'll find answers to many of the frequently asked
            questions. We've compiled this information to help clarify common
            inquiries and provide helpful insights. If your question isn't
            addressed here or if you require more detailed information, please
            don't hesitate to reach out to me.
          </p>
        </div>
        <div className='mx-auto mt-12 sm:mt-16 max-w-2xl lg:mt-20 lg:max-w-4xl'>
          <dl className='space-y-6 sm:space-y-8 lg:space-y-10'>
            <div className='relative p-2 sm:pl-12'>
              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button className='flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm sm:text-base font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75'>
                      <span>
                        Why is there a limit of only 5 captions a day?
                      </span>
                      <ChevronUpIcon
                        className={`${
                          open ? 'rotate-180 transform' : ''
                        } h-5 w-5 text-purple-500`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className='px-4 pb-2 pt-4 text-sm sm:text-base text-gray-500'>
                      The limit of 5 captions per day is in place to prevent any
                      one person from overusing the service and potentially
                      disrupting it for other users. We're aiming to scale the
                      platform as it grows.
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            </div>
            <div className='relative p-2 sm:pl-12'>
              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button className='flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm sm:text-base font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75'>
                      <span>How many captions can I generate?</span>
                      <ChevronUpIcon
                        className={`${
                          open ? 'rotate-180 transform' : ''
                        } h-5 w-5 text-purple-500`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className='px-4 pb-2 pt-4 text-sm sm:text-base text-gray-500'>
                      You're able to generate 5 captions per day, measured in a
                      24-hour period starting from when you begin generating the
                      first image.
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            </div>
            <div className='relative p-2 sm:pl-12'>
              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button className='flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm sm:text-base font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75'>
                      <span>Where is my image stored?</span>
                      <ChevronUpIcon
                        className={`${
                          open ? 'rotate-180 transform' : ''
                        } h-5 w-5 text-purple-500`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className='px-4 pb-2 pt-4 text-sm sm:text-base text-gray-500'>
                      The image is stored in a Bytescale free storage account
                      and analyzed by ChatGPT. Please be aware that by using
                      this service, you agree to and assume responsibility. It
                      is beyond our control, and WE DO NOT TAKE RESPONSIBILITY
                      FOR ANY UPLOADED IMAGE. For further information, please
                      reach out and refer to the Bytescale and ChatGPT
                      documentation.
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            </div>
            <div className='relative p-2 sm:pl-12'>
              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button className='flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm sm:text-base font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75'>
                      <span>Can I make any contributions to InstaCapt.me?</span>
                      <ChevronUpIcon
                        className={`${
                          open ? 'rotate-180 transform' : ''
                        } h-5 w-5 text-purple-500`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className='px-4 pb-2 pt-4 text-sm sm:text-base text-gray-500'>
                      We welcome a variety of contributions to our open-source
                      project! You can contribute in several ways, including
                      coding new features, fixing bugs, improving documentation,
                      and providing user support. If you're interested in
                      design, you can help with UI/UX improvements. We also
                      appreciate feedback and ideas for new features or
                      enhancements. Every contribution, no matter how small, is
                      valuable to us. Please check our GitHub repository!
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}

export default InformationPage;
