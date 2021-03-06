BEGIN;

DROP TABLE IF EXISTS users, blog_posts CASCADE; 

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(225) NOT NULL,
    password VARCHAR(100) NOT NULL
);

CREATE TABLE blog_posts (
    id SERIAL PRIMARY KEY,
    author_id INTEGER REFERENCES users(id),
    post TEXT NOT NULL,
    post_date DATE NOT NULL DEFAULT CURRENT_DATE 
);

INSERT INTO users (username, password) VALUES 
  ('gio', '123'), 
  ('campbel', '234'), 
  ('vatsal', '567'), 
  ('lizzy', '567'),
  ('camboi', '$2a$10$683SWebJ8SmhP5tZESjB1eXqEwplEPXHxTb6E2zNgFOOGQww7ihQK')
;

INSERT INTO blog_posts (author_id, post) VALUES 
  (1, 'This is the best site for cookies'),
  (2, 'Really?'),
  (3, 'Yep - where else can you talk about cookies all day long?'),
  (4, 'True, Twitter has nothing on us'),
  (1, 'One more')
;

COMMIT;