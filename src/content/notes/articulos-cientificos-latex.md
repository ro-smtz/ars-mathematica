---
title: "Escritura de Artículos Científicos con LaTeX"
course: "articulos-cientificos-latex"
---

Estas notas recopilan algunos paquetes, comandos y técnicas de uso frecuente
durante la escritura de artículos científicos en física, matemáticas e ingeniería.

---

## Estructura de un artículo científico

### Organización del contenido

LaTeX organiza el documento en secciones jerárquicas. Cada comando de sección
genera automáticamente el número y el título, y alimenta la tabla de contenidos.

#### Jerarquía de secciones

```latex
\section{Introducción}
\subsection{Motivación}
\subsubsection{Antecedentes}
\paragraph{Nota sobre notación}
```

En artículos se usa habitualmente hasta `\subsection`.

#### Tabla de contenidos

```latex
\tableofcontents
```

Se coloca inmediatamente después de `\begin{document}`. LaTeX necesita
compilarse dos veces para que los números de página sean correctos.

#### Numeración

Por defecto las secciones se numeran automáticamente. Para omitir el número
de una sección sin que aparezca en el índice:

```latex
\section*{Agradecimientos}
```

### El entorno `abstract`

El resumen va dentro del entorno `abstract`, antes del cuerpo del artículo.
La mayoría de las clases de documento lo formatean automáticamente.

```latex
\begin{document}

\begin{abstract}
    Se estudia la interacción luz-materia en el régimen de acoplamiento fuerte...
\end{abstract}

\section{Introducción}
```

> **Recomendación:** Escribe el abstract al final, cuando el artículo ya está
> completo. Es más fácil resumir algo que ya existe.

### Referencias cruzadas

LaTeX resuelve referencias cruzadas en dos procesos de compilación: en el
primero escribe las etiquetas a un archivo auxiliar `.aux`; en el segundo las
lee e inserta los números correctos. Por eso un documento recién etiquetado
puede mostrar `??` hasta la segunda compilación.

#### Convenciones de etiquetas

Es buena práctica usar un prefijo que identifique el tipo de objeto
referenciado:

| Prefijo   | Uso                        | Ejemplo               |
|-----------|----------------------------|-----------------------|
| `eq:`     | Ecuaciones                 | `eq:schrodinger`      |
| `fig:`    | Figuras                    | `fig:espectro`        |
| `tab:`    | Tablas                     | `tab:resultados`      |
| `sec:`    | Secciones                  | `sec:metodologia`     |
| `ch:`     | Capítulos (en libros/tesis)| `ch:introduccion`     |
| `lst:`    | Bloques de código          | `lst:hamiltoniano`    |

Estas convenciones no son obligatorias — LaTeX acepta cualquier cadena como
etiqueta — pero se han vuelto estándar en la comunidad científica y hacen el
código mucho más legible.

#### Uso básico

```latex
\begin{equation}
    \label{eq:schrodinger}
    i\hbar\frac{\partial \psi}{\partial t} = \hat{H}\psi
\end{equation}

Como se muestra en la ecuación~\eqref{eq:schrodinger}, el hamiltoniano...
```

El `~` inserta un espacio irrompible para evitar que el número de referencia
quede solo al inicio de una línea.

#### `\ref` vs `\eqref`

```latex
La figura~\ref{fig:espectro} muestra...   % → La figura 3 muestra...
La ecuación~\eqref{eq:schrodinger}...     % → La ecuación (1)...
```

`\eqref` (del paquete `amsmath`) agrega los paréntesis automáticamente y es
el estándar para ecuaciones. Para todo lo demás — figuras, tablas, secciones —
se usa `\ref`.

> **Recomendación:** Etiqueta todo desde el principio, aunque no lo vayas a
> referenciar de inmediato. Renumerar ecuaciones o figuras es automático en
> LaTeX; lo que no es automático es añadir etiquetas a posteriori cuando el
> documento ya tiene 30 páginas.

### Bibliografía

Existen dos formas de manejar la bibliografía en LaTeX: el entorno manual
`thebibliography` y el sistema automatizado `biblatex` + archivo `.bib`. El
primero es más simple pero no escala; el segundo es el estándar en publicación
científica.

#### El entorno `thebibliography`

La forma más básica: las referencias se escriben directamente en el documento,
sin archivo externo.

```latex
\begin{thebibliography}{9}
    \bibitem{einstein1905}
        A. Einstein, \textit{Annalen der Physik}, \textbf{17}, 891 (1905).
    \bibitem{dirac1928}
        P. A. M. Dirac, \textit{Proc. R. Soc. A}, \textbf{117}, 610 (1928).
\end{thebibliography}
```

El argumento `{9}` indica el número máximo de referencias (un dígito = hasta
9, dos dígitos = hasta 99). Se cita con `\cite{einstein1905}`.

> **Cuándo usarlo:** Documentos cortos, tareas, o cuando el formato de la
> revista lo exige explícitamente. Para cualquier artículo real, usa `biblatex`.

---

#### `biblatex` con `biber`

`biblatex` separa el contenido de las referencias (archivo `.bib`) de su
formateo (estilo de la revista). Cambiar de APS a AIP es cuestión de cambiar
una línea.

**El archivo `.bib`**

Cada referencia es una entrada con un tipo y una clave única. Los tipos más
comunes:

```bibtex
@article{basov2020,
    author  = {Basov, Dmitri N. and Asenjo-Garcia, Ana and Schuck, P. James},
    title   = {Polariton panorama},
    journal = {Nanophotonics},
    year    = {2020},
    volume  = {10},
    number  = {1},
    pages   = {549--577},
}

@book{jackson1999,
    author    = {Jackson, John David},
    title     = {Classical Electrodynamics},
    edition   = {3},
    publisher = {Wiley},
    year      = {1999},
}

@inproceedings{vaswani2017attention, 
    author    = {Ashish Vaswani and Noam Shazeer and Niki Parmar and Jakob Uszkoreit and Llion Jones and Aidan N. Gomez and Lukasz Kaiser and Illia Polosukhin}, 
    title     = {Attention Is All You Need}, 
    booktitle = {Advances in Neural Information Processing Systems (NeurIPS)}, 
    year      = {2017}, 
    pages     = {5998--6008}
}

@online{einstein1905arxiv,
    author     = {Albert Einstein},
    title      = {On the Electrodynamics of Moving Bodies},
    year       = {1905},
    eprint     = {physics/0605038},
    eprinttype = {arXiv},
    url        = {https://arxiv.org/abs/physics/0605038}
}
```

Los campos obligatorios varían por tipo; `author`, `title` y `year` son
universales. Las claves (`basov2020`, `jackson1999`) son arbitrarias — la
convención `apellido+año` es la más común.

##### Preámbulo y cuerpo

```latex
% Preámbulo
\usepackage[backend=biber]{biblatex}
\addbibresource{referencias.bib}

% Al final del documento
\printbibliography
```

##### Variantes de `\cite`

```latex
\cite{basov2020}          % [1]
\cite{basov2020,dirac1928} % [1,2]  — varias referencias a la vez
\textcite{jackson1999}    % Jackson [2]  — el autor como sujeto gramatical
\parencite{basov2020}     % (Basov, 2020)  — útil con estilos authoryear
```

##### Compilación

Con `biber` el orden de compilación es:

`pdflatex  documento.tex`

`biber     documento`

`pdflatex  documento.tex`

`pdflatex  documento.tex`

