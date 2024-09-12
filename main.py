# ----------AVVIO------------------
# avvio uvicorn:

# pip install uvicorn
# pip install mysql.connector
# pip install fastapi
# python -m uvicorn main:app --reload

# ---------------------------------
from fastapi import FastAPI
from pydantic import BaseModel
import mysql.connector
import serial

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

config = {
    "host" : "127.0.0.1",
    "port" : "3306", 
    "user" : "root",
    "database" : "insideout"
}

class user_register(BaseModel):
    username: str
    password: str
    
# al momento della registrazione inserisco solo username e password
# DATA E PERSONAGGIO POSSONO ESSERE NULL, QUINDI NON METTERE QUEI CAMPI COME NOT NULL
@app.post("/api/register")
def registrazione(user : user_register):
    conn = mysql.connector.connect(**config)
    cursor = conn.cursor() 
    cursor.execute("INSERT INTO users (username, password) VALUES (%s,%s)", (user.username, user.password))
    conn.commit()
    conn.close()
    return {
        "msg" : "utente inserito con successo"
    }
    
class user_login(BaseModel):
    username: str
    password: str
    
    
@app.post("/api/login")
def login(user : user_login):
    conn = mysql.connector.connect(**config) 
    cursor  = conn.cursor(dictionary=True)
    cursor.execute("SELECT * from users WHERE username = %s AND password = %s ", (user.username, user.password))
    
    user = cursor.fetchone()
    conn.close()
    if user :
        return {
            "msg" : "utente ok"
        }
    else : 
        return {
            "msg" : "utente not found"
        }
        
class user_personaggio(BaseModel):
    personaggio : str 
    username: str
    data : str
    
#rotta inserimento personaggio ad un utente già esistente
@app.post("/api/personaggio")
def emozione(user : user_personaggio):
    print("----------------------")
    print(user)
    print("----------------------")
    conn = mysql.connector.connect(**config) 
    cursor  = conn.cursor(dictionary=True)
    cursor.execute("UPDATE users SET personaggio = %s , data = %s WHERE username = %s", (user.personaggio, user.data ,user.username)) # creare tabella results e fare "Insert Into ..."
    conn.commit()
    conn.close()
    return {
        "msg" : "utente inserito con successo"
    }
    
class user_allusers(BaseModel):
    username: str
    data: str
    personaggio: str
    
#rotta di stampa di tutti gli utenti
@app.get("/api/allusers")
def all_users(user: user_allusers):
    conn = mysql.connector.connect(**config) 
    cursor  = conn.cursor(dictionary=True)
    cursor.execute("SELECT username, data, personaggio from users")
    users = cursor.fetchall()
    conn.close()
    return users

#--------------------------------arduino

class RichiestaPersonaggio(BaseModel):
    personaggio: str
    
ser = serial.Serial('COM3', 9600) 

@app.post("/api/imposta-personaggio")
async def imposta_personaggio(richiesta: RichiestaPersonaggio):
    personaggio = richiesta.personaggio
    ser.write((personaggio + "\n").encode())  # Invia il personaggio come stringa
    return {"messaggio": f"Personaggio impostato a {richiesta.personaggio}"}