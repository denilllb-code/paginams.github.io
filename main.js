document.addEventListener("DOMContentLoaded", () => {
    fetch('dat.json')
        .then(response => response.json())
        .then(data => {
            document.getElementById('logo-nombre').textContent = data.empresa.nombre;
            document.getElementById('hero-titulo').textContent = data.empresa.nombre;
            document.getElementById('hero-slogan').textContent = data.empresa.slogan;
            document.getElementById('info-dir').textContent = data.empresa.direccion;
            document.getElementById('info-tel').textContent = data.empresa.telefono;
            document.getElementById('info-email').textContent = data.empresa.email;

            const descServicios = document.getElementById('texto-descripcion-servicios');
            if (descServicios && data.descripcionServicios) {
                descServicios.textContent = data.descripcionServicios;
            }

            const contenedorServicios = document.getElementById('contenedor-servicios');
            data.servicios.forEach(servicio => {
                const div = document.createElement('div');
                div.className = 'card-servicio';
                div.innerHTML = `
                    <h3>${servicio.titulo}</h3>
                    <p>${servicio.descripcion}</p>
                `;
                contenedorServicios.appendChild(div);
            });

            const contenedorProductos = document.getElementById('contenedor-productos');
            data.productos.forEach(producto => {
                const div = document.createElement('div');
                div.className = 'card-producto';
                div.innerHTML = `
                    <img src="${producto.imagen}" alt="${producto.nombre}">
                    <h3>${producto.nombre}</h3>
                `;
                contenedorProductos.appendChild(div);
            });
        })
        .catch(error => console.error('Error al cargar el archivo JSON:', error));
});
document.addEventListener('click', (e) => {
    const card = e.target.closest('.card-servicio');
    if (card) {
        document.querySelectorAll('.card-servicio').forEach(c => c.classList.remove('seleccionado'));
        card.classList.add('seleccionado');
    }
});