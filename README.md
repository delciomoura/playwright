# Projeto de Testes com Playwright

Este projeto contém testes automatizados utilizando Playwright em JavaScript para validar a aplicação. O projeto possui duas suítes de testes para o processo de criação de contato: uma com comandos nativos do Playwright e outra utilizando o padrão Page Objects.

## Requisitos

- Node.js (versão 14 ou superior)
- Playwright

## Instalação

1. Clone o repositório:
   ```bash
   git clone <url_do_repositorio>
   cd nome_do_projeto
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

## Estrutura do Projeto

O projeto possui duas suítes de testes:

- **create-contact.spec.js**: Usa comandos nativos do Playwright para testar a criação de contato.
- **create-contact-improved.spec.js**: Usa o padrão Page Object para uma estrutura de código mais limpa e reutilizável.

## Executando os Testes

### Execução Padrão (Modo Headless)

Para executar os testes em modo não visual (headless):
```bash
npx playwright test
```

### Execução Visual

Para executar os testes de forma visual:
```bash
npx playwright test --headed
```

### Executando Suítes Específicas

Para executar apenas uma das suítes de teste:
```bash
npx playwright test tests/create-contact.spec.js
npx playwright test tests/create-contact-improved.spec.js
```

### Gerando Relatório de Testes

Para executar os testes e gerar um relatório:
```bash
npx playwright test --reporter=html
```

Após a execução, o relatório estará disponível no diretório `playwright-report`. Para visualizar, abra o arquivo `index.html` no navegador.

### Exemplos de Comandos

```bash
# Executando em modo não visual (headless)
npx playwright test

# Executando em modo visual
npx playwright test --headed

# Executando com geração de relatório HTML
npx playwright test --reporter=html
```

## Estrutura de Pastas

- `tests/`: Contém as suítes de testes do projeto.
- `support/`: Contém os arquivos de comandos e selectors para uso no padrão Page Object (utilizado na suíte `create-contact-improved.spec.js`).

---
