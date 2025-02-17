export default class Staffs {
    staff_id!:string;
    address_01!:string;
    address_02!:string;
    address_03!:string;
    address_04!:string;
    address_05!:string;
    designation!:string;
    dob!:string;
    email!:string;
    first_name!:string;
    gender!:string;
    joined_date!:string;
    last_name!:string;
    phone_no!:string;
    role!:string;
    field_code!:string;


    constructor(staff_id: string, address_01: string, address_02: string, address_03: string, address_04: string, address_05: string, designation: string, dob: string, email: string, first_name: string, gender: string, joined_date: string, last_name: string, phone_no: string, role: string, field_code: string) {
        this.staff_id = staff_id;
        this.address_01 = address_01;
        this.address_02 = address_02;
        this.address_03 = address_03;
        this.address_04 = address_04;
        this.address_05 = address_05;
        this.designation = designation;
        this.dob = dob;
        this.email = email;
        this.first_name = first_name;
        this.gender = gender;
        this.joined_date = joined_date;
        this.last_name = last_name;
        this.phone_no = phone_no;
        this.role = role;
        this.field_code = field_code;
    }
}