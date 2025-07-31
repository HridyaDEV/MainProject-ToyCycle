import React from "react";

import { RiDoubleQuotesL, RiDoubleQuotesR } from "react-icons/ri";

const Testimonials = () => {
    return (
        <section className="bg-white py-12 px-4 sm:px-8 lg:px-20">
            <h2 className="text-3xl font-semibold text-center mb-10 text-amber-950">
                What Parents Are Saying
            </h2>

            {/* First Row: Two Testimonials */}
            <div className="flex flex-col md:flex-row justify-center gap-20 mb-8">
                <div className="flex-1 min-w-[280px] max-w-[400px] h-[300px] bg-white p-6 rounded-lg shadow-md border-t-4 border-orange-400 flex flex-col justify-between">

                    <RiDoubleQuotesL className="text-amber-950 text-xl mt-5" />
                    <p className="text-gray-700 italic">
                        I was amazed by the quality of the toys I received. They looked almost brand new, and my son couldn't be happier. Definitely coming back for more!
                    </p>
                    <div className="flex justify-between items-end mt-4">
                        {/* Empty space for alignment */}
                        <div></div>

                        {/* Quote Icon */}
                        <RiDoubleQuotesR className="text-amber-950 text-xl " />
                    </div>
                    <div className="text-right font-semibold text-gray-900 mt-4">
                        — Amritha N
                    </div>
                </div>

                <div className="flex-1 min-w-[280px] max-w-[400px] h-[300px] bg-white p-6 rounded-lg shadow-md border-t-4 border-orange-400 flex flex-col justify-between">
                    <RiDoubleQuotesL className="text-amber-950 text-xl mt-5" />

                    <p className="text-gray-700 italic">
                        I got a bundle of educational toys for a fraction of the original price. Smooth experience from start to finish.
                    </p>
                    <div className="flex justify-between items-end mt-4">
                        {/* Empty space for alignment */}
                        <div></div>

                        {/* Quote Icon */}
                        <RiDoubleQuotesR className="text-amber-950 text-xl " />
                    </div>
                    <div className="text-right font-semibold text-gray-900 mt-4">
                        — Dilsha A K
                    </div>
                </div>
            </div>

            {/* Second Row: Centered Testimonial */}
            <div className="flex justify-center">
                <div className="min-w-[280px] max-w-[400px] h-[300px] bg-white p-6 rounded-lg shadow-md border-t-4 border-orange-400 flex flex-col justify-between">
                    <RiDoubleQuotesL className="text-amber-950 text-xl mt-5" />
                    <p className="text-gray-700 italic">
                        Instead of throwing away gently used toys, I sold them to other parents who actually needed them. It feels good to declutter and help others at the same time.
                    </p>
                    <div className="flex justify-between items-end mt-4">
                        {/* Empty space for alignment */}
                        <div></div>

                        {/* Quote Icon */}
                        <RiDoubleQuotesR className="text-amber-950 text-xl " />
                    </div>

                    <div className="text-right font-semibold text-gray-900 mt-4">
                        — Ishitha R
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
