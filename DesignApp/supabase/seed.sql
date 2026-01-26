-- Seed data for Saudade App
-- Insert initial organization
INSERT INTO public.organizations (id, name, slug)
VALUES ('00000000-0000-0000-0000-000000000001', 'Saudade', 'saudade')
ON CONFLICT (slug) DO NOTHING;

-- Insert 7 standard categories
INSERT INTO public.categories (organization_id, name, code, color, "order")
VALUES 
    ('00000000-0000-0000-0000-000000000001', 'Carne', 'CARNE', '#ef4444', 1),
    ('00000000-0000-0000-0000-000000000001', 'Cucina', 'CUCINA', '#f97316', 2),
    ('00000000-0000-0000-0000-000000000001', 'Vini', 'VINI', '#8b5cf6', 3),
    ('00000000-0000-0000-0000-000000000001', 'Bar / Beverage', 'BEVERAGE', '#3b82f6', 4),
    ('00000000-0000-0000-0000-000000000001', 'Materiale di consumo', 'CONSUMO', '#64748b', 5),
    ('00000000-0000-0000-0000-000000000001', 'Manutenzioni', 'MANUTENZIONE', '#facc15', 6),
    ('00000000-0000-0000-0000-000000000001', 'Servizi', 'SERVIZI', '#10b981', 7)
ON CONFLICT DO NOTHING;
