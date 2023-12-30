import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {delay, of, Subscription, switchMap} from "rxjs";

@Component({
  selector: 'search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {

  // Timeout for search onKeySearch
  timeout?: Subscription;
  keyword = ''
  // Search emitter
  @Output() load: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }


  onKeySearch(event: {value: string, key: string}) {

    if (this.timeout !== undefined && !this.timeout.closed)
      this.timeout.unsubscribe()

    // Search one second after last pressed key has been pressed
    if (event.key.toLowerCase() !== 'enter')
      this.timeout = of(event)
        .pipe(
          delay(1000),
          switchMap(() => {
            this.keyword = event.value
            this.load.emit({keyword: event.value})
            return of(false)
          })
        ).subscribe(() => {})

    // If "Enter" key is pressed, search immediately
    else {
      this.keyword = event.value
      this.load.emit({keyword: event.value})
    }

  }

}
