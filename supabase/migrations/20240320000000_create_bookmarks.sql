-- Create bookmarks table
create table public.bookmarks (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  fellowship_id text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  notes text,
  priority text check (priority in ('high', 'medium', 'low')),
  status text check (status in ('interested', 'preparing', 'applying')) default 'interested'
);

-- Create bookmark_tags table
create table public.bookmark_tags (
  id uuid default gen_random_uuid() primary key,
  bookmark_id uuid references public.bookmarks(id) on delete cascade not null,
  tag_name text not null,
  color text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up Row Level Security (RLS)
alter table public.bookmarks enable row level security;
alter table public.bookmark_tags enable row level security;

-- Create policies
create policy "Users can view their own bookmarks"
  on public.bookmarks for select
  using (auth.uid() = user_id);

create policy "Users can insert their own bookmarks"
  on public.bookmarks for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own bookmarks"
  on public.bookmarks for update
  using (auth.uid() = user_id);

create policy "Users can delete their own bookmarks"
  on public.bookmarks for delete
  using (auth.uid() = user_id);

-- Tags policies
create policy "Users can view tags for their bookmarks"
  on public.bookmark_tags for select
  using (
    exists (
      select 1 from public.bookmarks
      where bookmarks.id = bookmark_tags.bookmark_id
      and bookmarks.user_id = auth.uid()
    )
  );

create policy "Users can insert tags for their bookmarks"
  on public.bookmark_tags for insert
  with check (
    exists (
      select 1 from public.bookmarks
      where bookmarks.id = bookmark_tags.bookmark_id
      and bookmarks.user_id = auth.uid()
    )
  );

create policy "Users can update tags for their bookmarks"
  on public.bookmark_tags for update
  using (
    exists (
      select 1 from public.bookmarks
      where bookmarks.id = bookmark_tags.bookmark_id
      and bookmarks.user_id = auth.uid()
    )
  );

create policy "Users can delete tags for their bookmarks"
  on public.bookmark_tags for delete
  using (
    exists (
      select 1 from public.bookmarks
      where bookmarks.id = bookmark_tags.bookmark_id
      and bookmarks.user_id = auth.uid()
    )
  ); 