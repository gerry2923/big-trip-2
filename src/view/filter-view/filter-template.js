import { FilterTypes } from '../../const';

const createFilterItemTemplate = (filtertype, isDisabled, isChecked) => {
  if (filtertype === 'everything' || filtertype === 'present') {
    isDisabled = false;
  }
  
  return `
    <div class='trip-filters__filter'>
      <input id='filter-${filtertype}' class='trip-filters__filter-input  visually-hidden' type='radio' name='trip-filter' value='${filtertype}' ${isChecked? 'checked': '' }  ${isDisabled? 'disabled' : ''}>
      <label class='trip-filters__filter-label' for='filter-${filtertype}'>${filtertype}</label>
    </div>`;
};

export const createFilterTemplate = (filterTypes, isDisabled) => {
  const filterItemTemplates = filterTypes.map((filter, index) => createFilterItemTemplate(filter,isDisabled, index === 0)).join('');
  
  return `
          <div class='trip-main__trip-controls  trip-controls'>
            <div class='trip-controls__filters'>
              <h2 class='visually-hidden'>Filter events</h2>
              <form class='trip-filters' action='#' method='get'>
                ${filterItemTemplates}
                <button class='visually-hidden' type='submit'>Accept filter</button>
              </form>
            </div>
          </div>`
        };
