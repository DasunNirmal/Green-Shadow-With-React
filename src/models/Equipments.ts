export default class Equipments {
    eq_code!:string;
    field_location!:string;
    field_name!:string;
    first_name!:string;
    name!:string;
    phone_no!:string;
    role!:string;
    status!:string;
    type!:string;
    field_code!:string;
    staff_id!:string;

    constructor(eq_code: string, field_location: string, field_name: string, first_name: string, name: string, phone_no: string, role: string, status: string, type: string, field_code: string, staff_id: string) {
        this.eq_code = eq_code;
        this.field_location = field_location;
        this.field_name = field_name;
        this.first_name = first_name;
        this.name = name;
        this.phone_no = phone_no;
        this.role = role;
        this.status = status;
        this.type = type;
        this.field_code = field_code;
        this.staff_id = staff_id;
    }
}