// src/app/actions/swipeActions.ts
'use server'

import { createClient } from '@/utils/supabase/server'

export async function handleSwipe(swiperId: string, swipedId: string, liked: boolean) {
  const supabase = createClient()

  // ... (insert swipe logic) ...
  const { error: swipeError } = await supabase.from('swipes').insert({
    swiper_id: swiperId,
    swiped_id: swipedId,
    liked: liked,
  })

  if (swipeError) {
    console.error('Error recording swipe:', swipeError)
    return { success: false, match: false, error: 'Could not record swipe.' }
  }

  if (liked) {
    const { data: reverseSwipe, error: checkError } = await supabase
      .from('swipes')
      .select('liked')
      .eq('swiper_id', swipedId)
      .eq('swiped_id', swiperId)
      .single()

    if (checkError && checkError.code !== 'PGRST116') {
      console.error('Error checking for match:', checkError)
      return { success: false, match: false, error: 'Error checking for match.' }
    }

    if (reverseSwipe && reverseSwipe.liked) {
      console.log("IT'S A MATCH!")

      const { error: matchError } = await supabase.from('matches').insert({
        fighter1_id: swiperId,
        fighter2_id: swipedId,
      })

      if (matchError) {
        console.error('Error creating match:', matchError)
        return { success: false, match: false, error: 'Could not create match.' }
      }

      // --- IMPORTANT: Return match status ---
      return { success: true, match: true }
    }
  }

  // --- IMPORTANT: Return non-match status ---
  return { success: true, match: false }
}