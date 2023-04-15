import { Component, OnInit } from '@angular/core';
import { UrlService } from '../url.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {
  debounceTime,
  filter,
  switchMap,
  map,
  catchError,
} from 'rxjs/operators';
import { Subject, of } from 'rxjs';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
})
export class SearchPageComponent implements OnInit {
  searchForm!: FormGroup;
  searchResult: any;
  constructor(
    private fb: FormBuilder,
    public apiService: UrlService,
    private router: Router
  ) {}
  //searchResult: any;
  ngOnInit(): void {
    this.searchForm = this.fb.group({
      searchInput: [''],
    });
  }
  onInput() {
    const searchInputControl = this.searchForm.get('searchInput');
  if (searchInputControl && searchInputControl.value) {
    let keyword = searchInputControl.value;
    if (typeof keyword === 'string') {
      keyword = keyword.trim();
      searchInputControl.setValue(keyword, { emitEvent: true });
    }
  }
  }

  onSearch() {
    const keyword = this.searchForm.get('searchInput')?.value;
    if (!keyword) {
      return;
    }

    this.apiService.getsearch(keyword).subscribe((result: any) => {
      if (!result || result.length === 0) {
        console.log('未找到该景点');
        return;
      }

      console.log(result[0]);
      //this.router.navigateByUrl('/hotel');
    });
  }
}
