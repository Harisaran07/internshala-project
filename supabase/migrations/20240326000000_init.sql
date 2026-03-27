-- Create Charities table
CREATE TABLE IF NOT EXISTS charities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Create Profiles table (linked to auth.users)
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    charity_id UUID REFERENCES charities(id),
    charity_percentage INTEGER DEFAULT 10 CHECK (charity_percentage >= 10),
    subscription_status TEXT DEFAULT 'inactive',
    renewal_date TIMESTAMPTZ,
    total_won NUMERIC DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Create Scores table
CREATE TABLE IF NOT EXISTS scores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    score INTEGER NOT NULL CHECK (score >= 1 AND score <= 45),
    date TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Create Draws table
CREATE TABLE IF NOT EXISTS draws (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    month TEXT NOT NULL,
    year INTEGER NOT NULL,
    winning_numbers INTEGER[] NOT NULL,
    prize_pool NUMERIC DEFAULT 0,
    status TEXT DEFAULT 'pending', -- pending, published
    draw_type TEXT DEFAULT 'random', -- random, algorithmic
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Create Winners table
CREATE TABLE IF NOT EXISTS winners (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    draw_id UUID REFERENCES draws(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    match_type INTEGER NOT NULL, -- 3, 4, 5
    prize_amount NUMERIC NOT NULL,
    verification_status TEXT DEFAULT 'pending', -- pending, approved, rejected
    payout_status TEXT DEFAULT 'pending', -- pending, paid
    proof_url TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS Policies (Basic)
ALTER TABLE charities ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE draws ENABLE ROW LEVEL SECURITY;
ALTER TABLE winners ENABLE ROW LEVEL SECURITY;

-- Public read for charities
CREATE POLICY "Public read charities" ON charities FOR SELECT USING (true);

-- User profiles (read own, admin read all)
CREATE POLICY "Users can read own profiles" ON profiles FOR SELECT USING (auth.uid() = id);

-- Scores (read/write own)
CREATE POLICY "Users can manage own scores" ON scores FOR ALL USING (auth.uid() = user_id);

-- Draws (public read published)
CREATE POLICY "Public read published draws" ON draws FOR SELECT USING (status = 'published');

-- Winners (read own)
CREATE POLICY "Users can read own winnings" ON winners FOR SELECT USING (auth.uid() = user_id);
