
export class Category {

    constructor(public name: string, public backgroundColor?: string) {

        if (backgroundColor == undefined) {
            this.backgroundColor = '#ffffff';
        }
    }
}
