export class Flight {
    id: number;
    title: string;
    clicked: boolean;
    listOfPoints: any;
    date: any;
       
    
    constructor(id:number, title: string, clicked: boolean, listOfPoints:any){
        this.id = id;
        this.title = title;
        this.clicked = clicked;
        this.listOfPoints = listOfPoints;
        this.date = new Date();
    };
}
