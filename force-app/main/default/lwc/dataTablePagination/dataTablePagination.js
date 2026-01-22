// Elementos do Lightning
import { LightningElement, api } from 'lwc';

// Rótulos personalizados
import { customLabels } from './dataTablePaginationLabels';

export default class PaginacaoTabelaDados extends LightningElement {

    labels = customLabels;

    @api totalRecords = 0;
    @api recordsPerPage = 10;
    @api currentPage = 1;
    @api displayedRecordsCount = 0;
    @api pageSizeOptions = [10, 20, 30, 40, 60, 80];

    // Retorna as opções de tamanho de página para o dropdown (MenuItem)
    get pageMenuOptions() {
        return this.availablePageSizes.map(size => ({
            size,
            isChecked: this.recordsPerPage === size
        }));
    }

    // Retorna os tamanhos de página disponíveis
    get availablePageSizes() {
        if (!Array.isArray(this.pageSizeOptions)) {
            return [10, 20, 30, 40, 60, 80];
        }
        return this.pageSizeOptions
            .filter(size => typeof size === 'number' && !isNaN(size))
            .sort((previousSize, currentSize) => previousSize - currentSize);
    }    

    // Calcula o total de páginas
    get totalPages() {
        return Math.ceil(this.totalRecords / this.recordsPerPage);
    }

    // Decide se o seletor de tamanho de página deve ser desabilitado
    get disablePageSizeSelector() {
        return this.totalPages === 1 && this.recordsPerPage === 10;
    }

    // Decide se o botão "Anterior" deve ser desabilitado
    get disablePreviousButton() {
        return this.currentPage <= 1;
    }

    // Decide se o botão "Próximo" deve ser desabilitado
    get disableNextButton() {
        return this.currentPage >= this.totalPages;
    }

    // Handler para mudança de registros por página (usado no HTML)
    handlePageSizeChanged(event) {
        const newSize = parseInt(event.detail.value, 10);
        this.dispatchEvent(new CustomEvent('pagesizechanged', {
            detail: { pageSize: newSize },
            bubbles: true,
            composed: true
        }));
    }

    // Handler para botão anterior (usado no HTML)
    handlePreviousPage() {
        if (this.currentPage > 1) {
            this.dispatchEvent(new CustomEvent('pagechanged', {
                detail: { page: this.currentPage - 1 },
                bubbles: true,
                composed: true
            }));
        }
    }

    // Handler para botão próximo (usado no HTML)
    handleNextPage() {
        if (this.currentPage < this.totalPages) {
            this.dispatchEvent(new CustomEvent('pagechanged', {
                detail: { page: this.currentPage + 1 },
                bubbles: true,
                composed: true
            }));
        }
    }

}