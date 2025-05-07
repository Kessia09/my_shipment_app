"use client";

export default function PricingPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Pricing</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Basic Plan */}
        <div className="border rounded-lg p-6 flex flex-col items-center bg-white shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Basic</h2>
          <p className="text-3xl font-bold mb-2">Free</p>
          <ul className="mb-4 text-muted-foreground">
            <li>Up to 5 shipments/month</li>
            <li>Email support</li>
            <li>Basic tracking</li>
          </ul>
          <button className="bg-primary text-white px-4 py-2 rounded mt-auto" disabled>Current Plan</button>
        </div>
        {/* Pro Plan */}
        <div className="border-2 border-primary rounded-lg p-6 flex flex-col items-center bg-white shadow-md">
          <h2 className="text-xl font-semibold mb-2 text-primary">Pro</h2>
          <p className="text-3xl font-bold mb-2 text-primary">$19<span className="text-base font-normal">/mo</span></p>
          <ul className="mb-4 text-muted-foreground">
            <li>Up to 100 shipments/month</li>
            <li>Priority support</li>
            <li>Advanced tracking & analytics</li>
          </ul>
          <button className="bg-primary text-white px-4 py-2 rounded mt-auto">Upgrade</button>
        </div>
        {/* Business Plan */}
        <div className="border rounded-lg p-6 flex flex-col items-center bg-white shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Business</h2>
          <p className="text-3xl font-bold mb-2">Custom</p>
          <ul className="mb-4 text-muted-foreground">
            <li>Unlimited shipments</li>
            <li>Dedicated account manager</li>
            <li>All features included</li>
          </ul>
          <button className="bg-primary text-white px-4 py-2 rounded mt-auto">Contact Sales</button>
        </div>
      </div>
    </div>
  );
} 