import { User } from './../models/user';
import { AbstractDatasource } from "./datasource";

export class UserDataSource extends AbstractDatasource<User> {
    public onPrepareTable(): Promise<any> {
        let sql = "CREATE TABLE IF NOT EXISTS user(" +
            "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
            "username TEXT, " +
            "password TEXT)"

        return this.executeQuery(sql)
    }

    public delete(model: User): Promise<any> {
        let sql = "DELETE FROM user WHERE id=?"
        return this.executeQuery(sql, [model.id])
    }

    protected convertToArray(model: User): any[] {
        return [model.username, model.password]
    }

    public save(model: User): Promise<any> {
        let sql = "INSERT INTO user(username, password) " +
            "VALUES(?, ?)"
        let paramsValues = this.convertToArray(model)

        return this.executeQuery(sql, paramsValues)
    }

    public update(model: User): Promise<any> {
        let sql = "UPDATE user SET username=?, password=? WHERE id=?"
        let parameters = this.convertToArray(model)

        parameters.push(model.id)
        return this.executeQuery(sql, parameters)
    }

    protected fetchRow(item: any): User {
        let user = new User()

        user.id = item.id
        user.username = item.username
        user.password = item.password

        return user
    }

    public findAll(): Promise<User[]> {
        let query = "SELECT *FROM user ORDER BY username"
        let self = this

        return new Promise<User[]>(function (resolve, reject) {
            self.executeQuery(query).then(result => {
                let siswaList = self.collectAsList(result)
                resolve(siswaList)
            }).catch(error => {
                reject(error)
            })
        })
    }

    public findByPrimaryKey(value: any): Promise<User> {
        let sql = "SELECT *FROM user WHERE id=?"
        let self = this

        return new Promise<User>(function(resolve, reject) {
            self.executeQuery(sql, [value]).then((result: any) => {
                let found = result.rows.length > 0

                if (found) {
                    let item = result.rows.item(0)
                    resolve(self.fetchRow(item))
                } else {
                    resolve(null)
                }
            }).catch(error => {
                reject(error)
            })
        })
    }

    public findByUsernameAndPassword(username: string, password: string): Promise<User> {
        let sql = "SELECT *FROM user WHERE username=? AND password=?"
        let self = this

        return new Promise<User>(function(resolve, reject) {
            self.executeQuery(sql, [username, password]).then((result: any) => {
                let found = result.rows.length > 0

                if (found) {
                    let item = result.rows.item(0)
                    resolve(self.fetchRow(item))
                } else {
                    resolve(null)
                }
            }).catch(error => {
                reject(error)
            })
        })
    }

    public findByUsername(username: string): Promise<User> {
        let sql = "SELECT *FROM user WHERE username=?"
        let self = this

        return new Promise<User>(function(resolve, reject) {
            self.executeQuery(sql, [username]).then((result: any) => {
                let found = result.rows.length > 0

                if (found) {
                    let item = result.rows.item(0)
                    resolve(self.fetchRow(item))
                } else {
                    resolve(null)
                }
            }).catch(error => {
                reject(error)
            })
        })
    }
}