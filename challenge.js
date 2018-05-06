document.addEventListener('DOMContentLoaded', function(event) {
  var state = {
    day: 1,
    month: 1,
    year: moment().year() - 18
  };
  var component = document.querySelector('.date');
  var nextBtn = component.querySelector('.date_next-btn');

  function onMonthOrYearChanged() {
    var daysInNewMonth = moment({
      year: state.year,
      month: state.month - 1
    }).daysInMonth();

    state.day = Math.min(Number(state.day), daysInNewMonth);
    buildOptions('day', 1, daysInNewMonth);
  }

  initiateSelect('day', 1, 31);
  initiateSelect('month', 1, 12, onMonthOrYearChanged);
  initiateSelect('year', 1900, moment().year(), onMonthOrYearChanged);

  nextBtn.addEventListener('click', function() {
    if (isValid()) {
      alert(getStateAsMoment().format('YYYY-MM-DD'));
    }
  });

  function getSelect(type) {
    return component.querySelector('#date_' + type);
  }

  function initiateSelect(type, start, end, onChange) {
    var select = getSelect(type);
    select.addEventListener('change', function(event) {
      state[type] = event.target.value;
      onChange && onChange();
      validate();
    });
    buildOptions(type, start, end);
  }

  function buildOptions(type, start, end) {
    var select = getSelect(type);
    select.innerHTML = '';
    for (var i = start; i <= end; i++) {
      select.appendChild(createOption(select, i));
    }
    select.value = state[type];
  }

  function createOption(select, value) {
    var option = document.createElement('option');
    option.value = value;
    option.innerHTML = value;
    return option;
  }

  function validate() {
    if (isValid()) {
      component.classList.remove('invalid');
    } else {
      component.classList.add('invalid');
    }
  }

  function isValid() {
    return (
      moment
        .duration({
          from: getStateAsMoment(),
          to: moment()
        })
        .years() >= 18
    );
  }

  function getStateAsMoment() {
    return moment({
      day: state.day,
      month: state.month - 1,
      year: state.year
    });
  }
});