La mayoría de los editores modernos (TeXstudio, VS Code con LaTeX Workshop)
tienen un perfil que ejecuta esta secuencia automáticamente.

> **Recomendación:** Usa Google Scholar o el exportador de tu gestor de
> referencias (Zotero, Mendeley) para generar las entradas `.bib` — evita
> escribirlas a mano. Siempre verifica que `author`, `title`, `journal` y
> `year` estén completos antes de compilar.

## Aplicaciones y utilidades

### Escritura de texto matemático

LaTeX distingue dos modos de escritura matemática: en línea (*inline*) y en
despliegue (*display*). La diferencia no es solo visual — afecta el espaciado,
el tamaño de operadores y la posición de límites en sumatorias e integrales.

#### Modo inline

Se usa para expresiones dentro de un párrafo de texto.

```latex
La energía de un fotón es $E = h\nu$, donde $h$ es la constante de Planck.
```

> **Evita:** fracciones complejas o integrales en modo inline — LaTeX las
> comprime para no romper el interlineado y el resultado es ilegible. Usa
> `\dfrac{}{}` si necesitas forzar el tamaño display dentro de una línea,
> aunque lo mejor es reescribir la oración.

#### Modo display

Para ecuaciones que merecen su propia línea. Sin numeración:

```latex
\[
    \hat{H} = \frac{\hat{p}^2}{2m} + V(\hat{x})
\]
```

Con numeración, usar el entorno `{equation}` de `amsmath`.

#### Convenciones tipográficas

LaTeX no impone estas convenciones, pero son estándar en física y matemáticas:

| Objeto | Comando | Resultado |
|---|---|---|
| Vectores | `\mathbf{E}` o `\vec{E}` | $\mathbf{E}$ o $\vec{E}$ |
| Matrices | `\mathbf{M}` | $\mathbf{M}$ |
| Operadores cuánticos | `\hat{H}` | $\hat{H}$ |
| Números imaginarios | `\mathrm{i}` | $\mathrm{i}$ |
| Diferencial | `\mathrm{d}x` | $\mathrm{d}x$ |
| Transpuesta | `A^{\top}` | $A^{\top}$ |
| Conjugado complejo | `z^*` | $z^*$ |

El upright para $\mathrm{i}$ y $\mathrm{d}$ sigue la norma ISO 80000-2 y es
obligatorio en varias revistas europeas. Las revistas de la APS (Physical
Review) permiten la $d$ itálica — revisa las instrucciones del autor.

#### Texto dentro de modo matemático

Nunca escribas texto directamente en modo math — LaTeX lo interpreta como
producto de variables y elimina los espacios.

```latex
% Incorrecto
$x = 0  si  t > 0$

% Correcto
$x = 0 \quad \text{si} \quad t > 0$
```

`\text{}` usa la fuente del cuerpo del documento, respeta los espacios y
acepta modo math anidado.

#### Espaciado manual

LaTeX gestiona el espaciado matemático automáticamente, pero a veces es
necesario ajustarlo:

```latex
\,   % espacio fino  (3/18 em)  — entre diferencial e integrando
\:   % espacio medio (4/18 em)
\;   % espacio grueso (5/18 em)
\!   % espacio negativo — para corregir kerning en casos específicos
```

El uso más frecuente en física:

```latex
\int f(x)\,\mathrm{d}x        % espacio fino antes del diferencial
\sum_{n=0}^{\infty} a_n \, b_n
```

### Uso de imágenes externas

LaTeX no maneja imágenes de forma nativa — el paquete `graphicx` se encarga
de ello. Los formatos recomendados para `pdflatex` son PDF, PNG y JPG; para
figuras vectoriales (diagramas, gráficas) siempre prefiere PDF o EPS sobre PNG.

```latex
\usepackage{graphicx}
```

#### Incluir una imagen simple

```latex
\includegraphics[width=0.8\textwidth]{figura.pdf}
```

Las opciones de escala más comunes:

```latex
\includegraphics[width=0.5\textwidth]{fig.pdf}   % fracción del ancho de texto
\includegraphics[height=4cm]{fig.pdf}             % altura fija
\includegraphics[scale=0.7]{fig.pdf}              % factor de escala directo
```

#### El entorno `figure`

En artículos científicos las imágenes casi nunca se insertan en línea — van
dentro de un entorno flotante `figure`, que LaTeX posiciona automáticamente
para optimizar el flujo del texto.

```latex
\begin{figure}[htbp]
    \centering
    \includegraphics[width=0.8\textwidth]{espectro.pdf}
    \caption{Espectro de transmisión del sistema de polaritones en función
             de la frecuencia de prueba.}
    \label{fig:espectro}
\end{figure}
```

El argumento de posición `[htbp]` le indica a LaTeX el orden de preferencia:

| Especificador | Significado |
|---|---|
| `h` | *here* — donde está el código |
| `t` | *top* — parte superior de la página |
| `b` | *bottom* — parte inferior de la página |
| `p` | *page* — página dedicada a flotantes |

LaTeX intenta `h` primero; si no cabe, prueba `t`, luego `b`, luego `p`. En
documentos de dos columnas, `figure*` ocupa ambas columnas.

> **Recomendación:** Evita `[h!]` o `[H]` (del paquete `float`) como solución
> a problemas de posicionamiento — fuerzan la figura en un lugar que puede
> romper el flujo del texto. Si una figura no cabe donde quieres, casi siempre
> es síntoma de que el párrafo anterior es demasiado largo o de que la figura
> es demasiado grande.

#### `\caption` y `\label`

El `\caption` siempre va **antes** del `\label`, y el `\label` siempre va
**dentro** del entorno `figure` — si lo pones fuera, `\ref{fig:...}` devolverá
el número de sección en lugar del número de figura.

```latex
\caption{Descripción de la figura.}
\label{fig:mi-figura}   % siempre después del \caption, dentro de figure
```

#### Ruta de las imágenes

Si organizas las figuras en una carpeta, puedes declarar la ruta base en el
preámbulo para no repetirla en cada `\includegraphics`:

```latex
\graphicspath{{./figuras/}{./imagenes/}}
```

A partir de ahí basta con:

```latex
\includegraphics[width=\textwidth]{espectro.pdf}   % busca en ./figuras/ automáticamente
```

#### Dos figuras en paralelo

Para colocar dos figuras lado a lado con descripciones independientes:

```latex
% en el preámbulo
\usepackage{subcaption}

% en el documento
\begin{figure}[htbp]
    \centering
    \begin{subfigure}{0.48\textwidth}
        \includegraphics[width=\textwidth]{espectro_te.pdf}
        \caption{Polarización TE.}
        \label{subfig:espectro-te}
    \end{subfigure}
    \hfill
    \begin{subfigure}{0.48\textwidth}
        \includegraphics[width=\textwidth]{espectro_tm.pdf}
        \caption{Polarización TM.}
        \label{subfig:espectro-tm}
    \end{subfigure}
    \caption{Espectros de transmisión para ambas polarizaciones.}
    \label{fig:espectros}
\end{figure}
```

`\hfill` empuja las dos subfiguras hacia los márgenes dejando el espacio
sobrante en el centro. Las subfiguras se referencian individualmente con
`\ref{subfig:espectro-te}` o como conjunto con `\ref{fig:espectros}`.

### Paquetes indispensables

#### El paquete `amsmath`

Extiende las capacidades matemáticas básicas de LaTeX y proporciona los entornos más utilizados para escribir ecuaciones en artículos científicos.

