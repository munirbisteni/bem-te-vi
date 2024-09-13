# Plano Inicial

Primeiramente, deveremos realizar a identificação de uma peça de roupa através de uma imagem tridimensional. Para criar essa representação, utilizaremos três variáveis principais: **ousadia**, **colometria** e **ajuste** (de justo a oversized). A função que descreve essa peça pode ser definida como:

- **x (ousadia)**: Parâmetro que controla tanto o número de cores na peça quanto o ajuste (de justo a oversized).
- **y (colometria)**: Uma função de \(x\), que aumenta conforme a ousadia aumenta, representando o número de cores na peça.
- **z (ajuste)**: Representa o nível de ajuste da peça, variando de "justo" (valores negativos) para "oversized" (valores positivos), em função de \(x\).

## Definição das Variáveis

1. **x (ousadia)**: Definimos o eixo \(x\) para variar entre 0 e 10, onde:
   - \(x = 0\) representa uma peça conservadora (pouca ousadia).
   - \(x = 10\) representa uma peça extremamente ousada.

2. **y (colometria)**: A colometria será uma função linear de \(x\). Quanto maior a ousadia, mais cores estão presentes na peça. Podemos usar a função:
   \[
   y = x
   \]
   Assim, se \(x = 0\), temos 0 cores (peça monocromática), e se \(x = 10\), temos 10 cores (peça multicolorida).

3. **z (ajuste - justo para oversized)**: O ajuste da peça será uma função quadrática de \(x\). Com pouca ousadia (\(x\) baixo), a peça é mais ajustada ao corpo. À medida que a ousadia aumenta, a peça se torna mais oversized. Vamos usar uma função quadrática para representar essa relação:
   \[
   z = -x^2 + 10x
   \]
   Nessa equação:
   - Para \(x = 0\) (ousadia mínima), temos \(z = 0\), representando uma peça perfeitamente ajustada.
   - Para \(x = 5\), temos \(z = 25\), indicando uma peça oversized.
   - Para \(x = 10\), temos \(z = 0\) novamente, pois a peça se torna extremamente ousada, mas o design faz com que ela volte a ser ajustada.

## Montagem da Peça

Essa combinação de equações define uma "peça de roupa" em função de três parâmetros:
- **Ousadia (x)**: Controla a aparência geral da peça, incluindo o número de cores.
- **Colometria (y)**: Aumenta linearmente conforme a ousadia cresce.
- **Ajuste (z)**: Varia de justo para oversized de acordo com uma curva parabólica.

## Visualização no GeoGebra

No GeoGebra, você pode inserir essas funções paramétricas para visualizar a peça de roupa. Para isso, usaremos uma função paramétrica tridimensional:

\[
(x, y, z) = (x, x, -x^2 + 10x)
\]

### Passos para o GeoGebra:
1. Abra o **GeoGebra 3D**.
2. No campo de entrada, insira a função para as coordenadas 3D:
   \[
   \{(x, x, -x^2 + 10x) : 0 \leq x \leq 10\}
   \]
3. Visualize a curva que representa a evolução da peça de roupa conforme a ousadia (\(x\)) aumenta. Essa curva ilustra a relação entre ousadia, número de cores e ajuste (de justo a oversized).

---

# Exemplo 1: Análise da Blusa

A seguir, será feita a análise de uma blusa com base nos parâmetros definidos.

- **Ousadia (x)**: A blusa parece ser uma peça oversized simples, com uma coloração marrom única. Portanto, a ousadia neste caso é moderada.
- **Colometria (y)**: A peça tem uma única cor sólida (marrom), o que significa que o número de cores é baixo.
- **Ajuste (z)**: A peça é oversized, então o ajuste é mais solto, com um valor elevado para \(z\).

Com base nesses parâmetros, podemos definir:

- **x (ousadia):** Vamos definir \(x = 4\), indicando uma ousadia moderada, já que a peça oversized é comum, mas não é extremamente ousada em termos de design ou cores.
  
- **y (colometria):** Como há apenas uma cor, o valor de \(y = 1\), o que reflete a simplicidade cromática da peça.

- **z (ajuste):** A peça é claramente oversized, então vamos usar a equação do ajuste definida anteriormente:
  \[
  z = -x^2 + 10x
  \]
  Substituindo \(x = 4\):
  \[
  z = -(4)^2 + 10(4) = -16 + 40 = 24
  \]
  Portanto, o ajuste da peça oversized é representado pelo valor \(z = 24\), indicando um ajuste bem solto.

### Representação Final:
- **x = 4** (ousadia moderada)
- **y = 1** (uma cor simples)
- **z = 24** (oversized, ajuste solto)

Esses valores definem o estilo da peça de roupa como uma blusa oversized de cor única, com um nível de ajuste bem solto.

---

A ideia no futuro é adicionar novos gráficos em sobreposição, dividindo uma peça de roupa como:

- **x2 = Clássico (preto/branco) vs. Estampado (floral, geométrico)**
- **y2 = Minimalista vs. Ornamentado**
- **z2 = Dia vs. Noite**

- **X3: Textura (Liso vs. Texturizado)**
- **Y3: Material (Natural vs. Sintético)**
- **Z3: Formalidade (Casual vs. Formal)**

- **X4: Versatilidade (Casual vs. Versátil)**
- **Y4: Decote/Modelagem (Alta vs. Baixa)**
- **Z4: Funcionalidade (Prático vs. Estilizado)**

