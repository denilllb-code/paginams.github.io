document.addEventListener("DOMContentLoaded", () => {
    const setText = (id, value) => {
        const el = document.getElementById(id);
        if (el && value != null) {
            el.textContent = value;
        }
    };

    const initScrollReveal = () => {
        const secciones = document.querySelectorAll("section");
        if (!secciones.length) return;

        secciones.forEach((seccion) => {
            const elementosHijos = seccion.querySelectorAll(
                "h1, h2, h3, p, .btn-video, .btn-whatsapp, .botones-contacto-wrapper"
            );
            elementosHijos.forEach((el, index) => {
                el.classList.add("animar-scroll");
                el.style.transitionDelay = `${index * 0.08}s`;
            });
        });

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const hijos = entry.target.querySelectorAll(".animar-scroll");
                    hijos.forEach((hijo) => {
                        hijo.classList.toggle("visible", entry.isIntersecting);
                    });
                });
            },
            { threshold: 0.12 }
        );

        secciones.forEach((seccion) => observer.observe(seccion));
    };

    const renderServicios = (servicios) => {
        const contenedor = document.getElementById("contenedor-servicios");
        if (!contenedor || !Array.isArray(servicios)) return;

        const fragment = document.createDocumentFragment();
        servicios.forEach((servicio) => {
            const div = document.createElement("div");
            div.className = "card-servicio";

            const titulo = document.createElement("h3");
            titulo.textContent = servicio.titulo || "";

            const descripcion = document.createElement("p");
            descripcion.textContent = servicio.descripcion || "";

            div.append(titulo, descripcion);
            fragment.appendChild(div);
        });
        contenedor.appendChild(fragment);
    };

    const renderProductos = (productos) => {
        const contenedor = document.getElementById("contenedor-productos");
        if (!contenedor || !Array.isArray(productos)) return;

        const fragment = document.createDocumentFragment();
        productos.forEach((producto) => {
            const div = document.createElement("div");
            div.className = "card-producto";

            const img = document.createElement("img");
            img.src = producto.imagen || "";
            img.alt = producto.nombre || "Producto";

            const titulo = document.createElement("h3");
            titulo.textContent = producto.nombre || "";

            div.append(img, titulo);
            fragment.appendChild(div);
        });
        contenedor.appendChild(fragment);
    };

    const aplicarEmpresa = (empresa) => {
        if (!empresa) return;

        setText("logo-nombre", empresa.nombre);
        setText("hero-slogan", empresa.slogan);
        setText("info-dir", empresa.direccion);
        setText("info-tel", empresa.telefono);
        setText("info-email", empresa.email);

        const enlaceFacebook = document.getElementById("enlace-facebook");
        if (enlaceFacebook && empresa.facebook) {
            enlaceFacebook.href = empresa.facebook;
        }

        const enlaceWhatsapp = document.getElementById("enlace-whatsapp");
        if (enlaceWhatsapp && empresa.whatsapp) {
            const mensaje = encodeURIComponent("Hola, me interesa cotizar un portón");
            enlaceWhatsapp.href = `https://wa.me/${empresa.whatsapp}?text=${mensaje}`;
        }
    };

    if (document.getElementById("contenedor-servicios")) {
        fetch("dat.json")
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`No se pudo cargar dat.json (${response.status})`);
                }
                return response.json();
            })
            .then((data) => {
                aplicarEmpresa(data.empresa);
                setText("texto-descripcion-servicios", data.descripcionServicios);
                renderServicios(data.servicios);
                renderProductos(data.productos);
            })
            .catch((error) => console.error("Error al cargar el archivo JSON:", error));
    }

    document.addEventListener("click", (e) => {
        const card = e.target.closest(".card-servicio");
        if (!card) return;
        document.querySelectorAll(".card-servicio").forEach((c) => c.classList.remove("seleccionado"));
        card.classList.add("seleccionado");
    });

    initScrollReveal();
});
