import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'circle-image',
	templateUrl: './circle-image.component.html',
	styles: []
})
export class CircleImageComponent implements OnInit {
	@Input() public imageUrl: string;
	@Input() public imageClass: string;

	public viewImage: boolean;

	constructor() {
		this.viewImage = true;
	}

	loadImage(){
		this.viewImage = false;
	}

	ngOnInit(): void {}
}
