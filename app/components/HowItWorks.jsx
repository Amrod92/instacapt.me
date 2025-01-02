'use client';

const HowItWorks = () => {
  const steps = [
    {
      name: 'Upload Your Image',
      description: 'Simply drag and drop or click to upload your image. We support all major image formats.',
      number: '01'
    },
    {
      name: 'Customize Preferences',
      description: 'Choose your preferred tone, style, and length for the caption. Tailor it to your brand voice.',
      number: '02'
    },
    {
      name: 'Generate Caption',
      description: 'Our AI analyzes your image and preferences to create the perfect caption in seconds.',
      number: '03'
    },
    {
      name: 'Copy & Share',
      description: 'Copy your generated caption and share it on your favorite social media platform.',
      number: '04'
    }
  ];

  return (
    <div id="how-it-works" className="py-24 sm:py-32 bg-purple-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-purple-600">How It Works</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Simple Steps to Perfect Captions
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Get your AI-generated captions in just a few clicks. No sign-up required.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
            {steps.map((step) => (
              <div key={step.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-600">
                    <span className="text-xl font-bold text-white">{step.number}</span>
                  </div>
                  {step.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">{step.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
