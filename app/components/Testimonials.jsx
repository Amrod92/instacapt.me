'use client';

const Testimonials = () => {
  const testimonials = [
    {
      content: "This tool has completely transformed how I manage my social media. The captions are creative and save me so much time!",
      author: "Sarah Johnson",
      role: "Content Creator"
    },
    {
      content: "I'm amazed by how well it captures the essence of my photos. The AI understands context perfectly.",
      author: "Michael Chen",
      role: "Photography Enthusiast"
    },
    {
      content: "As a small business owner, this tool is a game-changer. Professional captions in seconds!",
      author: "Emma Davis",
      role: "Business Owner"
    }
  ];

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-lg font-semibold leading-8 tracking-tight text-purple-600">Testimonials</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Loved by Content Creators
          </p>
        </div>
        <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="relative group">
                <div className="relative z-10 rounded-2xl bg-white p-8 ring-1 ring-gray-900/10 transition duration-200 hover:shadow-xl">
                  <div className="space-y-6">
                    {/* Purple quote icon */}
                    <svg className="h-8 w-8 text-purple-600/40" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                      <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                    </svg>
                    <p className="text-lg leading-7 text-gray-700">{testimonial.content}</p>
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.author}</div>
                      <div className="mt-1 text-gray-500">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
                {/* Decorative purple gradient behind each card */}
                <div className="absolute inset-0 scale-95 bg-gradient-to-r from-purple-100 to-purple-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 rounded-2xl"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
