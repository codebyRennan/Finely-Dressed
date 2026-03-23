# 👔 Finely Dressed

<div align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
</div>

<br>

**Finely Dressed** é uma aplicação web de consultoria de moda pessoal interativa, desenvolvida para sugerir looks baseados em variáveis climáticas, ocasiões e estilos. O projeto foca em oferecer uma experiência premium ao usuário interligando interfaces de *Glassmorphism*, temas dinâmicos e gamificação.

Construído inteiramente em **Frontend Puro (Vanilla JS)** — sem o uso de bibliotecas de componentes, frameworks (React/Vue/Angular) ou dependências externas pesadas —, o projeto destaca o domínio e alta perfomance da linguagem fundamental da web combinada a designs extremamente sofisticados.

---

## 🚀 Funcionalidades Principais por Módulo

### 1. Sistema Dinâmico de Sugestões (`Finely-Dressed.html`)
A página principal atua como o motor do aplicativo. 
- **Lógica de Decisão:** O usuário alimenta um formulário com o estado climático atual, a ocasião e o seu humor/estilo.
- **Renderização Dinâmica:** Um algoritmo intercala a submissão, cruza as combinações exigidas e manipula a DOM instantaneamente para exibir aos olhos do usuário uma moldura final (Glass Card). O card retorna uma imagem em alta resolução e a listagem técnica das peças que formam o "traje selecionado".

### 2. Closet Virtual Gamificado (`closet.html`)
Uma extensão interativa em forma de tabuleiros de *Drop Zone* para que o(a) usuário(a) gerencie suas próprias roupas de maneira lúdica.
- **Drag & Drop HTML5 API:** As Caixas de visualização do closet de origem são seguráveis e transportáveis dinâmicamente soltas pela tela até o painel de montagem final.
- **Fallback Cross-Device Interativo:** Celulares costumam travar animações literais nativas de ponteiro quando o dedo tenta arrastar algo pesado nativo em HTML. Para garantir o suporte perfeitamente responsivo, ativei Fallbacks nos eventListeners: clicar na peça em tela fina de smartphone instantaneamente arremessa a caixa bidirecionalmente pelo sistema como se tivesse sido carregada nos braços.
- **CSS Grid e UX Components:** Os blocos de itens são travados em malha simétrica 1:1 para ficarem simetricamente quadrados independente de quantos blocos estejam dentro da Fileira Origem. Toasts efêmeros temporizados reagem a apagamentos em massa dando opções ativas de botão para `Undo` (Desfazer).

### 3. Login com Segurança Client-Side (`login.html`)
Apresenta um layout seguro blindado por checagens reativas de interface, pronto para escalar.
- **Validações DOM:** Checagens formativas nativas com auxílio JS impedindo burla de formatação por parte do usuário (email restritivo, preenchimento ativo e senhas minúsculas bloqueadas).
- **Time Out Defense (Anti-Brute Force):** O sessionStorage mapeia todas as inserções tentadas erroneamente. Após cinco falhas de login o formulário é petrificado por intervalo punitivo (30s) sem demandar banco de dados server-side pra reprimir enchentes de rede (Flooding).
- Ocultamento seguro nativo dos códigos de digitação.

---

## 💻 Destaques Técnicos & Engenharia Front-end

O projeto exalta práticas de vanguarda que o blindam contra falhas de renderização em hospedagens diversas e a famosa síndrome *"Works on my Machine"* (Funcionava antes no meu Computador). Tudo rodará e abrirá independente do contexto de host (Vercel, GitHub Pages) ou abrindo direto pelo Pendrive/PC.

*   🌗 **Dark / Light Mode Nativo via Set-Attributes:** Controle da iluminação inteira do site comandado num único Toggle da Navbar atrelado a root `<html data-theme="dark">`. As refrações dependem integralmente de blocos lógicos de **CSS Variables Globais (--var)**; ou seja: uma re-renderização universal limpa instantânea de centenas de classes com duas linhas de alteração nativa no script, banindo duplicação colossal de CSS.
*   💾 **Persistência de Estado Local:** Integração modular com a memória Cache do navegador Web (`localStorage`), garantindo imunidade de escolhas aos reloads da tela ou saltos para outras abas. O site reaparecerá no tom setado previamente.
*   🎨 **Glassmorphism Pattern:** Design com forte viés de futurismo estético e harmonia baseada em *UI/UX Clean*. Propriedades dinâmicas de refrações translucidas (`backdrop-filter`) contornam cards opacos para evidenciar o papel de parede escuro/claro que engloba a aplicação com requinte avançado.
*   📱 **Arquitetura Totalmente Responsiva:** Estruturas engarrafantes como `display: none` foram substituídas por redes inteligentes baseadas nas reações encolhíveis do **Flex-Wrap & Grids**. Em qualquer tablet ou smartphone, as barras laterais, textos gradientes (`webkit-text-fill`) e cartões adaptam sua colagem visual caindo amigavelmente por quebra de linha visual.

---

## 🛠 Como Executar / Testar na sua Máquina

Isento de pesados empacotadores (Node, NPM, Webpack), rode-o instataneamente:

1. Clone o projeto de repositório de versão.
2. Inicie o arquivo puramente através de duplo-clique no indexador `Finely-Dressed.html`. Seu navegador padrão cuidará do resto isoladamente!

*(Acesso prévio de Demonstração fixado no arquivo de script para testes de login):*
> - Usuário: `usuario@finely.com`
> - Senha: `finely123`

---
*Feito com 💡 criatividade, dedicação acadêmica estrita de conceitos e foco na beleza fundamental do código estático puro por Rennan.*