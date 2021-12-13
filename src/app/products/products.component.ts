import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CatalogueService } from '../catelogue.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public products: any

  constructor(
    public catService:CatalogueService,
    private route:ActivatedRoute,
    private router:Router,
    ) {}

  ngOnInit(): void {
    this.router.events.subscribe((val)=>{
      if(val instanceof NavigationEnd){
        let url = val.url;
        let p1=this.route.snapshot.params.p1;
        if(p1==1){
          this.getProducts("/products/search/selectedProducts")
        }else if(p1==2){
          let idCat=this.route.snapshot.params.p2;
          this.getProducts("/categories/"+idCat+"/products")
        }
        //console.log(this.route.snapshot.data)
      }
    });
        let p1=this.route.snapshot.params.p1;
        if(p1==1){
          this.getProducts("/products/search/selectedProducts")
        }

  }


  private getProducts(url:any){
    this.catService.getResource(url).subscribe(data=>{
      this.products = data;
     // console.log(this.products,'prod')
    },
    err=>{
      console.log(err)
    })
  }

}
