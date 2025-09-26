// src/app/auth/actions.ts
'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

export async function login(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const supabase = createClient();

  // Step 1: Sign in the user
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (signInError) {
    return redirect('/login?message=Could not authenticate user');
  }

  // Step 2: After successful sign-in, get the user's profile to check their role
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return redirect('/login?message=Could not find user session');
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profileError || !profile) {
    await supabase.auth.signOut();
    return redirect('/login?message=Could not find user profile. Please try signing up again.');
  }

  // Step 3: Redirect based on the role found in their profile
  if (profile.role === 'fighter') {
    return redirect('/fighter'); // Fighters go to the main swipe page
  } else if (profile.role === 'referee') {
    return redirect('/referee'); // Referees go to their dashboard
  } else if (profile.role === 'admin') {
    return redirect('/admin'); // Admins go to their dashboard
  } else {
    // A fallback for any other roles or errors
    return redirect('/');
  }
}

export async function signup(formData: FormData) {
  const supabase = createClient()
  const origin = headers().get('origin')
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const role = formData.get('role') as 'fighter' | 'referee'

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
      data: {
        role: role,
        username: formData.get('username') as string,
        weight_kg: formData.get('weight_kg') as string,
        height_cm: formData.get('height_cm') as string,
        certification_details: formData.get('certification_details') as string,
      },
    },
  })

  if (error) {
    return redirect('/login?message=Could not authenticate user')
  }

  return redirect('/confirm-email')
}

export async function signOut() {
  const supabase = createClient()
  await supabase.auth.signOut()
  return redirect('/login')
}