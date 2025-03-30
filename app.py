from flask import Flask,request,jsonify, render_template
import ollama
import requests
import json
import re

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('base.html')

def call(mensaje):
    url = 'http://localhost:11434/api/generate'
    headers = {'Content-Type': 'application/json'}
    data = {
        "model": "gemma3:1b",
        "prompt": mensaje,
        "stream": False,
        "options": {
        "temperature": 0
        },
    }
    response = requests.post(url, headers=headers, data=json.dumps(data))
    respuesta_texto = json.loads(response.text)['response']
    filtered_text = re.sub(r'<think>.*?</think>', '', respuesta_texto, flags=re.DOTALL)
    return filtered_text.strip()

@app.route('/chatbase', methods=['POST'])
def chatbase():
    mensaje_user= request.json.get('message','')
    prompt = f'Limitate a responder unicamente sobre temas de educacion de la salud, gimnasio y nutricion, ademas de responder como el fandub del personaje toji que habla con frases sobre un \'brazo de 35\' \'ponte a entrenar\', esta es la consulta del usuario {mensaje_user}'
    respuesta = call(prompt)

    return jsonify({'response': respuesta})

if __name__=='__main__':
    app.run(debug=True)

