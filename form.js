const canvas = document.getElementById('firma');
const ctx = canvas.getContext('2d');
let drawing = false;
let lastX = 0;
let lastY = 0;

canvas.addEventListener('mousedown', e => {
  drawing = true;
  lastX = e.offsetX;
  lastY = e.offsetY;
});

canvas.addEventListener('mousemove', e => {
  if (drawing === true) {
    drawLine(lastX, lastY, e.offsetX, e.offsetY);
    lastX = e.offsetX;
    lastY = e.offsetY;
  }
});

canvas.addEventListener('mouseup', e => {
  drawing = false;
});

canvas.addEventListener('mouseleave', e => {
  drawing = false;
});

function drawLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

document.getElementById('formulario').addEventListener('submit', e => {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value;
  const email = document.getElementById('email').value;
  const firma = canvas.toDataURL();

  fetch('https://api.apispreadsheets.com/data/1wqtYZW57ie3u1JbRYtmLA_CCLSuYPkz5SJeEnmPQ28E/sheet1', {
    method: 'POST',
    body: JSON.stringify({
      data: [
        { Nombre: nombre, Email: email, Firma: firma }
      ]
    })
  })
  .then(response => {
    alert('Los datos se han guardado correctamente.');
  })
  .catch(error => {
    alert('Ha ocurrido un error al guardar los datos.');
  });
});
