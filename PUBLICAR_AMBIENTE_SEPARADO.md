# Publicar o ambiente separado pelo navegador

## 1. GitHub
1. Extraia o ZIP no computador.
2. Crie um repositório separado chamado `abc-cargas-fleet-operacao`.
3. Envie TODO o conteúdo da pasta extraída. package.json, public, server e db devem ficar na raiz do repositório, sem uma pasta adicional acima deles.
4. Faça o commit. Não envie senhas, .env ou node_modules.

## 2. Banco de dados
1. No Render, crie um PostgreSQL NOVO, por exemplo `abc-cargas-operacao-db`.
2. Escolha região compatível com o novo serviço web e capacidade/plano conforme as opções da sua conta.
3. Copie a Internal Database URL deste banco novo para a configuração do novo serviço web.
4. Não reutilize a DATABASE_URL do sistema atual. Não restaure nem importe dados antigos.

## 3. Serviço web
1. Crie um Web Service NOVO, por exemplo `abc-cargas-fleet-operacao`.
2. Conecte o repositório separado. Runtime Node. Root Directory vazio.
3. Build Command: `npm ci`
4. Start Command: `npm run db:migrate && npm run db:seed && npm start`
5. Configure as variáveis:
   - DATABASE_URL: URL do PostgreSQL NOVO.
   - NODE_ENV: production.
   - JWT_SECRET: segredo novo, aleatório e longo (use Generate quando disponível).
   - SEED_PASSWORD: senha escolhida para Michele, com pelo menos 12 caracteres.
6. Publique e aguarde Live. Abra a NOVA URL fornecida pelo Render.
7. Entre com `michele@abccargas.local` e a SEED_PASSWORD configurada.

A senha não é copiada do banco antigo. Para usar a mesma senha conhecida, configure-a como SEED_PASSWORD, se ela tiver pelo menos 12 caracteres. Alterar essa variável após a primeira inicialização não redefine a senha.

## 4. Conferência antes dos primeiros cadastros
- Michele Shibata aparece como administradora e é a única conta.
- Total de veículos, disponíveis, indisponíveis e operação ficam em zero.
- Pátios, veículos, motoristas, reservas, manutenções, combustível e alertas ficam vazios.
- O catálogo de montadoras/modelos permanece, pois é referência de cadastro.
- Reiniciar/publicar novamente mantém a conta, a senha e os novos dados que você cadastrar.
- A URL antiga continua disponível, com seus dados de consulta e testes.

## 5. Início da operação
Cadastre primeiro os pátios. Depois revise configurações/política da frota, cadastre veículos e crie os motoristas com suas contas e CNH. Somente após isso crie as reservas.

Este pacote não realiza publicação automática. A implantação exige os novos recursos na sua conta Render. Custos e capacidade dependem do plano escolhido. Há proteção de banco, mas ainda é essencial selecionar os recursos corretos. Não copie o pacote sobre o serviço antigo.
