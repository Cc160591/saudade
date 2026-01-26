-- Profile provisioning for Saudade App
-- Date: 2026-01-26

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
    default_org_id UUID;
BEGIN
    -- Get the ID of the 'Saudade' organization
    SELECT id INTO default_org_id FROM public.organizations WHERE slug = 'saudade' LIMIT 1;

    -- Create profile
    INSERT INTO public.profiles (id, full_name, avatar_url, organization_id)
    VALUES (
        NEW.id,
        NEW.raw_user_meta_data->>'full_name',
        NEW.raw_user_meta_data->>'avatar_url',
        default_org_id
    );

    -- Create membership (default to 'Responsabile generale' or from metadata)
    INSERT INTO public.memberships (user_id, organization_id, role)
    VALUES (
        NEW.id,
        default_org_id,
        COALESCE(NEW.raw_user_meta_data->>'role', 'Responsabile generale')
    );

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger on auth.users
CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
