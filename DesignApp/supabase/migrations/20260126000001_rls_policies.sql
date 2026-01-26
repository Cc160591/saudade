-- RLS Policies for Saudade App
-- Date: 2026-01-26

-- Helper function to check organization access
CREATE OR REPLACE FUNCTION public.has_org_access(org_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.memberships 
        WHERE user_id = auth.uid() 
        AND organization_id = org_id
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Enable RLS on all tables
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_aliases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.document_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.document_lines ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reconciliations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_closings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;

-- 1. Organizations: Users can see organizations they belong to
CREATE POLICY select_organizations ON public.organizations
    FOR SELECT USING (EXISTS (SELECT 1 FROM public.memberships WHERE user_id = auth.uid() AND organization_id = id));

-- 2. Profiles: Users can see profiles in their organizations
CREATE POLICY select_profiles ON public.profiles
    FOR SELECT USING (organization_id IS NULL OR public.has_org_access(organization_id));
CREATE POLICY update_own_profile ON public.profiles
    FOR UPDATE USING (id = auth.uid());

-- 3. Memberships: Users can see memberships in their organizations
CREATE POLICY select_memberships ON public.memberships
    FOR SELECT USING (public.has_org_access(organization_id));

-- 4. Categories
CREATE POLICY select_categories ON public.categories
    FOR SELECT USING (public.has_org_access(organization_id));
CREATE POLICY manage_categories ON public.categories
    FOR ALL USING (
        public.has_org_access(organization_id) AND 
        EXISTS (SELECT 1 FROM public.memberships WHERE user_id = auth.uid() AND organization_id = public.categories.organization_id AND role IN ('Titolare'))
    );

-- 5. Vendors
CREATE POLICY select_vendors ON public.vendors
    FOR SELECT USING (public.has_org_access(organization_id));
CREATE POLICY manage_vendors ON public.vendors
    FOR ALL USING (
        public.has_org_access(organization_id) AND 
        EXISTS (SELECT 1 FROM public.memberships WHERE user_id = auth.uid() AND organization_id = public.vendors.organization_id AND role IN ('Titolare', 'Responsabile generale'))
    );

-- 6. Products
CREATE POLICY select_products ON public.products
    FOR SELECT USING (public.has_org_access(organization_id));
CREATE POLICY manage_products ON public.products
    FOR ALL USING (public.has_org_access(organization_id));

-- 7. Product Aliases
CREATE POLICY select_product_aliases ON public.product_aliases
    FOR SELECT USING (EXISTS (SELECT 1 FROM public.products p WHERE p.id = product_id AND public.has_org_access(p.organization_id)));

-- 8. Documents
CREATE POLICY select_documents ON public.documents
    FOR SELECT USING (public.has_org_access(organization_id));
CREATE POLICY manage_documents ON public.documents
    FOR ALL USING (public.has_org_access(organization_id));

-- 9. Document Files
CREATE POLICY select_document_files ON public.document_files
    FOR SELECT USING (EXISTS (SELECT 1 FROM public.documents d WHERE d.id = document_id AND public.has_org_access(d.organization_id)));
CREATE POLICY manage_document_files ON public.document_files
    FOR ALL USING (EXISTS (SELECT 1 FROM public.documents d WHERE d.id = document_id AND public.has_org_access(d.organization_id)));

-- 10. Document Lines
CREATE POLICY select_document_lines ON public.document_lines
    FOR SELECT USING (EXISTS (SELECT 1 FROM public.documents d WHERE d.id = document_id AND public.has_org_access(d.organization_id)));
CREATE POLICY manage_document_lines ON public.document_lines
    FOR ALL USING (EXISTS (SELECT 1 FROM public.documents d WHERE d.id = document_id AND public.has_org_access(d.organization_id)));

-- 11. Reconciliations
CREATE POLICY select_reconciliations ON public.reconciliations
    FOR SELECT USING (public.has_org_access(organization_id));
CREATE POLICY manage_reconciliations ON public.reconciliations
    FOR ALL USING (public.has_org_access(organization_id));

-- 12. Payments
CREATE POLICY select_payments ON public.payments
    FOR SELECT USING (public.has_org_access(organization_id));
CREATE POLICY manage_payments ON public.payments
    FOR ALL USING (public.has_org_access(organization_id));

-- 13. Daily Closings
CREATE POLICY select_daily_closings ON public.daily_closings
    FOR SELECT USING (public.has_org_access(organization_id));
CREATE POLICY manage_daily_closings ON public.daily_closings
    FOR ALL USING (public.has_org_access(organization_id));

-- 14. Audit Log
CREATE POLICY select_audit_log ON public.audit_log
    FOR SELECT USING (public.has_org_access(organization_id));
