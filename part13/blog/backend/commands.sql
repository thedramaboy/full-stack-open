CREATE TABLE blog (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes integer DEFAULT 0
);

insert into blog (author, url, title) values ('E-SAN', 'https://overreacted.io/on-let-vs-const/', 'On let vs const');
insert into blogs (author, url, title, likes) values ('MW4', 'https://www.cybertec-postgresql.com/en/gaps-in-sequences-postgresql/', 'Gaps in sequences in PostgreSQL', 3);