"use client";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="mb-6 text-muted-foreground">Have questions or need help? Fill out the form below or reach us directly.</p>
      <form className="space-y-4 mb-8">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
          <input id="name" name="name" type="text" className="border rounded px-3 py-2 w-full" placeholder="Your Name" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
          <input id="email" name="email" type="email" className="border rounded px-3 py-2 w-full" placeholder="you@email.com" />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
          <textarea id="message" name="message" rows={4} className="border rounded px-3 py-2 w-full" placeholder="How can we help?" />
        </div>
        <button type="submit" className="bg-primary text-white px-4 py-2 rounded">Send Message</button>
      </form>
      <div className="border-t pt-6 text-muted-foreground">
        <p className="mb-1 font-semibold">Email:</p>
        <p className="mb-4">support@myshipmentapp.com</p>
        <p className="mb-1 font-semibold">Phone:</p>
        <p>+1 (555) 123-4567</p>
      </div>
    </div>
  );
} 