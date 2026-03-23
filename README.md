# Finely Dressed
## Um site que sugere roupas conforme mudanças climáticas e humor do(a) usuário(a).

Com lógica estruturada para fazer análises e ter aproximação da sugestão que o(a) usuário(a) vai gostar.

---

### Visão Geral & Documentação Completa
O **Finely Dressed** é uma aplicação frontend puramente idealizada sem a necessidade de processadores em backend para funcionar. Construída numa interface visual moderna (*Glassmorphism* & *Gradients*), ela dispõe de duas camadas/páginas de experiência.

1. **O Formulário Principal (`Finely-Dressed.html`)**: Sua base de entrada. O usuário escolhe no Select as temperaturas atreladas ao humor ou formalidade do roteiro. Por fim, uma estrutura de base de dados estática Javascript intercepta e sugere em um Glass Card o outfit perfeitamente modelado para o dia.
2. **O Closet Virtual (`expansao.html`)**: Tela conectada pelo botão "Expanda Suas Sugestões". É onde o gamification acontece. Você interage empilhando caixas do seu guarda-roupa fonte até as suas seleções pré-idealizadas usando tecnologia nativa **Drag and Drop**. Como suporte pleno à navegação por touch (mobile friendly), as interações foram enraizadas também no "Click-to-move". Ou seja: clicou, espelhou a roupa na tela! Retângulos dinâmicos interceptam a devolução das peças. O revelador de Estilos oculto e um botão simulado de Reload variam o output final da tela.

✅ **Acessibilidade Universal Escura/Clara:** O botão de Sol/Lua implementado intercepta a classe root, modificando ativamente o CSS e transitando o site em Modo Claro e Escuro. O Javascript salva imediatamente os dados no ambiente do "Local Storage".

---

### Diagnóstico de Variáveis e Classes Não-Usadas (Limpeza)

* **HTML (`Finely-Dressed.html`)**: O esqueleto está perfeitamente sucinto. Todo atributo, ID e classe listados integram e interagem diretamente com os componentes visuais ou com os chamados lógicos. O código está livre de lixos obsoletos.
* **JavaScript (`script.js`)**: O JavaScript lida com dezenas de manipulações diretas na DOM. Não existe nenhuma constante de array ou objeto que esteja instanciada ocupando espaço de processamento sem real execução. Tudo tem sua função em tempo real.
* **CSS (`style.css`)**: **Limpeza realizada**. Foram identificadas e removidas as variáveis mortas de `--select-arrow` (`%2364748b`) nos blocos globais (protótipos esquecidos pela formatação das backgrounds vectoriales imersas nativamente). A exclusão reduziu a redundância.

---

### Testes de Portabilidade e Erro: "Na minha máquina funciona"

Problemas críticos clássicos de Deploys onde aplicações que rodam na máquina do criador local e quebram no celular da equipe foram 100% estagnados de antemão.

**Defesas implementadas na Aplicação:**
1. **Fallback Mobile de Click Mode:**  Celulares Android e iPhones frequentemente bugam nas APIs limpas de "*Drag and Drop*" nativa se empilhados com scroll. Como contorno 100% responsivo, criamos o *Fallback*: o que seria deslizado usando o mouse agora é magicamente transacionado **somente no Tocar (onclick) da mesma tag**, fazendo os quadradinhos pularem entre o menu e os armários dinamicamente na tela mobile de forma limpa. A Navbar não soma mais com Media Queries negativas no celular, garantindo os botões flutuando flexíveis em Wrap Grid abaixo do cabeçalho.
2. **Pathings Relacionais Dinâmicos:** Nenhuma raiz do site tenta cavar HD local procurando fotos. Imagens em Grid demandam links portados direto das pontas seguras da web (Unsplash Cloud Content). O site vive em um Drive ou num celular de forma isenta.
3. **Imunizador OS (Case-Sensitivity):** Linux enxerga e colapsa com diferenças de caixas altas no build de subida (`Script.js` e `script.js` são conflitantes). Fechamos amarrações literais e litúrgicas pra que todas as declarações sigam lowercase universais.
4. **Isolamento de Segurança CORS HTTP Node.js:** Como estruturamos sem o tag type modular `<module>`, todo o JS processa o App sem bloqueio do navegador (erro que impeditiva testadores remotos que clicassem duas vezes no arquivo com terminação `file:///` para ver a arte). Não se faz necessário montar Node Hosts locais para visualizar o trabalho em grupo!