```latex
% Preámbulo
\usepackage{amsmath}
```

**Entorno `equation`**

Permite numerar una ecuación individual.
Es quizá el entorno más empleado en documentos científicos.

```latex
\begin{equation}
    E = mc^2
\end{equation}
```

Sin embargo, en muchas ocasiones, el contenido de una ecuación puede ser demasiado largo para mostrarse correctamete en una sola línea.
En este caso, en necesario insertar saltos de línea _dentro de la ecuación_. 
Al hacer eso, es importante recordar algunas reglas para mejorar la legibilidad de las expresiones.

1. En general, uno debe cortar una ecuación _antes_ de un signo de igual o de un operador binario;
2. Se prefiere un salto de línea antes de un signo de igual que de un operador.
3. Se prefiere un salto de línea antes de signo de suma o resta que de un signo de multiplicación;
4. Cualquier otro salto de línea debería ser evitado si es posible.


**Entorno `{multline}`**

Útil para expresiones matemáticas que deben dividirse en varias líneas se utiliza el entorno `{multline}`, que permite realizar saltos de línea con el comando `\\`:

```latex
\begin{multline}
    a+b+c+d+e+f+g+h+i+j+k+l+m+n\\
    = x+y+z
\end{multline}
```

La primera línea de la ecuación se alineará a la izquierda, la última, a la derecha, y todas las demás, al centro.

> Ya que, aunque abarca varias líneas en el documento, se trata de una sola expresión matemática, se le asigna un único número de ecuación.

**Entorno `gather`**

Para escribir múltiples ecuaciones dentro del mismo entorno `{equation}` sin alineación en particular, se utiliza el entorno `{gather}`.

```latex
\begin{gather}
    a = b+c \\
    d = e+f
\end{gather}
```

En este caso, existe un número de ecuacion por cada línea.
Es de alguna manera, una manera equivalente de escribir

```latex
\begin{equation}
    a = b+c
\end{equation}
\begin{equation}
    d = e+f
\end{equation}
```

pero eliminando el espacio innecesario que existe entre ambas ecuaciones.

**Entorno `align`**

Cuando se desea alinear el conjunto de ecuaciones que se quiere imprimir, se utiliza el entorno `{align}`.
Permite alinear varias ecuaciones utilizando el símbolo `&`, muy similar a como ocurre dentro de un entorno `{tabular}`.
Para producir un espaciado correcto, el símbolo `&` debe colocarse _antes_ de cualquier operador binario.

```latex
\begin{align}
    f(x) &= x^2 + 1 \\
    g(x) &= x^3 - 2x
\end{align}
```

Además, este mismo entorno permite alinear múltiples conjuntos de ecuaciones en una misma línea.
Se usa un símbolo de `&` para separar los elementos alineados:

```latex
\begin{align}
    a & \succeq b & c & \leq d \\
    a & \geq d & d & \prec c
\end{align}
```


**Cómo referenciar ecuaciones**

La práctica estándar de LaTeX es utilizar `\label{eq:etiqueta}` para referenciar ecuaciones.

```latex
\begin{equation}
    \label{eq:schrodinger}
    i\hbar\frac{\partial\psi}{\partial t}=H\psi
\end{equation}
```

Luego podemos hacer referencia usando, `(\ref{eq:etiqueta})` o `\eqref{eq:etiqueta}`, que imprime los paréntesis alrededor del número de la ecuación automáticamente.

```latex
La ecuación (\ref{eq:schrodinger}) se llama \emph{ecuación de Schrödinger}.
```

Para colocar un número de ecuación arbitrario, se usa `\tag{}`.

---

#### El paquete `mathtools`

El paquete `mathtools` amplía las funcionalidades de `amsmath` e incorpora numerosas herramientas útiles para la escritura matemática avanzada. En la práctica, muchos autores lo utilizan como reemplazo directo de `amsmath`.

```latex
\usepackage{mathtools}
```

Entre sus características más útiles se encuentran los símbolos para definiciones matemáticas:

```latex
f(x) \coloneqq x^2 + 1
```

que produce $f(x) \coloneqq x^2 + 1$.

Aunque no es indispensable para documentos sencillos, `mathtools` se ha convertido en una extensión muy popular de `amsmath` en artículos científicos y tesis de matemáticas y física.

---

#### Los paquetes `amssymb` y `amsfonts`

Estos paquetes proporcionan muchos de los símbolos matemáticos utilizados habitualmente en física y matemáticas, así como distintos alfabetos matemáticos.

```latex
\usepackage{amsfonts}
\usepackage{amssymb}
```

**Blackboard bold `\mathbb{}`**

Utilizado principalmente para conjuntos numéricos.

```latex
\mathbb{R}
```

**Fraktur `\mathfrak{}`**

Común en álgebra y teoría de grupos.

```latex
\mathfrak{g}
```

**Caligráfico `\mathcal{}`**

Frecuente para espacios vectoriales, operadores y funcionales.

```latex
\mathcal{H}
```

Ejemplo típico

```latex
\begin{equation}
    \forall x \in \mathbb{R},
    \qquad
    f : \mathbb{R} \rightarrow \mathbb{R}
\end{equation}
```

$$
    \forall x \in\mathbb{R}, \qquad f : \mathbb{R}\rightarrow\mathbb{R}
$$

> **Recomendación:** Usualmente se cargan en conjunto las tres paqueterías básicas de matemáticas:
> `\usepackage{amsmath,amssymb,amsfonts}`

---

#### El paquete `bm`

El paquete `bm` permite escribir símbolos matemáticos en negrita, incluyendo letras griegas, operadores y otros símbolos que no pueden formatearse correctamente con comandos como `\mathbf`.

```latex
\usepackage{bm}
```

Por ejemplo:

```latex
\bm{k}, % compárese con \mathbf{k}
\bm{\alpha},
\bm{\nabla} % compárese con simplemente \nabla
```

produce vectores y símbolos matemáticos en negrita: $\bm{k}$ (no $\mathbf{k}$), $\bm{\alpha}$ y $\bm{\nabla}$ (no $\nabla$).

Esto resulta especialmente útil en física, donde es habitual representar vectores, tensores o cantidades multidimensionales mediante símbolos en negrita.

En estos casos, `bm` proporciona una solución robusta y ampliamente utilizada en la literatura científica.

Muchos autores emplean `bm` incluso cuando utilizan otros paquetes de física, debido a su simplicidad y compatibilidad con una gran variedad de documentos.

---

#### El paquete `physics`

Proporciona comandos abreviados para derivadas, vectores, notación de Dirac,
conmutadores y otros objetos matemáticos frecuentes en física.

```latex
\usepackage{physics}
```

**Derivadas ordinarias**

| Comando `physics` | LaTeX equivalente | Resultado |
|---|---|---|
| `\dv{f}{x}` | `\frac{\mathrm{d}f}{\mathrm{d}x}` | $\dfrac{\mathrm{d}f}{\mathrm{d}x}$ |
| `\dv[2]{f}{x}` | `\frac{\mathrm{d}^2f}{\mathrm{d}x^2}` | $\dfrac{\mathrm{d}^2f}{\mathrm{d}x^2}$ |
| `\dv{x}(f+g)` | `\frac{\mathrm{d}}{\mathrm{d}x}(f+g)` | $\dfrac{\mathrm{d}}{\mathrm{d}x}(f+g)$ |

**Derivadas parciales**

