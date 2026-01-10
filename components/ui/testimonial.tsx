"use client";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { useRef } from "react";

function ClientFeedback() {
    const testimonialRef = useRef<HTMLDivElement>(null);

    const revealVariants = {
        visible: (i: number) => ({
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            transition: {
                delay: i * 0.2, // Faster delay
                duration: 0.5,
            },
        }),
        hidden: {
            filter: "blur(10px)",
            y: -10, // less movement
            opacity: 0,
        },
    };

    return (
        <main className="w-full bg-white">
            <section className="relative h-full container text-black mx-auto rounded-lg py-20 bg-white" ref={testimonialRef}>
                <article className={"max-w-screen-md mx-auto text-center space-y-4 mb-16"} >
                    <TimelineContent as="h2" className={"xl:text-5xl text-4xl font-serif font-medium text-ink-900"} animationNum={0} customVariants={revealVariants} timelineRef={testimonialRef}>
                        Trusted by Startups and the worlds's largest companies
                    </TimelineContent>
                    <TimelineContent as="p" className={"mx-auto text-stone-500 text-lg"} animationNum={1} customVariants={revealVariants} timelineRef={testimonialRef}>
                        Let's hear how our client's feel about our service
                    </TimelineContent>
                </article>
                <div className="lg:grid lg:grid-cols-3 gap-4 flex flex-row overflow-x-auto snap-x snap-mandatory w-full lg:px-10 px-4 pb-10 scrollbar-hide -mx-4 lg:mx-0 px-4 lg:px-10">
                    <div className="min-w-[85vw] md:min-w-[calc(50vw-2rem)] lg:min-w-0 snap-center shrink-0 md:flex lg:flex-col lg:space-y-4 h-full lg:gap-0 gap-4 flex flex-col">
                        <TimelineContent animationNum={0} customVariants={revealVariants} timelineRef={testimonialRef} className="lg:flex-[7] flex-[6] flex flex-col justify-between relative bg-stone-50 overflow-hidden rounded-2xl border border-stone-100 p-8 hover:shadow-lg transition-shadow">
                            <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f0a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f0a_1px,transparent_1px)] bg-[size:50px_56px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
                            <article className="mt-auto relative z-10">
                                <p className="text-lg text-stone-700 italic mb-6">
                                    "Thesis has been a game-changer for us. Its ability to understand complex academic contexts is top-notch."
                                </p>
                                <div className="flex justify-between items-center pt-2 border-t border-stone-200/50">
                                    <div>
                                        <h2 className="font-semibold lg:text-lg text-base text-ink-900">
                                            Guillermo Rauch
                                        </h2>
                                        <p className="text-sm text-stone-500">CEO of Enigma</p>
                                    </div>
                                    <img
                                        src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=687&auto=format&fit=crop"
                                        alt="logo"
                                        width={200}
                                        height={200}
                                        className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                                    />
                                </div>
                            </article>
                        </TimelineContent>
                        <TimelineContent animationNum={1} customVariants={revealVariants} timelineRef={testimonialRef} className="lg:flex-[3] flex-[4] lg:h-fit lg:shrink-0 flex flex-col justify-between relative bg-academic-blue text-white overflow-hidden rounded-2xl border border-academic-blue p-8 shadow-xl">
                            <article className="mt-auto">
                                <p className="mb-6 text-white/90">
                                    "We've seen incredible results with Thesis. It's truly an intellectual partner."
                                </p>
                                <div className="flex justify-between items-center pt-2 border-t border-white/10">
                                    <div>
                                        <h2 className="font-semibold text-lg">Rika Shinoda</h2>
                                        <p className="text-white/70 text-sm">CEO of Kintsugi</p>
                                    </div>
                                    <img
                                        src="https://images.unsplash.com/photo-1512485694743-9c9538b4e6e0?q=80&w=687&auto=format&fit=crop"
                                        alt="logo"
                                        width={200}
                                        height={200}
                                        className="w-12 h-12 rounded-full object-cover border-2 border-white/20"
                                    />
                                </div>
                            </article>
                        </TimelineContent>
                    </div>
                    <div className="min-w-[85vw] md:min-w-[calc(50vw-2rem)] lg:min-w-0 snap-center shrink-0 lg:h-full md:flex lg:flex-col h-fit lg:space-y-4 lg:gap-0 gap-4 flex flex-col">
                        <TimelineContent animationNum={2} customVariants={revealVariants} timelineRef={testimonialRef} className="flex flex-col justify-between relative bg-ink-900 text-white overflow-hidden rounded-2xl border border-ink-800 p-8">
                            <article className="mt-auto">
                                <p className="text-lg text-stone-300 mb-6">
                                    "Their innovative solutions have truly transformed the way we operate our research labs."
                                </p>
                                <div className="flex justify-between items-end pt-2 border-t border-white/10">
                                    <div>
                                        <h2 className="font-semibold lg:text-lg text-base">
                                            Reacher
                                        </h2>
                                        <p className="lg:text-sm text-xs text-stone-400">CEO of OdeaoLabs</p>
                                    </div>
                                    <img
                                        src="https://images.unsplash.com/photo-1566753323558-f4e0952af115?q=80&w=1021&auto=format&fit=crop"
                                        alt="logo"
                                        width={200}
                                        height={200}
                                        className="w-12 h-12 rounded-full object-cover border-2 border-white/10"
                                    />
                                </div>
                            </article>
                        </TimelineContent>
                        <TimelineContent animationNum={3} customVariants={revealVariants} timelineRef={testimonialRef} className="flex flex-col justify-between relative bg-white overflow-hidden rounded-2xl border border-stone-200 p-8 hover:border-academic-accent/50 transition-colors">
                            <article className="mt-auto">
                                <p className="text-lg text-stone-700 mb-6">
                                    "We're extremely satisfied with Thesis. Their expertise and dedication have exceeded our expectations."
                                </p>
                                <div className="flex justify-between items-end pt-2 border-t border-stone-100">
                                    <div>
                                        <h2 className="font-semibold lg:text-lg text-base text-ink-900">John </h2>
                                        <p className="lg:text-sm text-xs text-stone-500">CEO of Labsbo</p>
                                    </div>
                                    <img
                                        src="https://images.unsplash.com/photo-1615109398623-88346a601842?q=80&w=687&auto=format&fit=crop"
                                        alt="logo"
                                        width={200}
                                        height={200}
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                </div>
                            </article>
                        </TimelineContent>
                        <TimelineContent animationNum={4} customVariants={revealVariants} timelineRef={testimonialRef} className="flex flex-col justify-between relative bg-stone-100 overflow-hidden rounded-2xl border border-stone-200 p-8">
                            <article className="mt-auto">
                                <p className="text-lg text-stone-700 mb-6">
                                    "Exceptional tool for drafting. It's always available, incredibly helpful."
                                </p>
                                <div className="flex justify-between items-end pt-2 border-t border-stone-200">
                                    <div>
                                        <h2 className="font-semibold lg:text-lg text-base text-ink-900">
                                            Steven Sunny
                                        </h2>
                                        <p className="lg:text-sm text-xs text-stone-500">CEO of boxefi</p>
                                    </div>
                                    <img
                                        src="https://images.unsplash.com/photo-1740102074295-c13fae3e4f8a?q=80&w=687&auto=format&fit=crop"
                                        alt="logo"
                                        width={200}
                                        height={200}
                                        className="w-12 h-12 rounded-full object-cover grayscale opacity-80"
                                    />
                                </div>
                            </article>
                        </TimelineContent>
                    </div>
                    <div className="min-w-[85vw] md:min-w-[calc(50vw-2rem)] lg:min-w-0 snap-center shrink-0 h-full md:flex lg:flex-col lg:space-y-4 lg:gap-0 gap-4 flex flex-col">
                        <TimelineContent animationNum={5} customVariants={revealVariants} timelineRef={testimonialRef} className="lg:flex-[3] flex-[4] flex flex-col justify-between relative bg-academic-accent text-white overflow-hidden rounded-2xl border border-transparent p-8 shadow-2xl">
                            <article className="mt-auto">
                                <p className="mb-6 font-medium">
                                    "Thesis has been a key partner in our growth journey."
                                </p>
                                <div className="flex justify-between items-center pt-2 border-t border-white/20">
                                    <div>
                                        <h2 className="font-semibold text-lg">Guillermo Rauch</h2>
                                        <p className="text-white/80 text-sm">CEO of OdeaoLabs</p>
                                    </div>
                                    <img
                                        src="https://images.unsplash.com/photo-1563237023-b1e970526dcb?q=80&w=765&auto=format&fit=crop"
                                        alt="logo"
                                        width={200}
                                        height={200}
                                        className="w-12 h-12 rounded-full object-cover border-2 border-white/30"
                                    />
                                </div>
                            </article>
                        </TimelineContent>
                        <TimelineContent animationNum={6} customVariants={revealVariants} timelineRef={testimonialRef} className="lg:flex-[7] flex-[6] flex flex-col justify-between relative bg-white overflow-hidden rounded-2xl border border-stone-200 p-8">
                            <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f0a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f0a_1px,transparent_1px)] bg-[size:50px_56px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
                            <article className="mt-auto relative z-10">
                                <p className="text-lg text-stone-700 italic mb-6">
                                    "Thesis has been a true game-changer for us. Its commitment to excellence has made a significant impact on our research."
                                </p>
                                <div className="flex justify-between items-center pt-2 border-t border-stone-100">
                                    <div>
                                        <h2 className="font-semibold text-lg text-ink-900">Paul Brauch</h2>
                                        <p className="text-stone-500 text-sm">CTO of Spectrum</p>
                                    </div>
                                    <img
                                        src="https://images.unsplash.com/photo-1590086782957-93c06ef21604?q=80&w=687&auto=format&fit=crop"
                                        alt="logo"
                                        width={200}
                                        height={200}
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                </div>
                            </article>
                        </TimelineContent>
                    </div>
                </div>

                <div className="absolute border-b border-stone-200 bottom-4 h-16 z-[2] md:w-full w-[90%] md:left-0 left-[5%]">
                    {/* Decorative bottom lines */}
                </div>
            </section>
        </main>
    );
}

export default ClientFeedback;
