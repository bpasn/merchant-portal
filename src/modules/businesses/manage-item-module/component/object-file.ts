export default class ObjectFile {
    private _uri: string;  // ทำเป็น private เพื่อบังคับให้ใช้ getter และ setter
    private _id: string;

    constructor(uri: string, id: string) {
        this._uri = uri;
        this._id = id;
    }

    // Getter สำหรับ uri
    get uri(): string {
        return this._uri;
    }

    // Setter สำหรับ uri
    set uri(uri: string) {
        this._uri = uri;
    }

    // Getter สำหรับ id
    get id(): string {
        return this._id;
    }

    // Setter สำหรับ id
    set id(id: string) {
        this._id = id;
    }
}
