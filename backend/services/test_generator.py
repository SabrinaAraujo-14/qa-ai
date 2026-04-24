class TestGenerator:
    @staticmethod
    def generate_tests(requirement: str) -> dict:
        
        return {
            "requirement": requirement,
            "tests": f"""
## CASOS DE TESTE

1. Login válido - ✅ Sucesso
   - Pré-condições: Usuário cadastrado
   - Passos: Inserir email e senha válidos e clicar em login
   - Resultado esperado: Usuário autenticado com sucesso

2. Login inválido - ❌ Falha
   - Pré-condições: Sistema ativo
   - Passos: Inserir senha errada
   - Resultado esperado: Mensagem de erro exibida

3. Campos vazios - ❌ Falha
   - Pré-condições: Tela de login aberta
   - Passos: Clicar em login sem preencher campos
   - Resultado esperado: Validação de campos obrigatórios

## CENÁRIOS BDD

Dado que o usuário está na tela de login  
Quando ele insere credenciais válidas  
Então ele deve ser autenticado com sucesso
""",
            "timestamp": "mock-mode"
        }