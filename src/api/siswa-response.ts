import { ManipulationResponse, SelectResponse, CrudAble } from './response';
import { Siswa } from './../models/siswa';
import { AbstractResponse } from './../api/response';
import { HTTPResponse } from '@ionic-native/http';

export class SiswaResponse extends AbstractResponse<Siswa> implements CrudAble<Siswa> {
    protected createFromJson(jsonObject: any): Siswa {
        let siswa = new Siswa()

        siswa.id = jsonObject.id
        siswa.namaDepan = jsonObject.nama_depan
        siswa.namaBelakang = jsonObject.nama_belakang
        siswa.noHp = jsonObject.no_hp
        siswa.email = jsonObject.email
        siswa.tglLahir = jsonObject.tgl_lahir
        siswa.gender = jsonObject.gender
        siswa.jenjang = jsonObject.jenjang
        siswa.hobies = jsonObject.hobi
        siswa.alamat = jsonObject.alamat

        return siswa
    }

    public save(model: Siswa): Promise<ManipulationResponse> {
        let url = this.BASE_URL + "create_siswa.php"
        let self = this
        return new Promise<ManipulationResponse>(function (resolve, reject) {
            self.http.post(url, {
                //parameter name: value
                nama_depan: model.namaDepan,
                nama_belakang: model.namaBelakang,
                no_hp: model.noHp,
                email: model.email,
                tgl_lahir: model.tglLahir,
                gender: model.gender,
                jenjang: model.jenjang,
                hobi: model.hobies,
                alamat: model.alamat
            }, {}).then((response: HTTPResponse) => {
                let data = JSON.parse(response.data)

                resolve({
                    success: data["success"],
                    message: data["message"]
                })
            }).catch(error => {
                reject(error)
            })
        })
    }

    public update(model: Siswa): Promise<ManipulationResponse> {
        let url = this.BASE_URL + "edit_siswa.php"
        let self = this
        return new Promise<ManipulationResponse>(function (resolve, reject) {
            self.http.post(url, {
                //parameter name: value
                id: model.id,
                nama_depan: model.namaDepan,
                nama_belakang: model.namaBelakang,
                no_hp: model.noHp,
                email: model.email,
                tgl_lahir: model.tglLahir,
                gender: model.gender,
                jenjang: model.jenjang,
                hobi: model.hobies,
                alamat: model.alamat
            }, {}).then((response: HTTPResponse) => {
                let data = JSON.parse(response.data)
                resolve({
                    success: data["success"],
                    message: data["message"]
                })
            }).catch(error => {
                reject(error)
            })
        })
    }

    public delete(model: Siswa): Promise<ManipulationResponse> {
        let url = this.BASE_URL + "delete_siswa.php"
        let self = this
        return new Promise<ManipulationResponse>(function (resolve, reject) {
            self.http.post(url, {
                id: model.id
            }, {}).then((response: HTTPResponse) => {
                let data = JSON.parse(response.data)
                resolve({
                    success: data["success"],
                    message: data["message"]
                })
            }).catch(error => {
                reject(error)
            })
        })
    }

    public getAll(): Promise<SelectResponse<Siswa[]>> {
        let url = this.BASE_URL + "get_all_siswa.php"
        let self = this

        return new Promise<SelectResponse<Siswa[]>>(function (resolve, reject) {
            self.http.get(url, {}, {}).then((response: HTTPResponse) => {
                let jsonResponse = JSON.parse(response.data)
                let success = jsonResponse["success"]
                let jsonArray = jsonResponse["siswa_list"]
                                
                resolve({
                    success: success,
                    data: self.collectAsList(jsonArray)
                })
            }).catch(error => {
                reject(error)
            })
        })
    }

    public getByPrimaryKey(primaryKey: any): Promise<SelectResponse<Siswa>> {
        let url = this.BASE_URL + "detail_siswa.php"
        let self = this

        return new Promise<SelectResponse<Siswa>>(function (resolve, reject) {
            self.http.post(url, {
                id: primaryKey
            }, {}).then((response: HTTPResponse) => {
                let jsonResponse = JSON.parse(response.data)
                let success = jsonResponse["success"]
                let siswa = (success) ? self.createFromJson(jsonResponse["siswa"]) : null

                resolve({
                    success: success,
                    data: siswa
                })
            }).catch(error => {
                reject(error)
            })
        })
    }

    public getByName(name: string): Promise<SelectResponse<Siswa[]>> {
        let url = this.BASE_URL + "search_siswa.php"
        let self = this

        return new Promise<SelectResponse<Siswa[]>>(function (resolve, reject) {
            self.http.get(url, {
                nama: name
            }, {}).then((response: HTTPResponse) => {
                let jsonResponse = JSON.parse(response.data)
                let success = jsonResponse["success"]
                let jsonArray = jsonResponse["siswa_list"]

                resolve({
                    success: success,
                    data: self.collectAsList(jsonArray)
                })
            }).catch(error => {
                reject(error)
            })
        })
    }
}