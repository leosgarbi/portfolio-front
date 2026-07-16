# AI Agent Instructions
## CI / Dokploy

Como disparar redeploy no Dokploy via GitHub Actions ou publicar imagem Docker:

- Para acionamento simples via webhook (já adicionado): configure o segredo `DOKPLOY_WEBHOOK_URL` no repositório com o valor do webhook do Dokploy. O workflow [`.github/workflows/deploy-dokploy.yml`](.github/workflows/deploy-dokploy.yml#L1) faz um `POST` nesse URL em cada push na `main`.

- Para publicar imagem Docker e fazer deploy por imagem (opcional): há um workflow de exemplo que faz build e push para o GitHub Container Registry (GHCR). Ele usa `GITHUB_TOKEN` com permissões de `packages: write` — não precisa criar secrets extras para GHCR quando o repositório pertence ao seu usuário/organização.

Passos rápidos:

1. Adicionar segredo `DOKPLOY_WEBHOOK_URL` com o webhook do Dokploy.
2. (Opcional) Habilitar `packages: write` nas permissões de `GITHUB_TOKEN` do workflow se for usar GHCR. No workflow já incluí a permissão necessária.
3. Fazer push para `main` — o workflow correspondente será executado.

Testes locais:

```bash
# build localmente
docker build -t portfolio-front:local .

# run
docker run --rm -p 3000:3000 portfolio-front:local
```

# Portfolio Front

## Descrição

Este é um site de portfólio pessoal desenvolvido com Next.js. O projeto apresenta uma interface moderna e responsiva, destacando seções como introdução, sobre mim, projetos, habilidades, galeria de fotografias e contato. Utiliza tecnologias avançadas para criar uma experiência visual imersiva, incluindo elementos 3D e animações.

## Funcionalidades

- **Página Inicial (Hero)**: Introdução com elementos visuais atraentes.
- **Sobre Mim**: Seção com informações pessoais e trajetória profissional.
- **Projetos**: Exibição de projetos desenvolvidos, com descrições e links.
- **Habilidades**: Lista de tecnologias e competências.
- **Galeria de Fotografias**: Showcase de trabalhos fotográficos.
- **Vídeos**: Apresentação de vídeos ou demos.
- **Contato**: Formulário de contato integrado com envio de e-mails via Resend.
- **Tema Escuro/Claro**: Suporte a alternância de temas.
- **Responsivo**: Design adaptável para dispositivos móveis e desktop.

## Tecnologias Utilizadas

- **Next.js**: Framework React para aplicações web.
- **TypeScript**: Superset do JavaScript para tipagem estática.
- **Tailwind CSS**: Framework CSS utilitário para estilização.
- **Radix UI**: Componentes acessíveis e customizáveis.
- **Three.js & React Three Fiber**: Para elementos 3D e gráficos.
- **React Hook Form & Zod**: Para validação de formulários.
- **Resend**: Serviço para envio de e-mails.
- **Vercel Analytics**: Para análise de uso.
- **Outros**: Lucide React para ícones, Sonner para notificações, etc.

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/portfolio-front.git
   cd portfolio-front
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente (se necessário):
   - Crie um arquivo `.env.local` na raiz do projeto.
   - Adicione as chaves necessárias, como a chave da API do Resend para o formulário de contato.

4. Execute o projeto em modo de desenvolvimento:
   ```bash
   npm run dev
   ```

5. Abra [http://localhost:3000](http://localhost:3000) no navegador para visualizar o site.

## Como Usar

- Navegue pelas seções usando o menu de navegação.
- Para editar o conteúdo, modifique os componentes em `src/components/sections/`.
- Para adicionar novos projetos ou habilidades, atualize os dados nos respectivos componentes.
- Para o formulário de contato, configure o endpoint em `src/api/contact/route.ts`.

## Estrutura do Projeto

```
portfolio-front/
├── public/                 # Arquivos estáticos (imagens, ícones)
├── src/
│   ├── api/                # Endpoints da API (contact, download-cv)
│   ├── app/                # Páginas e layout do Next.js
│   │   ├── globals.css     # Estilos globais
│   │   ├── layout.tsx      # Layout principal
│   │   ├── page.tsx        # Página inicial
│   │   └── photography/    # Página de fotografia
│   ├── components/         # Componentes reutilizáveis
│   │   ├── ui/             # Componentes da UI (shadcn/ui)
│   │   └── sections/       # Seções do portfólio
│   ├── hooks/              # Hooks customizados
│   ├── lib/                # Utilitários e validações
│   └── styles/             # Estilos adicionais
├── package.json            # Dependências e scripts
├── next.config.mjs         # Configuração do Next.js
├── tailwind.config.mjs     # Configuração do Tailwind
├── tsconfig.json           # Configuração do TypeScript
└── README.md               # Este arquivo
```

## Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento.
- `npm run build`: Constrói a aplicação para produção.
- `npm run start`: Inicia o servidor de produção.
- `npm run lint`: Executa o linter para verificar o código.
- `npm run lint:fix`: Corrige automaticamente problemas de linting.

## Contribuição

Contribuições são bem-vindas! Siga estes passos:

1. Fork o projeto.
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`).
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`).
4. Push para a branch (`git push origin feature/nova-feature`).
5. Abra um Pull Request.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

---

