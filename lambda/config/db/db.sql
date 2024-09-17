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
  IF NOT EXISTS users_vote_data (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL UNIQUE,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    uf VARCHAR(2) NOT NULL,
    city VARCHAR(100) NOT NULL,
    confirmed_vote BOOLEAN NOT NULL DEFAULT FALSE,
    date_create TIMESTAMP NOT NULL DEFAULT CURRENT_DATE,
    date_vote TIMESTAMP,
    percentage_vote NUMERIC(5, 2),
    votos JSONB
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
  );
  
CREATE TABLE
  IF NOT EXISTS users_admin (
    id SERIAL PRIMARY KEY,
		name VARCHAR(200) NOT NULL,
		username VARCHAR(100) NOT NULL,
		password VARCHAR(250) NOT NULL,
		email VARCHAR(200) NOT NULL,
		role VARCHAR(10) DEFAULT 'admin',
    last_ip VARCHAR(15),
    date_create TIMESTAMP NOT NULL DEFAULT CURRENT_DATE
  );

CREATE TABLE
	IF NOT EXISTS category (
		id SERIAL PRIMARY KEY,
		name VARCHAR(200) NOT NULL UNIQUE
	);

CREATE TABLE
	IF NOT EXISTS company (
		id SERIAL PRIMARY KEY,
		trade_name VARCHAR(250) NOT NULL,
    company_name VARCHAR(250) NOT NULL,
		cnpj VARCHAR(14) NOT NULL UNIQUE,
		associate BOOLEAN NOT NULL DEFAULT FALSE
	);

CREATE TABLE
	IF NOT EXISTS category_company_association (
		id SERIAL PRIMARY KEY,
		id_company INTEGER,
		id_category INTEGER,
		FOREIGN KEY (id_company) REFERENCES company (id),
		FOREIGN KEY (id_category) REFERENCES category (id),
		UNIQUE (id_company, id_category)
	);

CREATE TABLE
	IF NOT EXISTS votes (
		id SERIAL PRIMARY KEY,
		Id_category INTEGER,
		Id_user_quest INTEGER,
		Id_company INTEGER,
    FOREIGN KEY (id_company) REFERENCES company (id),
		FOREIGN KEY (id_category) REFERENCES category (id),
    FOREIGN KEY (Id_user_quest) REFERENCES users_vote (id)
	);

CREATE TABLE
	IF NOT EXISTS vote_not_confirmed (
		id SERIAL PRIMARY KEY,
		Id_category INTEGER,
		Id_user_quest INTEGER,
		Id_company INTEGER,
    FOREIGN KEY (id_company) REFERENCES company (id),
		FOREIGN KEY (id_category) REFERENCES category (id),
    FOREIGN KEY (Id_user_quest) REFERENCES users_vote (id)
	);