import { motion } from "motion/react";
import { Check, Sparkles, Crown, Zap } from "lucide-react";
import { Button } from "./ui/button";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for getting started",
    icon: Sparkles,
    color: "from-gray-500 to-gray-600",
    popular: false,
    features: [
      "5 lessons per day",
      "Basic historical eras",
      "Progress tracking",
      "Mobile app access",
      "Community forums",
      "Basic achievements",
    ],
    limitations: [
      "Limited daily lessons",
      "Ads supported",
    ],
  },
  {
    name: "Premium",
    price: "$9.99",
    period: "per month",
    description: "Most popular for serious learners",
    icon: Crown,
    color: "from-green-500 to-green-600",
    popular: true,
    features: [
      "Unlimited lessons",
      "All historical eras",
      "Advanced progress tracking",
      "Ad-free experience",
      "Priority support",
      "All achievements",
      "Downloadable content",
      "Personalized learning paths",
      "Video lessons",
      "Interactive quizzes",
    ],
    limitations: [],
  },
  {
    name: "Family",
    price: "$14.99",
    period: "per month",
    description: "Best value for families",
    icon: Zap,
    color: "from-blue-500 to-purple-600",
    popular: false,
    features: [
      "Everything in Premium",
      "Up to 6 family members",
      "Family progress dashboard",
      "Parental controls",
      "Exclusive family challenges",
      "Shared achievements",
      "Multi-device support",
      "Priority customer support",
    ],
    limitations: [],
  },
];

const faqs = [
  {
    question: "Can I switch plans anytime?",
    answer: "Yes! You can upgrade, downgrade, or cancel your subscription at any time. Changes take effect immediately.",
  },
  {
    question: "Is there a free trial?",
    answer: "Yes! All premium plans come with a 7-day free trial. No credit card required to start.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, and Apple/Google Pay for your convenience.",
  },
  {
    question: "Do you offer student discounts?",
    answer: "Absolutely! Students get 50% off Premium plans with a valid .edu email address.",
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-20 bg-gradient-to-b from-green-50 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
            Simple, <span className="text-green-600">Transparent Pricing</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Choose the perfect plan for your learning journey. Start free, upgrade anytime.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20 max-w-7xl mx-auto">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden ${
                  plan.popular ? "ring-4 ring-green-500 scale-105" : ""
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-1 text-sm font-bold rounded-bl-2xl">
                    MOST POPULAR
                  </div>
                )}

                <div className="p-8">
                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${plan.color} rounded-2xl flex items-center justify-center mb-4`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Plan Name */}
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">{plan.description}</p>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-extrabold text-gray-900 dark:text-white">
                        {plan.price}
                      </span>
                      <span className="text-gray-600">/{plan.period}</span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Button
                    size="lg"
                    className={`w-full rounded-xl mb-6 ${
                      plan.popular
                        ? "bg-green-600 hover:bg-green-700 text-white"
                        : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white"
                    }`}
                  >
                    {plan.name === "Free" ? "Get Started" : "Start Free Trial"}
                  </Button>

                  {/* Features */}
                  <div className="space-y-3">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-3">
                        <div className="bg-green-100 rounded-full p-1 flex-shrink-0 mt-0.5">
                          <Check className="w-4 h-4 text-green-600" />
                        </div>
                        <span className="text-gray-700 dark:text-gray-300 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto mb-20"
        >
          <h3 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
            Compare All Features
          </h3>
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-bold">Feature</th>
                    <th className="px-6 py-4 text-center font-bold">Free</th>
                    <th className="px-6 py-4 text-center font-bold">Premium</th>
                    <th className="px-6 py-4 text-center font-bold">Family</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {[
                    { feature: "Daily lessons", free: "5", premium: "Unlimited", family: "Unlimited" },
                    { feature: "Historical eras", free: "Basic", premium: "All", family: "All" },
                    { feature: "Video lessons", free: "❌", premium: "✓", family: "✓" },
                    { feature: "Interactive quizzes", free: "Limited", premium: "✓", family: "✓" },
                    { feature: "Progress tracking", free: "Basic", premium: "Advanced", family: "Advanced" },
                    { feature: "Ad-free", free: "❌", premium: "✓", family: "✓" },
                    { feature: "Downloadable content", free: "❌", premium: "✓", family: "✓" },
                    { feature: "Family members", free: "1", premium: "1", family: "6" },
                    { feature: "Priority support", free: "❌", premium: "✓", family: "✓" },
                  ].map((row, index) => (
                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{row.feature}</td>
                      <td className="px-6 py-4 text-center text-gray-600 dark:text-gray-400">{row.free}</td>
                      <td className="px-6 py-4 text-center text-gray-600 dark:text-gray-400">{row.premium}</td>
                      <td className="px-6 py-4 text-center text-gray-600 dark:text-gray-400">{row.family}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* FAQs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Frequently Asked Questions
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <h4 className="font-bold text-gray-900 mb-3 text-lg">
                  {faq.question}
                </h4>
                <p className="text-gray-600">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Money Back Guarantee */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-3xl p-8 text-center text-white max-w-3xl mx-auto"
        >
          <div className="text-6xl mb-4">🛡️</div>
          <h3 className="text-3xl font-bold mb-3">30-Day Money-Back Guarantee</h3>
          <p className="text-green-100 text-lg">
            Not satisfied? Get a full refund within 30 days, no questions asked.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
