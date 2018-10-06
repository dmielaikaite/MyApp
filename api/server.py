import flask
from flask import request, jsonify
import MySQLdb
import uuid

app = flask.Flask(__name__)
app.config["DEBUG"] = True

def connection():
    conn = MySQLdb.connect(
    host = "localhost",
    user = "root",
    passwd = "",
    db = "myApp"
    )
    c = conn.cursor()
    return c, conn

c, con = connection()

@app.route('/', methods=['GET'])
def home():
    return "Donata"


# A route to return all of the available entries in our catalog.
# @app.route('/api/v1/resources/books/all', methods=['GET'])
# def api_all():
#     return jsonify(books)

# @app.route('/api/users', methods=['GET'])
# def api_users():
#     c.execute("SELECT * FROM Persons")
#     data = c.fetchall()
#     print("DONATA")
#     return jsonify(data)

@app.route('/api/addUser', methods=['POST'])
def addUser():
    json_data = request.get_json(force=True)
    userUuid = uuid.uuid4()
    username = json_data['username']
    password = json_data['password']
    email = json_data['email']
    gender = json_data['gender']
    sql = "INSERT INTO users (uuid, username, password, email, gender) VALUES (%s, %s,%s, %s, %s)"
    val = (userUuid, username, password, email, gender)
    c.execute(sql, val)
    con.commit()
    return '201'

@app.route('/api/getUser', methods=['POST'])
def getUser():
    json_data = request.get_json(force=True)
    email = json_data['email']
    password = json_data['password']
    sql = "SELECT * FROM users where email = %s AND password = %s"
    val = ([email, password])
    c.execute(sql, val)
    data = c.fetchall()
    newResponseObject = {}
    if data[0]:
        newResponseObject['userID'] = data[0][0]
        newResponseObject['uuid']= data[0][1]
        newResponseObject['username']= data[0][2]
        newResponseObject['email']= data[0][3]
        newResponseObject['password']= data[0][4]
        newResponseObject['gender']= data[0][5]
    return jsonify([newResponseObject])

@app.route('/api/reload')
def reload():
    global to_reload
    to_reload = True
    return "reloaded"

app.run()
