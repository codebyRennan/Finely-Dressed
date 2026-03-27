# 👔 Finely Dressed

<div align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white" alt="OpenAI" />
</div>

<br>

**Finely Dressed** é uma plataforma Full Stack de consultoria de moda inteligente desenvolvida como projeto principal para a disciplina de **Prototipagem de Sistemas Computacionais**. 

O objetivo do projeto é resolver o dilema diário da escolha de vestuário através de tecnologia, unindo dados climáticos em tempo real, estado emocional do usuário e preferências estéticas pessoais para gerar recomendações de looks personalizados e assertivos.

---

## 🎯 Propósito e Valor

O Finely Dressed foi criado para ser mais do que um simples catálogo de roupas. Ele atua como um assistente pessoal que:
- **Otimiza o tempo:** Elimina a indecisão matinal sugerindo o traje ideal em segundos.
- **Garante Conforto:** Integra APIs de clima para assegurar que a sugestão seja adequada à temperatura e condições locais.
- **Aprende com o Usuário:** Utiliza um sistema de preferências visual (Likes/Dislikes) para refinar o algoritmo de recomendação com base no gosto histórico.
- **Eleva a Autoestima:** Sugere combinações harmoniosas baseadas no humor e na ocasião, permitindo que o usuário se sinta bem em qualquer cenário.

---

## 🛠 Arquitetura e Stack Técnica

O projeto evoluiu de um protótipo estático para uma aplicação escalável de ponta a ponta:

*   **Frontend (React & Vite):** Uma interface moderna (Glassmorphism) e performática, focada em UX. Utiliza React Router para navegação fluida e Context API para gestão global de autenticação e temas.
*   **Backend (Node.js & Express):** Uma API REST robusta que gerencia a lógica de negócio, processamento de dados e segurança.
*   **Segurança (Auth):** Sistema de autenticação real utilizando **JWT (JSON Web Tokens)** e criptografia de senhas com **bcrypt**, garantindo que os dados do usuário estejam protegidos.
*   **Persistência (MongoDB):** Armazenamento de alta performance para perfis de usuários, histórico de preferências e banco de dados de vestuário.
*   **Inteligência (AI Integration):** Futura integração planejada com a API da OpenAI para refinamento semântico das sugestões e geração de imagens de suporte.

---

## 📂 Organização do Projeto

- **`/client`**: Todo o código-fonte da interface do usuário (React).
- **`/server`**: A infraestrutura de backend, rotas e conexão com o banco de dados (Node/Express).
- **`/prototype`**: O legado do projeto — o protótipo visual original construído em Vanilla JS que serviu de fundação para o design atual.

---

## 🚀 Como Executar o Ambiente de Desenvolvimento

Para rodar o projeto localmente, é necessário ter o **Node.js** instalado.

### 1. Clonar e Instalar
```bash
# Entre na pasta do frontend
cd client
npm install

# Entre na pasta do backend
cd server
npm install
```

### 2. Configuração
Certifique-se de configurar o arquivo `.env` na pasta `/server` com sua `MONGO_URI` (MongoDB Atlas) e `JWT_SECRET`.

### 3. Rodar as Aplicações
Em terminais separados:
```bash
# No /client
npm run dev

# No /server
node server.js
```

---
*Este projeto é uma demonstração técnica de integração Full Stack, focada na aplicação prática de conceitos de engenharia de software e design centrado no usuário por Rennan.*