import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"],
})
/* Search component is responsible for the search bar on the top
 * and locates product based on the keyword that is being search for */
export class SearchComponent implements OnInit {

  // dependency injection
  constructor(private router: Router) {}

  ngOnInit() {}

  /* doSearch() tells Router to redirect url to keyword that user searches for */
  doSearch(value: string) {
    console.log(`value=${value}`);
    this.router.navigateByUrl(`/search/${value}`);
  }
}
