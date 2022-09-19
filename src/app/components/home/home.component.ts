import { Component, OnInit, OnDestroy } from '@angular/core';
import { product, productRes } from 'src/shared/models/products';
import { CoreService } from 'src/shared/services/core.service';
import { SearchService } from 'src/shared/services/search.service';
import { Subscription } from 'rxjs'
import { CartService } from 'src/shared/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  products: product[];
  skip = 0;
  p: number = 1;
  totalItems: number;
  productsTitle: string;
  searchSubscription: Subscription;
  searchActive: boolean;
  itemsInCart = {};
  cartItemsCount = 0;
  loadContent: boolean;

  constructor(
    private coreService: CoreService,
    private searchService: SearchService,
    private cartService: CartService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getProducts(this.skip);
    this.subscribeToSearchInput();
  }

  ngOnDestroy(): void {
    this.searchSubscription?.unsubscribe()
  }

  getProducts(skip: number) {
    this.searchActive = false;
    this.productsTitle = '';
    this.loadContent = true;
    this.coreService.getRequest<productRes>(`products?limit=9&skip=${skip}`)
      .subscribe(res => {
        this.setProductValues(res)
    })
  }

  getProductOfCategory(category: string) {
    this.searchActive = false;
    this.loadContent = true;
    this.coreService.getRequest<productRes>(`products/category/${category}`)
      .subscribe(res => {
        this.p = 1;
        this.setProductValues(res)
    })
  }

  getProductsSearch(txt: string, skip: number) {
    this.searchActive = true;
    this.loadContent = true;
    this.coreService.getRequest<productRes>(`products/search?q=${txt}&limit=9&skip=${skip}`)
    .subscribe(res => {
      this.setProductValues(res)
  })
  }

  subscribeToSearchInput() {
    this.searchSubscription =  this.searchService.searchTxt$.subscribe(
      txt => {
        if(txt) {
          this.productsTitle = txt;
          this.p = 1;
          this.getProductsSearch(txt, 0)
        }
      }
    )
  }

  setProductValues(res: productRes) {
    this.loadContent = false;
    this.totalItems = res.total;
    this.products = res?.products;
  }

  // GET TOTAL PRICE BEFORE ADDING DISCOUNT
  getOldPrice(priceAfterDisc: number, disc: number) {
    const oldPrice = priceAfterDisc + (priceAfterDisc * (disc / 100));
    return oldPrice.toFixed(2);
  }

  pageChange(evt: number) {
    this.p = evt;
    this.skip = (evt - 1) * 9;
    window.scrollTo(0, 0);
    this.searchActive
      ? this.getProductsSearch(this.productsTitle, this.skip)
      :  this.getProducts(this.skip);
  }

  categoryChecked(evt: any) {
    /** IF CATEGORY 
          CHECKED => GET PRODUCTS OF CATEGRY
          UNCHECKED => GET ALL PRODUCTS
    ***/
   this.productsTitle = evt.category;
    evt.checked
      ? this.getProductOfCategory(evt.category)
      : this.getProducts(0)
  }

  addToCart(id: number) {
    this.itemsInCart[id] = true;
    this.cartItemsCount++;
    this.cartService.productsInCart$.next(this.cartItemsCount);
    this.toastr.success('Item added to cart')
  }

  removeFromCart(id: number) {
    this.itemsInCart[id] = false;
    this.cartItemsCount--;
    this.cartService.productsInCart$.next(this.cartItemsCount);
    this.toastr.error('Item removed from cart')
  }
}
