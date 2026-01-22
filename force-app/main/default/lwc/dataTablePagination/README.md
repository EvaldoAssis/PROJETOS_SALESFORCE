# PaginacaoTabelaDados

Componente LWC reutilizável de paginação, projetado para ser usado em conjunto com `lightning-datatable`, com foco em desacoplamento, reutilização e aplicação do princípio **DRY**.

## Objetivo

Centralizar a lógica de paginação em um único componente reutilizável, evitando duplicação de código em LWCs que utilizam DataTable e promovendo uma arquitetura orientada a eventos e baixo acoplamento.

## Propriedades públicas (`@api`)

- `currentPage` — Página atualmente selecionada. Espera um número, com valor padrão `1`.
- `displayedRecordsCount` — quantidade de registros efetivamente exibidos na página atual. Espera um número informado pelo componente pai, pois pode diferir de `recordsPerPage` em cenários com filtros, buscas ou lógica customizada de renderização.
- `pageSizeOptions` — Opções disponíveis para tamanho de página. Espera um array de números (ex.: `[10`, `20`, `30`, `40]`), com valor padrão `[10, 20, 30, 40, 60, 80]`.
- `recordsPerPage` — Quantidade de registros exibidos por página. Espera um número, com valor padrão `10`.
- `totalRecords` — Total de registros disponíveis. Espera um número, com valor padrão `0`.

## Eventos emitidos

- `pagesizechanged` — Quando o usuário escolhe um novo tamanho de página (`recordsPerPage`), emite `event.detail: { pageSize: Number }` com o novo tamanho selecionado.
- `pagechanged` — Quando a página é alterada (anterior/próximo), emite `event.detail: { page: Number }` com a nova página.

**Observação:** eventos utilizam `bubbles: true` e `composed: true` para melhor integração com componentes pai.

## Exemplo de uso (Chamada no pai)

```html
<!-- Exemplo de chamada no componente pai (HTML) -->
 
<c-data-table-pagination
  current-page={currentPage}
  displayed-records-count={displayedRecordsCount}
  page-size-options={pageSizeOptions}
  records-per-page={recordsPerPage}
  total-records={totalRecords}
  onpagesizechanged={handlePageSizeChanged}
  onpagechanged={handlePageChanged}>
</c-data-table-pagination>
```

No controller do componente pai, trate os eventos para buscar dados/atualizar estado:

```js
// Handler disparado quando a página é alterada (anterior / próximo)
handlePageChanged(event) {
  const newPage = event.detail.page;
  // atualizar currentPage e recarregar dados
}

// Handler disparado quando o usuário altera o tamanho da página
handlePageSizeChanged(event) {
  const newSize = event.detail.pageSize;
  // atualizar recordsPerPage e recarregar dados
}
```

## Notas e recomendações

- **Contrato de uso**: o componente assume que valores válidos são fornecidos pelo componente pai. A responsabilidade por validação e busca de dados permanece fora do componente de paginação.
- **Labels**: o componente importa `customLabels` de `paginacaoTabelaDadosRotulos.js` para rótulos personalizados.
