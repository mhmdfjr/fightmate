// src/app/actions/profileActions.ts
'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateProfile(formData: FormData) {
  const supabase = createClient()

  // 1. Get the current user
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return { error: { message: 'You must be logged in to update your profile.' } }
  }

  // 2. Extract form data
  const fullName = formData.get('fullName') as string
  const username = formData.get('username') as string
  const weight = formData.get('weight') as string
  const height = formData.get('height') as string
  const location = formData.get('location') as string
  const style = formData.get('style') as string
  const experience = formData.get('experience') as 'amateur' | 'pro'
  const avatarFile = formData.get('avatar') as File

  let avatar_url: string | undefined = undefined

  // 3. Handle avatar upload if a new file is provided
  if (avatarFile && avatarFile.size > 0) {
    const filePath = `public/${user.id}/${Date.now()}-${avatarFile.name}`
    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, avatarFile)

    if (uploadError) {
      console.error('Upload Error:', uploadError)
      return { error: { message: 'Failed to upload avatar.' } }
    }

    const { data: publicUrlData } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath)

    avatar_url = publicUrlData.publicUrl
  }

  // 4. Update the 'profiles' table
  const { error: profileError } = await supabase
    .from('profiles')
    .update({
      full_name: fullName,
      username: username,
      ...(avatar_url && { avatar_url }), // Only include avatar_url if it was updated
    })
    .eq('id', user.id)

  if (profileError) {
    console.error('Profile Update Error:', profileError)
    return { error: { message: 'Failed to update profile.' } }
  }

  // 5. Update the 'fighter_stats' table
  const { error: statsError } = await supabase
    .from('fighter_stats')
    .update({
      weight_kg: parseFloat(weight),
      height_cm: parseFloat(height),
      location: location,
      style: style,
      experience: experience,
    })
    .eq('user_id', user.id)

  if (statsError) {
    console.error('Stats Update Error:', statsError)
    return { error: { message: 'Failed to update fighter stats.' } }
  }

  // 6. Revalidate the path to show the updated data
  revalidatePath('/fighter/profile')

  return { error: null }
}