| Comando `physics` | LaTeX equivalente | Resultado |
|---|---|---|
| `\pdv{f}{x}` | `\frac{\partial f}{\partial x}` | $\dfrac{\partial f}{\partial x}$ |
| `\pdv[2]{f}{x}` | `\frac{\partial^2 f}{\partial x^2}` | $\dfrac{\partial^2 f}{\partial x^2}$ |
| `\pdv{f}{x}{y}` | `\frac{\partial^2 f}{\partial x\,\partial y}` | $\dfrac{\partial^2 f}{\partial x\,\partial y}$ |

**Delimitadores automáticos**

Los delimitadores se ajustan automáticamente al tamaño del contenido.

| Comando `physics` | LaTeX equivalente | Resultado |
|---|---|---|
| `\qty( \frac{a}{b} )` | `\left( \frac{a}{b} \right)` | $\left( \dfrac{a}{b} \right)$ |
| `\qty[ \frac{a}{b} ]` | `\left[ \frac{a}{b} \right]` | $\left[ \dfrac{a}{b} \right]$ |
| `\qty{ \frac{a}{b} }` | `\left\{ \frac{a}{b} \right\}` | $\left\lbrace \dfrac{a}{b} \right\rbrace$ |

**Valor absoluto y norma**

| Comando `physics` | LaTeX equivalente | Resultado |
|---|---|---|
| `\abs{x}` | `\left\lvert x \right\rvert` | $\left\lvert x \right\rvert$ |
| `\norm{\mathbf{v}}` | `\left\lVert \mathbf{v} \right\rVert` | $\left\lVert \mathbf{v} \right\rVert$ |

**Vectores**

| Comando `physics` | LaTeX equivalente | Resultado |
|---|---|---|
| `\vb{E}` | `\mathbf{E}` | $\mathbf{E}$ |
| `\vb{r}` | `\mathbf{r}` | $\mathbf{r}$ |
| `\vb*{\nabla}` | `\boldsymbol{\nabla}` | $\boldsymbol{\nabla}$ |

El comando `\vb*{}` se usa para símbolos griegos y operadores que no tienen variante
bold directa — `\vb{}` solo funciona correctamente con letras latinas.

**Notación de Dirac**

| Comando `physics` | LaTeX equivalente | Resultado |
|---|---|---|
| `\ket{\psi}` | `\left\lvert \psi \right\rangle` | $\left\lvert \psi \right\rangle$ |
| `\bra{\psi}` | `\left\langle \psi \right\rvert` | $\left\langle \psi \right\rvert$ |
| `\braket{\phi\|\psi}` | `\left\langle \phi \middle\| \psi \right\rangle` | $\left\langle \phi \middle\vert \psi \right\rangle$ |
| `\matrixel{\phi}{H}{\psi}` | `\left\langle \phi \middle\| H \middle\| \psi \right\rangle` | $\left\langle \phi \middle\vert H \middle\vert \psi \right\rangle$ |
| `\expval{A}` | `\left\langle A \right\rangle` | $\left\langle A \right\rangle$ |
| `\expval{H}{\psi}` | `\left\langle \psi \middle\| H \middle\| \psi \right\rangle` | $\left\langle \psi \middle\vert H \middle\vert \psi \right\rangle$ |

**Conmutadores**

| Comando `physics` | LaTeX equivalente | Resultado |
|---|---|---|
| `\comm{A}{B}` | `\left[ A, B \right]` | $\left[ A, B \right]$ |
| `\acomm{A}{B}` | `\left\{ A, B \right\}` | $\left\lbrace A, B \right\rbrace$ |

> **Recomendación:** El paquete `physics` puede ahorrar una gran cantidad de
> código en mecánica cuántica, electromagnetismo y física matemática. Sin
> embargo, algunos autores prefieren evitarlo en artículos destinados a
> revistas porque redefine ciertos comandos estándar de LaTeX — en particular
> `\qty`, que entra en conflicto con `siunitx` v3. Si usas ambos paquetes,
> carga `physics` primero.

---

#### El paquete `siunitx`

El Sistema Internacional de Unidades (SI) establece no solo las unidades de
medida, sino también cómo deben escribirse tipográficamente. Algunas reglas
que frecuentemente se violan en textos científicos:

- Las unidades son símbolos, no abreviaturas — se escriben en redonda
  (upright), nunca en itálica: $10\ \mathrm{m}$, no $10\ m$.
- Hay un espacio entre el número y la unidad: $9.8\ \mathrm{m/s^2}$,
  no $9.8\mathrm{m/s^2}$.
- Los prefijos son inseparables de la unidad: $\mathrm{\mu m}$ es una
  unidad; $\mathrm{\mu}\ \mathrm{m}$ es un error.
- El separador decimal es el punto en inglés y la coma en español — en
  artículos internacionales siempre se usa punto.

El paquete `siunitx` hace cumplir estas convenciones automáticamente.

```latex
\usepackage{siunitx}
```

**Cantidades físicas**

El comando principal es `\qty{número}{unidad}`:

| Comando | Resultado |
|---|---|
| `\qty{3.14}{\meter}` | $3.14\ \mathrm{m}$ |
| `\qty{25}{\celsius}` | $25\ \mathrm{°C}$ |
| `\qty{9.8}{\meter\per\second\squared}` | $9.8\ \mathrm{m\ s^{-2}}$ |
| `\qty{1.602e-19}{\coulomb}` | $1.602 \times 10^{-19}\ \mathrm{C}$ |

**Unidades aisladas**

Cuando se necesita escribir una unidad sin cantidad, se usa `\unit{}`:

| Comando | Resultado |
|---|---|
| `\unit{\joule}` | $\mathrm{J}$ |
| `\unit{\electronvolt}` | $\mathrm{eV}$ |
| `\unit{\nano\meter}` | $\mathrm{nm}$ |
| `\unit{\meter\per\second}` | $\mathrm{m\ s^{-1}}$ |
| `\unit{\joule\per\mole\per\kelvin}` | $\mathrm{J\ mol^{-1}\ K^{-1}}$ |

Los prefijos (`\nano`, `\micro`, `\kilo`, etc.) se anteponen directamente
a la unidad como comandos encadenados.

**Números y notación científica**

`\num{}` formatea números sin unidad — maneja notación científica, separadores
de miles y redondeo:

| Comando | Resultado |
|---|---|
| `\num{1.23e8}` | $1.23 \times 10^{8}$ |
| `\num{6.022e23}` | $6.022 \times 10^{23}$ |
| `\num{0.000123}` | $0.000123$ |

**Rangos e incertidumbres**

| Comando | Resultado |
|---|---|
| `\qtyrange{400}{700}{\nano\meter}` | $400\ \mathrm{nm}$ a $700\ \mathrm{nm}$ |
| `\qty{1.234(5)}{\volt}` | $1.234 \pm 0.005\ \mathrm{V}$ |
| `\qty{1.234 +- 0.005}{\volt}` | $1.234 \pm 0.005\ \mathrm{V}$ |

La notación `(5)` es la forma compacta estándar de incertidumbre — el número
entre paréntesis afecta al último dígito significativo.

**Alineación en tablas**

En tablas experimentales es frecuente necesitar alinear números respecto al
punto decimal.
El paquete `siunitx` provee el tipo de columna `S` para esto:

```latex
\begin{tabular}{l S[table-format=3.3]}
    \toprule
    Muestra & {$\lambda$ (\unit{\nano\meter})} \\
    \midrule
    A &  400.123 \\
    B &   85.4   \\
    C & 1200.0   \\
    \bottomrule
\end{tabular}
```

