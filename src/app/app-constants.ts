import jwt_decode from 'jwt-decode';

export class AppConstants {

	constructor() {}

//  ****  Rodar Localmente
//	public static get baseServidor(): string { return 'http://localhost:8080/'; }

//  ****  Rodar no Heroku
	public static get baseServidor(): string { return 'https://resume-api-rest.herokuapp.com/'; }

	public static get urlPath(): string { return this.baseServidor + 'resumeAPI/'; }

	public static get urlLogin(): string { return this.urlPath + 'login'; } // END POINT para a URL de Login
	public static get urlUser(): string { return this.urlPath + 'usuario/'; } // END POINT para URL de Usuários

	public static get isUsuarioAutenticado(): boolean {
		return localStorage.getItem('token') !== '';
	}
	
	public static get isPersonLogada(): boolean {
		return localStorage.getItem('personId') !== '';
	}

	public static get retornaUserToken(): string {
		const token = localStorage.getItem('token') || '';
		var decoded = jwt_decode(token);
		console.log('Token Decoded: ' + JSON.stringify(decoded));

		return JSON.parse(JSON.stringify(decoded)).sub;
	}

}
