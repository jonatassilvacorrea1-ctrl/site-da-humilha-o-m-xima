import random

from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/')
def inicio():
    return render_template('index.html')

@app.route('/apresentacao')
def apresentação():
    return render_template('apresentacao.html')

@app.route('/aceitou')
def aceitou():
    return render_template('aceitou.html')

@app.route('/recusou')
def recusou():
    return render_template('recusou.html')

ultimas_respostas = []

@app.route('/resposta', methods=['POST'])
def resposta():

    escolha = request.form['escolha']

    ultimas_respostas.append(escolha)

    print(ultimas_respostas)

    if escolha == 'sim':
        return aceitou()
    elif escolha == 'nao':
        return recusou()

@app.route('/porquinho')
def porquinho():
    return render_template('porquinhos.html')

@app.route('/porquinho/agradecimento')
def porquinhoagradecimento():
    return render_template('porquinho_mensagem.html')

@app.route('/charada')
def charada():
    return render_template('charadas.html')

@app.route('/charada/charada')
def charadacharada():
    return render_template('charadas_mensagem.html')

@app.route('/palavras')
def termo():
    with open('palavras.txt', encoding='utf-8') as arquivo:
        palavras = arquivo.read().splitlines()
    palavra = random.choice(palavras)
    return render_template('termo.html', palavra=palavra)

@app.route('/nova-palavra')
def nova_palavra():
    with open('palavras.txt', encoding='utf-8') as arquivo:
        palavras = arquivo.read().splitlines()
    return {'palavra': random.choice(palavras)}

@app.route('/palavras/help')
def termoHelp():
    return render_template('termo_help.html')

@app.route('/palavras/palavras')
def termoMensagem():
    return render_template('termo_mensagem.html')

ultimas_mensagens = []
textos = [
    'Recebi sua mensagem 😊\nSe quiser mandar outra, eu aceito também.',
    'Anotado, manda mais uma pra eu anotar mais.',
    'Entendo, to aceitando mais mensagens.',
    'Que incrivel, ótimo comentário, pode mandar mais.'
]

@app.route('/resposta/termo', methods=['POST'])
def respostaTermo():
    mensagem = request.form['escolha_termo']

    ultimas_mensagens.append(mensagem)

    print(ultimas_mensagens)

    return render_template('termo_mensagem.html', aviso = random.choice(textos))

@app.route('/criancinha')
def jogoDaVelha():
    return render_template('jogo_da_velha.html')

@app.route('/criancinha/mensagem')
def jogoDaVelhaMensagem():
    return render_template('jogo_da_velha_mensagem.html')

@app.route('/cesarecleopatra')
def cifraDeCesar():
    return render_template('cifra_de_cesar.html')

@app.route('/cesarecleopatra/mensagem')
def cifraDeCesarMensagem():
    return render_template('cifra_de_cesar_mensagem.html')

@app.route('/aceita-por-favorzinho')
def conviteEncontro():
    return render_template('convite_encontro_falso.html')

@app.route('/aceita-por-favorzinho/verdade')
def conviteEncontroVerdade():
    return render_template('convite_encontro_verdadeiro.html')

@app.route('/aceita-por-favorzinho/verdade/marcar')
def marcar():
    return render_template('marcar_encontro.html')

@app.route('/aceita-por-favorzinho/verdade/sem-encontro')
def semEncontro():
    return render_template('sem_encontro.html')

@app.route('/aceita-por-favorzinho/verdade/esquecer-tudo')
def esquecerTudo():
    return render_template('esquecer_tudo.html')

ultimas_respostas_encontro = []

@app.route('/resposta/encontro', methods=['POST'])
def respostaEncontro():

    escolha = request.form['escolha']

    ultimas_respostas_encontro.append(escolha)

    print(ultimas_respostas_encontro)

    if escolha == 'encontro':
        return marcar()
    elif escolha == 'sem encontro':
        return semEncontro()
    elif escolha == 'esquecer tudo':
        return esquecerTudo()
    
ultimos_encontros = []

@app.route("/resposta/marcar", methods=["POST"])
def respostaMarcar():

    data = request.form["data"]
    horario = request.form["horario"]
    atividade = request.form["atividade"]

    encontro = {
        "data": data,
        "horario": horario,
        "atividade": atividade
    }

    ultimos_encontros.append(encontro)

    print(ultimos_encontros)

    return render_template('encontro_marcado.html')

if __name__ == '__main__':
    app.run(debug=True)