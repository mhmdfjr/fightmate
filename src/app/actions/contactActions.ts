// src/app/actions/contactActions.ts
'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

// Define the shape of the return state
export type FormState = {
  success: boolean;
  message: string;
}

export async function submitContactForm(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const supabase = await createClient()

  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const phone = formData.get('phone') as string
  const message = formData.get('message') as string

  // Basic validation
  if (!name || !email || !message) {
    return { success: false, message: 'Please fill out all required fields.' }
  }

  const { error } = await supabase.from('contact_messages').insert({
    name,
    email,
    phone,
    message,
  })

  if (error) {
    console.error('Contact Form Error:', error)
    return { success: false, message: 'Failed to send message. Please try again.' }
  }

  revalidatePath('/')
  return { success: true, message: 'Message sent successfully! We will get back to you soon.' }
}