import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'private-container',
  templateUrl: './private-container.component.html',
  styleUrls: ['./private-container.component.css']
})
export class PrivateContainerComponent {

  userId = -1

  constructor(private activatedRoute: ActivatedRoute) {
    activatedRoute.paramMap.subscribe(paramMap => {
      if (paramMap.has("userId"))
        this.userId = +paramMap.get("userId")!
    })
  }


  getPath(userId: number, entityPath?: string) {
    let path = `/reserved/${userId}`
    if (entityPath)
      path += '/books'
    return path
  }

  login() {
    return `/login`;
  }
}
