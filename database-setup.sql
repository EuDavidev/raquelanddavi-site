-- Script de Configuração do Banco de Dados MySQL
-- Para ser executado no Railway ou qualquer cliente MySQL

-- Criar tabela Categoria
CREATE TABLE IF NOT EXISTS Categoria (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) UNIQUE NOT NULL,
  descricao TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Criar tabela Presente
CREATE TABLE IF NOT EXISTS Presente (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  descricao TEXT,
  preco FLOAT,
  link VARCHAR(255),
  imagem VARCHAR(255),
  reservado BOOLEAN DEFAULT FALSE,
  reservadoPor VARCHAR(100),
  email VARCHAR(255),
  mensagem TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  categoriaId INT,
  FOREIGN KEY (categoriaId) REFERENCES Categoria(id)
);

-- Inserir categorias padrão
INSERT IGNORE INTO Categoria (nome, descricao) VALUES
('Casa', 'Presentes para casa e decoração'),
('Tecnologia', 'Produtos tecnológicos e gadgets'),
('Moda', 'Roupas, acessórios e calçados'),
('Experiências', 'Experiências, passeios e viagens'),
('Livros', 'Livros e materiais de leitura'),
('Esportes', 'Produtos esportivos e fitness'),
('Beleza', 'Produtos de beleza e cuidados pessoais'),
('Outros', 'Outros tipos de presentes');

-- Inserir alguns presentes de exemplo (opcional)
INSERT IGNORE INTO Presente (nome, descricao, preco, link, categoriaId) VALUES
('Jogo de Panelas', 'Conjunto de panelas antiaderentes', 299.99, 'https://exemplo.com/panelas', 1),
('Smartphone', 'Smartphone último modelo', 1999.99, 'https://exemplo.com/smartphone', 2),
('Camiseta Básica', 'Camiseta 100% algodão', 49.99, 'https://exemplo.com/camiseta', 3),
('Ingresso Cinema', 'Ingresso para 2 pessoas', 40.00, 'https://exemplo.com/cinema', 4);

-- Verificar se as tabelas foram criadas
SELECT 'Categoria' as tabela, COUNT(*) as registros FROM Categoria
UNION ALL
SELECT 'Presente' as tabela, COUNT(*) as registros FROM Presente;

-- Mostrar estrutura das tabelas
DESCRIBE Categoria;
DESCRIBE Presente; 
