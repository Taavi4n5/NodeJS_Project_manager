INSERT INTO users (firstName, lastName, email, password, role)
    VALUES 
    ('Mari', 'Maasikas', 'mari@maasikas.ee', '$2b$10$f49k6fH8lM9IGTGLY3wJCOZjcedArbTXlBXepy2z1CA4TZkS2XfCS', 'Admin');
    
INSERT INTO projects (title, content, projectStatusId, userId)
    VALUES ('reacti mäng', 'loon ühe reacti mängu', 1, 1);

INSERT INTO projectstatuses (status)
    VALUES ('avalik');

INSERT INTO comments (content, projectId, userId)
    VALUES 
    ('This is a comment', 1, 1);