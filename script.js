document.addEventListener('DOMContentLoaded', () => {
    // Alternador de Tema (Dark/Light)
    const themeToggle = document.getElementById('theme-toggle');
    const rootEl = document.documentElement;
    const savedTheme = localStorage.getItem('theme');
    
    // Recupera do HD do User o tema desejado, se não houver será light
    if (savedTheme) {
        rootEl.setAttribute('data-theme', savedTheme);
    }
    
    // Ouve o Clique no Botão lua/sol e inverte a classe global
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            let currentTheme = rootEl.getAttribute('data-theme') || 'light';
            let newTheme = currentTheme === 'light' ? 'dark' : 'light';
            rootEl.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    const form = document.getElementById('style-form');
    const resultSection = document.getElementById('suggestion-result');
    const btnReset = document.getElementById('btn-reset');

    // UI Elements to update
    const sgImage = document.getElementById('suggestion-image');
    const sgTitle = document.getElementById('suggestion-title');
    const sgDesc = document.getElementById('suggestion-desc');
    const sgTags = document.getElementById('suggestion-tags');
    const sgItems = document.getElementById('suggestion-items');

    // Banco de dados simulado para algumas combinações
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

    // Fallback genérico para combinações sem correspondência exata
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

        // Obtém valores dos selects
        const weather = document.getElementById('weather').value;
        const occasion = document.getElementById('occasion').value;
        const style = document.getElementById('style').value;

        // Gera a chave e busca no BD demo
        const key = `${weather}-${occasion}-${style}`;
        const suggestion = database[key] || fallbackDb;

        // Atualiza a UI
        sgTitle.textContent = suggestion.title;
        sgDesc.textContent = suggestion.desc;
        
        // Simulação de carregamento (limpa a img, espera um pouco e carrega a nova)
        sgImage.src = '';
        setTimeout(() => {
            sgImage.src = suggestion.image;
        }, 50);

        // Renderiza Tags
        sgTags.innerHTML = suggestion.tags.map(tag => `<span class="tag">${tag}</span>`).join('');

        // Renderiza Items da lista
        sgItems.innerHTML = suggestion.items.map(item => `
            <div class="item">
                <div class="item-icon">${item.icon}</div>
                <div class="item-details">
                    <h4>${item.name}</h4>
                    <span>${item.desc}</span>
                </div>
            </div>
        `).join('');

        // Transição: esconde grid de config, mostra resultado
        form.closest('.main-generator').classList.add('hidden');
        resultSection.classList.remove('hidden');
        
        // Dá scroll suave para o resultado
        setTimeout(() => {
            resultSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    });

    btnReset.addEventListener('click', () => {
        // Retorna ao formulário
        resultSection.classList.add('hidden');
        form.closest('.main-generator').classList.remove('hidden');
        form.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
});
