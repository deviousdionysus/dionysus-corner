// ─── Guestbook Form ───────────────────────────────────────────────────────────
const guestbookForm = document.getElementById('guestbook-form');
guestbookForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const username      = document.getElementById('name').value.trim();
  const email         = document.getElementById('email').value.trim();
  const formMessage   = document.getElementById('form-message');
  const birthYearText = document.getElementById('birth-year').value.trim();
  const birthYear     = parseInt(birthYearText, 10);
  const currentYear   = new Date().getFullYear();
  const discountMessage = document.getElementById('discount-message');

  // Name + email confirmation
  if (username !== '' && email !== '') {
    formMessage.textContent =
      'Thank you for visiting, ' + username + '! We will contact you at ' + email + '.';
  } else {
    formMessage.textContent = 'Please fill in both your name and email.';
  }

  // Age-based discount message
  if (/^\d{4}$/.test(birthYearText) && birthYear >= 1900 && birthYear <= currentYear) {
    const age = currentYear - birthYear;
    if (age >= 13 && age <= 25) {
      discountMessage.textContent =
        'You are ' + age + ' years old. You qualify for the student discount!';
    } else if (age >= 60) {
      discountMessage.textContent =
        'You are ' + age + ' years old. You qualify for the senior discount!';
    } else {
      discountMessage.textContent =
        'You are ' + age + ' years old. No age-based discount applies.';
    }
  } else {
    discountMessage.textContent = 'Please enter a valid four-digit birth year.';
  }
});


// ─── Menu Table Row Highlight on Hover ────────────────────────────────────────
document.querySelectorAll('.menu-table tbody tr').forEach(function (row) {
  row.addEventListener('mouseover', function () { row.classList.add('row-highlight'); });
  row.addEventListener('mouseout',  function () { row.classList.remove('row-highlight'); });
});


// ─── Light / Dark Mode Toggle ─────────────────────────────────────────────────
document.getElementById('theme-toggle').addEventListener('click', function () {
  document.body.classList.toggle('dark-mode');
});


// ─── Cafe Menu Order Total ────────────────────────────────────────────────────
const menuCheckboxes = document.querySelectorAll('.menu-item');

function updateTotal() {
  let total = 0;
  menuCheckboxes.forEach(function (checkbox) {
    if (checkbox.checked) total += parseFloat(checkbox.value);
  });
  document.getElementById('total').textContent =
    'Total: $' + total.toFixed(2).replace(/\.00$/, '');
}

menuCheckboxes.forEach(function (checkbox) {
  checkbox.addEventListener('change', updateTotal);
});


// ─── Read More / Read Less Toggle ────────────────────────────────────────────
document.getElementById('read-more').addEventListener('click', function () {
  const extraStory = document.getElementById('extra-story');
  const isHidden   = extraStory.hidden;
  extraStory.hidden  = !isHidden;
  this.textContent   = isHidden ? 'Read Less' : 'Read More';
});


// ─── Menu Category Filter ─────────────────────────────────────────────────────
document.querySelectorAll('.filter-button').forEach(function (button) {
  button.addEventListener('click', function () {
    const selectedCategory = this.dataset.filter;

    document.querySelectorAll('.menu-table tbody tr').forEach(function (row) {
      row.style.display =
        selectedCategory === 'all' || row.dataset.category === selectedCategory ? '' : 'none';
    });

    document.querySelectorAll('.filter-button').forEach(function (item) {
      item.classList.remove('active');
    });
    this.classList.add('active');
  });
});


// ─── Cafe Opening Status ──────────────────────────────────────────────────────
function updateOpeningStatus() {
  const hour   = new Date().getHours();
  const status = document.getElementById('opening-status');

  if (hour >= 8 && hour < 20) {
    status.textContent = 'We are Open!';
    status.classList.add('is-open');
    status.classList.remove('is-closed');
  } else {
    status.textContent = 'Closed - Open at 8 AM';
    status.classList.add('is-closed');
    status.classList.remove('is-open');
  }
}
updateOpeningStatus();


// ─── Special Notes Character Counter ─────────────────────────────────────────
const specialNotes = document.getElementById('special-notes');
specialNotes.addEventListener('input', function () {
  document.getElementById('char-count').textContent =
    (100 - this.value.length) + ' characters remaining';
});
