'use server';

import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';

export interface WaitlistInput {
  name: string;
  email: string;
  college: string;
  skill: string;
}

export interface ActionResponse {
  success: boolean;
  message: string;
  isMocked?: boolean;
}

export async function submitWaitlist(input: WaitlistInput): Promise<ActionResponse> {
  const { name, email, college, skill } = input;

  // Simple server-side validation
  if (!name || !email || !college || !skill) {
    return { success: false, message: 'All fields are required.' };
  }

  if (!email.includes('@')) {
    return { success: false, message: 'Please provide a valid email address.' };
  }

  try {
    if (!isSupabaseConfigured || !supabase) {
      // Mock mode fallback for local testing
      console.log('--- Mock Waitlist Submission ---');
      console.log('Name:', name);
      console.log('Email:', email);
      console.log('College:', college);
      console.log('Skill:', skill);
      console.log('---------------------------------');
      
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      return {
        success: true,
        message: 'Successfully registered for early access (mock mode).',
        isMocked: true,
      };
    }

    // Actual insertion into the 'waitlist' table
    const { error } = await supabase
      .from('waitlist')
      .insert([{ name, email, college, skill, created_at: new Date().toISOString() }]);

    if (error) {
      console.error('Supabase DB Insert Error:', error.message);
      
      // If table doesn't exist yet, we don't want the UI to break, but we should inform the developer
      if (error.code === '42P01') { // Relation does not exist
        return { 
          success: false, 
          message: 'Waitlist table not found in Supabase database. Please create a table named "waitlist" with columns: id (UUID), created_at, name (text), email (text), college (text), and skill (text).' 
        };
      }
      return { success: false, message: `Database insertion failed: ${error.message}` };
    }

    return {
      success: true,
      message: 'Thank you! You have been added to the waitlist.',
      isMocked: false,
    };
  } catch (err) {
    console.error('Waitlist submission exception:', err);
    const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred.';
    return {
      success: false,
      message: errorMessage,
    };
  }
}
