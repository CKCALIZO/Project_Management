-- Create payments table
CREATE TABLE IF NOT EXISTS payments (
    id BIGSERIAL PRIMARY KEY,
    enrollment_id BIGINT NOT NULL REFERENCES enrollments(id) ON DELETE CASCADE,
    amount DECIMAL(10, 2) NOT NULL,
    payment_date DATE NOT NULL,
    payment_method VARCHAR(50) NOT NULL,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add amount_paid and total_amount columns to enrollments if they don't exist
ALTER TABLE enrollments 
ADD COLUMN IF NOT EXISTS total_amount DECIMAL(10, 2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS amount_paid DECIMAL(10, 2) DEFAULT 0;

-- Create index on enrollment_id for faster queries
CREATE INDEX IF NOT EXISTS idx_payments_enrollment_id ON payments(enrollment_id);

-- Enable Row Level Security
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Create policy to allow authenticated users to view all payments
CREATE POLICY "Authenticated users can view all payments" ON payments
    FOR SELECT USING (auth.role() = 'authenticated');

-- Create policy to allow authenticated users to insert payments
CREATE POLICY "Authenticated users can insert payments" ON payments
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Create policy to allow authenticated users to update payments
CREATE POLICY "Authenticated users can update payments" ON payments
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Create policy to allow authenticated users to delete payments
CREATE POLICY "Authenticated users can delete payments" ON payments
    FOR DELETE USING (auth.role() = 'authenticated');