Los encabezados de columnas `S` deben ir entre llaves `{}` para que `siunitx`
no intente interpretarlos como números.

> **Recomendación:** Nunca escribas unidades manualmente con `m/s`, `10~m/s`
> o `$10\ \text{m/s}$` — el resultado viola las convenciones tipográficas del
> SI y es inconsistente entre compiladores. `siunitx` garantiza espaciado,
> fuente y formato correctos en todos los contextos. Si el artículo va a una
> revista en español, configura el separador decimal con
> `\sisetup{locale = ES}` en el preámbulo.

---

#### El paquete `mhchem`

Permite escribir fórmulas químicas, reacciones y ecuaciones químicas con una
sintaxis legible que compila a tipografía conforme a las recomendaciones de la
IUPAC.

```latex
\usepackage[version=4]{mhchem}
```

El comando central es `\ce{}`, que interpreta su argumento con reglas
propias — distintas a las de modo math.

**Fórmulas, iones y estados físicos**

| Comando | Resultado |
|---|---|
| `\ce{H2O}` | $\text{H}_2\text{O}$ |
| `\ce{C6H12O6}` | $\text{C}\_6\text{H}_{12}\text{O}_6$ |
| `\ce{Na+}` | $\text{Na}^+$ |
| `\ce{SO4^2-}` | $\text{SO}_4^{2-}$ |
| `\ce{H2O(l)}` | $\text{H}\_2\text{O}_{(\text{l})}$ |
| `\ce{NaCl(aq)}` | $\text{NaCl}_{(\text{aq})}$ |

Los subíndices numéricos se escriben directamente sin `_`; `mhchem` los
interpreta automáticamente.

**Reacciones y equilibrio**

| Comando | Resultado |
|---|---|
| `\ce{A -> B}` | $\text{A} \rightarrow \text{B}$ |
| `\ce{2H2 + O2 -> 2H2O}` | $2\,\text{H}_2 + \text{O}_2 \rightarrow 2\,\text{H}_2\text{O}$ |
| `\ce{A <=> B}` | $\text{A} \rightleftharpoons \text{B}$ |
| `\ce{A ->[h\nu] B}` | $\text{A} \xrightarrow{h\nu} \text{B}$ |
| `\ce{A ->[cat.] B}` | $\text{A} \xrightarrow{\text{cat.}} \text{B}$ |

Las condiciones experimentales van entre corchetes después de `->`: el primer
argumento aparece encima de la flecha y el segundo debajo —
`\ce{A ->[encima][debajo] B}`.

**Isótopos y reacciones nucleares**

| Comando | Resultado |
|---|---|
| `\ce{^{14}C}` | ${}^{14}\text{C}$ |
| `\ce{^{14}C -> ^{14}N + e^- + \nu}` | ${}^{14}\text{C} \rightarrow {}^{14}\text{N} + e^- + \nu$ |

> **Recomendación:** Utiliza siempre `\ce{}` para fórmulas químicas — nunca
> modo math manual. Además de simplificar el código, garantiza subíndices,
> cargas y estados físicos con tipografía conforme a la IUPAC.

---

#### El paquete `chemfig`

Permite dibujar estructuras moleculares directamente en LaTeX, sin software
externo. La sintaxis describe la molécula como una secuencia de átomos
conectados por enlaces con ángulos explícitos.

```latex
\usepackage{chemfig}
```

**Tipos de enlace**

| Comando | Tipo |
|---|---|
| `\chemfig{A-B}` | Simple |
| `\chemfig{A=B}` | Doble |
| `\chemfig{A~B}` | Triple |

**Ángulos de enlace**

Por defecto los enlaces son horizontales. El ángulo se especifica entre
corchetes:

```latex
\chemfig{A-[:30]B}     % ángulo absoluto de 30°
\chemfig{A-[::+45]B}   % ángulo relativo al enlace anterior
\chemfig{A-[:-45]B}    % ángulo absoluto de -45°
```

**Moléculas representativas**

```latex
% Metano
\chemfig{H-C(-[2]H)(-[6]H)-H}

% Etanol
\chemfig{CH_3-CH_2-OH}

% Isobutano (ramificación)
\chemfig{CH_3-CH(-[2]CH_3)-CH_3}

% Benceno (anillo aromático)
\chemfig{*6(-=-=-=)}
```

En `*6(-=-=-=)`, el `*6` indica un anillo de 6 miembros; los `=` y `-`
alternan enlaces dobles y simples dentro del anillo.

> **Recomendación:** Usa `\ce{}` de `mhchem` para fórmulas en línea dentro
> del texto y reserva `chemfig` para dibujar estructuras. Los dos paquetes son
> completamente compatibles y se cargan juntos sin conflicto:
>
> ```latex
> \usepackage[version=4]{mhchem}
> \usepackage{chemfig}
> ```
>
> `chemfig` es potente pero requiere práctica — para la mayoría de los
> artículos basta con moléculas lineales, ramificaciones simples y anillos
> aromáticos.

---

#### El paquete `booktabs`

Las tablas predeterminadas de LaTeX usan líneas verticales y `\hline` —
una convención heredada de las primeras impresoras que va en contra de las
recomendaciones tipográficas modernas. `booktabs` provee tres reglas
horizontales con grosores diferenciados que son el estándar en revistas
científicas.

```latex
\usepackage{booktabs}
```

| Comando | Uso |
|---|---|
| `\toprule` | Línea superior de la tabla |
| `\midrule` | Separador entre encabezado y cuerpo |
| `\bottomrule` | Línea inferior de la tabla |
| `\cmidrule{i-j}` | Línea parcial entre columnas $i$ y $j$ |

**Ejemplo completo**

```latex
\begin{table}[htbp]
    \centering
    \caption{Propiedades ópticas de las cavidades estudiadas.}
    \label{tab:cavidades}
    \begin{tabular}{l S[table-format=3.1] S[table-format=1.3]}
        \toprule
        Cavidad & {$\lambda_0$ (\unit{\nano\meter})} & {$Q$} \\
        \midrule
        DBR-1   & 780.0 & 1.200 \\
        DBR-2   & 850.5 & 0.980 \\
        FP-1    & 632.8 & 2.150 \\
        \bottomrule
    \end{tabular}
\end{table}
```

El ejemplo combina `booktabs` con `siunitx` (columnas `S`) — es el patrón
más común en tablas experimentales.

> **Recomendación:** Nunca uses líneas verticales ni `\hline` en tablas
> científicas. Si sientes la necesidad de una línea vertical, casi siempre
> es señal de que la tabla necesita reorganizarse.

---

#### El paquete `hyperref`

Convierte automáticamente todas las referencias cruzadas, citas, entradas
de la tabla de contenidos y URLs en hipervínculos dentro del PDF — sin
cambiar nada en el cuerpo del documento.

```latex
\usepackage{hyperref}
```

> **Regla crítica:** `hyperref` debe ser el **último paquete** en cargarse.
> Redefine internamente muchos comandos de LaTeX; cargarlo antes que otros
> paquetes genera conflictos difíciles de diagnosticar.

**Opciones básicas**

```latex
\usepackage[
    colorlinks  = true,
    linkcolor   = blue,
    citecolor   = blue,
    urlcolor    = blue,
]{hyperref}
```

Con `colorlinks = true` los enlaces se colorean en lugar de enmarcarse en
un rectángulo. Para versiones de impresión conviene desactivar el color:

