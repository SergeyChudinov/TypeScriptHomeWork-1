import { renderBlock } from './lib.js'

export function renderSearchFormBlock (arrivalDate, departureDate) {
  function getLastDayOfMonth(year, month) {
    const date = new Date(year, month, 0);
    return date.getDate();
  }

  const startDate = new Date(arrivalDate);
  const finishDate = new Date(departureDate)
  const nowDate = new Date();
  let arrivalDateEnd;
  if (startDate < nowDate) {
    const arrivalDateLocaleString = nowDate.toLocaleDateString();
    const arrivalDateArr = arrivalDateLocaleString.split('.');
    arrivalDate = `${arrivalDateArr[2]}-${arrivalDateArr[1]}-${arrivalDateArr[0]}`;
    const year = arrivalDateArr[2];
    let month = (+arrivalDateArr[1] + 1).toString();
    if (month.length == 1) {
      month = `0${month}`;
    }
    const dateEnd = getLastDayOfMonth(year, month).toString();
    arrivalDateEnd = `${year}-${month}-${dateEnd}`;
  } else {
    const arrivalDateArr = arrivalDate.split('-');
    const year = arrivalDateArr[0];
    let month = (+arrivalDateArr[1] + 1).toString();
    if (month.length == 1) {
      month = `0${month}`;
    }
    const dateEnd = getLastDayOfMonth(year, month).toString();
    arrivalDateEnd = `${year}-${month}-${dateEnd}`;
  }

  if (finishDate < startDate || finishDate < nowDate) {
    departureDate = arrivalDate;
  }
  

  renderBlock(
    'search-form-block',
    `
    <form>
      <fieldset class="search-filedset">
        <div class="row">
          <div>
            <label for="city">Город</label>
            <input id="city" type="text" disabled value="Санкт-Петербург" />
            <input type="hidden" disabled value="59.9386,30.3141" />
          </div>
          <!--<div class="providers">
            <label><input type="checkbox" name="provider" value="homy" checked /> Homy</label>
            <label><input type="checkbox" name="provider" value="flat-rent" checked /> FlatRent</label>
          </div>--!>
        </div>
        <div class="row">
          <div>
            <label for="check-in-date">Дата заезда</label>
            <input id="check-in-date" type="date" value="${arrivalDate}" min="${arrivalDate}" max="${arrivalDateEnd}" name="checkin" />
          </div>
          <div>
            <label for="check-out-date">Дата выезда</label>
            <input id="check-out-date" type="date" value="${departureDate}" min="${arrivalDate}" max="${arrivalDateEnd}" name="checkout" />
          </div>
          <div>
            <label for="max-price">Макс. цена суток</label>
            <input id="max-price" type="text" value="" name="price" class="max-price" />
          </div>
          <div>
            <div><button>Найти</button></div>
          </div>
        </div>
      </fieldset>
    </form>
    `
  )
}
