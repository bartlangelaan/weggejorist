export default function () {
  if (document.location.href.includes('localhost')) return 'http://localhost:3000';

  return 'https://weggejorist.herokuapp.com';
}
