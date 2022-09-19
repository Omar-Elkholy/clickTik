import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CoreService } from 'src/shared/services/core.service';

@Component({
  selector: 'app-filteration-options',
  templateUrl: './filteration-options.component.html',
  styleUrls: ['./filteration-options.component.scss']
})
export class FilterationOptionsComponent implements OnInit {

  categories: string[];
  checkedCategory: string;
  @Output() categoryFilterEvt = new EventEmitter<any>();

  constructor(
    private coreService: CoreService
  ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.coreService.getRequest<string[]>('products/categories')
      .subscribe(res => {
        this.categories = res;
      })
  }

  categoryChange(value: any, checked: boolean) {
    // CHECKED CATEGORY IS USED TO CHECK ONLY ONE CATEGORY & UNCHECK OTHERS.
    this.checkedCategory = value;
    this.categoryFilterEvt.emit({category: value, checked: checked});
  }

}
