import { ReceivedDataListener } from './datasource';
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";

export interface QueryResultListener {
    onSucceed(data: any)
    onFailed(error: any)
}

export interface ReceivedDataListener<T> {
    accept(data: T)
}

export abstract class AbstractDatasource<M> {
    private sqlite: SQLite

    constructor() {
        this.sqlite = new SQLite()
    }

    /**
     * executeQuery
     */
    protected  executeQuery(query: string, parameters?: any) {
        let self = this
        return new Promise<any>(function (resolve, reject) {
            self.sqlite.create({
                name: 'sekolahku.db',
                location: 'default'
            }).then((db: SQLiteObject) => {
                db.executeSql(query, parameters).then((result) => {
                    resolve(result)
                }).catch(error => {
                    reject(error)
                })
            }).catch(error => {
                reject(error)
            })
        })
    }

    protected collectAsList(data: any): M[] {
        let siswaList: M[] = []

        for (let i = 0; i < data.rows.length; i++) {
            let item = data.rows.item(i)
            let siswa = this.fetchRow(item)
            siswaList.push(siswa)
        }

        return siswaList
    }

    public abstract onPrepareTable(): Promise<any>

    public abstract delete(model: M): Promise<any>

    protected abstract convertToArray(model: M): any[] 

    public abstract save(model: M): Promise<any>

    public abstract update(model: M): Promise<any>

    protected abstract fetchRow(item: any): M

    public abstract findAll(): Promise<M[]>

    public abstract findByPrimaryKey(value: any): Promise<M>
}