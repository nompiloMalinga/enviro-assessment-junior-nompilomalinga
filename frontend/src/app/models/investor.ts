export interface Investor {

    id?: number;
    name: string;
    surname: string;
    age: number;
    products :Products[];

}

export interface Products{
    id? : number;
    productType: string;
    balance :number;
}
