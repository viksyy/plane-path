export class Flight {
    id: string;
    private _label: string;
    private _action: any;
    private _iconActive: string;
    private _iconInActive: any;
    clicked: boolean;
    private _toggleSwitch: boolean;
    private _roles: any;
    private _useImageForIcon: boolean;
    private _urlImage: string;
    constructor(id:string, label: string,  action:any, clicked: boolean, toggleSwitch:boolean, iconActive:string, roles: any, useImageForIcon: boolean, iconInActive?:any ){
        this.id = id;
        this._label = label;
        this._action = action;
        this.clicked = clicked;
        this._toggleSwitch = toggleSwitch;
        this._iconActive = iconActive;
        this._iconInActive = iconInActive;
        this._roles = roles;
        this._useImageForIcon = useImageForIcon;
        
    };
}
