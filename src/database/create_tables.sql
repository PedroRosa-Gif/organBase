CREATE TABLE paciente (
  rg_paciente varchar(12) PRIMARY key,
  nome varchar(50) NOT NULL,
  data_nascimento date NOT NULL,
  tipo_doacao varchar(20) NOT NULL,
  prioridade int,
  tipo_sanguineo varchar(3) NOT NULL,
  cidade varchar(50) NOT NULL
);
 
CREATE TABLE hospital (
  id_hospital int PRIMARY KEY AUTO_INCREMENT,
  nome varchar(50) NOT NULL,
  cidade varchar(50) NOT NULL
);
 
CREATE TABLE doador (
  rg_doador varchar(12) PRIMARY KEY,
  nome varchar(50) NOT NULL,
  data_nascimento date NOT NULL,
  cidade varchar(50) NOT NULL,
  status_doador varchar(10) NOT NULL,
  tipo_sanguineo varchar(3) NOT NULL
);
 
CREATE TABLE doacao (
  id_doacao int PRIMARY key not NULL,
  data_doacao date NOT NULL,
  rg_paciente varchar(12),
  FOREIGN KEY (rg_paciente) REFERENCES paciente (rg_paciente),
  id_hospital int NOT NULL,
  FOREIGN KEY (id_hospital) REFERENCES hospital (id_hospital),
  rg_doador varchar(12) NOT NULL,
  FOREIGN KEY (rg_doador) REFERENCES doador (rg_doador)
);
 
CREATE TABLE sangue (
  tipo_sangue varchar(3) NOT NULL,
  quantidade int NOT NULL,
  id_doacao int PRIMARY KEY,
  FOREIGN KEY (id_doacao) REFERENCES doacao (id_doacao)
);
  
CREATE TABLE orgao (
  nome_orgao varchar(50) NOT NULL,
  status_orgao varchar(20),
  tamanho int,
  id_doacao int PRIMARY key,
  FOREIGN KEY (id_doacao) REFERENCES doacao (id_doacao)
);