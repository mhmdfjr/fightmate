// src/components/ContactForm.tsx
"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import {
  submitContactForm,
  type FormState,
} from "@/app/actions/contactActions";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { toast } from "sonner";

const initialState: FormState = {
  success: false,
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      size="lg"
      className="w-full bg-accent hover:bg-accent/90 font-bold text-lg"
    >
      {pending ? "Sending..." : "Send Message"}
    </Button>
  );
}

export default function ContactForm() {
  const [state, formAction] = useActionState(submitContactForm, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast.success(state.message);
        formRef.current?.reset();
      } else {
        toast.error(state.message);
      }
    }
  }, [state]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="space-y-6 max-w-xl mx-auto"
    >
      <Input
        name="name"
        placeholder="Your Name"
        required
        className="border border-border rounded-lg"
      />
      <Input
        name="email"
        type="email"
        placeholder="Your Email"
        required
        className="border border-border rounded-lg"
      />

      <Input
        name="phone"
        placeholder="Your Phone (Optional)"
        className="border border-border rounded-lg"
      />
      <Textarea
        name="message"
        placeholder="Your Message"
        required
        rows={10}
        className="border border-border rounded-lg"
      />
      <SubmitButton />
    </form>
  );
}
