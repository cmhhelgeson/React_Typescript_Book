CREATE DATABASE NewsSite;

CREATE TABLE posts(
    id SERIAL PRIMARY KEY, 
    title TEXT,
    date TEXT,
    category TEXT,
    source TEXT,
    image TEXT,
    lead TEXT,
    content TEXT
);

CREATE TABLE categories(
    id SERIAL PRIMARY KEY,
    text TEXT
);


