- styled-components
- unform: lib que evita que a cada atualização de um campo do formulário salvo em um estado, o componente seja renderizado novamente
- yup: validação de dados (vindos dos formulários)
- axios: cliente HTTP para consumo de api backend

context API -> guardar estados globais importantes para vários componentes da aplicação
local storage -> armazenamento de infos mesmo com refresh da pag
useCallback -> forma de criar funções dentro do componente que não são recriadas na memória toda vez que o componente atualiza (são memorizadas)

Obs: para edição de gastos, usar no componente Form a propriedade initialData={{ alguma: 'coisa' }}, sendo que 'alguma' é o name do input