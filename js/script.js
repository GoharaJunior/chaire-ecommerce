dropdownMenus.forEach(menu => {
  menu.addEventListener('touchstart', handleClick);
  menu.addEventListener('click', handleClick);
  ['touchstart', 'click'].forEach(userEvent => {
    menu.addEventListener(userEvent, handleClick)
  })
})

function handleClick(event) {
  event.preventDefault();
  this.classList.add('active');
  outsideClick(this, ['touchstart', 'click'], () => {
    this.classList.remove('active');
  });
};

function outsideClick(element, events, callback) {
  const html = document.documentElement;
  const outsite = 'data-outside'

  if (!element.hasAttribute(outsite)) {
    events.forEach(userEvent => {
      html.addEventListener(userEvent, handleOutsideClick);
    })
    element.setAttribute(outsite, '');
}
  function handleOutsideClick(event) {
    if(!element.contains(event.target)) {
      element.removeAttribute(outsite);
      events.forEach(userEvent => {
        html.removeEventListener(userEvent, handleOutsideClick);
      })
      callback();
    }
  }
}