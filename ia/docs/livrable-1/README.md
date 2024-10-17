# Entregável 1
## A questão estudada
Queremos oferecer ideias de roupas baseadas na pessoa. Para simplificar o problema, decidimos nos concentrar na combinação das cores das roupas com a cor da pele da pessoa. Tentaremos encontrar as tuplas de cores RGB (skin, top, bottom) que combinem bem com base em fotos de modelos. Podemos então sugerir paletas de cores (superior, inferior) recomendadas com base no tom de pele. Poderíamos estender nosso projeto para sugestões de roupas se tivermos tempo.

## Dados a serem usados
- Fotos do modelo: https://github.com/yumingj/DeepFashion-MultiModal

Este conjunto de dados contém 44.096 fotos de modelos que podemos usar para extrair a cor da pele da modelo, a cor da blusa usada e a cor da parte de baixo usada.

- Modelo pré-treinado para detecção de pessoas e roupas: https://huggingface.co/mattmdjaga/segformer_b2_clothes 

Este modelo nos permitirá distinguir a parte superior, inferior e a cor da pele de uma pessoa.
- Conjunto de dados de tuplas de cores (pele, superior, inferior) a serem construídos através da análise do conjunto de dados do manequim.

## Visão geral dos métodos de aprendizagem a serem usados
Nossa abordagem é dividida em duas etapas:
- Rotular as cores presentes em nosso conjunto de dados de manequins: utilizaremos um algoritmo de agrupamento para descobrir possíveis classes de cores para roupas e tons de pele. Este processo pode ser feito calculando a semelhança entre cores a partir de uma distância perceptual usando CIE76.
- Agrupamento de fotos por cor de sombra, cor superior e cor inferior com base no rótulo associado
 
Ofereceremos paletas por faixa de tons de pele com base nas ocorrências mais altas em nosso agrupamento.

## Considerações preliminares sobre questões ambientais e sociais
A ferramenta que queremos criar tem um impacto ambiental e social, tanto em termos de design como de utilização. Quando se trata de custos, precisamos avaliar as despesas associadas ao funcionamento da nossa solução que podem resultar no aumento do consumo de energia. Da mesma forma, o custo inicial do treinamento da IA ​​precisará ser estudado em termos de recursos. Adicionalmente, é necessário considerar o risco do consumo excessivo de vestuário, pois as nossas sugestões poderão incentivar um ciclo de renovação do guarda-roupa mais rápido, intensificando assim os problemas inerentes à indústria da moda. A padronização de estilos de roupa impulsionada pela IA levanta questões sobre a diversidade e a individualidade da expressão pessoal, enquanto a dependência da tecnologia pode reduzir a criatividade individual.