```latex
\usepackage[hidelinks]{hyperref}
```

**Metadatos del PDF**

`hyperref` permite incrustar metadatos directamente en el PDF:

```latex
\hypersetup{
    pdftitle  = {Título del artículo},
    pdfauthor = {Nombre Apellido},
}
```

**Compatibilidad con `biblatex`**

`hyperref` convierte las citas de `biblatex` en hipervínculos a la
bibliografía automáticamente — no requiere configuración adicional. El
orden de carga correcto en el preámbulo es:

```latex
\usepackage{amsmath}
\usepackage{biblatex}
% ... resto de paquetes ...
\usepackage{hyperref}   % siempre al final
```

**URLs en el texto**

```latex
\url{https://journals.aps.org}
\href{https://journals.aps.org}{Physical Review Letters}
```

`\url{}` imprime la URL tal cual; `\href{}{}` permite texto alternativo.
Sin `hyperref` ambos comandos no están disponibles.

## Maquetación del documento

### El paquete `geometry`

El paquete `geometry` controla las dimensiones de la página y los márgenes.
Sin él, LaTeX usa los márgenes predeterminados de la clase — generalmente
amplios para `article`.

```latex
\usepackage{geometry}
```

#### Opciones básicas

La forma más legible es pasar todas las opciones en un bloque:

```latex
\usepackage[
    % tamaño de papel
    letterpaper,
    % márgenes
    top    = 2.5cm,
    bottom = 2.5cm,
    left   = 2.5cm,
    right  = 2.5cm,
]{geometry}
```

Los tamaños de página más comunes:

| Opción | Tamaño |
|---|---|
| `letterpaper` | 8.5 × 11 in (EUA) |
| `a4paper` | 210 × 297 mm (Europa, estándar internacional) |
| `a5paper` | 148 × 210 mm |

#### Las opciones `includefoot` e `includehead`

Por defecto, LaTeX calcula los márgenes excluyendo el encabezado y el pie
de página — es decir, el encabezado crece hacia afuera del margen `top`
declarado, y el pie de página hacia afuera del margen `bottom`. Esto
significa que el margen real entre el texto y el borde de la página es
mayor que el declarado, pero el encabezado y pie pueden quedar muy cerca
del borde físico.

Las opciones `includehead` e `includefoot` especifican a `geometry` que el margen
declarado incluya el espacio del encabezado y el pie de página, respectivamente:

```latex
\usepackage[
    letterpaper,
    top      = 2.5cm,
    bottom   = 2.5cm,
    left     = 2.5cm,
    right    = 2.5cm,
    includehead,
    includefoot,
]{geometry}
```

Con estas opciones, el margen `top` de 2.5 cm incluye el encabezado — el
texto del cuerpo empieza más abajo, pero la distancia entre el encabezado
y el borde superior de la página es exactamente la declarada. Es el
comportamiento más predecible cuando se diseña una plantilla con
encabezados personalizados.

> **Recomendación:** Es recomendable usar siempre `includehead` e `includefoot`
> cuando se trabaja con `fancyhdr`. Sin ellas, los márgenes visuales del documento
> dependen de la altura del encabezado y el pie, que puede variar entre
> páginas.

---

### El paquete `fancyhdr`

El paquete `fancyhdr` da control total sobre el contenido y estilo de encabezados y
pies de página. Es el paquete estándar para tesis, reportes y plantillas
de revistas construidas desde cero.

```latex
\usepackage{fancyhdr}
\pagestyle{fancy}
```

El comando `\pagestyle{fancy}` activa el estilo de `fancyhdr` en todo el documento.
Las páginas que deben tener un estilo distinto (portada, por ejemplo) usan
`\thispagestyle{empty}`.

#### Anatomía de la página

`fancyhdr` divide el encabezado y el pie de página en tres zonas: izquierda (`L`),
centro (`C`) y derecha (`R`). Cada zona se define con:

```latex
% encabezado
\fancyhead[L]{izquierda}
\fancyhead[C]{centro}
\fancyhead[R]{derecha}
% pie de página
\fancyfoot[L]{izquierda}
\fancyfoot[C]{centro}
\fancyfoot[R]{derecha}
```

Para limpiar todas las zonas antes de redefinirlas:

```latex
\fancyhf{}   % limpia encabezado y pie de página
```

#### Ejemplo: tesis o reporte

Un estilo clásico con título del capítulo a la izquierda y número de
página a la derecha:

```latex
\fancyhf{}
\fancyhead[L]{\leftmark}        % nombre del capítulo actual
\fancyhead[R]{\thepage}         % número de página
\renewcommand{\headrulewidth}{0.4pt}
\renewcommand{\footrulewidth}{0pt}
```

`\leftmark` contiene el nombre del capítulo o sección actual,
actualizado automáticamente por LaTeX. `\headrulewidth` y
`\footrulewidth` controlan el grosor de la línea divisoria — `0pt` la
elimina.

#### Ejemplo: plantilla de revista desde cero

Si se construye una plantilla propia que simule el estilo de una revista,
`fancyhdr` permite imprimir información fija en todas las páginas — el
nombre de la revista en el encabezado y el DOI en el pie:

```latex
\fancyhf{}
\fancyhead[C]{\small\textit{Journal of Applied Physics}}
\fancyfoot[L]{\small DOI: 10.1063/5.0000000}
\fancyfoot[C]{\thepage}
\renewcommand{\headrulewidth}{0.4pt}
\renewcommand{\footrulewidth}{0.4pt}
```

Esto produce un encabezado con el nombre de la revista centrado y un pie
con el DOI en la esquina inferior izquierda y el número de página al
centro — estructura típica de artículos de AIP Publishing.

> **En revistas reales:** Las clases de revista (`revtex4-2`, `iopart`,
> `optica-article`) definen sus propios encabezados y pies — no es recomendable
> usar `fancyhdr` en documentos destinados a enviarse a revisión, ya que entraría en
> conflicto con la clase. El paquete `fancyhdr` es para documentos donde el usuario controla
> completamente el diseño: tesis, reportes o preprints con formato propio.

### El paquete `enumitem`

`enumitem` extiende los entornos de lista estándar (`itemize`,
`enumerate`, `description`) con control preciso sobre espaciado,
etiquetas y sangría.

```latex
\usepackage{enumitem}
```

#### Espaciado

El problema más frecuente con las listas en LaTeX es el espaciado vertical
excesivo entre ítems. El paquete `enumitem` lo resuelve con `[noitemsep]` y `[nosep]`:

```latex
\begin{itemize}[noitemsep]
    \item Primer ítem
    \item Segundo ítem
\end{itemize}
```

Además, es posible escoger el márgen izquierdo usando la opción `[leftmargin=...]`.

| Opción | Efecto |
|---|---|
| `noitemsep` | Elimina el espacio extra entre ítems |
| `nosep` | Elimina todo el espacio vertical — entre ítems y alrededor de la lista |
| `topsep=6pt` | Controla el espacio antes y después de la lista |
| `itemsep=4pt` | Controla el espacio entre ítems |
| `leftmargin=2mm` | Controla el margen izquierdo |
| `leftmargin=*` | Elimina por completo el margen izquierdo |

#### Etiquetas personalizadas

```latex
% Enumerate con letras
\begin{enumerate}[label=\alph*.]
    \item Primera opción
    \item Segunda opción
\end{enumerate}

% Enumerate con números romanos
\begin{enumerate}[label=\roman*.]
    \item Primera opción
    \item Segunda opción
\end{enumerate}

% Itemize con guión en lugar de bullet
\begin{itemize}[label=--]
    \item Primer ítem
    \item Segundo ítem
\end{itemize}
```

