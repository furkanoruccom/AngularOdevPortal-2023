
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthService } from "./auth.service";


@Injectable()
export class AuthGuard implements CanActivate {
  router: any;
  constructor(
    public servis: AuthService,
  ) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    let logged = this.servis.OturumKontrol();

    if (logged) {
      return true;
    }
    this.router.navigate(["giris"]);
    alert("Lütfen Giriş Yapınız");
    return false;
  }

}
