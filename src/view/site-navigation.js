import AbstractView from './abstract.js';

const createSiteNavigationTemplate = (filter) => {
  const createSiteNavigationItems = () => {
    return filter.map(({name, count}) => {
      return `<a href="#${name}" class="main-navigation__item">${name[0].toUpperCase() + name.slice(1)} <span class="main-navigation__item-count">${count}</span></a>`;
    }).join(``);
  };

  return `<nav class="main-navigation">
  <div class="main-navigation__items">
    <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
    ${createSiteNavigationItems()}
  </div>
  <a href="#stats" class="main-navigation__additional">Stats</a>
</nav>`;
};

export default class SiteNavigation extends AbstractView {
  constructor(filter) {
    super();
    this._filter = filter;
  }

  getTemplate() {
    return createSiteNavigationTemplate(this._filter);
  }
}
