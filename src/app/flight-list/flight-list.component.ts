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

    clickAction(id: number, api: any) {
        alert(api);
        this.items[id].clicked = !this.items[id].clicked;
        this.clickEmitter.emit(this.items[id].id);
    }
}
