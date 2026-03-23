document.addEventListener('DOMContentLoaded', () => {
    // === Alternador de Tema (Comum para ambas as páginas) ===
    const themeToggle = document.getElementById('theme-toggle');
    const rootEl = document.documentElement;
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
        rootEl.setAttribute('data-theme', savedTheme);
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            let currentTheme = rootEl.getAttribute('data-theme') || 'light';
            let newTheme = currentTheme === 'light' ? 'dark' : 'light';
            rootEl.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    // === LÓGICA DA PÁGINA 1: FINELY DRESSED ===
    const form = document.getElementById('style-form');
    
    if (form) {
        const resultSection = document.getElementById('suggestion-result');
        const btnReset = document.getElementById('btn-reset');

        const sgImage = document.getElementById('suggestion-image');
        const sgTitle = document.getElementById('suggestion-title');
        const sgDesc = document.getElementById('suggestion-desc');
        const sgTags = document.getElementById('suggestion-tags');
        const sgItems = document.getElementById('suggestion-items');

        const database = {
            'quente-casual-masculino': {
                title: 'Summer Casual',
                desc: 'Visual leve e estiloso para enfrentar o calor com muito conforto e atitude.',
                image: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                tags: ['Básico', 'Confortável', 'Dia-a-dia'],
                items: [
                    { icon: '👕', name: 'Camiseta Básica Oversized', desc: 'Algodão leve, tom claro' },
                    { icon: '🩳', name: 'Bermuda Chino', desc: 'Cáqui ou Areia' },
                    { icon: '👟', name: 'Tênis Branco', desc: 'Casual e versátil' }
                ]
            },
            'frio-trabalho-feminino': {
                title: 'Elegância de Inverno',
                desc: 'Um look formal que te protege do frio sem perder a sofisticação corporativa.',
                image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                tags: ['Formal', 'Elegante', 'Office'],
                items: [
                    { icon: '🧥', name: 'Trench Coat', desc: 'Tom neutro (Beje ou Preto)' },
                    { icon: '👚', name: 'Blusa Gola Alta', desc: 'Tricô leve' },
                    { icon: '👖', name: 'Calça de Alfaiataria', desc: 'Corte reto' },
                    { icon: '👢', name: 'Bota de Cano Curto', desc: 'Couro escuro' }
                ]
            },
            'ameno-festa-unissex': {
                title: 'Night Out Glam',
                desc: 'Atitude streetwear para curtir a noite. Combina conforto com peças de destaque.',
                image: 'https://images.unsplash.com/photo-1492288991661-058aa541ff43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                tags: ['Streetwear', 'Urbano', 'Festa'],
                items: [
                    { icon: '🧥', name: 'Jaqueta de Couro', desc: 'Preta, estilo Biker' },
                    { icon: '👕', name: 'T-Shirt Estampada', desc: 'Banda/Arte abstrata' },
                    { icon: '👖', name: 'Calça Cargo', desc: 'Preta ou Verde Militar' },
                    { icon: '👟', name: 'Sneaker High-Top', desc: 'Destacado e confortável' }
                ]
            },
            'frio-casual-masculino': {
                title: 'Winter Street',
                desc: 'Camadas estilosas e confortáveis para aproveitar os dias frios na cidade.',
                image: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                tags: ['Street', 'Inverno', 'Casual'],
                items: [
                    { icon: '🧥', name: 'Jaqueta Puffer', desc: 'Matelassê escuro' },
                    { icon: '👕', name: 'Moletom', desc: 'Com capuz, tom neutro' },
                    { icon: '👖', name: 'Calça Jeans', desc: 'Lavagem escura, reta' },
                    { icon: '👟', name: 'Bota Casual', desc: 'Couro e cardarço' }
                ]
            },
            'quente-festa-feminino': {
                title: 'Sunset Vibes',
                desc: 'Um look fluido e marcante para aproveitar festas nos dias ou noites quentes.',
                image: 'https://images.unsplash.com/photo-1502716119720-b23a93e5fe8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                tags: ['Festa', 'Verão', 'Marcante'],
                items: [
                    { icon: '👗', name: 'Vestido Midi Fluido', desc: 'Seda ou viscose' },
                    { icon: '👡', name: 'Sandália de Tiras', desc: 'Salto bloco' },
                    { icon: '👜', name: 'Bolsa Pequena', desc: 'Acessório de destaque' }
                ]
            }
        };

        const fallbackDb = {
            title: 'Estilo Adaptável',
            desc: 'Uma combinação versátil e equilibrada, perfeitamente adaptada para esta ocasião e clima.',
            image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            tags: ['Versátil', 'Estiloso', 'Dinâmico'],
            items: [
                { icon: '👕', name: 'Peça Superior Chave', desc: 'Adaptada ao clima informado' },
                { icon: '👖', name: 'Peça Inferior Confortável', desc: 'Corte moderno e flexível' },
                { icon: '👟', name: 'Calçado Adequado', desc: 'Design que combina com a ocasião' }
            ]
        };

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const weather = document.getElementById('weather').value;
            const occasion = document.getElementById('occasion').value;
            const style = document.getElementById('style').value;

            const key = `${weather}-${occasion}-${style}`;
            const suggestion = database[key] || fallbackDb;

            sgTitle.textContent = suggestion.title;
            sgDesc.textContent = suggestion.desc;
            
            sgImage.src = '';
            setTimeout(() => {
                sgImage.src = suggestion.image;
            }, 50);

            sgTags.innerHTML = suggestion.tags.map(tag => `<span class="tag">${tag}</span>`).join('');

            sgItems.innerHTML = suggestion.items.map(item => `
                <div class="item">
                    <div class="item-icon">${item.icon}</div>
                    <div class="item-details">
                        <h4>${item.name}</h4>
                        <span>${item.desc}</span>
                    </div>
                </div>
            `).join('');

            form.closest('.main-generator').classList.add('hidden');
            resultSection.classList.remove('hidden');
            
            setTimeout(() => {
                resultSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 100);
        });

        if (btnReset) {
            btnReset.addEventListener('click', () => {
                // Redireciona para a página de expansão conforme requisitado
                window.location.href = 'expansao.html';
            });
        }
    }

    // === LÓGICA DA PÁGINA 2: EXPANSAO.HTML (Closet Virtual) ===
    const rec1 = document.getElementById('rec1-chosen');
    const rec2 = document.getElementById('rec2-collector');
    const rec3 = document.getElementById('rec3-closet');
    const toast = document.getElementById('toast');
    const btnUndo = document.getElementById('btn-undo');
    
    if (rec1 && rec2 && rec3) {
        let draggedItem = null;
        let lastRemovedBoxes = [];
        let toastTimeout;

        // Configuração Padrão das roupas (Draggable)
        const setupBox = (box) => {
            box.addEventListener('dragstart', function() {
                draggedItem = this;
                setTimeout(() => this.classList.add('dragging'), 0);
            });
            box.addEventListener('dragend', function() {
                setTimeout(() => {
                    this.classList.remove('dragging');
                    draggedItem = null;
                }, 0);
            });
            
            // Regra Híbrida para Mobile: Clicar substitui a necessidade de arrastar!
            box.addEventListener('click', function() {
                if (this.parentElement === rec1) {
                    rec3.appendChild(this);
                } else if (this.parentElement === rec3) {
                    rec1.appendChild(this);
                }
            });
        };

        // Aplica o setup em todas as caixas iniciais
        const clothingBoxes = document.querySelectorAll('.clothing-box');
        clothingBoxes.forEach(setupBox);

        // Retângulos 1 e 2 reagem a elementos arrastados (Drop zones)
        [rec1, rec2].forEach(zone => {
            zone.addEventListener('dragover', (e) => {
                e.preventDefault(); // Permite o drop no box
                zone.classList.add('drag-over'); // Dá o retorno visual solicitado
            });
            zone.addEventListener('dragleave', () => {
                zone.classList.remove('drag-over');
            });
            zone.addEventListener('drop', (e) => {
                e.preventDefault();
                zone.classList.remove('drag-over');
                if (draggedItem) {
                    // Independente de onde soltou (Rec 1 ou 2), a caixa sempre é puxada para o Rec 1
                    rec1.appendChild(draggedItem);
                }
            });
        });

        // Clique no Retângulo 2 devolve TODAS as roupas para o closet original (Retângulo 3)
        rec2.addEventListener('click', (e) => {
            // Se clicar exatamente no rec2 e não nas caixas arrastadas
            if (rec1.children.length > 0) {
                // Salva estado para botão de desfazer
                lastRemovedBoxes = Array.from(rec1.children);
                
                // Remove visualmente movendo massivamente para rec3
                lastRemovedBoxes.forEach(box => rec3.appendChild(box));
                
                // Exibe o Toast animado de Notificação
                toast.classList.remove('hidden');
                clearTimeout(toastTimeout);
                toastTimeout = setTimeout(() => {
                    toast.classList.add('hidden');
                }, 4000);
            }
        });

        // Botão de Desfazer The Toast (Volta o que estava no Rec1)
        if (btnUndo) {
            btnUndo.addEventListener('click', () => {
                lastRemovedBoxes.forEach(box => rec1.appendChild(box));
                lastRemovedBoxes = []; // Limpa cache
                // Esconde e encerra o toast
                toast.classList.add('hidden');
                clearTimeout(toastTimeout);
            });
        }

        // === Retângulo 4: Revelar Estilo ===
        const btnReveal = document.getElementById('btn-reveal-style');
        const styleResult = document.getElementById('style-result');
        const btnReload = document.getElementById('btn-reload-style');

        if (btnReveal) {
            btnReveal.addEventListener('click', () => {
                btnReveal.classList.add('hidden');
                styleResult.classList.remove('hidden');
            });
        }
        
        // Botão Oculto disfarçado do lado do manequim
        if (btnReload) {
            btnReload.addEventListener('click', () => {
                // Traz o botão tampa colorido de volta para "Resetar"
                styleResult.classList.add('hidden');
                btnReveal.classList.remove('hidden');
            });
        }
    }
});
