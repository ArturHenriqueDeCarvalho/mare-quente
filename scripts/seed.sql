-- Script para popular a tabela products com os dados do protótipo
-- Execute este script no SQL Editor do Supabase (https://supabase.com/dashboard/project/_/sql)

-- 1. Inserir TOPS
INSERT INTO public.products (id, type, name, print, collection, gradient, price, published, variants) VALUES
('11111111-1111-1111-1111-111111111111', 'top', 'Top Cortininha', 'Pôr do Sol', 'Verão 26', 'linear-gradient(150deg,#FF9A5B,#FF6F91,#C42C6E)', 89.9, true, '[{"size": "PP", "stock": 8}, {"size": "P", "stock": 14}, {"size": "M", "stock": 22}, {"size": "G", "stock": 11}, {"size": "GG", "stock": 3}]'),
('22222222-2222-2222-2222-222222222222', 'top', 'Top Tomara que Caia', 'Coral Liso', 'Verão 26', 'linear-gradient(150deg,#FFB877,#FF7A6B)', 99.9, true, '[{"size": "PP", "stock": 5}, {"size": "P", "stock": 9}, {"size": "M", "stock": 0}, {"size": "G", "stock": 7}, {"size": "GG", "stock": 4}]'),
('33333333-3333-3333-3333-333333333333', 'top', 'Top Triângulo', 'Rosé', 'Verão 26', 'linear-gradient(150deg,#FFC2D1,#FF6F91)', 79.9, true, '[{"size": "PP", "stock": 12}, {"size": "P", "stock": 18}, {"size": "M", "stock": 25}, {"size": "G", "stock": 14}, {"size": "GG", "stock": 6}]'),
('44444444-4444-4444-4444-444444444444', 'top', 'Top Frente Única', 'Tropical', 'Tropicália', 'linear-gradient(150deg,#FFD36E,#FF7A6B,#D94C8E)', 109.9, true, '[{"size": "PP", "stock": 3}, {"size": "P", "stock": 6}, {"size": "M", "stock": 9}, {"size": "G", "stock": 4}, {"size": "GG", "stock": 2}]'),
('55555555-5555-5555-5555-555555555555', 'top', 'Top Faixa', 'Oceano', 'Tropicália', 'linear-gradient(150deg,#7FE0D4,#3BA7C4)', 84.9, true, '[{"size": "PP", "stock": 0}, {"size": "P", "stock": 2}, {"size": "M", "stock": 4}, {"size": "G", "stock": 1}, {"size": "GG", "stock": 0}]'),
('66666666-6666-6666-6666-666666666666', 'top', 'Top Cropped', 'Folhagem', 'Tropicália', 'linear-gradient(150deg,#A7E0A0,#3FA56B)', 94.9, true, '[{"size": "PP", "stock": 9}, {"size": "P", "stock": 13}, {"size": "M", "stock": 16}, {"size": "G", "stock": 8}, {"size": "GG", "stock": 5}]');

-- 2. Inserir BOTTOMS
INSERT INTO public.products (id, type, name, print, collection, gradient, price, published, variants) VALUES
('77777777-7777-7777-7777-777777777777', 'bottom', 'Calcinha Fio Duplo', 'Pôr do Sol', 'Verão 26', 'linear-gradient(150deg,#FF9A5B,#FF6F91,#C42C6E)', 79.9, true, '[{"size": "36", "stock": 6}, {"size": "38", "stock": 12}, {"size": "40", "stock": 18}, {"size": "42", "stock": 9}, {"size": "44", "stock": 4}]'),
('88888888-8888-8888-8888-888888888888', 'bottom', 'Calcinha Cintura Alta', 'Coral Liso', 'Verão 26', 'linear-gradient(150deg,#FFB877,#FF7A6B)', 89.9, true, '[{"size": "36", "stock": 4}, {"size": "38", "stock": 8}, {"size": "40", "stock": 11}, {"size": "42", "stock": 0}, {"size": "44", "stock": 3}]'),
('99999999-9999-9999-9999-999999999999', 'bottom', 'Calcinha Asa Delta', 'Rosé', 'Verão 26', 'linear-gradient(150deg,#FFC2D1,#FF6F91)', 74.9, true, '[{"size": "36", "stock": 10}, {"size": "38", "stock": 15}, {"size": "40", "stock": 20}, {"size": "42", "stock": 12}, {"size": "44", "stock": 5}]'),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'bottom', 'Calcinha Hot Pant', 'Tropical', 'Tropicália', 'linear-gradient(150deg,#FFD36E,#FF7A6B,#D94C8E)', 99.9, true, '[{"size": "36", "stock": 2}, {"size": "38", "stock": 5}, {"size": "40", "stock": 7}, {"size": "42", "stock": 3}, {"size": "44", "stock": 1}]'),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'bottom', 'Calcinha Lacinho', 'Areia', 'Tropicália', 'linear-gradient(150deg,#FFE7D6,#E7B98E)', 69.9, true, '[{"size": "36", "stock": 7}, {"size": "38", "stock": 11}, {"size": "40", "stock": 14}, {"size": "42", "stock": 6}, {"size": "44", "stock": 2}]'),
('cccccccc-cccc-cccc-cccc-cccccccccccc', 'bottom', 'Calcinha Tiras', 'Vinho', 'Tropicália', 'linear-gradient(150deg,#E0779F,#7A1745)', 84.9, true, '[{"size": "36", "stock": 0}, {"size": "38", "stock": 1}, {"size": "40", "stock": 0}, {"size": "42", "stock": 0}, {"size": "44", "stock": 0}]');

-- 3. Inserir CONJUNTOS
INSERT INTO public.products (id, type, name, print, collection, gradient, price, published, variants, top_ref, bottom_ref) VALUES
('dddddddd-dddd-dddd-dddd-dddddddddddd', 'set', 'Conjunto Pôr do Sol', 'Pôr do Sol', 'Verão 26', 'linear-gradient(150deg,#FF9A5B,#FF6F91,#C42C6E)', 159.9, true, '[]', '11111111-1111-1111-1111-111111111111', '77777777-7777-7777-7777-777777777777'),
('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'set', 'Conjunto Rosé', 'Rosé', 'Verão 26', 'linear-gradient(150deg,#FFC2D1,#FF6F91)', 144.9, true, '[]', '33333333-3333-3333-3333-333333333333', '99999999-9999-9999-9999-999999999999'),
('ffffffff-ffff-ffff-ffff-ffffffffffff', 'set', 'Conjunto Tropicália', 'Tropical', 'Tropicália', 'linear-gradient(150deg,#FFD36E,#FF7A6B,#D94C8E)', 189.9, true, '[]', '44444444-4444-4444-4444-444444444444', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa');

-- 4. Criar Usuário Admin Inicial (Artur Carvalho)
WITH new_user AS (
  INSERT INTO auth.users (
    instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
  ) VALUES (
    '00000000-0000-0000-0000-000000000000',
    uuid_generate_v4(),
    'authenticated',
    'authenticated',
    'arturcaarvalho@gmail.com',
    crypt('Mare-1234', gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}',
    '{"name":"Artur Carvalho"}',
    now(),
    now()
  ) RETURNING id, email
)
INSERT INTO public.users (id, email, name, role, status)
SELECT id, email, 'Artur Carvalho', 'admin', 'active' FROM new_user;
