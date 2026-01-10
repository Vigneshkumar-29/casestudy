import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Button, Badge } from '../components/UI';
import { ChevronDown, Search, Check, X, ArrowRight } from 'lucide-react';
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
        <div className="min-h-screen bg-stone-50 text-ink-900 font-sans selection:bg-academic-accent selection:text-white">
            <Navbar />

            <section className="pt-40 pb-20 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <Badge color="stone">PRICING</Badge>
                    <h1 className="font-serif text-5xl md:text-6xl mt-6 mb-6">Invest in your intellect.</h1>
                    <p className="text-xl text-stone-500 mb-12">Simple, transparent pricing for every stage of your academic career.</p>

                    {/* Toggle - More Prominent */}
                    <div className="flex items-center justify-center gap-6 mb-16 bg-white p-2 rounded-full shadow-sm border border-stone-200 w-fit mx-auto">
                        <span className={`text-base font-medium px-4 cursor-pointer transition-colors ${!annual ? 'text-ink-900 font-bold' : 'text-stone-400'}`} onClick={() => setAnnual(false)}>Monthly</span>
                        <button
                            onClick={() => setAnnual(!annual)}
                            className={`w-14 h-8 rounded-full p-1 relative transition-colors duration-300 ${annual ? 'bg-academic-blue' : 'bg-stone-300'}`}
                        >
                            <motion.div
                                className="w-6 h-6 bg-white rounded-full shadow-md"
                                animate={{ x: annual ? 24 : 0 }}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            />
                        </button>
                        <span className={`text-base font-medium px-4 cursor-pointer transition-colors flex items-center gap-2 ${annual ? 'text-ink-900 font-bold' : 'text-stone-400'}`} onClick={() => setAnnual(true)}>
                            Yearly <span className="text-green-600 bg-green-50 px-2 py-0.5 rounded-full text-xs font-bold border border-green-100">-20%</span>
                        </span>
                    </div>

                    {/* Cards */}
                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {plans.map((plan, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className={`relative p-8 rounded-3xl border flex flex-col text-left ${plan.popular
                                    ? 'bg-ink-900 text-white border-ink-900 shadow-2xl scale-105 z-10'
                                    : 'bg-white border-stone-200 text-ink-900 shadow-lg hover:shadow-xl transition-shadow'
                                    }`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-academic-accent to-orange-400 text-white px-6 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-xl border border-white/20">
                                        Most Popular
                                    </div>
                                )}

                                <h3 className="font-serif text-2xl font-bold mb-2">{plan.name}</h3>
                                <p className={`text-sm mb-6 ${plan.popular ? 'text-stone-400' : 'text-stone-500'}`}>{plan.desc}</p>

                                <div className="mb-8">
                                    <span className="text-4xl font-bold">{typeof plan.price === 'number' ? `$${plan.price}` : plan.price}</span>
                                    {typeof plan.price === 'number' && <span className={`text-sm ${plan.popular ? 'text-stone-400' : 'text-stone-500'}`}>/mo</span>}
                                </div>

                                <ul className="space-y-4 mb-8 flex-1">
                                    {plan.features.map((feat, idx) => (
                                        <li key={idx} className="flex items-start gap-3 text-sm">
                                            <Check className={`w-5 h-5 shrink-0 ${plan.popular ? 'text-green-400' : 'text-green-600'}`} />
                                            <span className={plan.popular ? 'text-stone-300' : 'text-stone-600'}>{feat}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Button
                                    variant={plan.popular ? 'secondary' : 'outline'}
                                    className={`w-full justify-center !rounded-full !py-6 !text-base shadow-lg hover:scale-105 transition-transform ${plan.popular ? '!bg-white !text-ink-900 border border-transparent hover:!bg-stone-50' : ''}`}
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
            <section className="py-20 px-6 bg-white border-t border-stone-100">
                <div className="max-w-3xl mx-auto">
                    <h2 className="font-serif text-3xl text-center mb-12">Frequently Asked Questions</h2>
                    <div className="relative mb-10">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search for answers..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:ring-2 focus:ring-academic-blue/20 focus:outline-none transition-all"
                        />
                    </div>

                    <Accordion.Root type="single" defaultValue="item-1" collapsible className="space-y-4">
                        {filteredFaqs.map((item, i) => (
                            <Accordion.Item key={item.id} value={item.id} className="group rounded-2xl bg-white border border-stone-200 overflow-hidden data-[state=open]:border-academic-blue/50 data-[state=open]:shadow-md transition-all">
                                <Accordion.Header>
                                    <Accordion.Trigger className="flex flex-1 items-center justify-between p-6 w-full text-left font-serif font-medium text-lg text-ink-900 hover:bg-stone-50/50 transition-colors">
                                        {item.q}
                                        <ChevronDown className="text-stone-400 transition-transform duration-300 group-data-[state=open]:rotate-180" aria-hidden />
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
