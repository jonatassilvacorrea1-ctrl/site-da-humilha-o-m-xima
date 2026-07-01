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
    'Recebi sua mensagem 😊\nSe quiser mandar outra, eu aceito também.'
    'Anotado, manda mais uma pra eu anotar mais.'
    'Entendo, to aceitando mais mensagens.'
    'Que incrivel, ótimo comentário, pode mandar mais.'
]

@app.route('/resposta/termo', methods=['POST'])
def respostaTermo():
    mensagem = request.form['escolha_termo']

    ultimas_mensagens.append(mensagem)

    print(ultimas_mensagens)

    return render_template('termo_mensagem.html', aviso = random.choice(textos))

@app.route('/criancinha')
def jogodavelha():
    return render_template('jogo_da_velha.html')

@app.route('/cesarecleopatra')
def cifradecesar():
    return render_template('cifra_de_cesar.html')

@app.route('/perdiascoisas')
def procurarobjetos():
    return render_template('procurar_objetos.html')

@app.route('/aceita-por-favorzinho')
def conviteencontro():
    return render_template('convite_encontro.html')

if __name__ == '__main__':
    app.run(debug=True)