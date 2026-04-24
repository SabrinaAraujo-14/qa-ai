class QAAI {
    constructor() {
        this.apiUrl = 'http://localhost:8000/generate-tests';
        this.init();
    }

    init() {
        document.getElementById('generateBtn').addEventListener('click', () => this.generateTests());
        document.getElementById('requirement').addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && e.ctrlKey) {
                this.generateTests();
            }
        });
        document.getElementById('copyBtn').addEventListener('click', () => this.copyResults());
    }

    async generateTests() {
        const requirement = document.getElementById('requirement').value.trim();
        
        if (!requirement) {
            this.showError('Por favor, insira um requisito!');
            return;
        }

        this.showLoading(true);
        this.hideResults();
        this.hideError();

        try {
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ requirement })
            });

            if (!response.ok) throw new Error('Erro na API');

            const data = await response.json();
            this.displayResults(data);
            
        } catch (error) {
            console.error(error);
            this.showError('Erro ao gerar testes. Verifique se o backend está rodando em http://localhost:8000');
        } finally {
            this.showLoading(false);
        }
    }

    displayResults(data) {
        document.getElementById('testContent').innerHTML = data.tests;
        document.getElementById('results').classList.remove('hidden');
    }

    copyResults() {
        const content = document.getElementById('testContent').innerText;
        navigator.clipboard.writeText(content).then(() => {
            const btn = document.getElementById('copyBtn');
            const original = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check"></i> Copiado!';
            btn.style.background = '#10b981';
            setTimeout(() => {
                btn.innerHTML = original;
                btn.style.background = '#3b82f6';
            }, 2000);
        });
    }

    showLoading(show) {
        document.getElementById('loading').classList.toggle('hidden', !show);
        document.getElementById('generateBtn').disabled = show;
    }

    hideResults() {
        document.getElementById('results').classList.add('hidden');
    }

    hideError() {
        document.getElementById('error').classList.add('hidden');
    }

    showError(message) {
        document.getElementById('error').textContent = message;
        document.getElementById('error').classList.remove('hidden');
    }
}

new QAAI();