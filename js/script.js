// JavaScript para validaciones de formulario y funcionalidades interactivas
// Mi Primer Sitio Web - Carlos Valderrama

document.addEventListener('DOMContentLoaded', function() {
    // Obtener referencias al formulario y elementos
    const formulario = document.querySelector('form');
    const nombreInput = document.getElementById('nombre');
    const emailInput = document.getElementById('email');
    const telefonoInput = document.getElementById('telefono');
    const mensajeTextarea = document.getElementById('mensaje');
    const tipoProyectoSelect = document.getElementById('tipo-proyecto');

    // Función para mostrar mensajes de error
    function mostrarError(elemento, mensaje) {
        // Remover mensaje de error previo si existe
        const errorPrevio = elemento.parentNode.querySelector('.error-mensaje');
        if (errorPrevio) {
            errorPrevio.remove();
        }

        // Crear y mostrar nuevo mensaje de error
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-mensaje';
        errorDiv.style.color = '#e74c3c';
        errorDiv.style.fontSize = '14px';
        errorDiv.style.marginTop = '5px';
        errorDiv.textContent = mensaje;
        elemento.parentNode.insertBefore(errorDiv, elemento.nextSibling);
        
        // Resaltar el campo con error
        elemento.style.borderColor = '#e74c3c';
    }

    // Función para limpiar errores
    function limpiarError(elemento) {
        const errorPrevio = elemento.parentNode.querySelector('.error-mensaje');
        if (errorPrevio) {
            errorPrevio.remove();
        }
        elemento.style.borderColor = '#95a5a6';
    }

    // Validación de nombre
    function validarNombre() {
        const nombre = nombreInput.value.trim();
        if (nombre.length < 2) {
            mostrarError(nombreInput, 'El nombre debe tener al menos 2 caracteres');
            return false;
        }
        if (nombre.length > 50) {
            mostrarError(nombreInput, 'El nombre no puede exceder 50 caracteres');
            return false;
        }
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre)) {
            mostrarError(nombreInput, 'El nombre solo puede contener letras y espacios');
            return false;
        }
        limpiarError(nombreInput);
        return true;
    }

    // Validación de email
    function validarEmail() {
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            mostrarError(emailInput, 'Por favor ingrese un email válido');
            return false;
        }
        limpiarError(emailInput);
        return true;
    }

    // Validación de teléfono
    function validarTelefono() {
        const telefono = telefonoInput.value.trim();
        if (telefono && !/^\d{10}$/.test(telefono)) {
            mostrarError(telefonoInput, 'El teléfono debe tener exactamente 10 dígitos');
            return false;
        }
        limpiarError(telefonoInput);
        return true;
    }

    // Validación de mensaje
    function validarMensaje() {
        const mensaje = mensajeTextarea.value.trim();
        if (mensaje.length < 10) {
            mostrarError(mensajeTextarea, 'El mensaje debe tener al menos 10 caracteres');
            return false;
        }
        if (mensaje.length > 500) {
            mostrarError(mensajeTextarea, 'El mensaje no puede exceder 500 caracteres');
            return false;
        }
        limpiarError(mensajeTextarea);
        return true;
    }

    // Validación de tipo de proyecto
    function validarTipoProyecto() {
        if (!tipoProyectoSelect.value) {
            mostrarError(tipoProyectoSelect, 'Por favor seleccione un tipo de proyecto');
            return false;
        }
        limpiarError(tipoProyectoSelect);
        return true;
    }

    // Eventos de validación en tiempo real
    nombreInput.addEventListener('blur', validarNombre);
    emailInput.addEventListener('blur', validarEmail);
    telefonoInput.addEventListener('blur', validarTelefono);
    mensajeTextarea.addEventListener('blur', validarMensaje);
    tipoProyectoSelect.addEventListener('change', validarTipoProyecto);

    // Contador de caracteres para el mensaje
    function actualizarContador() {
        const contador = document.getElementById('contador-caracteres');
        if (!contador) {
            const contadorDiv = document.createElement('div');
            contadorDiv.id = 'contador-caracteres';
            contadorDiv.style.fontSize = '12px';
            contadorDiv.style.color = '#7f8c8d';
            contadorDiv.style.marginTop = '5px';
            mensajeTextarea.parentNode.insertBefore(contadorDiv, mensajeTextarea.nextSibling);
        }
        const caracteres = mensajeTextarea.value.length;
        document.getElementById('contador-caracteres').textContent = `${caracteres}/500 caracteres`;
    }

    mensajeTextarea.addEventListener('input', actualizarContador);
    actualizarContador(); // Inicializar contador

    // Validación completa del formulario al enviar
    formulario.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevenir envío por defecto

        // Ejecutar todas las validaciones
        const nombreValido = validarNombre();
        const emailValido = validarEmail();
        const telefonoValido = validarTelefono();
        const mensajeValido = validarMensaje();
        const tipoProyectoValido = validarTipoProyecto();

        // Si todas las validaciones pasan
        if (nombreValido && emailValido && telefonoValido && mensajeValido && tipoProyectoValido) {
            // Mostrar mensaje de éxito
            mostrarMensajeExito();
            
            // Aquí normalmente enviarías los datos al servidor
            console.log('Formulario válido - Datos listos para enviar');
            
            // Opcional: limpiar formulario después del envío exitoso
            // formulario.reset();
        } else {
            // Mostrar mensaje de error general
            mostrarMensajeError();
        }
    });

    // Función para mostrar mensaje de éxito
    function mostrarMensajeExito() {
        const mensajeExito = document.createElement('div');
        mensajeExito.className = 'mensaje-exito';
        mensajeExito.style.cssText = `
            background-color: #d4edda;
            color: #155724;
            padding: 15px;
            border: 1px solid #c3e6cb;
            border-radius: 5px;
            margin: 20px 0;
            text-align: center;
            font-weight: bold;
        `;
        mensajeExito.textContent = '¡Formulario enviado exitosamente! Me pondré en contacto contigo pronto.';
        
        // Insertar mensaje antes del formulario
        formulario.parentNode.insertBefore(mensajeExito, formulario);
        
        // Remover mensaje después de 5 segundos
        setTimeout(() => {
            mensajeExito.remove();
        }, 5000);
    }

    // Función para mostrar mensaje de error general
    function mostrarMensajeError() {
        const mensajeError = document.createElement('div');
        mensajeError.className = 'mensaje-error';
        mensajeError.style.cssText = `
            background-color: #f8d7da;
            color: #721c24;
            padding: 15px;
            border: 1px solid #f5c6cb;
            border-radius: 5px;
            margin: 20px 0;
            text-align: center;
            font-weight: bold;
        `;
        mensajeError.textContent = 'Por favor corrige los errores en el formulario antes de enviarlo.';
        
        // Remover mensaje previo si existe
        const mensajePrevio = document.querySelector('.mensaje-error');
        if (mensajePrevio) {
            mensajePrevio.remove();
        }
        
        // Insertar mensaje antes del formulario
        formulario.parentNode.insertBefore(mensajeError, formulario);
        
        // Remover mensaje después de 5 segundos
        setTimeout(() => {
            mensajeError.remove();
        }, 5000);
    }

    // Funcionalidad adicional: Smooth scroll para navegación
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Funcionalidad adicional: Resaltar sección activa en navegación
    function actualizarNavegacionActiva() {
        const secciones = document.querySelectorAll('section[id]');
        const enlaces = document.querySelectorAll('nav a[href^="#"]');
        
        let seccionActual = '';
        
        secciones.forEach(seccion => {
            const rect = seccion.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
                seccionActual = seccion.getAttribute('id');
            }
        });
        
        enlaces.forEach(enlace => {
            enlace.classList.remove('activo');
            if (enlace.getAttribute('href') === '#' + seccionActual) {
                enlace.classList.add('activo');
            }
        });
    }

    // Actualizar navegación activa al hacer scroll
    window.addEventListener('scroll', actualizarNavegacionActiva);
    
    console.log('JavaScript cargado correctamente - Validaciones activas');
});
