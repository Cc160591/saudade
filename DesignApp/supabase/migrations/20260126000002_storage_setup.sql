-- Storage setup for Saudade App
-- Date: 2026-01-26

-- Create documents bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('documents', 'documents', false, 10485760, ARRAY['application/pdf', 'image/jpeg', 'image/png'])
ON CONFLICT (id) DO NOTHING;

-- Storage Policies for 'documents' bucket
-- Note: the path is assumed to be {organization_id}/{year}/{month}/{filename}

-- 1. SELECT: Users can only see files in folders matching their organization_id
CREATE POLICY "Users can select documents from their org"
ON storage.objects FOR SELECT
TO authenticated
USING (
    bucket_id = 'documents' AND 
    (storage.foldername(name))[1] IN (
        SELECT organization_id::text 
        FROM public.memberships 
        WHERE user_id = auth.uid()
    )
);

-- 2. INSERT: Users can only upload to folders matching their organization_id
CREATE POLICY "Users can upload documents to their org"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
    bucket_id = 'documents' AND 
    (storage.foldername(name))[1] IN (
        SELECT organization_id::text 
        FROM public.memberships 
        WHERE user_id = auth.uid()
    )
);

-- 3. DELETE: Same as above
CREATE POLICY "Users can delete documents from their org"
ON storage.objects FOR DELETE
TO authenticated
USING (
    bucket_id = 'documents' AND 
    (storage.foldername(name))[1] IN (
        SELECT organization_id::text 
        FROM public.memberships 
        WHERE user_id = auth.uid()
    )
);