#### Configuración global

Para aplicar un estilo a todos los entornos de lista del documento:

```latex
\setlist{noitemsep}             % elimina espaciado en todas las listas
\setlist[itemize]{label=--}     % guión en todos los itemize
\setlist[enumerate]{label=\arabic*.}  % números arábigos en todos los enumerate
```

> **Recomendación:** En artículos científicos, `noitemsep` y `leftmargin=*` global es casi
> siempre la decisión correcta — el espaciado predeterminado de LaTeX está
> pensado para documentos de texto corrido, no para listas compactas de
> resultados o pasos experimentales.

---

### El paquete `caption`

`caption` permite personalizar el formato de los pies de figura y tabla —
fuente, separador, alineación y estilo del label.

```latex
\usepackage{caption}
```

#### Opciones comunes

```latex
\usepackage[
    font       = small,
    labelfont  = bf,
    labelsep   = period,
    justification = raggedright,
]{caption}
```

| Opción | Valores comunes | Efecto |
|---|---|---|
| `font` | `small`, `footnotesize`, `normalsize` | Tamaño del texto del caption |
| `labelfont` | `bf`, `it`, `sc` | Estilo del label (`Figura 1`) |
| `labelsep` | `period`, `colon`, `space`, `quad` | Separador entre label y texto |
| `justification` | `raggedright`, `centering`, `justified` | Alineación del texto |

#### Resultado del ejemplo

La configuración anterior produce captions con texto en `\small`, label en
negrita (`**Figura 1**`), separados por un punto, y alineados a la
izquierda — el estilo más frecuente en revistas de física como Physical
Review y Optics Letters.

#### Captions fuera de flotantes

`caption` también permite añadir pies de figura a imágenes que no están
dentro de un entorno `figure`, usando `\captionof`:

```latex
\captionof{figure}{Descripción de la figura.}
\captionof{table}{Descripción de la tabla.}
```

> **Recomendación:** Define el estilo de `caption` en el preámbulo una
> sola vez. Si el artículo va a una revista, su clase probablemente ya
> define el formato — en ese caso omite `caption` o cárgalo solo para
> `\captionof`.

---

### Documentos de doble columna

La mayoría de las revistas de física — Physical Review, Nature, Optics Letters
— publican en formato de doble columna. LaTeX ofrece dos niveles de control
sobre este formato: la opción de clase `[twocolumn]` para el caso simple, y el
paquete `multicol` para casos más específicos.

#### La opción `[twocolumn]`

La forma más directa es declarar el documento de doble columna desde la clase:

```latex
\documentclass[twocolumn]{article}
```

Todo el cuerpo del documento se compone automáticamente en dos columnas.
El abstract, sin embargo, ocupa una sola columna por defecto en la clase
`article` — si quieres que también sea de doble columna, usa `\twocolumn`
manualmente después de `\maketitle`.

```latex
\begin{document}
    % título en una columna
    \twocolumn[
        \maketitle
        \begin{abstract}
            Se estudia la dinámica de polaritones de cavidad en el régimen
            de acoplamiento fuerte...
        \end{abstract}
    ]

    % resto del documento...
    \section{Introducción}
    % ...
\end{document}
```

El argumento entre corchetes de `\twocolumn[]` se compone a una sola columna
antes de iniciar el formato de dos columnas — es el mecanismo estándar para
colocar el título y el abstract a ancho completo en documentos `twocolumn`.

#### Flotantes en doble columna

En un documento `twocolumn`, los entornos `figure` y `table` flotan dentro
de su columna. Para que un flotante ocupe ambas columnas se usa la variante
con asterisco:

```latex
\begin{figure*}[ht]
    \centering
    \includegraphics[width=\textwidth]{espectro_completo.pdf}
    \caption{Espectro de reflexión diferencial resuelto en tiempo para
             distintas densidades de excitación.}
    \label{fig:espectro-completo}
\end{figure*}
```

`figure*` y `table*` solo pueden posicionarse en `t` o `p` — el
especificador `h` se ignora porque un flotante de ancho completo no puede
aparecer en medio de texto de dos columnas.

#### Ecuaciones en doble columna

Las ecuaciones largas son el principal problema tipográfico en documentos
de doble columna — el ancho de columna es aproximadamente la mitad del
ancho de texto, y ecuaciones que cabían bien en una sola columna desbordan.

Para ecuaciones que deben ocupar ambas columnas existe `\widetext` en las
clases de APS (`revtex4-2`):

```latex
\begin{widetext}
\begin{equation}
    \chi^{(3)}(\omega) = \frac{N|\mu_{12}|^4}{\epsilon_0 \hbar^3}
    \sum_{m,n} \frac{\rho_{mm}^{(0)}}
    {(\omega_{nm}-\omega-i\gamma_{nm})(\omega_{mn}-2\omega-i\gamma_{mn})
    (\omega_{mn}-3\omega-i\gamma_{mn})}
\end{equation}
\end{widetext}
```

En la clase estándar `article` no existe `\widetext` — la alternativa es
usar `figure*` con la ecuación dentro, aunque es una solución poco elegante.
En la práctica, si el documento va a una revista APS, conviene trabajar
directamente con `revtex4-2` desde el principio.

#### Ajuste del ancho de columna

En documentos de doble columna, `\textwidth` sigue refiriéndose al ancho
total de la página. Para referirse al ancho de una sola columna se usa
`\columnwidth`:

```latex
\includegraphics[width=\columnwidth]{figura.pdf}    % una columna
\includegraphics[width=\textwidth]{figura.pdf}      % ambas columnas (en figure*)
```

> **Recomendación:** Si el artículo tiene destino definido, descarga la
> clase o template de la revista desde el principio — `revtex4-2` para APS
> (Physical Review, PRL), `iopart` para IOP (New Journal of Physics), u
> `optica-article` para Optica Publishing. Estas clases manejan el formato
> de doble columna, `\widetext`, y los estilos de bibliografía
> automáticamente, y evitan tener que refornatear el documento al momento
> de la sumisión.

## Definir tus propios comandos

En un artículo de física es común repetir las mismas expresiones decenas de
veces — el hamiltoniano del sistema, la función de onda, operadores con
notación específica. Definir comandos propios reduce errores de consistencia
y hace el source mucho más legible.

### Uso de `\newcommand`

La sintaxis básica es:

```latex
\newcommand{\nombre}[n_args]{definición}
```

donde `[n_args]` es el número de argumentos (0--9). Sin argumentos:

```latex
\newcommand{\Htot}{\hat{H}_{\text{total}}}
\newcommand{\psis}{\ket{\psi(t)}}
\newcommand{\hbar}{h}   % error: \hbar ya existe, usar \renewcommand
```

Si el comando ya existe en LaTeX, `\newcommand` lanza un error — es una
protección contra redefiniciones accidentales. Para redefinir un comando
existente se usa `\renewcommand`:

```latex
\renewcommand{\Re}{\operatorname{Re}}   % redefine \Re de amsmath
\renewcommand{\Im}{\operatorname{Im}}
```

#### Comandos con argumentos

Los argumentos se referencian con `#1`, `#2`, etc.:

