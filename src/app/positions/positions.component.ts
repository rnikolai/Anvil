import { Component, OnInit } from '@angular/core';
import { PositionService } from "../data/position.service";

import { Position } from "../data/vm-typicode";
import { Router } from "@angular/router";

@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.css']
})
export class PositionsComponent implements OnInit {
  positions: Position[];
  getPositionsSub: any;
  loadingError = false;

  constructor(private m: PositionService, private router: Router) { }

  ngOnInit() {
    this.getPositions();
  }

  ngOnDestroy() {
    if (this.getPositionsSub) {
      this.getPositionsSub.unsubscribe();
    }
  }

  getPositions(): void {
    try {
      this.getPositionsSub = this.m.getPositions().subscribe(positions => this.positions = positions)
    }
    catch(err) {
      this.loadingError = true;
    }
  }

  routePosition(id: String) {
    this.router.navigate(['/position', id]);
  }

}
