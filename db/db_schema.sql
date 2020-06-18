CREATE DATABASE workout_app;

CREATE TABLE workout_user(
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50),
    email VARCHAR(100),
    password VARCHAR(100)
);

CREATE TABLE workout(
    workout_id  SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    description VARCHAR(300),
    duration VARCHAR(300),
    posted_on TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES workout_user(user_id) ON DELETE CASCADE
);