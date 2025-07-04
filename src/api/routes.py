from flask import Blueprint, request, jsonify
from api.models import db, User
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, get_jwt

api = Blueprint('api', __name__)

@api.route('/signup', methods=['POST'])
def signup():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    if not email or not password:
        return jsonify({ "msg": "Faltan datos" }), 400

    if User.query.filter_by(email=email).first():
        return jsonify({ "msg": "El usuario ya existe" }), 409

    new_user = User(email=email, password=password, is_active=True)
    db.session.add(new_user)
    db.session.commit()

    return jsonify(new_user.serialize()), 201

@api.route('/login', methods=['POST'])
def login():
    try:
        email = request.json.get("email", None)
        password = request.json.get("password", None)

        print("Email:", email)
        print("Password:", password)

        user = User.query.filter_by(email=email).first()

        if not user or user.password != password:
            return jsonify({ "msg": "Credenciales inválidas" }), 401

        claims = {k: str(v) for k, v in user.serialize().items()}
        token = create_access_token(identity=str(user.id), additional_claims=claims)

        return jsonify({ "token": token }), 200

    except Exception as e:
        print("ERROR en login:", e)
        return jsonify({ "msg": "Error interno en el login", "error": str(e) }), 500



@api.route('/private', methods=['GET'])
@jwt_required()
def private():
    identity = get_jwt_identity()
    claims = get_jwt()
    return jsonify({ "msg": "Acceso autorizado", "user_id": identity, "user_email": claims.get("email") }), 200
