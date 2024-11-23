from flask import Flask, request, jsonify
from api import segment_and_crop
import base64
import json
app = Flask(__name__)

@app.route('/identifyClothes', methods=['POST'])
def upload():
    try:
        # Obtém a string base64 do corpo da requisição
        data = request.get_json()

        # Verifica se a chave 'base64' existe no corpo da requisição
        if 'image' not in data:
            return jsonify({'error': 'Base64 string is required'}), 400

        
        response = segment_and_crop(data['image'])
        return jsonify(json.loads(response)), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
