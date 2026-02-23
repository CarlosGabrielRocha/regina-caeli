# Rotas de Administração

Crie rotas de administração seguindo o estilo e padrões já existentes da aplicação.

## Layout Geral

O layout administrativo deve manter a consistência com o restante da aplicação:

- **Header**: Logo, botão de perfil e links de navegação para as páginas administrativas (similar ao header da página principal)
- **Main**: Área de conteúdo com children
- **Footer**: Mesmo footer utilizado no restante da aplicação

## Páginas e Funcionalidades

### 1. Lista de Contact Requests

Página principal de gerenciamento de solicitações de contato.

**Funcionalidades:**
- Exibir todas as contact requests em formato de lista/tabela
- Botões de ação: atender (somente disponível se estiver pendente), 
- Filtros de busca pro usuário:
  - Data
  - Status ( O padrão deve ser pendente )
- Utilizar ou adaptar os componentes de pesquisa já existentes na aplicação
- Implementar paginação

**Utilizar:**
- contactRequestService

**Ações:**
- Ao clicar em uma contact request, redirecionar para a página de detalhes.
---

### 2. Detalhes de um Contact Request

Página de visualização detalhada de uma solicitação de contato individual.

**Informações exibidas:**

#### Interesses do Contact Request
- Listar todos os interesses (propriedades) relacionados
- Ao clicar em um interesse, redirecionar para a página do imóvel correspondente (property/id)
- botões para visualizar os perfis do agent (caso o contact request não esteja em progresso, esse botão de agent deve ser para iniciar o contato pois ainda não terá um agent) e o botão de perfil do cliente (usuário) que solicitou o contact request.

Você deve buscar tanto o perfil do agent quanto o perfil do cliente para exibir as informações completas pelo id de usuário e não pelo id client ou id agent. Além disso, as informações devem ser mostradas em um modal com estilo parecido com o profileAside.

#### Perfil do Agent
- Exibir informações do agent responsável (se o contact request estiver em progresso)

#### Perfil do Client
- Exibir informações do cliente
- Incluir botão de WhatsApp que utilize o número do cliente
- Fazer requisição à API ao clicar para visualizar o perfil completo

**Utilizar:**
- userService
- contactRequestService

---

### 3. Perfil de agent (Nova aba no Profile Aside)

Adicionar uma nova aba no menu lateral de perfil que aparece **apenas para usuários com role de Agent**.

**Funcionalidades:**
- Botão que redireciona para página de informações do agent (criar)
- Botão que redireciona para página de contact request
- Botão que redireciona para página das propriedades
- Botão que redireciona para a página de criar uma nova propriedade

#### Página de informações sobre o agent

No perfil do agent, mostrar e organizar os contact requests em duas categorias com visualização resumida:

**Pendentes:**
- Listar contact requests com status diferente de "done"
- Botão "Concluir" em cada item
- Modal de confirmação antes de concluir com aviso: "Esta ação não pode ser desfeita"
- Implementar paginação

**Concluídos:**
- Listar contact requests com status "done"
- Implementar paginação

**Navegação:**
- Ao clicar em qualquer contact request, redirecionar para a página de detalhes

**Utilizar:**
- agentService
- contactRequestActions: markAsInProgress

---

### 4. Lista de Propriedades

Página de gerenciamento de todas as propriedades.

**Funcionalidades:**
- Exibir todas as propriedades (reutilize oq for possível dos cards que são utilizados na página principal)
- Botões de ação para cada propriedade:
  - Editar
  - Remover (confirmação do usuário necessária)
- Botão para criar nova propriedade
- Implementar paginação

---

### 5. Criar Nova Propriedade

Página com formulário para adicionar uma nova propriedade.

**Observação importante:**
- Por enquanto, o campo `coverImg` e `showcaseImages` deve enviar uma string vazia mesmo se o usuário adicionar as imagens. Mas já deixe pronto para receber as imagens. Eu irei utilizar o store do supabase.

**Utilizar:**
- propertyActions: createProperty, deleteProperty

---

### 6. Editar Propriedade

Página com formulário pré-preenchido para editar uma propriedade existente.

### Adicionar e remover imagens de demonstração

Deve ter haver área para adicionar e remover imagens de demonstração assim como na área de criação. Note que elas são requisições separadas, totalmente independentes da requisição para editar a propriedade, então deixe fora do formulário nesse caso.

**Observação importante:**
- Manter a mesma estrutura do formulário de criação
- Carregar dados existentes da propriedade
- Por enquanto, carregue imagens de placeholder, tanto para a coverImg, quanto para as imagens de apresentação mas já deixe a lógica funcionando.
- utilize de uma estilização parecida com a página para mostrar uma propriedade em property/id, assim mantem consistente a página.
---

## Requisitos Técnicos

- Seguir o estilo e padrões de código existentes na aplicação
- Utilizar componentes já criados sempre que possível
- Manter consistência de UI/UX com o restante da aplicação
- Priorizar código limpo, modularizado, organizado e responsivo para dispositivos diferentes.
- Utilizar actions e services já criados
- Adicionar estados de loading durante requisições