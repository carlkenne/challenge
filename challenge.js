document.addEventListener('DOMContentLoaded', function(event) {
  var state = {
    day: 1,
    month: 0,
    year: moment().year() - 18
  };

  initiateSelect('day', 1, 31, 0);
  initiateSelect('month', 1, 12, -1);
  initiateSelect('year', 1900, moment().year(), 0);

  document
    .querySelector('.date_next-btn')
    .addEventListener('click', function() {
      if (isValid()) {
        alert(moment(state).format('YYYY-MM-DD'));
      }
    });

  function initiateSelect(type, start, end, valueModifier) {
    var select = document.querySelector('#date_' + type);
    select.addEventListener('change', function(event) {
      state[type] = event.target.value;
      validate();
    });

    for (var i = start; i <= end; i++) {
      select.appendChild(createOption(select, i + valueModifier, i));
    }

    select.value = state[type];
  }

  function createOption(select, value, innerHTML) {
    var option = document.createElement('option');
    option.value = value;
    option.innerHTML = innerHTML;
    return option;
  }

  function validate() {
    var component = document.querySelector('.date');
    if (isValid()) {
      component.classList.remove('invalid');
    } else {
      component.classList.add('invalid');
    }
  }

  function isValid() {
    return moment.duration({ from: moment(state), to: moment() }).years() >= 18;
  }
});
