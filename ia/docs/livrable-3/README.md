# Entregável 3: Prova de conceito

Nosso trabalho é dividido em dois notebooks python. A primeira nos permite detectar tuplas (cor da pele, cor superior, cor inferior) de fotos de pessoas. A segunda nos permite agrupar as cores de cada foto para construir uma matriz de ocorrências por cor de cada uma de nossas tuplas.

## Detecção de cores de fotos
O notebook python e a explicação de seu conteúdo podem ser encontrados no seguinte endereço: https://colab.research.google.com/drive/19Hn6Y-09XlVNDg7Hp798v5ZL41UBsx8S?usp=sharing

Para cada imagem, extraímos as cores dominantes das máscaras superior, inferior e de cor da pele. Para as mulheres, o vestido é considerado uma tupla (parte superior, inferior). 

![Texto alternativo](imagem.webp)

## Agrupamento de cores e matriz de ocorrência
O notebook python e a explicação de seu conteúdo podem ser encontrados no seguinte endereço: https://colab.research.google.com/drive/10GGzqcxp0jIl4kTurNXCNJLFwRQY8UVE?usp=sharing

### Agrupamento
Optamos por fazer três agrupamentos, um para as cores superiores (20 agrupamentos), outro para as cores inferiores (20 agrupamentos) e um último para as cores da pele (5 agrupamentos).
![Texto alternativo](imagem-4.png)
![Texto alternativo](imagem-5.png)
![Texto alternativo](imagem-3.png)
### Matriz de ocorrências por cores
A partir dos clusters e tuplas de cores (skin, top, bottom), construímos uma matriz de ocorrências por cor para determinar as combinações mais populares.

### Usando a matriz
#### 1. Enviando uma foto
Nosso notebook nos permite receber como entrada um arquivo de um usuário como este:
![Texto alternativo](imagem.png)

#### 2. Detecção da cor da pele
Tentaremos então detectar a cor da pele da pessoa na foto e encontrar o agrupamento de cores de pele mais próximo que corresponda a ela:
![Texto alternativo](imagem-1.png)

#### 3. Recuperando as maiores ocorrências
Para o cluster de cores de pele correspondente, exibimos as 10 ocorrências mais populares com as cores superior e inferior, bem como o nome de uma imagem de exemplo:
![Texto alternativo](imagem-2.png)

## Continuação do projeto
Vários caminhos para melhoria são possíveis para o uso da foto de um usuário:
- Dê uma pontuação de compatibilidade para a roupa
- Sugira alternativas de cores de roupas
- Ofereça exemplos de roupas do nosso conjunto de dados correspondentes às paletas de cores mais populares
- Experimente vários pontos:
    - distinguir homens e mulheres para os nossos clusters
    - alterar o número de clusters
    - teste com outro conjunto de dados de fotos