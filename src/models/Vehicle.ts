export default class Vehicles {
    vehicle_code!:string;
    email!:string;
    first_name!:string;
    fuel_type!:string;
    license_plate!:string;
    phone_no!:string;
    remarks!:string;
    role!:string;
    status!:string;
    vehicle_category!:string;
    staff_id!:string;


    constructor(vehicle_code: string, email: string, first_name: string, fuel_type: string, license_plate: string, phone_no: string, remarks: string, role: string, status: string, vehicle_category: string, staff_id: string) {
        this.vehicle_code = vehicle_code;
        this.email = email;
        this.first_name = first_name;
        this.fuel_type = fuel_type;
        this.license_plate = license_plate;
        this.phone_no = phone_no;
        this.remarks = remarks;
        this.role = role;
        this.status = status;
        this.vehicle_category = vehicle_category;
        this.staff_id = staff_id;
    }
}