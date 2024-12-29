'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { updateProfile } from '@/utils/supabase/queries';
import { type Profile } from '@/types/supabase';

interface ProfileFormProps {
  profile: Profile;
}

export default function ProfileForm({ profile }: ProfileFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    const formData = new FormData(e.currentTarget);
    const updates = {
      full_name: formData.get('full_name') as string,
      university: formData.get('university') as string,
      major: formData.get('major') as string,
      graduation_year: parseInt(formData.get('graduation_year') as string) || null
    };

    const updatedProfile = await updateProfile(profile.id, updates);

    if (updatedProfile) {
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } else {
      setMessage({ type: 'error', text: 'Failed to update profile. Please try again.' });
    }

    setIsSubmitting(false);
  };

  return (
    <div className="mt-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="full_name" className="block text-sm font-medium">
            Full Name
          </label>
          <input
            id="full_name"
            name="full_name"
            type="text"
            defaultValue={profile.full_name || ''}
            className="mt-1 block w-full rounded-md border border-gray-300 bg-zinc-800 px-3 py-2"
          />
        </div>

        <div>
          <label htmlFor="university" className="block text-sm font-medium">
            University
          </label>
          <input
            id="university"
            name="university"
            type="text"
            defaultValue={profile.university || ''}
            className="mt-1 block w-full rounded-md border border-gray-300 bg-zinc-800 px-3 py-2"
          />
        </div>

        <div>
          <label htmlFor="major" className="block text-sm font-medium">
            Major
          </label>
          <input
            id="major"
            name="major"
            type="text"
            defaultValue={profile.major || ''}
            className="mt-1 block w-full rounded-md border border-gray-300 bg-zinc-800 px-3 py-2"
          />
        </div>

        <div>
          <label htmlFor="graduation_year" className="block text-sm font-medium">
            Graduation Year
          </label>
          <input
            id="graduation_year"
            name="graduation_year"
            type="number"
            defaultValue={profile.graduation_year || ''}
            className="mt-1 block w-full rounded-md border border-gray-300 bg-zinc-800 px-3 py-2"
          />
        </div>

        {message && (
          <div
            className={`rounded-md p-4 ${
              message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
            }`}
          >
            {message.text}
          </div>
        )}

        <Button
          type="submit"
          variant="default"
          disabled={isSubmitting}
          className="mt-4"
        >
          {isSubmitting ? 'Updating...' : 'Update Profile'}
        </Button>
      </form>
    </div>
  );
} 