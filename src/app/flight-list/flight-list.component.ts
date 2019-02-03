import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Flight } from './flight.model';

@Component({
    selector: 'flight-list',
    templateUrl: './flight-list.component.html',
    styleUrls: ['./flight-list.component.scss']
})

export class FlightListComponent implements OnInit {
    @Input('items') items: Flight[];
    @Output() clickEmitter = new EventEmitter();

    constructor() {
    }

    ngOnInit() {

    }

    clickAction(id: number, listOfPoints: any) {

        for (let i = 0; i < this.items.length; i++) {
            if (i == id) {
                if (this.items[i].clicked == false) {
                    this.items[i].clicked = true;
                    this.clickEmitter.emit(this.items[i]);
                }
            }
            else {
                this.items[i].clicked = false;
            }

        }
        

    }
}
