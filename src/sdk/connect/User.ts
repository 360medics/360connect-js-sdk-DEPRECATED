export class User {
    public name: string;
    public email: string;
    public profession: string;
    public token: string;

    public isValid(){
        return !!this.name && !!this.email && !!this.token && !!this.profession;
    }

    public toString() {
        return this.name;
    }
}
