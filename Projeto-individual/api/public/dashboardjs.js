var id = sessionStorage.ID_USUARIO;
    obterDadosGrafico();
    function validarSessao() {
        var nome = sessionStorage.NOME_USUARIO;
        console.log(nome)
        if (nome != undefined) {
            document.getElementById("entrada").style.display = "none";



        } else {
            document.getElementById("dash").style.display = "none";
            document.getElementById("musicas").style.display = "none";
            document.getElementById("quiz").style.display = "none";
        }
    }

    function biografia() {
        window.location.href = `biografia.html`;

    }
    function quiz() {
        window.location.href = `quiz.html`;
    }
    function home() {
        window.location.href = `index.html`;

    }
    function paises() {
        window.location.href = `paises.html`;

    }
    function musicas() {
        window.location.href = `musicas.html`;

    }



    function sair() {
        sessionStorage.clear();
        document.getElementById("entrada").style.display = "block";
        document.getElementById("dash").style.display = "none";
        document.getElementById("musicas").style.display = "none";
        document.getElementById("quiz").style.display = "none";
        document.getElementById("sair").style.display = "none";
        usuario.innerHTML = ``;
        window.location.href = "login.html";
    }
    function validarSessao() {
        var nome = sessionStorage.NOME_USUARIO;
        console.log(nome)
        if (nome != undefined) {
            document.getElementById("entrada").style.display = "none";
            usuario.innerHTML = `Olá, ${nome}`;
            document.getElementById("sair").style.display = "block";

        } else {
            document.getElementById("sair").style.display = "none";
            document.getElementById("dash").style.display = "none";
            document.getElementById("musicas").style.display = "none";
            document.getElementById("quiz").style.display = "none";
        }
    }
    function obterDadosGrafico() {
        fetch(`/usuarios/album/`)
            .then(function (resposta) {
                if (resposta.ok) {
                    resposta.json().then(function (dados) {
                        console.log("Dados recebidos: ", JSON.stringify(dados));

                        plotarGrafico_1(dados);
                    });
                } else {
                    console.error('Nenhum dado encontrado da pergunta1 ou erro na API');
                }
            })
            .catch(function (error) {
                console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
            });

        fetch("/usuarios/quizResultado", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idServer: id
            })
        }).then(function (resposta) {
            console.log("quizResultado caiu aqui")

            if (resposta.ok) {
                console.log("resposta quizGrafico" + resposta);

                resposta.json().then(json => {
                    console.log(json);
                    var obj = JSON.stringify(json);
                    sessionStorage.id = json.id;
                    console.log(obj);
                    plotarGrafico_2(json);

                });

            } else {
                console.log("Houve um erro ao terminar o quiz!");

                resposta.text().then(texto => {
                    console.error(texto);

                });

            }
        }).catch(function (erro) {
            console.log(erro);
        })
        fetch(`/usuarios/kpi1/`)
            .then(function (resposta) {
                if (resposta.ok) {
                    resposta.json().then(function (dados) {
                        console.log("Dados recebidos: ", JSON.stringify(dados));


                        plotarGrafico_3(dados);
                    });
                } else {
                    console.error('Nenhum dado encontrado na kpi1 ou erro na API');
                }
            })
            .catch(function (error) {
                console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
            });
        fetch("/usuarios/kpi2", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idServer: id
            })
        }).then(function (resposta) {
            console.log("kpi2 caiu")

            if (resposta.ok) {
                console.log("resposta kpi2" + resposta);

                resposta.json().then(json => {
                    console.log(json);
                    var obj = JSON.stringify(json);
                    sessionStorage.id = json.id;
                    console.log(obj);
                    plotarGrafico_4(json);

                });

            } else {
                console.log("Houve um erro ao terminar o quiz!");

                resposta.text().then(texto => {
                    console.error(texto);

                });

            }
        }).catch(function (erro) {
            console.log(erro);
        })
        fetch("/usuarios/kpi3", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idServer: id
            })
        }).then(function (resposta) {
            console.log("kpi3 caiu")

            if (resposta.ok) {
                console.log("resposta kpi3" + resposta);

                resposta.json().then(json => {
                    console.log(json);
                    var obj = JSON.stringify(json);
                    sessionStorage.id = json.id;
                    console.log(obj);
                    plotarGrafico_5(json);

                });

            } else {
                console.log("Houve um erro ao terminar o quiz!");

                resposta.text().then(texto => {
                    console.error(texto);

                });

            }
        }).catch(function (erro) {
            console.log(erro);
        })
        fetch("/usuarios/kpi4", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idServer: id
            })
        }).then(function (resposta) {
            console.log("kpi4 caiu")

            if (resposta.ok) {
                console.log("resposta kpi4" + resposta);

                resposta.json().then(json => {
                    console.log(json);
                    var obj = JSON.stringify(json);
                    sessionStorage.id = json.id;
                    console.log(obj);
                    plotarGrafico_6(json);

                });

            } else {
                console.log("Houve um erro ao terminar o quiz!");

                resposta.text().then(texto => {
                    console.error(texto);

                });

            }
        }).catch(function (erro) {
            console.log(erro);
        })




    }
    function plotarGrafico_1(dados) {
        console.log("Dados recebidos no plotar: ", JSON.stringify(dados));
        console.log('Iniciando plotagem do gráfico...');


        let labels = [''];
        let option1 = dados.map(item => item.Option1);
        let option2 = dados.map(item => item.Option2);
        let option3 = dados.map(item => item.Option3);

        let chartData = {
            labels: labels,
            datasets: [{
                label: 'Survival',
                data: [option1],
                // borderColor: '#B0CDDA',
                backgroundColor: '#EE675C',
                // borderWidth: 2
            },
            {
                label: 'Exodus',
                data: [option2],
                // borderColor: '#EE675C',
                backgroundColor: '#A2D5AB',
                // borderWidth: 2
            },
            {
                label: 'Catch a fire',
                data: [option3],
                borderColor: '#A2D5AB',
                backgroundColor: 'yellow',
                // borderWidth: 2
            },]
        };

        console.log('----------------------------------------------');
        console.log('Estes dados foram recebidos pela função "obterDadosGrafico" e passados para "plotarGrafico":');
        console.log(dados);

        console.log('----------------------------------------------');
        console.log('O gráfico será plotado com os respectivos valores:');
        console.log('Labels:');
        console.log(labels);
        console.log('Dados:');
        console.log(option1, option2, option3);
        console.log('----------------------------------------------');

        const config = {
            type: 'bar',
            data: chartData,
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        }
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: 'white',
                            font: {
                                size: 15,
                                family: 'Poppins'
                            }
                        }
                    }
                }
            }
        };


        // Adicionando gráfico criado em div na tela
        let myChart = new Chart(
            document.getElementById('myChart2'),
            config
        );
    }
    function plotarGrafico_2(dados) {
        console.log("Dados recebidos no plotar: ", JSON.stringify(dados));
        console.log('Iniciando plotagem do gráfico...');

        // Criando estrutura para plotar gráfico - labels e data
        let labels = [''];
        let AcertosGrafico = dados.map(item => item.Acertos);
        console.log("acertos" + AcertosGrafico);
        let ErrosGrafico = dados.map(item => item.Erros);
        console.log("erros" + ErrosGrafico);
        if (AcertosGrafico <= 0 && ErrosGrafico <= 0) {
            grafico1.innerHTML += `Se você não fez o quiz <span class= 'clique_aqui'> clique aqui!</span>`;
        } else {


            let chartData = {
                labels: [
                    'Acertos',
                    'Erros'

                ],
                datasets: [{
                    label: 'Quiz-Bob',
                    data: [AcertosGrafico, ErrosGrafico],
                    backgroundColor: [
                        'yellow',
                        '#EE675C',

                    ],
                    hoverOffset: 4
                }]
            };


            // Criando estrutura para plotar gráfico - config
            const config = {
                type: 'doughnut',
                data: chartData,
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                stepSize: 1
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            labels: {
                                color: 'white', // Altere a cor conforme necessário
                                font: {
                                    size: 14, // Tamanho da fonte da legenda
                                    family: 'Poppins' // Fonte da legenda
                                }
                            }
                        }
                    }
                }
            };


            // Adicionando gráfico criado em div na tela
            let myChart = new Chart(
                document.getElementById('myChart'),
                config
            );
        }
    }
    function plotarGrafico_3(dados) {
        console.log("Dados recebidos no plotar: ", JSON.stringify(dados));

        let mediaAcertos = dados.map(item => item.Acertos)
        kpi1.innerHTML += `<br> <span class ='tentativas' > ${mediaAcertos} </span>`;

    }
    function plotarGrafico_4(dados) {
        console.log("Dados recebidos no plotar: ", JSON.stringify(dados));

        let tentativas = dados.map(item => item.numero_tentativas);
        console.log("media acertos" + tentativas);

        kpi2.innerHTML += `<br> <span class ='tentativas' > ${tentativas} </span> `;
        if (tentativas <= 0) {
            
        }

    }

    function plotarGrafico_5(dados) {
        console.log("Dados recebidos no plotar: ", JSON.stringify(dados));

        let acertosmax = dados.map(item => item.acertosmax);
        console.log("media acertos" + acertosmax);

        kpi3.innerHTML += `<br><span class ='tentativas' > ${acertosmax}  </span>`;
        if(acertosmax == 0){
            quiz_tentativas.innerHTML += `Se você não fez o quiz <span class= 'clique_aqui'> clique aqui!</span>`;

            document.getElementById('quiz_tentativas').style.marginTop = '-700px';
            document.getElementById('quiz_tentativas').style.marginleft = '-00px';


        }

    }

    function plotarGrafico_6(dados) {
        console.log("Dados recebidos no plotar: ", JSON.stringify(dados));

        let album = dados.map(item => item.album);

        if (album == 1) {
            kpi4.innerHTML += `  <span class ='tentativas' id = 'tentativas'> Survival  </span> `;
            document.getElementById('kpi4').style.marginTop = '20px';



        } else if (album == 2) {
            kpi4.innerHTML += `  <span class ='tentativas' id = 'tentativas'> Exodus </span> `;
            document.getElementById('kpi4').style.marginTop = '20px';
            // document.getElementById('tentativas').style.marginTop = '-80px';

           


        } else if (album == 3) {
            kpi4.innerHTML += ` <span class ='tentativas' id = 'tentativas' > Catch a Fire </span> `;
            document.getElementById('tentativas').style.fontSize = '35px';
          
            
        }
    }