```latex
\newcommand{\mel}[3]{\left\langle #1 \middle| #2 \middle| #3 \right\rangle}
\newcommand{\comm}[2]{\left[ #1,\, #2 \right]}
\newcommand{\order}[1]{\mathcal{O}\!\left(#1\right)}
```

En uso:

| Uso | Resultado |
|---|---|
| `\mel{\phi}{\hat{H}}{\psi}` | $\left\langle \phi \middle\vert \hat{H} \middle\vert \psi \right\rangle$ |
| `\comm{\hat{x}}{\hat{p}}` | $\left[ \hat{x},\, \hat{p} \right]$ |
| `\order{e^2/c^2}` | $\mathcal{O}\!\left(e^2/c^2\right)$ |

#### Argumento opcional con valor por defecto

El primer argumento puede ser opcional con un valor predeterminado:

```latex
\newcommand{\foo}[2][\dagger]{{#2}^{#1}}
```

```latex
\foo{A}       % A†   — usa el default
\foo[*]{A}    % A*   — sobreescribe el default
```

> **Recomendación:** Define tus comandos en el preámbulo, agrupados por
> tema, con un comentario que indique su propósito. En artículos largos
> o con coautores, un archivo separado `macros.tex` cargado con `\input{macros}`
> mantiene el preámbulo limpio.

---

### Uso de `\NewDocumentCommand`

Disponible sin paquete adicional desde LaTeX 2020, `\NewDocumentCommand`
extiende `\newcommand` con una especificación de argumentos más expresiva.
Es útil cuando `\newcommand` se queda corto — argumentos opcionales
múltiples, argumentos con delimitadores explícitos, o argumentos que pueden
estar ausentes.

La sintaxis es:

```latex
\NewDocumentCommand{\nombre}{especificación}{definición}
```

La especificación describe cada argumento con una letra:

| Tipo | Significado |
|---|---|
| `m` | Obligatorio (*mandatory*) |
| `o` | Opcional entre `[]`, valor `\NoValue` si ausente |
| `O{default}` | Opcional entre `[]` con valor por defecto |
| `s` | Asterisco opcional — devuelve `\BooleanTrue` o `\BooleanFalse` |

Un ejemplo real: un comando `\deriv` que acepta un asterisco para alternar
entre notación de Leibniz y notación prima, y un orden opcional:

```latex
\NewDocumentCommand{\deriv}{s O{1} m m}{
    \IfBooleanTF{#1}
        {{#3}^{(#2)}}                           % forma prima:  f^(n)
        {\frac{\mathrm{d}^{#2}#3}{\mathrm{d}#4^{#2}}}  % Leibniz: d^n f/dx^n
}
```

```latex
\deriv{f}{x}        % df/dx
\deriv[2]{f}{x}     % d²f/dx²
\deriv*{f}          % f'
\deriv*[3]{f}       % f'''  (orden 3)
```

> **Cuándo usarlo:** Cuando necesitas un argumento opcional que no sea el
> primero, varios argumentos opcionales independientes, o lógica condicional
> dentro del comando. Para la mayoría de los macros de un artículo,
> `\newcommand` es suficiente.

## Recursos y manuales de referencia

Los siguientes documentos constituyen algunas de las referencias más utilizadas en la preparación de artículos científicos. Aunque no es necesario estudiarlos de principio a fin, contienen recomendaciones oficiales sobre notación matemática, símbolos químicos, unidades físicas y estilo editorial. Son recursos de consulta muy valiosos para estudiantes, investigadores y docentes.

### SI Brochure: *The International System of Units (SI)*

Publicada por el *Bureau International des Poids et Mesures* (BIPM), esta guía constituye la referencia oficial del Sistema Internacional de Unidades. Contiene definiciones actualizadas de las unidades SI, reglas para la escritura de símbolos, prefijos, magnitudes físicas y ejemplos de uso correcto en documentos científicos.

**Descargar:**
<u>
<a href="/ars-mathematica/books/courses/si-brochure.pdf" target="_blank" rel="noopener noreferrer">Descargar SI Brochure ↓</a>
</u>

Ver en el 
<u>
<a href="https://www.bipm.org/en/publications/si-brochure" target="_blank" rel="noopener noreferrer">sitio oficial ↗</a>
</u>

---

### IUPAC Green Book: *Quantities, Units and Symbols in Physical Chemistry*

Conocido informalmente como el *Green Book*, este documento de la *International Union of Pure and Applied Chemistry* (IUPAC) recopila recomendaciones internacionales para la notación utilizada en física y química. Incluye convenciones tipográficas, escritura de magnitudes físicas, símbolos químicos, constantes fundamentales, vectores, tensores y unidades.

Es una referencia especialmente útil para estudiantes de físico-química, espectroscopía, química cuántica y áreas afines.

**Descargar:**
<u>
<a href="/ars-mathematica/books/courses/iupac-green-book.pdf" target="_blank" rel="noopener noreferrer">IUPAC Green Book ↓</a>
</u>

Ver en el 
<u>
<a href="https://iupac.org/what-we-do/books/greenbook/" target="_blank" rel="noopener noreferrer">sitio oficial ↗</a>
</u>

---

### Style Manual of the American Institute of Physic

Manual editorial utilizado por el *American Journal of Physics*. Describe convenciones de estilo para la redacción de artículos científicos, incluyendo recomendaciones sobre ecuaciones, figuras, tablas, referencias bibliográficas, nomenclatura y presentación general de manuscritos.

Aunque está orientado a una revista específica, muchas de sus recomendaciones resultan aplicables a la escritura científica en física de manera general.

**Descargar:**
<u>
<a href="/ars-mathematica/books/courses/aip-style-manual.pdf" target="_blank" rel="noopener noreferrer">Descargar AIP Style Guide ↓</a>
</u>

Ver en el 
<u>
<a href="https://www.aapt.org/Publications/AJP/Contributors/Formatting_the_manuscript.cfm" target="_blank" rel="noopener noreferrer">sitio oficial ↗</a>
</u>

---

### The Not So Short Introduction to LaTeX2e    

Uno de los textos introductorios más conocidos para aprender LaTeX. Presenta de forma progresiva la estructura de documentos, la escritura matemática, la gestión de referencias, la inclusión de imágenes y numerosas herramientas avanzadas del sistema.

Puede utilizarse como complemento de este curso para profundizar en temas que no se cubren en detalle.

**Descargar:**
<u>
<a href="/ars-mathematica/books/courses/not-so-short-introduction.pdf" target="_blank" rel="noopener noreferrer">The Not So Short Introduction to LaTeX2e ↓</a>
</u>

---

### AMS Style Guide: *Journals*

La *AMS Style Guide* recopila los estándares editoriales y las prácticas de publicación empleadas por la *American Mathematical Society* (AMS) en la producción de sus revistas científicas. El documento aborda aspectos fundamentales de la estructura de un artículo científico, incluyendo la organización de teoremas, definiciones y demostraciones, la preparación de figuras y tablas, el formato de las referencias bibliográficas y numerosas convenciones tipográficas utilizadas en la literatura matemática profesional.

Aunque está dirigida principalmente a autores que publican en revistas de la AMS, muchas de sus recomendaciones son aplicables a cualquier trabajo con contenido matemático avanzado.

**Descargar:**
<u><a href="/books/courses/ams-style-guide.pdf" target="_blank" rel="noopener noreferrer">AMS Style Guide ↓</a></u>

Ver en el 
<u>
<a href="https://www.ams.org/arc/styleguide/index.html" target="_blank" rel="noopener noreferrer">sitio oficial ↗</a>
</u>
