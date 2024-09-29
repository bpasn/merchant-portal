export default class ObjectFile {
    private _source: string;  // ทำเป็น private เพื่อบังคับให้ใช้ getter และ setter
    private _id: string;

    constructor(uri: string, id: string) {
        this._source = uri;
        this._id = id;
    }

    // Getter สำหรับ uri
    get source(): string {
        return this._source;
    }

    // Setter สำหรับ uri
    set source(source: string) {
        this._source = source;
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
