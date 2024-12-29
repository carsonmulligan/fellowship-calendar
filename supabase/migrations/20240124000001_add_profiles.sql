-- Create profiles table
create table profiles (
  id uuid references auth.users not null primary key,
  full_name text,
  email text,
  avatar_url text,
  university text,
  major text,
  graduation_year integer,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table profiles enable row level security;

-- Create policies
create policy "Users can view their own profile." 
  on profiles for select 
  using (auth.uid() = id);

create policy "Users can update their own profile." 
  on profiles for update 
  using (auth.uid() = id);

-- Create a trigger to set updated_at on profile updates
create function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger on_profile_updated
  before update on profiles
  for each row execute procedure public.handle_updated_at();

-- Create a trigger to create a profile on user signup
create function public.handle_new_user_profile()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, email, avatar_url)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.email,
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user_profile(); 