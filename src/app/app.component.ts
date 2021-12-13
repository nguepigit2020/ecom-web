import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CatalogueService } from './catelogue.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title ="App"
  public categories:any
  public currentCategorie:any;

  constructor(
    private router:Router,
    private catalogueServive:CatalogueService
    ){}

  ngOnInit(): void {
    this.getCategorie();
  }

  getCategorie() {
    this.catalogueServive.getResource("/categories").subscribe(data=>{
      this.categories = data;
      console.log(this.categories)
    },err=>{
      console.log(err);
    })
  }

  getProductsByCat(c:any){
    this.currentCategorie = c;
    this.router.navigateByUrl('/products/2/'+c.id);
  }

  onSelectedProducts(){
    this.currentCategorie = undefined;
    this.router.navigateByUrl("/products/1/0");
  }

}
