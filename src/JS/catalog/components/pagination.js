export default class Pagination {
  constructor() {
    this.currentPage = 1;
    this.totalPages = 0;
    this.buttonsContainer = document.getElementById('buttons-container');

    // Создание кнопок
    this.createButtons();

    // Установка обработчика клика на кнопку "Далее"
    this.nextButton.addEventListener(
      'click',
      this.onNextButtonClick.bind(this)
    );
  }

  createButtons() {
    this.prevButton = this.createButton('prev', 'Предыдущая');
    this.nextButton = this.createButton('next', 'Далее');
    this.pageButton = this.createButton('page', this.currentPage);

    // Добавление кнопок в контейнер
    this.buttonsContainer.appendChild(this.prevButton);
    this.buttonsContainer.appendChild(this.pageButton);
    this.buttonsContainer.appendChild(this.nextButton);
  }

  createButton(className, text) {
    const button = document.createElement('button');
    button.className = className;
    button.textContent = text;
    return button;
  }

  updatePageNumber() {
    this.pageButton.textContent = this.currentPage;
  }

  onNextButtonClick() {
    this.currentPage++;
    this.updatePageNumber();
    apiService.getMovies(this.currentPage);
  }
}
