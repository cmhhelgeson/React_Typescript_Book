CREATE DATABASE NewsSite;

CREATE TABLE posts(
    post_id SERIAL PRIMARY KEY, 
    description VARCHAR(255),
    title VARCHAR(1023),
    date VARCHAR(255),
    category VARCHAR(255),
    source VARCHAR(255),
    image VARCHAR(255),
    lead VARCHAR(255),
    content VARCHAR(4095)
);


