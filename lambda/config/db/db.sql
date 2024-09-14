CREATE TABLE 
  IF NOT EXISTS users_vote (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL UNIQUE,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    uf VARCHAR(2) NOT NULL,
    city VARCHAR(100) NOT NULL,
    confirmed_vote BOOLEAN NOT NULL DEFAULT FALSE,
    confirmed_phone BOOLEAN NOT NULL DEFAULT FALSE,
    date_create TIMESTAMP NOT NULL DEFAULT CURRENT_DATE,
    date_vote TIMESTAMP,
    percentage_vote NUMERIC(5, 2),
    last_ip VARCHAR(15)
  );

CREATE TABLE
  IF NOT EXISTS confirmed_phone (
    id SERIAL PRIMARY KEY,
    phone VARCHAR(20) NOT NULL,
    id_user INTEGER REFERENCES users_vote (id) NOT NULL, 
    expiration_date TIMESTAMP NOT NULL DEFAULT CURRENT_DATE,
    code VARCHAR(6)
  );

CREATE TABLE
  IF NOT EXISTS users_vote_confirmed_phone_association (
    id SERIAL PRIMARY KEY,
    id_user INTEGER,
    id_confirmed_phone INTEGER,
    FOREIGN KEY (id_user) REFERENCES users_vote (id),
    FOREIGN KEY (id_confirmed_phone) REFERENCES confirmed_phone (id),
    UNIQUE (id_user, id_confirmed_phone)
  )
  