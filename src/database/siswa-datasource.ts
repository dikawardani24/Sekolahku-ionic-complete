import { Siswa } from './../models/siswa';
import { AbstractDatasource } from './datasource';

export class SiswaDatasource extends AbstractDatasource<Siswa> {
    
    public onPrepareTable(): Promise<any> {
        let sql = "CREATE TABLE IF NOT EXISTS siswa(" +
            "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
            "nama_depan TEXT, " +
            "nama_belakang TEXT, " +
            "no_hp TEXT, " +
            "email TEXT, " +
            "tgl_lahir TEXT, " +
            "gender TEXT, " +
            "jenjang TEXT, " +
            "hobi TEXT, " +
            "alamat TEXT)"

        return this.executeQuery(sql)
    } 
    
    public delete(model: Siswa): Promise<any> {
        let sql = "DELETE FROM siswa WHERE id=?"
        return this.executeQuery(sql, [model.id])
    }

    protected convertToArray(model: Siswa): any[] {
        return [
            model.namaDepan, model.namaBelakang,
            model.noHp, model.email, model.tglLahir, model.gender,
            model.jenjang, model.hobies, model.alamat
        ]
    }

    public save(model: Siswa): Promise<any> {
        let sql = "INSERT INTO siswa(nama_depan, nama_belakang, no_hp, email, tgl_lahir, gender, jenjang, hobi, alamat) " +
            "VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)"
        let paramsValues = this.convertToArray(model)
        return this.executeQuery(sql, paramsValues)
    }

    public update(model: Siswa): Promise<any> {
        let sql = "UPDATE siswa SET " +
            "nama_depan=?, " +
            "nama_belakang=?, " +
            "no_hp=?, " +
            "email=?, " +
            "tgl_lahir=?, " +
            "gender=?, " +
            "jenjang=?, " +
            "hobi=?, " +
            "alamat=? " +
            "WHERE id=?"

        let params: any[] = this.convertToArray(model)
        params.push(model.id)

        return this.executeQuery(sql, params)
    }

    protected fetchRow(item: any): Siswa {
        let siswa = new Siswa()

        siswa.id = item.id
        siswa.namaDepan = item.nama_depan
        siswa.namaBelakang = item.nama_belakang
        siswa.noHp = item.no_hp
        siswa.email = item.email
        siswa.jenjang = item.jenjang
        siswa.gender = item.gender
        siswa.tglLahir = item.tgl_lahir
        siswa.hobies = item.hobi
        siswa.alamat = item.alamat

        return siswa
    }

    public findAll(): Promise<Siswa[]> {
        let query = "SELECT *FROM siswa ORDER BY nama_depan"
        let self = this

        return new Promise<Siswa[]>(function (resolve, reject) {
            self.executeQuery(query).then(result => {
                let siswaList = self.collectAsList(result)
                resolve(siswaList)
            }).catch(error => {
                reject(error)
            })
        })
    }

    public findByPrimaryKey(value: any): Promise<Siswa> {
        let sql = "SELECT *FROM siswa WHERE id=?"
        let self = this

        return new Promise<Siswa>(function(resolve, reject) {
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

    public findByName(name: string): Promise<Siswa[]> {
        let query = "SELECT *FROM siswa WHERE nama_depan LIKE ? OR nama_belakang LIKE ? ORDER BY nama_depan"
        let parameters = ["%" + name + "%", "%" + name + "%"]
        let self = this

        return new Promise<Siswa[]>(function (resolve, reject) {
            self.executeQuery(query, parameters).then(result => {
                let siswaList = self.collectAsList(result)
                resolve(siswaList)
            }).catch(error => {
                reject(error)
            })
        })
    }
}