import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {
  @Input('rating') rating: number = 3;
  @Output() ratingUpdated = new EventEmitter();

  totalStar: number = 5;
  ratingArray: number[] = [];


  calculateRating(rating: number) {
    this.ratingUpdated.emit(rating);
  }

  iconStatus(index: number) {
    if (this.rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

  constructor() { }

  ngOnInit(): void {
    for (let index = 0; index < this.totalStar; index++) {
      this.ratingArray.push(index);
    }
  }

}
