// const trashcan = document.querySelector('a.delete');
// const form = document.querySelector('form');
// const emailError = document.querySelector('.email.error');
// const passwordError = document.querySelector('.password.error');
// const email = form.email.value;
// const password = form.password.value;

// trashcan.addEventListener('click', (e) => {
//   const endpoint = `/books/${trashcan.dataset.doc}`;
//   fetch(endpoint, {
//     method: 'DELETE',
//   })
//     .then((response) => response.json())
//     .then((data) => (window.location.href = data.redirect))
//     .catch((err) => console.log(err));
// });

// form.addEventListener('submit', async (e) => {
//   e.preventDefault();
//   //reset errors
//   emailError.textContent = ' ';
//   passwordError.textContent = ' ';

//   //Get the value

//   try {
//     const res = await fetch('/signup', {
//       method: 'POST',
//       body: JSON.stringify({
//         email,
//         password,
//       }),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//     const data = await res.json();
//     console.log(data);
//     if (data.errors) {
//       emailError.textContent = data.errors.email;
//       passwordError.textContent = data.errors.password;
//     }
//     if (data.user) {
//       location.assign('/');
//     }
//   } catch (err) {
//     console.log(err);
//   }
// });

// adding 2 numbers
