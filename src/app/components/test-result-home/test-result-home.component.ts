import { Component, OnInit } from '@angular/core';
import { LinkService } from 'src/app/services/link.service';

@Component({
  selector: 'app-test-result-home',
  templateUrl: './test-result-home.component.html',
  styleUrls: ['./test-result-home.component.css'],
})
export class TestResultHomeComponent implements OnInit {
  links: any;

  constructor(private linkService: LinkService) {}

  ngOnInit(): void {
    this.linkService.getAll().subscribe((res: any) => {
      this.links = res;
    });
  }
}
