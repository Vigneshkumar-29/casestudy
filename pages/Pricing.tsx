import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Button, Badge } from '../components/UI';
import { ChevronDown, Search, Check, ArrowRight, Sparkles } from 'lucide-react';
import * as Accordion from '@radix-ui/react-accordion';

const Pricing: React.FC = () => {
    const [annual, setAnnual] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    const faqs = [
        { id: "item-1", q: "Can I cancel anytime?", a: "Yes, you can cancel your subscription at any time. You'll keep access until the end of your billing period." },
        { id: "item-2", q: "Is there a student discount?", a: "The Student plan is completely free. For the Researcher plan, we offer a 50% discount with a valid .edu email." },
        { id: "item-3", q: "Do you own my data?", a: "No. Your research belongs to you. We do not use your private documents to train our public models." }
    ];

    const filteredFaqs = faqs.filter(faq =>
        faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.a.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const plans = [
        {
            name: "Student",
            price: 0,
            desc: "Perfect for undergraduate papers and essays.",
            features: [
                "Gemini 2.5 Flash (Limited)",
                "Basic Grammar & Style",
                "MLA/APA Citations",
                "5 Projects Limit"
            ],
            cta: "Start Free",
            popular: false
        },
        {
            name: "Researcher",
            price: annual ? 12 : 15,
            desc: "For serious academics and thesis writers.",
            features: [
                "Unlimited Gemini 2.5 Usage",
                "Advanced Reasoning Engine",
                "All Citation Styles",
                "Unlimited Projects",
                "Visual Data Generation",
                "Plagiarism Check"
            ],
            cta: "Get Pro",
            popular: true
        },
        {
            name: "Institution",
            price: "Custom",
            desc: "For labs, departments, and universities.",
            features: [
                "Everything in Researcher",
                "Team Collaboration",
                "Admin Dashboard",
                "SSO Integration",
                "Priority Support"
            ],
            cta: "Contact Sales",
            popular: false
        }
    ];

    return (
        <div className="min-h-screen bg-stone-50 text-ink-900 font-sans">
            <Navbar />

            <section className="pt-44 pb-24 px-6 relative overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 dot-grid pointer-events-none" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-academic-accent/5 rounded-full blur-[150px] pointer-events-none" />

                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <Badge color="gold">PRICING</Badge>
                    <h1 className="font-serif text-5xl md:text-[4rem] mt-8 mb-6 leading-[1.05]">Invest in your intellect.</h1>
                    <p className="text-xl text-stone-500 mb-14">Simple, transparent pricing for every stage of your academic career.</p>

                    {/* Toggle */}
                    <div className="flex items-center justify-center gap-5 mb-20 bg-white p-1.5 rounded-full shadow-card border border-stone-200/60 w-fit mx-auto">
                        <span className={`text-sm font-semibold px-4 py-2 rounded-full cursor-pointer transition-all ${!annual ? 'text-ink-900 bg-stone-100' : 'text-stone-400'}`} onClick={() => setAnnual(false)}>Monthly</span>
                        <button
                            onClick={() => setAnnual(!annual)}
                            className={`w-12 h-7 rounded-full p-1 relative transition-colors duration-300 ${annual ? 'bg-academic-accent' : 'bg-stone-300'}`}
                        >
                            <motion.div
                                className="w-5 h-5 bg-white rounded-full shadow-md"
                                animate={{ x: annual ? 20 : 0 }}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            />
                        </button>
                        <span className={`text-sm font-semibold px-4 py-2 rounded-full cursor-pointer transition-all flex items-center gap-2 ${annual ? 'text-ink-900 bg-stone-100' : 'text-stone-400'}`} onClick={() => setAnnual(true)}>
                            Yearly <span className="text-academic-green bg-academic-green/10 px-2 py-0.5 rounded-full text-[10px] font-bold border border-academic-green/15">-20%</span>
                        </span>
                    </div>

                    {/* Cards */}
                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {plans.map((plan, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
                                className={`relative p-8 md:p-9 rounded-[2rem] border flex flex-col text-left ${plan.popular
                                    ? 'bg-ink-900 text-white border-white/8 shadow-dramatic scale-[1.03] z-10'
                                    : 'bg-white border-stone-200/60 text-ink-900 shadow-card hover:shadow-float transition-shadow'
                                    }`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-academic-accent to-amber-400 text-ink-900 px-6 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.15em] shadow-dramatic border border-white/10">
                                        Most Popular
                                    </div>
                                )}

                                <h3 className="font-serif text-2xl mb-2">{plan.name}</h3>
                                <p className={`text-sm mb-8 ${plan.popular ? 'text-stone-400' : 'text-stone-500'}`}>{plan.desc}</p>

                                <div className="mb-8">
                                    <span className="text-4xl font-bold">{typeof plan.price === 'number' ? `$${plan.price}` : plan.price}</span>
                                    {typeof plan.price === 'number' && <span className={`text-sm font-medium ${plan.popular ? 'text-stone-400' : 'text-stone-500'}`}>/mo</span>}
                                </div>

                                <ul className="space-y-4 mb-10 flex-1">
                                    {plan.features.map((feat, idx) => (
                                        <li key={idx} className="flex items-start gap-3 text-sm">
                                            <Check className={`w-4.5 h-4.5 shrink-0 mt-0.5 ${plan.popular ? 'text-academic-accent' : 'text-academic-green'}`} />
                                            <span className={plan.popular ? 'text-stone-300' : 'text-stone-600'}>{feat}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Button
                                    variant={plan.popular ? 'secondary' : 'outline'}
                                    className={`w-full justify-center !rounded-full !py-5 !text-base shadow-lg hover:scale-[1.02] transition-transform ${plan.popular ? '!bg-white !text-ink-900 border border-transparent hover:!bg-stone-50' : ''}`}
                                >
                                    {plan.cta}
                                    {plan.popular && <ArrowRight className="w-4 h-4 ml-2" />}
                                </Button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-24 px-6 bg-white border-t border-stone-200/50 relative">
                <div className="absolute inset-0 diagonal-lines pointer-events-none" />
                <div className="max-w-3xl mx-auto relative z-10">
                    <h2 className="font-serif text-3xl text-center mb-14">Frequently Asked Questions</h2>
                    <div className="relative mb-10">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search for answers..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 rounded-xl border border-stone-200 bg-stone-50/50 focus:bg-white focus:ring-2 focus:ring-academic-accent/20 focus:border-academic-accent/30 focus:outline-none transition-all"
                        />
                    </div>

                    <Accordion.Root type="single" defaultValue="item-1" collapsible className="space-y-4">
                        {filteredFaqs.map((item, i) => (
                            <Accordion.Item key={item.id} value={item.id} className="group rounded-2xl bg-white border border-stone-200/80 overflow-hidden data-[state=open]:border-academic-accent/30 data-[state=open]:shadow-card transition-all">
                                <Accordion.Header>
                                    <Accordion.Trigger className="flex flex-1 items-center justify-between p-6 w-full text-left font-serif text-lg text-ink-900 hover:bg-stone-50/50 transition-colors">
                                        {item.q}
                                        <ChevronDown className="text-stone-400 transition-transform duration-300 group-data-[state=open]:rotate-180 shrink-0 ml-4" aria-hidden />
                                    </Accordion.Trigger>
                                </Accordion.Header>
                                <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                                    <div className="p-6 pt-0 text-stone-500 leading-relaxed">
                                        {item.a}
                                    </div>
                                </Accordion.Content>
                            </Accordion.Item>
                        ))}
                    </Accordion.Root>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Pricing;
