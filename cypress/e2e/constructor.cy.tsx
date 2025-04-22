describe('тест конструктора', () => {
  beforeEach(() => {
    cy.fixture('ingredients.json');
    cy.fixture('feed.json');
    cy.fixture('user.json');
    cy.fixture('order.json');
    cy.intercept(
      { method: 'GET', url: 'api/ingredients' },
      { fixture: 'ingredients.json' }
    ).as('getIngredients');
    cy.intercept(
      { method: 'GET', url: 'api/auth/user' },
      { fixture: 'user.json' }
    ).as('user');
    cy.intercept(
      { method: 'GET', url: 'api/orders/all' },
      { fixture: 'feed.json' }
    ).as('feed');
    cy.intercept(
      { method: 'POST', url: 'api/orders' },
      { fixture: 'order.json' }
    ).as('order');
    cy.setCookie('accessToken', 'mockToken');
    localStorage.setItem('refreshToken', 'mockToken');
    cy.visit('/');
  });

  afterEach(() => {
    cy.clearCookie('accessToken');
    localStorage.removeItem('refreshToken');
  });

  it('работа cy.intercept', () => {
    cy.wait('@getIngredients');
    cy.wait('@user');
  });

  it('наличие ингредиента в конструкторе - булки', () => {
    cy.get(`[data-cy='constructor-module']`).should(
      'not.contain.text',
      'булка'
    );
  });

  it('добавление ингредиента в конструктор - булки', () => {
    // 1️⃣ Проверяем, что булки нет в конструкторе перед добавлением
    cy.get(`[data-cy='constructor-module']`)
      .should('not.contain.text', 'просто какая-то булка');
  
    // 2️⃣ Находим и кликаем кнопку добавления конкретной булки
    cy.get(`[data-cy='ingredients-module']`)
      .contains('просто какая-то булка') // более точный таргетинг
      .parent() // переходим к родительскому элементу ингредиента
      .find('button') // находим кнопку "Добавить"
      .click();
  
    // 3️⃣ Проверяем появление именно этой булки в конструкторе
    cy.get(`[data-cy='constructor-module']`)
      .should('contain.text', 'просто какая-то булка');
  });

  it('тест добавления ингредиента в конструктор - другой ингредиент', () => {
    //находим div с ингредиентами, доходим до кнопки "добавить" в ингредиенте с биокотлетой, нажимаем
    cy.get(`[data-cy='ingredients-module']`)
      .next()
      .next()
      .children()
      .first()
      .find('button')
      .click();
    //проверяем, что в конструкторе появилась биокотлета
    cy.get(`[data-cy='constructor-module']`).should(
      'contain.text',
      'Биокотлета из марсианской Магнолии'
    );
  });

  it('тест открытия модального окна', () => {
    // Проверяем, что модальное окно отсутствует на экране перед открытием
    cy.get(`[data-cy='modal']`).should('not.exist');

    // Находим и кликаем на ингредиент (кратерную булку)
    cy.contains('кратЕрная булка (от слова кратер)').click();

    // Проверяем, что модальное окно стало видимым
    cy.get(`[data-cy='modal']`).should('be.visible');

    // Проверяем, что в модальном окне отображается информация именно о кратерной булке
    cy.get(`[data-cy='modal']`).within(() => {
      cy.contains('кратЕрная булка (от слова кратер)').should('exist');
    });
  });

  it('тест закрытия модального окна по крестику', () => {
    cy.contains('кратЕрная булка (от слова кратер)').click();
    //находим кнопку в модалке, нажимаем
    cy.get(`[data-cy='modal']`).find('button').click();
    //проверяем, что модальное окно закрыто
    cy.get(`[data-cy='modal']`).should('not.exist');
  });

  it('тест закрытия модального окна по esc', () => {
    //находим ссылку с кратерной булкой, нажимаем
    cy.contains('кратЕрная булка (от слова кратер)').click();
    //нажимаем на кнопку эскейп
    cy.get('body').type('{esc}');
    //проверяем, что модальное окно закрыто
    cy.get(`[data-cy='modal']`).should('not.exist');
  });

  it('тест закрытия модального окна по оверлею', () => {
    //находим ссылку с кратерной булкой, нажимаем
    cy.contains('кратЕрная булка (от слова кратер)').click();
    //нажимаем на поле вверху экрана (выше модалки)
    cy.get(`[data-cy='modal-overlay']`).click('top', { force: true });
    //проверяем, что модальное окно закрыто
    cy.get(`[data-cy='modal']`).should('not.exist');
  });

  //проверяем, что имя пользователя в профиле совпадает с fixture
  it('тест авторизации пользователя перед тестом', () => {
    cy.visit('/profile');
    cy.get(`[data-cy='profile-name']`).should('have.value', '123456');
  });

  // добавляем в заказ флуоресцентную булку
  it('тест добавления ингредиентов в заказ', () => {
    // добавляем в заказ флуоресцентную булку
    cy.get(`[data-cy='ingredients-module']`)
      .first()
      .children()
      .last()
      .find('button')
      .click();

    // добавляем в заказ биокотлету
    cy.get(`[data-cy='ingredients-module']`)
      .next()
      .next()
      .children()
      .first()
      .find('button')
      .click();

    // добавляем в заказ соус антарианского плоскоходца
    cy.get(`[data-cy='ingredients-module']`)
      .last()
      .children()
      .last()
      .find('button')
      .click();

    //нажимаем на кнопку заказа
    cy.get(`[data-cy='constructor-module']`)
      .children()
      .last()
      .find('button')
      .click();

    cy.wait('@order');

    //проверяем, что модальное окно открылось
    cy.get(`[data-cy='modal']`).should('be.visible');

    //нажимаем на кнопку закрытия
    cy.get(`[data-cy='modal']`).find('button').click();

    //проверяем, что конструктор пустой -
    cy.get(`[data-cy='constructor-module']`)
      .children()
      .first()
      .should('contain.text', 'Выберите булки');

    cy.get(`[data-cy='constructor-module']`)
      .children()
      .first()
      .next()
      .should('contain.text', 'Выберите начинку');
  });
});
