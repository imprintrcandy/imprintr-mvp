
UPDATE "Users"
SET role = 'super_admin'
WHERE id = (SELECT id FROM auth.users WHERE email = 'leadgendarycandy@gmail.com');
