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

@app.route("/resposta", methods=['POST'])
def resposta():
    escolha = request.form['escolha']
    
    with open('resposta.txt', 'a', encoding='utf-8') as arquivo:
        arquivo.write(escolha + "\n")

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

if __name__ == '__main__':
    app.run(debug=True)