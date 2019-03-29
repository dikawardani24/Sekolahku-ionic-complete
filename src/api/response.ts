import { HTTP } from '@ionic-native/http';

export interface ManipulationResponse {
    success: boolean 
    message: string
}

export interface SelectResponse<T> {
    success: boolean 
    data: T
}

export interface CrudAble<T> {
    save(model: T): Promise<ManipulationResponse>
    delete(model: T): Promise<ManipulationResponse>
     update(model: T): Promise<ManipulationResponse>

    getAll(): Promise<SelectResponse<T[]>>
    getByPrimaryKey(primaryKey: any): Promise<SelectResponse<T>>
}

export abstract class AbstractResponse<T> {
    protected BASE_URL: string = "http://192.168.43.147/sekolahku-api/"
    
    constructor(protected http: HTTP) {

    }

    protected abstract createFromJson(jsonObject): T

    protected collectAsList(jsonArray): T[] {
        let datas: T[] = []

        jsonArray.forEach(jsonObject => {
            datas.push(this.createFromJson(jsonObject))
        });
        return datas
    }

}