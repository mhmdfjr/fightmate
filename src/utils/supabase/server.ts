/* eslint-disable @typescript-eslint/no-explicit-any */
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies(); // ✅ gunakan await

  return createServerClient(
    process.env.NEXT_PRIVATE_SUPABASE_URL!,
    process.env.NEXT_PRIVATE_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            console.error("Failed to set cookie:", error);
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: "", ...options });
          } catch (error) {
            console.error("Failed to remove cookie:", error);
          }
        },
      },
    }
  );
}


// src/utils/supabase/server.ts
// import { createServerClient, type CookieOptions } from "@supabase/ssr";
// import { cookies } from "next/headers";

// export function createClient() {
//   // pastikan resolve promise di sini
//   const cookieStore = ((): any => {
//     // kalau ternyata cookies() return Promise, kita resolve
//     const maybePromise = cookies();
//     if (maybePromise instanceof Promise) {
//       throw new Error(
//         "cookies() unexpectedly returned a Promise. Did you upgrade Next.js?"
//       );
//     }
//     return maybePromise;
//   })();

//   return createServerClient(
//     process.env.NEXT_PRIVATE_SUPABASE_URL!,
//     process.env.NEXT_PRIVATE_SUPABASE_ANON_KEY!,
//     {
//       cookies: {
//         get(name: string) {
//           return cookieStore.get(name)?.value;
//         },
//         set(name: string, value: string, options: CookieOptions) {
//           try {
//             cookieStore.set({ name, value, ...options });
//           } catch (error) {
//             console.error("Failed to set cookie:", error);
//           }
//         },
//         remove(name: string, options: CookieOptions) {
//           try {
//             cookieStore.set({ name, value: "", ...options });
//           } catch (error) {
//             console.error("Failed to remove cookie:", error);
//           }
//         },
//       },
//     }
//   );
// }
