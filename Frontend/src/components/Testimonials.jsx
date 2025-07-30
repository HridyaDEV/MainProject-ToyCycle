import React from "react";

const testimonials = [
  {
    name: "Amritha N",
    message:
      "I was amazed by the quality of the toys I received. They looked almost brand new, and my son couldn't be happier. Definitely coming back for more!",
  },
  {
    name: "Dilsha A K",
    message:
      "I got a bundle of educational toys for a fraction of the original price. Smooth experience from start to finish.",
  },
  {
    name: "Ishitha R",
    message:
      "Instead of throwing away gently used toys, I sold them to other parents who actually needed them. It feels good to declutter and help others at the same time.",
  },
];

const Testimonials = () => {
  return (
    <section className="bg-white py-12 px-4 sm:px-8 lg:px-20">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
        What Parents Are Saying
      </h2>

      {/* Wrapper with grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 max-w-4xl mx-auto">
        {testimonials.slice(0, 2).map((item, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md border-t-4 border-orange-400 h-full"
          >
            <span className="text-2xl text-orange-400">“</span>
            <p className="text-gray-700 mt-4 mb-6 italic">"{item.message}"</p>
            <div className="text-right font-semibold text-gray-900">
              — {item.name}
            </div>
          </div>
        ))}
      </div>

      {/* Centered third testimonial */}
      <div className="flex justify-center mt-8">
        <div className="max-w-1/3 md:w-[50%]">
          <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-orange-400 h-full">
            <span className="text-2xl text-orange-400">“</span>
            <p className="text-gray-700 mt-4 mb-6 italic">"{testimonials[2].message}"</p>
            <div className="text-right font-semibold text-gray-900">
              — {testimonials[2].name}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
