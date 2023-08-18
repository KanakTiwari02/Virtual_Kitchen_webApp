from flask import Flask, render_template, request,  send_file
from static.foodFromIngredients import *
from flask_cors import CORS

from static.requiredFood import *
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from sqlalchemy import Column, Integer, String, Float, ForeignKey, Table
# import your_ppt_generation_module  # Import your module for generating the PPT
from static.recipy import *
app = Flask(__name__)
cors = CORS(app, origins="*")

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/makefood')
def makefood():
    return render_template('makefood.html')

@app.route('/makefood_post', methods=['GET','POST'])
def makefood_post():
    query = request.args.get('param')
    r,fileName=chatBotRecipy(query)
    return({"data": r,"audio":fileName})

@app.route('/requiredfood', methods=['GET','POST'])
def requiredFood():
    member = request.args.get('member')
    
    dish = request.args.get('dish')
    r,fileName=chatbotFoodRequired(member,dish)
    return({"data": r,"audio":fileName})


@app.route('/download_rq', methods = ['GET','POST'])
def download_rq():
    query = request.args.get('param')
    file_path = query+'.mp3'

    return send_file(file_path, as_attachment=True)

@app.route('/download', methods = ['GET','POST'])
def download_file():
    query = request.args.get('param')
    file_path = query+'.mp3'

    return send_file(file_path, as_attachment=True)


if __name__ == '__main__':
    app.run()
