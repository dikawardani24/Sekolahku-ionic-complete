import { User } from './../models/user';

export class SessionHelper {
    private USER_ID_KEY = "iduser"
    private USERNAME_KEY = "username"
    private PASSWORD_KEY = "passwrod"
    private static instance: SessionHelper = null

    private constructor() {
        
    }

    public static getInstance(): SessionHelper {
        if (SessionHelper.instance == null) {
            SessionHelper.instance = new SessionHelper()
        }

        return SessionHelper.instance;
    }

    public saveSession(user: User) {
        localStorage.setItem(this.USER_ID_KEY, user.id.toString())
        localStorage.setItem(this.USERNAME_KEY, user.username)
        localStorage.setItem(this.PASSWORD_KEY, user.password)
    }

    public getUser(): User {
        let idUser = localStorage.getItem(this.USER_ID_KEY)
        let username = localStorage.getItem(this.USERNAME_KEY)
        let password = localStorage.getItem(this.PASSWORD_KEY)

        if (idUser != null && username != null && password != null) {
            let user = new User()
            user.id = Number.parseInt(idUser)
            user.username = username
            user.password = password
            
            return user
        } else {
            return null
        }
    }

    public clearSession() {
        localStorage.clear()
    }

    public isLoggedIn(): boolean {
        return this.getUser() != null
    }

    
}