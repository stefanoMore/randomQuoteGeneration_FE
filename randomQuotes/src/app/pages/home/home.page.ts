import {Component, computed, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {QuoteService} from "../../../services/server/quote.service";

import {animate, state, style, transition, trigger} from "@angular/animations";


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  animations: [
    trigger('fadeInOut', [
      state('in', style({opacity: 1})),
      state('out', style({opacity: 0})),
      transition('in <=> out', animate('600ms ease-in-out'))
    ])
  ]

})
export class HomePage implements OnInit {

  // quotes = computed(() => this.quoteService.quotes())

  quote: string = ''
  author: string = ''
  animationState  = 'in'
  constructor(private quoteService: QuoteService) { }

  ngOnInit() {
    this.quoteService.getRandomQuote()
      .subscribe({
        next: (res) => {
          this.quote = res.data.quote;
          this.author = res.data.author
        }

      })
  }

  newRandomQuote() {
    this.animationState = 'out'
    this.quoteService.getRandomQuote()
      .subscribe({
        next: (res) => {
          setTimeout(() => {
            this.quote = res.data.quote;
            this.author = res.data.author
            this.animationState = 'in'
          }, 600)

        }

      })
  }
}
