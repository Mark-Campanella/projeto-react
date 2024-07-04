-- Estrutura da tabela `categoria`
--

CREATE TABLE `categoria` (
  `id` int(11) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `data_inc` datetime NOT NULL,
  `data_alt` datetime DEFAULT NULL,
  `status` char(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `categoria`
--

INSERT INTO `categoria` (`id`, `nome`, `data_inc`, `data_alt`, `status`) VALUES
(1, 'Polícia', '2024-06-28 13:55:52', NULL, 'S');

-- --------------------------------------------------------

--
-- Estrutura da tabela `fabricante`
--

CREATE TABLE `fabricante` (
  `id` int(11) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `endereco` varchar(80) NOT NULL,
  `cidade` varchar(50) NOT NULL,
  `bairro` varchar(50) NOT NULL,
  `estado` char(2) NOT NULL,
  `data_inc` datetime NOT NULL,
  `data_alt` datetime DEFAULT NULL,
  `status` char(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `fabricante`
--

INSERT INTO `fabricante` (`id`, `nome`, `endereco`, `cidade`, `bairro`, `estado`, `data_inc`, `data_alt`, `status`) VALUES
(1, 'Marcos Henrique Maimoni Campanella', 'Rua 1', 'Hell Claro', 'Centro', 'SP', '2024-06-28 15:04:29', '2024-06-28 15:13:53', 'S');

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `nome` varchar(45) NOT NULL,
  `senha` varchar(45) NOT NULL,
  `data_inc` datetime NOT NULL,
  `data_alt` datetime NOT NULL,
  `status` char(1) NOT NULL,
  `email` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `usuario`
--

INSERT INTO `usuario` (`id`, `nome`, `senha`, `data_inc`, `data_alt`, `status`, `email`) VALUES
(2, 'testeAltera', '123', '2024-06-21 14:51:26', '0000-00-00 00:00:00', 'S', 'teste@gmail.com'),
(3, 'kaliningrado ', 'Ce}m%\"n6QQ_YgFG', '2024-06-21 13:07:40', '2024-06-28 12:25:56', 'N', 'kaliningrado@gmail.com'),
(14, 'João da Silva', 'Ce}m%\"n6QQ_YgFG', '2024-06-28 12:25:19', '0000-00-00 00:00:00', 'S', 'jaodasilva@gmail.com');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `fabricante`
--
ALTER TABLE `fabricante`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `categoria`
--
ALTER TABLE `categoria`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `fabricante`
--
ALTER TABLE `fabricante`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
