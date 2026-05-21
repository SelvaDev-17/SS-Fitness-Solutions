-- Create the orders table
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  address TEXT NOT NULL,
  products JSONB NOT NULL, -- JSONB array of product details (id, name, price, quantity)
  amount NUMERIC(10, 2) NOT NULL,
  utr_number TEXT,
  screenshot_url TEXT,
  payment_status TEXT DEFAULT 'PENDING' NOT NULL,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS) on the orders table
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Allow public / anonymous insert access to orders
CREATE POLICY "Allow public insert to orders" 
ON public.orders FOR INSERT 
TO public 
WITH CHECK (true);

-- Allow public select access to orders (required for checking order status/confirmation)
CREATE POLICY "Allow public select from orders" 
ON public.orders FOR SELECT 
TO public 
USING (true);

-- Setup Storage bucket 'payment-screenshots'
INSERT INTO storage.buckets (id, name, public)
VALUES ('payment-screenshots', 'payment-screenshots', true)
ON CONFLICT (id) DO NOTHING;

-- RLS policies for storage bucket 'payment-screenshots'
-- Allow public insert (upload) to 'payment-screenshots' bucket
CREATE POLICY "Allow public uploads to payment-screenshots"
ON storage.objects FOR INSERT 
TO public
WITH CHECK (bucket_id = 'payment-screenshots');

-- Allow public read (select) from 'payment-screenshots' bucket
CREATE POLICY "Allow public access to payment-screenshots"
ON storage.objects FOR SELECT 
TO public
USING (bucket_id = 'payment-screenshots');
