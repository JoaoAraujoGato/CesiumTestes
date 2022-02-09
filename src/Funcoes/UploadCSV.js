export default function Upload() {
    /**
 *  Controles de Upload - Apagar quando tiver o back
 */
var amostrasRenderTable = {};
var camadasRenderTable = {}; // Vai salvar o valor de todas as camadas juntas

function addLib(url) {
    var script = document.createElement("script");
    script.setAttribute("type", "text/javascript");
    script.setAttribute("src", url);
    document.head.appendChild(script);
}

const processadorCSV =
    "https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.1/papaparse.js"; // npm papaparse - essa biblioteca transforma arquivos csv em string, quando tiver os dados no back nao sera preciso
const lodash = "https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js"; // npm lodash

addLib(processadorCSV);

addLib(lodash);

function UploadResult() {
    this.data = undefined;
}

UploadResult.prototype.onUploadComplete = function (data) {
    this.data = this.processData(data);
    delete this.data["undefined"];
    //Vamos primeiro salvar globalmente para depois plotarmos
    window.amostrasData = this.data;
};

UploadResult.prototype.hasUploadedData = function () {
    return Boolean(this.data);
};

UploadResult.prototype.processData = function (data) {
    // vai ficar uma função meio grande, mas precisamos fazer as manipulações
    // do resultado de upload aqui.

    //Leitura e organização das informações do csv inserido
    const linhasDivididas = data.map((linha) => {

        const tipoEnsaio = linha["Ensaio"];
        const protocolo = linha["Protocolo da Amostra"]; // usar protocolo como chave primária {k: protocolo, v: objeto de dados}
        const areaCamada = linha["Área"] + ` | Camada ${linha["Camada"]}`;

        //Cria uma nova posição na variável se ela não existir e um protocolo for lido
        if (protocolo && amostrasRenderTable[`${protocolo}`] === undefined) {
            amostrasRenderTable[`${protocolo}`] = new Array();
        }
        //Cria uma nova posição na variável se ela não existir e um protocolo for lido
        if (camadasRenderTable[`${areaCamada}`] === undefined) {
            camadasRenderTable[`${areaCamada}`] = new Array();
        }

        //colunas do arquivo para camadas
        const dadosCamada = _.pick(linha, [
            "Área",
            "Camada",
            "Cota Inicial",
            "Cota Final",
            "Status",
            "Tipo de Repetição",
            "Tipo de Tratamento",
            "Camada Repetida",
            "Camada Regularizada",
            "Volume de Material Compactado [m³]",
            "Espessura de Material Compactado [m]",
        ]);

        //colunas do arquivo para ensaios
        const resultadosEnsaio = _.pick(linha, [
            "Grau de Compactação - M.E.Seca",
            "Grau de Compactação - M.E.Úmida",
            "Grau de Compactação - M.E.Úmida",
            "Limite de Liquidez",
            "Limite de Plasticidade",
            "Fração de Argila",
            "Fração de Silte",
            "Fração de Areia Fina",
            "Fração de Areia Média",
            "Fração de Areia Grossa",
            "Fração de Pedregulho",
            "Designação do Solo",
            "Permeabilidade (Kt",
            "Permeabilidade (K20",
            "Massa Específica Seca [g/cm³]",
            "Massa Específica Seca Máxima [g/cm³]",
            "Massa Específica Úmida [g/cm³]",
            "Massa Específica Úmida",
            "Massa Específica Úmida Convertida Máxima [g/cm³]",
            "Convertida Máxima [g/cm³]",
            "Umidade Média do Aterro",
            "Desvio de Umidade",
            "Massa Específica dos Grãos",
            "Protocolo da Amostra",
        ]);

        var ensaiosArray = {}; //guarda os valores lido do arquivo
        var vetorCamadas = {}; // Vai salvar o valor de cada camada lido do arquivo

        var protocoloLista = new Array();

        ensaiosArray[`${tipoEnsaio}`] = { dadosCamada, resultadosEnsaio };
        vetorCamadas[`${areaCamada}`] = { dadosCamada };
        // console.log(vetorCamadas)
        // console.log(ensaiosArray)
        if (
            protocolo &&
            Array.isArray(amostrasRenderTable[`${protocolo}`]) &&
            ensaiosArray[`${tipoEnsaio}`] !== undefined
        ) {
            amostrasRenderTable[`${protocolo}`].push(ensaiosArray);
        }

        if (
            Array.isArray(camadasRenderTable[`${areaCamada}`]) &&
            vetorCamadas[`${areaCamada}`] !== undefined
        ) {
            camadasRenderTable[`${areaCamada}`].push(vetorCamadas);
        }

        // resultado que não existe é uma string vazia, é mais fácil montar um objeto tipo mapa eliminando essas entradas
        const vetorFiltradoResultados = Object.entries(resultadosEnsaio).filter(
            ([k, v]) => v !== ""
        );

        // monta o objeto novamente sem as entradas vazias da planilha.
        const objetoResultadosEnsaio = vetorFiltradoResultados.reduce(
            (obj, [k, v]) => {
                obj[k] = v;
                return obj;
            },
            {}
        );

        //const protocolo = linha['Protocolo da Amostra']; // usar protocolo como chave primária {k: protocolo, v: objeto de dados}

        //const tipoEnsaio = linha['Ensaio'];

        // dados do powerBI são em formato UTM e maioria (80%) WGS84. Cuidado com outros 'datums'
        const E_Original = linha["Coordenadas Convertidas E"];
        const N_Original = linha["Coordenadas Convertidas N"];
        const { lat, lng } = conversorCoordenadas.convertUtmToLatLng(
            Number(E_Original),
            Number(N_Original),
            23,
            "S"
        );
        const coordenadas = {
            N: lat,
            E: lng,
            Z: Number(linha["Coordenadas Convertidas Z"]),
        };

        return {
            protocolo,
            resultadosEnsaio: objetoResultadosEnsaio,
            camada: dadosCamada,
            tipoEnsaio,
            coordenadas,
        };
    });
    /**
        Objetivo é chegar num objeto final do tipo:
        AM 446: {
          resultadosEnsaios:
          camada:
          coordenadas:
        }
    **/
    const agrupamentosLinha = linhasDivididas.reduce((grupo, linha) => {
        if (grupo[linha.protocolo]) {
            // cada coluna de resultado diz respeito apenas a um ensaio, de modo que é seguro sobrescrever com spread, uma vez que as chaves não se repetem.
            grupo[linha.protocolo].resultadosEnsaio = {
                ...grupo[linha.protocolo].resultadosEnsaio,
                ...linha.resultadosEnsaio,
            };
            // a informação de camada se repete em todas as linhas da mesma amostra, seguro sobrescrever valores do objeto, pois uma amostra pertence a apenas uma camada.
            grupo[linha.protocolo].camada = {
                ...grupo[linha.protocolo].camada,
                ...linha.camada,
            };
            // evitar repetição da sigla de ensaio e construir um vetor de siglas únicas
            const ensaiosDoGrupo = grupo[linha.protocolo].ensaiosRealizados;
            if (!ensaiosDoGrupo.includes(linha.tipoEnsaio)) {
                grupo[linha.protocolo].ensaiosRealizados.push(linha.tipoEnsaio);
            }
        } else {
            grupo[linha.protocolo] = {};
            grupo[linha.protocolo].resultadosEnsaio = linha.resultadosEnsaio;
            grupo[linha.protocolo].camada = linha.camada;
            grupo[linha.protocolo].ensaiosRealizados = [linha.tipoEnsaio];
            grupo[linha.protocolo].coordenadas = linha.coordenadas;
        }

        return grupo;
    }, {});

    //console.log(agrupamentosLinha);
    return agrupamentosLinha;
};

const uploadResult = new UploadResult();
window.debugUploadResult = uploadResult; // facilita o uso no console, mas só debugging
var dataUpload = new Cesium.Event();
/**
  Fazendo a ligação entre onde vai ser guardado o upload e o evento de upload completo
  **/
dataUpload.addEventListener(
    UploadResult.prototype.onUploadComplete,
    uploadResult
);

/**
  Usando o form para importar dados
  **/

// var uploadControl = document.getElementById("dataToUpload");

function readFileAsText(file, encoding) {
    return new Promise((resolve) => {
        const reader = new FileReader();

        reader.onload = () => {
            resolve(reader.result);
        };
        reader.readAsText(file, encoding);
    });
}

// uploadControl.addEventListener("submit", function (e) {
//   e.preventDefault();
//   const [file] = document.getElementById("fileHandle").files;
//   readFileAsText(file, "windows-1252")
//   .then((txt) => window.Papa.parse(txt, { header: true }))
//   .then((json) => dataUpload.raiseEvent(json.data))
//   .catch(err => console.error(err));

// });
}