import {
  renderBlock
} from './lib.js'

export function renderUserBlock(name, avatar, favoriteItemsAmount) {
  const favoritesCaption = favoriteItemsAmount ? favoriteItemsAmount : 'ничего нет'
  const hasFavoriteItems = favoriteItemsAmount ? true : false

  renderBlock(
    'user-block',
    `
    <div class="header-container">
      <img class="avatar" src="${avatar}" alt="Wade Warren" />
      <div class="info">
          <p class="name">${name}</p>
          <p class="fav">
            <i class="heart-icon${hasFavoriteItems ? ' active' : ''}"></i>${favoritesCaption}
          </p>
      </div>
    </div>
    `
  )
  setUser(name, avatar);
  setFavoritesAmount(favoriteItemsAmount);
  getUserData('user');
  getFavoritesAmount('favoriteItemsAmount');
}

function setUser(username, avatarUrl) {
  const user = {
    username,
    avatarUrl
  }
  const serializedUser = JSON.stringify(user);
  localStorage.setItem('user', serializedUser);
}
function setFavoritesAmount(favoriteItemsAmount) {
  localStorage.setItem('favoriteItemsAmount', favoriteItemsAmount);
}

function getUserData(key: unknown) {
  console.log(localStorage.getItem(key) );
}
function getFavoritesAmount(key) {
  console.log(localStorage.getItem(key) );
}