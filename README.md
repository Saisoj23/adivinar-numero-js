# adivinar-numero-js

Proyecto de aplicación JS

## Descripción

Esta aplicación consiste en un minijuego del tipo árcade en el que debemos adivinar un número del 1 al 100 contando solamente con 8 intentos. A partir de esta premisa, se obtiene un juego de supervivencia en el que debemos obtener el mayor número de aciertos posibles antes de que nos acaben los intentos.

## Conceptos aplicados

Los siguientes puntos son los requerimientos pedidos por la actividad y su forma de aplicación dentro de la actividad:

- **Manejo de eventos:** Dentro de la aplicación existen diferentes eventos vinculados a los botones asociados a los formularios. Estos son llamados cuando el usuario envía información, en este caso, cuando trata de adivinar el número del juego o cuando ingresa su nombre o sus iniciales para cargar su puntuación.
- **Manipulación del DOM:** El DOM es manipulado en diferentes instancias dentro del juego. Por ejemplo, este se modifica al inicio cuando se carga la información del leaderboard. También se manipula al momento de instanciar las marcas de disparos sobre la diana dentro de la pantalla del juego. También se manipulan las clases de los elementos para hacer aparecer o desaparecer ventanas al terminar o reiniciar el juego, así como para manipular ciertas animaciones de los elementos.
- **Diseño responsivo:** El diseño de la aplicación está diseñado para adaptarse a dispositivos móviles, haciendo que al momento de cambiar la orientación de la pantalla, los elementos tomar una orientación más óptima. También se modifican los tamaños de ciertos márgenes y elementos para que se ajuste mejor a distintas resoluciones.
- **Uso de Flexbox o Grid:** En el caso de esta aplicación, las propiedades de flexbox son usadas para generar este diseño responsivo, cambiando las propiedades de distribución de los flex de filas a columnas cuando se ejecute en un dispositivo móvil. También se usa para centrar los elementos en diferentes navegadores sin caer en problemas de compatibilidad.

## Instrucciones

Al iniciar el juego se mostrará un input en el que el usuario puede ingresar un número del 1 al 100. Al enviar el número, el arma realizará una animación de disparo y en la diana aparecerá una marca que mostrará un aproximado de lo cerca que está nuestro número al número objetivo. Según la distancia de la marca hacia el centro, significará que el número está más o menos cerca. Además, si la marca se encuentra arriba del centro, significa que nuestro número es mayor que el objetivo, mientras que si está por debajo, significa que nuestro número es menor que el objetivo. Si nos quedamos sin intentos (que se muestran gráficamente debajo del arma) el juego terminara y veremos y se nos mostrará nuestro puntaje final junto con la opción de volver a empezar. Si nuestro puntaje es mayor al menor puntaje en el leaderboard, podremos ingresar nuestro nombre o iniciales, y nuestro puntaje será añadido a la tabla, a la vez que elimina el anterior puntaje más bajo.
