## **CES-26: [front-end] Projeto exploratório**
> Alunos: 
> Leo Gomes, Pedro Alves e Rafaella Bambokian - COMP21

![til](./src/assets/prj_front.gif)
_Overview do projeto_

### :bangbang: Proposta
Dashboard para gestão de gastos pessoais
- gráfico de gastos com possibilidade de filtros para visualização dos dados
- integração Google Calendar para visualização/criação/remoção/atualização de lembretes financeiros
- formulário para criação/remoção/atualização de dados financeiros
- organização dos gastos em tags definidas pelo usuário

### :computer: Desenvolvimento
Principais módulos auxiliares ao desenvolvimento front-end do projeto.
- create-react-app - configuração inicial do ambiente do projeto
- context API - gerenciamento de estados globais da aplicação
- styled-components - biblioteca de estilos que permite escrever código css em arquivos JavaScript
- unform - biblioteca para criação de formulários focada em performance, evitando a renderização de cada componente com a atualização de campos de inserção de dados
- yup - biblioteca para validação de dados (vindos de inputs de formulários)
- react-router-dom - biblioteca que facilita a manipulação de rotas da aplicação
- recharts - biblioteca para visualização de dados em gráficos
- axios - cliente HTTP para consumo de api backend
- local storage - armazenamento de informações simples do contexto do usuário no browser do cliente
- media queries - uso para tornar dashboard responsivo 

** deploy no serviço Netlify - para aplicações estáticas. [Clique aqui](https://gifted-johnson-2faf1a.netlify.app/) para acessar a aplicação.

obs: repositório back-end do projeto [aqui](https://github.com/alvesouza/financemanagerces26back).
