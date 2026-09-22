import type { Metadata } from "next";
import { ContactForm } from "@/components/marketing/contactForm";

export const metadata: Metadata = {
  title: "Contact — Skilly",
};

export default function ContactPage() {
  return (
    <div className="bg-secondary min-h-screen">
      <div className="max-w-lg mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-xl sm:text-4xl font-bold text-foreground">
            Get in Touch
          </h1>
          <p className="text-chart-3 mt-1">
            Have a question or feedback about Skilly? Send a message below.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 mt-4">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
