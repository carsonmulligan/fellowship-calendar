import CustomerPortalForm from '@/components/ui/AccountForms/CustomerPortalForm';
import EmailForm from '@/components/ui/AccountForms/EmailForm';
import NameForm from '@/components/ui/AccountForms/NameForm';
import ProfileForm from '@/components/ui/AccountForms/ProfileForm';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import {
  getUserDetails,
  getSubscription,
  getUser,
  getProfile
} from '@/utils/supabase/queries';

export default async function Account() {
  const supabase = createClient();
  
  // First get the user
  const user = await getUser(supabase);
  
  if (!user) {
    return redirect('/signin');
  }

  // Then get the rest of the data
  const [userDetails, subscription, profile] = await Promise.all([
    getUserDetails(supabase),
    getSubscription(supabase),
    getProfile(user.id)
  ]);

  return (
    <section className="mb-32 bg-black">
      <div className="max-w-6xl px-4 py-8 mx-auto sm:px-6 sm:pt-24 lg:px-8">
        <div className="sm:align-center sm:flex sm:flex-col">
          <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
            Account
          </h1>
          <p className="max-w-2xl m-auto mt-5 text-xl text-zinc-200 sm:text-center sm:text-2xl">
            Manage your account settings
          </p>
        </div>
      </div>
      <div className="p-4">
        {profile && <ProfileForm profile={profile} />}
        <CustomerPortalForm subscription={subscription} />
        <NameForm userName={userDetails?.full_name ?? ''} />
        <EmailForm userEmail={user.email} />
      </div>
    </section>
  );
}
