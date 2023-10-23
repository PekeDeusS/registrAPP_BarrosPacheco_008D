//get,put,delete
export interface IDocentes{
    id:number;
    usuario:string;
    contraseña:string;
    asignatura1:string;
    asignatura2:string;
}
//post
export interface IDocente{
    usuario:string;
    contraseña:string;
    asignatura1:string;
    asignatura2:string;
}
//
export interface Users{
    id:number;
    username:string;
    password:string;
    role:string;
    isactive:boolean;
}